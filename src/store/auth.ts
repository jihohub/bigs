import { localStorageEffect } from "@/lib/recoil-persist";
import { User } from "@/types/auth";
import { atom, selector } from "recoil";

export const authState = atom<{
  user: User | null;
  isAuthenticated: boolean;
}>({
  key: "authState",
  default: {
    user: null,
    isAuthenticated: false,
  },
  effects: [localStorageEffect("auth")],
});

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    const auth = get(authState);
    return auth.user;
  },
});
