import { spawn } from 'node:child_process';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const TYPOS_DIR = path.resolve(TEST_DIR, '..');
export const DICT_FILE = path.join(TEST_DIR, 'fixtures', 'words.txt');

export const WINDOW_A = { after: '2025-09-10T00:00:00Z', before: '2025-09-10T06:00:00Z' };
export const WINDOW_B = { after: '2025-09-10T06:00:00Z', before: '2025-09-10T12:00:00Z' };
export const WINDOW_C = { after: '2025-09-10T12:00:00Z', before: '2025-09-10T18:00:00Z' };

const LEDGER_HEADER = [
  '| Subreddit | After | Before | Minimum length | Comments fetched | Comments read in full | Date processed | Note |',
  '|---|---|---|---|---|---|---|---|',
];

export function ledgerRow(subreddit, window) {
  return `| ${subreddit} | ${window.after} | ${window.before} | 120 | 1 | 1 | 2026-01-01 | seeded |`;
}

export function ledgerText(rows = []) {
  return ['# Sources', '', '## Archive windows', '', ...LEDGER_HEADER, ...rows, '', '## RSS threads', '', '| Thread | Note |', '|---|---|', ''].join('\n');
}

export function instancesText(rows = []) {
  return [
    '# Typo instances', '', '## Instances', '',
    '| Typed | Intended | Kind | Status | Note | Quote | Subreddit | Link |',
    '|---|---|---|---|---|---|---|---|',
    ...rows, '',
  ].join('\n');
}

export function instanceRow(typed, kind, status, { note = '', link = `https://www.reddit.com/r/t/comments/1/x/${typed}/` } = {}) {
  return `| \`${typed}\` | \`intended\` | ${kind} | ${status} | ${note} | some short quote | r/t | ${link} |`;
}

export function makeWorkspace({ ledgerRows = [], instances = instancesText() } = {}) {
  const root = mkdtempSync(path.join(realpathSync(os.tmpdir()), 'typos-test-'));
  const dir = path.join(root, 'typos');
  mkdirSync(dir);
  cpSync(path.join(TYPOS_DIR, 'collect.mjs'), path.join(dir, 'collect.mjs'));
  cpSync(path.join(TYPOS_DIR, 'lib'), path.join(dir, 'lib'), { recursive: true });
  writeFileSync(path.join(dir, 'sources.md'), ledgerText(ledgerRows));
  writeFileSync(path.join(dir, 'instances.md'), instances);
  const workspace = {
    dir,
    file: (name) => path.join(dir, name),
    read: (name) => readFileSync(path.join(dir, name), 'utf8'),
    write: (name, text) => writeFileSync(path.join(dir, name), text),
    exists: (name) => existsSync(path.join(dir, name)),
    candidateFiles: () => (existsSync(path.join(dir, 'candidates')) ? readdirSync(path.join(dir, 'candidates')).sort() : []),
    candidatesSnapshot: () => Object.fromEntries(workspace.candidateFiles().map((name) => [name, readFileSync(path.join(dir, 'candidates', name), 'utf8')])),
    ledgerRowCount: () => workspace.read('sources.md').split('## Archive windows')[1].split('\n## ')[0].split('\n').filter((line) => line.startsWith('|')).length - 2,
    writeWindows: (windows) => workspace.write('windows.json', JSON.stringify(windows)),
    run: (args) => runCollector(dir, args),
    collect: (apiBase, { subreddits = 'testsub', extra = [] } = {}) => runCollector(dir, ['--subreddits', subreddits, '--windows', path.join(dir, 'windows.json'), '--dict', DICT_FILE, '--api-base', apiBase, ...extra]),
    dispose: () => rmSync(root, { recursive: true, force: true }),
  };
  return workspace;
}

function runCollector(cwd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(cwd, 'collect.mjs'), ...args], { cwd });
    let stdout = '', stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });
}

const LONG_BODY_WITH_ONE_EDIT = 'we tried to ship the release wirh the new config yesterday and the deploy stalled for an hour before anyone saw the broken check on the main service';
const LONG_BODY_WITH_TRANSPOSITION = 'the team asked about it again after the morning meeting and tehre are still notes to read, thanks, the quick check on the release was fine';

export const ARCHIVE_COMMENTS = [
  { id: 'c1', created_utc: 1757500000, permalink: '/r/testsub/comments/p1/title/c1/', author: 'alice', body: LONG_BODY_WITH_ONE_EDIT },
  { id: 'c2', created_utc: 1757500100, permalink: '/r/testsub/comments/p1/title/c2/', author: 'bob', body: LONG_BODY_WITH_TRANSPOSITION },
  { id: 'c3', created_utc: 1757500200, permalink: '/r/testsub/comments/p1/title/c3/', author: 'carol', body: 'lol wirh' },
  { id: 'c4', created_utc: 1757500300, permalink: '/r/testsub/comments/p1/title/c4/', author: 'AutoModerator', body: LONG_BODY_WITH_ONE_EDIT },
];

export async function startArchive({ respond } = {}) {
  const requests = [];
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const query = Object.fromEntries(url.searchParams);
    requests.push({ path: url.pathname, ...query });
    const override = respond ? respond(query) : null;
    if (override) {
      response.writeHead(override.status ?? 200, { 'Content-Type': 'application/json' });
      response.end(override.body ?? '');
      return;
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ data: ARCHIVE_COMMENTS }));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return {
    url: `http://127.0.0.1:${server.address().port}`,
    requests,
    close: () => new Promise((resolve) => { server.closeAllConnections(); server.close(resolve); }),
  };
}

export async function closedPortUrl() {
  const probe = net.createServer();
  await new Promise((resolve) => probe.listen(0, '127.0.0.1', resolve));
  const { port } = probe.address();
  await new Promise((resolve) => probe.close(resolve));
  return `http://127.0.0.1:${port}`;
}
