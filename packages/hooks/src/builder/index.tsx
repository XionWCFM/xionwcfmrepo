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

/**
 * providerTree를 기반으로 Wrapper 컴포넌트를 생성하는 함수입니다.
 *
 * @template T - provider 함수의 반환 타입입니다.
 * @param {Array<T>} providerTree - provider 함수와 props의 배열입니다.
 * @returns {function Wrapper} - Wrapper 컴포넌트를 반환하는 함수입니다.
 */
export const tree = <T extends ReturnType<typeof provider>>(providerTree: Array<T>) => {
  return function Wrapper({ children }: PropsWithChildren): ReactNode {
    return providerTree.reduceRight<ReactNode>((acc, [Provider, props]) => {
      // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
      return <Provider {...props}>{acc}</Provider>;
    }, children);
  };
};
/**
 * 컨텍스트를 생성하는 함수입니다.
 *
 * @template T - 컨텍스트의 타입입니다.
 * @param {T | null} initialValue - 컨텍스트의 초기값입니다.
 * @returns {[React.Provider<T | null>, () => T | null]} - 컨텍스트 프로바이더와 컨텍스트를 사용하는 함수를 반환합니다.
 *
 * @example
 * // 컨텍스트 생성
 * const [Provider, useContext] = context<MyContextType>(initialValue);
 *
 * // 컨텍스트 프로바이더 사용
 * <Provider value={contextValue}>
 *   // 컨텍스트 사용
 *   <ChildComponent />
 * </Provider>
 */
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
