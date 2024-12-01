import type {Meta, StoryObj} from "@storybook/react";
import {CollectionNavTab} from "./CollectionNavTab";

const meta: Meta<typeof CollectionNavTab> = {
  title: "collection/components/CollectionNavTab",
  component: CollectionNavTab,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
