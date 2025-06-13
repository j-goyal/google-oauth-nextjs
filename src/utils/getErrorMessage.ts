export interface ErrorDto {
  errorId?: string;
  message?: string;
  details?: string;
}

export const getErrorMessage = (error?: ErrorDto): string => {
  return error?.message || error?.details || "Something went wrong";
};
