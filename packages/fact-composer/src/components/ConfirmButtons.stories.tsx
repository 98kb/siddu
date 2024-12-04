import type {Meta, StoryObj} from "@storybook/react";
import {ConfirmButtons} from "./ConfirmButtons";
import {fn} from "@storybook/test";

const meta: Meta<typeof ConfirmButtons> = {
  title: "components/ConfirmButtons",
  component: ConfirmButtons,
  args: {
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const _BackupCard: Story = {
  args: {},
};
