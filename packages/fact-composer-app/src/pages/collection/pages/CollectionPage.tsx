import {CollectionNav} from "../features/CollectionNav";
import {Outlet} from "react-router-dom";

export function CollectionPage() {
  return (
    <div className="flex w-full h-full">
      <CollectionNav />
      <Outlet />
    </div>
  );
}
