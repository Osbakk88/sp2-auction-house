import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import type { RegisterRequest } from "../types/auth";
import { registerUser } from "../services/auth";

renderHeader();
renderFooter();

const form = document.querySelector<HTMLFormElement>("#register-form");
const message = document.querySelector<HTMLParagraphElement>("#form-message");

if (form && message) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const body: RegisterRequest = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    try {
      await registerUser(body);
      message.textContent = "Registration successful.";
      form.reset();
    } catch (error) {
      message.textContent =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
    }
  });
}
