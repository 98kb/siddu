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
  return (
    <div className={cn("flex", className)}>
      <span>
        {offset + 1} - {Math.min(limit, total)} of {total}
      </span>
      <Pagination className="inline-flex w-fit mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={onPrevious}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext className="cursor-pointer" onClick={onNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
