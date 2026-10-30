const TOKEN_KEY = "accessToken";
const NAME_KEY = "userName";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getName() {
  return localStorage.getItem(NAME_KEY);
}

export function saveName(name: string) {
  localStorage.setItem(NAME_KEY, name);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
}
