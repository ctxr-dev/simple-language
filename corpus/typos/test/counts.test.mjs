import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { TYPOS_DIR, instanceRow, instancesText, makeWorkspace } from './fixtures/harness.mjs';

function parseCounts(stdout) {
  const rows = new Map();
  for (const line of stdout.split('\n').filter((entry) => entry.startsWith('| ') && !entry.startsWith('| Kind'))) {
    const [kind, used, tamed, skipped, total] = line.replace(/^\| /, '').replace(/ \|$/, '').split(' | ');
    rows.set(kind.replace(/\*/g, ''), { used: +used, tamed: +tamed, skipped: +skipped, total: +total });
  }
  return rows;
}

function dataRowsOf(markdown) {
  const lines = markdown.split('\n');
  const start = lines.indexOf('## Instances');
  return lines.slice(start + 1).filter((line) => line.startsWith('|')).slice(2);
}

async function counts(instances) {
  const workspace = makeWorkspace({ instances });
  try {
    return { result: await workspace.run(['--counts']) };
  } finally {
    workspace.dispose();
  }
}

test('--counts total equals the number of rows in the real instances.md', async () => {
  const text = readFileSync(path.join(TYPOS_DIR, 'instances.md'), 'utf8');
  const { result } = await counts(text);
  assert.equal(result.code, 0, result.stderr);
  const table = parseCounts(result.stdout);
  const all = table.get('All kinds');
  assert.equal(all.total, dataRowsOf(text).length);
  assert.equal(all.used + all.tamed + all.skipped, all.total);
  const kinds = [...table].filter(([kind]) => kind !== 'All kinds').map(([, row]) => row);
  assert.equal(kinds.reduce((sum, row) => sum + row.total, 0), all.total);
  assert.equal(kinds.reduce((sum, row) => sum + row.used, 0), all.used);
});

test('--counts splits a known fixture by kind and status', async () => {
  const rows = [
    instanceRow('aftsr', 'adjacent-key substitution', 'skipped', { note: 'Protected word: after.' }),
    instanceRow('ahout', 'adjacent-key substitution', 'used'),
    instanceRow('alomg', 'adjacent-key substitution', 'used'),
    instanceRow('defintely', 'dropped letter', 'used'),
    instanceRow('critizing', 'multi-edit', 'tamed', { note: 'Lighter form: criticzing (only the dropped i is kept).' }),
  ];
  const { result } = await counts(instancesText(rows));
  assert.equal(result.code, 0, result.stderr);
  const table = parseCounts(result.stdout);
  assert.deepEqual(table.get('adjacent-key substitution'), { used: 2, tamed: 0, skipped: 1, total: 3 });
  assert.deepEqual(table.get('dropped letter'), { used: 1, tamed: 0, skipped: 0, total: 1 });
  assert.deepEqual(table.get('multi-edit'), { used: 0, tamed: 1, skipped: 0, total: 1 });
  assert.deepEqual(table.get('adjacent transposition'), { used: 0, tamed: 0, skipped: 0, total: 0 });
  assert.deepEqual(table.get('All kinds'), { used: 3, tamed: 1, skipped: 1, total: 5 });
});

for (const [name, rows, message] of [
  ['a duplicate link and typed form', [
    instanceRow('ahout', 'adjacent-key substitution', 'used', { link: 'https://x/1' }),
    instanceRow('AHOUT', 'adjacent-key substitution', 'used', { link: 'https://x/1' }),
  ], /duplicate/],
  ['rows out of kind order', [
    instanceRow('defintely', 'dropped letter', 'used'),
    instanceRow('ahout', 'adjacent-key substitution', 'used'),
  ], /out of order/],
  ['an unknown kind', [instanceRow('ahout', 'fat finger', 'used')], /unknown kind/],
  ['a skipped row without a note', [instanceRow('aftsr', 'adjacent-key substitution', 'skipped')], /no note/],
  ['a tamed note without the Lighter form prefix', [instanceRow('critizing', 'multi-edit', 'tamed', { note: 'shorter' })], /Lighter form/],
]) {
  test(`--counts refuses ${name} and prints no table`, async () => {
    const { result } = await counts(instancesText(rows));
    assert.equal(result.code, 1);
    assert.match(result.stderr, message);
    assert.equal(result.stdout, '');
  });
}
