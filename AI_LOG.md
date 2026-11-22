**AI Usage Log — Semester Project 2**

This log documents all AI assistance I have sought while working on this assignment, in line with the course's AI Policy. I gave the AI (Claude) the full text of the AI Policy up front so it had the actual rules in front of it throughout the project.

**Tool used:** Claude
**Date:** 16 September 2026
**Purpose:** Guidance setting up the local dev environment from scratch (cloning the repo, running npm create vite@latest, installing Tailwind via @tailwindcss/vite, editing vite.config.ts and style.css, setting up .env for the API key).
**Outcome:** Set up the project myself in VS Code. Accidentally selected "Remove existing files" during the Vite scaffold step and lost README.md from disk; recovered it myself with git restore once it was explained that git still had it in history.

**Tool used:** Claude
**Date:** 28 September 2026
**Purpose:** Debugging why Tailwind utility classes (bg-black, text-yellow-400) had no visible effect in the browser, despite the config looking correct. Went through several rounds of checking the Vite dev server, browser cache, and CSS output together.
**Outcome:** Found the actual cause myself after some guidance from my teacher to check if vite.config.ts was physically located in the file tree. It had ended up inside node_modules/typescript instead of the project root (likely from an earlier "New File" action), so Vite never loaded the Tailwind plugin. Moved the file myself with mv, restarted the dev server and confirmed Tailwind started working.

**Tool used:** Claude
**Date:** 28 September 2026
**Purpose:** Help writing a first version of the fetch call to the Noroff API GET /auction/listings and rendering the results (title + image, with a fallback for missing images) in main.ts.
**Outcome:** Wrote and typed the fetch/render code with guidance on the async/await pattern and optional chaining listing.media?.[0]?.url for handling missing images. Understand what each part of the function does and can explain it. Some images seem to still be missing or broken, likely from bad data in the shared API pool rather than the fetch/render logic itself.

**Tool used:** Claude
**Date:** 8 October 2026
**Purpose:** Reviewing my project setup before building the pages. .gitignore, vite.config.ts, tsconfig.json and folder structure. Also did a review of my first fetch test in main.ts.
**Outcome:** Enabled "strict": true in tsconfig.json myself and verified with npx tsc --noEmit. Removed the Vite template files (counter.ts and demo assets). Created src/pages, components, services, types and utils, and confirmed with git ls-files that .env is not tracked. Claude pointed out that main.ts uses innerHTML with unescaped API data and "any" types, which I will fix when building the real listing cards later on.

**Tool used:** Claude
**Date:** 8 October 2026
**Purpose:** Debugging two errors: Vite showed "Can't resolve ./tailwind.css" and Vite kept logging "Failed to load url /src/pages/listings.ts" even after I commented the script out.
**Outcome:** Found with Claude's guidance that style.css had the wrong import and fixed it myself to "@import "tailwindcss";. The second error turned out to be unsaved files (a common mistake I make) plus a missing listings.ts file. I created the empty page scripts, saved all files and the error went away. Learned to check the unsaved-dot in VS Code.

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
**Purpose:** Building the single listing page (listing.html, src/pages/listing.ts, getListing in the service, and the SingleListing/Bid types). Reading ?id= from the URL, showing image, description (handling null), seller, end date and a bid history sorted with the highest bid first. Centered the layout after.
**Outcome:** Asked claude for guidance and explanation, wrote the code myself. Tested with a listing without bids ("chair") and one with 7 bids, and committed. Can explain how the id is read from the URL and how the bid list is built and sorted.

**Tool used:** Claude
**Date:** 4–7 November 2026
**Purpose:** Help with pagination, search, profile information and showing credits in the header.
**Outcome:** I worked on the listings page so users could search and move between pages. I also added profile types, a getProfile service and a profile page with a banner, avatar, bio and statistics. I got guidance from Claude along the way, and I wrote getProfile myself.

**Tool used:** Claude
**Date:** 11–12 November 2026
**Purpose:** Understand how to create listings, place bids and edit or delete my own listings.
**Outcome:** I learned how the page calls a service function, which then sends a request to the API. I worked with form validation, including checking that an auction ends in the future. I also learned that a successful DELETE request can have no response body, and that the API must check ownership even if my page also checks the seller. Some of the bidding and edit/delete code started from AI examples, which I later reviewed and worked on.

**Tool used:** GitHub Copilot / VS Code AI
**Date:** 12–14 November 2026
**Purpose:** Get starting examples for features I had planned for my auction website.
**Outcome:** Copilot helped with first versions of several features, including bidding, deleting and updating listings, profile lists, editing pages, image galleries and countdowns. It also suggested some header and footer changes. I used these as starting points, reviewed how they worked and later rewrote many of the functions in a style I understood better.

**Tool used:** Claude
**Date:** 13 November 2026
**Purpose:** Improve the layout of the login and registration forms and adjust footer links for logged-in users.
**Outcome:** I wanted the forms to be more centered on the page. I also worked on showing different footer links depending on whether a user is logged in, using getToken(). At first, my changes did not appear. I found that I had two development servers running, stopped the old one and checked the page again.

