"use client";

import React, { ReactNode, FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { BaseTooltip } from "./base-tooltip";
import LoadingDots from "./icons/loading-dots";
import LoadingSpinner from "./icons/loading-spinner";

export interface ButtonProps {
    text?: string | any;
    size?: "default" | "sm" | "lg" | "icon";
    variant?:
    | "primary"
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "success"
    | "danger"
    | "transparent";
    onClick?: any;
    onMouseEnter?: any;
    onMouseLeave?: any;
    disabled?: boolean;
    loading?: boolean;
    dataState?: string;
    icon?: ReactNode;
    disabledTooltip?: string | ReactNode;
    children?: any;
    className?: string;
    skinny?: boolean;
    reader?: string;
    square?: boolean;
    slim?: boolean;
    tooltip?: string | ReactNode;
    fat?: boolean;
    full?: boolean;
    actionLetter?: string;
    suffix?: any;
    rounded?: boolean;
    loadingDots?: boolean;
    width?: string;
    minWidth?: string;
    height?: string;
    minHeight?: string;
}

const getButtonHeight = ({ square, skinny, slim, fat }: ButtonProps) => {
    if (square) return "h-7 w-7 px-2";
    if (skinny) return "h-8 px-3";
    if (slim) return "h-9";
    if (fat) return "h-12 rounded-lg";
    return "h-10";
};

export const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/80 border-shadow",
                danger:
                    "bg-destructive text-destructive-foreground hover:bg-destructive-hover ",
                outline:
                    "themed-border bg-background hover:text-accent-foreground border-shadow",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-shadow",
                ghost:
                    "themed-bg bg-transparent text-secondary border-0 hover:text-accent-foreground shadow-none",
                link: "px-1 py-1 bg-transparent text-secondary hover:text-accent-foreground ",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export function getVariantStyle(variant: ButtonProps["variant"]) {
    switch (variant) {
        case "primary":
            return "bg-primary text-primary-foreground hover:bg-primary/80 border-shadow";
        case "secondary":
            return "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-shadow";
        case "outline":
            return "themed-border bg-background hover:text-accent-foreground border-shadow";
        case "ghost":
            return "themed-bg bg-transparent text-secondary border-0 hover:text-accent-foreground shadow-none";
        case "success":
            return "border border-input border-success bg-success-foreground text-white hover:bg-success hover:text-white ";
        case "danger":
            return "bg-destructive text-destructive-foreground hover:bg-destructive-hover ";
        case "transparent":
            return "px-1 py-1 bg-transparent text-secondary hover:text-accent-foreground ";
        default:
            return "";
    }
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            text,
            variant = "primary",
            onClick,
            onMouseEnter,
            onMouseLeave,
            reader,
            disabled,
            loading,
            dataState,
            tooltip,
            icon,
            disabledTooltip,
            children,
            className,
            square,
            skinny,
            slim,
            fat,
            full,
            actionLetter,
            suffix,
            rounded,
            loadingDots,
            width,
            minWidth,
            height,
            minHeight,
            ...props
        },
        ref,
    ) => {
        if (disabledTooltip) {
            const disabledButtonStyle = cn(
                "flex h-9 cursor-not-allowed items-center justify-center rounded-md border bg-accent-muted text-sm font-medium text-secondary-accent transition-all ",
                square
                    ? "h-7 w-7"
                    : skinny
                        ? "h-8 px-2"
                        : slim
                            ? "h-9"
                            : fat
                                ? "h-12 border-lg"
                                : "h-10",
                full ? "w-full" : "",
                rounded ? "rounded-md" : square ? "rounded-sm" : "rounded-lg",
            );

            return (
                <BaseTooltip content={disabledTooltip} fullWidth>
                    <div className={disabledButtonStyle}>
                        <p>{text}</p>
                    </div>
                </BaseTooltip>
            );
        }

        const buttonStyle = cn(
            "flex inline-flex items-center justify-center px-4 py-2 space-x-2 whitespace-nowrap rounded-md  text-sm font-medium transition-all",
            disabled || loading
                ? "cursor-not-allowed shadow-border  bg-accent-muted text-secondary-accent"
                : getVariantStyle(variant),
            getButtonHeight({ skinny, slim, fat, square }),
            full ? "w-full" : "",
            rounded ? "rounded-full" : square ? "rounded-sm" : "rounded",
            className,
        );

        const buttonContent = () => {
            return (
                <>
                    {loadingDots && loading === true ? (
                        <LoadingDots />
                    ) : !loadingDots && loading === true ? (
                        <>
                            {" "}
                            <LoadingSpinner className={cn(fat ? "h-5 w-5" : "h-4 w-4")} />
                            {children}
                        </>
                    ) : icon ? (
                        icon
                    ) : (
                        children
                    )}
                    {text && loading === false && loadingDots === true && (
                        <>
                            <p>{text}</p>
                            {suffix && (
                                <span
                                    className={cn(
                                        "flex flex-shrink-0 items-center justify-center",
                                        skinny ? "ml-1" : "ml-2 min-w-[20px]",
                                    )}
                                >
                                    {suffix}
                                </span>
                            )}
                            {actionLetter && (
                                <kbd className="hidden rounded bg-accents-7 px-2 py-0.5 text-xs font-light text-white transition-all duration-75 group-hover:bg-accent group-hover:text-primary-foreground dark:text-secondary-accent md:inline-block">
                                    {actionLetter}
                                </kbd>
                            )}
                        </>
                    )}
                    {text && loading === true && loadingDots === false && (
                        <>
                            <p>{text}</p>
                            {suffix && (
                                <span
                                    className={cn(
                                        "flex flex-shrink-0 items-center justify-center",
                                        skinny ? "ml-1" : "ml-2 min-w-[20px]",
                                    )}
                                >
                                    {suffix}
                                </span>
                            )}
                            {actionLetter && (
                                <kbd className="hidden rounded bg-accents-7 px-2 py-0.5 text-xs font-light text-secondary-accent transition-all duration-75 group-hover:bg-accent group-hover:text-primary-foreground md:inline-block">
                                    {actionLetter}
                                </kbd>
                            )}
                        </>
                    )}
                    {text && loadingDots === undefined && (
                        <>
                            <p>{text}</p>
                            {suffix && (
                                <span
                                    className={cn(
                                        "flex flex-shrink-0 items-center justify-center",
                                        skinny ? "ml-1" : "ml-2 min-w-[20px]",
                                    )}
                                >
                                    {suffix}
                                </span>
                            )}
                            {actionLetter && (
                                <kbd className="hidden rounded bg-accents-7 px-2 py-0.5 text-xs font-light text-secondary-accent transition-all duration-75 group-hover:bg-accent group-hover:text-primary-foreground md:inline-block">
                                    {actionLetter}
                                </kbd>
                            )}
                        </>
                    )}
                </>
            );
        };

        // We can't use a higher order component here because we need to pass the tooltip directly to the button

        if (tooltip) {
            return (
                <BaseTooltip content={tooltip}>
                    <button
                        ref={ref}
                        style={{
                            width: width,
                            minWidth: minWidth,
                            height: height,
                            minHeight: minHeight,
                        }}
                        {...props}
                        type={onClick ? "button" : "submit"}
                        className={buttonStyle}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        disabled={disabled || loading}
                        data-state={dataState}
                        data-reader={reader}
                    >
                        {buttonContent()}
                    </button>
                </BaseTooltip>
            );
        }

        return (
            <button
                ref={ref}
                style={{
                    width: width,
                    minWidth: minWidth,
                    height: height,
                    minHeight: minHeight,
                }}
                {...props}
                type={onClick ? "button" : "submit"}
                className={buttonStyle}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                disabled={disabled || loading}
                data-state={dataState}
                data-reader={reader}
            >
                {buttonContent()}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
