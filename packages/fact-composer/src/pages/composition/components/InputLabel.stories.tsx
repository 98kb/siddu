import type {Meta, StoryObj} from "@storybook/react";
import {InputLabel} from "./InputLabel";

const meta: Meta<typeof InputLabel> = {
  title: "composition/components/InputLabel",
  component: InputLabel,
};

export default meta;
type Story = StoryObj<typeof meta>;

const ariaLabelInput = document.createElement("input");
ariaLabelInput.setAttribute("aria-label", "This is an aria label.");
export const WithAriaLabel: Story = {
  args: {
    el: ariaLabelInput,
  },
};

const inputId = document.createElement("input");
inputId.setAttribute("id", "input-id");
const labelForInput = document.createElement("label");
labelForInput.setAttribute("for", "input-id");
labelForInput.textContent = "This is a label for an input.";
document.body.appendChild(labelForInput);
export const WithLabelFor: Story = {
  args: {
    el: inputId,
  },
};

const inputParent = document.createElement("div");
const labelParent = document.createElement("label");
labelParent.textContent = "This is a label for a div.";
inputParent.appendChild(labelParent);
const inputChild = document.createElement("input");
inputParent.appendChild(inputChild);
document.body.appendChild(inputParent);
export const WithParentLabel: Story = {
  args: {
    el: inputChild,
  },
};

const inputPlaceholder = document.createElement("input");
inputPlaceholder.setAttribute("placeholder", "This is a placeholder.");
export const WithPlaceholder: Story = {
  args: {
    el: inputPlaceholder,
  },
};

const inputName = document.createElement("input");
inputName.setAttribute("name", "input-name");
export const WithName: Story = {
  args: {
    el: inputName,
  },
};

const inputWithNoLabel = document.createElement("input");
export const WithNoLabel: Story = {
  args: {
    el: inputWithNoLabel,
  },
};
