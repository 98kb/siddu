import type {Meta, StoryObj} from "@storybook/react";
import {FactEditor} from "./FactEditor";
import {fn} from "@storybook/test";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {seedDb} from "~/db/_mock/seedDb";
import {FactsDbContext} from "~/db/context/FactsDbContext";

const db = new DbClient(createMemoryAdapter);
seedDb(db);

const meta: Meta<typeof FactEditor> = {
  title: "collection/components/FactEditor",
  component: FactEditor,
  args: {
    onChange: fn(),
  },
  decorators: [
    Story => (
      <FactsDbContext.Provider value={db}>
        <Story />
      </FactsDbContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fact: {
      id: 1,
      title: "Fact Title",
      content:
        "Fact content is something that is true. We can add more details here.",
      labels: [
        {
          id: 1,
          name: "ChatGPT",
        },
        {
          id: 2,
          name: "GPT-3",
        },
        {
          id: 3,
          name: "WorkExp",
        },
      ],
    },
  },
};
