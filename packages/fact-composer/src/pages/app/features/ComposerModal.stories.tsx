import type {Meta, StoryObj} from "@storybook/react";

import {ComposerModal} from "./ComposerModal";
import {dummyCollection} from "~/../.storybook/trpc";
import {fn} from "@storybook/test";
import {CollectionContext} from "~/pages/collection/context/CollectionContext";

const meta: Meta<typeof ComposerModal> = {
  title: "composer/features/ComposerModal",
  component: ComposerModal,
  args: {
    show: true,
    onOpenChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    Story => (
      <CollectionContext.Provider value={dummyCollection}>
        <Story />
      </CollectionContext.Provider>
    ),
  ],
};

export const BlankDb: Story = {
  decorators: [
    Story => {
      return <Story />;
    },
  ],
};
