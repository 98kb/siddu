import {ComponentProps} from "react";

export type NavTab = {
  name: string;
  Icon: React.FC<ComponentProps<"svg">>;
  route: string;
};
