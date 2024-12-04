import type {Meta, StoryObj} from "@storybook/react";
import {Composition} from "./Composition";
import {CollectionContext} from "~/pages/collection/context/CollectionContext";
import {dummyCollection} from "~/../.storybook/trpc";

const meta = {
  title: "composition/pages/Composition",
  component: Composition,
  decorators: [
    Story => (
      <CollectionContext.Provider value={dummyCollection}>
        <Story />
      </CollectionContext.Provider>
    ),
  ],
} satisfies Meta<typeof Composition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
