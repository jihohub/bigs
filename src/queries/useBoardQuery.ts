import { api } from "@/services/api";
import type { CreateBoardPayload, UpdateBoardPayload } from "@/types/board";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBoardQuery = () => {
  const queryClient = useQueryClient();

  // 게시글 목록 조회
  const useBoards = (page: number, size: number) => {
    return useQuery({
      queryKey: ["boards", { page, size }],
      queryFn: () => api.board.getBoards(page, size),
    });
  };

  // 게시글 상세 조회
  const useBoardDetail = (id: number) => {
    return useQuery({
      queryKey: ["board", id],
      queryFn: () => api.board.getBoardDetail(id),
      enabled: !!id,
    });
  };

  // 카테고리 목록 조회
  const useCategories = () => {
    return useQuery({
      queryKey: ["categories"],
      queryFn: api.board.getCategories,
      staleTime: Infinity,
    });
  };

  // 게시글 작성
  const createBoardMutation = useMutation({
    mutationFn: (payload: CreateBoardPayload) => api.board.createBoard(payload),
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries({ queryKey: ["boards"] });
      }
    },
  });

  // 게시글 수정
  const updateBoardMutation = useMutation({
    mutationFn: (payload: UpdateBoardPayload) => api.board.updateBoard(payload),
    onSettled: (_, error, variables) => {
      if (!error) {
        queryClient.invalidateQueries({ queryKey: ["boards"] });
        queryClient.invalidateQueries({ queryKey: ["board", variables.id] });
      }
    },
  });

  // 게시글 삭제
  const deleteBoardMutation = useMutation({
    mutationFn: (id: number) => api.board.deleteBoard(id),
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries({ queryKey: ["boards"] });
      }
    },
  });

  return {
    useBoards,
    useBoardDetail,
    useCategories,
    createBoard: createBoardMutation.mutate,
    updateBoard: updateBoardMutation.mutate,
    deleteBoard: deleteBoardMutation.mutate,
    isCreateLoading: createBoardMutation.isPending,
    isUpdateLoading: updateBoardMutation.isPending,
    isDeleteLoading: deleteBoardMutation.isPending,
  };
};
