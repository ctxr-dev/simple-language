# Simple Language

**An Agent Skill that makes your coding agent explain things like a senior engineer, not like a research paper.**

Same technical depth. Plain words.

[![Install](https://img.shields.io/badge/install-npx%20skills%20add-cb3837?logo=npm&logoColor=white)](https://skills.sh/)
[![Agent Skill](https://img.shields.io/badge/agent%20skill-root%20SKILL.md-3b82f6)](SKILL.md)
![Dependencies](https://img.shields.io/badge/dependencies-none-22c55e)
![Runtime code](https://img.shields.io/badge/runtime%20code-none-22c55e)
[![License](https://img.shields.io/badge/license-MIT-22c55e)](LICENSE)

---

## See the difference

Both boxes below carry **exactly the same information**. Only the language changed.

> [!CAUTION]
> **Without this skill**
>
> This behavior is attributable to a concurrency anomaly arising from non-deterministic interleaving of competing execution contexts, wherein the invariant governing exclusive record access is not preserved under load.

> [!TIP]
> **With this skill**
>
> This is a race condition. Two workers can update the same row at the same time, so one of the two updates gets lost.

Nothing was dumbed down. `race condition` is still there, because it is the correct term. The green version even tells you the consequence, which the red version never got around to saying.

That is the whole idea: **plain words leave room for real detail.**

---

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
npx skills add ctxr-dev/simple-language -g       # install once for all your projects
npx skills add ctxr-dev/simple-language -a '*'   # install for every supported agent
npx skills list                                  # check what is installed
```

By default it installs for the current project. Use `-g` to install it once for everything you work on.

Works with Claude Code and the other agents the `skills` CLI supports. Nothing to configure, no dependencies, no runtime code.

---

## Why this exists

Agents drift into academic prose. It is not a small annoyance, it costs you real time:

- You read every answer twice.
- The actual point sits in sentence four instead of sentence one.
- Long words hide how certain the agent really is.
- If English is your second language, every extra clause is extra work.

None of that comes from the agent thinking too much. It comes from the agent **writing** in the wrong register. So this skill changes only the writing.

---

## More before and after

Red is what agents produce by default. Green is the same content after this skill.

### Recommending a design

> [!CAUTION]
> It would be more appropriate to decompose this responsibility across two modular boundaries, thereby facilitating independent evolution of the respective concerns.

> [!TIP]
> We should split this into two modules. Then we can change one without touching the other.

### Reporting progress

> [!CAUTION]
> I have completed the preliminary implementation phase and am now proceeding with validation of the resulting integration behavior.

> [!TIP]
> The change is in. Now I am checking that the integration tests still pass.

### Reviewing code

> [!CAUTION]
> Consideration should be given to the introduction of input validation at this boundary, as the current implementation may exhibit suboptimal performance characteristics under adversarial input conditions.

> [!TIP]
> Validate `limit` here. A negative value makes the query scan the whole table.

### Saying it is broken

> [!CAUTION]
> There appears to be a potential issue with one of the assumptions underlying this approach, which may warrant further investigation.

> [!TIP]
> This assumption is wrong. The queue can deliver the same message twice.

### Admitting uncertainty

> [!CAUTION]
> While a definitive determination cannot be made at this juncture, the available evidence would appear to be broadly consistent with the hypothesis that the retry mechanism is implicated.

> [!TIP]
> I think the retry loop causes it, but I have not confirmed it yet.

### Teaching an advanced topic

> [!CAUTION]
> Temporal constitutes a durable execution orchestration substrate predicated upon deterministic workflow replay semantics.

> [!TIP]
> Temporal runs workflows that survive crashes. It does that by replaying your workflow code from its event history, so the code must be deterministic: no random values, no clock reads, no direct network calls.

Look at that last pair again. The green version is **longer** than the red one, and it teaches you the thing that will actually break your code. Simple language is not shorter language. It is language that spends its words on content instead of on sounding clever.

---

## It keeps the technical words

This is not a "dumb it all down" skill. It never trades a precise term for a vague phrase.

| Kind of writing | What happens to it |
|---|---|
| Long words with plain equivalents | Replaced. `utilize` becomes `use` |
| Real technical terms | Kept. Race condition, idempotent, back pressure, quorum |
| Technology names | Kept exactly. PostgreSQL, gRPC, Kafka, Temporal |
| Numbers, error text, log lines | Kept exactly |
| Caveats and real distinctions | Kept, and stated in plain words |
| Code, identifiers, config keys | Never touched |

When a term may be new to you, you get the term plus one plain sentence:

> [!TIP]
> Idempotent means running it twice gives the same result as running it once.

Then it just uses the term. No repeated hand-holding.

---

## What changes, at a glance

```diff
- The implementation of caching resulted in a reduction of database load.
+ Caching cut the database load.

- It is worth noting that the cache is invalidated when the record is updated.
+ The writer clears the cache after it updates the record.

- This may potentially be somewhat slower under certain circumstances.
+ This is probably slower. I have not measured it.

- utilize / leverage        facilitate      in order to      prior to
+ use                       help            to               before

- subsequently   therefore   approximately   optimal   robust   seamless
+ then           so          about           best      (say what it survives)
```

The skill goes further than a word list. It names the six habits that produce heavy prose in the first place: nouns doing a verb's job, passive voice that hides who acts, climbing too far up the abstraction ladder, throat-clearing before the point, stacked hedges, and saying the same thing twice. That is why it also catches bad sentences no word list contains.

---

## How to use it

Once installed, your agent picks the skill up on its own and applies it to what it writes. There is no command to run.

You can also ask for it directly:

- "Use the simple-language skill for this explanation."
- "Rewrite that in simple language."

To try it without installing anything:

```bash
npx skills use ctxr-dev/simple-language | claude
```

---

## When it steps aside

Ask for a formal artifact and you get the formal artifact. Ask for an RFC and you get RFC style. Ask for an academic abstract and you get academic style.

The skill draws a line between two different things:

| | Style |
|---|---|
| **What the agent says to you** | Always simple and direct |
| **What the agent produces because you asked for it** | Whatever style that artifact needs |

It also never rewrites code, identifiers, config keys, error messages, or your own words quoted back to you.

---

## What is in this repo

```
SKILL.md                    the skill your agent reads
README.md                   this file
references/word-swaps.md    the full word list, plus the words to leave alone
LICENSE                     MIT
```

`SKILL.md` sits at the repo root, so the `skills` CLI resolves it as one root skill.

[`references/word-swaps.md`](references/word-swaps.md) holds the long lookup list, including a **"keep these words"** section. That section matters more than it sounds: without it, a style skill will happily "simplify" `CPU utilization` into `CPU use` and `implement the interface` into `build the interface`, and both of those are now wrong. The agent reads that file when it is editing text for style, which keeps the main skill small enough to load on every reply.

---

## License

MIT. See [LICENSE](LICENSE).
