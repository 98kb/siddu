import type {Meta, StoryObj} from "@storybook/react";
import {ActionItem} from "./ActionItem";
import {Trash2Icon} from "lucide-react";

const meta: Meta<typeof ActionItem> = {
  title: "settings/components/ActionItem",
  component: ActionItem,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const _BackupCard: Story = {
  args: {
    label: "An Action",
    subtext: "A subtext with some info",
    children: <Trash2Icon />,
  },
};
