import {Location} from "react-router-dom";
import {CollectionNavTab} from "./CollectionNavTab";
import {NavTab} from "~/lib/NavTab";
import {toEndpoint} from "~/lib/location/toEndpoint";

type TProps = {
  tabs: NavTab[];
  activeRoute: Location;
  onClick: (route: NavTab["route"]) => void;
  children?: never;
};

export function CollectionNavTabs({tabs, activeRoute, onClick}: TProps) {
  return tabs.map(({name, route, Icon}) => (
    <CollectionNavTab
      key={name}
      name={name}
      Icon={Icon}
      isActive={route === toEndpoint(activeRoute)}
      onClick={() => onClick(route)}
    />
  ));
}
