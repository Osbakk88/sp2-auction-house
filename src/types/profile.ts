import type { Listing, ListingsResponse, Media } from "./listing";

export interface Profile {
  name: string;
  email: string;
  bio: string | null;
  avatar: Media | null;
  banner: Media | null;
  credits: number;
  _count: {
    listings: number;
    wins: number;
  };
}

export interface ProfileResponse {
  data: Profile;
}

export interface UpdateProfileRequest {
  bio?: string;
  avatar?: Media;
  banner?: Media;
}

export interface ProfileBid {
  id: string;
  amount: number;
  created: string;
  listing: Listing | null;
}

export interface ProfileBidsResponse {
  data: ProfileBid[];
  meta: ListingsResponse["meta"];
}
