import { readFileSync } from 'node:fs';
import { INSTANCES_FILE } from './paths.mjs';
import { tableRowsUnder } from './ledger.mjs';

const INSTANCES_HEADING = '## Instances';

const KINDS = [
  'adjacent-key substitution', 'dropped letter', 'adjacent transposition', 'extra letter',
  'doubled letter', 'dropped letter of a double', 'missing space', 'extra space',
  'space shifted', 'shift held too long', 'missing apostrophe', 'phonetic misspelling',
  'real-word typo', 'repeated word', 'dropped or extra word', 'multi-edit', 'other',
];
const STATUSES = ['used', 'tamed', 'skipped'];

function readInstances() {
  const lines = readFileSync(INSTANCES_FILE, 'utf8').split('\n');
  return tableRowsUnder(lines, INSTANCES_HEADING).map(({ line, cells }) => ({ line: line + 1, cells }));
}

function checkInstances(rows) {
  const problems = [];
  const kindRank = new Map(KINDS.map((kind, index) => [kind, index]));
  const seen = new Set();
  let previous = null;
  for (const { line, cells } of rows) {
    if (cells.length !== 8) { problems.push(`line ${line}: expected 8 columns, found ${cells.length}`); continue; }
    const [typed, , kind, status, note, quote, , link] = cells.map((cell) => cell.replace(/^`|`$/g, ''));
    if (!kindRank.has(kind)) problems.push(`line ${line}: unknown kind "${kind}"`);
    if (!STATUSES.includes(status)) problems.push(`line ${line}: unknown status "${status}"`);
    if ((status === 'skipped' || status === 'tamed') && !note) problems.push(`line ${line}: ${status} row has no note`);
    if (status === 'tamed' && note && !note.startsWith('Lighter form:')) problems.push(`line ${line}: a tamed note must start with "Lighter form:"`);
    if (quote.split(/\s+/).length >= 20) problems.push(`line ${line}: quote has 20 words or more`);
    if (/[\u2013\u2014]/.test(cells.join(' ').replace(quote, ''))) problems.push(`line ${line}: dash character outside the quote`);
    const key = `${link}|${typed.toLowerCase()}`;
    if (seen.has(key)) problems.push(`line ${line}: duplicate of an earlier row (same link and typed form, ignoring case)`);
    seen.add(key);
    const order = [kindRank.get(kind), typed.toLowerCase(), typed, link];
    if (previous && (order[0] < previous[0] || (order[0] === previous[0] && compareOrder(order.slice(1), previous.slice(1)) < 0))) {
      problems.push(`line ${line}: row is out of order (sort by kind, then typed form)`);
    }
    previous = order;
  }
  return problems;
}

function compareOrder(a, b) {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  return 0;
}

function printCounts(rows) {
  const table = new Map(KINDS.map((kind) => [kind, { used: 0, tamed: 0, skipped: 0 }]));
  const totals = { used: 0, tamed: 0, skipped: 0 };
  for (const { cells } of rows) {
    const kind = cells[2], status = cells[3];
    table.get(kind)[status]++;
    totals[status]++;
  }
  console.log('| Kind | used | tamed | skipped | total |\n|---|---|---|---|---|');
  for (const [kind, counts] of table) console.log(`| ${kind} | ${counts.used} | ${counts.tamed} | ${counts.skipped} | ${counts.used + counts.tamed + counts.skipped} |`);
  console.log(`| **All kinds** | ${totals.used} | ${totals.tamed} | ${totals.skipped} | ${totals.used + totals.tamed + totals.skipped} |`);
}

export function runCounts() {
  const rows = readInstances();
  const problems = checkInstances(rows);
  if (problems.length) {
    console.error(`instances.md has ${problems.length} problem(s):\n${problems.map((problem) => `  ${problem}`).join('\n')}`);
    return 1;
  }
  printCounts(rows);
  return 0;
}
