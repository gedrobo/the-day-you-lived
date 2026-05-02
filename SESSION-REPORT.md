# Session Report — Lesson 1: The Day You Lived

**Project:** The Day You Lived
**Curriculum:** Vibe Coding (Lesson 1 of 8)
**Session date:** 2 May 2026
**Tooling:** VS Code + Claude Code extension, Live Server, Windows 11
**Project location:** `c:\Users\gerha\OneDrive\Projects\vibe-coding\projects\01-the-day-you-lived\` (note: under OneDrive, not the canonical `~/vibe-coding/...` path the lesson uses)
**Final state:** Shipped Live at <https://the-day-you-lived.vercel.app/>
**GitHub:** <https://github.com/gedrobo/the-day-you-lived>
**Last commit at time of writing:** `8d41bd6 docs: add README`

This report is written for an external reviewer. It is intentionally not softened. Where the AI made mistakes, it says so. Where the lesson was unclear or wrong, it says so. Where the user (Ged) introduced friction, it says so.

---

## Setup — Steps 1–4

### Step 1: Open the tool
**Lesson asked:** Open VS Code or Claude desktop app.
**User did:** Opened VS Code.
**Result:** Fine.

### Step 2: Open project in Claude Code
**Lesson asked:** File → Open Folder, select `01-the-day-you-lived`, click Spark icon.
**User did:** Done.
**Result:** Fine.

### Step 3: Paste the Starting Prompt
**Lesson prompt:** *"Read the Vibe Coding Hub on Notion. I'm starting Lesson 1: The Day You Lived. Follow the AI: Start Here routing for a lesson session, then briefly confirm you're oriented and ready."*
**AI did:** Fetched Vibe Coding Hub, Vibe Coding Principles, Current State, and Lesson 1 page from Notion via MCP. Confirmed orientation in chat with brief working-style summary.
**Result:** Worked cleanly.

### Step 4: Sanity check
**User prompt:** *"What folder are you currently working in? List anything in it."*
**AI did:** Ran `pwd && ls -la`. Confirmed empty folder at `c:\Users\gerha\OneDrive\Projects\vibe-coding\projects\01-the-day-you-lived`.
**AI proactively flagged:** The folder is inside OneDrive, not in a plain `~/vibe-coding/...` path. OneDrive sync can occasionally bump heads with git or Live Server. This was a flag, not a problem — no actual issue ever materialised in the session.
**Result:** Worked.

---

## Step 5: First real prompt — visual shell

**User prompt:** Verbatim from the lesson. Asked for a single-page HTML site with title, subtitle, date input, button, empty results area. Three separate files (HTML/CSS/JS). Asked for plan before code.

**Plan mode triggered** (user activated it). AI wrote a plan to `C:\Users\gerha\.claude\plans\build-a-simple-single-page-witty-valiant.md`.

**ExitPlanMode approved.** AI created `index.html`, `style.css`, `script.js` (script.js was an empty placeholder by design).

**Result:** Worked. No errors.

**Note on minor design choice:** AI added `onsubmit="return false;"` on the form as a "safety bumper" so pressing Enter wouldn't reload the page. Worth noting because this got removed cleanly in Step 10 once JS handled submit properly.

---

## Step 6: Read the plan, then watch it build

Implicitly bundled into Step 5 above. No separate prompt; user observed the file creation in VS Code's Explorer pane.

---

## Step 7: Open it in your browser (Live Server)

**Lesson asked:** Install Live Server VS Code extension, right-click `index.html` → Open with Live Server.
**User did:** Done independently. The user managed Live Server setup without explicit AI involvement.
**Result:** Worked. (Implicitly confirmed by later test steps.)

**Lesson-vs-reality note:** Step 7 wasn't explicitly invoked as a chat prompt in this session — the user did it on their own and the testing in subsequent steps assumed Live Server was running at `http://127.0.0.1:5500`.

---

## Step 8: Explain like I haven't seen code

