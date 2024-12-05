import { screen } from "@testing-library/react";
import { atom } from "jotai";
import { describe, expect, it } from "vitest";
import { userStore } from "~/entities/user/model/user.store";
import { renderWithUser, textContentMatcher } from "~/shared/testing-utils";
import { FixedLandingCta } from "./landing-cta";

describe("FixedLandingCta", () => {
  it("시작하기 버튼이 렌더링되어야 한다", () => {
    renderWithUser(<FixedLandingCta />);
    expect(screen.getByText(textContentMatcher("시작하기"))).toBeInTheDocument();
  });

  it("userName이 비어있을 경우 enterName 페이지로 이동해야 한다", async () => {
    const { user } = renderWithUser(<FixedLandingCta />);

    await user.click(screen.getByText(textContentMatcher("시작하기")));
  });

  it("userName이 존재할 경우 StartDialog를 열어야 한다", async () => {
    const { user } = renderWithUser(
      <userStore.Provider value={atom({ userName: "hello" }) as any}>
        <FixedLandingCta />
      </userStore.Provider>,
    );

    await user.click(screen.getByText(textContentMatcher("시작하기")));
    expect(screen.getByText(textContentMatcher(/hello님/))).toBeInTheDocument();
  });
});
