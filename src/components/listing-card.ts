import type { Listing } from "../types/listing";

export function createListingCard(
  listing: Listing,
  headingTag: "h2" | "h3" = "h2",
): HTMLLIElement {
  const li = document.createElement("li");
  li.className =
    "relative overflow-hidden rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37]";

  const firstImage = listing.media[0];
  const img = document.createElement("img");
  img.src = firstImage ? firstImage.url : "/placeholder.svg";
  img.alt = firstImage
    ? firstImage.alt || listing.title
    : `No image for ${listing.title}`;
  img.className = "h-48 w-full object-cover";
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

  const bids = document.createElement("p");
  const bidCount = listing._count.bids;
  bids.textContent = `${bidCount} ${bidCount === 1 ? "bid" : "bids"}`;
  bids.className = "px-4 pb-1 text-[#A8A296]";

  const ends = document.createElement("p");
  ends.textContent = `Ends: ${new Date(listing.endsAt).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  })}`;
  ends.className = "px-4 pb-4 text-sm text-[#A8A296]";

  li.appendChild(img);
  li.appendChild(title);
  li.appendChild(bids);
  li.appendChild(ends);
  return li;
}
