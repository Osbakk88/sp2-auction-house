import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { getProfile } from "../services/profile";
import { getName, getToken } from "../utils/storage";

renderHeader();
renderFooter();

const status = document.querySelector<HTMLParagraphElement>("#profile-status");
const titleEl = document.querySelector<HTMLHeadingElement>("#profile-title");
const content = document.querySelector<HTMLDivElement>("#profile-content");

function createStat(label: string, value: number): HTMLDivElement {
  const box = document.createElement("div");
  box.className = "rounded-lg border border-[#D4AF37]/30 p-4 text-center";

  const number = document.createElement("p");
  number.textContent = String(value);
  number.className = "font-display text-2xl";

  const text = document.createElement("p");
  text.textContent = label;
  text.className = "text-sm text-[#A8A296]";

  box.appendChild(number);
  box.appendChild(text);
  return box;
}

async function loadProfile() {
  if (!status || !titleEl || !content) return;

  const name = getName();
  if (!getToken() || !name) {
    window.location.href = "/login.html";
    return;
  }

  status.textContent = "Loading profile...";
  try {
    const result = await getProfile(name);
    const profile = result.data;

    document.title = `${profile.name} | Atrium Auctionarium`;

    const banner = document.createElement("img");
    banner.src = profile.banner?.url || "/placeholder.svg";
    banner.alt = profile.banner?.alt || `${profile.name}'s banner`;
    banner.className =
      "h-40 w-full rounded-lg border border-[#D4AF37]/30 object-cover md:h-56";
    banner.onerror = () => {
      banner.onerror = null;
      banner.src = "/placeholder.svg";
    };

    const avatar = document.createElement("img");
    avatar.src = profile.avatar?.url || "/placeholder.svg";
    avatar.alt = profile.avatar?.alt || `${profile.name}'s avatar`;
    avatar.className =
      "absolute -bottom-14 right-6 h-28 w-28 rounded-full border-4 border-[#0B0B0C] object-cover ring-2 ring-[#D4AF37] md:-bottom-[4.5rem] md:h-36 md:w-36";
    avatar.onerror = () => {
      avatar.onerror = null;
      avatar.src = "/placeholder.svg";
    };

    const hero = document.createElement("div");
    hero.className = "relative";
    hero.appendChild(banner);
    hero.appendChild(avatar);

    const displayName = document.createElement("h2");
    displayName.textContent = profile.name;
    displayName.className = "font-display text-3xl";

    const bio = document.createElement("p");
    bio.textContent = profile.bio || "No bio yet.";
    bio.className = "mt-2 text-[#A8A296]";

    const info = document.createElement("div");
    info.className = "mt-4 min-h-16 pl-6 pr-32 md:min-h-20 md:pr-44";
    info.appendChild(displayName);
    info.appendChild(bio);

    const stats = document.createElement("div");
    stats.className = "mt-8 grid grid-cols-3 gap-3";
    stats.appendChild(createStat("Credits", profile.credits));
    stats.appendChild(createStat("Listings", profile._count.listings));
    stats.appendChild(createStat("Wins", profile._count.wins));

    content.appendChild(hero);
    content.appendChild(info);
    content.appendChild(stats);

    status.textContent = "";
  } catch (error) {
    status.textContent =
      error instanceof Error
        ? `Error: ${error.message}`
        : "Could not load profile.";
  }
}

loadProfile();
