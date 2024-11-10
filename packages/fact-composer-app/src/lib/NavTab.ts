import {IO} from "fp-ts/lib/IO";
import {ComponentProps} from "react";

export type NavTab = {
  name: string;
  Icon: React.FC<ComponentProps<"svg">>;
  action: IO<void>;
  isActive: IO<boolean>;
};
