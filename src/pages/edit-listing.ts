import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { getListing, updateListing } from "../services/listings";
import { getName, getToken } from "../utils/storage";

renderHeader();
renderFooter();

if (!getToken()) {
  window.location.href = "/login.html";
}

const id = new URLSearchParams(window.location.search).get("id");

const form = document.querySelector<HTMLFormElement>("#create-form");
const status = document.querySelector<HTMLParagraphElement>("#form-status");
const titleInput = document.querySelector<HTMLInputElement>("#title");
const descriptionInput =
  document.querySelector<HTMLTextAreaElement>("#description");
const imageInput = document.querySelector<HTMLInputElement>("#image");
const tagsInput = document.querySelector<HTMLInputElement>("#tags");

async function loadListing() {
  if (!id || !status || !titleInput || !descriptionInput) return;
  if (!imageInput || !tagsInput) return;

  try {
    status.textContent = "Loading listing...";
    const result = await getListing(id);
    const listing = result.data;

    if (listing.seller.name !== getName()) {
      window.location.href = `/listing.html?id=${id}`;
      return;
    }

    titleInput.value = listing.title;
    descriptionInput.value = listing.description ?? "";
    imageInput.value = listing.media[0]?.url ?? "";
    tagsInput.value = listing.tags.join(", ");
    status.textContent = "";
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Could not load listing.";
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!id || !status) return;

  const data = new FormData(form);
  const title = String(data.get("title")).trim();
  const description = String(data.get("description")).trim();
  const imageUrl = String(data.get("image")).trim();
  const tagsText = String(data.get("tags")).trim();

  if (!title) {
    status.textContent = "Please fill in a title.";
    return;
  }

  const tags = tagsText
    ? tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  try {
    status.textContent = "Saving...";
    await updateListing(id, {
      title,
      description: description || undefined,
      tags,
      media: imageUrl ? [{ url: imageUrl, alt: title }] : [],
    });
    window.location.href = `/listing.html?id=${id}`;
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Something went wrong.";
  }
});

loadListing();
