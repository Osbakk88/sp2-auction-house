import type { Media } from "../types/listing";

export function parseImageUrls(text: string, title: string): Media[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((url, index) => ({ url, alt: `${title} (image ${index + 1})` }));
}
