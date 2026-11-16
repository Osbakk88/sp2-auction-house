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

// Rewritten by me after understanding the pattern (originally AI-assisted).
export async function getListings(
  page = 1,
  query = "",
  options: {
    sort?: string;
    sortOrder?: string;
    limit?: number;
    tag?: string;
  } = {},
): Promise<ListingsResponse> {
  const params = new URLSearchParams();

  params.set("limit", String(options.limit ?? 12));
  params.set("page", String(page));
  params.set("sort", options.sort ?? "created");
  params.set("sortOrder", options.sortOrder ?? "desc");
  params.set("_active", "true");

  if (query) {
    params.set("q", query);
  }

  if (options.tag) {
    params.set("_tag", options.tag);
  }

  let endpoint = BASE_URL;

  if (query) {
    endpoint = `${BASE_URL}/search`;
  }

  const response = await fetch(`${endpoint}?${params}`);
  const result = await response.json();

  if (!response.ok) {
    let message = "Unknown error occurred";

    if (result.errors && result.errors.length > 0) {
      message = result.errors[0].message;
    }

    throw new Error(message);
  }

  return result;
}

// Rewritten by me after understanding the pattern (originally AI-assisted).
export async function getListing(id: string): Promise<SingleListingResponse> {
  const response = await fetch(`${BASE_URL}/${id}?_seller=true&_bids=true`);
  const result = await response.json();

  if (!response.ok) {
    let message = "Could not fetch listing";

    if (result.errors && result.errors.length > 0) {
      message = result.errors[0].message;
    }

    throw new Error(message);
  }

  return result;
}

// Rewritten by me after understanding the pattern (originally AI-assisted).
export async function createListing(
  body: CreateListingRequest,
): Promise<ListingResponse> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error("Please log in to create a listing.");
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
    let message = "Listing not created";

    if (result.errors && result.errors.length > 0) {
      message = result.errors[0].message;
    }

    throw new Error(message);
  }

  return result;
}

// Rewritten by me after understanding the pattern (originally AI-assisted).
export async function placeBid(
  listingId: string,
  body: PlaceBidRequest,
): Promise<void> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error("Log in to place a bid.");
  }

  const response = await fetch(`${BASE_URL}/${listingId}/bids`, {
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
    let message = "Could not place your bid";

    if (result.errors && result.errors.length > 0) {
      message = result.errors[0].message;
    }

    throw new Error(message);
  }
}

// Rewritten by me after understanding the pattern (originally AI-assisted).
export async function deleteListing(id: string): Promise<void> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error("Log in to delete a listing.");
  }

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    const result = await response.json();

    let message = "Could not delete the listing";

    if (result.errors && result.errors.length > 0) {
      message = result.errors[0].message;
    }

    throw new Error(message);
  }
}

// Rewritten by me after understanding the pattern (originally AI-assisted).
export async function updateListing(
  id: string,
  body: UpdateListingRequest,
): Promise<ListingResponse> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error("Please log in to update a listing.");
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
    let message = "Unknown error occurred";

    if (result.errors && result.errors.length > 0) {
      message = result.errors[0].message;
    }

    throw new Error(message);
  }

  return result;
}
