import type {Meta, StoryObj} from "@storybook/react";
import {SearchFact} from "./SearchFact";
import {dummyCollection} from ".storybook/trpc";
import {CollectionContext} from "~/pages/collection/context/CollectionContext";

const meta = {
  title: "composition/features/SearchFact",
  component: SearchFact,
  decorators: [
    Story => (
      <CollectionContext.Provider value={dummyCollection}>
        <Story />
      </CollectionContext.Provider>
    ),
  ],
} satisfies Meta<typeof SearchFact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
