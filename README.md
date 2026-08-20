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

Both answers below came from the **same model**, answering the **same question**, with the **same prompt**. The only difference: one had this skill loaded. Neither was told to be brief or to simplify anything.

**Question:** *What does eventual consistency actually mean, and when does it cause problems in production?*

> [!CAUTION]
> **Without the skill.** Seven sentences. One of them is 93 words long.
>
> Eventual consistency means a write is acknowledged before every replica or derived view has it, and the system only promises they all converge if you stop writing long enough. Between the write and that convergence, different readers can legitimately see different states — a stale row, a missing record, an older version. There is no single "now" in the system, just a set of copies catching up. The gap is usually milliseconds, but it is unbounded in principle: replication lag, a slow consumer, a partitioned region, or a backed-up queue can stretch it to seconds or minutes without anything being "broken."
>
> In production it bites wherever a decision reads back state that a recent write was supposed to establish. The classic cases are read-your-own-writes (a user saves a profile, gets routed to a replica, and sees the old value), read-modify-write on a stale copy (two handlers both read the pre-update balance and both write, losing one), idempotency and uniqueness checks (a duplicate-detection lookup misses the record its own earlier write created, so you process the same order twice), and cross-store coupling (a service writes to Postgres, publishes an event, and the consumer queries an index or cache that has not caught up, so it acts on a version that never existed together). It also shows up as flaky tests and as monitoring that disagrees with the database. The usual fixes are to route reads that must be fresh to the primary or pin them to a session, make consumers idempotent and tolerant of arriving early (retry or defer rather than assume absence means never), carry the data the consumer needs in the event instead of making it re-read, and use a real transaction or a compare-and-set version where correctness genuinely depends on a single consistent view.

> [!TIP]
> **With the skill.** Eleven sentences. Longest is 40 words. Every technical term kept.
>
> Eventual consistency means a write is not visible everywhere at once. The system copies the new value to its other replicas in the background, so for a short window some readers still see the old value. The guarantee is only this: if writes stop, all replicas end up with the same value. It says nothing about how long that takes, and nothing about the order in which different readers see the change.
>
> It breaks in production when code reads back something it just wrote and treats the result as truth. A user updates their profile, the next page load hits a replica that has not caught up, and the change looks lost. A worker writes a row, publishes a Kafka event, and the consumer reads the row before it arrives, so it fails or acts on stale data. Read-modify-write on a stale copy silently drops the other write, since last-write-wins keeps one value and throws the other away. Anything that must be exact right now, such as a balance check, an inventory decrement, or a uniqueness check, does not survive on eventual consistency. The usual fixes are to route reads that follow a write to the primary, pass the write's version or timestamp so the reader can wait for it, or put the few operations that need it behind a strongly consistent store. The lag also gets much worse under replication load, so a window that looks like 50 ms in normal traffic can stretch to seconds during a backfill.

| Measured | Without the skill | With the skill |
|---|---|---|
| Average words per sentence | 42.1 | **22.6** |
| Longest sentence | 93 words | **40 words** |
| Reading ease | 23.8 — graduate level | **60.9 — plain English** |
| Words of 3+ syllables | 16.9% | **10.8%** |
| Passive constructions | 3 | **0** |
| Technical terms kept | 5 of 5 | **5 of 5** |
| Total length | 295 words | 249 words |

Reading ease is the Flesch score, a standard readability measure. Below 30 means the reader needs a university degree to follow it comfortably. Between 60 and 70 is plain English.

The red version's 93-word sentence packs four separate failure modes into one clause chain with nested parentheses. The green version gives each failure mode its own sentence. Nothing was removed, and the answer got **shorter**.

---

## It does not cost you precision

This is the part people expect to be a trade-off. It is not.

**Question:** *Why can adding retries to a failing service make an outage worse?*

> [!CAUTION]
> **Without the skill.** Readable, but it never mentions idempotency at all.
>
> Adding retries doesn't reduce the total work a failing service has to do; it multiplies it. If a service is already slow or dropping requests because it's saturated, every retry adds another request on top of the ones already in flight, and each one holds a connection, a thread, or a queue slot on both sides while it waits to fail. Three retries per call turns one unit of load into four, so the moment the service starts struggling, the traffic hitting it jumps just when it has the least capacity to absorb it. That's why a service that might have recovered on its own instead stays pinned down.
>
> It gets worse when the retries line up. Clients that all retry after the same fixed delay come back as a synchronized wave, and if every layer of the stack retries independently, the multipliers stack — three retries at each of three hops is up to twenty-seven attempts for one user action. Retries also outlive the caller: the original request has often already timed out, so the work is now pointless but still consuming capacity. The usual fixes are to make retries cheap and self-limiting — exponential backoff with jitter, retry only at one layer, budget retries as a fraction of normal traffic, and a circuit breaker that stops sending altogether once failures dominate, giving the service the quiet it needs to come back.

