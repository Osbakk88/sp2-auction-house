const TOKEN_KEY = "accessToken";
const NAME_KEY = "userName";
const API_KEY_KEY = "apiKey";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function saveApiKey(key: string) {
  localStorage.setItem(API_KEY_KEY, key);
}
export function getApiKey() {
  return localStorage.getItem(API_KEY_KEY);
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
  localStorage.removeItem(API_KEY_KEY);
}
