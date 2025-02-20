export * from "./openRouter";

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  token: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  metadata?: {
    total: number;
    page: number;
    limit: number;
  };
}
