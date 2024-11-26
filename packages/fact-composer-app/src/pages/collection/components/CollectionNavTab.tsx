import {useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {NavTab} from "~/lib/NavTab";
import {cn} from "~/lib/utils";

type TProps = {
  tab: NavTab;
  className?: string;
};

export function CollectionNavTab({className, tab}: TProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = `${location.pathname}${location.search}` === tab.route;
  const go = useCallback(() => navigate(tab.route!), [navigate, tab.route]);
  return (
    <span
      className={cn(
        "inline-flex",
        "gap-5 p-2 pl-8 items-center",
        "min-w-[200px] max-w-[225px] min-h-[36px]",
        "overflow-hidden",
        "cursor-pointer rounded-r-full text-sm",
        "hover:bg-gray-50",
        isActive && "bg-gray-50",
        className,
      )}
      onClick={go}
    >
      <tab.Icon className="w-4 h-4" />
      <div className="truncate">{tab.name}</div>
    </span>
  );
}
