import { ReactNode } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function BaseTooltip({
    children,
    content,
    side = "top",
    desktopOnly,
    fullWidth,
  }: {
    children: ReactNode;
    content: ReactNode | string;
    side?: "top" | "bottom" | "left" | "right";
    desktopOnly?: boolean;
    fullWidth?: boolean;
  }) {
    return (
      <TooltipPrimitive.Provider delayDuration={100}>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger className="md:inline-flex" asChild>
           {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
  collisionPadding={10}
              sideOffset={8}
              side={side}
              className="base-tooltip z-[9999] flex items-center overflow-hidden"
            >
              <TooltipPrimitive.Arrow className="base-tooltip-arrow" />
              {typeof content === "string" ? (
                <div className="base-tooltipContent text- block whitespace-pre-line break-words text-center text-sm ">
                  {content}
                </div>
              ) : (
                content
              )}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
