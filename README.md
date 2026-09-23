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

The third block comes from a separate run. An agent with this skill loaded was handed the level 1 answer, then the reply "explain it like I'm five". Only the bold labels were added here.

**Explaining a concept**

> [!CAUTION]
> **No skill.** Eventual consistency means a write is acknowledged before every replica or derived view has it, and the system only promises they all converge if you stop writing long enough.

> [!TIP]
> **Level 1.** Eventual consistency means a write is not visible everywhere at once.

> [!TIP]
> **Level 3.** Say you change your display name to "Ana" at 10:00:00.
> The write lands on the replica in Frankfurt.
> A replica is a full copy of your data kept on a second machine.
> You reload the page and see "Ana".
> A colleague in Singapore reloads at 10:00:01 and still sees your old name.
> Their read went to the Singapore replica, and that copy does not have your change yet.
> At 10:00:03 the change reaches Singapore, and both replicas now show "Ana".
> You may be reading this as the write failing in Singapore. It did not fail — it succeeded in Frankfurt, and Singapore was three seconds behind it.
> That gap between "the write succeeded" and "every replica shows it" is what eventual consistency is.

**Diagnosing a problem**

> [!CAUTION]
> **No skill.** Adding retries doesn't reduce the total work a failing service has to do; it multiplies it.

> [!TIP]
> **Level 1.** Retries multiply load at the worst possible moment.

> [!TIP]
> **Level 3.** Say the payment service is already failing half the requests it gets, and every client retries a failed call once.
> In the first second 100 requests arrive, and 50 of them fail.
> Those 50 come back as retries, so the next second carries 100 new requests plus 50 retries: 150 in total.
> The service is now 50% above the load it was already failing at, so more of the 150 fail — say 100 of them.
> Those 100 come back too, and the second after that carries 200.
> Every extra request still costs a connection, a thread and CPU time, even when the service rejects it.
> You may be reading this as the retries being wrong in themselves. They are not — the same single retry costs almost nothing while the service is healthy, because almost nothing fails.
> Retries scale with the failure rate, so they arrive at their largest exactly during the outage, when the service has least to spare.
> That feedback loop, where failures create retries and retries create more failures, is retry amplification.

**Saying you don't know**

> [!CAUTION]
> **No skill.** I don't know the exact production Stripe webhook rate limit, and I have no verified source for it in this session — check your API gateway or webhook endpoint configuration (or ask the team that owns it) rather than relying on a number from me.

> [!TIP]
> **Level 1.** I don't know — I have no information about your production Stripe webhook endpoint's rate limit, so you need to check your own gateway or Stripe config for that number.

> [!TIP]
> **Level 3.** Picture the one line that would answer this: a route in your gateway config, say `POST /webhooks/stripe`, with a requests-per-second number on it.
> I have not seen that file, and it is not in this session.
> The other place the number could live is the endpoint's own settings in your Stripe dashboard.
> I have not seen that either, so I do not know your limit and will not guess at one.
> You may be reading this as me not having looked hard enough. That is not it — there is no public source that holds this number for me to look in.
> Stripe publishes limits for the calls you make out to their API.
> Those are a different number from the one you asked about, because your question is about calls coming in.
> The rate limit on an inbound webhook is a property of your own deployment, not of Stripe.
> Your gateway config and your Stripe endpoint settings are the only two places it exists.

**Defining a term**

> [!CAUTION]
> **No skill.** A race condition is a bug where a program's outcome depends on the unpredictable timing of two or more concurrent operations touching the same shared state, so an unlucky interleaving produces a wrong result.

> [!TIP]
> **Level 1.** A race condition is when two threads or processes touch the same data at the same time, and the result depends on which one happens to get there first.

> [!TIP]
> **Level 3.** Say an account locks after 5 failed logins, and this account's counter is at 3.
> Two wrong passwords arrive at the same moment, and a separate thread handles each one.
> Run those threads one after the other: the counter goes 3, then 4, then 5, and the account locks.
> Now let both threads read the counter before either one writes.
> Thread A reads 3. Thread B reads 3 as well.
> A adds one and writes 4. B adds one and writes 4.
> Five failed logins have happened, the counter says 4, and the account is still open.
> You may be reading this as a cosmetic off-by-one in the counter.
> It is not — 4 is under the lock threshold of 5, so the lock never fires and the attacker gets a sixth attempt.
> The gap between reading the counter and writing it back is what let both threads read 3.
> That gap is what a race condition is.

**Reporting progress**

> [!CAUTION]
> **No skill.** Retry logic with exponential backoff is now in place on the payment client, and I am about to run the integration tests to check it works.

> [!TIP]
> **Level 1.** The retry logic with exponential backoff is in the payment client, and I am running the integration tests now.

> [!TIP]
> **Level 3.** Say a charge comes back from the payment gateway with a 503.
> The payment client catches that, waits 1 second, and sends the same charge again.
> If the second attempt fails too it waits 2 seconds, then 4, then 8, and gives up after the fourth try.
> Each wait is double the one before it, and that doubling is the exponential backoff.
> That is code I have written, not behaviour I have watched run.
> What I do not know yet is whether it does the same thing against the real gateway.
> That is what the integration tests I am running now will tell me.
> You may be reading "running the integration tests" as a last formality before I call this done. It is not — I have no result from them yet, so nothing is confirmed.
> The state right now: the retry logic with exponential backoff is in the payment client, and the integration tests are mid-run.

| Example | Without | Level 1 | Change |
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

## Why the third tier is longer

Level 3 is not level 1 with smaller words. It changes the **order**: one real case with real values first, the mechanism next, and the name of the thing last. Then it names the wrong reading you might be forming and says why it is wrong.

That is why those five blocks run to 780 words against 96. An explanation carries the case, the mechanism and the effect. An answer carries one of them and leaves you to infer the rest.

Three things it never does. It never drops a technical term — the five still say `eventual consistency`, `replica`, `race condition`, `exponential backoff`, `rate limit`. It never invents a value and lets you read it as measured; every made-up value is introduced with "say". It never talks down, because a lowered register measurably reduces how much a reader takes in, while shorter sentences improve it. Those are two separate dials and this turns only one.

You get level 3 by asking: "simpler", "like I'm five", or just saying again that you do not understand.

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

**The third tier came from a separate run.** Those blocks were produced later, against the shipped `SKILL.md`, each agent given the level 1 answer and then the reply "explain it like I'm five". They are unedited too, but they were not part of the original paired comparison, and the word counts in the table above exclude them.

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
