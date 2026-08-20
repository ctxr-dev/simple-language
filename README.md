# Simple Language

**An Agent Skill that makes your coding agent explain things like a senior engineer, not like a research paper.**

Same technical depth. Plain words.

[![Install](https://img.shields.io/badge/install-npx%20skills%20add-cb3837?logo=npm&logoColor=white)](https://skills.sh/)
[![Agent Skill](https://img.shields.io/badge/agent%20skill-root%20SKILL.md-3b82f6)](SKILL.md)
![Dependencies](https://img.shields.io/badge/dependencies-none-22c55e)
![Runtime code](https://img.shields.io/badge/runtime%20code-none-22c55e)
[![License](https://img.shields.io/badge/license-MIT-22c55e)](LICENSE)

## Install

Two steps. The first installs the Skill, the second makes it always on.

```bash
# 1. the Skill - the full guidance, loaded on demand
npx skills add ctxr-dev/simple-language

# 2. the Rule - makes it the default for every message
mkdir -p ~/.claude/rules
curl -fsSL https://raw.githubusercontent.com/ctxr-dev/simple-language/main/rules/simple-language.md \
  -o ~/.claude/rules/simple-language.md
```

Restart Claude Code. Your agent applies it on its own from then on. You can also ask directly: *"rewrite that in simple language."*

**Why two steps.** Skills load **on demand**, so the agent reads the description and decides. Rules load **every session**, with no decision involved. The Skill alone gives you this style most of the time; the Rule makes it the default every time. The `skills` CLI installs Skills, so it cannot place a rule file for you.

<details>
<summary>Other install options</summary>

**Global** — add `-g` to the `skills` command to install for all your projects.

**Project-level rule** — put the rule at `.claude/rules/simple-language.md` in your repo root, or paste its contents into `CLAUDE.md`.

**Other agents** — Codex, Cursor, Copilot CLI and Gemini CLI read `AGENTS.md`. Paste in the contents of [`rules/simple-language.md`](rules/simple-language.md).

**Windows PowerShell** — use `$env:USERPROFILE\.claude\rules` in place of `~/.claude/rules`.

**Track the repo instead of copying** — `ln -sf "$PWD/rules/simple-language.md" ~/.claude/rules/simple-language.md`

**Try it without installing** — `npx skills use ctxr-dev/simple-language | claude`

**Inspect first** — `npx skills add ctxr-dev/simple-language --list`

</details>

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

| Example | Without | With | Change |
|---|---|---|---|
| Explaining a concept | 29 words | **11 words** | −62% |
| Diagnosing a problem | 16 words | **8 words** | −50% |
| Saying you don't know | 44 words | **29 words** | −34% |
| Reporting progress | 26 words | **19 words** | −27% |
| Defining a term | 34 words | **29 words** | −15% |
| **All five** | **149 words** | **96 words** | **−36%** |
| Reading ease | 43.7 | **62.2** | plain English |

Reading ease is the Flesch score. Below 30 needs a university degree to read comfortably; 60 to 70 is plain English. Every technical term survived: eventual consistency, replica, race condition, exponential backoff.

---

## It does not cost you quality

This is the part people expect to be a trade-off. Three tests say it is not.

**It keeps more, not less.** Asked why retries worsen an outage, the answer *without* the skill never used the word *idempotent*. The answer *with* the skill was longer, and spent the extra words on the trap that actually loses money:

> [!TIP]
> One more caveat: retrying a request that is not idempotent can duplicate work, so a retry on a payment or an order needs an idempotency key. Idempotent means running it twice gives the same result as running it once.

**Precision survives a subtle caveat.** Asked to explain at-least-once versus exactly-once delivery in Kafka, the ruled agent kept the part that is easy to lose: exactly-once holds inside Kafka only, and a write to an external database or an HTTP call is not covered. One gap did appear — it dropped two config key names — so the rule now names config keys and exact identifiers in its precision limit.

**Code is untouched.** Asked for a retry helper with exponential backoff and full jitter, the ruled agent produced the same quality of TypeScript as the unruled one: correct full-jitter maths, `AbortSignal` support, injectable `random` for deterministic tests, and real names like `retryWithBackoff` and `maxDelayMs`. Nothing renamed to sound friendlier, nothing simplified into being wrong.

That last result comes from how the rule is scoped. It states what it governs — prose addressed to a person — instead of listing exceptions. An instruction built as *"simplify everything except code"* leaks, because the model absorbs "simplify" and the exception does not reliably fence off the code. Defining prose as the whole domain means code was never inside it.

The rule also says outright that reasoning is out of scope, and ranks precision above style. Those two lines are what stop an always-on rule from becoming pressure to be brief.

---

## What it changes

Word swaps are the small part:

```diff
- utilize / leverage    facilitate    in order to    prior to    subsequently
+ use                   help          to             before      then

- approximately    demonstrate    optimal    suboptimal    it is worth noting that
+ about            show           best       worse         (delete it)
```

The core is the six habits that produce heavy prose:

1. Nouns doing a verb's job — "the decomposition of this responsibility" instead of "split this"
2. Passive voice that hides who acts
3. Climbing higher up the abstraction ladder than needed
4. Throat-clearing before the point
5. Stacked hedges
6. Saying the same thing twice

That distinction is not theoretical. In every answer above, both agents used **zero** words from any avoid-list. The whole measured difference came from sentence structure, so a word list alone would have changed nothing.

---

## What it never touches

| Left exactly as it is | Why |
|---|---|
| Code, identifiers, types, tests, config keys | Not prose. Outside the rule's domain |
| Technical terms — race condition, idempotent, quorum | The correct word is the clear word |
| Technology names — PostgreSQL, gRPC, Kafka, Temporal | Written the way their docs write them |
| Numbers, error text, log lines, quoted text | Reproduced exactly |
| An artifact whose style you asked for | An RFC stays RFC style, an abstract stays academic |

A term you may not know arrives with one plain sentence explaining it, exactly as *idempotent* did above. After that it is used without further hand-holding.

---

## Why it exists

Heavy prose costs real time. You read every answer twice, the point sits in sentence four instead of sentence one, and long words hide how certain the agent really is. If English is your second language, every extra clause is extra work.

None of that comes from the agent thinking too much. It comes from the agent **writing** in the wrong register, so this changes only the writing.

---

## How this was measured

Fresh agents, same model (Claude Opus), no shared context. One agent in each pair loaded the skill; the other was told not to load any skill. Both got the same prompt otherwise, with no instruction about style, length, or word choice. Every quoted sentence is unedited. Word counts, syllable counts and Flesch scores were computed from the raw text.

**Two cases barely moved.** Reviewing one line of code came out 6% shorter, and recommending a queue also 6%. In both, the unruled answer was already plain, so there was little to fix. The skill helps most where the topic invites dense prose and least where the answer is already concrete.

This is a demonstration, not a benchmark.

---

## What is in this repo

```
SKILL.md                    the skill your agent reads
rules/simple-language.md    the always-on rule, 364 words
README.md                   this file
references/word-swaps.md    the full word list, plus the words to leave alone
LICENSE                     MIT
```

`SKILL.md` sits at the repo root, so the `skills` CLI resolves it with no flags. [`rules/simple-language.md`](rules/simple-language.md) is deliberately short because it loads on every turn, and it carries instructions only — the reasoning behind its wording lives here, where it costs nothing at runtime.

[`references/word-swaps.md`](references/word-swaps.md) holds the long lookup list, including a **"keep these words"** section. That section matters more than it sounds: without it a style pass will happily turn `CPU utilization` into `CPU use` and `implement the interface` into `build the interface`, and both are now wrong.

---

## License

MIT. See [LICENSE](LICENSE).
