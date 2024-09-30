import type {Meta, StoryObj} from "@storybook/react";
import {CollectionNav} from "./CollectionNav";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";

const meta = {
  title: "features/collection/components/CollectionNav",
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
        id: 0,
        name: "ChatGPT",
      },
      {
        id: 1,
        name: "GPT-3",
      },
      {
        id: 2,
        name: "GoT",
      },
      {
        id: 3,
        name: "WorkExp",
      },
      {
        id: 4,
        name: "Personal Life Experiences of a Software Engineer",
      },
    ],
  },
};