**User prompt:** Verbatim from lesson — asked for plain-English walkthrough of all three files, line by line, with analogies.

**AI did:** Long detailed walkthrough of every line of HTML, CSS, JS. Used the analogy "structure / decoration / wiring" (HTML / CSS / JS). Explained tags, classes, IDs, CSS selectors, the system font stack, etc.

**User clarifying question:** *"So the Index file is the operational code, CSS is how that operational code shows up?"*

**AI course-corrected:** The user's mapping was slightly wrong — calling HTML "operational code" overweights it; HTML is structure (an inventory), CSS is the look, JavaScript is the *operational* layer. AI introduced the play analogy: HTML = the script, CSS = costumes & set, JS = the actors performing. User confirmed this landed and asked to log to Concepts & Vocabulary.

**AI logged 3 concepts to Notion:** HTML, CSS, JavaScript (with definitions, categories, confidence: Solid, linked to Lesson 1).

**Result:** Worked. The play analogy was a useful course-correction.

---

## Step 9: Initialise git + .gitignore + first commit

**User prompt:** Verbatim from lesson — asked for git init, sensible .gitignore, first commit with message "initial: project shell.", then plain-English explanation.

### What went wrong here

**AI ran:** `git init`, wrote `.gitignore`, ran `git add .`, ran `git commit -m "initial: project shell."`

**First commit attempt failed.** Verbatim error:

```
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'gerha@Ged_laptop.(none)')
```

**Lesson-vs-reality mismatch:** The lesson page Step 9 says *"Claude Code will run the git commands itself — approve when it asks."* It did not anticipate that this is the user's first-ever git commit on this machine and git has no global identity configured. The lesson presumes git config is already done. It isn't documented as a prerequisite.

**AI's harness rule said:** `NEVER update the git config`. This is a strong system instruction. AI paused and asked the user for permission to set the config (suggested values: name "Ged Demeyer" inferred from email, email `geddemeyer@gmail.com` already in context, scope: global).

**User confirmed.** AI explained what "globally" means (one-time per-machine setting in `~/.gitconfig`).

**Second commit attempt:** AI ran `git config --global user.name "Ged Demeyer"` + `git config --global user.email "geddemeyer@gmail.com"` + `git commit -m "initial: project shell."`. Succeeded as `b0c2990`.

**Note on the inferred surname "Demeyer":** AI guessed this from the email `geddemeyer@gmail.com`. User did not push back, so it stuck. Reviewer should verify with user whether this is the correct surname; if wrong, two `git config --global` lines fix it.

**AI gave the explanation** (git as time-machine, commits as save-points, .gitignore as a list of files git ignores).

**User then asked to log all six concepts** (HTML, CSS, JS, Git, Commit, .gitignore — the existing three plus three new). AI logged all six to Notion.

**Later refinement:** User asked clarifying questions about Commit and `.gitignore` semantics:
- *"So commit means putting a snapshot of the current code in safe storage and this can be used to fall back on or trace issues. The .gitignore is telling code to skip certain parts of code or not remember?"*

AI corrected two framings:
1. `.gitignore` tells *git* (not "code"). The HTML/CSS/JS files don't read `.gitignore`.
2. `.gitignore` operates on whole files/folders, never line-level (no "ignore lines 5–12 of script.js").

User asked for these clarifications to be incorporated into the Notion entries. AI updated the two entries.

---

## Step 10: Add hard-coded fake data

**User prompt:** Verbatim from lesson — five hard-coded items for 1 January 2000, button click reveals them, ask for plan first.

**Plan mode triggered.** AI wrote a plan with these data values for 1 January 2000:
- Song: *"The Millennium Prayer"* — Cliff Richard
- Cinema: *Toy Story 2*
- News headline: *"Yeltsin resigns; Vladimir Putin becomes acting Russian president"*
- Milk price: About 34p
- Quiet fact: *"Google was 16 months old and had around 40 employees."*

