import type { ProfileResponse } from "../types/profile";
import { getApiKey, getToken } from "../utils/storage";

const BASE_URL = "https://v2.api.noroff.dev/auction/profiles";

export async function getProfile(name: string): Promise<ProfileResponse> {
  const token = getToken();
  const apiKey = getApiKey();
  if (!token || !apiKey) {
    throw new Error("You must be logged in to view a profile.");
  }

  const response = await fetch(`${BASE_URL}/${encodeURIComponent(name)}`, {
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
