# Sources

This file is the ledger of everything the corpus has processed. A source that is not listed here has not been processed.

Rules for this file:

- Only add rows. Never delete a row or change the first three cells of an archive row. A row is the proof that a source was processed.
- collect.mjs reads the first table to learn which windows are done. It adds a row to that table when it finishes a window.
- Write dates as YYYY-MM-DD. Write times in UTC as YYYY-MM-DDTHH:MM:SSZ.

## Archive windows

One row for each subreddit and each query window. A window is the span of comment times sent to the Arctic Shift API. The "After" time is included. The "Before" time is not.

| Subreddit | After | Before | Minimum length | Comments fetched | Comments read in full | Date processed | Note |
|---|---|---|---|---|---|---|---|
| programming | 2025-06-10T00:00:00Z | 2025-06-10T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| programming | 2025-06-10T12:00:00Z | 2025-06-10T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| programming | 2025-08-20T00:00:00Z | 2025-08-20T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| programming | 2025-08-20T12:00:00Z | 2025-08-20T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| ExperiencedDevs | 2025-06-10T00:00:00Z | 2025-06-10T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| ExperiencedDevs | 2025-06-10T12:00:00Z | 2025-06-10T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| ExperiencedDevs | 2025-08-20T00:00:00Z | 2025-08-20T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| ExperiencedDevs | 2025-08-20T12:00:00Z | 2025-08-20T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| devops | 2025-06-10T00:00:00Z | 2025-06-10T06:00:00Z | 18 words | 42 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, and the window held fewer. |
| devops | 2025-06-10T12:00:00Z | 2025-06-10T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| devops | 2025-08-20T00:00:00Z | 2025-08-20T06:00:00Z | 18 words | 81 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, and the window held fewer. |
| devops | 2025-08-20T12:00:00Z | 2025-08-20T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| sysadmin | 2025-06-10T00:00:00Z | 2025-06-10T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| sysadmin | 2025-06-10T12:00:00Z | 2025-06-10T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| sysadmin | 2025-08-20T00:00:00Z | 2025-08-20T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| sysadmin | 2025-08-20T12:00:00Z | 2025-08-20T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| webdev | 2025-06-10T00:00:00Z | 2025-06-10T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| webdev | 2025-06-10T12:00:00Z | 2025-06-10T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| webdev | 2025-08-20T00:00:00Z | 2025-08-20T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| webdev | 2025-08-20T12:00:00Z | 2025-08-20T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| cscareerquestions | 2025-06-10T00:00:00Z | 2025-06-10T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| cscareerquestions | 2025-06-10T12:00:00Z | 2025-06-10T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| cscareerquestions | 2025-08-20T00:00:00Z | 2025-08-20T06:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| cscareerquestions | 2025-08-20T12:00:00Z | 2025-08-20T18:00:00Z | 18 words | 100 | pooled | 2026-10-01 | Initial developer run. One page of up to 100 comments, page order not recorded. |
| AskReddit | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| CasualConversation | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| personalfinance | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| NoStupidQuestions | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| Advice | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| relationship_advice | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| AmItheAsshole | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| mildlyinteresting | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| offmychest | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| TooAfraidToAsk | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| dating_advice | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| legaladvice | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| AskMen | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| AskWomen | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |
| ask | initial run, window not recorded | initial run, window not recorded | 120 | not recorded | pooled | 2026-10-01 | Initial casual run. The windows were 3 to 4 hours long and spread over 2022 to 2025. |

How to read the columns:

- Minimum length counts characters. The first developer run did not filter by length when it fetched. It screened archive comments of 18 words or more, so its rows say "18 words".
- Comments fetched is the number the API returned for the window.
- Comments read in full is the number of comments somebody read from start to end. collect.mjs writes 0. After you classify a window, change this cell to the real number and say so in the Note.
- "pooled" means the run read comments in full but did not record a number for each window. The totals are below.
- "not recorded" means the run did not keep the number.

### The two first runs

Both runs happened before collect.mjs existed. They were done by hand with scripts on 2026-10-01. Their notes are the only record, so these rows hold what the notes say and no more.

Developer run (r/programming, r/ExperiencedDevs, r/devops, r/sysadmin, r/webdev and r/cscareerquestions):

