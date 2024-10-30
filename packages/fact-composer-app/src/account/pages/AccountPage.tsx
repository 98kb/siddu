import {TooltipProvider} from "~/components/ui/tooltip";
import {DbSync} from "../features/DbSync";

export function AccountPage() {
  return (
    <TooltipProvider>
      <div className="flex py-10 w-full">
        <DbSync />
      </div>
    </TooltipProvider>
  );
}
