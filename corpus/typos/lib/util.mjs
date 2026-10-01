import { writeFileSync, renameSync } from 'node:fs';

export class UsageError extends Error {}

export function compareText(a, b) {
  const x = a.toLowerCase(), y = b.toLowerCase();
  if (x !== y) return x < y ? -1 : 1;
  return a < b ? -1 : a > b ? 1 : 0;
}

export function atomicWrite(file, text) {
  const temporary = `${file}.tmp-${process.pid}`;
  writeFileSync(temporary, text);
  renameSync(temporary, file);
}

export const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
