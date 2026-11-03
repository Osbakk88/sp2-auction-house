import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { getListings } from "../services/listings";

renderHeader();
renderFooter();

const status = document.querySelector<HTMLParagraphElement>("#listings-status");
const list = document.querySelector<HTMLUListElement>("#listings");

async function loadListings() {
  if (!status || !list) return;
  status.textContent = "Loading listings...";
  try {
    const result = await getListings(1);

    for (const listing of result.data) {
      const li = document.createElement("li");

      const title = document.createElement("h2");
      title.textContent = listing.title;

      const bids = document.createElement("p");
      const bidCount = listing._count.bids;
      bids.textContent = `${bidCount} ${bidCount === 1 ? "bid" : "bids"}`;

      li.className = "overflow-hidden rounded-lg border border-[#D4AF37]/30";
      title.className = "mt-3 px-4 font-display text-lg";
      bids.className = "px-4 pb-4 text-[#A8A296]";

      const firstImage = listing.media[0];
      const img = document.createElement("img");
      img.src = firstImage ? firstImage.url : "/placeholder.svg";
      img.alt = firstImage
        ? firstImage.alt || listing.title
        : `No image for ${listing.title}`;
      img.className = "h-48 w-full rounded object-cover";
      img.onerror = () => {
        img.onerror = null;
        img.src = "/placeholder.svg";
      };
      li.appendChild(img);

      li.appendChild(title);
      li.appendChild(bids);
      list.appendChild(li);
    }

    status.textContent = "";
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Could not load listings.";
  }
}

loadListings();
