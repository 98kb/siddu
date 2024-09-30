import {
  HelpCircleIcon,
  HomeIcon,
  NotebookIcon,
  PencilRulerIcon,
  ShoppingBagIcon,
  TagIcon,
  UserCircleIcon,
} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import {ComposerNavTabs} from "./ComposerNavTabs";
import {NavTab} from "../../lib/NavTab";

export function ComposerNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-w-14 max-h-[598px] box-border h-full shadow items-center py-2 gap-4">
      <ComposerNavTabs
        tabs={tabs}
        activeRoute={location.pathname}
        onClick={navigate}
      />
      <div className="grow" />
      <ComposerNavTabs
        tabs={bottomTabs}
        activeRoute={location.pathname}
        onClick={navigate}
      />
    </div>
  );
}

const tabs: NavTab[] = [
  {
    name: "home",
    route: "/",
    Icon: HomeIcon,
  },
  {
    name: "composition",
    route: "/composition",
    Icon: PencilRulerIcon,
  },
  {
    name: "collection",
    route: "/collection",
    Icon: NotebookIcon,
  },
  {
    name: "labels",
    route: "/labels",
    Icon: TagIcon,
  },
  {
    name: "marketplace",
    route: "/marketplace",
    Icon: ShoppingBagIcon,
  },
];

const bottomTabs: NavTab[] = [
  {
    name: "Guides",
    route: "/help",
    Icon: HelpCircleIcon,
  },
  {
    name: "Account",
    route: "/account",
    Icon: UserCircleIcon,
  },
];
