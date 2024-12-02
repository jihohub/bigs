export interface ApiError {
  message: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  size: number;
}
