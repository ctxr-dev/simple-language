import { compareText } from './util.mjs';
import { decodeEntities, maskNonProse, proseChunks, contextAround } from './prose.mjs';
import {
  findOneEditNonWords, findStrayLetters, findMissingApostrophes, findSemicolonApostrophes, findSpaceProblems,
} from './detectors.mjs';

const JARGON_REPEAT_COUNT = 2;

export function findCandidatesInBody(body, lexicon) {
  const original = decodeEntities(body);
  const masked = maskNonProse(original);
  const chunks = proseChunks(masked);
  const flagged = [
    ...findOneEditNonWords(masked, chunks, lexicon),
    ...findStrayLetters(chunks),
    ...findSemicolonApostrophes(chunks),
    ...findMissingApostrophes(chunks),
    ...findSpaceProblems(chunks, lexicon),
  ];
  const covered = (strayLetter) => flagged.some((other) => other.family !== 'stray-letter' && other.family !== 'one-edit'
    && other.start <= strayLetter.start && strayLetter.end <= other.end);
  return flagged
    .filter((candidate) => candidate.family !== 'stray-letter' || !covered(candidate))
    .sort((a, b) => a.start - b.start || compareText(a.family, b.family))
    .map((candidate) => ({ ...candidate, context: contextAround(original, candidate.start, candidate.end) }));
}

const isJargonFamily = (candidate) => candidate.family === 'one-edit' || candidate.family === 'joined';

export function findCandidates(comments, lexicon) {
  const perComment = comments.map((comment) => ({ comment, found: findCandidatesInBody(comment.body, lexicon) }));
  const commentsHoldingWord = new Map();
  for (const { found } of perComment) {
    const words = new Set(found.filter(isJargonFamily).map((candidate) => candidate.text.toLowerCase()));
    for (const word of words) commentsHoldingWord.set(word, (commentsHoldingWord.get(word) || 0) + 1);
  }
  const result = [];
  for (const { comment, found } of perComment) {
    const seen = new Set();
    for (const candidate of found) {
      const key = `${candidate.family}|${candidate.text.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (isJargonFamily(candidate) && commentsHoldingWord.get(candidate.text.toLowerCase()) >= JARGON_REPEAT_COUNT) continue;
      result.push({ ...candidate, link: `https://www.reddit.com${comment.permalink}` });
    }
  }
  return result;
}
