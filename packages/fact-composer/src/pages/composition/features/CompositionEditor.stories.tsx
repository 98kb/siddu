import type {Meta, StoryObj} from "@storybook/react";
import {CompositionEditor} from "./CompositionEditor";
import {dummyCollection} from "~/../.storybook/trpc";
import {CollectionContext} from "~/pages/collection/context/CollectionContext";

const meta = {
  title: "composition/features/CompositionEditor",
  component: CompositionEditor,
  decorators: [
    Story => (
      <CollectionContext.Provider value={dummyCollection}>
        <Story />
      </CollectionContext.Provider>
    ),
  ],
} satisfies Meta<typeof CompositionEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
