export interface ErrorDto {
  errorId: string;
  message: string;
  details?: string;
}

export interface ResponseDto<T> {
  success: boolean;
  data: T;
  error?: ErrorDto;
}