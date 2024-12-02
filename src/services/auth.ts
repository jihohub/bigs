import { axiosInstance } from "@/lib/axios";
import type { AuthResponse, SignInPayload, SignUpPayload } from "@/types/auth";

export const authService = {
  signIn: async (payload: SignInPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>(
      "/auth/sign-in",
      payload
    );
    return data;
  },

  signUp: async (payload: SignUpPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>(
      "/auth/sign-up",
      payload
    );
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
  },
};
