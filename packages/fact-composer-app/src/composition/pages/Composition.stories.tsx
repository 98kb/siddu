import type {Meta, StoryObj} from "@storybook/react";
import {Composition} from "./Composition";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {seedDb} from "~/_mock/seedDb";
import {FactsDbContext} from "~/context/FactsDbContext";

const db = new DbClient(createMemoryAdapter);
seedDb(db);

const meta = {
  title: "composition/pages/Composition",
  component: Composition,
  decorators: [
    Story => (
      <FactsDbContext.Provider value={db}>
        <Story />
      </FactsDbContext.Provider>
    ),
  ],
} satisfies Meta<typeof Composition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
