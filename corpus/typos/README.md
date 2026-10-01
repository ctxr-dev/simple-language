# Typo corpus

This folder is a public record of how real people mistype. The simple-language skill uses it when it writes a message as the user. In that mode the skill adds a rare typo, so the text looks typed by a hurried person. The corpus shows which typos are real and which kinds the skill may copy.

The skill's own rules for placing a typo are in `references/typo-kinds.md`, at the repository root. This folder holds the evidence, and the method to add more.

The corpus makes three promises:

1. Every example is a real typo from a public source. It has a short verbatim quote and a link.
2. Every source that was processed is written in `sources.md`. A source in that ledger is never processed again.
3. Running the method again on the same sources gives the same files.

The user's private writing samples are not part of this corpus. They stay on the user's own machine under `~/.simple-language/` and never come here.

## What is in this folder

| File | What it holds |
|---|---|
| `README.md` | This method. |
| `sources.md` | The ledger. One row for each archive query window, each RSS thread and each study that was processed. |
| `instances.md` | Every typo found, one row each, with its kind and its status. |
| `literature.md` | What typing studies say about error kinds and error rates. |
| `windows.json` | The query windows for the next run of `collect.mjs`. It ships as an empty list. |
| `collect.mjs` | The script that fetches comments and lists candidate typos. It reads the command line, then calls the modules in `lib/`. |
| `lib/` | The modules that `collect.mjs` uses: archive fetching, window and ledger handling, word list, candidate detection, and the candidate and count output. |

`collect.mjs` also makes a working folder named `candidates/`. It is not part of the record. Do not commit it.

## Where the data comes from

**The Arctic Shift archive.** Arctic Shift is a public research archive of Reddit. The script asks it for the comments of one subreddit between two times, oldest first, 100 at a time. The address is `https://arctic-shift.photon-reddit.com/api/comments/search`. The archive treats both times as excluded. The script moves the start back by one second, so the "After" time of a window is included and the "Before" time is not.

**Reddit RSS feeds.** Reddit serves each thread as a feed. The address is the thread address plus `/.rss?limit=100&sort=top`. The feed is slow and shows only the top comments. The script does not read feeds. A person or an agent reads a feed by hand and writes one row in `sources.md` for the thread.

**Studies.** The typing studies are summarised in `literature.md`. Each one is also a row in `sources.md`, with its address and a status of `read` or `unavailable`.

**Quotes and links.** Reddit comments belong to their authors. The corpus keeps short quotes and links so that every claim can be checked, and nothing more.

- A quote is under 20 words. It is copied exactly: same letters, same case, same punctuation. The typo is not fixed. If the comment has a line break inside the quote, write one space instead.
- The archive stores some characters as HTML entities, such as `&gt;`. They stay as stored.
- A link is the permalink of the comment. It points at one comment.
- No user names. Never write an author name or a `u/name` mention. If a quote holds one, pick another part of the comment.
- Some comments are about hard subjects. A quote is here only as proof of how a word was typed. Nothing from its content belongs in a draft.

## The 17 kinds

Use these names, written exactly like this. They are the only values allowed in the Kind column of `instances.md`.

| Kind | What happened | Example (typed, then meant) |
|---|---|---|
| adjacent-key substitution | One letter is replaced by a key that touches it on a QWERTY keyboard. | `wirh`, `with` |
| dropped letter | One letter is missing. | `defintely`, `definitely` |
| adjacent transposition | Two neighbouring letters are swapped. | `tehre`, `there` |
| extra letter | One extra letter is added. It is not a repeat of a neighbour. | `windowq`, `window` |
| doubled letter | A letter is typed twice in a word that has it once. | `uppsetting`, `upsetting` |
| dropped letter of a double | A double letter is typed once. | `progres`, `progress` |
| missing space | Two words are joined. | `toapply`, `to apply` |
| extra space | A space lands inside one word. | `t hat`, `that` |
| space shifted | The space lands one character late or early, so a letter jumps to the next word. | `gauget he`, `gauge the` |
| shift held too long | The shift key stays down for the second letter, so a word starts with two capitals. | `THey`, `They`. No real example yet. literature.md cites a patent that describes it. |
| missing apostrophe | The apostrophe of a contraction is left out. | `dont`, `don't` |
| phonetic misspelling | The writer spells the word the way it sounds. This is a spelling habit, not a slip. | `seperately`, `separately` |
| real-word typo | The slip lands on another real word. | `nor alone`, `not alone` |
| repeated word | A word is typed twice in a row. | `to to`, `to` |
| dropped or extra word | A word is missing or one word too many is there. | `a lot them`, `a lot of them` |
| multi-edit | More than one edit in one word or phrase. | `critizing`, `criticizing` |
| other | Anything else, such as a period typed for a space, or a capital in the middle of a sentence. | `tell.you`, `tell you` |

