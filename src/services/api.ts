import { authService } from "@/services/auth";
import { boardService } from "@/services/board";

export const api = {
  auth: authService,
  board: boardService,
};
