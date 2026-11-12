export interface Media {
  url: string;
  alt: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string | null;
  media: Media[];
  tags: string[];
  created: string;
  endsAt: string;
  _count: { bids: number };
}

export interface ListingsResponse {
  data: Listing[];
  meta: {
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

export interface Seller {
  name: string;
}

export interface Bid {
  id: string;
  amount: number;
  created: string;
  bidder: {
    name: string;
  };
}

export interface SingleListing extends Listing {
  seller: Seller;
  bids: Bid[];
}

export interface SingleListingResponse {
  data: SingleListing;
}

export interface CreateListingRequest {
  title: string;
  description?: string;
  tags?: string[];
  media?: Media[];
  endsAt: string;
}

export interface ListingResponse {
  data: Listing;
}

export interface PlaceBidRequest {
  amount: number;
}

export interface UpdateListingRequest {
  title?: string;
  description?: string;
  tags?: string[];
  media?: Media[];
}
