import type {Meta, StoryObj} from "@storybook/react";
import {FactListItem} from "./FactListItem";
import {fn} from "@storybook/test";
import {labels} from "~/../.storybook/seedDb";

const meta: Meta<typeof FactListItem> = {
  title: "composition/components/FactListItem",
  component: FactListItem,
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fact: {
      _id: "0",
      content: "This is a fact that's being displayed here.",
      labels: labels.slice(0, 2).map((label, id) => ({_id: `${id}`, ...label})),
    },
  },
};