**Tool used:** GitHub Copilot / VS Code AI
**Date:** 13 November 2026
**Purpose:** Ask questions about headings, innerHTML, the footer and the search, tag and sorting fields.
**Outcome:** I used the explanations to understand how to structure the HTML and connect it to the page scripts. I worked on the changes myself and also asked Claude to review the approach. This helped me understand the difference between building the HTML and handling the user actions in TypeScript.

**Tool used:** Claude
**Date:** 14 November 2026
**Purpose:** Review my Git changes before committing.
**Outcome:** I checked the changes before committing and learned to use git --no-pager diff --stat to see a short overview without opening the pager. I also checked my commit and push steps.

**Tool used:** Claude
**Date:** 14 November 2026
**Purpose:** Understand the types, service functions and page code for “My listings” and “My bids”.
**Outcome:** I learned how data moves from the API through a service and into the profile page. Copilot had suggested first versions of the functions that display my listings and bids. I reviewed these and used the browser console to look at the returned data. I also learned that a bid may refer to a deleted listing, so the listing can be null and must be checked before it is used.

**Tool used:** Claude
**Date:** 14 November 2026
**Purpose:** Get guidance on editing the profile bio, avatar and banner.
**Outcome:** I worked on the edit profile form and how to send its values to the API. I learned why the bio should be included even when it is empty, and that image links need to be valid public URLs. I also fixed a mismatch between a form ID in the HTML and the selector in TypeScript.

**Tool used:** Claude, GitHub Copilot
**Date:** 14 November 2026
**Purpose:** Add tag filtering and sorting to the listings page.
**Outcome:** I worked with the `_tag`, sort and sortOrder query parameters in the listings service and page. I learned how requestSubmit() can run the search again when the sort option changes. Copilot also helped with the search and filter markup in listings.html. When the changes did not appear, I restarted the development server.

**Tool used:** Claude
**Date:** 14 November 2026
**Purpose:** Compare image sizes and page widths.
**Outcome:** I tried different widths and card image proportions. I decided to use max-w-[1600px], taller card images with aspect-[3/2] and a wider profile page. I made these choices based on how I wanted the website to look.

**Tool used:** Claude, GitHub Copilot
**Date:** 14 November 2026
**Purpose:** Plan support for multiple images in an auction listing.
**Outcome:** I worked with parseImageUrls() to turn lines of image URLs into image objects, and createGallery() to display a main image and thumbnails. I learned what aria-label and aria-current are used for. AI provided starting examples, and I later rewrote the image utility and gallery code in a clearer style that I could follow.

**Tool used:** Claude, GitHub Copilot
**Date:** 14 November 2026
**Purpose:** Add a countdown to the listing page and an "Ending soon" label to listing cards.
**Outcome:** Claude explained how JavaScript dates, milliseconds, Math.floor(), % (remainder), setInterval() and clearInterval() work. Copilot suggested the first versions of the countdown functions and the timer setup. Later I rewrote formatTimeLeft() and isEndingSoon() in src/utils/time.ts and the "Ending soon" badge in src/components/listing-card.ts in my own style. The timer setup in src/pages/listing.ts (setInterval and clearInterval) is still AI-assisted and is labelled with a comment in the code. I understand the general logic, but the time calculations took more practice.

**Tool used:** Claude
**Date:** 14 November 2026
**Purpose:** Find unused code and debugging statements.
**Outcome:** I used terminal commands to look for console.log and checked whether src/main.ts was still used. It was an old test file, so I removed it after checking that it was not imported. I also learned that some terminal search patterns need quotes in zsh.

**Tool used:** Claude
**Date:** 14–15 November 2026
**Purpose:** Plan and organise user stories, the project board and the roadmap.
**Outcome:** Claude helped draft user story descriptions, including extra stories for the gallery, countdown, Figma and README. I created the issues and organised the board, moved cards between columns, adjusted the work-in-progress limit and added dates based on my Git history.

**Tool used:** Claude, GitHub Copilot
**Date:** 15–16 November 2026
**Purpose:** Review which parts of the project had AI assistance and how to document it.
**Outcome:** I asked Copilot to identify code it had helped create and discussed the AI rules with Claude. I decided to rewrite much of the code so I could understand it better, while keeping attribution comments for AI-assisted parts. I also reviewed how to describe the help accurately in this log.

**Tool used:** Claude
**Date:** 15–16 November 2026
**Purpose:** Work through and rewrite API service functions in a simpler style.
**Outcome:** I used the earlier versions as references while rewriting functions for listings, bids and profiles. Claude explained the steps and sometimes helped with individual lines. I practised getting the token and API key, calling fetch(), checking response.ok, handling errors and returning data. I fixed typing and syntax mistakes along the way. I also learned why a successful DELETE request should not always be read as JSON.

