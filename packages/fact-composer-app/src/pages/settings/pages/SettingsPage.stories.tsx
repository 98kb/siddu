import type {Meta, StoryObj} from "@storybook/react";
import {SettingsPage} from "./SettingsPage";

const meta = {
  title: "settings/pages/SettingsPage",
  component: SettingsPage,
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
