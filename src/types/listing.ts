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
  meta: { currentPage: number; isLastPage: boolean; pageCount: number };
}
