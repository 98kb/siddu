import {rootId} from "~/const/rootId";

type TProps = {
  children: React.ReactNode;
};

export default function RootEl({children}: TProps) {
  return <div id={rootId}>{children}</div>;
}
