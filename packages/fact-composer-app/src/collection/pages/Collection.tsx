import {Button} from "~/components/ui/button";
import {CollectionNav} from "../features/CollectionNav";
import {PlusIcon} from "lucide-react";
import {FactsGrid} from "../features/FactsGrid";

export function Collection() {
  return (
    <div className="flex w-full h-full">
      <CollectionNav labels={[]} />
      <div className="flex flex-col w-full h-full py-5 px-4 overflow-y-scroll max-h-[540px] pb-14">
        <div className="flex w-full">
          <Button variant="ghost" size="sm" onClick={() => {}}>
            <PlusIcon size="15" /> Add Fact
          </Button>
        </div>
        <FactsGrid highlightedFacts={[]} onClick={() => {}} />
      </div>
    </div>
  );
}
