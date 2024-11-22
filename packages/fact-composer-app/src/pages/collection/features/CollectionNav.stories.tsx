import type {Meta, StoryObj} from "@storybook/react";
import {CollectionNav} from "./CollectionNav";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";

const meta = {
  title: "collection/features/CollectionNav",
  component: CollectionNav,
  decorators: [
    Story => (
      <RouterDecorator>
        <Story />
      </RouterDecorator>
    ),
  ],
} satisfies Meta<typeof CollectionNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labels: [
      {
        _id: "0",
        name: "ChatGPT",
      },
      {
        _id: "1",
        name: "GPT-3",
      },
      {
        _id: "2",
        name: "GoT",
      },
      {
        _id: "3",
        name: "WorkExp",
      },
      {
        _id: "4",
        name: "Personal Life Experiences of a Software Engineer",
      },
    ],
  },
};
