import test from 'node:test';
import assert from 'node:assert/strict';
import { findCandidates, findCandidatesInBody, loadLexicon } from '../collect.mjs';
import { DICT_FILE } from './fixtures/harness.mjs';

const lexicon = loadLexicon(DICT_FILE);

const only = (body) => {
  const found = findCandidatesInBody(body, lexicon);
  assert.equal(found.length, 1, `expected one candidate, got ${JSON.stringify(found.map((c) => [c.family, c.text]))}`);
  return found[0];
};

test('flags a one-edit non-word and names the intended word', () => {
  const candidate = only('we shipped it fine but the deploy stalled wirh the new config');
  assert.equal(candidate.family, 'one-edit');
  assert.equal(candidate.text, 'wirh');
  assert.match(candidate.detail, /\bwith\b/);
});

test('flags an adjacent transposition', () => {
  const candidate = only('the team asked about it again and tehre are still notes');
  assert.equal(candidate.family, 'one-edit');
  assert.equal(candidate.text, 'tehre');
  assert.match(candidate.detail, /\bthere\b/);
});

test('flags a missing space between two words', () => {
  const candidate = only('the team asked about it and then orare still notes');
  assert.equal(candidate.family, 'joined');
  assert.equal(candidate.text, 'orare');
  assert.equal(candidate.detail, 'or are');
});

test('flags a space shifted one letter', () => {
  const found = findCandidatesInBody('please check the gauget he team asked about it', lexicon);
  const shifted = found.find((candidate) => candidate.family === 'space-moved');
  assert.ok(shifted, `no space-moved candidate in ${JSON.stringify(found.map((c) => [c.family, c.text]))}`);
  assert.equal(shifted.text, 'gauget he');
  assert.equal(shifted.detail, 'gauge the');
});

test('flags a contraction typed without its apostrophe', () => {
  const candidate = only('the team asked about it and we dont still read notes');
  assert.equal(candidate.family, 'missing-apostrophe');
  assert.equal(candidate.detail, "don't");
});

test('leaves ordinary text alone', () => {
  const body = "Anna said the team still read the notes after the meeting, and we don't ship before lunch. The deploy was fine, thanks.";
  assert.deepEqual(findCandidatesInBody(body, lexicon), []);
});

test('ignores typo-shaped text inside code, quotes, links and URLs', () => {
  const body = [
    'the team read `wirh` and `tehre` in the notes',
    '```',
    'wirh tehre orare',
    '```',
    '> a quoted line with wirh and tehre',
    'see [the notes](https://example.com/tehre/wirh) and https://example.com/orare',
    'ask u/wirh or r/tehre about it',
  ].join('\n');
  assert.deepEqual(findCandidatesInBody(body, lexicon), []);
});

test('reports a typo that sits next to masked text, with its position and context', () => {
  const body = 'run `wirh` again, then ship the release wirh the new config';
  const candidate = only(body);
  assert.equal(candidate.text, 'wirh');
  assert.equal(candidate.start, body.lastIndexOf('wirh'));
  assert.match(candidate.context, /release wirh the new config/);
});

test('does not flag a mid-sentence capitalised word, an ALL CAPS word or a word with a digit', () => {
  const body = 'the team asked Wirh about it, then WIRH and wirh2 were still in the notes';
  assert.deepEqual(findCandidatesInBody(body, lexicon), []);
});

test('drops a non-word that appears in two comments of the same window, because that is jargon', () => {
  const comment = (id, body) => ({ id, permalink: `/r/x/comments/1/t/${id}/`, body });
  const found = findCandidates([
    comment('a', 'the team asked about wirh and tehre again after the meeting'),
    comment('b', 'the team asked about wirh again after the meeting'),
  ], lexicon);
  assert.deepEqual(found.map((candidate) => candidate.text), ['tehre']);
  assert.equal(found[0].link, 'https://www.reddit.com/r/x/comments/1/t/a/');
});