The count for each kind is in the Counts section below. No real example of "shift held too long" has been found yet.

## Status values

Every row in `instances.md` has one of three statuses. They say what the skill may do with the example.

### used

A clean one-edit example that the skill may imitate. A row is `used` when all of these are true:

1. The kind is not banned. The banned kinds are real-word typo, phonetic misspelling, repeated word and dropped or extra word. A banned kind makes the writer look careless, or it changes the meaning.
2. The slip is one edit.
3. The typed form is not a real word. For a joined or split form, at least one piece must not be a word.
4. The word has four or more letters. For a space kind, the intended words together must have four or more letters. The missing apostrophe kind has no length test, because its edit is not inside a word (`dont`, `Im`).
5. The slip is not on a protected word. These are the words the skill keeps exact:
   - negations: not, no, never, none, nothing, without, unless, except, and every contraction with n't
   - scope words: only, all, every, some, most, both
   - conditions and time limits: if, when, until, before, after
   - causal words: because, so
   - uncertainty words: think, sure, maybe, probably, perhaps, guess
   - requests: please
   - names of tools, products and other technical terms, such as Kubernetes or GitHub

   The one exception is a missing apostrophe, such as `dont` or `cant`. It changes no letter, so it is allowed even on a negation.
6. It does not read as bad spelling. That rules out a swapped `i` and `e` (`recieve`), any word on the Wikipedia list of commonly misspelled English words, and habitual run-ons (`alot`, `atleast`, `eachother`).
7. It is a finger slip, not a style. A mid-sentence capital, a double space and a wrong letter that is not on a neighbouring key are not clean slips.

A missing apostrophe is `used` unless the form without the apostrophe is another common word. `its`, `were`, `ill`, `well`, `hell`, `id`, `shed`, `wed`, `hed` and `shell` are such words, so those rows are skipped.

### tamed

A real slip that is too heavy as written. The row records the lighter one-edit form that the skill would imitate. The original stays in the Typed column as evidence. The next section gives the rules.

### skipped

Registered as processed, and never imitated. A skipped row needs a reason in the Note column. It keeps the evidence, and it stops anyone from judging the same example twice.

These are the reasons used so far, with the number of rows for each:

| Reason | Rows |
|---|---|
| Banned kind: phonetic misspelling | 28 |
| Banned kind: real-word typo | 28 |
| Banned kind: dropped or extra word | 8 |
| Banned kind: repeated word | 7 |
| Protected word | 31 |
| Reads as bad spelling | 18 |
| Not a clean one-edit slip | 10 |
| Word under four letters | 9 |
| Real word | 4 |
| Apostrophe form is another word | 4 |
| **All skipped rows** | 147 |

## Taming rules

Taming applies only to a slip that has more than one edit, or to a punctuation slip. A row is `tamed` when one of its own edits can stand alone as a light slip that passes every test for `used`.

1. Keep one edit and undo the rest. Keep the edit that is most typical for its kind: a dropped letter, a swapped pair, a doubled letter, a dropped apostrophe or a missing space.
2. The kept edit must come from the writer's own slip. Never invent a new typo.
3. A period typed for a space becomes a missing space. `tell.you` becomes `tellyou`.
4. A dropped apostrophe that comes with another slip keeps only the apostrophe. `do t know` becomes `dont know`, and `havnt` becomes `havent`.
5. A slip with both a stray space and a missing space keeps the missing space. `morecrecently` becomes `morerecently`.
6. Two swapped pairs keep the first pair. `fornt ot` becomes `fornt of`.
7. The lighter form must pass the tests for `used`. If no lighter form passes, the row is `skipped` and the note says why.
8. Write the note as `Lighter form: <form> (<which edit is kept>).` `collect.mjs --counts` checks that each tamed note starts with `Lighter form:`.

## Add a new batch

Follow the steps in order. Each step is safe to repeat.

