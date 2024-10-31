import {Location} from "react-router-dom";
import {ComposerBreadcrumbs} from "./ComposerBreadcrumbs";

type TProps = {
  location: Location;
};

export function Header({location}: TProps) {
  return <ComposerBreadcrumbs path={location.pathname} />;
}
