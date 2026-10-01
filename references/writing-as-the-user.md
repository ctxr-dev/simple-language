# Writing as the user: examples

Most drafts below have a deliberate typo or none, and most use lowercase. Do not fix them. Each one starts from the level 2 version of its source. All drafts except the first pair are unedited agent output.

## One request, two habits

This pair was written by hand as a reference, not generated.

Request: "ask pete in slack if the 2.4.1 deploy is done, i need it before i merge PAY-142"

> hey pete is the 2.4.1 deploy done? need it before i merge PAY-142

> Is the 2.4.1 deploy finshed? I need it before I merge PAY-142

## Analogy

Source: "A database lock is like the one key to a meeting room: while you hold it nobody else gets in. The limit: a room does not take the key back after thirty seconds. The database does."

Situation: a colleague asks in a chat thread "is a db lock basically a mutex?"

> a db lock is like the one key to a meetng room, while you hold it nobody else gets in. the limit is a room does not take the key back after thirty seconds, the db does

## The same fact at both levels

Source: "This is a race condition. Two workers can update the same row at the same time. (Level 2: Race condition: two jobs read 5 at the same time. Both write 4, not 3.)"

Situation: a colleague asks in a ticket comment "why did the counter end at 4?"

> race condition, two jobs read 5 at the same time and both wrte 4, not 3

## Default shape of an answer

Source: "The upload fails for files over 8 MB. The gateway closes the connection at its 10 second timeout, and a 20 MB file takes longer than that. Raise the gateway timeout, or switch to a presigned S3 upload."

Situation: a colleague asks in a ticket comment "any idea why big uploads die?"

> the upload fails for files over 8 MB. the gateway closes the conection at its 10 second timeout, and a 20 MB file takes longer than that
>
> raise the gateway timeout, or switch to a presigned S3 upload

## Keep the technical words, race condition

Source: "This is a race condition. Two workers can update the same row at the same time."

Situation: a colleague asks in a review reply "what's wrong with this update?"

> this is a race condition, two workers can update the same row at the same time

## Keep the technical words, idempotent

Source: "Idempotent means running it twice gives the same result as running it once."

Situation: a colleague asks in chat "what do you mean idempotent here?"

> idempotent means run it twice, same result as running it once

## Keep the technical words, back pressure

Source: "Back pressure means the consumer can tell the producer to slow down."

Situation: a colleague asks in chat "what's back pressure in this context?"

> back pressure means the consumer can tell the producer to slow down

## Keep the technical words, dependency injection

Source: "Dependency injection means an object receives what it needs instead of building it itself."

Situation: a colleague asks in a PR review reply "why pass the client in instead of creating it?"

> dependency injection means an object gets what it needs, it doesnt buid it itself

## Nouns doing a verb's job, split modules

Source: "We should split this into two modules."

Situation: a colleague asks in a review reply "should this stay one module?"

> we should split this into two modules.

## Nouns doing a verb's job, latency

Source: "Latency dropped after we added the index."

Situation: a colleague asks in a ticket comment "did the index help?"

> latency dropped after we added the index

## Passive voice that hides who acts

Source: "The writer clears the cache after it updates the record."

Situation: a colleague asks in chat "who clears the cache?"

> the writer clears the cache after it updates the record

## Stacked hedges

Source: "This is probably slower. I have not measured it."

Situation: a colleague asks in a review reply "is this slower?"

> this is probably slower, i havent measured it

## By situation, progress update

Source: "The change is in. Now I am checking that the integration tests still pass."

Situation: a colleague asks in a ticket comment "status?"

> the change is in, now i am checkng that the integration tests still pass

## By situation, something is broken

Source: "This assumption is wrong. The queue can deliver the same message twice."

Situation: a colleague asks in a review reply "the queue guarantees once, right?"

> this assumption is wrong, the queue can delivre the same message twice

## By situation, you do not know

Source: "I don't know yet."

Situation: a colleague asks in chat "whats causing the 500s?"

> i dont know yet

## By situation, you think but have not confirmed

Source: "I think the retry loop causes it, but I have not confirmed it."

Situation: a colleague asks in chat "any idea what's causing the dupes?"

> i think the retry loop causes it, but i havent confirmed it

## By situation, you cannot confirm

Source: "I can't confirm that. I need to check the current docs for that API."

Situation: a colleague asks in chat "does that API support batch deletes?"

> i cant confirm that, i need to check the current docs for that API

## By situation, explaining code

Source: "This wraps both writes in one transaction, so a crash cannot leave the order half-created. It holds a row lock while it runs, so keep the block short."

Situation: the user asks "write the PR description for the order transaction change"

> This puts both writes in one transaction, so a crash cannot leave the order half craeted.
>
> It holds a row lock while it runs, so keep the block short.

## By situation, review comment

Source: "Validate `limit` here. A negative value makes the query scan the whole table."

Situation: a GitHub review comment the user posts

> validate `limit` here. a negative value makes the query scan the whole table.

## By situation, advanced topic

Source: "Temporal runs workflows that survive crashes. It does that by replaying your workflow code from its event history, so the code must be deterministic: no random values, no clock reads, no direct network calls."

Situation: a colleague asks in chat "why can't we call the API from the workflow?"

> Temporal runs workflows that surive crashes, it replays your workflow code from its event history, so the code must be deterministic
>
> no random values, no clock reads, no direct network calls
