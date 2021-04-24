export interface PaginatedResponse<T> {
  page: number;
  pages: number;
  total: number;
  collection: T[];
}
