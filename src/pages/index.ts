import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { createListingCard } from "../components/listing-card";
import { getListings } from "../services/listings";
import { getToken } from "../utils/storage";

renderHeader();
renderFooter();

if (getToken()) {
  document.querySelector("#register-link")?.remove();
}

const endingStatus =
  document.querySelector<HTMLParagraphElement>("#ending-status");
const endingList = document.querySelector<HTMLUListElement>("#ending-soon");

async function loadEndingSoon() {
  if (!endingStatus || !endingList) return;

  endingStatus.textContent = "Loading listings...";
  try {
    const result = await getListings(1, "", {
      sort: "endsAt",
      sortOrder: "asc",
      limit: 3,
    });
    endingList.replaceChildren();

    if (result.data.length === 0) {
      endingStatus.textContent = "No listings are ending soon.";
      return;
    }

    for (const listing of result.data) {
      endingList.appendChild(createListingCard(listing, "h3"));
    }
    endingStatus.textContent = "";
  } catch (error) {
    endingStatus.textContent =
      error instanceof Error ? error.message : "Could not load listings.";
  }
}

loadEndingSoon();
