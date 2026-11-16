// Rewritten by me after understanding the pattern (originally AI-assisted)
import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import { getProfile, updateProfile } from "../services/profile";
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
      error instanceof Error ? error.message : "Could not load your profile.";
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
    status.textContent = "Maximum bio length is 160 characters.";
    return;
  }

  try {
    status.textContent = "Saving...";
    await updateProfile(name, {
      bio: bio,
      avatar: avatarUrl
        ? { url: avatarUrl, alt: avatarAlt || "Profile avatar" }
        : undefined,
      banner: bannerUrl
        ? { url: bannerUrl, alt: bannerAlt || "Profile banner" }
        : undefined,
    });
    status.textContent = "Your profile was updated successfully.";
  } catch (error) {
    status.textContent =
      error instanceof Error
        ? error.message
        : "Something went wrong, please try again.";
  }
});

loadProfile();
