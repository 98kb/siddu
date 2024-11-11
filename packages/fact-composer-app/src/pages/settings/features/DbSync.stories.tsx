import type {Meta, StoryObj} from "@storybook/react";
import {DbSync} from "./DbSync";

const meta = {
  title: "settings/features/DbSync",
  component: DbSync,
  decorators: [
    Story => (
      <div className="w-full min-w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DbSync>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
