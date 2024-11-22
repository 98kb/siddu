import {Reader} from "fp-ts/lib/Reader";
import {Check} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
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
import {cn} from "~/lib/utils";
import {LabelSchema} from "@repo/collection-service-defs";
import {useCollection} from "~/pages/collection/hooks/useCollection";
import {useLabelActions} from "../hooks/useLabelActions";

type TProps = {
  children: Reader<{open: boolean}, React.ReactNode>;
  selected: LabelSchema[];
  onSelect: Reader<LabelSchema, void>;
};

export function SelectLabels({children, selected, onSelect}: TProps) {
  const [open, setOpen] = useState(false);
  const {addLabel} = useLabelActions();
  const {labels, query, setQuery} = useSelectLabelsQuery();
  const selectLabel = useCallback<Reader<LabelSchema, void>>(
    label => {
      onSelect(label);
      setOpen(false);
    },
    [onSelect],
  );
  const addAndSelect = useCallback(async () => {
    const addedLabel = await addLabel({name: query});
    if (addedLabel) {
      selectLabel(addedLabel);
    }
  }, [addLabel, selectLabel, query]);
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
                onClick={addAndSelect}
              >
                Add "{query}"
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {labels?.map(label => (
                <CommandItem
                  key={label._id}
                  value={label.name}
                  onSelect={() => selectLabel(label)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      !selected.some(l => l._id === label._id) &&
                        "text-transparent",
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

function useSelectLabelsQuery() {
  const [query, setQuery] = useState("");
  const collection = useCollection();
  const [labels, setLabels] = useState<LabelSchema[]>([]);
  const fetchLabels = useCallback(() => {
    collection?.labels.list
      .query({
        pagination: {limit: 10, offset: 0},
        isDeleted: false,
        query,
      })
      .then(setLabels);
  }, [collection, query]);
  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  return {
    labels,
    fetchLabels,
    query,
    setQuery,
  };
}
