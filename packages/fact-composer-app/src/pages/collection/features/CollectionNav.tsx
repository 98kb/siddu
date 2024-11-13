import {ArchiveXIcon, BookOpenTextIcon, TagIcon} from "lucide-react";
import {LabelIcon} from "../components/LabelIcon";
import {NavTab} from "~/lib/NavTab";
import {useCallback, useEffect, useMemo} from "react";
import {useFactsDb} from "~/db/hooks/useFactsDb";
import {useLiveQuery} from "~/db/hooks/useLiveQuery";
import {CollectionNavTab} from "../components/CollectionNavTab";
import {useFactFilters} from "../hooks/useFactFilters";
import {useLocation, useNavigate} from "react-router-dom";

export function CollectionNav() {
  const tabs = useCollectionNav();
  const navigate = useNavigate();
  const location = useLocation();
  const {setArchivedOnly, setLabel} = useFactFilters();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setArchivedOnly(searchParams.has("archived"));
    setLabel(+searchParams.get("label")!);
  }, [location, setArchivedOnly, setLabel]);

  return (
    <aside className="flex flex-col pr-10 py-5 min-w-[14vw]">
      {tabs.map(({name, Icon, route}) => (
        <CollectionNavTab
          key={name}
          name={name}
          isActive={`${location.pathname}${location.search}` === route}
          onClick={() => navigate(route!)}
        >
          <Icon key={name} className="w-4 h-4" />
        </CollectionNavTab>
      ))}
    </aside>
  );
}

function useCollectionNav(): NavTab[] {
  const db = useFactsDb();
  const fetchLabels = useCallback(async () => db?.labels.getAll(), [db]);
  const labels = useLiveQuery("labels", fetchLabels);
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
        route: `/collection?label=${label.id}`,
      })),
      {
        Icon: ArchiveXIcon,
        name: "Archive",
        route: "/collection?archived=true",
      },
      {
        Icon: TagIcon,
        name: "Labels",
        route: "/collection/labels",
      },
    ];
  }, [labels]);
}
