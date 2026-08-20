# Simple Language

**An Agent Skill that makes your coding agent explain things like a senior engineer, not like a research paper.**

Same technical depth. Plain words.

[![Install](https://img.shields.io/badge/install-npx%20skills%20add-cb3837?logo=npm&logoColor=white)](https://skills.sh/)
[![Agent Skill](https://img.shields.io/badge/agent%20skill-root%20SKILL.md-3b82f6)](SKILL.md)
![Dependencies](https://img.shields.io/badge/dependencies-none-22c55e)
![Runtime code](https://img.shields.io/badge/runtime%20code-none-22c55e)
[![License](https://img.shields.io/badge/license-MIT-22c55e)](LICENSE)

```bash
npx skills add ctxr-dev/simple-language
```

---

## See the difference

Every pair below is real, unedited agent output. Same question, same model, same prompt. One agent had this skill loaded, the other did not. Neither was told to be brief.

**Explaining a concept**

> [!CAUTION]
> Eventual consistency means a write is acknowledged before every replica or derived view has it, and the system only promises they all converge if you stop writing long enough.

> [!TIP]
> Eventual consistency means a write is not visible everywhere at once.

**Diagnosing a problem**

> [!CAUTION]
> Adding retries doesn't reduce the total work a failing service has to do; it multiplies it.

> [!TIP]
> Retries multiply load at the worst possible moment.

**Saying you don't know**

> [!CAUTION]
> I don't know the exact production Stripe webhook rate limit, and I have no verified source for it in this session — check your API gateway or webhook endpoint configuration (or ask the team that owns it) rather than relying on a number from me.

> [!TIP]
> I don't know — I have no information about your production Stripe webhook endpoint's rate limit, so you need to check your own gateway or Stripe config for that number.

**Defining a term**

> [!CAUTION]
> A race condition is a bug where a program's outcome depends on the unpredictable timing of two or more concurrent operations touching the same shared state, so an unlucky interleaving produces a wrong result.

> [!TIP]
> A race condition is when two threads or processes touch the same data at the same time, and the result depends on which one happens to get there first.

**Reporting progress**

> [!CAUTION]
> Retry logic with exponential backoff is now in place on the payment client, and I am about to run the integration tests to check it works.

> [!TIP]
> The retry logic with exponential backoff is in the payment client, and I am running the integration tests now.

### Measured

| Example | Without | With | Change |
|---|---|---|---|
| Explaining a concept | 29 words | **11 words** | −62% |
| Diagnosing a problem | 16 words | **8 words** | −50% |
| Saying you don't know | 44 words | **29 words** | −34% |
| Reporting progress | 26 words | **19 words** | −27% |
| Defining a term | 34 words | **29 words** | −15% |
| **All five** | **149 words** | **96 words** | **−36%** |
| Reading ease | 43.7 | **62.2** | plain English |

Reading ease is the Flesch score, a standard readability measure. Below 30 means the reader needs a university degree to follow it comfortably. Between 60 and 70 is plain English.

Every technical term survived: eventual consistency, replica, race condition, exponential backoff. Nothing was made vaguer to make it shorter.

---

## It does not cost you precision

This is the part people expect to be a trade-off. It is not.

In the retry test the answer **without** the skill never used the word *idempotent*. It listed backoff, jitter, and circuit breakers, then stopped. The answer **with** the skill was longer, and used the extra room on the trap that actually loses money:

> [!TIP]
> One more caveat: retrying a request that is not idempotent can duplicate work, so a retry on a payment or an order needs an idempotency key. Idempotent means running it twice gives the same result as running it once.

Plain language is not shorter language. It is language that spends its words on content instead of on sounding clever.

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

A term you may not know arrives with one plain sentence explaining it, exactly as *idempotent* did above. After that it is used without further hand-holding.

---

## What it actually changes

Word swaps are the small part:

```diff
- utilize / leverage    facilitate    in order to    prior to    subsequently
+ use                   help          to             before      then

- approximately    demonstrate    optimal    suboptimal    it is worth noting that
+ about            show           best       worse         (delete it)
```

The core is the six habits that produce heavy prose in the first place:

1. Nouns doing a verb's job — "the decomposition of this responsibility" instead of "split this"
2. Passive voice that hides who acts
3. Climbing higher up the abstraction ladder than needed
4. Throat-clearing before the point
5. Stacked hedges
6. Saying the same thing twice

That distinction matters, and the test proved it. In every answer above, both agents used **zero** words from any avoid-list. The entire measured difference came from sentence structure. A word list alone would have changed nothing.

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

| | Style |
|---|---|
| **What the agent says to you** | Always simple and direct |
| **What the agent produces because you asked for it** | Whatever style that artifact needs |

It also never rewrites code, identifiers, config keys, error messages, or your own words quoted back to you.

---

## How these numbers were measured

Fresh agents, same model (Claude Opus), no shared context between them. One agent in each pair loaded this skill, the other was told not to load any skill. Both got the same prompt otherwise, with no instruction about style, length, or word choice. Every sentence quoted above is unedited output.

Word counts, syllable counts, and the Flesch score were computed from the raw text.

**Two cases where it made almost no difference**, both worth knowing. Reviewing one line of code came out 6% shorter, and recommending a queue also 6%. In both, the answer without the skill was already plain, so there was little to fix. The skill helps most where the topic invites dense prose, and least where the answer is already concrete.

This is a demonstration, not a benchmark.

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
