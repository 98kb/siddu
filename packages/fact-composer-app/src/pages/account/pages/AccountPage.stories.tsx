import type {Meta, StoryObj} from "@storybook/react";
import {AccountPage} from "./AccountPage";

const meta = {
  title: "settings/pages/SettingsPage",
  component: AccountPage,
} satisfies Meta<typeof AccountPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
