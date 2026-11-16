// Rewritten by me, using my other form pages as a model (originally AI-assisted).
import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { getListing, updateListing } from "../services/listings";
import { getName, getToken } from "../utils/storage";
import { parseImageUrls } from "../utils/images";

renderHeader();
renderFooter();

if (!getToken()) {
  window.location.href = "/login.html";
}

const id = new URLSearchParams(window.location.search).get("id");

if (!id) {
  window.location.href = "/listings.html";
}

const form = document.querySelector<HTMLFormElement>("#edit-form");
const status = document.querySelector<HTMLParagraphElement>("#form-status");
const titleInput = document.querySelector<HTMLInputElement>("#title");
const descriptionInput =
  document.querySelector<HTMLTextAreaElement>("#description");
const imageInput = document.querySelector<HTMLTextAreaElement>("#images");
const tagsInput = document.querySelector<HTMLInputElement>("#tags");
const submitButton =
  document.querySelector<HTMLButtonElement>("#submit-button");

async function loadListing() {
  if (
    !id ||
    !status ||
    !titleInput ||
    !descriptionInput ||
    !imageInput ||
    !tagsInput ||
    !submitButton
  ) {
    return;
  }

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

    const imageUrls = listing.media.map((image) => image.url);
    imageInput.value = imageUrls.join("\n");

    tagsInput.value = listing.tags.join(", ");

    status.textContent = "";
    submitButton.disabled = false;
  } catch (error) {
    if (error instanceof Error) {
      status.textContent = error.message;
    } else {
      status.textContent = "Could not load your listing.";
    }
  }
}

loadListing();

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!id || !status || !form || !submitButton) {
    return;
  }

  const data = new FormData(form);

  const title = String(data.get("title")).trim();
  const description = String(data.get("description")).trim();
  const imagesText = String(data.get("images"));
  const tagsText = String(data.get("tags")).trim();

  if (!title) {
    status.textContent = "Please fill in a title.";
    return;
  }

  let tags: string[] = [];

  if (tagsText) {
    const splitTags = tagsText.split(",");
    const trimmedTags = splitTags.map((tag) => tag.trim());
    tags = trimmedTags.filter((tag) => tag !== "");
  }

  try {
    status.textContent = "Saving...";
    submitButton.disabled = true;

    const images = parseImageUrls(imagesText, title);

    await updateListing(id, {
      title: title,
      description: description,
      tags: tags,
      media: images,
    });

    window.location.href = `/listing.html?id=${id}`;
  } catch (error) {
    if (error instanceof Error) {
      status.textContent = error.message;
    } else {
      status.textContent = "Something went wrong, please try again.";
    }

    submitButton.disabled = false;
  }
});
