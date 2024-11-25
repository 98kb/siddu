import type {Meta, StoryObj} from "@storybook/react";
import {FactEditor} from "./FactEditor";
import {fn} from "@storybook/test";
import {dummyCollection} from "../../../../.storybook/trpc";
import {CollectionContext} from "../context/CollectionContext";

const meta: Meta<typeof FactEditor> = {
  title: "collection/components/FactEditor",
  component: FactEditor,
  args: {
    onChange: fn(),
  },
  decorators: [
    Story => (
      <CollectionContext.Provider value={dummyCollection}>
        <Story />
      </CollectionContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fact: {
      _id: "1",
      title: "Fact Title",
      content:
        "Fact content is something that is true. We can add more details here.",
      labels: [
        {
          _id: "1",
          name: "ChatGPT",
        },
        {
          _id: "2",
          name: "GPT-3",
        },
        {
          _id: "3",
          name: "WorkExp",
        },
      ],
    },
  },
};
