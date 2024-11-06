import {
  HelpCircleIcon,
  // HomeIcon,
  NotebookIcon,
  PencilRulerIcon,
  SettingsIcon,
  // ShoppingBagIcon,
  // UserCircleIcon,
} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import {ComposerNavTabs} from "../components/ComposerNavTabs";
import {NavTab} from "../../../lib/NavTab";
import {TooltipProvider} from "~/components/ui/tooltip";
import {AppLogoIcon} from "~/components/AppLogoIcon";

export function ComposerNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <TooltipProvider>
      <div className="flex flex-col min-w-14 max-h-[598px] box-border h-full shadow items-center py-2 gap-4">
        <AppLogoIcon className="w-10 h-10" />
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
    </TooltipProvider>
  );
}

const tabs: NavTab[] = [
  // {
  //   name: "home",
  //   route: "/",
  //   Icon: HomeIcon,
  // },
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
  // {
  //   name: "marketplace",
  //   route: "/marketplace",
  //   Icon: ShoppingBagIcon,
  // },
];

const bottomTabs: NavTab[] = [
  {
    name: "Guides",
    route: "/help",
    Icon: HelpCircleIcon,
  },
  {
    name: "Settings & Preferences",
    route: "/settings",
    Icon: SettingsIcon,
  },
];