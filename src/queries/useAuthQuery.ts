import { api } from "@/services/api";
import { authState } from "@/store/auth";
import type { SignInPayload, SignUpPayload, User } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

export const useAuthQuery = () => {
  const setAuth = useSetRecoilState(authState);

  // 현재 사용자 정보 조회
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: api.auth.getCurrentUser,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    retry: false,
    select: (data: User) => {
      setAuth({ user: data, isAuthenticated: true });
      return data;
    },
    throwOnError: true,
  });

  // 로그인
  const signInMutation = useMutation({
    mutationFn: (payload: SignInPayload) => api.auth.signIn(payload),
    onSettled(data, error) {
      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        setAuth({ user: data.user, isAuthenticated: true });
      }
      if (error) {
        setAuth({ user: null, isAuthenticated: false });
      }
    },
  });

  // 회원가입
  const signUpMutation = useMutation({
    mutationFn: (payload: SignUpPayload) => api.auth.signUp(payload),
  });

  const signOut = () => {
    localStorage.removeItem("accessToken");
    setAuth({ user: null, isAuthenticated: false });
  };

  return {
    user,
    isLoading,
    signIn: signInMutation.mutate,
    signUp: signUpMutation.mutate,
    signOut,
    isSignInLoading: signInMutation.isPending,
    isSignUpLoading: signUpMutation.isPending,
  };
};
