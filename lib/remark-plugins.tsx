import Link from "next/link";
import { visit } from "unist-util-visit";
import type { Example, PrismaClient } from "@prisma/client";
import { ReactNode } from "react";

export function replaceLinks({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  // this is technically not a remark plugin but it
  // replaces internal links with <Link /> component
  // and external links with <a target="_blank" />
  return href?.startsWith("/") || href === "" ? (
    <Link href={href} className="cursor-pointer">
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} ↗
    </a>
  );
}

export function replaceColumns() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      if (typeof node.value === 'string') {
        node.value = node.value
          .replace(/\[col\]/g, '<col>')
          .replace(/\[\/col\]/g, '</col>')
          .replace(/\[block\]/g, '<block>')
          .replace(/\[\/block\]/g, '</block>');
      }
    });
  };
}

export function replaceTables() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      const tableRegex = /\|(.+?)\|(?:\r?\n|\r)\|(?:\-+?\|)+\r?\n((?:\|.*?\|(?:\r?\n|\r))+)/g;
      const content = node.value;

      if (tableRegex.test(content)) {
        const htmlContent = content.replace(tableRegex, (match, headers, rows) => {
          // Convert headers
          const headerColumns = headers.trim().split('|').map(header => header.trim());
          const headerHtml = headerColumns.map(header => `<th>${header}</th>`).join('');

          // Convert rows
          const rowHtml = rows.trim().split(/\r?\n|\r/).map(row => {
            const columns = row.trim().split('|').map(column => column.trim());
            return `<tr>${columns.map(column => `<td>${column}</td>`).join('')}</tr>`;
          }).join('');

          // Return the full table
          return `<table><thead><tr>${headerHtml}</tr></thead><tbody>${rowHtml}</tbody></table>`;
        });

        node.type = 'html';
        node.value = htmlContent;
        node.children = [];
      }
    });
  };
}


export function replaceExamples(prisma: PrismaClient) {
  return (tree: any) =>
    new Promise<void>(async (resolve, reject) => {
      const nodesToChange: { node: any }[] = [];

      visit(tree, "mdxJsxFlowElement", (node: any) => {
        if (node.name == "Examples") {
          nodesToChange.push({
            node,
          });
        }
      });
      for (const { node } of nodesToChange) {
        try {
          const data = await getExamples(node, prisma);
          node.attributes = [
            {
              type: "mdxJsxAttribute",
              name: "data",
              value: data,
            },
          ];
        } catch (e) {
          return reject(e);
        }
      }

      resolve();
    });
}

async function getExamples(node: any, prisma: PrismaClient) {
  const names = node?.attributes[0].value.split(",");

  const data = new Array<Example | null>();

  for (let i = 0; i < names.length; i++) {
    const results = await prisma.example.findUnique({
      where: {
        id: parseInt(names[i]),
      },
    });
    data.push(results);
  }

  return JSON.stringify(data);
}
