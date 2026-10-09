export function renderHeader() {
  const header = document.querySelector("#site-header");

  if (!header) return;

  header.innerHTML = `
  <div class="flex items-center justify-between px-6 py-4 border-b border-[#F4D18B]">
  <a href="/" class="text-xl tracking-widest text-[#F4D18B]">Atrium Auctionarium</a>
 <nav aria-label="Main" class="flex gap-6">
    <a href="/listings.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Listings</a>
    <a href="/login.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Log in</a>
    <a href="/register.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Register</a>
  </nav>
</div>
`;
}
