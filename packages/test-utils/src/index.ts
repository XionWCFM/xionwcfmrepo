import { type MatcherFunction, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import type { PropsWithChildren } from "react";

const createRender = (wrapper: (param: PropsWithChildren) => JSX.Element) => {
  return <T extends JSX.Element>(
    Component: T,
    options?: Parameters<typeof render>[1],
  ): ReturnType<typeof render> & {
    user: ReturnType<typeof userEvent.setup>;
  } => {
    const user = userEvent.setup();
    return { ...render(Component, { wrapper, ...options }), user } as ReturnType<typeof render> & {
      user: ReturnType<typeof userEvent.setup>;
    };
  };
};

const textContentMatcher = (textMatch: string | RegExp): MatcherFunction => {
  const hasText =
    typeof textMatch === "string"
      ? (node: Element) => node.textContent === textMatch
      : (node: Element) => textMatch.test(node.textContent!);

  return (_content, node) => {
    if (node == null || !hasText(node)) {
      return false;
    }

    const childrenDontHaveText = Array.from(node?.children || []).every((child) => !hasText(child));

    return childrenDontHaveText;
  };
};

export { createRender, textContentMatcher };
