import type {Meta, StoryObj} from "@storybook/react";
import {SettingsPage} from "./SettingsPage";

const meta = {
  title: "settings/pages/SettingsPage",
  component: SettingsPage,
  decorators: [
    Story => (
      <div className="w-full min-w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
