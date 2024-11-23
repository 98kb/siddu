import React, {ComponentProps, useCallback, useState} from "react";
import {ConfirmButtons} from "~/components/ConfirmButtons";
import {Button} from "../ui/button";

type TProps<MoreProps> = Omit<MoreProps, "onClick"> & {
  label?: React.ReactNode;
  onConfirm?: ComponentProps<"button">["onClick"];
  onCancel?: ComponentProps<"button">["onClick"];
  For: React.FC<ComponentProps<typeof Button>>;
};

export function WithConfirmation<
  MoreProps extends ComponentProps<typeof Button>,
>({label, For, onConfirm, onCancel, size, ...moreProps}: TProps<MoreProps>) {
  const innerProps = moreProps as unknown as MoreProps;
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const confirm = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onConfirm?.(event);
      setIsConfirming(false);
    },
    [onConfirm],
  );
  const cancel = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onCancel?.(event);
      setIsConfirming(false);
    },
    [onCancel],
  );
  const onClick = useCallback<React.MouseEventHandler>(event => {
    event.stopPropagation();
    setIsConfirming(true);
  }, []);

  return isConfirming ? (
    <div className="flex gap-3 items-center">
      {label}
      <ConfirmButtons size={size} onConfirm={confirm} onCancel={cancel} />
    </div>
  ) : (
    <For {...innerProps} size={size} onClick={onClick} />
  );
}