1. **Pick the sources.** Choose subreddits. Choose windows in UTC, one to six hours long, that end at least three days ago. Windows must not overlap each other or a window already in `sources.md`. A busy subreddit holds many comments an hour, and the script stops with an error when a window holds more than `--max-comments`, so use short windows there.
2. **Write `windows.json`.** See the example in the next section. You may leave old windows in the file. The ledger skips them.
3. **Run `collect.mjs`.** It fetches each new window, writes a file in `candidates/`, and then adds a row to `sources.md`.
4. **Classify the candidates.** Read the section "Classify the candidates". Add one row to `instances.md` for each real typo.
5. **Update the ledger.** In the new rows of `sources.md`, set "Comments read in full" to the number of comments you read from start to end. Add what you did to the Note.
6. **Check the files.** Run `node collect.mjs --counts`. It must print a table and no problems. Then paste the table into the Counts section below.
7. **Clean up.** Delete `candidates/`. Commit `sources.md`, `instances.md` and `README.md` together. Do not commit `candidates/`.

To add an RSS thread instead of an archive window, open the feed address, read the comments, and classify typos with the same steps. Then add a row to the "RSS threads" table in `sources.md`: thread id, subreddit, date, title, comment count, how many comments you read in full, how many instances you found, the date you did it and the thread link.

## Run collect.mjs

You need Node 18 or newer and a word list. The script has no packages to install. It reads `/usr/share/dict/words` unless you pass another file with `--dict`. If the file is missing, the script stops and says so.

`windows.json` is a JSON list. JSON has no comments, so here is an example. Copy the object into the list, then change the times:

```json
[
  { "after": "2025-09-10T00:00:00Z", "before": "2025-09-10T06:00:00Z" }
]
```

Write times in UTC, like `2025-09-10T00:00:00Z`. A date alone, like `2025-09-10`, means midnight UTC. The shipped file is `[]`.

Run it from this folder:

```
cd corpus/typos
node collect.mjs --subreddits devops,sysadmin
```

Options:

| Option | Meaning |
|---|---|
| `--subreddits <list>` | Required. Subreddit names, separated by commas. |
| `--windows <file>` | Another windows file. The default is `windows.json` next to the script. |
| `--dict <file>` | Another word list, one word per line. The default is `/usr/share/dict/words`. |
| `--min-length <n>` | Keep comments of at least n characters. The default is 120. |
| `--max-comments <n>` | Stop if one window holds more than n comments. The default is 5000. |
| `--api-base <url>` | Another archive address. For tests. |
| `--counts` | Check `instances.md` and print the counts. It does not touch the network. |
| `--help` | Show the usage text. |

Exit codes: 0 means done. 1 means the run failed, for example on a network error. 2 means a bad argument or input file.

What the script does for each subreddit and window that is not yet in `sources.md`:

1. It fetches the comments, 100 at a time, with a short pause between requests.
2. It drops short comments, `AutoModerator` and any author whose name ends in `bot`. Author names are used for this test only. They are never written down.
3. It flags candidates, as described below.
4. It writes `candidates/<subreddit>-<after>-<before>.md`. The name is lowercase, and the times are compact, like `devops-20250910T000000Z-20250910T060000Z.md`.
5. It adds one row to the table under "Archive windows" in `sources.md`. The row comes last. If anything fails before this point, no row is written, so the same command can run again. The failure message says so.

The candidate kinds, in the file as "family":

| Family | What it finds | Example |
|---|---|---|
| `one-edit` | A word of four letters or more that is not in the word list, but is one edit from a word that is. | `wirh` |
| `stray-letter` | A lone letter between two words. | `it's s quite` |
| `apostrophe-key` | A semicolon typed where the apostrophe should be. | `don;t` |
| `missing-apostrophe` | A common contraction typed without its apostrophe, such as `dont`, `cant`, `thats` or `Im`. Forms that are also words (`its`, `were`, `well`, `ill`) and slang (`aint`) are not flagged. | `dont` |
| `joined` | An unknown word that splits into two words, one of them a common small word. | `tellyou` |
| `split` | Two words that join into a known word, when one piece is not a word, or when the pair is a commonly split word. | `t hat`, `with out` |
| `space-moved` | Two words where moving one letter across the space gives two known words. | `gauget he` |

