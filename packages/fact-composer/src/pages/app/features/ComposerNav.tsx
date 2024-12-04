import {
  HelpCircleIcon,
  NotebookIcon,
  PencilRulerIcon,
  SettingsIcon,
} from "lucide-react";
import {NavTab} from "../../../lib/NavTab";
import {AppLogoIcon} from "~/components/AppLogoIcon";
import {ComposerNavTab} from "../components/ComposerNavTab";
import {useLocation, useNavigate} from "react-router-dom";

export function ComposerNav() {
  const {tabs, bottomTabs} = useComposerNav();
  return (
    <div className="flex flex-col min-w-14 max-h-[598px] box-border h-full shadow items-center py-2 gap-4">
      <AppLogoIcon className="w-10 h-10" />
      <ComposerNavTabs tabs={tabs} />
      <div className="grow" />
      <ComposerNavTabs tabs={bottomTabs} />
    </div>
  );
}

function ComposerNavTabs({tabs}: {tabs: NavTab[]}) {
  const location = useLocation();
  const navigate = useNavigate();
  return tabs.map(({name, Icon, route}) => (
    <ComposerNavTab
      key={name}
      tabName={name}
      isActive={location.pathname.startsWith(route)}
      onClick={() => navigate(route)}
    >
      <Icon />
    </ComposerNavTab>
  ));
}

function useComposerNav() {
  const tabs: NavTab[] = [
    {
      name: "composition",
      Icon: PencilRulerIcon,
      route: "/composition",
    },
    {
      name: "collection",
      Icon: NotebookIcon,
      route: "/collection",
    },
  ];

  const bottomTabs: NavTab[] = [
    {
      name: "Guides",
      Icon: HelpCircleIcon,
      route: "/help",
    },
    {
      name: "Settings & Preferences",
      Icon: SettingsIcon,
      route: "/settings",
    },
  ];

  return {tabs, bottomTabs};
}
