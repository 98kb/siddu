import {BookDownIcon, BookOpenTextIcon} from "lucide-react";
import {LabelIcon} from "../components/LabelIcon";
import {NavTab} from "~/lib/NavTab";
import {ComponentProps, useEffect, useMemo, useState} from "react";
import {CollectionNavTab} from "../components/CollectionNavTab";
import {useFactFilters} from "../hooks/useFactFilters";
import {useLabelsQuery} from "~/pages/labels/hooks/useLabelsQuery";
import {AddFactButton} from "./AddFactButton";
import {bind} from "@react-rxjs/core";
import {factArchived$} from "../signals/factArchived";

export function CollectionNav() {
  const tabs = useCollectionNav();
  const {fetchLabels} = useLabelsQuery();

  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  return (
    <aside className="flex flex-col pb-5 pr-2 min-w-[200px] max-h-[5248px] overflow-y-scroll overflow-x-hidden">
      <div className="p-4">
        <AddFactButton
          variant="outline"
          size="lg"
          className="p-4 pr-6 rounded-full"
        />
      </div>
      {tabs.slice(0, -1).map(tab => (
        <CollectionNavTab key={tab.name} tab={tab} />
      ))}
      <ArchiveNavTab tab={tabs.at(-1)!} />
    </aside>
  );
}

const [useArchivedFact] = bind(factArchived$, undefined);
function ArchiveNavTab(props: ComponentProps<typeof CollectionNavTab>) {
  const archivedFact = useArchivedFact();
  const [className, setClassName] = useState("");
  useEffect(() => {
    if (archivedFact) {
      setClassName("animate-shake");
      setTimeout(() => setClassName(""), 800);
      return () => {
        setClassName("");
      };
    }
  }, [archivedFact]);
  return <CollectionNavTab {...props} className={className} />;
}

function useCollectionNav(): NavTab[] {
  const {labels} = useLabelsQuery();
  const {toFiltersSearch} = useFactFilters();
  return useMemo<NavTab[]>(() => {
    return [
      {
        Icon: BookOpenTextIcon,
        name: "Facts",
        route: "/collection",
      },
      ...labels.map<NavTab>(label => ({
        Icon: LabelIcon,
        name: label.name,
        route: `/collection?${toFiltersSearch({labelId: label._id})}`,
      })),
      {
        Icon: BookDownIcon,
        name: "Archive",
        route: `/collection?${toFiltersSearch({isDeleted: true})}`,
      },
    ];
  }, [labels, toFiltersSearch]);
}
