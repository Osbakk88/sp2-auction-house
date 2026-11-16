import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { createListing } from "../services/listings";
import { getToken } from "../utils/storage";
import { parseImageUrls } from "../utils/images";

renderHeader();
renderFooter();

if (!getToken()) {
  window.location.href = "/login.html";
}

const form = document.querySelector<HTMLFormElement>("#create-form");
const status = document.querySelector<HTMLParagraphElement>("#form-status");

// Rewritten by me after understanding the pattern (originally AI-assisted)
form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!status) {
    return;
  }

  const data = new FormData(form);

  const title = String(data.get("title")).trim();
  const description = String(data.get("description")).trim();
  const imagesText = String(data.get("images"));
  const tagsText = String(data.get("tags")).trim();
  const endsAtValue = String(data.get("endsAt"));

  if (!title || !endsAtValue) {
    status.textContent = "Please fill in a title and an end date.";
    return;
  }

  const endsAt = new Date(endsAtValue);

  // The end date must be in the future (the API needs a valid deadline)
  if (endsAt <= new Date()) {
    status.textContent = "The end date must be in the future.";
    return;
  }

  let tags: string[] = [];

  if (tagsText) {
    const splitTags = tagsText.split(",");
    const trimmedTags = splitTags.map((tag) => tag.trim());

    tags = trimmedTags.filter((tag) => tag !== "");
  }

  try {
    status.textContent = "Publishing...";

    const images = parseImageUrls(imagesText, title);

    const result = await createListing({
      title: title,
      description: description || undefined,
      tags: tags,
      media: images,
      // The API expects the date in ISO format (UTC)
      endsAt: endsAt.toISOString(),
    });

    window.location.href = `/listing.html?id=${result.data.id}`;
  } catch (error) {
    if (error instanceof Error) {
      status.textContent = error.message;
    } else {
      status.textContent = "Something went wrong, please try again.";
    }
  }
});