**Tool used:** Claude
**Date:** 15–16 November 2026
**Purpose:** Make the page scripts and components easier for me to read and explain.
**Outcome:** I reviewed and rewrote code for the create and edit forms, home page, listings search, profile lists, header, footer, listing cards, gallery, images and time utilities. I used clearer variable names and more if/else statements. I learned why null checks are needed inside functions and why an empty description or bio should sometimes be sent instead of undefined. I also worked on disabling the edit button until the listing had loaded and while saving. The bid form, confirmation dialog and timer setup were not fully rewritten and remain marked as AI-assisted.

**Tool used:** Claude
**Date:** 16 November 2026
**Purpose:** Review the project before committing changes.
**Outcome:** Claude reviewed the repository with me for TypeScript issues, AI attribution comments, debugging statements, innerHTML, API credentials and page access checks. I also tested most of the functions manually. I noticed that one file had not been saved in VS Code and corrected some attribution comments. I pushed three commits. I still want to improve the hover styling on some buttons.

**Tool used:** Claude
**Date:** 17 November 2026
**Purpose:** Get my site live on Netlify and find out why it had no content.
**Outcome:** I deployed from GitHub to Netlify and the build said it was successful, but the site was missing content. I learned to read the deploy file browser and saw that Netlify had published my source files instead of the built dist folder. I fixed the build command and publish directory in the settings, checked the page source to confirm the built assets were live, and tested the site in a private window. A Netlify AI agent also suggested a netlify.toml file, which I did not use.

**Tool used:** Claude, Figma AI
**Date:** 17–19 November 2026
**Purpose:** Get help finding the correct colours, fonts, sizes and spacing from my code so my Figma designs would match the website.
**Outcome:** Claude helped me find the values I needed from my code, such as font sizes, colours, widths and the header decorations. I created the components, pages and prototype connections in Figma myself after I got tips from Figma AI. I did not know that I could create components from other parts of the design than buttons. I also used Figma AI to make some changes to my desktop designs. I checked the changes afterwards and fixed some things manually. I learned more about auto layout and components. There are still some small differences between Figma and the website because the website uses live data from the API. The header and footer components were re-created several times during this process.

**Tool used:** Claude
**Date:** 17–19 November 2026
**Purpose:** Get help planning my reflection and feedback on my writing.
**Outcome:** Claude suggested how I could organise the reflection and what I should include. I worked on the reflection and got feedback on what I could explain better and what I could shorten. I also used it to make sure I did not forget any important parts.

**Tool used:** Claude
**Date:** 19–20 November 2026
**Purpose:** Validate my HTML, run Lighthouse tests and understand the results.
**Outcome:** I first validated the wrong link by mistake. After that, I validated the HTML files from the dist folder and got no errors on any of the 9 pages. Claude explained the difference between errors, warnings and information messages. I also learned that Netlify adds a script to the live website, which caused an HTML validation error after the closing html tag. My first Lighthouse results were around 76–78 in mobile performance. The page had a high layout shift because the header was added with JavaScript after the page loaded. Claude helped me understand the problem, and I measured the header and footer in DevTools. I added min-h to all 9 HTML pages myself. After deploying the changes, mobile performance improved to 91 and desktop performance to 99. The layout shift was also reduced to 0.

**Tool used:** Claude
**Date:** 20 November 2026
**Purpose:** Fix the mobile menu spacing and make the header and footer match my Figma designs.
**Outcome:** The spacing between the menu links did not work on mobile. Claude explained that the navigation needed display: flex for gap to work. I changed the setOpen function so it adds the flex class when the menu opens. I also changed the order of the links in the header and updated the footer links for logged-in and logged-out users. Claude pointed out that clearAuth was missing from the footer import and that the logout buttons in the header and footer had the same id. I fixed both problems and did a new test.

**Tool used:** Claude
**Date:** 20 November 2026
**Purpose:** Get help with some small fixes and clean up the project before testing.
**Outcome:** I added a redirect to the profile page after saving changes in edit-profile.ts. I also removed the unused public/icons.svg after checking that it was not used anywhere. I checked that my .env file was empty, ignored by Git and had not been committed. When Git rejected my push, I learned how to use git pull --rebase before pushing again.

**Tool used:** Claude
**Date:** 20 November 2026
**Purpose:** Get help setting up a testing log for my project.
**Outcome:** Claude helped create the TESTING.md template using the user stories from the project brief. It also helped me document my W3C validation and Lighthouse results. I am doing the manual testing myself and adding the results to the file. I'm not sure if it's necessary, but I chose to include the file in my project.

**Notes on AI use overall:**

I used Claude, GitHub Copilot / VS Code AI and Figma AI while working on Atrium Auctionarium. I mainly used Claude to understand concepts, plan my work, find mistakes and review code. Figma AI helped me with ideas for components. Near the end of my project, Copilot suggested first versions of some features based on my plans. I later rewrote many of the API functions, page scripts and components in a simpler style so I could understand and explain them better. Some parts, including the bid form, confirmation dialog and timer setup, still use AI-suggested code and are labelled in the project. Claude helped draft user stories, an early version of this log and my reflection notes, and I reviewed, rewrote and organised these for my project. I used AI to help polish the wording of this log and check spelling. I have read and checked each entry. I am responsible for checking, testing and understanding the work I submit.
