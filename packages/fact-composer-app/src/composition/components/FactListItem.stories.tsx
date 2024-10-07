import type {Meta, StoryObj} from "@storybook/react";
import {FactListItem} from "./FactListItem";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {labels, seedDb} from "~/_mock/seedDb";
import {fn} from "@storybook/test";

const db = new DbClient(createMemoryAdapter);
seedDb(db);

const meta = {
  title: "composition/components/FactListItem",
  component: FactListItem,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof FactListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fact: {
      id: 0,
      content: "This is a fact that's being displayed here.",
      labels: labels.slice(0, 2).map((label, id) => ({id, ...label})),
    },
  },
};
