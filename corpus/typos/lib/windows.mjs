import { readFileSync } from 'node:fs';
import path from 'node:path';
import { UsageError } from './util.mjs';
import { parseInstant, formatInstant } from './instants.mjs';

const MIN_WINDOW_AGE_SECONDS = 3 * 24 * 3600;

export function loadWindows(file) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    throw new UsageError(`Cannot read windows file ${file}: ${error.message}`);
  }
  if (!Array.isArray(parsed)) throw new UsageError(`${file} must hold a JSON list of windows.`);
  const nowSeconds = Date.now() / 1000;
  const byKey = new Map();
  parsed.forEach((entry, index) => {
    const label = `Window ${index + 1} in ${path.basename(file)}`;
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
      throw new UsageError(`${label} must be an object with "after" and "before".`);
    }
    for (const key of Object.keys(entry)) {
      if (key !== 'after' && key !== 'before') throw new UsageError(`${label} has an unknown key: ${key}`);
    }
    const after = parseInstant(entry.after, `${label}: "after"`);
    const before = parseInstant(entry.before, `${label}: "before"`);
    if (after >= before) throw new UsageError(`${label}: "after" must be earlier than "before".`);
    if (before > nowSeconds - MIN_WINDOW_AGE_SECONDS) {
      throw new UsageError(`${label}: "before" is less than 3 days old. The archive still changes comments for about 36 hours, so a young window could give a different result later.`);
    }
    byKey.set(`${after}|${before}`, { after, before });
  });
  const sorted = [...byKey.values()].sort((a, b) => a.after - b.after || a.before - b.before);
  let latestEnd = -Infinity;
  for (const window of sorted) {
    if (window.after < latestEnd) {
      throw new UsageError(`The window ${formatInstant(window.after)} to ${formatInstant(window.before)} in ${path.basename(file)} overlaps an earlier window. Use windows that do not overlap.`);
    }
    latestEnd = Math.max(latestEnd, window.before);
  }
  return sorted;
}