The script skips code blocks, inline code, quoted lines, links, user and subreddit mentions, tokens with digits or symbols, and text that is not plain English letters. It skips mid-sentence capitalised words, CamelCase and ALL CAPS, hyphenated words, words with apostrophes, British spellings (`optimise`, `favourite`), dropped `g` forms (`runnin`), and stretched letters (`sooo`). It also drops any `one-edit` or `joined` word that shows up in two or more comments of the same window, because that is jargon, not a slip.

The script does not flag these. Look for them while you read comments:

- a missing apostrophe on a form that is also a word, such as `its` for `it's`
- a phonetic misspelling that is more than one edit away
- a real-word typo, a repeated word, a dropped word or an extra word
- a shift held too long
- a slip with two or more edits

The candidate list is noisy. The default word list is from 1934 and lacks many modern words. Expect most candidates to be names, jargon and slang. A word list with modern words gives fewer false hits. Pass it with `--dict`. The file records the word list name, its size and a short hash, so you can see which one made it.

## Classify the candidates

A person or an agent does this step. The script finds candidates. It does not decide.

For each candidate in `candidates/<file>.md`:

1. **Read the whole comment.** Open the link. The list shows only a few words of context.
2. **Decide if it is a real slip.** It is not a slip if it is slang or a deliberate short form (`kinda`, `gonna`, `idk`, `ur`), a name, a brand or jargon, a British or other regional spelling, stretched letters, a quoted or pasted text, bot text, or the work of someone who is not writing in their own language. When you are unsure, leave it out.
3. **Name the intended word.** Write what the writer meant.
4. **Pick the kind.** Use one of the 17 names. Check the edit against the typed and intended forms. For adjacent-key substitution, the typed letter must touch the right letter on a QWERTY keyboard. If it does not, the kind is `other`.
5. **Pick the status.** Walk the seven tests under "used", then the taming rules. Write the reason or the lighter form in the Note.
6. **Copy a quote.** Follow the quote rules above.
7. **Check for a duplicate.** A row is a duplicate when its link and its typed form, ignoring case, match an existing row. Do not add it.
8. **Add the row** to the table in `instances.md`, in sorted order. Sort by kind, in the order of the kind table above. Then sort by the typed form, ignoring case, and then by link. `node collect.mjs --counts` names any row that is out of order.

Also add typos you notice that the script did not flag. Use the same steps.

A worked example. A comment says "I create a provate Outlook task for every Todo". The candidate is `provate`. The writer meant `private`. One letter changed: `i` became `o`. On a QWERTY keyboard `o` sits right next to `i`, so the kind is adjacent-key substitution. `provate` is not a word. `private` has seven letters and is not a protected word. It does not read as bad spelling. All the tests pass, so the status is `used` and the Note stays empty. The quote is the nine words above, copied as they are.

A second example. The typed form is `critizing` and the writer meant `criticizing`. Two letters are missing, so the kind is multi-edit. The dropped `i` alone gives `criticzing`. That is a non-word on a long ordinary word, so the row is `tamed`. The Note says `Lighter form: criticzing (only the dropped i is kept).` The Typed column keeps `critizing`.

## Idempotency rules

These rules make a re-run safe. Break none of them.

1. **The ledger is the only memory.** A row in "Archive windows" whose first three cells are the subreddit, the "After" time and the "Before" time means the window is done. The script skips it.
2. **Windows are exact and UTC.** "After" is included. "Before" is not. Times are written as `YYYY-MM-DDTHH:MM:SSZ`.
3. **Windows never overlap.** The script refuses a window that overlaps another window in `windows.json` or a row already in the ledger for the same subreddit. The first casual run did not record its windows, so the script cannot check against those 15 rows. The duplicate rule for `instances.md` (below) still protects the table.
4. **Windows must be old enough.** The archive says a comment's data is final only after about 36 hours. The script refuses a window that ends less than three days ago, so the same window gives the same comments later.
5. **The ledger row comes last.** Files are written first, each in one step. The row is added after that. A failed run leaves no row, and the next run does the window again.
6. **Same inputs, same output.** Comments are sorted by time and id. Candidates are sorted by their place in that order. A candidates file holds no run date, no run time and no random value. It names the word list.
7. **Rows are added, never rewritten.** In `sources.md`, only the cells "Comments read in full" and "Note" of a row may change, and only after you classify its window. Never delete a row or change its first three cells.
8. **One instance, one row.** The key is the link plus the typed form, ignoring case. `node collect.mjs --counts` fails on a duplicate.
9. **The table order is fixed.** Rows in `instances.md` are sorted by kind, typed form and link, so a diff shows only what you added.
10. **The counts come from the table.** The Counts section below is pasted from `node collect.mjs --counts`. It is never typed by hand.

