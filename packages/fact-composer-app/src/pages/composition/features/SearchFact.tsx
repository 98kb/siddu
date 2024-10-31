import {useAtom} from "jotai";
import {ListFilterIcon, SearchIcon} from "lucide-react";
import {IconButton} from "~/components/IconButton";
import {LabelsEditor} from "~/pages/labels/components/LabelsEditor";
import {SelectLabels} from "~/pages/labels/components/SelectLabels";
import {queryAtom} from "../stores/queryAtom";
import {TooltipProvider} from "@radix-ui/react-tooltip";
import {filterLabelsAtom} from "../stores/filterLabelsAtom";
import {Reader} from "fp-ts/lib/Reader";
import {Label} from "@repo/facts-db";
import {Input} from "~/components/ui/input";

export function SearchFact() {
  const [query, setQuery] = useAtom(queryAtom);
  const [filterLabels, setFilterLabels, toggleFilterLabel] = useFilterLabels();

  return (
    <TooltipProvider>
      <div className="flex flex-col py-2 gap-2">
        <div className="flex items-center border gap-3 pl-2 focus-within:border-foreground">
          <SearchIcon size={16} className="text-foreground" />
          <Input
            borderless
            type="text"
            placeholder="Type to search..."
            className="p-0"
            value={query}
            onInput={e => setQuery(e.currentTarget.value)}
          />
          <SelectLabels selected={filterLabels} onSelect={toggleFilterLabel}>
            {() => (
              <IconButton
                tooltip="Filter"
                role="combobox"
                side="left"
                sideOffset={5}
              >
                <ListFilterIcon className="h-4 w-4" />
              </IconButton>
            )}
          </SelectLabels>
        </div>
        {filterLabels.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <LabelsEditor
              labels={filterLabels}
              onChange={setFilterLabels}
            ></LabelsEditor>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

function useFilterLabels() {
  const [filterLabels, setFilterLabels] = useAtom(filterLabelsAtom);
  const toggleFilterLabel: Reader<Label, void> = label => {
    setFilterLabels(currentLabels => {
      if (currentLabels.includes(label)) {
        return currentLabels.filter(l => l !== label);
      } else {
        return [...currentLabels, label];
      }
    });
  };
  return [filterLabels, setFilterLabels, toggleFilterLabel] as const;
}
