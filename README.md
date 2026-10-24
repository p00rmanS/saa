# SAA Mentor

A self-paced study course for the **AWS Certified Solutions Architect – Associate (SAA-C03)** exam.
Lessons are written in English and Taglish, with checkpoint quizzes, flashcards, hands-on labs,
architecture walkthroughs and timed mock exams that follow the real exam's domain weights.

**Live site:** https://p00rmans.github.io/saa/

## What is inside

- **200+ lessons** across 16 sections, covering every in-scope service in the official exam guide (v1.1)
- **700+ practice questions** (single and multiple response, five options for multi-select like the real exam)
- **650+ flashcards**, 70 glossary terms, labs, service comparisons and architecture what-if scenarios
- **Mock exams** (10, 20, 30 and 65 questions) sampled by domain weight, with review and per-domain scores
- **Exam guide tracker** on the Exam Domains page: all 14 task statements mapped to lessons
- Progress, streaks and settings are stored in the browser only (no account, nothing sent to a server)

## Run it locally

Requires Node 22.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Checks

```bash
npx next typegen        # generates the route types the type-check needs on a fresh checkout
npx tsc --noEmit
npx eslint src scripts
npx tsx scripts/audit-content.ts
```

The content audit validates every lesson, question and flashcard (required fields, references,
categories, answer formats) and checks that every exam guide task statement and in-scope service
points at a lesson that exists. It must report 0 errors.

## Deployment

The site is a static export hosted on GitHub Pages. `.github/workflows/pages.yml` runs the checks and builds
on every pull request, and deploys on every push to `main`. The workflow sets `NEXT_PUBLIC_BASE_PATH` to the
repository name so assets resolve under `/saa/`. Local development and local builds use `/`.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/data/content/*.ts` | Lessons, questions and flashcards, grouped by topic |
| `src/data/exam-guide.ts` | Official exam guide task statements and in-scope services mapped to lessons |
| `src/data/multi-response.ts` | The extra option that gives multi-select questions five choices |
| `src/lib/` | Progress store, readiness scoring, mock exam generation, study plans |
| `scripts/audit-content.ts` | Content and coverage audit |

## Adding a lesson

1. Add the lesson to a file in `src/data/content/` (copy an existing one for the required fields) with three
   `questionIds`, and add the matching questions and flashcards.
2. Register the file in `src/data/index.ts` if it is new.
3. Map the lesson to the task statements it supports in `src/data/exam-guide.ts`.
4. Run the checks above.
