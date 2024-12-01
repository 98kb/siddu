import * as React from "react";

import {cn} from "~/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  borderless?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({borderless, className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full bg-transparent px-3 py-2",
          "text-sm placeholder:text-muted-foreground",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !borderless && "rounded-md border border-input  shadow-sm",
          !borderless && "focus-visible:ring-1 focus-visible:ring-ring",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export {Textarea};
