import { sleep, compareText } from './util.mjs';
import { formatInstant } from './instants.mjs';

const PAGE_SIZE = 100;
const PAUSE_BETWEEN_PAGES_MS = 300;
const REQUEST_TIMEOUT_MS = 60000;

async function getJson(url) {
  let response;
  try {
    response = await fetch(url, {
      headers: { 'User-Agent': 'ctxr-dev-simple-language-typo-corpus (https://github.com/ctxr-dev/simple-language)', Accept: 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw new Error(`Network error for ${url}: ${error.cause?.code || error.name}: ${error.message}`);
  }
  const text = await response.text();
  if (!response.ok) {
    const reset = response.headers.get('x-ratelimit-reset');
    throw new Error(`HTTP ${response.status} from ${url}${reset ? ` (rate limit resets in ${reset} seconds)` : ''}: ${text.slice(0, 200)}`);
  }
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`The archive did not return JSON for ${url}: ${text.slice(0, 200)}`);
  }
  if (json.error || !Array.isArray(json.data)) throw new Error(`The archive returned an error for ${url}: ${JSON.stringify(json.error ?? json).slice(0, 200)}`);
  return json.data;
}

export async function fetchWindow(options, subreddit, after, before) {
  const byId = new Map();
  let cursor = after - 1;
  for (;;) {
    const query = new URLSearchParams({ subreddit, after: String(cursor), before: String(before), limit: String(PAGE_SIZE), sort: 'asc' });
    const page = await getJson(`${options.apiBase}/api/comments/search?${query}`);
    for (const comment of page) {
      if (typeof comment.id !== 'string' || !Number.isInteger(comment.created_utc) || typeof comment.permalink !== 'string') {
        throw new Error(`A comment record has no id, created_utc or permalink (r/${subreddit}).`);
      }
      byId.set(comment.id, comment);
    }
    if (byId.size > options.maxComments) {
      throw new Error(`r/${subreddit} holds more than ${options.maxComments} comments in ${formatInstant(after)} to ${formatInstant(before)}. Use a shorter window.`);
    }
    if (page.length < PAGE_SIZE) break;
    const nextCursor = page[page.length - 1].created_utc - 1;
    if (nextCursor <= cursor) throw new Error(`The archive returned a full page with no progress for r/${subreddit}.`);
    cursor = nextCursor;
    await sleep(PAUSE_BETWEEN_PAGES_MS);
  }
  return [...byId.values()].sort((a, b) => a.created_utc - b.created_utc || compareText(a.id, b.id));
}
