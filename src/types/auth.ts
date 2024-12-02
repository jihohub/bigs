export interface User {
  id: string;
  username: string;
  name: string;
}

export interface SignInPayload {
  username: string;
  password: string;
}

export interface SignUpPayload extends SignInPayload {
  name: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
