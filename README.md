# Simple Language

<img width="200" alt="i-forgot" src="https://github.com/user-attachments/assets/7dac010f-69de-47be-bf31-684ecad9bec5" />

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

**Other agents** — Codex, omp, Cursor, Copilot, Gemini CLI, Windsurf and OpenCode each get a ready-made block in the next section.

**Windows PowerShell** — use `$env:USERPROFILE\.claude\rules` in place of `~/.claude/rules`.

**Track the repo instead of copying** — `ln -sf "$PWD/rules/simple-language.md" ~/.claude/rules/simple-language.md`

**Try it without installing** — `npx skills use ctxr-dev/simple-language | claude`

**Inspect first** — `npx skills add ctxr-dev/simple-language --list`

</details>

<details>
<summary>Install the Rule in another agent — Codex, omp, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode</summary>

Every block installs the same file: [`rules/simple-language.md`](rules/simple-language.md). Run the one for your agent once. All of them are user-global unless the comment says project.

**Agents with a rules directory.** Each needs its own frontmatter to mark the rule as always-on, so the block writes that frontmatter and then appends the rule body.

omp:

```bash
mkdir -p ~/.omp/agent/rules
{ printf -- '---\nalwaysApply: true\n---\n\n'
  curl -fsSL https://raw.githubusercontent.com/ctxr-dev/simple-language/main/rules/simple-language.md
} > ~/.omp/agent/rules/simple-language.md
```

`alwaysApply: true` is not optional here. omp discovers a rule file that has no `alwaysApply`, no `description` and no trigger condition, then drops it — the file would sit on disk doing nothing. For one project only, write to `.omp/rules/simple-language.md` instead.

Cursor (project):

```bash
mkdir -p .cursor/rules
{ printf -- '---\ndescription: Plain, direct language in every message a person reads\nglobs:\nalwaysApply: true\n---\n\n'
  curl -fsSL https://raw.githubusercontent.com/ctxr-dev/simple-language/main/rules/simple-language.md
} > .cursor/rules/simple-language.mdc
```

Windsurf (project):

```bash
mkdir -p .windsurf/rules
{ printf -- '---\ntrigger: always_on\n---\n\n'
  curl -fsSL https://raw.githubusercontent.com/ctxr-dev/simple-language/main/rules/simple-language.md
} > .windsurf/rules/simple-language.md
```

**Agents that read one Markdown context file.** Same block for all of them — set `FILE` from the table, then run it. It is safe to re-run: the marker pair is deleted and rewritten, so you never get two copies.

```bash
FILE=~/.codex/AGENTS.md            # pick your path from the table below

mkdir -p "$(dirname "$FILE")" && touch "$FILE"
sed -i.bak '/<!-- BEGIN simple-language -->/,/<!-- END simple-language -->/d' "$FILE" && rm -f "$FILE.bak"
{ echo '<!-- BEGIN simple-language -->'
  curl -fsSL https://raw.githubusercontent.com/ctxr-dev/simple-language/main/rules/simple-language.md
  echo '<!-- END simple-language -->'
} >> "$FILE"
```

| Agent | `FILE` | Scope |
|---|---|---|
| Codex CLI | `~/.codex/AGENTS.md` | user |
| Gemini CLI | `~/.gemini/GEMINI.md` | user |
| OpenCode | `~/.config/opencode/AGENTS.md` | user |
| GitHub Copilot | `.github/copilot-instructions.md` | project |
| Any other agent that reads `AGENTS.md` | `AGENTS.md` | project |

Codex inlines the body because it does not expand `@path` imports. Gemini CLI and omp do expand them, so you can point at a clone instead of copying — `@~/src/simple-language/rules/simple-language.md` on its own line.

</details>

---

## See the difference

Every example below is real, unedited agent output. Same question, same model, same prompt. One agent had this skill loaded, the other did not. Neither was told to be brief.

The level 2 block comes from a separate run. An agent with this skill loaded was handed the level 1 answer, then the reply "explain it like I'm five". Only the bold labels were added here.

**Explaining a concept**

> [!CAUTION]
> **No skill.** Eventual consistency means a write is acknowledged before every replica or derived view has it, and the system only promises they all converge if you stop writing long enough.

> [!TIP]
> **Level 1, plain.** Eventual consistency means a write is not visible everywhere at once.

> [!TIP]
> **Level 2, simplest.** Eventual consistency: you write, other copies catch up later.

**Diagnosing a problem**

> [!CAUTION]
> **No skill.** Adding retries doesn't reduce the total work a failing service has to do; it multiplies it.

