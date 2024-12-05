import type {Meta, StoryObj} from "@storybook/react";
import {Navbar} from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "composer/features/Navbar",
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
