"use client"

import type * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useMDXComponent } from "next-contentlayer2/hooks"
import { cn } from "@/lib/utils"

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tight", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn("mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("mt-8 scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn("mt-8 scroll-m-20 text-lg font-semibold tracking-tight", className)} {...props} />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className={cn("mt-8 scroll-m-20 text-base font-semibold tracking-tight", className)} {...props} />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className={cn("mt-8 scroll-m-20 text-sm font-semibold tracking-tight", className)} {...props} />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link href={href as string} className={cn("font-medium text-primary underline-offset-4 hover:underline", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground", className)} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={props.src as string}
      alt={alt || ""}
      className={cn("rounded-md border", className)}
      width={typeof props.width === "string" ? parseInt(props.width, 10) : props.width as any}
      height={typeof props.height === "string" ? parseInt(props.height, 10) : props.height as any}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t p-0 even:bg-muted", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn("border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", className)}
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    __npmCommand__,
    __yarnCommand__,
    __pnpmCommand__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__?: string
    __npmCommand__?: boolean
    __yarnCommand__?: string
    __pnpmCommand__?: string
  }) => {
    return (
      <div className="relative">
        {__npmCommand__ && (
          <div className="absolute right-4 top-3 flex items-center space-x-2">
            <button
              className="h-7 rounded-md px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => {
                navigator.clipboard.writeText(__npmCommand__ ? "npm install " + __npmCommand__ : "")
              }}
            >
              npm
            </button>
            <button
              className="h-7 rounded-md px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => {
                navigator.clipboard.writeText(__yarnCommand__ || "")
              }}
            >
              yarn
            </button>
            <button
              className="h-7 rounded-md px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => {
                navigator.clipboard.writeText(__pnpmCommand__ || "")
              }}
            >
              pnpm
            </button>
          </div>
        )}
        <pre
          className={cn(
            "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
            __npmCommand__ && "pt-12",
            className,
          )}
          {...props}
        />
        {__rawString__ && (
          <button
            className="absolute right-4 top-3 h-7 rounded-md px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => {
              navigator.clipboard.writeText(__rawString__ || "")
            }}
          >
            Copy
          </button>
        )}
      </div>
    )
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={cn("relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm", className)} {...props} />
  ),
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}

