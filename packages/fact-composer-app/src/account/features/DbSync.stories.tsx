import type {Meta, StoryObj} from "@storybook/react";
import {DbSync} from "./DbSync";
import {TooltipProvider} from "~/components/ui/tooltip";

const meta = {
  title: "settings/features/DbSync",
  component: DbSync,
  decorators: [
    Story => (
      <TooltipProvider>
        <div className="w-full min-w-1/2">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof DbSync>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
