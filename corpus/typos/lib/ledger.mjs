import { readFileSync } from 'node:fs';
import { LEDGER_FILE } from './paths.mjs';
import { atomicWrite } from './util.mjs';
import { WINDOW_PATTERN, parseInstant } from './instants.mjs';

const LEDGER_HEADING = '## Archive windows';

function splitTableRow(line) {
  const cells = [];
  let current = '';
  const body = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '\\' && body[i + 1] === '|') { current += '|'; i++; continue; }
    if (body[i] === '|') { cells.push(current.trim()); current = ''; continue; }
    current += body[i];
  }
  cells.push(current.trim());
  return cells;
}

function tableLinesUnder(lines, heading) {
  const start = lines.findIndex((line) => line.trim() === heading);
  if (start === -1) throw new Error(`Heading "${heading}" not found.`);
  let end = lines.findIndex((line, index) => index > start && /^## /.test(line));
  if (end === -1) end = lines.length;
  const tableLines = [];
  for (let i = start + 1; i < end; i++) if (lines[i].trim().startsWith('|')) tableLines.push({ line: i, cells: splitTableRow(lines[i]) });
  if (tableLines.length < 2) throw new Error(`The table under "${heading}" needs a header row and a separator row.`);
  return tableLines;
}

export function tableRowsUnder(lines, heading) {
  return tableLinesUnder(lines, heading).slice(2);
}

export function ledgerKey(subreddit, after, before) {
  return `${subreddit.toLowerCase()}|${after}|${before}`;
}

export function readLedger() {
  const lines = readFileSync(LEDGER_FILE, 'utf8').split('\n');
  const processed = new Set();
  const spans = [];
  for (const { cells } of tableRowsUnder(lines, LEDGER_HEADING)) {
    processed.add(ledgerKey(cells[0], cells[1], cells[2]));
    if (WINDOW_PATTERN.test(cells[1]) && WINDOW_PATTERN.test(cells[2])) {
      spans.push({ subreddit: cells[0].toLowerCase(), after: parseInstant(cells[1], 'ledger'), before: parseInstant(cells[2], 'ledger'), afterText: cells[1], beforeText: cells[2] });
    }
  }
  return { processed, spans };
}

export function appendLedgerRow(cells) {
  const lines = readFileSync(LEDGER_FILE, 'utf8').split('\n');
  const tableLines = tableLinesUnder(lines, LEDGER_HEADING);
  lines.splice(tableLines[tableLines.length - 1].line + 1, 0, `| ${cells.join(' | ')} |`);
  atomicWrite(LEDGER_FILE, lines.join('\n'));
}
