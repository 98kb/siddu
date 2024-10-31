import {NavTab} from "../../../lib/NavTab";
import {ComposerNavTab} from "./ComposerNavTab";

type TProps = {
  tabs: NavTab[];
  activeRoute: NavTab["route"];
  onClick: (route: NavTab["route"]) => void;
};

export function ComposerNavTabs({tabs, activeRoute, onClick}: TProps) {
  return tabs.map(({name, route, Icon}) => (
    <ComposerNavTab
      key={name}
      tabName={name}
      isActive={route === activeRoute}
      onClick={() => onClick(route)}
    >
      <Icon />
    </ComposerNavTab>
  ));
}
