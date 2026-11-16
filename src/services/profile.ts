import type { ListingsResponse } from "../types/listing";
import type {
  ProfileBidsResponse,
  ProfileResponse,
  UpdateProfileRequest,
} from "../types/profile";
import { getApiKey, getToken } from "../utils/storage";

const BASE_URL = "https://v2.api.noroff.dev/auction/profiles";

export async function getProfile(name: string): Promise<ProfileResponse> {
  const token = getToken();
  const apiKey = getApiKey();
  if (!token || !apiKey) {
    throw new Error("You must be logged in to view a profile.");
  }

  const response = await fetch(`${BASE_URL}/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    const message = result.errors?.[0]?.message ?? "An unknown error occurred";
    throw new Error(message);
  }
  return result;
}

// Rewritten by me after understanding the pattern (originally AI-assisted).
export async function updateProfile(
  name: string,
  body: UpdateProfileRequest,
): Promise<ProfileResponse> {
  const token = getToken();
  const apiKey = getApiKey();
  if (!token || !apiKey) {
    throw new Error("Log in to edit your profile.");
  }
  const response = await fetch(`${BASE_URL}/${name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) {
    const message =
      result.errors?.[0]?.message ?? "Could not update the profile";
    throw new Error(message);
  }
  return result;
}

// Rewritten by me after understanding the pattern (originally AI-assisted).
export async function getProfileListings(
  name: string,
): Promise<ListingsResponse> {
  const token = getToken();
  const apiKey = getApiKey();
  if (!token || !apiKey) {
    throw new Error("Log in to view your profile.");
  }

  const response = await fetch(`${BASE_URL}/${name}/listings`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    const message = result.errors?.[0]?.message ?? "Unknown error occurred";
    throw new Error(message);
  }
  return result;
}

// Rewritten by me after understanding the pattern (originally AI-assisted).
export async function getProfileBids(
  name: string,
): Promise<ProfileBidsResponse> {
  const token = getToken();
  const apiKey = getApiKey();
  if (!token || !apiKey) {
    throw new Error("You must be logged in to view bids.");
  }

  const response = await fetch(`${BASE_URL}/${name}/bids?_listings=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    const message = result.errors?.[0]?.message ?? "Unknown error occurred";
    throw new Error(message);
  }
  return result;
}