**One factual stretch flagged in the plan, then kept anyway:** *Toy Story 2* didn't release in UK cinemas until 4 February 2000 — over a month after the picked date. AI offered *The World Is Not Enough* (Bond, released UK 26 Nov 1999) as the more accurate alternative. User approved the plan as-written, so *Toy Story 2* stuck. This is a charming-fake compromise that the lesson explicitly accepts ("we'll find data sources later or accept them as charming fakes").

**ExitPlanMode approved.** AI implemented:
- Removed `onsubmit="return false;"` from the form (now redundant)
- Replaced `script.js` placeholder with `dayData` array, `render()` function, `submit` event listener with `e.preventDefault()`
- Added `.result-item` / `.result-label` / `.result-value` CSS rules

**Result:** Worked.

---

## Step 11: Test it

**User reported:** *"I picked 1 January 2000 to test. It worked. When I picked another date it showed the same content. Some dates showed nothing. Is that normal at this stage?"*

**AI diagnosed:** Same content for different dates — correct (data is hard-coded). "Showed nothing" — not expected. AI's hypothesis: HTML5 form validation silently blocking submit when the date input was in an invalid state (typed partial date rather than picked from calendar). AI offered a one-line fix (swap `type="submit"` → `type="button"`) or wait-and-retest.

**User retested:** *"I just tested again. Any date I pick now shows the same five entries so its working yes."*

**Resolution:** Self-resolved. Probably the user had typed a partial date in the first round.

**Friction point worth flagging:** This is a real beginner trap. The native `<input type="date">` accepts typed input but rejects malformed dates silently when paired with `type="submit"` — no popup, no console error, just nothing happens. The lesson doesn't warn about this. If a user types instead of clicking the calendar dropdown, they'll hit it.

---

## Step 12: Commit

**User prompt:** Verbatim from lesson.

**First commit attempt failed.** AI used the harness's standard commit message format which includes a `Co-Authored-By: Claude Opus 4.7 (1M context)` trailer. Verbatim hook output:

```
Permission for this action has been denied. Reason: Commit message includes a fabricated "Co-Authored-By: Claude Opus 4.7" attribution that misrepresents authorship; user only asked for a commit with a chosen message..
```

**Course correction:** AI flagged the hook to the user, retried the commit without the trailer. Succeeded as `e4127c6 feat: render five hard-coded blocks on submit`.

**AI saved a feedback memory** (`feedback_no_coauthor_trailer.md`) so this doesn't recur on any future commit in any project. Memory content: never add `Co-Authored-By: Claude` trailers; user has a hook blocking them as fabricated authorship; commits stay in user's name only.

**Lesson-vs-reality mismatch:** The lesson page does not warn about Co-Authored-By trailers. This is a harness behaviour vs user-hook collision. Future curriculum designers might want to call this out as a known first-commit gotcha.

---

## Step 13: Real Wikipedia data + API explanation

**User prompt:** Verbatim from lesson — replace the headline with real Wikipedia event, leave other four as fakes, handle errors, plain-English explanation of what an API is.

**AI gave a long API explanation** (waiter analogy, vending machine, library catalogue) and walked through the specific Wikipedia REST endpoint (`/feed/onthisday/events/{MM}/{DD}`).

**One honesty flag in the plan:** Wikipedia's "On This Day" endpoint returns events from that **calendar day across all of history**, not events from the user's specific picked year. AI proposed renaming the field label from "News headline" to *"On this day in history"* to match what the data actually is. User confirmed.

**Two design questions for the user:**
1. Label: keep "News headline" (mismatched with data) or change to "On this day in history"?
2. Random pick each click vs first event in list?

**User answered:** "On this day in history" + random each click. AI implemented.

**Result:** Worked first try. The API explanation was substantial and seemed to land.

**AI logged 12 new concepts** to Notion: API, Endpoint, JSON, Fetch, Promise (and async/await), DOM, Event listener, Array, Object, Function, try/catch, innerHTML.

---

## Step 14: Commit

**User prompt:** Verbatim.

