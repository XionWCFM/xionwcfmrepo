import { type RenderHookOptions, render, renderHook } from "@testing-library/react";
import { type RefObject, createRef } from "react";
import { renderToString } from "react-dom/server";
import { serverEnvironments } from "./serverEnvironments";

export function renderHookSsr<P extends Record<string, any>, Hook extends (props: P) => any>(
  useHook: Hook,
  options: RenderHookOptions<P> = {},
) {
  const result = renderHook<ReturnType<Hook>, P>(useHook, {
    ...options,
    hydrate: true,
  });

  return result;
}

renderHookSsr.serverOnly = <Hook extends () => any>(useHook: Hook) => {
  const result = createRef<ReturnType<Hook>>();

  const Component = () => {
    const hookResult = useHook();
    //@ts-expect-error
    result.current = hookResult;
    return <div></div>;
  };

  const stringified = serverEnvironments(() => renderToString(<Component />));
  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  // biome-ignore lint/style/useNamingConvention: <explanation>
  render(<div dangerouslySetInnerHTML={{ __html: stringified }} />);

  return result as RefObject<ReturnType<Hook>>;
};
