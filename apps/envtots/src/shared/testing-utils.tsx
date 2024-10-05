import { Suspense } from "@suspensive/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MatcherFunction, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "@xionwcfm/xds/toast";
import { Provider } from "jotai";
import { PropsWithChildren, ReactNode } from "react";

const createRender = (wrapper: (param: PropsWithChildren) => ReactNode) => {
  return <T extends JSX.Element>(Component: T, options?: Parameters<typeof render>[1]) => {
    const user = userEvent.setup();
    return { ...render(Component, { wrapper, ...options }), user };
  };
};

const testingClient = () => new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

export const textContentMatcher = (textMatch: string | RegExp): MatcherFunction => {
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

export const wrapper =
  () =>
  ({ children }: PropsWithChildren) => {
    return (
      <QueryClientProvider client={testingClient()}>
        <Provider>
          <Suspense>
            {children}
            <Toaster />
          </Suspense>
        </Provider>
      </QueryClientProvider>
    );
  };

export const renderWithUser = createRender(wrapper()) as unknown as (Component: ReactNode) => {
  user: ReturnType<typeof userEvent.setup>;
};
