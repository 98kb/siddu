import {Reader} from "fp-ts/lib/Reader";
import {Check} from "lucide-react";
import {useCallback, useEffect, useMemo, useState} from "react";
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
import {useLabelActions} from "../hooks/useLabelActions";
import {useAtomValue} from "jotai";
import {queryLabelsAtom} from "../store/queryLabelsAtom";

type TProps = {
  children: Reader<{open: boolean}, React.ReactNode>;
  selected: LabelSchema[];
  onSelect: Reader<LabelSchema, void>;
};

export function SelectLabels({children, selected, onSelect}: TProps) {
  const {search, setSearch, labels} = useSelectLabelsQuery(selected);
  const {selectLabel, addAndSelect, open, setOpen} = useSelectLabels(
    search,
    onSelect,
  );
  useEffect(() => setSearch(""), [setSearch, open]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children?.({open})}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            className="h-9"
            onInput={e => setSearch(e.currentTarget.value)}
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
                Add "{search}"
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

function useSelectLabels(search: string, onSelect: TProps["onSelect"]) {
  const [open, setOpen] = useState(false);
  const {addLabel} = useLabelActions();
  const selectLabel = useCallback<Reader<LabelSchema, void>>(
    label => {
      onSelect(label);
      setOpen(false);
    },
    [onSelect],
  );
  const addAndSelect = useCallback(async () => {
    const addedLabel = await addLabel({name: search});
    if (addedLabel) {
      selectLabel(addedLabel);
    }
  }, [addLabel, selectLabel, search]);

  return {selectLabel, open, setOpen, addAndSelect};
}

function useSelectLabelsQuery(excludedLabels: LabelSchema[]) {
  const [search, setSearch] = useState("");
  const allLabels = useAtomValue(queryLabelsAtom);
  const excludedLabelIds = useMemo(
    () => excludedLabels.map(label => label._id),
    [excludedLabels],
  );
  const labels = useMemo(
    () =>
      allLabels
        .filter(label => !excludedLabelIds.includes(label._id))
        .filter(label =>
          label.name.toLowerCase().includes(search.toLowerCase()),
        )
        .slice(0, 7),
    [excludedLabelIds, search, allLabels],
  );
  return {search, setSearch, labels};
}
