import type {Meta, StoryObj} from "@storybook/react";
import {ComposerBreadcrumbs} from "./ComposerBreadcrumbs";

const meta = {
  title: "composer/components/ComposerBreadcrumbs",
  component: ComposerBreadcrumbs,
  args: {},
} satisfies Meta<typeof ComposerBreadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    path: "/collection/archive",
  },
};
