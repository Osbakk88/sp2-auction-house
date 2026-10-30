import { renderHeader } from "../components/header";
import { renderFooter } from "../components/footer";
import type { LoginRequest } from "../types/auth";
import { loginUser } from "../services/auth";
import { saveToken } from "../utils/storage";

renderHeader();
renderFooter();

const form = document.querySelector<HTMLFormElement>("#login-form");
const message = document.querySelector<HTMLParagraphElement>("#form-message");

if (form && message) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const body: LoginRequest = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    try {
      const result = await loginUser(body);
      saveToken(result.data.accessToken);
      message.textContent = "Log in successful.";
      message.className = "min-h-6 text-green-400";
      form.reset();

      setTimeout(() => {
        window.location.href = "/index.html";
      }, 1500);
    } catch (error) {
      const text =
        error instanceof Error
          ? error.message
          : "Log in failed. Please try again.";

      message.textContent = `Error: ${text}`;
      message.className = "min-h-6 text-red-400";
    }
  });
}
