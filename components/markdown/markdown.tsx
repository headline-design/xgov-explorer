"use client";

import React, { useEffect, useMemo } from 'react';
import { icons } from '@iconify-json/heroicons-outline';
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import { getUrl } from '@/lib/utils';
import './markdown.css';
import useCopyToClipboard from '@/lib/hooks/use-copy-to-clipboard';

const Markdown = ({ body }) => {
  const { copy } = useCopyToClipboard();

  const remarkable = useMemo(() => {
    const md = new Remarkable({
      html: false,
      breaks: true,
      typographer: false,
      linkTarget: '_blank',
    }).use(linkify);

    md.core.ruler.disable(['abbr', 'abbr2', 'footnote_tail', 'replacements', 'smartquotes']);
    md.block.ruler.disable(['code', 'deflist', 'footnote', 'htmlblock', 'lheading']);
    md.inline.ruler.disable([
      'autolink',
      'del',
      'entity',
      'escape',
      'footnote_inline',
      'footnote_ref',
      'htmltag',
      'ins',
      'mark',
      'sub',
      'sup',
      'text',
    ]);

    return md;
  }, []);

  const parsed = useMemo(() => {
    const formattedBody = (body || '').replace(/ipfs:\/\/(\w+)/g, (value) => getUrl(value) || '#');
    return remarkable.render(formattedBody);
  }, [body, remarkable]);

  useEffect(() => {
    const bodyElement = document.querySelector('.markdown-body');

    if (!bodyElement) return;

    bodyElement.querySelectorAll('pre>code').forEach((code) => {
      const parent = code.parentElement;

      const copyButton = document.createElement('button');
      const copySvg = `<svg viewBox="0 0 24 24" width="20px" height="20px">${icons.icons.duplicate.body}</svg>`;
      copyButton.classList.add('text-skin-text');
      copyButton.setAttribute('type', 'button');
      copyButton.innerHTML = copySvg;
      copyButton.addEventListener('click', () => {
        if (parent !== null) {
          copy(code.textContent || '');

          copyButton.innerHTML = `<svg viewBox="0 0 24 24" width="20px" height="20px">${icons.icons.check.body}</svg>`;
          copyButton.classList.add('!text-skin-success');
          setTimeout(() => {
            copyButton.innerHTML = copySvg;
            copyButton.classList.remove('!text-skin-success');
          }, 1000);
        }
      });

      const titleBar = document.createElement('div');
      titleBar.classList.add('title-bar');

      const language = document.createElement('div');
      language.innerHTML = code.getAttribute('class')?.split('language-')[1] || '';

      titleBar.append(language);
      titleBar.append(copyButton);
      if (parent !== null) {
        parent.prepend(titleBar);
      }
    });
  }, [parsed]);

  return <div className="markdown-body break-words" dangerouslySetInnerHTML={{ __html: parsed }} />;
};

export default Markdown;
