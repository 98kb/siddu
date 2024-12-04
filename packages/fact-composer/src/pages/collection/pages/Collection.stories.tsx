import type {Meta, StoryObj} from "@storybook/react";
import {CollectionPage} from "./CollectionPage";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";

const meta = {
  title: "collection/pages/CollectionPage",
  component: CollectionPage,
  decorators: [
    Story => (
      <RouterDecorator>
        <Story />
      </RouterDecorator>
    ),
  ],
} satisfies Meta<typeof CollectionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
