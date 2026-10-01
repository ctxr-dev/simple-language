# Typing errors and misspellings: literature evidence base

Purpose: ground an Agent Skill that writes hurried human-style messages with about one typo every 2 to 3 sentences.
Every example below is quoted verbatim from a source I opened, with the source ID in brackets. Nothing was invented or tidied.

Status in this repo: this file carries over the literature research of 2026-10-01. It is the evidence behind the kinds named in README.md. sources.md lists every study below with its URL and whether it could be read. instances.md holds the real examples.

Voice: the notes were written in the first person by the agent that did the research. "I" means that agent.

Two number ranges inside quotes (90-95% and 1-3.2%) use a hyphen where the source printed an en dash.

Section 7 checks a target of one typo per 2 to 3 sentences. That was the target when the research was done. The measured rates in that section do not depend on the target.

Verification tags used throughout:

- **[V]** I opened the source and read the passage myself.
- **[S]** Secondary: the figure is quoted by another paper I opened, but I did not see the original.
- **[U]** Unverified: the figure came only from a search-engine excerpt, or I could not open the page. Do not rely on it without checking.
- **[derived]** My own arithmetic on verified numbers. The inputs are shown so it can be rechecked.

## 0. Headline findings and corrections to the research request

1. **The "ExpECT percentages" (40/20/15/15/3/2/2) are not ExpECT's own data.** In Kano et al. 2007 that table is "Table 1. Errors found in White [19]", an early typewriter-era study (White, *Typing for Accuracy*, reprinted in Dvorak et al. 1936). ExpECT's own children's data are reported differently (section 3.4). Cite the table as White, not Kano. [V: S1]
2. **Damerau 1964's own abstract does not contain the "80%" figure.** The abstract says the method assumes at most one error and got over 95 percent correct identification on a test run. The "over 80% of misspellings are one insertion, deletion, substitution or transposition" figure is how later papers quote it. [V for abstract: S19; the 80% is [S]: S5, S6, S10]
3. **What survives into a final text differs from what people make while typing.** Errors in proofread or final text skew to omissions, vowel-for-vowel swaps, and word-medial slips. Errors in speeded transcription with touch keyboards skew to substitutions. See section 3.2.
4. **About 15% of natural typing slips happen to be real words** (22 of 150 in a transcription corpus; up to 16% in running text by a word-list calculation). Without a filter, "never produce a different real word" would fail about 1 slip in 7. [V: S10]
5. **Rate sanity check (section 7):** "one typo per 2 to 3 sentences" is about 2 to 4 percent of words. That sits above strict-misspelling rates in real text messages (about 0.9 percent of words) and slightly above fast-copy-typing rates by trained secretaries (about 1.7 percent), and well below uncorrected rates in online transcription tests. It is plausible for "hurried", but it is at the high end for real casual messages.
6. **Rollover and cross-hand transposition:** the 76% cross-hand figure and the rollover prevalence figures are both verified, but no source I could open links the two. The link is a mechanistic inference (section 2). [V for each figure: S3, S2]

## 1. Error-kind table

Columns: name, mechanism, example (verbatim, with source), frequency (with source and context).
"% of errors" means share of all errors in that study. "per char" or "per word" means a rate over text.

