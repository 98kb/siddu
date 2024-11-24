import {ComponentProps} from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

type TProps = {
  onPrevious: ComponentProps<typeof PaginationPrevious>["onClick"];
  onNext: ComponentProps<typeof PaginationNext>["onClick"];
};
export function EasyPagination({onNext, onPrevious}: TProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={onPrevious} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={onNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
