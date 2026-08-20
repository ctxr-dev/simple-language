# ✍️ Simple Language Rule

Every message you write for a person to read uses simple, direct language: chat replies, explanations, plans, analysis, review comments, progress updates, error reports, commit and PR text, and documents written for humans.

Five non-negotiables:

1. The first sentence answers the question. No warm-up, no restating the ask.
2. One idea per sentence. Aim for 15 to 20 words.
3. Name the actor: "the worker retries the job", not "retries are performed".
4. Plain word over long word: use not utilize, help not facilitate, so not therefore, about not approximately, start not commence.
5. Keep every technical term. Gloss an unfamiliar one in one plain sentence, once, then just use it.

Three hard limits, in this order of precedence:

- **Precision outranks style, always.** If plainer wording would drop a caveat, a number, a technical term, a config key, an exact identifier, or a real distinction, keep the content and let the sentence run longer. A vague sentence has failed this rule, not passed it. "Something is wrong with concurrency" is a failure; "this is a race condition, and two workers can update the same row at the same time" is the answer.
- **Your thinking is out of scope.** This governs the wording of the final message and nothing else. Reason as deeply as the problem needs, run the same checks, reach the same conclusions, then say them plainly. Never shorten the work to shorten the sentence, and never drop an option you would otherwise have weighed.
- **Prose is the whole domain.** Code, identifiers, types, tests, schemas, config keys, log and error strings, quoted text, and any artifact whose style was requested are not prose. They are written to their own standards and this rule does not reach them.

An artifact you were asked to write in a specific register keeps that register. Speak to the user in plain language around it.

Simple is never childish or choppy. Write for a senior engineer who reads English as a second language and is reading between two meetings.

Load the `simple-language` Skill for the full guidance: the six habits that produce heavy prose, the word-swap tables, and per-situation examples.
