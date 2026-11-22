# Testing – Atrium Auctionarium

This document shows how I tested my auction website, including HTML validation, Lighthouse results and manual testing of the user stories.

**Live website:** https://atrium-auctionarium.netlify.app/  
**Testing date:** 19–21 November 2026 (automated tests)  
**Manual testing date:** 19-21 November
**Browser:** Chrome (desktop), Chrome DevTools device mode for mobile

## 1. Automated testing

### HTML validation – W3C Nu Validator

**Date:** 19 November 2026

I used the W3C Nu Validator to check the HTML of all 9 pages.

I validated the built HTML files from the `dist/` folder by pasting the code into the validator.

**Result: 0 errors on all 9 pages.**

When I tried validating the live website URL, the validator showed an error after the closing `</html>` tag. This came from a script added by Netlify, not from my own HTML files.

The validator also showed some information messages about trailing slashes on void elements, such as `<meta />`. These were not errors, so I left them as they were.

### Lighthouse testing

**Dates:** 19–20 November 2026

I used Lighthouse in Chrome DevTools with an incognito window. The tests were run on mobile unless otherwise stated.

| Test                                  | Performance | Accessibility | Best Practices | SEO | CLS       |
| ------------------------------------- | ----------- | ------------- | -------------- | --- | --------- |
| Before layout fix – mobile            | 76–78       | 100           | 100            | 91  | 0.30–0.42 |
| After layout fix – mobile             | 91          | 100           | 100            | 91  | 0         |
| After layout fix – desktop, logged in | 99          | 100           | 100            | 91  | 0.035     |

#### Problem found

The first Lighthouse tests showed a high Cumulative Layout Shift (CLS).

The header and footer are added to the page with JavaScript. This caused the content to move when the header and footer appeared.

I used Chrome DevTools to measure their heights and added `min-h` classes to `#site-header` and `#site-footer` in all 9 HTML files.

#### Result

After deploying the changes, the mobile performance score improved from 76–78 to 91, and the desktop score was 99.

The layout shift was reduced to 0 on mobile and 0.035 on desktop.

## 2. Manual testing – User stories

I tested the website using the live Netlify version.

The tests include both logged-in and logged-out users.

**Result key:**

- ✅ Pass – Works as expected
- ❌ Fail – Does not work as expected
- ⚠️ Partial – Works, but could be improved
- ⬜ Not tested yet

### Browsing and searching

| Test                                | Result | Notes |
| ----------------------------------- | ------ | ----- |
| Browse listings without logging in  | ✅     |       |
| Search for listings                 | ✅     |       |
| Filter listings by tag              | ✅     |       |
| Sort listings                       | ✅     |       |
| Open a listing and view its details | ✅     |       |
| View bid history on a listing       | ✅     |       |
| Navigate between listing pages      | ✅     |       |

### Registration and login

| Test                                                     | Result | Notes                        |
| -------------------------------------------------------- | ------ | ---------------------------- |
| Register with a valid `@stud.noroff.no` email            | ✅     |                              |
| Registration with another email is rejected              | ✅     |                              |
| Log in with valid details                                | ✅     |                              |
| Incorrect login details show an error                    | ✅     |                              |
| Log out                                                  | ✅     | Sends user back to home page |
| Header and footer show the correct links when logged out | ✅     |                              |
| Header and footer show the correct links when logged in  | ✅     |                              |

### Profile and credits

| Test                                   | Result | Notes               |
| -------------------------------------- | ------ | ------------------- |
| View my profile                        | ✅     |                     |
| View my own listings                   | ✅     |                     |
| View listings I have bid on            | ✅     |                     |
| Edit my bio                            | ✅     |                     |
| Edit my avatar                         | ✅     |                     |
| Edit my banner                         | ✅     |                     |
| Return to profile after saving changes | ✅     |                     |
| Credits are shown in the header        | ✅     | And on profile page |
| Credits update after placing a bid     | ✅     |                     |

### Creating and managing listings

| Test                                         | Result | Notes |
| -------------------------------------------- | ------ | ----- |
| Create a listing                             | ✅     |       |
| Create a listing with images                 | ✅     |       |
| Create a listing with tags                   | ✅     |       |
| Required fields show an error when empty     | ✅     |       |
| End date must be in the future               | ✅     |       |
| Edit my own listing                          | ✅     |       |
| Delete my own listing                        | ✅     |       |
| Cannot edit or delete another user's listing | ✅     |       |

### Bidding

| Test                                         | Result | Notes |
| -------------------------------------------- | ------ | ----- |
| Place a valid bid                            | ✅     |       |
| Bid history updates after bidding            | ✅     |       |
| A bid that is too low shows an error         | ✅     |       |
| A bid above available credits shows an error | ✅     |       |
| Cannot bid on my own listing                 | ✅     |       |
| Cannot bid on an expired listing             | ✅     |       |

### Logged-out users

| Test                                   | Result | Notes |
| -------------------------------------- | ------ | ----- |
| Can browse listings without an account | ✅     |       |
| Cannot place bids when logged out      | ✅     |       |
| Cannot create listings when logged out | ✅     |       |
| Profile page requires login            | ✅     |       |
| Create listing page requires login     | ✅     |       |
| Edit listing page requires login       | ✅     |       |

### Responsive design and navigation

| Test                                           | Result | Notes                       |
| ---------------------------------------------- | ------ | --------------------------- |
| Website works at 390px width                   | ✅     |                             |
| Mobile menu opens and closes                   | ✅     |                             |
| Mobile menu links have correct spacing         | ✅     |                             |
| Mobile menu closes with Escape                 | ✅     |                             |
| No horizontal scrolling on mobile              | ✅     | The content fits the screen |
| Header and footer display correctly on desktop | ✅     |                             |
| Images display correctly or show a fallback    | ✅     |                             |
| Navigation links lead to the correct pages     | ✅     |                             |

## 3. Bugs found and fixed

This table documents problems I found while developing and testing the website.

| Problem                                                           | What I changed                                                          | Status |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------- | ------ |
| High layout shift when the header and footer loaded               | Added `min-h` to reserve space before JavaScript renders the components | Fixed  |
| Mobile menu links did not have the correct spacing                | Updated `setOpen()` to add the `flex` class when opening the menu       | Fixed  |
| Header links were in the wrong order compared with Figma          | Changed the order of Profile and Credits                                | Fixed  |
| Footer showed incorrect links depending on login status           | Added separate links for logged-in and logged-out users                 | Fixed  |
| Footer logout button used the same ID as the header logout button | Changed the footer button ID to `footer-logout-button`                  | Fixed  |
| Footer was missing the `clearAuth` import                         | Added the missing import                                                | Fixed  |
| Saving profile changes left the user on the edit page             | Added a redirect to `/profile.html` after saving                        | Fixed  |
| Unused `public/icons.svg` file in the project                     | Removed the file after checking it was not used                         | Fixed  |

## 4. Final testing summary

All the user stories I tested worked as expected on the live Netlify version and in incognito, for both logged-in and logged-out users. The website passes HTML validation with 0 errors on all 9 pages. Lighthouse gives 91 on mobile and 99 on desktop for performance, with 100 for accessibility.

The main problems I found were layout shift from the header and footer, mobile menu spacing, and a few inconsistencies in the header and footer links. All of these are fixed.

With more time, I would improve image loading, because some images from the API are large, and I would add automated tests so I do not have to test everything by hand.
