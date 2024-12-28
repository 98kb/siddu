import type {Meta, StoryObj} from "@storybook/react";
import {CompositionToolbar} from "./CompositionToolbar";

const meta = {
  title: "composition/features/CompositionToolbar",
  component: CompositionToolbar,
  decorators: [
    Story => (
      <div className="min-w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CompositionToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const inputEl = document.createElement("input");
export const Default: Story = {
  args: {
    composition: "This is a composition",
    inputEl,
  },
};
