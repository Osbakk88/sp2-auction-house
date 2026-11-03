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
    const content = document.querySelector<HTMLDivElement>("#listing-content");
    if (!content) {
      status.textContent = "Error: Listing container not found.";
      return;
    }
    document.title = `${result.data.title} | Atrium Auctionarium`;
    const listing = result.data;

    const firstImage = listing.media[0];
    const img = document.createElement("img");
    img.src = firstImage ? firstImage.url : "/placeholder.svg";
    img.alt = firstImage
      ? firstImage.alt || listing.title
      : `No image for ${listing.title}`;
    img.className = "h-72 w-full max-w-2xl rounded-lg object-cover";
    img.onerror = () => {
      img.onerror = null;
      img.src = "/placeholder.svg";
    };

    const description = document.createElement("p");
    description.textContent = listing.description ?? "No description provided.";
    description.className = "mt-4 max-w-2xl";

    const seller = document.createElement("p");
    seller.textContent = `Seller: ${listing.seller.name}`;
    seller.className = "mt-4 text-[#A8A296]";

    const ends = document.createElement("p");
    ends.textContent = `Ends: ${new Date(listing.endsAt).toLocaleString(
      "en-GB",
      {
        dateStyle: "medium",
        timeStyle: "short",
      },
    )}`;
    ends.className = "text-[#A8A296]";

    content.appendChild(img);
    content.appendChild(description);
    content.appendChild(seller);
    content.appendChild(ends);

    const bidsHeading = document.createElement("h2");
    bidsHeading.textContent = "Bid history";
    bidsHeading.className = "mt-8 font-display text-xl";

    const bidList = document.createElement("ul");
    bidList.className = "mt-2 max-w-2xl space-y-2";

    if (listing.bids.length === 0) {
      const empty = document.createElement("li");
      empty.textContent = "No bids yet.";
      bidList.appendChild(empty);
    } else {
      const sortedBids = [...listing.bids].sort((a, b) => b.amount - a.amount);
      for (const bid of sortedBids) {
        const item = document.createElement("li");
        const when = new Date(bid.created).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short",
        });
        item.textContent = `${bid.bidder.name}: ${bid.amount} credits (${when})`;
        bidList.appendChild(item);
      }
    }

    content.appendChild(bidsHeading);
    content.appendChild(bidList);

    status.textContent = "";
  } catch (error) {
    status.textContent =
      error instanceof Error
        ? `Error: ${error.message}`
        : "Could not load listing.";
  }
}

loadListing();
