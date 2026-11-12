import type {
  ListingsResponse,
  SingleListingResponse,
  CreateListingRequest,
  ListingResponse,
  PlaceBidRequest,
  UpdateListingRequest,
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

export async function placeBid(
  id: string,
  body: PlaceBidRequest,
): Promise<void> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error("You must be logged in to place a bid.");
  }

  const response = await fetch(`${BASE_URL}/${id}/bids`, {
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
    const message = result.errors?.[0]?.message ?? "Could not place bid";
    throw new Error(message);
  }
}

export async function deleteListing(id: string): Promise<void> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error("You must be logged in to delete a listing.");
  }

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not delete listing (${response.status})`);
  }
}

export async function updateListing(
  id: string,
  body: UpdateListingRequest,
): Promise<ListingResponse> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error("You must be logged in to edit a listing.");
  }

  const response = await fetch(`${BASE_URL}/${id}`, {
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
    const message = result.errors?.[0]?.message ?? "Could not update listing";
    throw new Error(message);
  }
  return result;
}
