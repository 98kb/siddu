import {ComponentProps} from "react";
import {EasyTooltip} from "~/components/EasyTooltip";
import {Button} from "~/components/ui/button";

type TProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  tabName: string;
};

type Variant = ComponentProps<typeof Button>["variant"];

export function ComposerNavTab({children, isActive, onClick, tabName}: TProps) {
  const variant: Variant = isActive ? "default" : "ghost";
  return (
    <EasyTooltip side="right" tooltip={tabName} openDelay={100} sideOffset={20}>
      <Button size="icon" variant={variant} onClick={onClick}>
        {children}
      </Button>
    </EasyTooltip>
  );
}
