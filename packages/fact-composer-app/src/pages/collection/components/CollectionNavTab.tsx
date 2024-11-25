import {cn} from "~/lib/utils";

type TProps = {
  children: React.ReactNode;
  isActive: boolean;
  name: string;
  onClick: () => void;
};

export function CollectionNavTab({children, isActive, name, onClick}: TProps) {
  return (
    <span
      className={cn(
        "inline-flex",
        "gap-5 p-2 pl-8 items-center",
        "min-w-[200px] max-w-[225px]",
        "overflow-hidden",
        "cursor-pointer rounded-r-full text-sm",
        "hover:bg-gray-50",
        isActive && "bg-gray-50",
      )}
      onClick={onClick}
    >
      {children}
      <div className="truncate">{name}</div>
    </span>
  );
}
