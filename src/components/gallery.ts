import type { Media } from "../types/listing";

const THUMB_BASE =
  "overflow-hidden rounded border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D18B]";
const THUMB_SELECTED = `${THUMB_BASE} border-[#D4AF37]`;
const THUMB_IDLE = `${THUMB_BASE} border-transparent`;

export function createGallery(media: Media[], title: string): HTMLDivElement {
  const gallery = document.createElement("div");
  gallery.className = "flex max-w-2xl flex-col gap-3";

  const first = media[0];
  const mainImage = document.createElement("img");
  mainImage.src = first ? first.url : "/placeholder.svg";
  mainImage.alt = first ? first.alt || title : `No image for ${title}`;
  mainImage.className = "aspect-[3/2] w-full max-w-2xl rounded-lg object-cover";
  mainImage.onerror = () => {
    mainImage.onerror = null;
    mainImage.src = "/placeholder.svg";
  };
  gallery.appendChild(mainImage);

  if (media.length <= 1) return gallery;

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
    button.className = index === 0 ? THUMB_SELECTED : THUMB_IDLE;
    if (index === 0) button.setAttribute("aria-current", "true");

    const thumb = document.createElement("img");
    thumb.src = item.url;
    thumb.alt = "";
    thumb.className = "h-16 w-24 object-cover";
    thumb.onerror = () => {
      thumb.onerror = null;
      thumb.src = "/placeholder.svg";
    };

    button.addEventListener("click", () => {
      mainImage.onerror = () => {
        mainImage.onerror = null;
        mainImage.src = "/placeholder.svg";
      };
      mainImage.src = item.url;
      mainImage.alt = item.alt || title;
      buttons.forEach((other) => {
        other.removeAttribute("aria-current");
        other.className = THUMB_IDLE;
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
