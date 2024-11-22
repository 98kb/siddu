import type {Meta, StoryObj} from "@storybook/react";
import {LabelsTable} from "./LabelsTable";

const meta: Meta<typeof LabelsTable> = {
  title: "labels/organisms/LabelsTable",
  component: LabelsTable,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labels: [
      {_id: "1", name: "WorkExp"},
      {_id: "2", name: "Education"},
    ],
  },
};
