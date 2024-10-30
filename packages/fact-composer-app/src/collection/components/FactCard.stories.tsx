import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

import {FactCard} from "./FactCard";
import {Fact} from "@repo/facts-db";
import {FactCardActions} from "./FactCardActions";

const meta: Meta<typeof FactCard> = {
  title: "collection/components/FactCard",
  component: FactCard,
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const fact: Fact = {
  id: 0,
  content:
    "This is a really long fact that is going to be truncated because it is too long to fit in the card.",
  labels: [
    {
      id: 0,
      name: "ChatGPT",
    },
    {
      id: 1,
      name: "GPT-3",
    },
    {
      id: 2,
      name: "GoT",
    },
    {
      id: 3,
      name: "WorkExp",
    },
  ],
};

export const Default: Story = {
  args: {
    fact,
    isHighlighted: false,
  },
};

export const WithHighlightedLabels: Story = {
  args: {
    fact,
    highlightedLabels: [
      {id: 0, name: "ChatGPT"},
      {id: 2, name: "GoT"},
    ],
  },
};

export const WithChildren: Story = {
  args: {
    fact,
    children: <FactCardActions />,
  },
};
