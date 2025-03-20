/* eslint-disable jsx-a11y/heading-has-content */
'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import styles from './mdx.module.css';
import { cn } from '@/lib/utils';
import { replaceLinks } from '@/lib/remark-plugins';

export default function MDX({ source }: { source: MDXRemoteProps }) {
  const components = {
    a: replaceLinks,
  };

  return (
    <div className={cn(styles.markdownBody, `break-words mb-4`)} suppressHydrationWarning={true}>
      <MDXRemote {...source} components={components} />
    </div>
  );
}
