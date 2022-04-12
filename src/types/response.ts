export interface MetaPaginationResponse {
  page: number;
  perPage: number;
  total: number;
  totalPage: number;
}

export interface StdResponse<T = any> {
  meta?: MetaPaginationResponse | null;
  data?: T;
  message: string;
  statusCode: number;
}
