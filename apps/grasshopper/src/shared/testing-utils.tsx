import { Suspense } from "@suspensive/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type MatcherFunction, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "@xionwcfm/xds/toast";
import { Provider } from "jotai";
import { OverlayProvider } from "overlay-kit";
import type { PropsWithChildren, ReactNode } from "react";
import { UserContextProvider } from "~/entities/user/model/user.store";

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
          <OverlayProvider>
            <UserContextProvider>
              <Suspense>
                {children}
                <Toaster />
              </Suspense>
            </UserContextProvider>
          </OverlayProvider>
        </Provider>
      </QueryClientProvider>
    );
  };

export const renderWithUser = createRender(wrapper()) as unknown as (Component: ReactNode) => {
  user: ReturnType<typeof userEvent.setup>;
};
