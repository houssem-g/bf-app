// test-utils.js

import { Matcher } from '@testing-library/react';

export function getByTextWithMarkup(textMatcher: Matcher): HTMLElement {
  return Array.from(document.querySelectorAll('*')).find(element => {
    const hasText = (node: Node): boolean => {
      const textContent = node.textContent || '';
      return textContent.match(textMatcher as any) !== null;
    };
    const nodeHasText = Array.from(element.childNodes).find(hasText);
    return nodeHasText !== undefined;
  }) as HTMLElement;
}
