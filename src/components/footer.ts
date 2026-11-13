import { getToken } from "../utils/storage";

export function renderFooter() {
  const footer = document.querySelector("#site-footer");

  if (!footer) return;
  const linkClass =
    "hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4D18B]";

  const isLoggedIn = Boolean(getToken());

  const authLinks = isLoggedIn
    ? ""
    : `<a href="/login.html" class="${linkClass}">Log in</a>
      <a href="/register.html" class="${linkClass}">Register</a>`;

  footer.innerHTML = `
  <div class="mt-8 flex flex-col items-center gap-4 px-6 py-10 border-t border-[#F4D18B]">
    <nav aria-label="Footer" class="flex flex-wrap justify-center gap-6 text-white">
      <a href="/index.html" class="${linkClass}">Home</a>
      <a href="/listings.html" class="${linkClass}">Listings</a>
      ${authLinks}
    </nav>
    <p class="text-sm text-[#A8A296]">© 2026 Atrium Auctionarium</p>
  </div>
`;
}