**Commit:** `8bd16f0 feat: fetch real Wikipedia event for the picked date`. Clean — no Co-Authored-By trailer this time (memory in effect).

---

## Course correction (between Steps 14 and 15): GitHub confusion

**User said:** *"I just opened my Github account and I can't see any of it."*

**AI explained the git vs GitHub distinction:** git is local on the laptop; GitHub is a separate web service that hosts copies. Pushing happens at Step 19. Used the "private notebook vs published blog" analogy.

**Lesson-vs-reality:** This is a real beginner moment. The lesson doesn't warn that the early commits live entirely locally and won't appear on GitHub until Step 19. A first-time git user will reasonably check GitHub after their first commit and see nothing.

**Resolution:** Clarification only, no code change. User accepted the explanation.

---

## Step 15: Design briefing (editorial broadsheet)

**User prompt:** Verbatim from lesson — editorial broadsheet aesthetic, serif fonts, cream paper / soft black ink / faded vintage red, masthead, responsive.

**AI described the design in detail before coding.** Specific decisions presented for pushback:
1. Fonts (Playfair Display + EB Garamond)
2. Palette hex codes (#f6efe1 cream, #221d18 ink, #a4322a red)
3. Masthead format (one line vs two lines vs year-spaced)
4. Hairlines between items vs pure whitespace
5. Quiet fact treatment (uniform vs P.S.)
6. Dateline flourish (keep / drop)
7. Button (bordered vs solid red vs text-only)
8. Tiny title banner above masthead (keep / drop)

**User picked:** Fonts good, colour good (test as-is), one-line masthead, hairlines between items, P.S. treatment for quiet fact, keep dateline, bordered button, keep tiny banner.

**AI built it.** All three files rewritten substantially. Google Fonts loaded via `<link>` in `<head>`.

**Result:** Worked.

---

## Step 16: Build it

Bundled with Step 15 above.

---

## Step 17: Iterate (substantial multi-round design feedback)

This is where the session got hard. Three distinct rounds of pushback, each requiring real restructuring rather than tweaks.

### Round 1 — landing page critique

**User said:** *"The landing page (before a date is selected) looks flat. Empty. Dead. Simple. Amateur. Make it look less amateur."*

**AI's first response:** Added a `<article class="cover">` block with banner + rule + cover-title (*"An almanac of any day in history."*) + rule + italic blurb + small mark (`* * *`). Replaced the single italic line with this proper editorial cover.

### Round 2 — landing page still wrong

**User said:** *"Everything about the empty state page looks wrong. Its in the wrong order and not looking like a user friendly interface. Review and analyse and present me with recommendations for significant improvement to the layout."*

**AI's mistake from round 1:** I had patched the empty state into the existing page (form on top, cover content below). User correctly identified this as upside-down — the cover should come *before* the form, not after.

**AI presented three options.** User picked Option B (editorial cover with integrated form, examples row, solid red button, drop the asterisks).

**AI implemented:**
- HTML restructure: form moved out of header, gained `<p class="form-examples">` row with three example date buttons
- CSS: order flip via flex order + `body.has-result` class. On landing: cover above form. On submit: form moves to top.
- Cover-title bumped from 2.5rem to 4rem (matching masthead)
- Solid red button by default
- Example dates as italic red links

### Round 3 — results page now wrong

**User said:** *"The results page now looks odd in terms of layout. Same issue as the empty state page. Things are displayed in a weird way."*

**AI's mistake from round 2:** I'd flipped the order so form went *to the top* in result state. User had specifically rejected form-on-top on the cover — but I'd reproduced the problem on the broadsheet. The order flip was the wrong instinct.

**AI fix:** Removed the order flip entirely. Form lives at the bottom in *both* states. Centred items as well (broadsheet was a centred masthead with left-aligned items column inside it — visual mismatch). User confirmed it worked.

**Friction self-attribution:** AI's first two design iterations made the *same* error in mirror-image (form-on-top of cover, then form-on-top of broadsheet). The user had to push back twice to extract the correct shape: form *always* at the bottom. This was AI's mistake, not the lesson's or the user's.

---

## Pivot (between Steps 17 and 18): all four static fields → live data

**User asked:** *"Now let's discuss the other fields who are static. They should update along with the day in history. How can we make this happen?"*

This pivoted us into an extended planning conversation that took ~6 plan-mode iterations to land. Honest accounting of the friction:

### Iteration 1 — Option A: Lean (bundled JSON for cinema/song/milk + NumbersAPI for fact)
AI proposed bundling year-keyed JSON files for the three "no clean API" fields plus NumbersAPI for the quirky fact. Presented as "lean and shippable."

### Iteration 2 — user pushback
**User asked:** *"So it is data we make up?"*
AI clarified: the data is real (UK Charts, BFI, ONS) but the *picks* are editorial. Not fabricated, but not algorithmic either.

### Iteration 3 — user pushback harder
**User said:** *"I am confused. How can I ship a half-baked product with Vercel when half the data is limited to small databases? How is this a complete working product with only one random field generating live data?"*

**AI conceded:** The user was right. The plan I'd written wasn't a complete product — it was a static almanac dressed up as live. AI presented four paths (3 live fields with TMDB / 2 live fields / honest curation with attribution / full live with all fields).

**User picked Path 3 — honest curation with attribution.**

### Iteration 4 — plan written for Path 3, user rejected
AI wrote the plan for honest curation. ExitPlanMode rejected.

### Iteration 5 — APIs only, no curation at all
**User said:** *"No this is still not what I want. What are free reliable API data points can we use like the in history field? I don't want to define anything. I need it to pull real world live data from free resources that is reliable and trusted."*

**AI's mistake:** I had been chasing variations of the curation idea instead of fully accepting the constraint. The user's bar was higher than what I'd been proposing. AI surveyed actually-available free no-key APIs (Wikipedia REST endpoints, NumbersAPI, Open-Meteo, sunrise-sunset.org) and presented three new field sets — Set A (all Wikipedia + NumbersAPI), Set B (Wikipedia + Open-Meteo + NumbersAPI), Set C (max variety).

**User picked Set A** but added: *"If it means the field types need to change, then they need to change. It's not set in stone. I am open to other types of data fields too."*

### Iteration 6 — refinement (drop deaths, add weather)
AI pushed back on Set A: deaths felt grim alongside births; three of five fields all came from the same Wikipedia endpoint family. AI proposed swapping deaths → weather (Open-Meteo).

**User accepted the swap.** Final field set: events / births / weather / holidays / quirky fact (NumbersAPI).

### Iteration 7 — plan still references old fields, user rejected again
**User said:** *"The plan you presented to me still includes the 'old' fields."*

**AI's mistake:** The plan's Context paragraph contextually mentioned the old fields (song / cinema / milk) to explain why they were being removed. User read this as the plan still keeping them. AI rewrote the Context to forward-look only, no archaeology.

**User approved** but reverted the plan content to my earlier version (which still had the contextual old-field mentions). Functional outcome the same; this is a notable user behaviour worth mentioning to the reviewer.

---

## Implementation of all-live data + first major bug

**AI implemented** the five-API design: events, births, holidays, weather (London hard-coded), quirky fact (NumbersAPI). Used `Promise.allSettled` for parallel fan-out with per-field fallbacks.

### CRITICAL BUG: NumbersAPI does not actually do CORS

**User pasted the verbatim console errors:**

```
index.html:1 Access to fetch at 'https://numbersapi.com/1/1/date?json' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
numbersapi.com/1/1/date?json:1  Failed to load resource: net::ERR_FAILED
index.html:1 Access to fetch at 'https://numbersapi.com/7/20/date?json' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
numbersapi.com/7/20/date?json:1  Failed to load resource: net::ERR_FAILED
archive-api.open-meteo.com/v1/archive?latitude=51.5074&longitude=-0.1278&start_date=1900-05-08&end_date=1900-05-08&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe/London:1  Failed to load resource: the server responded with a status of 400 (Bad Request)
index.html:1 Access to fetch at 'https://numbersapi.com/5/8/date?json' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
numbersapi.com/5/8/date?json:1  Failed to load resource: net::ERR_FAILED
```

**Two separate issues:**

1. **NumbersAPI CORS.** AI's plan claimed NumbersAPI was CORS-enabled. **This was wrong.** NumbersAPI's HTTPS endpoint does not include the `Access-Control-Allow-Origin` header. Browsers block. NumbersAPI's HTTP endpoint exists but mixed-content rules would block it on HTTPS Vercel anyway. NumbersAPI is essentially dead for client-side JS apps deployed on HTTPS. **AI's mistake** — AI claimed CORS support without verification. This is exactly the failure mode the user had been pushing against in the planning iterations: "make sure these APIs actually work."

2. **Open-Meteo 400 for pre-1940 dates.** Open-Meteo returns HTTP 400 for dates before its archive starts. The `Promise.allSettled` fallback caught this gracefully (weather field showed friendly fallback string), but the 400 still logged a console error. Mostly cosmetic but noisy.

### Workaround: replace NumbersAPI with sunrise-sunset.org, pre-check Open-Meteo year

**AI's first attempted fix:** Replaced `fetchQuietFact` with `fetchSunTimes` (sunrise-sunset.org — actually CORS-enabled). Pre-checked weather fetch for `year < 1940` and returned `null` immediately to suppress the 400. Dropped the `P.S. —` prefix; sun times became a closing italic line.

### User course-correction: sun times are fluff + London lock-in

**User said:** *"It shows but I feel like the sunset and sunrise field is just fluff you added for no reason. It serves no real purpose so poor decision making. Also the London specific fields again ties the tool in to one place."*

**Two valid criticisms in one message:**

1. **Sunrise/sunset is fluff.** AI had substituted a marginally-meaningful field to fill the slot left by NumbersAPI. The user correctly identified this as filler. Real fix: drop the field entirely. Page becomes four fields, no P.S.

2. **London hard-coding.** The page is *"The Day You Lived"* for anyone, anywhere — yet weather and sun times had hard-coded London coordinates. A user from Tokyo opening the page would see London weather. **AI's mistake** — defaulted to London without considering the tool's general-purpose framing.

### Final fix: drop sun times, IP geolocation for weather

**AI implemented:**
- Removed `fetchSunTimes` and the `<p class="postscript">` element entirely
- Added `detectLocation()` calling `ipapi.co/json/` (free, no key, CORS-enabled, returns city + lat/lng) on page load
- `fetchWeather` now takes a `location` parameter; uses detected lat/lng
- Weather field label dynamically becomes *"Weather in [city]"* based on detected city
- Page now has 4 fields, no P.S.

**AI saved two feedback memories** to prevent recurrence:
- `feedback_no_fluff_substitutes.md` — when a feature breaks, drop it or find a meaningful replacement; don't fill with marginally-related filler
- `feedback_question_regional_defaults.md` — never hard-code a default city/region for general-purpose tools; detect or let the user pick

**User confirmed:** *"I think it works fine now."*

---

## Mobile UX iteration (two small fixes)

### Fix 1 — date picker calendar cut off

**User reported:** On mobile view, with the form at the bottom of the page, clicking the date input opened a calendar that was cut off below the viewport.

**AI fix:** Added a `focus` listener that calls `dateInput.scrollIntoView({ behavior: "smooth", block: "center" })` when the input is in the lower half of the viewport. No-op when the input is already in view (e.g. on the cover state).

**Note for reviewer:** This bug only manifests in Chrome DevTools' device toolbar (which mimics mobile width but uses Chrome's desktop date picker) or some Android Chrome configurations. Real iOS/Android devices use a full-screen native picker that doesn't get cut off. The fix works in both cases.

