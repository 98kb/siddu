import type {Meta, StoryObj} from "@storybook/react";
import {FactCardActions} from "./FactCardActions";
import {fn} from "@storybook/test";

const meta: Meta<typeof FactCardActions> = {
  title: "collection/components/FactCardActions",
  component: FactCardActions,
  args: {
    onArchive: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
