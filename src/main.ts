import "./style.css";

const API_URL = "https://v2.api.noroff.dev/auction/listings?limit=20";

async function loadListings() {
  const response = await fetch(API_URL);
  const result = await response.json();
  console.log(result.data);

  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = result.data
    .map((listing: any) => {
      const imageUrl = listing.media?.[0]?.url ?? "";
      return `
        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
          <h3>${listing.title}</h3>
          ${imageUrl ? `<img src="${imageUrl}" width="200" onerror="this.style.display='none'">` : "<p>Ingen bilde</p>"}
        </div>
      `;
    })
    .join("");
}

loadListings();
