const CONTEXT_WORDS_EACH_SIDE = 6;

const HTML_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const FOREIGN_OR_CODE = /[0-9_@#/\\=<>{}|^$%&+]|[^\x00-\x7F\u2018\u2019\u201C\u201D\u2013\u2014\u2026]|[A-Za-z]\.[A-Za-z]/;
const WORD = /[A-Za-z]+(?:['\u2019][A-Za-z]+)*/g;

export function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, name) => {
    if (name[0] === '#') {
      const codePoint = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
      if (codePoint === 0x200b) return '';
      return codePoint > 0 && codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : match;
    }
    return HTML_ENTITIES[name.toLowerCase()] ?? match;
  });
}

function blank(text, pattern) {
  return text.replace(pattern, (match) => match.replace(/[^\n]/g, ' '));
}

export function maskNonProse(text) {
  let masked = blank(text, /```[\s\S]*?```/g);
  masked = blank(masked, /`[^`\n]*`/g);
  masked = blank(masked, /^[ \t]*>.*$/gm);
  masked = masked.replace(/\[([^\]\n]*)\]\(([^)\n]*)\)/g, (match, label) => ` ${label}${' '.repeat(match.length - label.length - 1)}`);
  masked = blank(masked, /https?:\/\/[^\s)]+|www\.[^\s)]+/g);
  masked = blank(masked, /(^|[\s(])\/?[ur]\/[A-Za-z0-9_-]+/g);
  return blank(masked, /[*~]+/g);
}

function redactUsernames(text) {
  return text.replace(/(^|[\s(])\/?u\/[A-Za-z0-9_-]+/g, '$1u/[user]');
}

export function proseChunks(masked) {
  const chunks = [];
  for (const match of masked.matchAll(/\S+/g)) {
    if (!FOREIGN_OR_CODE.test(match[0])) chunks.push({ text: match[0], start: match.index });
  }
  return chunks;
}

export function startsSentence(masked, index) {
  let i = index - 1;
  while (i >= 0 && /[\s("'[\u201C\u2018]/.test(masked[i])) i--;
  return i < 0 || /[.!?\n]/.test(masked[i]) || masked.slice(i + 1, index).includes('\n');
}

export function wordTokens(chunk) {
  return [...chunk.text.matchAll(WORD)].map((match) => ({ text: match[0], start: chunk.start + match.index, end: chunk.start + match.index + match[0].length }));
}

export function contextAround(original, start, end) {
  const chunks = [...original.matchAll(/\S+/g)];
  const first = chunks.findIndex((chunk) => chunk.index + chunk[0].length > start);
  let last = first;
  while (last + 1 < chunks.length && chunks[last + 1].index < end) last++;
  const from = Math.max(0, first - CONTEXT_WORDS_EACH_SIDE);
  const to = Math.min(chunks.length - 1, last + CONTEXT_WORDS_EACH_SIDE);
  const snippet = original.slice(chunks[from].index, chunks[to].index + chunks[to][0].length);
  return redactUsernames(snippet.replace(/\s+/g, ' '));
}
