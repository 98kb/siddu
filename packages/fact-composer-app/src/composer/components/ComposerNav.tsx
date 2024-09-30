import {
  HelpCircleIcon,
  HomeIcon,
  NotebookIcon,
  PencilRulerIcon,
  ShoppingBagIcon,
  TagIcon,
  UserCircleIcon,
} from "lucide-react";
import {Button} from "~/components/ui/button";
import {ComposerNavTab} from "./ComposerNavTab";
import {useState} from "react";

type Tab = {
  name: string;
  Icon: React.FC;
};

type TabName =
  | (typeof tabs)[number]["name"]
  | (typeof bottomTabs)[number]["name"];

export function ComposerNav() {
  const [activeRoute, setActiveRoute] = useState<TabName>("collection");
  return (
    <div className="flex flex-col min-w-14 max-h-[598px] box-border h-full shadow items-center py-2 gap-4">
      <Button size="icon" variant="ghost">
        <HomeIcon />
      </Button>
      {tabs.map(({name, Icon}) => (
        <ComposerNavTab
          key={name}
          tabName={name}
          isActive={activeRoute === name}
          onClick={() => setActiveRoute(name)}
        >
          <Icon />
        </ComposerNavTab>
      ))}
      <div className="grow" />
      {bottomTabs.map(({name, Icon}) => (
        <ComposerNavTab
          key={name}
          tabName={name}
          isActive={activeRoute === name}
          onClick={() => setActiveRoute(name)}
        >
          <Icon />
        </ComposerNavTab>
      ))}
    </div>
  );
}

const tabs: Tab[] = [
  {
    name: "composition",
    Icon: PencilRulerIcon,
  },
  {
    name: "collection",
    Icon: NotebookIcon,
  },
  {
    name: "labels",
    Icon: TagIcon,
  },
  {
    name: "marketplace",
    Icon: ShoppingBagIcon,
  },
];

const bottomTabs: Tab[] = [
  {
    name: "settings",
    Icon: HelpCircleIcon,
  },
  {
    name: "account",
    Icon: UserCircleIcon,
  },
] as const;
