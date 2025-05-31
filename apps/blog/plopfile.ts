import fs from "node:fs";
import path from "node:path";
import { kebabCase } from "es-toolkit";
import type { NodePlopAPI } from "plop";

// 한글 포함 여부를 검사하는 정규식 상수
const KOREAN_REGEX = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;

const mdxGenAction = (plop: NodePlopAPI) => {
  plop.setActionType("mdx-generator-action", async (answers) => {
    try {
      const typedAnswers = answers as {
        category: string;
        fileName: string;
        title: string;
        description: string;
      };
      const { category, fileName, title, description } = typedAnswers;
      const kebabFileName = kebabCase(fileName);
      const fileNameWithExt = kebabFileName.endsWith(".mdx") ? kebabFileName : `${kebabFileName}.mdx`;
      const targetDir = path.resolve(process.cwd(), "contents", category);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const mdxContent = `---\ntitle: \"${title}\"\ndescription: \"${description}\"\ncreatedAt: \"${new Date().toISOString()}\"\ncanView: true\n---\n\n`;
      fs.writeFileSync(path.join(targetDir, fileNameWithExt), mdxContent);
      return `✅ ${fileNameWithExt} 파일이 ${category} 카테고리에 생성되었어요`;
    } catch (_e) {
      return "알 수 없는 오류가 발생했어요";
    }
  });

  plop.setGenerator("mdx-generator", {
    description: "MDX 파일을 생성해요",
    prompts: [
      {
        type: "list",
        name: "category",
        message: "카테고리를 선택하세요",
        choices: () => {
          const contentsPath = path.resolve(process.cwd(), "contents");
          return fs.readdirSync(contentsPath).filter((f) => fs.statSync(path.join(contentsPath, f)).isDirectory());
        },
      },
      {
        type: "input",
        name: "fileName",
        message: "파일명을 입력하세요 (확장자 없이 입력하면 .mdx가 자동으로 붙습니다)",
        validate: (input: string) => {
          if (KOREAN_REGEX.test(input)) {
            return "파일명에 한글을 포함할 수 없습니다.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "title",
        message: "타이틀을 입력하세요",
      },
      {
        type: "input",
        name: "description",
        message: "디스크립션을 입력하세요",
      },
    ],
    actions: [
      {
        type: "mdx-generator-action",
      },
    ],
  });
};

export default function (plop: NodePlopAPI) {
  mdxGenAction(plop);
}
