import {DbSync} from "../features/DbSync";

export function SettingsPage() {
  return (
    <div className="flex flex-col justify-between py-10 w-full h-full">
      <DbSync />
      <span className="text-sm text-gray-400 self-center">
        Build: {__BUILD_TAG__}
      </span>
    </div>
  );
}
