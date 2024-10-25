import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

import {CollectionNavTab} from "./CollectionNavTab";
import {LabelIcon} from "./LabelIcon";

const meta = {
  title: "collection/components/CollectionNavTab",
  component: CollectionNavTab,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CollectionNavTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <LabelIcon />,
    name: "ChatGPT",
    isActive: false,
  },
};
