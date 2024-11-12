import {ArchiveXIcon, BookOpenTextIcon, TagIcon} from "lucide-react";
import {LabelIcon} from "../components/LabelIcon";
import {NavTab} from "~/lib/NavTab";
import {useCallback, useMemo} from "react";
import {useFactsDb} from "~/db/hooks/useFactsDb";
import {useLiveQuery} from "~/db/hooks/useLiveQuery";
import {CollectionNavTab} from "../components/CollectionNavTab";
import {useFactFilters} from "../hooks/useFactFilters";
import {useNavigate} from "react-router-dom";

export function CollectionNav() {
  const tabs = useCollectionNav();

  return (
    <aside className="flex flex-col pr-10 py-5 min-w-[14vw]">
      {tabs.map(({name, Icon, action, isActive}) => (
        <CollectionNavTab
          key={name}
          name={name}
          isActive={isActive()}
          onClick={action}
        >
          <Icon key={name} className="w-4 h-4" />
        </CollectionNavTab>
      ))}
    </aside>
  );
}

function useCollectionNav(): NavTab[] {
  const db = useFactsDb();
  const navigate = useNavigate();
  const {filters, resetFilters, setArchivedOnly, setLabel} = useFactFilters();
  const fetchLabels = useCallback(async () => db?.labels.getAll(), [db]);
  const labels = useLiveQuery("labels", fetchLabels);
  return useMemo(() => {
    return [
      {
        Icon: BookOpenTextIcon,
        name: "Facts",
        action: resetFilters,
        isActive: () => Boolean(filters.label || filters.archived) === false,
      },
      ...labels.map(label => ({
        Icon: LabelIcon,
        name: label.name,
        action: () => setLabel(label),
        isActive: () => filters.label?.id === label.id,
      })),
      {
        Icon: ArchiveXIcon,
        name: "Archive",
        action: () => setArchivedOnly(true),
        isActive: () => Boolean(filters.archived),
      },
      {
        Icon: TagIcon,
        name: "Labels",
        action: () => navigate("/labels"),
        isActive: () => false,
      },
    ];
  }, [filters, labels, resetFilters, setArchivedOnly, setLabel, navigate]);
}