- The notes name four 6 hour windows for each subreddit. They start at 2025-06-10 00:00, 2025-06-10 12:00, 2025-08-20 00:00 and 2025-08-20 12:00 UTC. That makes 24 rows. The "Before" time is the start plus 6 hours.
- The notes give one total for the archive: 2,323 comments. The count in each row comes from asking the archive for the same window again. The 24 counts add up to 2,323.
- The run also read 6 RSS threads, listed below. They gave 588 feed entries, which include the original posts and deleted stubs. With the 2,323 archive comments that makes 2,911 entries.
- It read 325 comments in full: 185 from two full RSS threads and 140 picked at random from the archive pool.
- It screened 1,755 comments with a spell checker: 1,429 archive comments of 18 words or more and 326 RSS comments of 8 words or more. The 445 that held at least one candidate were read in context.
- It recorded 124 instances in 99 comments.

Casual run (15 subreddits, listed in the rows above):

- The notes say 11,828 comments of 120 characters or more, taken from windows of 3 to 4 hours spread over 2022 to 2025. They do not give the windows or a count for each subreddit. So these rows say "initial run, window not recorded".
- Those comments hold 58,421 sentences and 861,905 words.
- It read 165 comments in full, in three random samples of 45, 50 and 70.
- It scanned all 11,828 comments with scripts and looked at about 450 comments or fragments in context.
- It recorded 285 instances in 253 comments. The comments the instances came from are dated between 2022-02-10 and 2025-11-24, on 20 different days.

## RSS threads

One row for each Reddit thread read through its RSS feed. The feed address is the thread address plus `/.rss?limit=100&sort=top`. Add a row here for every new thread.

| Thread | Subreddit | Thread date | Title | Comments on the thread | Read in full | Instances | Date processed | Link |
|---|---|---|---|---|---|---|---|---|
| 1odqipt | devops | 2025-10-23 | I can’t understand Docker and Kubernetes practically | 275 | no, screened only | 2 | 2026-10-01 | https://www.reddit.com/r/devops/comments/1odqipt/i_cant_understand_docker_and_kubernetes/ |
| 1oiytfa | devops | 2025-10-29 | AI was implemented as a trial in my company, and it’s scary. | 524 | yes, pooled with the other full thread (185 comments in all) | 12 | 2026-10-01 | https://www.reddit.com/r/devops/comments/1oiytfa/ai_was_implemented_as_a_trial_in_my_company_and/ |
| 1po8hj5 | devops | 2025-12-16 | Github Actions introducing a per-minute fee for self-hosted runners | 208 | no, screened only | 1 | 2026-10-01 | https://www.reddit.com/r/devops/comments/1po8hj5/github_actions_introducing_a_perminute_fee_for/ |
| 1pzkibf | devops | 2025-12-30 | I'm rejecting the next architecture PR that uses a Service Mesh for a team of 4 developers. We are gaslighting ourselves. | 214 | yes, pooled with the other full thread (185 comments in all) | 17 | 2026-10-01 | https://www.reddit.com/r/devops/comments/1pzkibf/im_rejecting_the_next_architecture_pr_that_uses_a/ |
| 1wjdpgx | sysadmin | 2026-09-18 | PSA: Grammarly will send unhinged messages to all your users if you try to cancel | 316 | no, screened only | 3 | 2026-10-01 | https://www.reddit.com/r/sysadmin/comments/1wjdpgx/psa_grammarly_will_send_unhinged_messages_to_all/ |
| 1wsg85r | sysadmin | 2026-09-28 | I hate terminating deceased accounts. | 486 | no, screened only | 3 | 2026-10-01 | https://www.reddit.com/r/sysadmin/comments/1wsg85r/i_hate_terminating_deceased_accounts/ |

The thread date and the comment count come from the Arctic Shift record of the thread. The first run kept 588 feed entries from the six threads together and did not record a count for each thread.

## Studies

One row for each study or reference in literature.md. "read" means the source was opened and the passages that literature.md cites were read. An abstract counts when literature.md cites only the abstract. "unavailable" means the source could not be opened, or its figures in literature.md come only from another paper or from a search result. The last column keeps the tag and the remark from the research notes. The tags are explained at the top of literature.md.

