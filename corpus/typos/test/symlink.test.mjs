import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT = fileURLToPath(new URL('../collect.mjs', import.meta.url));

test('the script runs when started through a symlinked path', () => {
  const linkDir = mkdtempSync(path.join(os.tmpdir(), 'typos-link-'));
  try {
    const linked = path.join(linkDir, 'collect.mjs');
    symlinkSync(SCRIPT, linked);
    const result = spawnSync(process.execPath, [linked, '--counts'], { encoding: 'utf8' });
    assert.equal(result.status, 0);
    assert.match(result.stdout, /\*\*All kinds\*\*/);
  } finally {
    rmSync(linkDir, { recursive: true, force: true });
  }
});
