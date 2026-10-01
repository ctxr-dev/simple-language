import { UsageError } from './util.mjs';

export const WINDOW_PATTERN = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?Z)?$/;

export function parseInstant(value, label) {
  if (typeof value !== 'string' || !WINDOW_PATTERN.test(value)) {
    throw new UsageError(`${label} must be UTC like 2025-09-10T00:00:00Z or a date like 2025-09-10. Got ${JSON.stringify(value)}.`);
  }
  const full = value.length === 10 ? `${value}T00:00:00Z` : value.length === 17 ? `${value.slice(0, 16)}:00Z` : value;
  const milliseconds = Date.parse(full);
  if (Number.isNaN(milliseconds) || formatInstant(milliseconds / 1000) !== full) {
    throw new UsageError(`${label} is not a real time: ${JSON.stringify(value)}.`);
  }
  return milliseconds / 1000;
}

export function formatInstant(seconds) {
  return new Date(seconds * 1000).toISOString().replace('.000Z', 'Z');
}

export function compactInstant(seconds) {
  return formatInstant(seconds).replace(/[-:]/g, '');
}
