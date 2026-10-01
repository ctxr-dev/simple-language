import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { UsageError } from './util.mjs';

export const JOINABLE_FUNCTION_WORDS = new Set(`a about all an and any are as at be but by can did do each every for from had has have he her his
i if in into is it its me my no not of on one or our out she so some than that the their them then there they this to up us was we were
what when which who will with would you your`.split(/\s+/));
export const APOSTROPHE_FORMS = {
  dont: "don't", doesnt: "doesn't", didnt: "didn't", cant: "can't", couldnt: "couldn't", wont: "won't", wouldnt: "wouldn't",
  shouldnt: "shouldn't", isnt: "isn't", arent: "aren't", wasnt: "wasn't", werent: "weren't", hasnt: "hasn't", havent: "haven't",
  hadnt: "hadn't", mustnt: "mustn't", thats: "that's", whats: "what's", theres: "there's", heres: "here's", whos: "who's",
  youre: "you're", youve: "you've", youll: "you'll", youd: "you'd", theyre: "they're", theyve: "they've", theyll: "they'll",
  theyd: "they'd", weve: "we've", ive: "I've", im: "I'm", hes: "he's", shes: "she's",
};
const APOSTROPHE_HABITS = new Set(Object.keys(APOSTROPHE_FORMS));
const EXTRA_KNOWN_WORDS = new Set(`aint lmao lmfao imho afaik gonna wanna gotta kinda sorta dunno lemme gimme yeah yeap yep yup nope nah okay tldr thx
plz pls bruh cuz nvm omfg wtf fyi idk tbh ngl smh lol haha hmm uh oops bro ppl thru outta ish
has paid heard became held women feet hang box mom info etc anymore anytime hype fridge meme bio proud shit shitty fuck fucking fucked bullshit
asshole assholes dumbass crappy porn vibe vibes ads boyfriend boyfriends girlfriend overreacting quitting
email emails online offline internet website websites app apps laptop laptops desktop smartphone download upload username usernames wifi
paycheck coworker coworkers mindset timeline downtime escalation meantime expertise healthcare workforce upfront paperwork lifestyle
backpack bandwagon catalog clickbait coursework dealbreaker headcount shortcut mainstream ballpark blacklist whitelist downvote upvote
standalone spreadsheet screenshots troubleshooting uptime worldwide worthwhile workspace workstation rewritten overwritten prioritize
prioritized arguably automate automation outsource outsourced onboard onboarding buyout popup inline startup startups freelance
api apis aws azure gcp devops kubernetes backend frontend fullstack database databases config configs repo repos github gitlab linux ubuntu
microsoft google facebook youtube linkedin netflix android iphone ipad macbook json yaml html css sql nosql http https url urls cli gui sdk
runtime codebase codebases plugin plugins workflow workflows postgres mysql mongodb redis nginx terraform ansible jira kanban saas paas iaas
serverless microservice microservices webhook webhooks dataset datasets metadata timestamp timestamps filename filenames hostname hostnames
localhost stdout stderr stdin regex llm llms chatgpt gpu gpus cpu vpn dns tcp pdf pdfs wiki async debug debugging refactor decouple endpoint
endpoints payload helpdesk firmware firewall reddit subreddit subreddits sqlite welp distro upcharge byproduct`.split(/\s+/));
export const COMMONLY_SPLIT_WORDS = new Set(`alright anything anyway anywhere everything everywhere nobody nothing somebody someone something
sometimes somewhere together without whenever wherever whatever however altogether always almost although another beside cannot therefore
moreover otherwise instead inside outside within`.split(/\s+/));
const SPELLING_VARIANTS = [
  [/is(ation|ations|ed|es|ing|er|ers)$/, 'iz$1'], [/ise$/, 'ize'], [/yse$/, 'yze'], [/ysed$/, 'yzed'], [/ysing$/, 'yzing'],
  [/our(s|ed|ing|able|ite)?$/, 'or$1'], [/ence$/, 'ense'], [/ogue$/, 'og'], [/tre$/, 'ter'], [/ll(ed|ing|er)$/, 'l$1'],
  [/ement$/, 'ment'],
];

export function loadLexicon(file) {
  let raw;
  try {
    raw = readFileSync(file);
  } catch (error) {
    throw new UsageError(`Dictionary file not found or unreadable: ${file}. Pass --dict <file> with one word per line (${error.code || error.message}).`);
  }
  const entries = raw.toString('utf8').split(/\r?\n/).map((word) => word.trim().toLowerCase()).filter((word) => /^[a-z']+$/.test(word));
  if (entries.length === 0) throw new UsageError(`Dictionary file has no usable words: ${file}`);
  const words = new Set(entries);
  const knownStem = (word) => words.has(word);
  const isKnown = (word) => knownStem(word) || stemsOf(word).some(knownStem) || JOINABLE_FUNCTION_WORDS.has(word) || EXTRA_KNOWN_WORDS.has(word) || APOSTROPHE_HABITS.has(word);
  return {
    isKnown,
    has: (word) => words.has(word),
    exactSuggestions: (word) => oneEditNeighbours(word, words),
    description: `${path.basename(file)}, ${words.size} words, sha256 ${createHash('sha256').update(raw).digest('hex').slice(0, 12)}`,
  };
}

function stemsOf(word) {
  const stems = [];
  const strip = (suffix, replacements, { minBase = 3, doubling = false } = {}) => {
    if (!word.endsWith(suffix)) return;
    const base = word.slice(0, -suffix.length);
    for (const replacement of replacements) if ((base + replacement).length >= minBase) stems.push(base + replacement);
    if (doubling && base.length >= minBase + 1 && /[^aeiou][aeiou]([bdgklmnprt])\1$/.test(base)) stems.push(base.slice(0, -1));
  };
  strip('ies', ['y'], { minBase: 3 }); strip('es', [''], { minBase: 3 }); strip('s', [''], { minBase: 3 });
  strip('ied', ['y']); strip('ed', ['', 'e'], { doubling: true }); strip('ing', ['', 'e'], { doubling: true });
  strip('ily', ['y']); strip('ly', ['']);
  strip('ier', ['y']); strip('er', ['', 'e'], { doubling: true });
  strip('iest', ['y']); strip('est', ['', 'e'], { doubling: true });
  return stems;
}

export function isInformalOrVariantSpelling(lower, lexicon) {
  if (/([aeiou])\1\1|(.)\2\2$/.test(lower)) return true;
  if (lower.endsWith('in') && lexicon.isKnown(`${lower}g`)) return true;
  return SPELLING_VARIANTS.some(([pattern, replacement]) => {
    const variant = lower.replace(pattern, replacement);
    return variant !== lower && lexicon.isKnown(variant);
  });
}

function oneEditNeighbours(word, exactWords) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const found = new Set();
  const consider = (candidate) => { if (candidate !== word && exactWords.has(candidate)) found.add(candidate); };
  for (let i = 0; i <= word.length; i++) {
    if (i < word.length) consider(word.slice(0, i) + word.slice(i + 1));
    if (i < word.length - 1) consider(word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2));
    for (const letter of letters) {
      if (i < word.length) consider(word.slice(0, i) + letter + word.slice(i + 1));
      consider(word.slice(0, i) + letter + word.slice(i));
    }
  }
  return [...found].sort();
}
