import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { createListingCard } from "../components/listing-card";
import {
  getProfile,
  getProfileBids,
  getProfileListings,
} from "../services/profile";
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

async function loadMyListings(name: string) {
  const list = document.querySelector<HTMLUListElement>("#my-listings");
  const listStatus = document.querySelector<HTMLParagraphElement>(
    "#my-listings-status",
  );
  if (!list || !listStatus) return;

  listStatus.textContent = "Loading listings...";
  try {
    const result = await getProfileListings(name);
    list.replaceChildren();

    if (result.data.length === 0) {
      listStatus.textContent = "You have no listings yet.";
      return;
    }

    for (const listing of result.data) {
      list.appendChild(createListingCard(listing, "h3"));
    }
    listStatus.textContent = "";
  } catch (error) {
    listStatus.textContent =
      error instanceof Error
        ? `Error: ${error.message}`
        : "Could not load listings.";
  }
}

async function loadMyBids(name: string) {
  const list = document.querySelector<HTMLUListElement>("#my-bids");
  const bidsStatus =
    document.querySelector<HTMLParagraphElement>("#my-bids-status");
  if (!list || !bidsStatus) return;

  bidsStatus.textContent = "Loading bids...";
  try {
    const result = await getProfileBids(name);
    list.replaceChildren();

    if (result.data.length === 0) {
      bidsStatus.textContent = "You haven't placed any bids yet.";
      return;
    }

    for (const bid of result.data) {
      const item = document.createElement("li");
      item.className = "rounded-lg border border-[#D4AF37]/30 p-4";

      let bidTitle: HTMLElement;
      if (bid.listing) {
        const link = document.createElement("a");
        link.href = `/listing.html?id=${bid.listing.id}`;
        link.textContent = bid.listing.title;
        link.className =
          "font-display text-lg hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D18B]";
        bidTitle = link;
      } else {
        bidTitle = document.createElement("span");
        bidTitle.textContent = "Listing no longer available";
        bidTitle.className = "font-display text-lg text-[#A8A296]";
      }

      const details = document.createElement("p");
      const when = new Date(bid.created).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      details.textContent = `${bid.amount} credits (${when})`;
      details.className = "mt-1 text-sm text-[#A8A296]";

      item.append(bidTitle, details);
      list.appendChild(item);
    }
    bidsStatus.textContent = "";
  } catch (error) {
    bidsStatus.textContent =
      error instanceof Error
        ? `Error: ${error.message}`
        : "Could not load bids.";
  }
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

    loadMyListings(name);
    loadMyBids(name);
  } catch (error) {
    status.textContent =
      error instanceof Error
        ? `Error: ${error.message}`
        : "Could not load profile.";
  }
}

loadProfile();
