import {FallbackProps} from "react-error-boundary";
import {Button} from "./ui/button";

export function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="flex flex-col gap-10 h-full w-full justify-center items-center">
      <div className="flex flex-col gap-1 items-center">
        <div className="text-4xl font-bold">Something went wrong!</div>
        <kbd className="text-thin bg-gray-100">{toErrMessage(error)}</kbd>
      </div>
      <Button onClick={resetErrorBoundary}>Retry</Button>
    </div>
  );
}

function toErrMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "";
}