> [!TIP]
> **Level 1, plain.** Retries multiply load at the worst possible moment.

> [!TIP]
> **Level 2, simplest.** Retries multiply traffic while the server fails.

**Saying you don't know**

> [!CAUTION]
> **No skill.** I don't know the exact production Stripe webhook rate limit, and I have no verified source for it in this session — check your API gateway or webhook endpoint configuration (or ask the team that owns it) rather than relying on a number from me.

> [!TIP]
> **Level 1, plain.** I don't know — I have no information about your production Stripe webhook endpoint's rate limit, so you need to check your own gateway or Stripe config for that number.

> [!TIP]
> **Level 2, simplest.** I don't know your production Stripe webhook rate limit. Check your own gateway settings or your Stripe config — that number is set there.

**Defining a term**

> [!CAUTION]
> **No skill.** A race condition is a bug where a program's outcome depends on the unpredictable timing of two or more concurrent operations touching the same shared state, so an unlucky interleaving produces a wrong result.

> [!TIP]
> **Level 1, plain.** A race condition is when two threads or processes touch the same data at the same time, and the result depends on which one happens to get there first.

> [!TIP]
> **Level 2, simplest.** Two workers read the stock count, both see 5, both write 4. Two items shipped, the count dropped by one: a race condition.

**Reporting progress**

> [!CAUTION]
> **No skill.** Retry logic with exponential backoff is now in place on the payment client, and I am about to run the integration tests to check it works.

> [!TIP]
> **Level 1, plain.** The retry logic with exponential backoff is in the payment client, and I am running the integration tests now.

> [!TIP]
> **Level 2, simplest.** Exponential backoff retries are in the payment client. Integration tests are running; no results yet.

| Example | Without | Level 1 | Level 2 |
|---|---|---|---|
| Explaining a concept | 29 words | 11 words | **9 words** |
| Diagnosing a problem | 16 words | 8 words | **7 words** |
| Saying you don't know | 44 words | 29 words | **23 words** |
| Defining a term | 34 words | 29 words | **23 words** |
| Reporting progress | 26 words | 19 words | **15 words** |
| **All five** | **149 words** | **96 words** | **77 words** |

Level 1 scores 62.2 for reading ease against 43.7 without the skill. That is the Flesch score: below 30 needs a university degree to read comfortably, and 60 to 70 is plain English. Every technical term survived: eventual consistency, replica, race condition, exponential backoff.

---

## Asking for it simpler

Say "simpler", or "like I'm five", or just say again that you do not understand. You get level 2.

Level 2 is **easier to read**, and easier means fewer words as well as easier ones. It never uses more words than the answer you did not understand. You do not get more room, so it buys plainness instead: shorter common words, sentences of eight to twelve words, a concrete number in place of an abstract phrase.

Three things it does not do:

- **It does not drop the technical term.** The level 2 answers above still say `eventual consistency`, `race condition`, `exponential backoff`, `rate limit`. You leave knowing what the thing is called.
- **It does not drop a number or a caveat.** The race condition answer still carries 5 and 4. The "I don't know" answer still refuses to invent a rate limit, and still names where it is set.
- **It does not talk down.** Shorter sentences help a reader. A lowered register does not; it measurably reduces how much someone takes in. Those are two separate dials and this turns only one.

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

**The level 2 answers came from a separate run.** They were produced later, against the shipped `SKILL.md`, with an agent given the level 1 answer and then the reply "explain it like I'm five". They are unedited too, but they were not part of the original paired comparison, so the reading-ease score above covers level 1 only.

**Two cases barely moved.** Reviewing one line of code came out 6% shorter, and recommending a queue also 6%. In both, the unruled answer was already plain, so there was little to fix. The skill helps most where the topic invites dense prose and least where the answer is already concrete.

This is a demonstration, not a benchmark.

---

## What is in this repo

```
SKILL.md                    the skill your agent reads
rules/simple-language.md    the always-on rule, loaded every turn
README.md                   this file
references/word-swaps.md    the full word list, plus the words to leave alone
LICENSE                     MIT
```

`SKILL.md` sits at the repo root, so the `skills` CLI resolves it with no flags. [`rules/simple-language.md`](rules/simple-language.md) is deliberately short because it loads on every turn, and it carries instructions only — the reasoning behind its wording lives here, where it costs nothing at runtime.

[`references/word-swaps.md`](references/word-swaps.md) holds the long lookup list, including a **"keep these words"** section. That section matters more than it sounds: without it a style pass will happily turn `CPU utilization` into `CPU use` and `implement the interface` into `build the interface`, and both are now wrong.

---

## License

MIT. See [LICENSE](LICENSE).
