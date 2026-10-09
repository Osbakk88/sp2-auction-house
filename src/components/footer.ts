export function renderFooter() {
  const footer = document.querySelector("#site-footer");

  if (!footer) return;
  const linkClass =
    "hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4D18B]";

  footer.innerHTML = `
  <div class="flex flex-col items-center gap-4 px-6 py-6 border-t border-[#F4D18B]">
    <nav aria-label="Footer" class="flex flex-wrap justify-center gap-6 text-white">
      <a href="/index.html" class="${linkClass}">Home</a>
      <a href="/listings.html" class="${linkClass}">Listings</a>
      <a href="/login.html" class="${linkClass}">Log in</a>
      <a href="/register.html" class="${linkClass}">Register</a>
    </nav>
    <p class="text-sm text-[#A8A296]">© 2026 Atrium Auctionarium</p>
  </div>
`;
}
