import {cn} from "~/lib/utils";

type TProps = {
  Icon: React.FC;
  isActive: boolean;
  name: string;
  onClick: () => void;
};

export function CollectionNavTab({Icon, isActive, name, onClick}: TProps) {
  return (
    <span
      className={cn(
        "inline-flex",
        "gap-5 p-2 px-4 items-center",
        "min-w-[240px] max-w-[240px]",
        "overflow-hidden",
        "cursor-pointer rounded-r-full text-sm",
        "hover:bg-gray-50",
        isActive && "bg-gray-50",
      )}
      onClick={onClick}
    >
      <Icon />
      <div className="truncate">{name}</div>
    </span>
  );
}
