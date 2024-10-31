import {TooltipProvider} from "~/components/ui/tooltip";
import {DbSync} from "../features/DbSync";

export function AccountPage() {
  return (
    <TooltipProvider>
      <div className="flex flex-col justify-between py-10 w-full h-full">
        <DbSync />
      </div>
    </TooltipProvider>
  );
}
