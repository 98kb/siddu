import type {Meta, StoryObj} from "@storybook/react";
import {CompositionEditor} from "./CompositionEditor";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {seedDb} from "~/db/_mock/seedDb";
import {FactsDbContext} from "~/db/context/FactsDbContext";

const db = new DbClient(createMemoryAdapter);
seedDb(db);

const meta = {
  title: "composition/features/CompositionEditor",
  component: CompositionEditor,
  decorators: [
    Story => (
      <FactsDbContext.Provider value={db}>
        <Story />
      </FactsDbContext.Provider>
    ),
  ],
} satisfies Meta<typeof CompositionEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
