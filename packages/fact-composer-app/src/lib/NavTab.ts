import {ComponentProps} from "react";

export type NavTab = {
  name: string;
  route: string;
  Icon: React.FC<ComponentProps<"svg">>;
};
