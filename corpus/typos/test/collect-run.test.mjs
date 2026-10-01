import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ARCHIVE_COMMENTS, WINDOW_A, WINDOW_B, WINDOW_C, closedPortUrl, ledgerRow, makeWorkspace, startArchive,
} from './fixtures/harness.mjs';

async function withArchive(options, body) {
  const archive = await startArchive(options);
  try {
    return await body(archive);
  } finally {
    await archive.close();
  }
}

async function withWorkspace(options, body) {
  const workspace = makeWorkspace(options);
  try {
    return await body(workspace);
  } finally {
    workspace.dispose();
  }
}

const epoch = (iso) => String(Date.parse(iso) / 1000);

test('a new window is fetched, written to candidates/, and recorded last in the ledger', async () => {
  await withArchive({}, (archive) => withWorkspace({}, async (workspace) => {
    workspace.writeWindows([WINDOW_A]);
    const result = await workspace.collect(archive.url);
    assert.equal(result.code, 0, result.stderr);
    assert.match(result.stdout, /fetched 4, kept 2, candidates 2/);
    assert.equal(archive.requests.length, 1);
    assert.equal(archive.requests[0].after, String(Number(epoch(WINDOW_A.after)) - 1));
    assert.equal(archive.requests[0].before, epoch(WINDOW_A.before));
    assert.equal(archive.requests[0].sort, 'asc');
    assert.deepEqual(workspace.candidateFiles(), ['testsub-20250910T000000Z-20250910T060000Z.md']);
    const candidates = workspace.read('candidates/testsub-20250910T000000Z-20250910T060000Z.md');
    assert.match(candidates, /one-edit: `wirh`/);
    assert.match(candidates, /one-edit: `tehre`/);
    assert.equal(candidates.match(/one-edit: `wirh`/g).length, 1);
    assert.match(candidates, /Dictionary: words\.txt, \d+ words, sha256 [0-9a-f]{12}/);
    assert.match(candidates, new RegExp(`Link: https://www\\.reddit\\.com${ARCHIVE_COMMENTS[0].permalink}`));
    const rows = workspace.read('sources.md').split('\n').filter((line) => line.startsWith('| testsub '));
    assert.equal(rows.length, 1);
    assert.match(rows[0], new RegExp(`^\\| testsub \\| ${WINDOW_A.after} \\| ${WINDOW_A.before} \\| 120 \\| 4 \\| 0 \\|`));
  }));
});

test('a window already in the ledger is skipped without any request', async () => {
  await withArchive({}, (archive) => withWorkspace({ ledgerRows: [ledgerRow('testsub', WINDOW_A)] }, async (workspace) => {
    workspace.writeWindows([WINDOW_A]);
    const before = workspace.read('sources.md');
    const result = await workspace.collect(archive.url);
    assert.equal(result.code, 0, result.stderr);
    assert.match(result.stdout, /Nothing to do/);
    assert.equal(archive.requests.length, 0);
    assert.equal(workspace.exists('candidates'), false);
    assert.equal(workspace.read('sources.md'), before);
  }));
});

test('the ledger match ignores subreddit case and only skips the exact window', async () => {
  await withArchive({}, (archive) => withWorkspace({ ledgerRows: [ledgerRow('TestSub', WINDOW_A)] }, async (workspace) => {
    workspace.writeWindows([WINDOW_A, WINDOW_B]);
    const result = await workspace.collect(archive.url);
    assert.equal(result.code, 0, result.stderr);
    assert.deepEqual(archive.requests.map((request) => request.before), [epoch(WINDOW_B.before)]);
    assert.deepEqual(workspace.candidateFiles(), ['testsub-20250910T060000Z-20250910T120000Z.md']);
  }));
});

test('a second run with the same inputs changes no file and makes no request', async () => {
  await withArchive({}, (archive) => withWorkspace({}, async (workspace) => {
    workspace.writeWindows([WINDOW_A, WINDOW_B]);
    const first = await workspace.collect(archive.url);
    assert.equal(first.code, 0, first.stderr);
    const ledgerAfterFirst = workspace.read('sources.md');
    const candidatesAfterFirst = workspace.candidatesSnapshot();
    const requestsAfterFirst = archive.requests.length;
    assert.equal(Object.keys(candidatesAfterFirst).length, 2);
    const second = await workspace.collect(archive.url);
    assert.equal(second.code, 0, second.stderr);
    assert.match(second.stdout, /Nothing to do/);
    assert.equal(archive.requests.length, requestsAfterFirst);
    assert.equal(workspace.read('sources.md'), ledgerAfterFirst);
    assert.deepEqual(workspace.candidatesSnapshot(), candidatesAfterFirst);
    assert.equal(workspace.ledgerRowCount(), 2);
  }));
});

test('two independent runs on the same input write byte-identical candidate files', async () => {
  await withArchive({}, (archive) => {
    const snapshotOf = (workspace) => workspace.collect(archive.url).then(() => workspace.candidatesSnapshot());
    return withWorkspace({}, (one) => withWorkspace({}, async (two) => {
      one.writeWindows([WINDOW_A]);
      two.writeWindows([WINDOW_A]);
      const first = await snapshotOf(one);
      const second = await snapshotOf(two);
      assert.equal(Object.keys(first).length, 1);
      assert.deepEqual(second, first);
    }));
  });
});

