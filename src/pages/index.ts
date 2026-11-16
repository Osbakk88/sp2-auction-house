import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { createListingCard } from "../components/listing-card";
import { getListings } from "../services/listings";
import { getToken } from "../utils/storage";

renderHeader();
renderFooter();

// Rewritten by me after understanding the pattern (originally AI-assisted).
const token = getToken();

if (token) {
  const registerLink = document.querySelector("#register-link");

  if (registerLink) {
    registerLink.remove();
  }
}

const endingStatus =
  document.querySelector<HTMLParagraphElement>("#ending-status");

const endingList = document.querySelector<HTMLUListElement>("#ending-soon");

// Rewritten by me after understanding the pattern (originally AI-assisted).
async function loadEndingSoon() {
  if (!endingStatus || !endingList) {
    return;
  }

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
      const card = createListingCard(listing, "h3");
      endingList.appendChild(card);
    }

    endingStatus.textContent = "";
  } catch (error) {
    if (error instanceof Error) {
      endingStatus.textContent = error.message;
    } else {
      endingStatus.textContent = "Could not load listings.";
    }
  }
}

loadEndingSoon();
