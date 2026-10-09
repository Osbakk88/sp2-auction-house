export function renderFooter() {
  const footer = document.querySelector("#site-footer");

  if (!footer) return;

  footer.innerHTML = `
  <div class="flex flex-col items-center gap-4 px-6 py-6 border-t border-[#F4D18B]">
 <nav aria-label="Footer" class="flex flex-wrap justify-center gap-6">
    <a href="/index.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Home</a>
    <a href="/listings.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Listings</a>
    <a href="/login.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Log in</a>
    <a href="/register.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Register</a>
</nav>
     <p class="text-sm text-[#A8A296]">© 2026 Atrium Auctionarium</p>
</div>
`;
}
