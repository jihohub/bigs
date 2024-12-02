import { localStorageEffect } from "@/lib/recoil-persist";
import { Board, BoardCategory } from "@/types/board";
import { atom, selector } from "recoil";

export const boardListState = atom<Board[]>({
  key: "boardListState",
  default: [],
  effects: [localStorageEffect("boardList")],
});

export const boardFilterState = atom<{
  category: BoardCategory | null;
  searchQuery: string;
}>({
  key: "boardFilterState",
  default: {
    category: null,
    searchQuery: "",
  },
  effects: [localStorageEffect("boardFilter")],
});

export const currentPageState = atom<number>({
  key: "currentPageState",
  default: 0,
  effects: [localStorageEffect("currentPage")],
});

export const pageSizeState = atom<number>({
  key: "pageSizeState",
  default: 10,
  effects: [localStorageEffect("pageSize")],
});

export const filteredBoardsSelector = selector({
  key: "filteredBoardsSelector",
  get: ({ get }) => {
    const boards = get(boardListState);
    const filter = get(boardFilterState);

    return boards.filter((board) => {
      const categoryMatch =
        !filter.category || board.category === filter.category;
      const searchMatch =
        !filter.searchQuery ||
        board.title.toLowerCase().includes(filter.searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  },
});
