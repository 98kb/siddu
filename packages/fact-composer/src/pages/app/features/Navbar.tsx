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
import {cva} from "class-variance-authority";

type TProps = {
  position: keyof typeof navbarPositions;
};

export function Navbar({position}: TProps) {
  return (
    <nav className={toNavbar({position})}>
      {tabs.map((tab, index) => (
        <Link key={index} to={tab.route}>
          <EasyTooltip
            side="top"
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

const navbarPositions = {
  bottom: "bottom-5 left-[50vw] -translate-x-1/2",
  right: "right-5 top-[50vh] -translate-y-1/2",
  left: "left-5 top-[50vh] -translate-y-1/2",
  top: "top-5 left-[50vw] -translate-x-1/2",
};

const toNavbar = cva(
  [
    "z-2 absolute flex bg-[rgba(0,0,0,0.8)] rounded-full p-2",
    "scale-[.60] hover:scale-[.95]",
    "delay-1000 hover:delay-0",
    "opacity-95 hover:opacity-100",
    "transition-all duration-500",
  ],
  {
    variants: {
      position: navbarPositions,
    },
  },
);

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
