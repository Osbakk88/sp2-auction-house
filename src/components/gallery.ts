// Rewritten by me after understanding the pattern (originally AI-assisted)
import type { Media } from "../types/listing";

const THUMB_BASE =
  "overflow-hidden rounded border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D18B]";

const THUMB_SELECTED = `${THUMB_BASE} border-[#D4AF37]`;
const THUMB_IDLE = `${THUMB_BASE} border-transparent`;

export function createGallery(media: Media[], title: string): HTMLDivElement {
  const gallery = document.createElement("div");
  gallery.className = "flex max-w-2xl flex-col gap-3";

  const mainImage = document.createElement("img");

  if (media.length > 0) {
    mainImage.src = media[0].url;
    mainImage.alt = media[0].alt || title;
  } else {
    mainImage.src = "/placeholder.svg";
    mainImage.alt = `No image for ${title}`;
  }

  mainImage.className = "aspect-[3/2] w-full max-w-2xl rounded-lg object-cover";

  mainImage.onerror = () => {
    mainImage.onerror = null;
    mainImage.src = "/placeholder.svg";
  };

  gallery.appendChild(mainImage);

  // No need for thumbnails if there is only one image
  if (media.length <= 1) {
    return gallery;
  }

  const thumbs = document.createElement("div");
  thumbs.className = "flex flex-wrap gap-2";

  const buttons: HTMLButtonElement[] = [];

  media.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute(
      "aria-label",
      `Show image ${index + 1} of ${media.length}`,
    );

    if (index === 0) {
      button.className = THUMB_SELECTED;
      button.setAttribute("aria-current", "true");
    } else {
      button.className = THUMB_IDLE;
    }

    const thumb = document.createElement("img");
    thumb.src = item.url;
    thumb.alt = "";
    thumb.className = "h-16 w-24 object-cover";

    thumb.onerror = () => {
      thumb.onerror = null;
      thumb.src = "/placeholder.svg";
    };

    button.addEventListener("click", () => {
      mainImage.src = item.url;
      mainImage.alt = item.alt || title;

      buttons.forEach((otherButton) => {
        otherButton.removeAttribute("aria-current");
        otherButton.className = THUMB_IDLE;
      });

      button.setAttribute("aria-current", "true");
      button.className = THUMB_SELECTED;
    });

    button.appendChild(thumb);
    buttons.push(button);
    thumbs.appendChild(button);
  });

  gallery.appendChild(thumbs);

  return gallery;
}