test('an unreachable archive exits 1 and writes no ledger row and no candidates file', async () => {
  const deadUrl = await closedPortUrl();
  await withWorkspace({}, async (workspace) => {
    workspace.writeWindows([WINDOW_A]);
    const before = workspace.read('sources.md');
    const result = await workspace.collect(deadUrl);
    assert.equal(result.code, 1);
    assert.match(result.stderr, /Network error/);
    assert.match(result.stderr, /Nothing was added to sources\.md/);
    assert.equal(workspace.read('sources.md'), before);
    assert.deepEqual(workspace.candidateFiles(), []);
  });
});

for (const [name, reply] of [
  ['an HTTP 500', { status: 500, body: 'boom' }],
  ['a body that is not JSON', { status: 200, body: '<html>maintenance</html>' }],
  ['an error object', { status: 200, body: JSON.stringify({ error: 'rate limited' }) }],
  ['a comment record without a permalink', { status: 200, body: JSON.stringify({ data: [{ id: 'x', created_utc: 1757500000, body: 'hello' }] }) }],
]) {
  test(`${name} from the archive exits 1 and leaves the ledger untouched`, async () => {
    await withArchive({ respond: () => reply }, (archive) => withWorkspace({}, async (workspace) => {
      workspace.writeWindows([WINDOW_A]);
      const before = workspace.read('sources.md');
      const result = await workspace.collect(archive.url);
      assert.equal(result.code, 1, result.stdout);
      assert.equal(workspace.read('sources.md'), before);
      assert.deepEqual(workspace.candidateFiles(), []);
    }));
  });
}

test('a failure on the second window keeps the first row, and a re-run does only the failed window', async () => {
  let failWindowB = true;
  const respond = (query) => (failWindowB && query.before === epoch(WINDOW_B.before) ? { status: 503, body: 'down' } : null);
  await withArchive({ respond }, (archive) => withWorkspace({}, async (workspace) => {
    workspace.writeWindows([WINDOW_A, WINDOW_B]);
    const failed = await workspace.collect(archive.url);
    assert.equal(failed.code, 1);
    assert.equal(workspace.ledgerRowCount(), 1);
    assert.match(workspace.read('sources.md'), new RegExp(`\\| testsub \\| ${WINDOW_A.after} \\| ${WINDOW_A.before} \\|`));
    assert.doesNotMatch(workspace.read('sources.md'), new RegExp(WINDOW_B.before));
    assert.deepEqual(workspace.candidateFiles(), ['testsub-20250910T000000Z-20250910T060000Z.md']);
    failWindowB = false;
    archive.requests.length = 0;
    const retried = await workspace.collect(archive.url);
    assert.equal(retried.code, 0, retried.stderr);
    assert.deepEqual(archive.requests.map((request) => request.before), [epoch(WINDOW_B.before)]);
    assert.equal(workspace.ledgerRowCount(), 2);
  }));
});

test('overlapping windows in the windows file are refused before any request', async () => {
  await withArchive({}, (archive) => withWorkspace({}, async (workspace) => {
    workspace.writeWindows([WINDOW_A, { after: '2025-09-10T03:00:00Z', before: '2025-09-10T09:00:00Z' }]);
    const before = workspace.read('sources.md');
    const result = await workspace.collect(archive.url);
    assert.equal(result.code, 2);
    assert.match(result.stderr, /overlaps/);
    assert.equal(archive.requests.length, 0);
    assert.equal(workspace.read('sources.md'), before);
    assert.deepEqual(workspace.candidateFiles(), []);
  }));
});

test('a window that overlaps a ledger row of the same subreddit is refused before any request', async () => {
  await withArchive({}, (archive) => withWorkspace({ ledgerRows: [ledgerRow('testsub', WINDOW_A)] }, async (workspace) => {
    workspace.writeWindows([{ after: '2025-09-10T03:00:00Z', before: '2025-09-10T09:00:00Z' }]);
    const before = workspace.read('sources.md');
    const result = await workspace.collect(archive.url);
    assert.equal(result.code, 2);
    assert.match(result.stderr, /overlaps the window 2025-09-10T00:00:00Z to 2025-09-10T06:00:00Z/);
    assert.equal(archive.requests.length, 0);
    assert.equal(workspace.read('sources.md'), before);
  }));
});

test('windows that only touch are allowed, and another subreddit may reuse the same hours', async () => {
  await withArchive({}, (archive) => withWorkspace({ ledgerRows: [ledgerRow('testsub', WINDOW_A)] }, async (workspace) => {
    workspace.writeWindows([WINDOW_B, WINDOW_C]);
    const touching = await workspace.collect(archive.url);
    assert.equal(touching.code, 0, touching.stderr);
    workspace.writeWindows([WINDOW_A]);
    const other = await workspace.collect(archive.url, { subreddits: 'othersub' });
    assert.equal(other.code, 0, other.stderr);
    assert.equal(workspace.ledgerRowCount(), 4);
  }));
});

test('a window that ends less than three days ago is refused', async () => {
  await withArchive({}, (archive) => withWorkspace({}, async (workspace) => {
    const now = Date.now();
    const iso = (milliseconds) => new Date(milliseconds).toISOString().replace(/\.\d+Z$/, 'Z');
    workspace.writeWindows([{ after: iso(now - 7 * 3600 * 1000), before: iso(now - 3600 * 1000) }]);
    const result = await workspace.collect(archive.url);
    assert.equal(result.code, 2);
    assert.match(result.stderr, /less than 3 days old/);
    assert.equal(archive.requests.length, 0);
  }));
});