| # | Kind | Mechanism | Example (verbatim) | Frequency and source |
|---|---|---|---|---|
| 1 | **Substitution, adjacent key** (Dvorak "adjacent error"; Read & Horton "Next To") | Finger lands on a neighbouring key (motor slip) | "amvition for ambition" [S1, quoting Dvorak et al.]; "typist ends up as typ**u**st" [S7]; "fiowers (flowers)", "rounp (round)" [S1] | Lessenberry built confusion matrices from 60,000 erroneous letters; the adjacent errors "correspond to 60% of Lessenberry's errors" [S: S1 quoting Dvorak et al.]. Grudin: adjacent-key substitutions 17% of expert and 62% of novice errors vs 7% by chance [U: search excerpt of the Annual Review article, see section 9]. Touchscreen, young adults: substitution 3.47% per char with no correction allowed [V: S7]. |
| 2 | **Substitution, homologous** | Correct finger, wrong hand (mirror-image key) | "substituting *D* for *K* (middle finger of either hand) is a homologous error" [V: S13]; "fig → feg" [U: search excerpt of the Annual Review article] | Grudin found "homologous substitution errors are among the most common errors" [S: S13 quoting Grudin 1983]. Wobbrock: "thought to be more common in novice typists than in expert typists" [V: S3]. Counts in a later copy-typing study: substitution homologous 68, neighbour 711, other 197; transposition homologous 14, other 247 [U: search excerpt of S11, Dahm & Rieger 2019 appendix; I could not open the page]. |
| 3 | **Substitution, vowel for vowel (sound-driven)** | Cognitive or phonological slip, not motor | "visable→visible" [V: S8]; "eazy→easy" is the consonant case, which is noticed more easily [V: S8] | In the persisted-misspelling list V→V substitutions are "overwhelmingly more common"; in raw keystroke logs there is no C→C vs V→V difference [V: S8]. |
| 4 | **Omission** (deletion, dropped letter) | Lapse or keystroke not registered | "litte (little)", "brething (breathing)" [V: S1]; "commitee for committee" [V: S2]; "tpist" [V: S7] | Pollock & Zamora (50,000+ misspellings, scientific text): deletions 34% [S: S10]. Secretaries copy-typing: deletions 41.3% incl. run-ons, 14 of the 62 [V: S10, derived split]. Touch screen, young adults: 0.17% per char [V: S7]. Desktop online test: 0.8% per char [V: S2]. |
| 5 | **Omission of one letter of a double** | Repeated letter collapsed | "litte (little)" [V: S1]; "tomorow→tomorrow" [V: S8] | Persisted errors: deletion in a repeated-letter context is "observed significantly more frequently than in a non-repeating context" in the common-misspellings list, but not in raw keystroke data [V: S8]. No per-letter rate found. |
| 6 | **Insertion** (extra letter) | Neighbouring key co-pressed, or double tap | "hern (her)", "docktor (doctor)" [V: S1]; "string for sting" [V: S2]; "typoist" for typist [V: S7] | Pollock & Zamora: insertions 27% [S: S10]. Secretaries: 20.7% incl. 1 split [V: S10]. Touch screen young adults: 0.25% per char [V: S7]. Desktop: 0.67% per char [V: S2]. Mobile, uncorrected: 11.1% of errors [V: S4]. |
| 7 | **Doubled-letter insertion ("replication")** | Letter typed twice | "alwaays (always)", "appartments (apartments)" [V: S1]; "thinn (thin)" [V: S1, from Read & Horton] | Pollock & Zamora: "inadvertent doubling of a letter is the most important cause of insertion errors" [V: S16 abstract]. |
| 8 | **Doubling error** (Gentner: wrong letter of a double is doubled) | Motor schema for "double" bound to the wrong letter | "look turns into lo**kk**" [V: S7]; "school → scholl" [V: S3]; "caleed (called)" [V: S1] | Rare in the children's residual errors: 2 of 1,327 (0.15%) [V: S1]. Skill note: "bokk for book" has the same shape as "lokk" and "scholl". |
| 9 | **Transposition, adjacent letters** | Two keys fire in swapped order, mostly across hands | "tiem (time)" [V: S1]; "speical" for special [V: S3]; "shou**dl**" for should [V: S7]; Word's built-in autocorrect list holds "teh" and "adn" [V: S14] | Pollock & Zamora: 12.5% of misspellings [S: S10]. "One transposition error for every 1800 typed characters (Rumelhart & Norman, 1982)" and "about 76%, occur across hands" [V: S3 quoting R&N]. Children, residual errors: 9 of 1,327 (0.68%) [V: S1]. Secretaries: 14.0% [V: S10]. Touch screen young adults: 0.07% per char [V: S7]. |
| 10 | **Alternation error** | Wrong alternation sequence | "these becomes th**ses**" [V: S7]; "thses" [V: S3] | 0 of 1,327 in the children's data [V: S1]. |
| 11 | **Space omitted (run-on)** | Space not typed | "doorsare (doors are)", "thanksfor (thanks for)" [V: S1]; "yesthisis" [V: S10]; "He gaveher roses" [V: S10] | Kukich, deaf-relay transcripts (TND, 40,000 words): run-ons 13% of nonword errors [S: S10]. Mitton, 15-year-olds' handwritten essays: run-ons 3% [S: S10]. Brazilian Portuguese, web-typed: missing space 27 of 1,139 errors (2.37%) [V: S5]. Run-ons "involve a relatively small set of high-frequency function words" [S: S10]. |
| 11b | **Space-bar confusion or omission on touchscreens** | Thumb misses or hits space | "space key confusion" [V: S7] | A figure "37% of typing errors in English language virtual keyboards were due to spacebar omissions" appears in a patent text [U: search excerpt only]. Do not use. |
| 12 | **Space inserted (split)** | Extra space inside a word | "t eam (team)", "house keeper (housekeeper)" [V: S1]; "sp ent" [V: S10] | Kukich TND: splits 2% [S: S10]. Mitton: splits 14% [S: S10]. Portuguese: space insertion 1 of 1,139 (0.09%) [V: S5]. |
| 13 | **Space shifted one character** | Space and a neighbouring letter swap order | "He gav eher roses" is the textbook case of a split caused by a displaced space [V: S10]. Gentner's transposition "also occurs when space or punctuation that precedes or follows the word is switched" [V: S1] | Portuguese "Space transposition" 2 of 1,139 errors (0.17%) [V: S5]. No English rate found. |
| 14 | **Duplicated space** | Space typed twice | "all that he could (all that he could)" [V: S1] | Children: counted separately; I could not read the table reliably (see section 8). |
| 15 | **Key held down (execution error)** | Auto-repeat | "maaaaany (many)" [V: S1] | Children's study only. Not reported for adults. |
| 16 | **Capitalisation: second capital after Shift held too long** | Shift released after the second letter | "THey" would be replaced with "They" [V: S14, US patent 5761689] | The patent describes it as "a common typing error in which the user fails to release the shift key before the second letter of a word is typed" [V: S14]. White's typewriter study: capitalisations 2% of errors [V: S1]. No modern rate found. |
| 17 | **Capitalisation: missing capital** (a habit more than a slip) | Casual register | "john, i'd" [V: S15] | Text messages by students: 728 of 3,296 nonstandard items (22.09%), about 5.4% of all words [V: S15; the 5.4% is derived: 728 / 13,391 words]. |
| 18 | **Apostrophe dropped** (habit) | Casual register | "dont, cant, wont, ill" [V: S15] | 349 omitted apostrophes; "of the messages in which an apostrophe might have been used (611 messages), 43% were correct" [V: S15]. |
| 19 | **Repeated word** | Perseveration or anticipation | "the the" or "same same" [V: S17] | White's typewriter study: "Repeating Words" 1% of errors [V: S1]. Readers often skip a repeated "the" [V: S17]. |
| 20 | **Capture error** | A similar-start word takes over | "efficiency / efficient", "incredibly / incredible", "normal / norman" [V: S3] | No rate. Skill note: these are real words, so they fall under the real-word ban. |
| 21 | **Atomic typo (slip lands on a real word)** | Any single edit that yields a word | "now" instead of "not"; "unclear" instead of "nuclear"; "you" instead of "your" [V: S20] | Secretaries: 22 of 150 errors (14.7%) were real-word errors [V: S10]. Peterson 1986 as reported by Ingels: of 205,480,845 possible single mistypings of a 369,546-word list, 0.5% give another valid word; weighted by word frequency "the expected frequency of single error real-word errors caused by typographic mistakes could be as high as 16%", and "short words are more likely to be real-word errors if mistyped" [V: S10]. |
| 22 | **Cognitive misspelling** (writer does not know the spelling) | Phonetic or orthographic confusion | "definately", "recieve", "accomodate", "acheive", "arguement", "embarass", "millenium", "neccessary", "occurence", "privelege", "independant" [V: S21, Wikipedia list, which marks each as not a typo]; "seperate" [V: S22] | Mitton, handwritten school essays: "Homophones and near-homophones made up close to 60% of the errors" [S: S10]. In typed text the typographic share dominates (section 3.2). Kukich TND: phonetic errors 2% [S: S10]. |
| 23 | **Phonetic swap (real homophones)** | Word-level confusion | "their / there", "your / you're" [V: S3] | Wobbrock: "unlikely to occur in short transcription typing, but may occur when participants are composing text" [V: S3]. |
| 24 | **Autocorrect artefact** | Dictionary replaces the typo or a valid word with another word | "cooperation" changed to "Cupertino"; "definately" replaced with "defiantly" [V: S23] | In Typing37K, among participants who used any intelligent entry method, 8% of words were automatically corrected [V: S4]. No error rate for wrong autocorrects found. Another claim, "61% of corrected strings altered variable names", came from a search excerpt only [U]. |

