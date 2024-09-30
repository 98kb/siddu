import type {Meta, StoryObj} from "@storybook/react";
import {FactCardActions} from "./FactCardActions";

const meta = {
  title: "features/collection/components/FactCardActions",
  component: FactCardActions,
  args: {},
} satisfies Meta<typeof FactCardActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
