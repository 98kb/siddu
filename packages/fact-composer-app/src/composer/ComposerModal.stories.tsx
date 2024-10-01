import type {Meta, StoryObj} from "@storybook/react";

import {ComposerModal} from "./ComposerModal";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {seedDb} from "~/_mock/seedDb";

const db = new DbClient(createMemoryAdapter);
seedDb(db);

const meta = {
  title: "features/composer/ComposerModal",
  component: ComposerModal,
} satisfies Meta<typeof ComposerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    db,
  },
};
