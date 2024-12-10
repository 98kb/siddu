import type {Meta, StoryObj} from "@storybook/react";
import {GlobalErrorFallback} from "./GlobalErrorFallback";
import {ErrorBoundary} from "react-error-boundary";
import {Button} from "./ui/button";
import {useError} from "react-use";

const Throw = () => {
  const throwError = useError();
  return (
    <Button
      onClick={() => {
        throwError(new Error("A known error occurred"));
      }}
    >
      Throw error
    </Button>
  );
};

const meta: Meta<typeof ErrorBoundary> = {
  title: "components/GlobalErrorFallback",
  component: ErrorBoundary,
  parameters: {
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  args: {
    FallbackComponent: GlobalErrorFallback,
    children: <Throw />,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {};
