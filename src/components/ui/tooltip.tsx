"use client"

import * as React from "react"

export const TooltipProvider = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => <>{children}</>;
export const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipTrigger = React.forwardRef<
  any,
  { children: React.ReactNode; asChild?: boolean } & React.HTMLAttributes<HTMLSpanElement>
>(({ children, asChild, ...props }, ref) => {
  if (asChild) {
    return <>{children}</>;
  }
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

export const TooltipContent = ({ children, ...props }: { children?: React.ReactNode, [key: string]: any }) => null;
