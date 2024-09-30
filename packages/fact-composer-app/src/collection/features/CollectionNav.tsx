import {useLocation, useNavigate} from "react-router-dom";
import {CollectionNavTabs} from "../components/CollectionNavTabs";
import {Label} from "@repo/facts-db";
import {ArchiveIcon, BookOpenTextIcon} from "lucide-react";
import {LabelIcon} from "../components/LabelIcon";
import {NavTab} from "~/lib/NavTab";
import {useMemo} from "react";

type TProps = {
  labels: Label[];
};

export function CollectionNav({labels}: TProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = useCollectionNav(labels);

  return (
    <aside className="flex flex-col pr-10 py-5">
      <CollectionNavTabs
        tabs={tabs}
        activeRoute={location}
        onClick={navigate}
      />
    </aside>
  );
}

function useCollectionNav(labels: Label[]): NavTab[] {
  return useMemo(() => {
    return [
      {
        Icon: BookOpenTextIcon,
        name: "Facts",
        route: "/facts",
      },
      ...labels.map(label => ({
        Icon: LabelIcon,
        name: label.name,
        route: `/facts?label=${label.id}`,
      })),
      {
        Icon: ArchiveIcon,
        name: "Archive",
        route: "/facts/archive",
      },
    ];
  }, [labels]);
}
