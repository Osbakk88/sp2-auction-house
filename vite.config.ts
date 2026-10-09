import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        listings: "listings.html",
        listing: "listing.html",
        login: "login.html",
        register: "register.html",
        profile: "profile.html",
        createListing: "create-listing.html",
      },
    },
  },
});
