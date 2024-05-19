export interface ApiResponse {
  message: string;
  errors?: Map<string, string[]>;
}
