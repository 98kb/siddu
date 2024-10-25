import {useLocation, useNavigate} from "react-router-dom";
import {BookOpenTextIcon, TagIcon} from "lucide-react";
import {LabelIcon} from "../components/LabelIcon";
import {NavTab} from "~/lib/NavTab";
import {useCallback, useMemo} from "react";
import {useFactsDb} from "~/db/useFactsDb";
import {useLiveQuery} from "~/db/useLiveQuery";
import {toEndpoint} from "~/lib/location/toEndpoint";
import {CollectionNavTab} from "../components/CollectionNavTab";

export function CollectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = useCollectionNav();

  return (
    <aside className="flex flex-col pr-10 py-5 min-w-[14vw]">
      {tabs.map(({name, route, Icon}) => (
        <CollectionNavTab
          key={name}
          name={name}
          isActive={route === toEndpoint(location)}
          onClick={() => navigate(route)}
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
        Icon: TagIcon,
        name: "Labels",
        route: "/collection/labels",
      },
    ];
  }, [labels]);
}
