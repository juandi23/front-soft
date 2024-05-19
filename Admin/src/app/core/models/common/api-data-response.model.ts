export interface ApiDataResponse<T> {
  data: T;
  meta?: {
    last_page: number;
  }
}
