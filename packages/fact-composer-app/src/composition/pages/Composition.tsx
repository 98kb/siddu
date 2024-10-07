import {FactList} from "../features/FactList";

export function Composition() {
  return (
    <div className="flex h-full gap-4 @container">
      <div className="w-full @lg:w-9/12 h-full py-2 px-3">
        <FactList />
      </div>
      <div className="flex flex-col w-full h-full">
        <slot></slot>
      </div>
    </div>
  );
}
