import {Label} from "@repo/facts-db";
import {Reader} from "fp-ts/lib/Reader";
import {Check} from "lucide-react";
import {useState} from "react";
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
import {useLabels} from "../hooks/useLabels";

type TProps = {
  children: Reader<{open: boolean}, React.ReactNode>;
  selected: Label[];
  onSelect: Reader<Label, void>;
};

export function SelectLabels({children, selected, onSelect}: TProps) {
  const [open, setOpen] = useState(false);
  const {labels, addLabel} = useLabels();
  const {query, setQuery} = useSelectLabels();
  const isSelected = (label: Label) => selected.some(l => l.id === label.id);
  const handleSelect = (label: Label) => {
    onSelect(label);
    setOpen(false);
  };
  const addAndSelect = async () => {
    const addedLabel = await addLabel({name: query});
    if (addedLabel) {
      handleSelect(addedLabel);
    }
  };
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
                  key={label.id}
                  value={label.name}
                  onSelect={() => handleSelect(label)}
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

function useSelectLabels() {
  const [query, setQuery] = useState("");

  return {
    query,
    setQuery,
  };
}
