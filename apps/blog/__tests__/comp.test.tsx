import { render } from "@testing-library/react";

describe("@testing-library/react는", () => {
  it("jsx로 작성된 컴포넌트를 렌더링 할 수 있어야합니다.", () => {
    const Hi = () => {
      return <div>Hi</div>;
    };
    render(<Hi />);
    expect(Hi).toBeDefined();
  });
});
