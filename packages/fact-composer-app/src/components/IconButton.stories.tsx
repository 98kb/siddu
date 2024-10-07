import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

import {IconButton} from "./IconButton";
import {TagIcon} from "lucide-react";
import {TooltipProvider} from "@radix-ui/react-tooltip";

const meta = {
  title: "components/IconButton ",
  component: IconButton,
  args: {
    onClick: fn(),
  },
  decorators: [
    Story => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tooltip: "Add Label",
    children: <TagIcon className="w-4 h-4" />,
  },
};
