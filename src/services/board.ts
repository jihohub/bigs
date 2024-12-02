import { axiosInstance } from "@/lib/axios";
import type {
  Board,
  BoardDetail,
  BoardListResponse,
  CategoryResponse,
  CreateBoardPayload,
  UpdateBoardPayload,
} from "@/types/board";

export const boardService = {
  // 게시글 목록 조회
  getBoards: async (page: number, size: number): Promise<BoardListResponse> => {
    const { data } = await axiosInstance.get<BoardListResponse>(
      `/boards?page=${page}&size=${size}`
    );
    return data;
  },

  // 게시글 상세 조회
  getBoardDetail: async (id: number): Promise<BoardDetail> => {
    const { data } = await axiosInstance.get<BoardDetail>(`/boards/${id}`);
    return data;
  },

  // 게시글 생성
  createBoard: async (payload: CreateBoardPayload): Promise<Board> => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    const { data } = await axiosInstance.post<Board>("/boards", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  // 게시글 수정
  updateBoard: async (payload: UpdateBoardPayload): Promise<Board> => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    const { data } = await axiosInstance.put<Board>(
      `/boards/${payload.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },

  // 게시글 삭제
  deleteBoard: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/boards/${id}`);
  },

  // 게시판 카테고리 조회
  getCategories: async (): Promise<CategoryResponse> => {
    const { data } = await axiosInstance.get<CategoryResponse>(
      "/boards/categories"
    );
    return data;
  },
};
