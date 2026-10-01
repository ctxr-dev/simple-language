# Typo kinds

Which typos to put in a draft written as the user, and how to make each one. The kinds and weights come from typing studies and from real, uncorrected Reddit comments. The evidence, the sources and the method to add more are in [`corpus/typos/`](../corpus/typos/README.md).

## How many

About one typo every two to three sentences, averaged across drafts. A draft of one sentence usually has none. Never place a typo to hit a count, and never put two in one sentence.

Real people make fewer. In hand-read Reddit comments it was about one slip every 14 to 21 sentences, and they cluster in a few hurried messages. The higher rate here is a deliberate choice.

## The kinds you may use

Pick a kind roughly by its weight, and do not repeat the kind of the previous typo in the same draft. Each typo is exactly one of these, and only one edit.

| Kind | Weight | How to make it | Real examples |
|---|---|---|---|
| adjacent-key substitution | 25 | Replace one letter with a key that touches it on a QWERTY keyboard | wirh for with, switxh for switch, ehile for while |
| dropped letter | 22 | Leave out one letter, usually a vowel or one of two consonants in a row | diffrent, defintely, exept, aparment |
| adjacent transposition | 14 | Swap two neighbouring letters, most often one typed by each hand | tehre for there, alseep for asleep |
| extra letter | 9 | Add one letter from a key next to the letter before or after it | windowq, suitablev, horizion |
| doubled letter | 7 | Type one letter twice | uppsetting, insurred, variationns |
| dropped letter of a double | 6 | Type a double letter once | progres, possesion, finaly |
| missing space | 6 | Join two short ordinary words | ina chaotic, orare you |
| space shifted | 4 | Type the space one key late, so a letter jumps to the next word | o fmistakes for of mistakes |
| extra space | 4 | Put a space inside one word | t hat for that |

## Where a typo lands

- On an ordinary word of five letters or more most of the time, and never on a word under four letters, except in the three space kinds.
- In the middle or at the end of the word. The first letter is almost never wrong.
- The space kinds join or split ordinary words only. Both words must be ordinary, and the result must still be easy to read.

## Never

- A typo that makes a different real word, like not to now, form to from, or the to they. Readers do not see these as typos; they read a different sentence.
- A spelling mistake rather than a finger slip, like recieve, seperate, definately or visable. It reads as not knowing the word, not as typing fast.
- A repeated word, a dropped word or an extra word. These change or blur the meaning.
- Two edits in one word, or two typos in one sentence.
- Any typo on something `### What still binds` protects: numbers, tokens, identifiers, technical terms, negations, scope and quantifier words, conditions, causal words, hedges, and the words of a question or request.

The user's own patterns from `references/sample-registry.md` win over this table for kind and rate. They never win over the Never list.
