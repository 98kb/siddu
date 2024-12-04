import type {Meta, StoryObj} from "@storybook/react";
import {FactsGrid} from "./FactsGrid";
import {fn} from "@storybook/test";
import {factsData} from "~/.././.storybook/seedDb";

const meta: Meta<typeof FactsGrid> = {
  title: "collection/features/FactsGrid",
  component: FactsGrid,
  parameters: {
    layout: "fullscreen",
  },
  args: {onClick: fn()},
};

export default meta;
type Story = StoryObj<typeof meta>;

const facts = factsData.map((fact, _id: number) => ({_id: `${_id}`, ...fact}));

export const Default: Story = {
  args: {
    facts,
    highlightedFacts: [facts[2], facts[1]],
  },
};
