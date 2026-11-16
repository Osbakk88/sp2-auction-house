// Rewritten by me after understanding the pattern (originally AI-assisted)
import type { Listing } from "../types/listing";
import { isEndingSoon } from "../utils/time";

export function createListingCard(
  listing: Listing,
  headingTag: "h2" | "h3" = "h2",
): HTMLLIElement {
  const li = document.createElement("li");
  li.className =
    "relative overflow-hidden rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37]";

  const image = listing.media[0];
  const img = document.createElement("img");

  if (image) {
    img.src = image.url;
    img.alt = image.alt || listing.title;
  } else {
    img.src = "/placeholder.svg";
    img.alt = `No image for ${listing.title}`;
  }

  img.className = "aspect-[3/2] w-full object-cover";

  img.onerror = () => {
    img.onerror = null;
    img.src = "/placeholder.svg";
  };

  const title = document.createElement(headingTag);
  title.className = "mt-3 px-4 font-display text-lg";

  const link = document.createElement("a");
  link.href = `/listing.html?id=${listing.id}`;
  link.textContent = listing.title;
  link.className =
    "after:absolute after:inset-0 hover:underline focus-visible:outline-2 focus-visible:outline-[#D4AF37]";

  title.appendChild(link);

  const bidCount = listing._count.bids;
  const bids = document.createElement("p");

  let bidText = "bids";
  if (bidCount === 1) {
    bidText = "bid";
  }

  bids.textContent = `${bidCount} ${bidText}`;
  bids.className = "px-4 pb-1 text-[#A8A296]";

  const ends = document.createElement("p");
  const endDate = new Date(listing.endsAt);

  ends.textContent = `Ends: ${endDate.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  })}`;

  ends.className = "px-4 pb-4 text-sm text-[#A8A296]";

  li.appendChild(img);

  if (isEndingSoon(listing.endsAt)) {
    const badge = document.createElement("span");
    badge.textContent = "Ending soon";
    badge.className =
      "pointer-events-none absolute top-2 left-2 rounded bg-[#D4AF37] px-2 py-1 text-xs font-semibold text-black";

    li.appendChild(badge);
  }

  li.appendChild(title);
  li.appendChild(bids);
  li.appendChild(ends);

  return li;
}
