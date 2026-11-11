import type {
  ListingsResponse,
  SingleListingResponse,
  CreateListingRequest,
  ListingResponse,
} from "../types/listing";
import { getApiKey, getToken } from "../utils/storage";

const BASE_URL = "https://v2.api.noroff.dev/auction/listings";

export async function getListings(
  page = 1,
  query = "",
): Promise<ListingsResponse> {
  const params = new URLSearchParams({
    limit: "12",
    page: String(page),
    sort: "created",
    sortOrder: "desc",
    _active: "true",
  });
  if (query) params.set("q", query);

  const endpoint = query ? `${BASE_URL}/search` : BASE_URL;
  const response = await fetch(`${endpoint}?${params}`);
  const result = await response.json();
  if (!response.ok) {
    const message = result.errors?.[0]?.message ?? "An unknown error occurred";
    throw new Error(message);
  }
  return result;
}

export async function getListing(id: string): Promise<SingleListingResponse> {
  const response = await fetch(`${BASE_URL}/${id}?_seller=true&_bids=true`);
  const result = await response.json();
  if (!response.ok) {
    const message = result.errors?.[0]?.message ?? "An unknown error occurred";
    throw new Error(message);
  }
  return result;
}

export async function createListing(
  body: CreateListingRequest,
): Promise<ListingResponse> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error("You must be logged in to create a listing.");
  }

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  if (!response.ok) {
    const message = result.errors?.[0]?.message ?? "Could not create listing";
    throw new Error(message);
  }
  return result;
}
