import {DbSync} from "../features/DbSync";

export function SettingsPage() {
  return (
    <div className="flex flex-col justify-between py-10 w-full h-full">
      <DbSync />
    </div>
  );
}
