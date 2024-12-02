export type BoardCategory = "NOTICE" | "FREE" | "QNA" | "ETC";

export interface Board {
  id: number;
  title: string;
  content?: string;
  category: BoardCategory;
  imageUrl?: string;
  createdAt: string;
}

export interface BoardDetail extends Board {
  content: string;
}

export interface CreateBoardPayload {
  title: string;
  content: string;
  category: BoardCategory;
  image?: File;
}

export interface UpdateBoardPayload {
  id: number;
  title: string;
  content: string;
  category: BoardCategory;
  image?: File;
}

export interface BoardListResponse {
  content: Board[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  empty: boolean;
}

export interface CategoryResponse {
  NOTICE: string;
  FREE: string;
  QNA: string;
  ETC: string;
}
