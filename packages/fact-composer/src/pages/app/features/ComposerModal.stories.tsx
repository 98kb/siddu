import type {Meta, StoryObj} from "@storybook/react";

import {ComposerModal} from "./ComposerModal";
import {dummyCollection} from "~/../.storybook/trpc";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";
import {fn} from "@storybook/test";
import {CollectionContext} from "~/pages/collection/context/CollectionContext";

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
      <CollectionContext.Provider value={dummyCollection}>
        <Story />
      </CollectionContext.Provider>
    ),
  ],
};

export const BlankDb: Story = {
  args: {
    open: true,
  },
  decorators: [
    Story => {
      return <Story />;
    },
  ],
};
