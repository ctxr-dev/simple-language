import { APOSTROPHE_FORMS, COMMONLY_SPLIT_WORDS, JOINABLE_FUNCTION_WORDS, isInformalOrVariantSpelling } from './lexicon.mjs';
import { startsSentence, wordTokens } from './prose.mjs';

const MIN_ONE_EDIT_LENGTH = 4;

const SINGLE_LETTERS_THAT_ARE_WORDS = new Set(['a', 'i', 'u', 'r', 'k']);

export function findOneEditNonWords(masked, chunks, lexicon) {
  const flagged = [];
  for (const chunk of chunks.filter((candidate) => !candidate.text.includes('-'))) {
    for (const token of wordTokens(chunk)) {
      const lower = token.text.toLowerCase();
      if (lower.length < MIN_ONE_EDIT_LENGTH || /['\u2019]/.test(lower)) continue;
      const upper = token.text.slice(1) !== token.text.slice(1).toLowerCase();
      const capitalised = token.text[0] !== lower[0];
      if (upper || (capitalised && !startsSentence(masked, token.start))) continue;
      if (lexicon.isKnown(lower) || isInformalOrVariantSpelling(lower, lexicon)) continue;
      const suggestions = lexicon.exactSuggestions(lower);
      if (suggestions.length) flagged.push({ family: 'one-edit', text: token.text, detail: suggestions.slice(0, 3).join(', '), start: token.start, end: token.end });
    }
  }
  return flagged;
}

export function findStrayLetters(chunks) {
  const flagged = [];
  chunks.forEach((chunk, index) => {
    const before = chunks[index - 1], after = chunks[index + 1];
    if (!before || !after) return;
    const loneLetter = /^[a-z][,;!?]?$/.test(chunk.text) && !SINGLE_LETTERS_THAT_ARE_WORDS.has(chunk.text[0]);
    const spaced = before.start + before.text.length + 1 === chunk.start && chunk.start + chunk.text.length + 1 === after.start;
    if (loneLetter && spaced && /^[A-Za-z']+$/.test(before.text) && /^[A-Za-z']+$/.test(after.text)) {
      flagged.push({ family: 'stray-letter', text: chunk.text[0], detail: `between "${before.text}" and "${after.text}"`, start: chunk.start, end: chunk.start + 1 });
    }
  });
  return flagged;
}

export function findMissingApostrophes(chunks) {
  return chunks.flatMap((chunk) => wordTokens(chunk)
    .filter((token) => token.text !== token.text.toUpperCase() && Object.hasOwn(APOSTROPHE_FORMS, token.text.toLowerCase()))
    .map((token) => ({ family: 'missing-apostrophe', text: token.text, detail: APOSTROPHE_FORMS[token.text.toLowerCase()], start: token.start, end: token.end })));
}

export function findSemicolonApostrophes(chunks) {
  return chunks.flatMap((chunk) => [...chunk.text.matchAll(/(?<![A-Za-z])([A-Za-z]+);(s|t|d|m|ll|re|ve)(?![A-Za-z])/g)].map((match) => ({
    family: 'apostrophe-key',
    text: match[0],
    detail: `${match[1]}'${match[2]}`,
    start: chunk.start + match.index,
    end: chunk.start + match.index + match[0].length,
  })));
}

function splitIntoTwoWords(lower, lexicon) {
  for (let cut = 1; cut < lower.length; cut++) {
    const left = lower.slice(0, cut), right = lower.slice(cut);
    const leftIsWord = left === 'a' || (left.length >= 2 && lexicon.isKnown(left));
    const rightIsWord = right.length >= 2 && lexicon.isKnown(right);
    const usesFunctionWord = JOINABLE_FUNCTION_WORDS.has(left) || JOINABLE_FUNCTION_WORDS.has(right);
    const otherPieceLongEnough = JOINABLE_FUNCTION_WORDS.has(left) ? right.length >= 3 : left.length >= 3;
    if (leftIsWord && rightIsWord && usesFunctionWord && otherPieceLongEnough) return `${left} ${right}`;
  }
  return null;
}

export function findSpaceProblems(chunks, lexicon) {
  const flagged = [];
  const isWord = (word) => (word.length === 1 ? word === 'a' || word === 'i' : lexicon.isKnown(word));
  chunks.forEach((chunk, index) => {
    const lowerChunk = chunk.text.toLowerCase();
    if (/^[a-z]{5,}$/.test(chunk.text) && !lexicon.isKnown(lowerChunk) && !isInformalOrVariantSpelling(lowerChunk, lexicon)) {
      const parts = splitIntoTwoWords(lowerChunk, lexicon);
      if (parts) flagged.push({ family: 'joined', text: chunk.text, detail: parts, start: chunk.start, end: chunk.start + chunk.text.length });
    }
    const next = chunks[index + 1];
    if (!next || next.start !== chunk.start + chunk.text.length + 1) return;
    if (!/^[A-Za-z][a-z]*$/.test(chunk.text) || !/^[A-Za-z][a-z]*$/.test(next.text)) return;
    const left = lowerChunk, right = next.text.toLowerCase();
    const span = { start: chunk.start, end: next.start + next.text.length };
    const joined = left + right;
    const bothAreWords = isWord(left) && isWord(right);
    if (joined.length >= 4 && lexicon.isKnown(joined) && (!bothAreWords || COMMONLY_SPLIT_WORDS.has(joined))) {
      flagged.push({ family: 'split', text: `${chunk.text} ${next.text}`, detail: joined, ...span });
    } else if (!bothAreWords) {
      const usable = ([a, b]) => a.length >= 2 && b.length >= 2 && lexicon.isKnown(a) && lexicon.isKnown(b)
        && (JOINABLE_FUNCTION_WORDS.has(a) || JOINABLE_FUNCTION_WORDS.has(b));
      const shifted = [[left + right[0], right.slice(1)], [left.slice(0, -1), left.slice(-1) + right]].find(usable);
      if (shifted) flagged.push({ family: 'space-moved', text: `${chunk.text} ${next.text}`, detail: shifted.join(' '), ...span });
    }
  });
  return flagged;
}
