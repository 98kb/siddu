import type {Meta, StoryObj} from "@storybook/react";
import {FactCardActions} from "./FactCardActions";

const meta: Meta<typeof FactCardActions> = {
  title: "collection/features/FactCardActions",
  component: FactCardActions,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
