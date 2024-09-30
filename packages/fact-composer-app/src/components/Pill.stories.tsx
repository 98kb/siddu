import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

import {Pill} from "./Pill";
import {Button} from "./ui/button";
import {XIcon} from "lucide-react";

const meta = {
  title: "components/Pill",
  component: Pill,
  args: {
    onClick: fn(),
    variant: "outline",
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "ChatGPT",
    children: null,
  },
};

export const WithChildren: Story = {
  args: {
    name: "ChatGPT",
    children: (
      <Button variant="ghost" size="icon-sm">
        <XIcon />
      </Button>
    ),
  },
};
