import { screen } from "@testing-library/react";
import { renderWithUser } from "~/shared/testing-utils";
import { EnterNameStartStep } from "./start";

describe("Start를 테스트합니다.", () => {
  it("Start는", async () => {
    const mockFn = vi.fn();
    const { user } = renderWithUser(<EnterNameStartStep onNext={mockFn} />);
    await user.click(screen.getByRole("button", { name: /알겠어요/ }));
    expect(mockFn).toHaveBeenCalledOnce();
  });
});
