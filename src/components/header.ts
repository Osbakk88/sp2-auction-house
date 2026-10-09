export function renderHeader() {
  const header = document.querySelector("#site-header");

  if (!header) return;

  header.innerHTML = `
  <a href="/">Atrium Auctionarium</a>
  <nav aria-label="Main">
    <a href="/listings.html">Listings</a>
    <a href="/login.html">Log in</a>
    <a href="/register.html">Register</a>
  </nav>
`;
}
