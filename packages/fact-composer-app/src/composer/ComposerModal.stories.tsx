import type {Meta, StoryObj} from "@storybook/react";

import {ComposerModal} from "./ComposerModal";

const meta = {
  title: "features/composer/ComposerModal",
  component: ComposerModal,
} satisfies Meta<typeof ComposerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
