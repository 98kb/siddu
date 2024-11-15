import {IO} from "fp-ts/lib/IO";
import {Task} from "fp-ts/lib/Task";
import {useCallback, useState} from "react";
import {ConfirmButtons} from "~/components/ConfirmButtons";

type TProps<MoreProps> = Omit<MoreProps, "onClick"> & {
  onConfirm?: Task<void> | IO<void>;
  onCancel?: Task<void> | IO<void>;
  For: React.FC<MoreProps & {onClick: IO<void>}>;
};

export function WithConfirmation<MoreProps extends {onClick: IO<void>}>({
  For,
  onConfirm,
  onCancel,
  ...moreProps
}: TProps<MoreProps>) {
  const innerProps = moreProps as unknown as MoreProps;
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const confirm = useCallback(async () => {
    await onConfirm?.();
    setIsConfirming(false);
  }, [onConfirm]);
  const cancel = useCallback(async () => {
    await onCancel?.();
    setIsConfirming(false);
  }, [onCancel]);

  return isConfirming ? (
    <div className="flex gap-3">
      <ConfirmButtons size="icon" onConfirm={confirm} onCancel={cancel} />
    </div>
  ) : (
    <For {...innerProps} onClick={() => setIsConfirming(true)} />
  );
}
