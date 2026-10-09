export function renderHeader() {
  const header = document.querySelector("#site-header");

  if (!header) return;

  header.innerHTML = `
    <div class="relative flex flex-col gap-10 px-6 pt-10 pb-6 border-b border-[#F4D18B]">
      <a href="/" class="font-display text-[64px] font-semibold tracking-[0.02em] leading-tight text-[#F4D18B]">
        Atrium<br />Auctionarium
      </a>

      <nav aria-label="Main" class="flex justify-center gap-10 font-body text-2xl tracking-[0.02em] text-white">
        <a href="/listings.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Listings</a>
        <a href="/login.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Log in</a>
        <a href="/register.html" class="hover:underline focus-visible:outline-2 focus-visible:outline-[#F4D18B]">Register</a>
      </nav>
    </div>
  `;
}
