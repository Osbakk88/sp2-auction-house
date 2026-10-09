export function renderHeader() {
  const header = document.querySelector("#site-header");

  if (!header) return;

  const linkClass =
    "hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4D18B]";

  header.innerHTML = `
    <div class="relative flex flex-col gap-6 px-6 pt-10 pb-6 border-b border-[#F4D18B] md:gap-10 md:px-24">
      <div aria-hidden="true" class="absolute top-0 right-6 flex items-start gap-3 md:right-14 md:gap-11">
        <div class="h-20 w-8 rounded-b-3xl bg-[#F0E6D2]/70 md:h-[127px] md:w-[60px]"></div>
        <div class="h-28 w-10 rounded-b-3xl bg-[#D4AF37]/70 md:h-[206px] md:w-[83px]"></div>
      </div>

      <a href="/" class="font-display text-4xl font-semibold tracking-[0.02em] leading-tight text-[#F4D18B] md:text-[64px]">
        Atrium<br />Auctionarium
      </a>

      <button
        id="menu-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="main-nav"
        class="self-start border border-[#F4D18B] px-4 py-2 text-white md:hidden ${linkClass}"
      >
        Menu
      </button>

      <nav
        id="main-nav"
        aria-label="Main"
        class="hidden flex-col items-start gap-4 font-body text-xl tracking-[0.02em] text-white md:flex md:flex-row md:items-center md:justify-center md:gap-10 md:text-2xl"
      >
        <a href="/listings.html" class="${linkClass}">Listings</a>
        <a href="/login.html" class="${linkClass}">Log in</a>
        <a href="/register.html" class="border border-[#D4AF37] px-4 py-1 hover:bg-[#D4AF37] hover:text-black ${linkClass}">Register</a>
      </nav>
    </div>
  `;

  const toggle = header.querySelector<HTMLButtonElement>("#menu-toggle");
  const nav = header.querySelector<HTMLElement>("#main-nav");

  if (!toggle || !nav) return;

  function setOpen(open: boolean) {
    nav!.classList.toggle("hidden", !open);
    toggle!.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}
