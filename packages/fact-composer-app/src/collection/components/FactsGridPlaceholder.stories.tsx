import type {Meta, StoryObj} from "@storybook/react";

import {FactsGridPlaceholder} from "./FactsGridPlaceholder";
import {AddFactButton} from "../features/AddFactButton";

const meta = {
  title: "collection/components/FactsGridPlaceholder",
  component: FactsGridPlaceholder,
} satisfies Meta<typeof FactsGridPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <AddFactButton />,
  },
};
