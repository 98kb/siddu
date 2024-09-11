import {type FactsService, createAppRouter} from "@repo/facts-service";
import {createFactsDB} from "@repo/facts-db";
import ComposerModal from "./ComposerModal.svelte";
import type {Meta, StoryObj} from "@storybook/svelte";

const meta = {
  title: "features/Composer",
  component: ComposerModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<ComposerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const db: FactsService = createAppRouter(createFactsDB("story"));

export const _ComposerModal: Story = {
  args: {
    db,
    closeFocus: undefined,
    value: "",
  },
};
