import { axiosInstance } from "@/lib/axios";
import { authState } from "@/store/auth";
import type { AuthResponse, SignInPayload, SignUpPayload } from "@/types/auth";
import { useSetRecoilState } from "recoil";

export const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  const signIn = async (payload: SignInPayload) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>(
        "/auth/sign-in",
        payload
      );
      localStorage.setItem("accessToken", data.accessToken);
      setAuth({ user: data.user, isAuthenticated: true });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (payload: SignUpPayload) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>(
        "/auth/sign-up",
        payload
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem("accessToken");
    setAuth({ user: null, isAuthenticated: false });
  };

  return { signIn, signUp, signOut };
};
