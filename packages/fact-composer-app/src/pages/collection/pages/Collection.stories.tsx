import type {Meta, StoryObj} from "@storybook/react";
import {Collection} from "./Collection";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";

const meta = {
  title: "collection/pages/Collection",
  component: Collection,
  decorators: [
    Story => (
      <RouterDecorator>
        <Story />
      </RouterDecorator>
    ),
  ],
} satisfies Meta<typeof Collection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
