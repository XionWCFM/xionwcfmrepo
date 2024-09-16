import { screen } from "@testing-library/react";
import { renderWithUser } from "~/shared/testing-utils";
import { EnterNameEnterStep } from "./enter";

describe("Enter를 테스트합니다.", () => {
  it("onNext를 호출할 때 인풋의 값을 적절히 인수로 전달해야합니다.", async () => {
    const mockFn = vi.fn();
    const { user } = renderWithUser(<EnterNameEnterStep userName="" onNext={mockFn} />);

    await user.type(screen.getByPlaceholderText(/닉네임/), "닉네임");
    await user.click(screen.getByRole("button", { name: "다음으로" }));
    expect(mockFn).toHaveBeenCalledWith("닉네임");
  });

  it("닉네임을 입력하지 않으면 다음으로 이동할 수 없습니다.", async () => {
    const mockFn = vi.fn();
    const { user } = renderWithUser(<EnterNameEnterStep userName="" onNext={mockFn} />);
    await user.click(screen.getByRole("button", { name: "다음으로" }));
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("닉네임을 8자 초과로 입력하면 다음으로 이동할 수 없습니다.", async () => {
    const mockFn = vi.fn();
    const { user } = renderWithUser(<EnterNameEnterStep userName="" onNext={mockFn} />);
    await user.type(screen.getByPlaceholderText(/닉네임/), "8글자초과하면안돼");
    await user.click(screen.getByRole("button", { name: "다음으로" }));
    expect(mockFn).not.toHaveBeenCalled();
  });
});
