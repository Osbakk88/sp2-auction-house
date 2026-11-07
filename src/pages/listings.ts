import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { getListings } from "../services/listings";

renderHeader();
renderFooter();

const status = document.querySelector<HTMLParagraphElement>("#listings-status");
const list = document.querySelector<HTMLUListElement>("#listings");
const prevButton = document.querySelector<HTMLButtonElement>("#prev-page");
const nextButton = document.querySelector<HTMLButtonElement>("#next-page");
const pageInfo = document.querySelector<HTMLParagraphElement>("#page-info");
const searchForm = document.querySelector<HTMLFormElement>("#search-form");
const searchInput = document.querySelector<HTMLInputElement>("#search-input");

let currentPage = 1;
let currentQuery = "";

async function loadListings(page: number) {
  if (!status || !list || !prevButton || !nextButton || !pageInfo) return;
  status.textContent = "Loading listings...";
  try {
    const result = await getListings(page, currentQuery);
    currentPage = result.meta.currentPage;
    list.replaceChildren();
    if (result.data.length === 0) {
      pageInfo.textContent = "";
      prevButton.disabled = true;
      nextButton.disabled = true;
      status.textContent = currentQuery
        ? `No listings found for "${currentQuery}".`
        : "No listings found.";
      return;
    }

    for (const listing of result.data) {
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

      const title = document.createElement("h2");
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
      ends.textContent = `Ends: ${new Date(listing.endsAt).toLocaleString(
        "en-GB",
        { dateStyle: "medium", timeStyle: "short" },
      )}`;
      ends.className = "px-4 pb-4 text-sm text-[#A8A296]";

      li.appendChild(img);
      li.appendChild(title);
      li.appendChild(bids);
      li.appendChild(ends);
      list.appendChild(li);
    }

    pageInfo.textContent = `Page ${result.meta.currentPage} of ${result.meta.pageCount}`;
    prevButton.disabled = result.meta.isFirstPage;
    nextButton.disabled = result.meta.isLastPage;
    status.textContent = "";
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Could not load listings.";
  }
}

prevButton?.addEventListener("click", () => {
  loadListings(currentPage - 1);
});

nextButton?.addEventListener("click", () => {
  loadListings(currentPage + 1);
});

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  currentQuery = searchInput?.value.trim() ?? "";
  loadListings(1);
});

loadListings(1);
