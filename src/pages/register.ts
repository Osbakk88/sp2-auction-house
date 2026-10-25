import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";

renderHeader();
renderFooter();

const form = document.querySelector<HTMLFormElement>("#register-form");
const message = document.querySelector<HTMLParagraphElement>("#form-message");

if (form && message) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submitted");
  });
}