## 2. Mechanisms

### 2.1 Neighbouring-key substitution
Motor noise: the finger's endpoint spreads around the target, so a neighbour key is hit. Typoist models this with a Gaussian whose spread grows with finger speed; "This motor control noise can lead to substitution errors (tapping a key adjacent to the intended one etc.) or omission errors (the finger not hitting any key)" [V: S7].

Corpus evidence from the Twitter Typo Corpus (39,171 word pairs): "The characters that on standard QWERTY keyboards are located near the finger tips in a natural typing position are more likely to be inserted by mistake. For example, 'a', 'd', 'e', and 'i' exhibit high insertion error frequencies." "The deletion frequency is highly correlated with the natural occurrence frequency of characters." "Characters in the middle row of QWERTY keyboards such as 'd', 'f', 'g', 'j', 'k' are less likely to be missed." [V: S22]. The paper notes that for deletions, high-frequency vowels "a, e, i, o" show a higher deletion frequency, but that "does not imply that they are more likely to be missed" (a frequency effect).

### 2.2 Transposition and rollover
- Rumelhart & Norman (via Wobbrock): about 1 transposition per 1,800 characters in skilled typing, and "about 76%, occur across hands" [V: S3].
- Cross-hand intervals are shorter than same-hand intervals. Dhakal: letter pairs typed by different hands are "30-60 ms faster than those using fingers of the same hand" in the older literature [V: S2].
- Rollover (next key pressed before the previous one is released): average rollover ratio 25% of keystrokes (SD 17%); "the majority of fast typists use rollover for 40-70% of keypresses"; when used, "keystrokes overlap by 30 ms, on average, and up to 100 ms" [V: S2].
- **Inference [not stated by any source I read]:** overlapping presses on alternating hands make out-of-order registration more likely, which fits the 76% cross-hand share. Dhakal's error analysis used TextTest, which only reports insertion, omission and substitution, so the paper does not measure transposition at all [V: S2].
- Within-hand transpositions also exist (about 24% by the same figure), for example "avriations" for "variations": v and a are both left-hand keys [my observation; keys are standard QWERTY].

### 2.3 Homologous (same finger, other hand)
Grudin separated two substitution kinds: "substitution errors amongst homologous letters (letter pairs which are pressed by the same finger on the same position but on different hands)" and substitutions of adjacent letters. "He concluded that both were likely to be caused by error in the control of the typing fingers" [V: S1, describing Grudin]. Munhall and Ostry confirmed the homologous finding per the Half-QWERTY paper [V: S13].

### 2.4 Doubling and doubled-letter errors
Gentner et al. define the doubling error as: "Word containing a repeated letter and the wrong letter is doubled instead." ExpECT restricts it to words that already have a double letter; a single duplicated letter in other words is a separate "Duplicated Letter" class [V: S1]. Rumelhart & Norman explain doubling with a weak binding between the "double" signal and its argument [S: search excerpt of the abstract, U].

### 2.5 Space errors
Gentner's class treats a displaced space as a transposition [V: S1]. Ingels lists the four edit operations applied to word boundaries (deletion gives "He gaveher roses", insertion gives "He ga ve her roses", substitution gives "He gavehher ro es", transposition gives "He gav eher roses") and says run-ons and splits "also arise from cognitive and phonetic misconceptions" [V: S10]. Kukich found run-ons commoner than splits; Mitton found the opposite [S: S10]. Either direction occurs in real data.

