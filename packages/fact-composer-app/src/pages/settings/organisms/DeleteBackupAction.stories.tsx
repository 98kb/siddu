import type {Meta, StoryObj} from "@storybook/react";
import {DeleteBackupAction} from "./DeleteBackupAction";
import {fn} from "@storybook/test";

const meta: Meta<typeof DeleteBackupAction> = {
  title: "settings/organisms/DeleteBackupAction",
  component: DeleteBackupAction,
  args: {
    onDelete: fn(),
  },
  decorators: [
    Story => (
      <div className="w-full min-w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