> [!TIP]
> **With the skill.** Plainer, and it teaches two things the red version skipped: the idempotency trap and deadline propagation.
>
> Retries multiply load at the worst possible moment. If a service starts failing or slowing down, every client that retries three times turns one request into three. The service is already at its limit, so the extra traffic pushes it further down, which causes more failures, which triggers more retries. That loop is called a retry storm. It gets worse when retries stack across layers: if the browser retries, the API gateway retries, and the internal client retries, you get 3 x 3 x 3 requests for one user action. Retries also hold connections, threads, and memory while they wait, so the caller can run out of those and start failing too.
>
> The fix is to make retries back off and give up. Use exponential backoff with jitter so clients do not all retry at the same instant, cap the number of attempts, and only retry errors that can actually succeed later, like a timeout or a 503, never a 400. Add a circuit breaker so a client stops calling a service that keeps failing and gives it room to recover. Set a deadline for the whole request and pass it down, so a retry does not start when there is no time left to use the answer. One more caveat: retrying a request that is not idempotent can duplicate work, so a retry on a payment or an order needs an idempotency key. Idempotent means running it twice gives the same result as running it once.

| Measured | Without the skill | With the skill |
|---|---|---|
| Average words per sentence | 28.9 | **20.2** |
| Longest sentence | 48 words | **36 words** |
| Reading ease | 49.3 | **65.4 — plain English** |
| Words of 3+ syllables | 10.0% | **6.2%** |
| Technical terms kept | 4 of 5 | **5 of 5** |
| Total length | 231 words | 242 words |

Look at the last two rows. The green version used **more** words and kept **more** technical content. The red version dropped idempotency entirely. The green one named it, explained why it matters for a payment retry, and defined it in one sentence.

Plain language did not cost precision here. It bought room for it.

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

## It applies to short messages too

The two examples above are long explanations. Most of what an agent says to you is much shorter, and the same rule applies.

**Progress update**

> [!CAUTION]
> I have completed the preliminary implementation phase and am now proceeding with validation of the resulting integration behavior.

> [!TIP]
> The change is in. Now I am checking that the integration tests still pass.

**Review comment**

> [!CAUTION]
> Consideration should be given to the introduction of input validation at this boundary, as the current implementation may exhibit suboptimal performance characteristics under adversarial input conditions.

> [!TIP]
> Validate `limit` here. A negative value makes the query scan the whole table.

**Saying it is broken**

> [!CAUTION]
> There appears to be a potential issue with one of the assumptions underlying this approach, which may warrant further investigation.

> [!TIP]
> This assumption is wrong. The queue can deliver the same message twice.

**Admitting uncertainty**

> [!CAUTION]
> While a definitive determination cannot be made at this juncture, the available evidence would appear to be broadly consistent with the hypothesis that the retry mechanism is implicated.

> [!TIP]
> I think the retry loop causes it, but I have not confirmed it yet.

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

When a term may be new to you, you get the term plus one plain sentence, exactly as in the retry example above:

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
```

The word list is the small part. The skill's core is the six habits that produce heavy prose in the first place: nouns doing a verb's job, passive voice that hides who acts, climbing too far up the abstraction ladder, throat-clearing before the point, stacked hedges, and saying the same thing twice.

That distinction is what the measurements above show. In both test answers the model used **zero** words from any avoid-list. The whole difference came from sentence structure. A word list alone would have changed nothing.

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

## How these numbers were measured

Four fresh agents, same model (Claude Opus), no shared context between them. Two questions, two agents per question. One agent in each pair loaded this skill, the other was told not to load any skill. Both got the same prompt otherwise, with no instruction about style, length, or word choice. The answers above are the complete, unedited output.

Sentence length, syllable counts, and the Flesch reading-ease score were computed from the raw text. "Technical terms kept" counts a fixed list of terms the answer should contain to be correct, checked against each answer.

Two questions is a demonstration, not a benchmark. The direction was the same for both, and the effect was larger on the question that invited denser prose.

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