## Check that a re-run changes nothing

After a run, copy the folder, run the same command again, and compare the two. The second run must print "Nothing to do" and change no file.

```
cd corpus/typos
node collect.mjs --subreddits devops
cp -R . /tmp/typos-first
node collect.mjs --subreddits devops
diff -r . /tmp/typos-first && echo "second run changed nothing"
rm -rf /tmp/typos-first
```

`diff -r` prints nothing when the two folders are the same. To test a network failure, run `node collect.mjs --subreddits devops --api-base http://127.0.0.1:9` with a new window. The run must exit with code 1 and `sources.md` must not change.

## Counts

409 rows: 254 used, 8 tamed and 147 skipped. This table is the output of `node collect.mjs --counts`:

| Kind | used | tamed | skipped | total |
|---|---|---|---|---|
| adjacent-key substitution | 79 | 0 | 15 | 94 |
| dropped letter | 58 | 0 | 6 | 64 |
| adjacent transposition | 37 | 0 | 9 | 46 |
| extra letter | 19 | 0 | 7 | 26 |
| doubled letter | 18 | 0 | 2 | 20 |
| dropped letter of a double | 9 | 0 | 5 | 14 |
| missing space | 6 | 0 | 11 | 17 |
| extra space | 1 | 0 | 4 | 5 |
| space shifted | 2 | 0 | 0 | 2 |
| shift held too long | 0 | 0 | 0 | 0 |
| missing apostrophe | 25 | 0 | 4 | 29 |
| phonetic misspelling | 0 | 0 | 28 | 28 |
| real-word typo | 0 | 0 | 28 | 28 |
| repeated word | 0 | 0 | 7 | 7 |
| dropped or extra word | 0 | 0 | 8 | 8 |
| multi-edit | 0 | 5 | 3 | 8 |
| other | 0 | 3 | 10 | 13 |
| **All kinds** | 254 | 8 | 147 | 409 |

The first rows come from two research runs on 2026-10-01. One read developer subreddits and added 124 rows. The other read casual subreddits and added 285 rows. Both are in `sources.md`. The first pass gave 30 rows a kind that the typed and intended forms did not support. This corpus fixed the kind, and the Note of each such row starts with "Research file kind".

## What the real comments show

These numbers come from the comments that the two research runs read in full. They are the runs' own tallies. They were not recomputed.

| Sample | Comments | Sentences | Slips | One slip every |
|---|---|---|---|---|
| Developer subreddits, every kind of slip | 325 | 1,139 | 51 | about 22 sentences |
| Developer subreddits, without dropped apostrophes | 325 | 1,139 | 39 | about 29 sentences |
| Casual subreddits, every kind of slip | 165 | 661 | 48 | about 14 sentences |
| Casual subreddits, without dropped apostrophes | 165 | 661 | 31 | about 21 sentences |
| Casual subreddits, letter slips that make a non-word | 165 | 661 | 8 | about 83 sentences |

Real comments carry far fewer slips than one in every two or three sentences. Slips come in clusters: a hurried comment holds several, and most comments hold none. About one comment in six had a slip in the casual sample, and about one in nine in the developer sample. These are edited, public comments. A quick chat message may carry more.

Most slips sit in long words. In the developer sample, 84% of single-word slips (not counting dropped apostrophes) were in words of six letters or more. In the casual sample, the median word was seven letters long, and 231 of 235 single-word letter slips were in words of four letters or more. A word list cannot find real-word typos. In the developer sample, 11 of the 51 slips in the comments read in full (22%) were real-word typos.

## Limits

- The samples are not random samples of Reddit. They are short windows in a few subreddits, and two full threads.
- Real-word typos, repeated words and dropped words need a human reader. A word list finds none of them. They are under-counted outside the comments read in full.
- The kind labels and the intended words are judgments. This corpus re-checked every letter-level label against the typed and intended forms with a script, and corrected 30 labels. The other kinds were not checked by script.
- Some writers may be non-native speakers or typing on a phone. A slip may be a habit.
- A quote may name a private person. If you add a quote like that, choose another part of the comment.
- `collect.mjs` finds candidates only. Its noise depends on the word list.
