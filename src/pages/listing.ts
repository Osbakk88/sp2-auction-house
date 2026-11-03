import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { getListing } from "../services/listings";

renderHeader();
renderFooter();

const status = document.querySelector<HTMLParagraphElement>("#listing-status");
const titleEl = document.querySelector<HTMLHeadingElement>("#listing-title");

async function loadListing() {
  if (!status || !titleEl) return;

  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    status.textContent = "Error: No listing selected.";
    return;
  }

  status.textContent = "Loading listing...";
  try {
    const result = await getListing(id);
    titleEl.textContent = result.data.title;
    document.title = `${result.data.title} | Atrium Auctionarium`;
    console.log(result.data);
    status.textContent = "";
  } catch (error) {
    status.textContent =
      error instanceof Error
        ? `Error: ${error.message}`
        : "Could not load listing.";
  }
}

loadListing();
