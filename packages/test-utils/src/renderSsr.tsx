import { type RenderOptions, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { expect } from "vitest";
import { vi } from "vitest";

import { serverEnvironments } from "./serverEnvironments";

export async function renderSsr(
  renderer: () => ReactNode,
  options: RenderOptions = {},
): Promise<ReturnType<typeof render>> {
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  const ui = renderer();
  const serverUi = renderer();

  const container = document.createElement("div");

  container.innerHTML = renderToString(serverUi);

  document.body.appendChild(container);

  const result = render(ui, {
    ...options,
    container,
    hydrate: true,
    onRecoverableError: (err) => {
      if (!(err instanceof Error)) {
        return;
      }

      if (err instanceof Error && err.message.includes("Hydration failed")) {
        console.error("Hydration failed");
      }
    },
  });

  await vi.waitFor(
    () => {
      // biome-ignore lint/suspicious/noMisplacedAssertion: <explanation>
      expect(errorSpy).not.toHaveBeenCalledWith("Hydration failed");
    },
    { timeout: 1000 },
  );

  return result;
}

renderSsr.serverOnly = (renderer: () => ReactNode) => {
  const ui = renderer();
  const stringified = serverEnvironments(() => renderToString(ui));

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const renderResult = render(<div dangerouslySetInnerHTML={{ __html: stringified }} />);

  return renderResult;
};