### 2.6 Shift timing
The shift key is held by one hand while the letter is typed by the other, so release timing is a coordination problem. Microsoft's patent text names the symptom: "fails to release the shift key before the second letter of a word is typed", example "THey" [V: S14]. The mirror failure, releasing Shift too early, gives a missing capital [typetera.com guide, U].

### 2.7 Repeated word
Perseveration or anticipation errors: "people will write the same words multiple times (e.g. 'the the' or 'same same')" [V: S17].

### 2.8 Autocorrect and prediction artefacts on phones
- Typoist's authors note the simulation "might overlook some errors created/exacerbated by autocorrection itself", such as "space key confusion": "users accidentally hit the space bar instead of producing the intended non-space character, thus triggering unintended autocorrection and the insertion of incorrect words" [V: S7].
- Shah & de Melo: "many such errors are now *caused* by autocorrection software", and they describe real-word errors ("atomic typos") as an "abundance" on hand-held devices [V: S22].
- Classic case: "cooperation" to "Cupertino"; "definately" replaced by "defiantly" [V: S23].
- Autocorrect users were faster in Typing37K (r = 0.237 with WPM), so autocorrect lowers the visible typo rate even as it adds real-word errors [V: S4].

## 3. Taxonomies and frequencies, source by source

### 3.1 Single-edit share
| Study | Single-error share | Notes |
|---|---|---|
| Damerau 1964 | "over 80%" [S: S5, S6, S10]; "as many as 80% of the words rejected by the list of acceptable terms in an information retrieval system" [V: S10] | Original abstract only claims over 95% correct identification on a test run [V: S19]. |
| Pollock & Zamora 1983 | "90-95% of spelling errors have only a single mistake" [V: S16]; multiple-error 7.5% [S: S10] | 50,000+ misspellings from about 25,000,000 words, seven scientific databases; incidence 0.2% of words [V: S16]. |
| Kukich, TND transcripts | 78% single [S: S10] | 40,000-word corpus, typed by deaf users. |
| Mitton 1987 | 31% multiple-error; Pollock & Zamora multi-error given as 6% here [S: S25] | Handwritten essays for Mitton, so not a typing source. Ingels gives Pollock & Zamora multi-error as 7.5% (S10); the two secondary sources differ. |
| Secretaries (Ingels) | 95.3% single (143 of 150) [V: S10] | Copy-typing "as fast as you can". |
| Brazilian Portuguese (Gimenes et al.) | 966 of 1,139 (84.8%) [V: S5, derived] | Web-typed; about half the errors involve diacritics; with diacritics treated as substitutions about 89% of single errors fit Damerau's four classes [V: S5]. |

### 3.2 Which edit types dominate (it depends on what survived and on the input method)
| Study and setting | Insert | Omit | Subst | Transp | Source |
|---|---|---|---|---|---|
| Pollock & Zamora: final scientific text | 27% | 34% | 19% | 12.5% | [S: S10] |
| Secretaries, copy-typing as fast as possible (150 errors) | 20.7% | 41.3% (incl. 14 run-ons) | 19.3% | 14.0% | [V: S10; derived from Table 6.7] |
| Children, residual errors only (Gentner classes, 1,327) | 43.03% | 33.38% | 22.61% | 0.68% | [V: S1] |
| Children, Wobbrock-Myers, corrected and uncorrected (2,490) | 38.5% | 30.4% | 31.13% | n/a | [V: S1]; 56.87% uncorrected |
| Desktop online test, 168,000 people, per char rates | 0.67% | 0.8% | 1.65% | not measured | [V: S2] |
| Mobile online test, 37,370 people, share of uncorrected errors | 11.1% | 33.3% | 55.6% | not measured | [V: S4] |
| Touchscreen young adults (n = 8, 29.4 WPM), per char, no correction | 0.25% | 0.17% | 3.47% | 0.07% | [V: S7] |
| Touchscreen elderly (n = 15), per char | 4.60% | 10.80% | 5.80% | 0.00% | [V: S7] |
| Persisted common misspellings vs raw keystroke logs | n/a | most common in the persisted list | dominates raw keystroke errors | n/a | [V: S8] |
| Twitter typo corpus (39,171 pairs) | "dominated by substitution, insertion, and deletion"; replication and transposition "relatively scarce" | | | | [V: S22] |

Reading across: slips are substitution-heavy as they happen, but "Substitution mistakes are easy to catch, while Deletion mistakes tend to escape our attention" [V: S8]. Final-text typos therefore lean toward dropped letters and sound-alike vowel changes. Older work found insertion and omission more common than substitution for skilled typists, and the reverse for novices: "Insertion errors ... and omission errors ... were more common than substitution errors ... whereas the opposite was found for novice touch typists" [V: S2, describing earlier studies].

### 3.3 Grudin 1983 (skilled vs novice)
Original chapter is paywalled; I could not read it [U]. What I could confirm:
- Categories: Substitution, Insertion, Omission, Transposition, Other; special focus on homologous and adjacent substitutions [V: S1 describing it].
- Participants: ExpECT says "expert typists and 70 beginner typists at high school" [V: S1]. A different summary says "6 expert and 8 beginner typists ... about 60000 characters" [V: S26]. **These two secondary accounts disagree.**
- Rates per S26: "error rate ranged from 0.4% to 0.9% for experts and 3.2% for beginners approximately. Expert's errors were type of insertions while the majority of beginner's errors were substitutions" [S: S26, garbled layout].
- Adjacent substitutions: 17% of expert and 62% of novice errors, chance 7% [U: S29 excerpt].
- Look-ahead permutation example "gib→big" is attributed to Grudin by Baba & Suzuki [V: S8].

