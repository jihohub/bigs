import { axiosInstance } from "@/lib/axios";
import { boardListState, currentPageState } from "@/store/board";
import type {
  Board,
  BoardDetail,
  BoardListResponse,
  CreateBoardPayload,
  PaginationParams,
  UpdateBoardPayload,
} from "@/types/board";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useBoard = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const setBoardList = useSetRecoilState(boardListState);

  const getBoards = async ({ page, size }: PaginationParams) => {
    try {
      const { data } = await axiosInstance.get<BoardListResponse>(
        `/boards?page=${page}&size=${size}`
      );
      setBoardList(data.content);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getBoardDetail = async (id: number) => {
    try {
      const { data } = await axiosInstance.get<BoardDetail>(`/boards/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const createBoard = async (payload: CreateBoardPayload) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const updateBoard = async (payload: UpdateBoardPayload) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const deleteBoard = async (id: number) => {
    try {
      await axiosInstance.delete(`/boards/${id}`);
    } catch (error) {
      throw error;
    }
  };

  return {
    currentPage,
    setCurrentPage,
    getBoards,
    getBoardDetail,
    createBoard,
    updateBoard,
    deleteBoard,
  };
};
