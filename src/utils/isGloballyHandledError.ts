export function isGloballyHandledError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "_handledGlobally" in error &&
    (error as Record<string, unknown>)._handledGlobally === true
  );
}