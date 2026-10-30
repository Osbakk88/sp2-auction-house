import type {
  ApiKeyResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/auth";

export async function registerUser(body: RegisterRequest) {
  const response = await fetch("https://v2.api.noroff.dev/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message ?? "Something went wrong";
    throw new Error(message);
  }

  return result;
}

export async function loginUser(body: LoginRequest): Promise<LoginResponse> {
  const response = await fetch("https://v2.api.noroff.dev/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message ?? "Something went wrong";
    throw new Error(message);
  }
  return result;
}

export async function createApiKey(token: string): Promise<ApiKeyResponse> {
  const response = await fetch(
    "https://v2.api.noroff.dev/auth/create-api-key",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: "Atrium Auctionarium key" }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message ?? "Something went wrong";
    throw new Error(message);
  }
  return result;
}
