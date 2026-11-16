import type { Media } from "../types/listing";

// Rewritten by me after understanding the pattern (originally AI-assisted).
export function parseImageUrls(text: string, title: string): Media[] {
  const lines = text.split("\n");
  const urls = lines.map((line) => line.trim());
  const filteredUrls = urls.filter((url) => url !== "");

  const images = filteredUrls.map((url, index) => {
    return {
      url: url,
      alt: `${title} (image ${index + 1})`,
    };
  });

  return images;
}
