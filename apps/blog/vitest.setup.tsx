import { cleanup } from "@testing-library/react";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";

createFetchMock(vi).enableMocks();

// react 카나리로 인한 워닝 문제 해결을 위해 이미지 컴포넌트를 모킹합니다.
vi.mock("@repo/env", () => ({
  env: {
    NODE_ENV: "development", // 테스트 환경에 맞게 설정
  },
}));

vi.mock("next/image", () => {
  const MockedImage = ({ src, alt, fetchPriority, ...props }: any) => {
    // biome-ignore lint/a11y/useAltText: <explanation>
    return <img src={src} alt={alt} {...props} />;
  };
  MockedImage.displayName = "MockedImage";
  return {
    default: MockedImage,
  };
});

// eslint-disable-next-line no-undef
beforeEach(() => {
  localStorage.clear();
});

// eslint-disable-next-line no-undef
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});
