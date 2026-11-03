import type { ListingsResponse, SingleListingResponse } from "../types/listing";

const BASE_URL = "https://v2.api.noroff.dev/auction/listings";

export async function getListings(page = 1): Promise<ListingsResponse> {
  const params = new URLSearchParams({
    limit: "12",
    page: String(page),
    sort: "created",
    sortOrder: "desc",
    _active: "true",
  });
  const response = await fetch(`${BASE_URL}?${params}`);
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
