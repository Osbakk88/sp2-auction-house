**AI Usage Log — Semester Project 2**

This log documents all AI assistance I have sought while working on this assignment, in line with the course's AI Policy. I gave the AI (Claude) the full text of the AI Policy up front so it had the actual rules in front of it throughout the project.

**Tool used:** Claude
**Date:** 16 September 2026
**Purpose:** Guidance setting up the local dev environment from scratch (cloning the repo, running npm create vite@latest, installing Tailwind via @tailwindcss/vite, editing vite.config.ts and style.css, setting up .env for the API key).
**Outcome:** Set up the project myself in VS Code. Accidentally selected "Remove existing files" during the Vite scaffold step and lost README.md from disk; recovered it myself with git restore once it was explained that git still had it in history.

**Tool used:** Claude
**Date:** 28 September 2026
**Purpose:** Debugging why Tailwind utility classes (bg-black, text-yellow-400) had no visible effect in the browser, despite the config looking correct. Went through several rounds of checking the Vite dev server, browser cache, and CSS output together.
**Outcome:** Found the actual cause myself after some guidance form my teacher to check if vite.config.ts was physically located in the file tree. It had ended up inside node_modules/typescript instead of the project root (likely from an earlier "New File" action), so Vite never loaded the Tailwind plugin. Moved the file myself with mv, restarted the dev server and confirmed Tailwind started working.

**Tool used:** Claude
**Date:** 28 September 2026
**Purpose:** Help writing a first version of the fetch call to the Noroff API GET /auction/listings and rendering the results (title + image, with a fallback for missing images) in main.ts.
**Outcome:** Wrote and typed the fetch/render code with guidance on the async/await pattern and optional chaining listing.media?.[0]?.url for handling missing images. Understand what each part of the function does and can explain it. Some images seem to still be missing or broken, likely from bad data in the shared API pool rather than the fetch/render logic itself.

**Tool used:** Claude
**Date:** 8 October 2026
**Purpose:** Reviewing my project setup before building the pages. .gitignore, vite.config.ts, tsconfig.json and folder structure. Also did a review of my first fetch test in main.ts.
**Outcome:** Enabled "strict". True in tsconfig.json myself and verified with npx tsc --noEmit. Removed the Vite template files (counter.ts and demo assets). Created src/pages, components, services, types and utils, and confirmed with git ls-files that .env is not tracked. Claude pointed out that main.ts uses innerHTML with unescaped API data and "any" types, which I will fix when building the real listing cards later on.

**Tool used:** Claude
**Date:** 8 October 2026
**Purpose:** Debugging two errors: Vite showed "Can't resolve ./tailwind.css" and Vite kept logging "Failed to load url /src/pages/listings.ts" even after I commented the script out.
**Outcome:** Found with Claude's guidance that style.css had the wrong import and fixed it myself to "@import "tailwindcss";. The second error turned out to be unsaved files (a common misstake I make) plus a missing listings.ts file. I created the empty page scripts, saved all files and the error went away. Learned to check the unsaved-dot in VS Code.

**Tool used:** Claude
**Date:** 9 October 2026
**Purpose:** Planning and structuring the seven HTML pages (index, listings, listing, login, register, profile, create-listing), an accessibility checklist per page, and setting up Vite's multi-page build.
**Outcome:** Wrote the HTML skeletons myself with lang, viewport, unique titles, one h1, a skip link, header/main/footer landmarks and my own script file per page. Added all pages to build.rollupOptions.input in vite.config.ts and confirmed with "npm run build" that all seven pages end up in dist/.

**Tool used:** Claude
**Date:** 9 October 2026, 30 October and 3 November 2026
**Purpose:** Building a responsive header and footer (header.ts, footer.ts). With a hamburger menu, skip link, landmarks and keyboard support (aria-expanded, aria-controls, Escape to close). Improvements: making the header change depending on whether the user is logged in, and adding logout.
**Outcome:** I wrote the code with Claude's guidance/code checking and fixed mistakes along the way that I had made (mixed-up versions of the file, a variable used before it was defined, a listener attached before the HTML existed, an unsaved file, a duplicated nav). I can explain what the header does and why each accessibility attribute is there.

**Tool used:** Claude
**Date:** 3 November 2026
**Purpose:** Asked why Chrome showed the validation message for the 8-character password in Norwegian although my page is in English.
**Outcome:** Learned that built-in browser validation follows the browser's language, not the page's. Decided to keep native validation for now and wrote the reasoning in my reflection notes.

**Tool used:** Claude  
**Date:** 3 November 2026
**Purpose:** Building the listings page: TypeScript types for listings (src/types/listing.ts), a service that fetches listings (getListings) from the Noroff API, and the page script that shows the listings as cards with image, title, number of bids, end date and a link. Also a local placeholder.svg and an onerror handler for listings with missing or broken images, and making the whole card clickable.
**Outcome:** Asked Claude for help to understand the steps (of loop, createElement, textContent instead of innerHTML because the data is written by other students, URLSearchParams, optional/null values) and showed me an example code for the steps. I typed it, ran npx tsc --noEmit, tested in the browser and debugged. I mixed up listing.ts/listings.ts and listing.html/listings.html several times, which cost me a lot of time. The final structure should now be correct.

**Tool used:** Claude
**Date:** 3 November 2026
**Purpose:** Building the single listing page (listing.html, src/pages/listing.ts, getListing in the service, and the SingleListing/Bid types). Reading ?id= from the URL, showing image, description (handling null), seller, end date and a bid history sorted with the highest bid first. Centerd the layout after. **Outcome:** Asked claude for guidance and explanation, wrote the code myself. Tested with a listing without bids ("chair") and one with 7 bids, and committed. Can explain how the id is read from the URL and how the bid list is built and sorted.

**Notes on AI use overall**

I used AI mainly to understand the assignment and API requirements, to plan my project structure, and to work through debugging when I got stuck. Not to generate finished features. Giving Claude the assignment's AI Policy up front meant it flagged when something (like writing core auth/API logic outright) would be outside scope. All code in the project's TypeScript and CSS files is written and applied by me.