### 3.4 Kano et al. 2007 ExpECT
- Setting: children's copy-typing; 112 children, 25,531 letters attempted in 1,030 phrases; 2,312 errors found by manual inspection (about 9% per letter [derived: 2,312 / 25,531]); 49.4% were fixed [V: S1].
- Own class system (letter, word, phrase levels): Omitted Letter, Omitted Space, Substituted Letter, Transposition, Next-To (NT-S, NT-Mu), Close-To (CT-S, CT-Mu), Doubling Error, Duplicated Letter, Inserted Letter, Inserted Space, Duplicated Space, Interchange, Migration, Alternating Error, Execution Error and word and phrase classes [V: S1].
- I could not read the final per-class count table reliably (columns garbled in the text extraction). I will not quote per-class counts for NT-S, OL, OS, DS and so on [see section 8].
- The one table with the 40/20/15/15 split is White's (see section 0).

White's table, as printed in ExpECT Table 1 (percent of total errors): Substituted Strokes 40, Omitted Strokes 20, Spacing 15, Transposed Strokes 15, Inserted Strokes 3, Double Strokes 2, Capitalisations 2, Syllable Division 1, Repeating Words 1, Omitting Words 1. The printed N is "20623" in my extraction; it may be 20,623 or a misprint [V for percentages, U for N: S1].

