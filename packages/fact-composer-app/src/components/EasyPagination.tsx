import {ComponentProps} from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {cn} from "~/lib/utils";

type TProps = {
  total: number;
  offset: number;
  limit: number;
  className?: string;
  onPrevious: ComponentProps<typeof PaginationPrevious>["onClick"];
  onNext: ComponentProps<typeof PaginationNext>["onClick"];
};
export function EasyPagination({
  limit,
  offset,
  total,
  className,
  onNext,
  onPrevious,
}: TProps) {
  const start = offset + 1;
  const end = Math.min(limit, total);
  return (
    <div className={cn("flex", className)}>
      <span>
        {start} - {end} of {total}
      </span>
      <Pagination className="inline-flex w-fit mx-0">
        <PaginationContent>
          {start > 1 && (
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={onPrevious}
              />
            </PaginationItem>
          )}
          {end !== total && (
            <PaginationItem>
              <PaginationNext className="cursor-pointer" onClick={onNext} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
