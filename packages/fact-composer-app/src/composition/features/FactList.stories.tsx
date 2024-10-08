import type {Meta, StoryObj} from "@storybook/react";

import {FactList} from "./FactList";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {seedDb} from "~/_mock/seedDb";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";
import {FactsDbContext} from "~/context/FactsDbContext";
import {fn} from "@storybook/test";

const db = new DbClient(createMemoryAdapter);
seedDb(db);

const meta = {
  title: "composition/features/FactList",
  component: FactList,
  args: {
    onClick: fn(),
  },
  decorators: [
    Story => (
      <FactsDbContext.Provider value={db}>
        <RouterDecorator>
          <Story />
        </RouterDecorator>
      </FactsDbContext.Provider>
    ),
  ],
} satisfies Meta<typeof FactList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
