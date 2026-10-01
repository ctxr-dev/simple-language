#!/usr/bin/env node
import { mkdirSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { CANDIDATES_DIR } from './lib/paths.mjs';
import { UsageError, atomicWrite } from './lib/util.mjs';
import { formatInstant, compactInstant } from './lib/instants.mjs';
import { USAGE, parseArgs } from './lib/args.mjs';
import { loadWindows } from './lib/windows.mjs';
import { ledgerKey, readLedger, appendLedgerRow } from './lib/ledger.mjs';
import { loadLexicon } from './lib/lexicon.mjs';
import { decodeEntities } from './lib/prose.mjs';
import { findCandidates, findCandidatesInBody } from './lib/candidates.mjs';
import { fetchWindow } from './lib/archive.mjs';
import { isProse, candidatesFileText } from './lib/candidates-file.mjs';
import { runCounts } from './lib/instances.mjs';

async function processJob(options, lexicon, job) {
  const comments = await fetchWindow(options, job.subreddit, job.after, job.before);
  const kept = comments.filter((comment) => isProse(comment, options.minLength));
  const candidates = findCandidates(kept, lexicon);
  const fileName = `${job.subreddit.toLowerCase()}-${compactInstant(job.after)}-${compactInstant(job.before)}.md`;
  mkdirSync(CANDIDATES_DIR, { recursive: true });
  atomicWrite(path.join(CANDIDATES_DIR, fileName), candidatesFileText(job, comments.length, kept.length, candidates, lexicon, options.minLength));
  appendLedgerRow([
    job.subreddit, formatInstant(job.after), formatInstant(job.before), String(options.minLength), String(comments.length), '0',
    new Date().toISOString().slice(0, 10), `collect.mjs: ${kept.length} kept, ${candidates.length} candidates`,
  ]);
  console.log(`r/${job.subreddit} ${formatInstant(job.after)} to ${formatInstant(job.before)}: fetched ${comments.length}, kept ${kept.length}, candidates ${candidates.length} (candidates/${fileName})`);
}

async function main(argv) {
  const options = parseArgs(argv);
  if (options.help) { console.log(USAGE); return 0; }
  if (options.counts) return runCounts();
  if (!options.subreddits || options.subreddits.length === 0) throw new UsageError('--subreddits is required, for example --subreddits devops,sysadmin.');
  const lexicon = loadLexicon(options.dict);
  const windows = loadWindows(options.windows);
  const { processed, spans } = readLedger();
  const jobs = options.subreddits.flatMap((subreddit) => windows.map((window) => ({ subreddit, ...window })))
    .filter((job) => !processed.has(ledgerKey(job.subreddit, formatInstant(job.after), formatInstant(job.before))));
  for (const job of jobs) {
    const clash = spans.find((span) => span.subreddit === job.subreddit.toLowerCase() && job.after < span.before && span.after < job.before);
    if (clash) {
      throw new UsageError(`r/${job.subreddit} ${formatInstant(job.after)} to ${formatInstant(job.before)} overlaps the window ${clash.afterText} to ${clash.beforeText} that sources.md already holds. Use windows that do not overlap.`);
    }
  }
  if (jobs.length === 0) {
    console.log('Nothing to do: every window for these subreddits is already in sources.md.');
    return 0;
  }
  for (const job of jobs) await processJob(options, lexicon, job);
  return 0;
}

export { findCandidates, findCandidatesInBody, loadLexicon, decodeEntities };

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (error) => {
      if (error instanceof UsageError) {
        console.error(`collect.mjs: ${error.message}\nRun with --help for usage.`);
        process.exit(2);
      }
      console.error(`collect.mjs failed: ${error.message}\nNothing was added to sources.md for the window that failed. Fix the cause and run the same command again.`);
      process.exit(1);
    },
  );
}
