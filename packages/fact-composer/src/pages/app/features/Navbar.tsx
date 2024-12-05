import {
  NotebookIcon,
  PencilRulerIcon,
  MenuIcon,
  HelpCircleIcon,
} from "lucide-react";
import {Link} from "react-router-dom";
import {EasyTooltip} from "~/components/EasyTooltip";
import {Button} from "~/components/ui/button";
import {NavTab} from "~/lib/NavTab";
import {cn} from "~/lib/utils";
import {useNavbar} from "../hooks/useNavbar";

export function Navbar() {
  const {isVisible} = useNavbar();
  return (
    <nav
      className={cn(
        "fixed right-[20px] top-[50vh] -translate-y-1/2",
        "flex flex-col rounded-full p-2 shadow-2xl",
        "scale-[.60] hover:scale-[.95]",
        "delay-1000 hover:delay-0",
        "bg-opacity-90 bg-[rgba(0,0,0,0.8)]",
        "transition-all duration-300",
        !isVisible && "hidden",
      )}
    >
      {tabs.map((tab, index) => (
        <Link key={index} to={tab.route}>
          <EasyTooltip
            side="left"
            tooltip={tab.name}
            sideOffset={15}
            className="text-md"
          >
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-[#fff2]"
            >
              <tab.Icon className="w-5 h-5 text-white" />
            </Button>
          </EasyTooltip>
        </Link>
      ))}
    </nav>
  );
}

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
  {
    name: "Guides",
    Icon: HelpCircleIcon,
    route: "/help",
  },
  {
    name: "Menu",
    Icon: MenuIcon,
    route: "/settings",
  },
];

