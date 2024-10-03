import {InsertLabel, Label} from "@repo/facts-db";
import {Reader} from "fp-ts/lib/Reader";
import {Check} from "lucide-react";
import React, {useCallback, useState} from "react";
import {Button} from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {useFactsDb} from "~/db/useFactsDb";
import {useLiveQuery} from "~/db/useLiveQuery";
import {cn} from "~/lib/utils";

type TProps = {
  children: Reader<{open: boolean}, React.ReactNode>;
  selected: Label[];
  onSelect: Reader<Label, void>;
};

function useSelectLabels() {
  const db = useFactsDb();
  const [query, setQuery] = useState("");
  const fetchLabels = useCallback(async () => db?.labels.getAll(), [db]);
  const labels = useLiveQuery("labels", fetchLabels);

  return {
    labels,
    query,
    setQuery,
    addLabel: (label: InsertLabel) => db?.labels.add(label),
  };
}

export function SelectLabels({children, selected, onSelect}: TProps) {
  const [open, setOpen] = useState(false);
  const {labels, query, addLabel, setQuery} = useSelectLabels();
  const isSelected = (label: Label) => selected.some(l => l.id === label.id);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children?.({open})}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            className="h-9"
            onInput={e => setQuery(e.currentTarget.value)}
            placeholder="Search labels..."
          />
          <CommandList>
            <CommandEmpty>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={async () => {
                  const id = await addLabel({name: query});
                  if (id) {
                    onSelect({id, name: query});
                  }
                }}
              >
                Add "{query}"
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {labels?.map(label => (
                <CommandItem
                  key={label.id}
                  value={label.name}
                  onSelect={() => onSelect(label)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      !isSelected(label) && "text-transparent",
                    )}
                  />
                  {label.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
