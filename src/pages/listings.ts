import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { createListingCard } from "../components/listing-card";
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
      list.appendChild(createListingCard(listing));
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
