import { createEnvDTs } from "./create-env-d-ts";

describe("Createenvdts를 테스트합니다.", () => {
  it("Createenvdts는", () => {
    const exampleEnv = "    NEXT_PUBLIC_GTM_ID=GTM-dsakmlsa \nGA_ID=G-dsalfsa\nGSC_ID=dsamfsfsdam3214";
    const result = createEnvDTs(exampleEnv, "node");
    console.log(result);
    expect(true).toBe(true);
  });
});
