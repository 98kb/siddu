import {cn} from "~/lib/utils";

type TProps = {
  label: string;
  subtext: string;
  className?: string;
  children: React.ReactNode;
};

export function ActionItem({className, children, label, subtext}: TProps) {
  return (
    <div
      className={cn(
        className,
        "flex items-center w-full justify-around hover:bg-gray-50 px-4 py-2",
      )}
    >
      <div className="inline-flex flex-col">
        {label}
        <small className="text-gray-500">{subtext}</small>
      </div>
      {children}
    </div>
  );
}
