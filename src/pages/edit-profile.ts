import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { getProfile, updateProfile } from "../services/profile";
import type { UpdateProfileRequest } from "../types/profile";
import { getName, getToken } from "../utils/storage";

renderHeader();
renderFooter();

const name = getName();

if (!getToken() || !name) {
  window.location.href = "/login.html";
}

const form = document.querySelector<HTMLFormElement>("#edit-profile-form");
const status = document.querySelector<HTMLParagraphElement>("#form-status");
const bioInput = document.querySelector<HTMLTextAreaElement>("#bio");
const avatarUrlInput = document.querySelector<HTMLInputElement>("#avatar-url");
const avatarAltInput = document.querySelector<HTMLInputElement>("#avatar-alt");
const bannerUrlInput = document.querySelector<HTMLInputElement>("#banner-url");
const bannerAltInput = document.querySelector<HTMLInputElement>("#banner-alt");

async function loadProfile() {
  if (!name || !status) return;
  if (!bioInput || !avatarUrlInput || !avatarAltInput) return;
  if (!bannerUrlInput || !bannerAltInput) return;

  try {
    status.textContent = "Loading profile...";
    const result = await getProfile(name);
    const profile = result.data;

    bioInput.value = profile.bio ?? "";
    avatarUrlInput.value = profile.avatar?.url ?? "";
    avatarAltInput.value = profile.avatar?.alt ?? "";
    bannerUrlInput.value = profile.banner?.url ?? "";
    bannerAltInput.value = profile.banner?.alt ?? "";
    status.textContent = "";
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Could not load profile.";
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!name || !status) return;

  const data = new FormData(form);
  const bio = String(data.get("bio")).trim();
  const avatarUrl = String(data.get("avatar-url")).trim();
  const avatarAlt = String(data.get("avatar-alt")).trim();
  const bannerUrl = String(data.get("banner-url")).trim();
  const bannerAlt = String(data.get("banner-alt")).trim();

  if (bio.length > 160) {
    status.textContent = "The bio can be at most 160 characters.";
    return;
  }
  if (avatarAlt.length > 120 || bannerAlt.length > 120) {
    status.textContent = "Image descriptions can be at most 120 characters.";
    return;
  }

  const body: UpdateProfileRequest = { bio };
  if (avatarUrl) body.avatar = { url: avatarUrl, alt: avatarAlt };
  if (bannerUrl) body.banner = { url: bannerUrl, alt: bannerAlt };

  const button = form.querySelector<HTMLButtonElement>("button[type=submit]");

  try {
    if (button) button.disabled = true;
    status.textContent = "Saving...";
    await updateProfile(name, body);
    status.textContent = "Profile updated.";
    setTimeout(() => {
      window.location.href = "/profile.html";
    }, 1000);
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Something went wrong.";
    if (button) button.disabled = false;
  }
});

loadProfile();
