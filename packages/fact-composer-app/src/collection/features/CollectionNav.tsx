import {useLocation, useNavigate} from "react-router-dom";
import {CollectionNavTabs} from "../components/CollectionNavTabs";
import {ArchiveIcon, BookOpenTextIcon} from "lucide-react";
import {LabelIcon} from "../components/LabelIcon";
import {NavTab} from "~/lib/NavTab";
import {useCallback, useMemo} from "react";
import {useFactsDb} from "~/db/useFactsDb";
import {useLiveQuery} from "~/db/useLiveQuery";

export function CollectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = useCollectionNav();

  return (
    <aside className="flex flex-col pr-10 py-5 min-w-[15vw]">
      <CollectionNavTabs
        tabs={tabs}
        activeRoute={location}
        onClick={navigate}
      />
    </aside>
  );
}

function useCollectionNav(): NavTab[] {
  const db = useFactsDb();
  const fetchLabels = useCallback(async () => db?.labels.getAll(), [db]);
  const labels = useLiveQuery("labels", fetchLabels);
  return useMemo(() => {
    return [
      {
        Icon: BookOpenTextIcon,
        name: "Facts",
        route: "/collection",
      },
      ...labels.map(label => ({
        Icon: LabelIcon,
        name: label.name,
        route: `/collection?label=${label.id}`,
      })),
      {
        Icon: ArchiveIcon,
        name: "Archive",
        route: "/collection/archive",
      },
    ];
  }, [labels]);
}
