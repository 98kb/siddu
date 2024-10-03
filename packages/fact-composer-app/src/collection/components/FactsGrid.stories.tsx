import type {Meta, StoryObj} from "@storybook/react";
import {FactsGrid} from "./FactsGrid";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {factsData, seedDb} from "~/_mock/seedDb";
import {fn} from "@storybook/test";

const db = new DbClient(createMemoryAdapter);
seedDb(db);

const meta = {
  title: "features/collection/features/FactsGrid",
  component: FactsGrid,
  parameters: {
    layout: "fullscreen",
  },
  args: {onClick: fn()},
} satisfies Meta<typeof FactsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const facts = factsData.map((fact, id) => ({id, ...fact}));

export const Default: Story = {
  args: {
    facts,
    highlightedFacts: [facts[2], facts[1]],
  },
};
