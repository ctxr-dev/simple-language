# simple-language

An Agent Skill that makes coding agents write to you like a clear, experienced engineer, not like a research paper.

Same technical depth. Plain words.

## Install

```bash
npx skills add ctxr-dev/simple-language
```

The full URL works too:

```bash
npx skills add https://github.com/ctxr-dev/simple-language
```

Useful flags:

```bash
npx skills add ctxr-dev/simple-language -g          # install for every project (user level)
npx skills add ctxr-dev/simple-language -a '*'      # install for every supported agent
npx skills list                                     # check what is installed
```

By default the skill installs for the current project. Use `-g` to install it once for all your work.

Works with Claude Code and the other agents the `skills` CLI supports. Nothing to configure, and no dependencies.

## What it does

Agents tend to write like academics. You ask a simple question and get this:

> A decoupled asynchronous work-distribution mechanism would facilitate independent processing by the worker subsystem.

This skill makes the agent write this instead:

> Use a queue here, because the worker can then process jobs on its own.

The skill applies to everything the agent says to you: chat replies, explanations, plans, analysis, code walkthroughs, review comments, progress updates, error reports, and any docs written for people.

## Why it exists

Heavy prose is not a small annoyance. It costs you real time:

- You read every answer twice.
- The actual point sits in sentence four instead of sentence one.
- Long words hide how certain the agent really is.
- If English is your second language, every extra clause is extra work.

None of that comes from the agent thinking too much. It comes from the agent **writing** in the wrong register. So this skill only changes the writing.

## It keeps the technical words

This is not a "dumb everything down" skill. It never trades a precise term for a vague phrase.

| Kind of writing | What happens |
|---|---|
| Long words with plain equivalents | Replaced: `utilize` becomes `use` |
| Technical terms | Kept: race condition, idempotent, back pressure, quorum |
| Technology names | Kept exactly: PostgreSQL, gRPC, Kafka, Temporal |
| Numbers and error text | Kept exactly |
| Caveats and real distinctions | Kept, and stated in plain words |
| Code, identifiers, config keys | Never touched |

When a term may be new to you, the agent writes the term plus one plain sentence:

> Idempotent means running it twice gives the same result as running it once.

Then it just uses the term.

## Before and after

**Explaining a bug**

- Before: "This behavior is attributable to a concurrency anomaly arising from non-deterministic interleaving of competing execution contexts."
- After: "This is a race condition. Two workers can update the same row at the same time."

**A recommendation**

- Before: "It would be more appropriate to decompose this responsibility across two modular boundaries."
- After: "We should split this into two modules."

**A progress update**

- Before: "I have completed the preliminary implementation phase and am now proceeding with validation of the resulting integration behavior."
- After: "The change is in. Now I am checking that the integration tests still pass."

**A review comment**

- Before: "Consideration should be given to the introduction of validation at this boundary."
- After: "Validate `limit` here. A negative value makes the query scan the whole table."

**An advanced topic, same depth**

- Before: "Temporal constitutes a durable execution substrate predicated upon deterministic workflow replay semantics."
- After: "Temporal runs workflows that survive crashes. It does that by replaying your workflow code from its event history, so the code must be deterministic: no random values, no clock reads, no direct network calls."

The last example is the point of the whole skill. The plain version is longer and tells you more. Simple words leave room for real detail.

## How to use it

Once installed, the agent picks the skill up on its own and applies it to what it writes. There is no command to run.

You can also ask for it directly:

- "Use the simple-language skill for this explanation."
- "Rewrite that in simple language."

To try it without installing:

```bash
npx skills use ctxr-dev/simple-language | claude
```

## When it steps aside

If you ask for a formal artifact, you get the formal artifact. Ask for an RFC and you get RFC style. Ask for an academic abstract and you get academic style.

The skill draws the line between two things:

- **What the agent says to you** stays simple and direct, always.
- **What the agent produces because you asked for it** follows the style that artifact needs.

## What is in this repo

```
SKILL.md                    the skill the agent reads
README.md                   this file
references/word-swaps.md    the full word list, plus the words to leave alone
LICENSE                     MIT
```

`SKILL.md` sits at the repo root, so the `skills` CLI finds it as a single root skill.

`references/word-swaps.md` is the long lookup list. The agent reads it when it is editing text for style, so the main skill stays small enough to load on every reply.

## License

MIT. See [LICENSE](LICENSE).