### 3.5 Dhakal et al. CHI 2018 (136 million keystrokes)
- 168,000 volunteers, 15 sentences each (at most 70 characters; drawn from Enron mobile email and Gigaword newswire sentences), three months; mean 51.56 WPM [V: S2].
- Average uncorrected error rate 1.167% of characters (SD 1.43%); 90% of participants left under 2.66%. Trained typists 1.02%, untrained 1.23% [V: S2].
- Error corrections: 6.3% of keypresses; KSPC 1.173 [V: S2].
- Per-type rates (n = 783 participants closest to cluster centres): substitution 1.65%, omission 0.8%, insertion 0.67% [V: S2]. These sum to 3.1%, well above 1.17%, so they most likely include corrected errors. The paper's text does not say so explicitly in the passages I read [inference].
- Slow typists make many more substitution errors (Cohen's d = 1.57); faster typists make fewer mistakes overall [V: S2].
- "Uncorrected error rates are in the same range (1-3.2%)" as typewriter-era studies, but substitution is now more frequent than insertion or omission [V: S2].
- Rollover and hand-alternation: see section 2.2.

### 3.6 Palin et al. MobileHCI 2019 (37,370 mobile volunteers)
- 36.2 WPM, 2.34% uncorrected errors (SD 2.08); 75% of participants under 3.07%; US subsample 2.25%. Uncorrected errors: 11.1% insertion, 55.6% substitution, 33.3% omission [V: S4].
- Mobile left twice the uncorrected errors of desktop (2.34% vs 1.17%) and corrected less (1.89 vs 2.29 backspaces per sentence), "A possible explanation is the higher interaction cost of correcting mistakes on mobile devices" [V: S4].
- Among users of any intelligent entry method, on average 8% of words were automatically corrected, 10% picked from prediction, 22% gestured; 13.9% used none [V: S4].
- Prior field study noted in the paper: 34 keystrokes per session with 1.98 uncorrected words [V: S4, describing Komninos].

### 3.7 Shi et al. 2025, "Simulating Errors in Touchscreen Typing" (Typoist)
- Four character-level classes: insertion, omission, substitution, transposition. Example set in the paper: "typist becoming typ**o**ist", "tpist", "typ**u**st", "should becomes shou**dl**", "look turns into lo**kk**", "these becomes th**ses**" [V: S7].
- Mechanisms modelled: slips (inaccurate execution, double taps, swapped motor commands "influenced by finger movement speed"), lapses (forgetting to type a character, with probability growing since the last proofreading), mistakes (wrong knowledge) [V: S7].
- Human reference: young adults, errors not correctable: insertion 0.25%, omission 0.17%, substitution 3.47%, transposition 0.07% per char. "The error rates' prevalence order matches that of the humans: substitution errors, insertion errors, omission errors, transposition errors" [V: S7]. Elderly users: omission dominates [V: S7].
- Simulated careful typist ended with 0.07% omission and 0.11% substitution errors in the submitted text [V: S7].

### 3.8 Komninos et al. 2018 (in the wild)
12 young adults, 28 days, a keyboard logging session metadata only. 1,629 messaging sessions; 54,575 keystrokes; mean 33.87 keystrokes (SD 45.96) per session; 17.51 WPM; 26.6% of sessions are 10 keystrokes or fewer ("OK", "done"). Word-level errors (spell-checker flagged, undetected by the typist): mean 1.98 per session, 1.19 "serious" (no confident candidate) and 0.79 "slight". Backspaces were 20.3% of keystrokes [V: S27]. **Caution:** the checker flags slang, names and abbreviations as "serious", so this overstates true typos. Not usable as a typo rate.

## 4. Where errors land: position, word length, letters

| Finding | Source and status |
|---|---|
| First-letter errors are rare in typed text: Pollock & Zamora 3.3% of misspellings involved the first letter; Mitton 7%; Kukich 15% | [S: S26, quoting all three]. Ingels gives Kukich's TND figure as 18% and remarks "It is generally believed that errors tend not to occur in the first character position, and the figure may be unrepresentatively high" [V: S10]. **The Kukich figure conflicts between secondary sources (15% vs 18%).** |
| Word-edge errors are corrected more often than word-internal ones (bathtub effect). In raw keystroke logs deletion at the word start is the commonest deletion; in the persisted common-misspellings list "all error types are more prone to occur word-medially" | [V: S8] |
| Visually similar substitutions persist: "yoqa→yoga" | [V: S8] |
| Look-ahead substitutions are common: "puclic→public" | [V: S8] |
| Short words: Pollock & Zamora say 3 to 4 letter words are 9.2% of misspellings though they "generate 42% of miss corrections" (wrong corrections by a correction algorithm); Kukich reported over 63% of error types in 2 to 4 letter words (over 2,000 error types) | [S: S26]. These are shares of the error list, not per-word rates, so they do not show short words are error-prone. |
| Short words are more likely to land on a real word when mistyped | [V: S10, Peterson via Ingels] |
| "The more frequently a letter occurs in the text, the more likely it is to be involved in a spelling error." About 90% of misspellings "are unlikely to be repeated in normal spans of text" | [V: S16 abstract] |
| Per-bigram or per-letter error rates for English typing | **Not found.** Dhakal reports inter-key interval by bigram class, not errors [V: S2]. The Twitter-corpus letter charts are figures without numbers in the text I read [V: S22]. |
| Longer words are more error-prone, and middle positions more than ends | A search excerpt gave this but its basis was phoneme recall in speech, not typing [U]. Do not use. |

## 5. Spelling vs typing

- Standard split: errors are "both typographical (caused by the keyboard layout and hand/finger movement) and cognitive (caused by phonetic or orthographic similarity)" [V: S8, citing Kukich 1992]. Norman's slip vs mistake distinction is the same idea; ExpECT says its method "does not yet differentiate between errors which are slips and those that are mistakes", and suggests a separate spelling test to tell them apart [V: S1].
- Cognitive misspellings in English are stable, listable forms (section 1, row 22). Wikipedia's list notes some listed errors "may be due to mistyping rather than ignorance, for example 'solider' for 'soldier', although these forms of errors rarely happen in handwritten text" [V: S21].
- Mitton's handwritten essays are spelling-dominated (homophones about 60%) and so are not a model for typed slips [S: S10].
- Lyddy et al. coded real texts and found "Misspellings" (typo-like and spelling errors together) at only 126 items against many phonetic and casual forms, for example "dont't (don't), juut (just), remeber (remember), thought (taught)" [V: S15].
- For a typo emulator, treat cognitive misspellings as a separate switch. They signal a weak speller, not a hurried one. The seed typos "posseble" and "misteke" are vowel-for-vowel sound slips that sit between the two classes (like "visable").

## 6. Seed typos from the research request, mapped to the taxonomy (my classification)

| Seed | Classes | Backing |
|---|---|---|
| avriations (variations) | Adjacent transposition (same-hand pair) | Transposition rows; 76% cross-hand figure means this case is the minority kind [S3] |
| o fmistakes (of mistakes) | Space shifted one character | Gentner's space transposition [S1]; Portuguese 0.17% [S5] |
| othe rvariationns | Space shift plus doubled letter | Rows 7 and 13 |
| diffrent | Omission of a vowel | Row 4; V-position omissions persist [S8] |
| posseble | Vowel for vowel by sound | Row 3 [S8] |
| dificult | One of a double dropped | Row 5; "litte" [S1], "tomorow" [S8] |
| misteke | Vowel for vowel | Row 3 |
| the would (they would) | Dropped letter that forms a real word (atomic typo) | Row 21; about 15% of natural slips [S10] |

## 7. Uncorrected error rate in casual text, and the sanity check

| Source and setting | Rate | Per-sentence or per-word reading |
|---|---|---|
| Lyddy et al. 2014: 936 real text messages by students, 13,391 words, hand-copied to paper | Misspellings 126 items [V: S15] | 0.94% of words, about 1 per 106 words, 0.135 per message; messages average 14.3 words (SD 12.0) [derived]. If "other clippings" (tel, hav, wil, which drop the last letter) are also counted as slips, 282 items, 2.1% of words, 1 per 47 words [derived; my reading of their category]. |
| Gimenes et al. 2015: Brazilian Portuguese, typed on the web, no spell-checker | 1.81% of words (students) and 4.77% (blog comments) [V: S5] | Excluding diacritic errors (47.15% and 50.08% of errors) gives about 0.96% and 2.4% [derived]. Not English; note conversational blog text had 2.6 times the rate. |
| Ingels' secretaries: copy-typing technical text "as fast as you can" | 150 lexical errors in 8,938 words (1.7%); 117 of 600 sentences (19.5%) had one [V: S10] | 0.25 errors per sentence, about 1 per 4 sentences; 14.9 words per sentence [derived]. |
| Dhakal 2018, desktop online test | 1.167% of characters uncorrected [V: S2] | About 0.7 to 0.8 errors per 60 to 70 character sentence [derived; assumes the sentences are near the 70-character cap]. |
| Palin 2019, mobile online test | 2.34% of characters uncorrected [V: S4] | About 1.4 to 1.6 per 60 to 70 character sentence [derived]. |
| Pollock & Zamora: edited scholarly text | 0.2% of words [V: S16] | Not comparable (professionally typed and checked). |

Target: one typo per 2 to 3 sentences. With 12 to 15 words per sentence that is 1 per 24 to 45 words, or 2.2 to 4.2% of words [derived].

- That is 2.3 to 4.5 times Lyddy's strict misspelling rate, and about 1.3 to 2.5 times the secretaries' rate. It is below the uncorrected rates of online transcription tests, which are measured under "type as fast as possible" instructions.
- Conclusion: it is a believable rate for one hurried, careless writer, and it is the high end for ordinary casual messages. If the skill wants average realism rather than a hurried persona, 1 per 4 to 8 sentences would match Ingels' and Lyddy's data. Keeping zero typos in many drafts (as the plan allows) pulls the average toward the data.
- Caveats: Lyddy's messages were hand-copied by participants (possible silent cleaning of slips) and the category set splits typo-like items across several classes. Secretaries' text was unfamiliar technical prose, which raises errors.

## 8. What I could not verify or read

- **Damerau 1964 full text:** not opened. The 80% figure is only second-hand; the abstract (Crossref) does not state it.
- **Grudin 1983 chapter:** paywalled preview only. The 17%/62%/7% adjacent-substitution figures came from a search excerpt of the Annual Review of Linguistics article "What Can Typing Tell Us About Language Production" (page itself returned an empty fetch). Participant counts conflict between two secondary sources (section 3.3).
- **Kukich 1992 (ACM Computing Surveys):** the PDF returned HTTP 403 and a mirror returned nothing. All Kukich numbers are second-hand (Ingels thesis, Shah et al. 2012). The 15% vs 18% first-letter conflict is unresolved.
- **ExpECT final per-class count table:** the extracted text is column-scrambled; I did not quote per-class counts. I could not install a PDF tool to re-extract it.
- **White's N in ExpECT Table 1** prints as "20623".
- **Dahm & Rieger 2019** (MDPI Vision): HTTP 403; the homologous/neighbour count table is a search excerpt only [U].
- **Rumelhart & Norman 1982 original:** the 1-in-1800 and 76% numbers are read from Wobbrock's chapter, not the paper.
- **Space-bar error shares (37%, 60%)** and **autocorrect "61% altered variable names"**, **typetera shift-release claim:** search excerpts only; not used.
- **Mitton 1987, Yannakoudakis & Fawthrop 1983, Medeiros 1995:** second-hand only.
- **No source found** for: a per-bigram typo rate in English, a per-word typo rate in English Slack-style chat, a rate for space-shift errors in English, or a modern rate for Shift-timing errors.

## 9. Sources

IDs used above. Retrieval dates: all opened 2026-10-01 (the research session).

- **S1** Kano, A., Read, J. C., Dix, A., MacKenzie, I. S. (2007). "ExpECT: An Expanded Error Categorisation Method for Text Input." BHCI 2007. https://www.yorku.ca/mack/bhci2007.pdf [V]
- **S2** Dhakal, V., Feit, A. M., Kristensson, P. O., Oulasvirta, A. (2018). "Observations on Typing from 136 Million Keystrokes." CHI 2018. https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf [V]
- **S3** Wobbrock, J. O. (2007). "Measures of Text Entry Performance" (chapter 3; chapter title and author per the hosting site, not visible in the passages I read), in MacKenzie & Tanaka-Ishii (eds.), *Text Entry Systems: Mobility, Accessibility, Universality*. https://faculty.washington.edu/wobbrock/pubs/text-07.pdf [V for the passages quoted; it quotes Rumelhart & Norman 1982]
- **S4** Palin, K., Feit, A. M., Kim, S., Kristensson, P. O., Oulasvirta, A. (2019). "How do People Type on Mobile Devices? Observations from a Study with 37,000 Volunteers." MobileHCI 2019. https://userinterfaces.aalto.fi/typing37k/resources/Mobile_typing_study.pdf [V]
- **S5** Gimenes, P. A., et al. (2015). "Spelling Error Patterns in Brazilian Portuguese." Computational Linguistics 41(1). https://aclanthology.org/J15-1011.pdf [V; only the first author's name was visible in my extraction]
- **S6** Toutanova, K., Moore, R. C. (2002). "Pronunciation Modeling for Improved Spelling Correction." ACL 2002. https://aclanthology.org/P02-1019.pdf [V for the Damerau 80% quote as stated there]
- **S7** Shi, D., Zhu, Y., Fernandes Junior, F. E., Zhai, S., et al. (2025). "Simulating Errors in Touchscreen Typing" (Typoist). CHI 2025; arXiv 2502.03560. https://arxiv.org/pdf/2502.03560 [V]
- **S8** Baba, Y., Suzuki, H. (2012). "How Are Spelling Errors Generated and Corrected? A Study of Corrected and Uncorrected Spelling Errors Using Keystroke Logs." ACL 2012, pp. 373-377. https://aclanthology.org/P12-2073.pdf [V]
- **S10** Ingels, P. (1996). *A Robust Text Processing Technique Applied to Lexical Error Recovery* (Linköping thesis). arXiv cmp-lg/9702003. https://arxiv.org/pdf/cmp-lg/9702003 [V. Used for the Damerau 80% wording, Kukich's TND profile, Peterson's real-word calculation, Pollock & Zamora's type split and the "secretary" copy-typing corpus in ch. 6, as relayed there]
- **S11** Dahm, S. F., Rieger, M. (2019). "Errors in Imagined and Executed Typing." Vision 3(4), 66. https://doi.org/10.3390/vision3040066 [abstract V; the Appendix A count table is U: page returned HTTP 403, figures came from a search excerpt]
- **S13** Matias, E., MacKenzie, I. S., Buxton, W. (1993). "Half-QWERTY: A One-handed Keyboard Facilitating Skill Transfer From QWERTY." INTERCHI '93, pp. 88-94. https://www.yorku.ca/mack/CHI93c.html [V; quotes Grudin and Munhall & Ostry on homologous errors]
- **S14** Rayson, S. J., Hachamovitch, D. J., Kwatinetz, A. L., Hirsch, S. M. (1998). US Patent 5,761,689 "Autocorrecting text typed into a word processing document" (Microsoft). https://patents.google.com/patent/US5761689A/en [V]
- **S15** Lyddy, F., et al. (2014). "An Analysis of Language in University Students' Text Messages." Journal of Computer-Mediated Communication 19(3), 546-561. https://pdcrodas.webs.ull.es/variedades/LyddyEtAlAnAnalysisOfLanguageInUniversityStudentsTextMessages.pdf [V; the journal header read "(2014) 546-561"] (publisher: https://onlinelibrary.wiley.com/doi/full/10.1111/jcc4.12045)
- **S16** Pollock, J. J., Zamora, A. (1983). "Collection and characterization of spelling errors in scientific and scholarly text." JASIS 34(1), 51-58. Abstract via Crossref: https://api.crossref.org/works/10.1002/asi.4630340108 [V for abstract only]
- **S17** Jacobs, C. (2019). "Seeing not just any evil: Eye Movements, Typos, and and Autocorrects." Psychonomic Society Featured Content. https://featuredcontent.psychonomic.org/seeing-not-just-any-evil-eye-movements-typos-and-and-autocorrects/ [V; informal blog]
- **S18** Medeiros (1995), the European Portuguese study reported in S5 as finding that 80.1% of spelling errors fit Damerau's categories [S, via S5].
- **S19** Damerau, F. J. (1964). "A technique for computer detection and correction of spelling errors." CACM 7(3), 171-176. Abstract via Crossref: https://api.crossref.org/works/10.1145/363958.363994 [V for abstract only]
- **S20** Wikipedia, "Typographical error" (atomic typos). https://en.wikipedia.org/wiki/Typographical_error (raw: https://en.wikipedia.org/w/index.php?title=Typographical_error&action=raw) [V]
- **S21** Wikipedia, "Commonly misspelled English words" (raw: https://en.wikipedia.org/w/index.php?title=Commonly_misspelled_English_words&action=raw) [V]
- **S22** Shah, K., de Melo, G. (2020). "Correcting the Autocorrect: Context-Aware Typographical Error Correction via Training Data Augmentation." arXiv 2005.01158. https://arxiv.org/pdf/2005.01158 [V. The paper takes its error statistics from the Twitter Typo Corpus (Aramaki 2010); quoted for "seperate"]
- **S23** Wikipedia, "Cupertino effect". https://en.wikipedia.org/wiki/Cupertino_effect [V]
- **S25** Lehal, G. S., Bhagat, M. (2004). "Error pattern in Punjabi Typed Text." ICON 2004. https://learnpunjabi.org/pdf/icon2004.pdf [V as relayed. Used only for the Mitton and Pollock & Zamora multi-error shares]
- **S26** Shah, K., Patel, M., Sheth, J., Lad, K. (2012). "Comparative Study of Spell Checking Algorithms and Tools." IJARCS 3(3). https://www.ijarcs.info/index.php/Ijarcs/article/download/1201/1189 [V. Secondary on Kukich, Grudin, Mitton, Pollock & Zamora: first-position and word-length figures, Grudin participants and rates]
- **S27** Komninos, A., Dunlop, M., Katsaris, K., Garofalakis, J. (2018). "A glimpse of mobile text entry errors and corrective behaviour in the wild." https://strathprints.strath.ac.uk/66313/1/Komninos_etal_HCI_2018_A_glimpse_of_mobile_text_entry_errors_and_corrective.pdf [V; venue not stated in the text I read]
- **S29** "What Can Typing Tell Us About Language Production?" Annual Review of Linguistics (2025). https://www.annualreviews.org/content/journals/10.1146/annurev-linguistics-041824-034740 [U. The page fetch returned nothing; the 17%/62%/7% Grudin figures and the "fig → feg" example are search-engine excerpts from it]
- Gentner, D. R., Grudin, J. T., Larochelle, S., Norman, D. A., Rumelhart, D. E. (1983). "A glossary of terms including a classification of typing errors." In Cooper (ed.), *Cognitive Aspects of Skilled Typewriting*, pp. 39-43. https://link.springer.com/chapter/10.1007/978-1-4612-5470-6_2 [not opened; definitions read as quoted in S1, S3, S7]
- Grudin, J. T. (1983). "Error patterns in novice and skilled transcription typing." In Cooper (ed.), pp. 121-143. https://link.springer.com/chapter/10.1007/978-1-4612-5470-6_6 [paywalled]
- Kukich, K. (1992). "Techniques for automatically correcting words in text." ACM Computing Surveys 24(4), 377-439. https://dl.acm.org/doi/10.1145/146370.146380 [403; abstract via Crossref https://api.crossref.org/works/10.1145/146370.146380]
- Rumelhart, D. E., Norman, D. A. (1982). "Simulating a skilled typist." Cognitive Science 6(1), 1-36. https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog0601_1 [not opened]
