import {
  HelpCircleIcon,
  NotebookIcon,
  PencilRulerIcon,
  SettingsIcon,
} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import {NavTab} from "../../../lib/NavTab";
import {AppLogoIcon} from "~/components/AppLogoIcon";
import {ComposerNavTab} from "../components/ComposerNavTab";

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
  return tabs.map(({name, isActive, Icon, action}) => (
    <ComposerNavTab
      key={name}
      tabName={name}
      isActive={isActive()}
      onClick={action}
    >
      <Icon />
    </ComposerNavTab>
  ));
}

function useComposerNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs: NavTab[] = [
    {
      name: "composition",
      isActive: () => location.pathname.startsWith("/composition"),
      action: () => navigate("/composition"),
      Icon: PencilRulerIcon,
    },
    {
      name: "collection",
      isActive: () =>
        location.pathname.startsWith("/collection") ||
        location.pathname.startsWith("/labels"),
      action: () => navigate("/collection"),
      Icon: NotebookIcon,
    },
  ];

  const bottomTabs: NavTab[] = [
    {
      name: "Guides",
      action: () => navigate("/help"),
      isActive: () => location.pathname.startsWith("/help"),
      Icon: HelpCircleIcon,
    },
    {
      name: "Settings & Preferences",
      isActive: () => location.pathname.startsWith("/settings"),
      action: () => navigate("/settings"),
      Icon: SettingsIcon,
    },
  ];

  return {tabs, bottomTabs};
}
