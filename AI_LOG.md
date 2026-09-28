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

**Notes on AI use overall**

I used AI mainly to understand the assignment and API requirements, to plan my project structure, and to work through debugging when I got stuck. Not to generate finished features. Giving Claude the assignment's AI Policy up front meant it flagged when something (like writing core auth/API logic outright) would be outside scope. All code in the project's TypeScript and CSS files is written and applied by me.