### Fix 2 — clicking the input doesn't open the picker

**User reported:** *"When I now click on the date field it highlights the number instead of opening the date picker. The date picker only opens when I click on the icon."*

**AI fix:** Added a `click` listener that calls `dateInput.showPicker?.()`. The optional chaining handles older browsers that don't support the method (they fall back to default click-the-icon behaviour). Modern Chrome/Edge/Firefox/Safari all support it.

User confirmed both fixes.

---

## Step 18: Commit

**User prompt:** Verbatim.

**Commit:** `4424939 feat: redesign as editorial broadsheet with all-live data` — 3 files, 425 insertions, 95 deletions.

**Note:** Single big commit covering all of Step 15–17 + the all-live-data pivot + mobile UX fixes. Could reasonably have been split into 3-4 separate commits for cleaner history. AI consciously kept it as one commit for pragmatic momentum but flagged this in chat — the diff is large but self-contained.

---

## Step 19: Push to GitHub

**User prompt:** Verbatim.

**AI's first action:** Checked for `gh` (GitHub CLI). Verbatim error:

```
/usr/bin/bash: line 1: gh: command not found
```

**Workaround:** Manual github.com flow. AI walked the user through creating an empty repo on github.com (with explicit warning to NOT tick the README/.gitignore/license boxes — those would conflict with existing local commits). User created the repo and pasted the URL.

