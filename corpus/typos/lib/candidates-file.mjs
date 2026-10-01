import { formatInstant } from './instants.mjs';

export function isProse(comment, minLength) {
  return typeof comment.body === 'string' && comment.body.length >= minLength
    && comment.author !== 'AutoModerator' && !/bot$/i.test(comment.author || '');
}

export function candidatesFileText(job, fetched, kept, candidates, lexicon, minLength) {
  const lines = [
    `# Candidates: r/${job.subreddit}, ${formatInstant(job.after)} to ${formatInstant(job.before)}`,
    '',
    'Made by collect.mjs. Do not edit by hand. Read README.md, section "Classify the candidates".',
    '',
    `- Subreddit: ${job.subreddit}`,
    `- After (included): ${formatInstant(job.after)}`,
    `- Before (not included): ${formatInstant(job.before)}`,
    `- Minimum body length: ${minLength}`,
    `- Dictionary: ${lexicon.description}`,
    `- Comments fetched: ${fetched}`,
    `- Comments kept: ${kept}`,
    `- Candidates: ${candidates.length}`,
    '',
    '## Candidates',
  ];
  candidates.forEach((candidate, index) => {
    lines.push('', `### ${index + 1}. ${candidate.family}: ${'`'}${candidate.text}${'`'}`, `- Detail: ${candidate.detail}`, `- Context: ${candidate.context}`, `- Link: ${candidate.link}`);
  });
  return `${lines.join('\n')}\n`;
}
