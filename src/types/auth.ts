export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    name: string;
    email: string;
    accessToken: string;
  };
}

export interface ApiKeyResponse {
  data: {
    key: string;
  };
}
