import {
  type ComponentPropsWithoutRef,
  type ComponentType,
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext as useReactContext,
} from "react";

export const provider = <T extends ComponentType<any>>(
  Component: T,
  prop: Omit<ComponentPropsWithoutRef<T>, "children">,
): [T, ComponentPropsWithoutRef<T>] => [Component, prop as ComponentPropsWithoutRef<T>];

export const tree = <T extends ReturnType<typeof provider>>(providerTree: Array<T>) => {
  return function Wrapper({ children }: PropsWithChildren): ReactNode {
    return providerTree.reduceRight<ReactNode>((acc, [Provider, props]) => {
      // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
      return <Provider {...props}>{acc}</Provider>;
    }, children);
  };
};

export const context = <T extends object>(initialValue: T | null) => {
  const Context = createContext<T | null>(initialValue);
  const useContext = () => {
    const value = useReactContext(Context);
    if (!value) {
      throw new Error("should provide context");
    }
    return value;
  };

  return [Context.Provider, useContext] as const;
};

export const builder = { provider, tree, context };
