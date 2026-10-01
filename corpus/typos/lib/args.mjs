import path from 'node:path';
import { HERE } from './paths.mjs';
import { UsageError, compareText } from './util.mjs';

const DEFAULT_API_BASE = 'https://arctic-shift.photon-reddit.com';
const DEFAULT_DICTIONARY = '/usr/share/dict/words';
const SUBREDDIT_PATTERN = /^[A-Za-z0-9_]{2,21}$/;

export const USAGE = `Usage: node collect.mjs --subreddits <a,b,c> [options]
       node collect.mjs --counts

Fetches comments for every (subreddit, window) pair that is not yet in sources.md,
writes candidates/<subreddit>-<after>-<before>.md, then appends a row to sources.md.

Options:
  --subreddits <list>   Comma separated subreddit names, for example devops,sysadmin.
  --windows <file>      Windows file (default: windows.json next to this script).
  --dict <file>         Word list, one word per line (default: ${DEFAULT_DICTIONARY}).
  --min-length <n>      Keep comments with a body of at least n characters (default: 120).
  --max-comments <n>    Fail if one window holds more than n comments (default: 5000).
  --api-base <url>      Archive base URL (default: ${DEFAULT_API_BASE}).
  --counts              Check instances.md and print the counts by kind and status.
  --help                Show this text.

Exit codes: 0 done, 1 run failed (network, data, write), 2 bad arguments or input files.`;

export function parseArgs(argv) {
  const options = {
    subreddits: null,
    windows: path.join(HERE, 'windows.json'),
    dict: DEFAULT_DICTIONARY,
    minLength: 120,
    maxComments: 5000,
    apiBase: DEFAULT_API_BASE,
    counts: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const takeValue = () => {
      const value = argv[++i];
      if (value === undefined) throw new UsageError(`${arg} needs a value.`);
      return value;
    };
    const takeInteger = () => {
      const value = Number(takeValue());
      if (!Number.isInteger(value) || value < 1) throw new UsageError(`${arg} needs a whole number of 1 or more.`);
      return value;
    };
    switch (arg) {
      case '--subreddits': options.subreddits = parseSubreddits(takeValue()); break;
      case '--windows': options.windows = path.resolve(takeValue()); break;
      case '--dict': options.dict = path.resolve(takeValue()); break;
      case '--min-length': options.minLength = takeInteger(); break;
      case '--max-comments': options.maxComments = takeInteger(); break;
      case '--api-base': options.apiBase = takeValue().replace(/\/+$/, ''); break;
      case '--counts': options.counts = true; break;
      case '--help': case '-h': options.help = true; break;
      default: throw new UsageError(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function parseSubreddits(text) {
  const names = text.split(',').map((name) => name.trim().replace(/^\/?r\//i, '')).filter(Boolean);
  for (const name of names) {
    if (!SUBREDDIT_PATTERN.test(name)) throw new UsageError(`Not a subreddit name: ${JSON.stringify(name)}`);
  }
  const seen = new Map();
  for (const name of names) if (!seen.has(name.toLowerCase())) seen.set(name.toLowerCase(), name);
  return [...seen.values()].sort(compareText);
}
