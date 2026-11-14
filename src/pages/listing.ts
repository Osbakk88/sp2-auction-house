import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { deleteListing, getListing, placeBid } from "../services/listings";
import { getProfile } from "../services/profile";
import { getName, getToken } from "../utils/storage";

renderHeader();
renderFooter();

const status = document.querySelector<HTMLParagraphElement>("#listing-status");
const titleEl = document.querySelector<HTMLHeadingElement>("#listing-title");

function confirmDialog(
  message: string,
  confirmLabel: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    const dialog = document.createElement("dialog");
    dialog.className =
      "m-auto w-[90%] max-w-sm rounded-lg border border-[#D4AF37] bg-[#0B0B0C] p-6 text-[#F4D18B] backdrop:bg-black/70";
    dialog.setAttribute("aria-labelledby", "confirm-message");

    const text = document.createElement("p");
    text.id = "confirm-message";
    text.className = "text-lg";
    text.textContent = message;

    const actions = document.createElement("div");
    actions.className = "mt-6 flex justify-end gap-3";

    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = "Cancel";
    cancel.className =
      "rounded border border-[#A8A296] px-4 py-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D18B]";

    const confirm = document.createElement("button");
    confirm.type = "button";
    confirm.textContent = confirmLabel;
    confirm.className =
      "rounded border border-red-400 px-4 py-2 text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D18B]";

    cancel.addEventListener("click", () => dialog.close("cancel"));
    confirm.addEventListener("click", () => dialog.close("confirm"));
    dialog.addEventListener("close", () => {
      dialog.remove();
      resolve(dialog.returnValue === "confirm");
    });

    actions.append(cancel, confirm);
    dialog.append(text, actions);
    document.body.appendChild(dialog);
    dialog.showModal();
  });
}

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
    content.replaceChildren();

    const firstImage = listing.media[0];
    const img = document.createElement("img");
    img.src = firstImage ? firstImage.url : "/placeholder.svg";
    img.alt = firstImage
      ? firstImage.alt || listing.title
      : `No image for ${listing.title}`;
    img.className = "aspect-[3/2] w-full max-w-2xl rounded-lg object-cover";
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

    const bidSection = document.createElement("div");
    bidSection.className = "mt-8 max-w-2xl";

    const userName = getName();
    const ended = new Date(listing.endsAt) <= new Date();

    if (ended) {
      bidSection.textContent = "This auction has ended.";
    } else if (!getToken() || !userName) {
      const login = document.createElement("a");
      login.href = "/login.html";
      login.textContent = "Log in to place a bid.";
      login.className = "underline";
      bidSection.appendChild(login);
    } else if (listing.seller.name === userName) {
      bidSection.textContent = "You can't bid on your own listing.";
    } else {
      const form = document.createElement("form");
      form.className = "flex flex-col gap-2";
      form.noValidate = true;

      const label = document.createElement("label");
      label.htmlFor = "bid-amount";
      label.textContent = "Your bid (credits)";
      label.className = "text-sm text-[#A8A296]";

      const input = document.createElement("input");
      input.id = "bid-amount";
      input.type = "number";
      input.min = "1";
      input.className =
        "rounded border border-[#A8A296] bg-transparent px-3 py-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D18B]";

      const message = document.createElement("p");
      message.setAttribute("role", "alert");
      message.className = "text-sm";

      const button = document.createElement("button");
      button.type = "submit";
      button.textContent = "Place bid";
      button.className =
        "self-start rounded bg-[#D4AF37] px-4 py-2 font-semibold text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D18B]";

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const amount = Number(input.value);
        const highest = Math.max(0, ...listing.bids.map((bid) => bid.amount));

        if (!Number.isFinite(amount) || amount <= highest) {
          message.textContent = `Your bid must be higher than ${highest}.`;
          return;
        }

        try {
          button.disabled = true;
          message.textContent = "Placing bid...";
          const profile = await getProfile(userName);
          if (profile.data.credits < amount) {
            message.textContent = `You only have ${profile.data.credits} credits.`;
            return;
          }
          await placeBid(id, { amount });
          await loadListing();
          renderHeader();
          if (status) status.textContent = "Your bid was placed.";
        } catch (error) {
          message.textContent =
            error instanceof Error ? error.message : "Could not place bid.";
        } finally {
          button.disabled = false;
        }
      });

      form.append(label, input, message, button);
      bidSection.appendChild(form);
    }

    content.appendChild(bidSection);

    if (userName && listing.seller.name === userName) {
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.textContent = "Delete listing";
      deleteButton.className =
        "mt-6 rounded border border-red-400 px-4 py-2 text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D18B]";

      deleteButton.addEventListener("click", async () => {
        const confirmed = await confirmDialog(
          "Delete this listing? This can't be undone.",
          "Delete",
        );
        if (!confirmed) return;

        try {
          deleteButton.disabled = true;
          await deleteListing(id);
          window.location.href = "/listings.html";
        } catch (error) {
          deleteButton.disabled = false;
          if (status) {
            status.textContent =
              error instanceof Error
                ? `Error: ${error.message}`
                : "Could not delete listing.";
          }
        }
      });

      const editLink = document.createElement("a");
      editLink.href = `/edit-listing.html?id=${id}`;
      editLink.textContent = "Edit listing";
      editLink.className =
        "mt-6 mr-4 inline-block rounded border border-[#D4AF37] px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D18B]";
      content.appendChild(editLink);

      content.appendChild(deleteButton);
    }

    status.textContent = "";
  } catch (error) {
    status.textContent =
      error instanceof Error
        ? `Error: ${error.message}`
        : "Could not load listing.";
  }
}

loadListing();
