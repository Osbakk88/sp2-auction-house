import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { createListing } from "../services/listings";
import { getToken } from "../utils/storage";

renderHeader();
renderFooter();

if (!getToken()) {
  window.location.href = "/login.html";
}

const form = document.querySelector<HTMLFormElement>("#create-form");
const status = document.querySelector<HTMLParagraphElement>("#form-status");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!status) return;

  const data = new FormData(form);
  const title = String(data.get("title")).trim();
  const description = String(data.get("description")).trim();
  const imageUrl = String(data.get("image")).trim();
  const tagsText = String(data.get("tags")).trim();
  const endsAtValue = String(data.get("endsAt"));

  if (!title || !endsAtValue) {
    status.textContent = "Please fill in a title and an end date.";
    return;
  }

  const endsAt = new Date(endsAtValue);
  if (endsAt <= new Date()) {
    status.textContent = "The end date must be in the future.";
    return;
  }

  const tags = tagsText
    ? tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  try {
    status.textContent = "Publishing...";
    const result = await createListing({
      title,
      description: description || undefined,
      tags,
      media: imageUrl ? [{ url: imageUrl, alt: title }] : [],
      endsAt: endsAt.toISOString(),
    });
    window.location.href = `/listing.html?id=${result.data.id}`;
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Something went wrong.";
  }
});
