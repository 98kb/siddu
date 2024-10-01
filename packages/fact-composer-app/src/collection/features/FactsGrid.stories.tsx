import type {Meta, StoryObj} from "@storybook/react";
import {FactsGrid} from "./FactsGrid";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {seedDb} from "~/_mock/seedDb";
import {fn} from "@storybook/test";
import {FactsDbContext} from "~/context/FactsDbContext";

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

export const Default: Story = {
  args: {highlightedFacts: []},
  decorators: [
    Story => (
      <FactsDbContext.Provider value={db}>
        <Story />
      </FactsDbContext.Provider>
    ),
  ],
};
