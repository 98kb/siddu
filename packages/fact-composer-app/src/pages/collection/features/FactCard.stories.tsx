import type {Meta, StoryObj} from "@storybook/react";
import {FactCard} from "./FactCard";
import {FactSchema} from "@repo/collection-service-defs";

const meta: Meta<typeof FactCard> = {
  title: "collection/features/FactCard",
  component: FactCard,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const fact: FactSchema = {
  _id: "0",
  content:
    "This is a really long fact that is going to be truncated because it is too long to fit in the card.",
  labels: [
    {
      _id: "0",
      name: "ChatGPT",
    },
    {
      _id: "1",
      name: "GPT-3",
    },
    {
      _id: "2",
      name: "GoT",
    },
    {
      _id: "3",
      name: "WorkExp",
    },
  ],
};

export const Default: Story = {
  args: {
    fact,
  },
};

export const WithHighlightedLabels: Story = {
  args: {
    fact,
  },
};

export const WithChildren: Story = {
  args: {
    fact,
  },
};
