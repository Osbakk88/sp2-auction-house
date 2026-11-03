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
      li.textContent = listing.title;
      list.appendChild(li);
    }

    status.textContent = "";
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Could not load listings.";
  }
}

loadListings();
