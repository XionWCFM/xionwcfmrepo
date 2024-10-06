import { splitEnv } from "./split-env";

describe("Splitenv를 테스트합니다.", () => {
  it("공백을 적절히 제거하고 환경변수를 키값 쌍으로 가집니다.", () => {
    const exampleEnv = "    NEXT_PUBLIC_GTM_ID=GTM-dsakmlsa \nGA_ID=G-dsalfsa\nGSC_ID=dsamfsfsdam3214";
    const result = splitEnv(exampleEnv);
    expect(result).toEqual([
      ["NEXT_PUBLIC_GTM_ID", "GTM-dsakmlsa"],
      ["GA_ID", "G-dsalfsa"],
      ["GSC_ID", "dsamfsfsdam3214"],
    ]);
  });
  it("유효하지 않은 텍스트가 들어온경우 에러를 던진다", () => {
    const exampleEnv = "안녕하세요";
    expect(() => splitEnv(exampleEnv)).toThrowError();
  });
});
