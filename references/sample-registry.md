# Sample registry

How the Writing as the user section learns the user's own habits. Everything lives outside any repository, under `~/.simple-language/human-language/`. Create a folder or an index the first time you need it. Samples are optional; with none, use the defaults in SKILL.md.

## Folder layout

```
~/.simple-language/human-language/
  samples/index.md
  samples/<yyyy-mm-dd>-<hh-mm-ss>-<slug>.md
  patterns/index.md
  patterns/<pattern-id>.md
```

`<slug>` is two to five lowercase ASCII words joined by hyphens. `<pattern-id>` is two to five lowercase ASCII words joined by hyphens that name the habit, like `lowercase-starts`.

## Storing a sample

1. Keep only the lines the user wrote. Replace everything other people wrote with one line that starts with `Context:` and says what the user was answering, like `Context: reply to a question about the failed deploy`.
2. Replace every secret with `[redacted]`: tokens, passwords, API keys, private keys, and credentials inside URLs or connection strings. Change nothing else. Keep the user's typos, casing and punctuation exactly.
3. Write the sample file:

```
---
id: <file name without .md>
channel: <chat | ticket-description | ticket-comment | review-reply | pr-description | email | other>
added: <yyyy-mm-ddThh:mm:ss, local time>
patterns: [<pattern-id>, ...]
---

Context: <one line>

<the user's own messages, verbatim, one paragraph each>
```

4. Add one row to `samples/index.md`. Create the file with this header if it does not exist:

```
# Samples

|File|Channel|Added|What it is|
|---|---|---|---|
```

A row looks like `| [2026-10-01-14-03-22-deploy-question.md](2026-10-01-14-03-22-deploy-question.md) | chat | 2026-10-01 | asks a teammate about a failed deploy |`.

## Finding patterns

Read the new sample for habits of these kinds: casing, end punctuation, apostrophes, greetings, sign-offs, shorthand and abbreviations, typo kinds and rate, message length, line breaks, emoji, and how questions are asked. A pattern is a habit the sample shows, with at least one quote as evidence.

For each habit found:

- If `patterns/index.md` already lists a pattern for the same habit, add the sample to its evidence, raise `seen_in` by one, add the channel if it is new, and update its row in the index.
- Otherwise create `patterns/<pattern-id>.md` and add a row to the index.

Pattern file:

```
---
id: <pattern-id>
kind: <casing | punctuation | apostrophes | greeting | sign-off | shorthand | typos | length | line-breaks | emoji | questions | other>
seen_in: <number of samples that show it>
channels: [<channel>, ...]
---

Rule: <one sentence you can follow when writing, like "writes dont, cant and isnt without the apostrophe">

Evidence:
- [<sample file>](../samples/<sample file>): "<short quote>"
```

`patterns/index.md` header, created if missing:

```
# Patterns

|File|Kind|Rule|Seen in|
|---|---|---|---|
```

Update `samples/index.md`, the sample's `patterns:` list, the pattern files and `patterns/index.md` in the same pass, so they always agree.

## Using patterns

Before writing a draft, read `patterns/index.md`. If it does not exist, use the defaults in SKILL.md. Every listed pattern applies from its first sample, in every channel. A pattern wins over steps 5 to 8 of How to write it, and never over What still binds. When two patterns of the same kind disagree, the one with the higher `seen_in` wins; on a tie, the one updated most recently wins.
