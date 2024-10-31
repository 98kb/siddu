import type {Meta, StoryObj} from "@storybook/react";
import {BackupRestoreButtons} from "./BackupRestoreButtons";
import {fn} from "@storybook/test";

const meta: Meta<typeof BackupRestoreButtons> = {
  title: "settings/components/BackupRestoreButtons",
  component: BackupRestoreButtons,
  args: {
    onBackup: fn(),
    onRestore: fn(),
  },
  decorators: [
    Story => (
      <div className="flex gap-2">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isBackupBusy: false,
    isRestoreBusy: false,
  },
};