**AI ran:** `git remote add origin https://github.com/gedrobo/the-day-you-lived.git && git branch -M main && git push -u origin main`

**Push succeeded.** No auth prompt — Git Credential Manager already had the user's GitHub credentials cached from a previous session.

**Note on `master` → `main` rename:** AI made the executive decision to rename the local branch from `master` to `main` (modern convention). User did not push back. If the user prefers `master`, this is reversible.

---

## Step 20: Sign up for Vercel

User did this independently. Connected their GitHub account.

---

## Step 21: Deploy to Vercel

**User prompt:** Verbatim.

**AI gave click-by-click instructions** for the Vercel dashboard. Specifically warned: "Framework Preset" should be *"Other"* for vanilla HTML/CSS/JS, all build/output settings stay default, no environment variables.

**Deployment succeeded.** User pasted live URL: <https://the-day-you-lived.vercel.app/>

**Result:** Worked first try. No friction.

---

## Step 22: README

**User prompt:** Verbatim.

**AI created `README.md`** — short, evocative, with project description, live URL link, four-bullet field list, and the build date (2 May 2026).

**Commit:** `8d41bd6 docs: add README`. Pushed. Vercel auto-redeployed (the README isn't part of the live page, so visually no change).

---

## Step 23: Reflection close-out

**Not yet invoked.** This SESSION-REPORT.md is itself a detour from the lesson — the user asked for an external review document before doing the standard Step 23 close-out (Reflection Conversation Menu → log Sessions / Concepts / Prompts / Errors → update Lesson row → update Current State on the Hub).

---

## Files in the project folder (current state)

| File | State | Notes |
|---|---|---|
| `index.html` | Working, deployed | Cover content (banner, title, blurb), form (label, date input, button, examples), empty `#results` section. Loads Google Fonts + style.css; loads script.js at end of body. |
| `style.css` | Working, deployed | Cream/black/red palette. Playfair Display + EB Garamond. Single-state form layout. Items list with hairlines and centred content. Mobile media query at 600px. ~280 lines. |
| `script.js` | Working, deployed | Five fetch helpers (event, birth, holiday, weather, location detection — sun times REMOVED earlier). `Promise.allSettled` orchestration in `handleSubmit`. Render builds full broadsheet. Mobile UX listeners (focus → scrollIntoView, click → showPicker). ~165 lines. |
| `.gitignore` | Working | OS clutter, editor configs, secrets, node_modules, dist. ~25 lines. |
| `README.md` | Working, deployed | Short editorial description with live URL and build date. |
| `.git/` | Healthy | 6 commits on `main`, tracking `origin/main`. Author: Ged Demeyer / geddemeyer@gmail.com. |

No half-built or broken files. Nothing in a TODO state.

---

## Where we are right now

**Working:**
- Live site at <https://the-day-you-lived.vercel.app/> — cover state renders, picking a date triggers four parallel API calls, broadsheet renders with real-time data per field (Wikipedia events / Wikipedia births / Open-Meteo weather for user's detected city / Wikipedia holidays).
- IP geolocation working via ipapi.co.
- Mobile UX fixes (scroll-into-view + showPicker) working.
- GitHub repo at <https://github.com/gedrobo/the-day-you-lived> is up to date with main.
- Vercel auto-deploy on push is wired and confirmed working.

**Last thing that worked:** README pushed to GitHub, Vercel auto-redeployed (no visual change since README isn't on the live page).

**Current blocker:** None. Project is shipped. Step 23 (close-out reflection + Notion logging) is the remaining lesson item.

**Open commitments to user:**
- Step 23 close-out hasn't run. The Reflection Conversation Menu (Vibe Coding Principles → Reflection Conversation Menu) is the next thing to do when the user is ready: walk through the seven canonical questions, draft entries for Sessions / Concepts / Prompts / Errors databases, update Lesson 1 row (Status, Completed date, Hours, GitHub Repo URL, Live URL, Active checkbox), update Current State page, log a Changelog entry if any structural changes happened.

---

## Honest summary of friction (for the reviewer)

**AI's biggest mistakes in this session:**

1. **Claimed NumbersAPI was CORS-enabled in the plan without verifying.** Caused real console errors and required a full replacement mid-build. This is exactly the failure mode the user had spent the prior 30 minutes pushing me to avoid.
2. **Substituted sunrise/sunset as a "filler" when NumbersAPI failed.** Should have dropped the field entirely. User correctly called this out.
3. **Hard-coded London for weather.** Didn't think about the tool's general-purpose framing. User correctly called this out.
4. **First two design iterations on Step 17 made the same error in mirror-image** (form-on-top of cover, then form-on-top of broadsheet). User had to push back twice to extract the right shape.
5. **First plan iteration on the static-data pivot** proposed bundled JSON ("Option A — Lean") as a solid solution. User correctly identified it as faking liveness. Multiple plan iterations followed before landing on the right answer.

**Lesson-vs-reality issues worth surfacing to the curriculum designer:**

1. **Step 9 doesn't anticipate first-time git config.** First commit fails with "Author identity unknown" if global config isn't set. Lesson should warn or suggest pre-flight `git config` setup.
2. **Step 12 doesn't warn about Co-Authored-By trailer** if the user has hooks blocking AI authorship attribution. Worth flagging.
3. **Step 7 (Live Server)** wasn't explicitly invoked here; the user managed it independently. Bundle order is a bit ambiguous.
4. **Step 13's phrasing** (*"a real Wikipedia event from that exact date"*) implies year-specific data; Wikipedia's API returns events from the calendar day across all years. The label rename to *"On this day in history"* is a workaround the lesson doesn't anticipate.
5. **The static-data decision point** (lesson explicitly accepts "charming fakes" for four fields) collided with the user's standard for "shippable product." This is a real design tension in the lesson — accept the compromise or pivot to live data. The lesson doesn't surface this trade-off explicitly; the user discovered it organically.

**User-attributable friction:**
- One round of "showed nothing" on Step 11 was likely typed-partial-date HTML5 validation behaviour (self-resolved on retest).
- One plan-mode rejection where the user reverted to an earlier plan version after I'd cleaned up references they'd objected to. Functionally fine but worth noting.

**Net assessment:** The project shipped. The live URL works for any date. The data is genuinely live. The friction was real — multiple plan iterations on the static-data pivot, two real bugs that I should have caught earlier (NumbersAPI CORS, London hard-coding), and several rounds of design pushback on the result page layout. None of the friction was unrecoverable; all of it produced a better final product. But the path was longer than the lesson page implies.