| ID | Source | URL | Status | Date processed | Tag and remark |
|---|---|---|---|---|---|
| S1 | Kano, A., Read, J. C., Dix, A., MacKenzie, I. S. (2007). "ExpECT: An Expanded Error Categorisation Method for Text Input." BHCI 2007. | https://www.yorku.ca/mack/bhci2007.pdf | read | 2026-10-01 | [V] |
| S2 | Dhakal, V., Feit, A. M., Kristensson, P. O., Oulasvirta, A. (2018). "Observations on Typing from 136 Million Keystrokes." CHI 2018. | https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf | read | 2026-10-01 | [V] |
| S3 | Wobbrock, J. O. (2007). "Measures of Text Entry Performance" (chapter 3; chapter title and author per the hosting site, not visible in the passages read), in MacKenzie & Tanaka-Ishii (eds.), Text Entry Systems: Mobility, Accessibility, Universality. | https://faculty.washington.edu/wobbrock/pubs/text-07.pdf | read | 2026-10-01 | [V for the passages quoted; it quotes Rumelhart & Norman 1982] |
| S4 | Palin, K., Feit, A. M., Kim, S., Kristensson, P. O., Oulasvirta, A. (2019). "How do People Type on Mobile Devices? Observations from a Study with 37,000 Volunteers." MobileHCI 2019. | https://userinterfaces.aalto.fi/typing37k/resources/Mobile_typing_study.pdf | read | 2026-10-01 | [V] |
| S5 | Gimenes, P. A., et al. (2015). "Spelling Error Patterns in Brazilian Portuguese." Computational Linguistics 41(1). | https://aclanthology.org/J15-1011.pdf | read | 2026-10-01 | [V; only the first author's name was visible in the text extraction] |
| S6 | Toutanova, K., Moore, R. C. (2002). "Pronunciation Modeling for Improved Spelling Correction." ACL 2002. | https://aclanthology.org/P02-1019.pdf | read | 2026-10-01 | [V for the Damerau 80% quote as stated there] |
| S7 | Shi, D., Zhu, Y., Fernandes Junior, F. E., Zhai, S., et al. (2025). "Simulating Errors in Touchscreen Typing" (Typoist). CHI 2025; arXiv 2502.03560. | https://arxiv.org/pdf/2502.03560 | read | 2026-10-01 | [V] |
| S8 | Baba, Y., Suzuki, H. (2012). "How Are Spelling Errors Generated and Corrected? A Study of Corrected and Uncorrected Spelling Errors Using Keystroke Logs." ACL 2012, pp. 373-377. | https://aclanthology.org/P12-2073.pdf | read | 2026-10-01 | [V] |
| S10 | Ingels, P. (1996). A Robust Text Processing Technique Applied to Lexical Error Recovery (Linköping thesis). arXiv cmp-lg/9702003. | https://arxiv.org/pdf/cmp-lg/9702003 | read | 2026-10-01 | [V. Used for the Damerau 80% wording, Kukich's TND profile, Peterson's real-word calculation, Pollock & Zamora's type split and the "secretary" copy-typing corpus in ch. 6, as relayed there] |
| S11 | Dahm, S. F., Rieger, M. (2019). "Errors in Imagined and Executed Typing." Vision 3(4), 66. | https://doi.org/10.3390/vision3040066 | read | 2026-10-01 | [abstract V; the Appendix A count table is U: page returned HTTP 403, figures came from a search excerpt] |
| S13 | Matias, E., MacKenzie, I. S., Buxton, W. (1993). "Half-QWERTY: A One-handed Keyboard Facilitating Skill Transfer From QWERTY." INTERCHI '93, pp. 88-94. | https://www.yorku.ca/mack/CHI93c.html | read | 2026-10-01 | [V; quotes Grudin and Munhall & Ostry on homologous errors] |
| S14 | Rayson, S. J., Hachamovitch, D. J., Kwatinetz, A. L., Hirsch, S. M. (1998). US Patent 5,761,689 "Autocorrecting text typed into a word processing document" (Microsoft). | https://patents.google.com/patent/US5761689A/en | read | 2026-10-01 | [V] |
| S15 | Lyddy, F., et al. (2014). "An Analysis of Language in University Students' Text Messages." Journal of Computer-Mediated Communication 19(3), 546-561. | https://pdcrodas.webs.ull.es/variedades/LyddyEtAlAnAnalysisOfLanguageInUniversityStudentsTextMessages.pdf | read | 2026-10-01 | [V; the journal header read "(2014) 546-561"] Other address: https://onlinelibrary.wiley.com/doi/full/10.1111/jcc4.12045 |
| S16 | Pollock, J. J., Zamora, A. (1983). "Collection and characterization of spelling errors in scientific and scholarly text." JASIS 34(1), 51-58. | https://api.crossref.org/works/10.1002/asi.4630340108 | read | 2026-10-01 | [V for abstract only] |
| S17 | Jacobs, C. (2019). "Seeing not just any evil: Eye Movements, Typos, and and Autocorrects." Psychonomic Society Featured Content. | https://featuredcontent.psychonomic.org/seeing-not-just-any-evil-eye-movements-typos-and-and-autocorrects/ | read | 2026-10-01 | [V; informal blog] |
| S18 | Medeiros (1995), the European Portuguese study reported in S5 as finding that 80.1% of spelling errors fit Damerau's categories. | none (second hand only) | unavailable | 2026-10-01 | [S, via S5] |
| S19 | Damerau, F. J. (1964). "A technique for computer detection and correction of spelling errors." CACM 7(3), 171-176. | https://api.crossref.org/works/10.1145/363958.363994 | read | 2026-10-01 | [V for abstract only] |
| S20 | Wikipedia, "Typographical error" (atomic typos). | https://en.wikipedia.org/wiki/Typographical_error | read | 2026-10-01 | [V] Other address: https://en.wikipedia.org/w/index.php?title=Typographical_error&action=raw |
| S21 | Wikipedia, "Commonly misspelled English words" | https://en.wikipedia.org/w/index.php?title=Commonly_misspelled_English_words&action=raw | read | 2026-10-01 | [V] |
| S22 | Shah, K., de Melo, G. (2020). "Correcting the Autocorrect: Context-Aware Typographical Error Correction via Training Data Augmentation." arXiv 2005.01158. | https://arxiv.org/pdf/2005.01158 | read | 2026-10-01 | [V. The paper takes its error statistics from the Twitter Typo Corpus (Aramaki 2010); quoted for "seperate"] |
| S23 | Wikipedia, "Cupertino effect". | https://en.wikipedia.org/wiki/Cupertino_effect | read | 2026-10-01 | [V] |
| S25 | Lehal, G. S., Bhagat, M. (2004). "Error pattern in Punjabi Typed Text." ICON 2004. | https://learnpunjabi.org/pdf/icon2004.pdf | read | 2026-10-01 | [V as relayed. Used only for the Mitton and Pollock & Zamora multi-error shares] |
| S26 | Shah, K., Patel, M., Sheth, J., Lad, K. (2012). "Comparative Study of Spell Checking Algorithms and Tools." IJARCS 3(3). | https://www.ijarcs.info/index.php/Ijarcs/article/download/1201/1189 | read | 2026-10-01 | [V. Secondary on Kukich, Grudin, Mitton, Pollock & Zamora: first-position and word-length figures, Grudin participants and rates] |
| S27 | Komninos, A., Dunlop, M., Katsaris, K., Garofalakis, J. (2018). "A glimpse of mobile text entry errors and corrective behaviour in the wild." | https://strathprints.strath.ac.uk/66313/1/Komninos_etal_HCI_2018_A_glimpse_of_mobile_text_entry_errors_and_corrective.pdf | read | 2026-10-01 | [V; venue not stated in the text read] |
| S29 | "What Can Typing Tell Us About Language Production?" Annual Review of Linguistics (2025). | https://www.annualreviews.org/content/journals/10.1146/annurev-linguistics-041824-034740 | unavailable | 2026-10-01 | [U. The page fetch returned nothing; the 17%/62%/7% Grudin figures and the "fig → feg" example are search-engine excerpts from it] |
| Gentner 1983 | Gentner, D. R., Grudin, J. T., Larochelle, S., Norman, D. A., Rumelhart, D. E. (1983). "A glossary of terms including a classification of typing errors." In Cooper (ed.), Cognitive Aspects of Skilled Typewriting, pp. 39-43. | https://link.springer.com/chapter/10.1007/978-1-4612-5470-6_2 | unavailable | 2026-10-01 | [not opened; definitions read as quoted in S1, S3, S7] |
| Grudin 1983 | Grudin, J. T. (1983). "Error patterns in novice and skilled transcription typing." In Cooper (ed.), pp. 121-143. | https://link.springer.com/chapter/10.1007/978-1-4612-5470-6_6 | unavailable | 2026-10-01 | [paywalled] |
| Kukich 1992 | Kukich, K. (1992). "Techniques for automatically correcting words in text." ACM Computing Surveys 24(4), 377-439. | https://dl.acm.org/doi/10.1145/146370.146380 | unavailable | 2026-10-01 | The publisher page returned HTTP 403. Abstract only, through Crossref: https://api.crossref.org/works/10.1145/146370.146380 |
| Rumelhart 1982 | Rumelhart, D. E., Norman, D. A. (1982). "Simulating a skilled typist." Cognitive Science 6(1), 1-36. | https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog0601_1 | unavailable | 2026-10-01 | [not opened] |
