# Atrium Auctionarium

Atrium Auctionarium is an auction website where users can browse listings, place bids and sell their own items.

The project was created for Semester Project 2 at Noroff (JAN24PT) and uses the Noroff Auction API v2.

<img width="3420" height="1892" alt="Screenshot of the Atrium Auctionarium home page" src="https://github.com/user-attachments/assets/fff24348-324a-403f-ba28-485e4a298695" />

## Links

- Live site: https://atrium-auctionarium.netlify.app/
- Figma design and prototypes: https://www.figma.com/design/03E29eRKq124lI11WgEQes/Semesterproject2
- GitHub Project board: https://github.com/users/Osbakk88/projects/6/views/1

## Features

- Register and log in with a `stud.noroff.no` account
- Browse, search, filter by tags and sort listings
- View listing details, images, bid history and time remaining
- Place bids on other users' listings
- Create, edit and delete my own listings
- View and edit my profile, including bio, avatar and banner
- See my own listings and bids on my profile page

## Built with

- HTML
- TypeScript (strict mode)
- Tailwind CSS v4
- Vite (multi-page application)
- Noroff Auction API v2

## Getting started

No API key setup is needed. The app creates an API key automatically the first time you log in and stores it in the browser.

1. Clone the repository:

   ```bash
   git clone https://github.com/Osbakk88/sp2-auction-house.git
   cd sp2-auction-house
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local address shown in the terminal.

5. To build the project for production:

   ```bash
   npm run build
   ```

## Project structure

```text
src/
  pages/        TypeScript files for each page
  components/   Header, footer, listing cards and gallery
  services/     Functions for communicating with the API
  types/        TypeScript interfaces
  utils/        Helper functions
  style.css     Tailwind CSS and custom styling
```

The project uses separate HTML pages, with a TypeScript file for each page.

The service files handle requests to the Noroff API. The page files use the returned data to display listings, profiles and other information.

I use `createElement` and `textContent` to build elements and display API data instead of inserting it directly with `innerHTML`.

## Accessibility

I have included several accessibility features:

- A skip link to the main content
- Semantic HTML elements such as `header`, `main` and `footer`
- One main heading (`h1`) on each page
- Labels for form inputs
- Keyboard navigation, including closing the mobile menu with Escape
- ARIA attributes for the navigation menu and image gallery
- `role="timer"` for the auction countdown
- `role="status"` and `role="alert"` for status and error messages

## Design

The design was made in Figma, with a style guide, desktop and mobile screens, and interactive prototypes.

- Desktop design: https://www.figma.com/design/03E29eRKq124lI11WgEQes/Semesterproject2?node-id=0-1
- Mobile design: https://www.figma.com/design/03E29eRKq124lI11WgEQes/Semesterproject2?node-id=1-2
- Components: https://www.figma.com/design/03E29eRKq124lI11WgEQes/Semesterproject2?node-id=68-612
- Desktop prototype: https://www.figma.com/proto/03E29eRKq124lI11WgEQes/Semesterproject2?node-id=125-5214&p=f&viewport=612%2C594%2C0.09&t=vyqUr2OZ8M7FhajG-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=125%3A5214
- Mobile prototype: https://www.figma.com/proto/03E29eRKq124lI11WgEQes/Semesterproject2?node-id=107-3242&p=f&viewport=-769%2C13%2C0.85&t=0WwVzq7XrXlN1gBf-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=104%3A2939
- Style guide: https://www.figma.com/design/03E29eRKq124lI11WgEQes/Semesterproject2?node-id=295-2246&t=txp6xeZ1FRe5dxNX-1

## AI use

I used Claude, GitHub Copilot and Figma AI during the project for guidance, explanations, debugging and code suggestions.

I reviewed the suggestions and rewrote several parts of the code to better understand how they work. Some AI-assisted parts are also labelled in the source code.

More details are available in [AI_LOG.md](AI_LOG.md).

## Author

- Christina Anett Osbakk
- Noroff – Front-end Development, JAN24PT
