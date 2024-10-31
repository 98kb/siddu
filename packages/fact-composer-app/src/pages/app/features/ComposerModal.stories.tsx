import type {Meta, StoryObj} from "@storybook/react";

import {ComposerModal} from "./ComposerModal";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {seedDb} from "~/db/_mock/seedDb";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";
import {FactsDbContext} from "~/db/context/FactsDbContext";
import {fn} from "@storybook/test";

const db = new DbClient(createMemoryAdapter);
seedDb(db);

const meta: Meta<typeof ComposerModal> = {
  title: "composer/features/ComposerModal",
  component: ComposerModal,
  args: {
    onOpenChange: fn(),
  },
  decorators: [
    Story => (
      <RouterDecorator>
        <Story />
      </RouterDecorator>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    open: true,
  },
  decorators: [
    Story => (
      <FactsDbContext.Provider value={db}>
        <Story />
      </FactsDbContext.Provider>
    ),
  ],
};

export const BlankDb: Story = {
  args: {
    open: true,
  },
  decorators: [
    Story => {
      const blankDb = new DbClient(createMemoryAdapter);
      return (
        <FactsDbContext.Provider value={blankDb}>
          <Story />
        </FactsDbContext.Provider>
      );
    },
  ],
};
