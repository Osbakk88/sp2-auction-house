import type { Media } from "./listing";

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
