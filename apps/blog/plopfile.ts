import fs from "node:fs";
import path from "node:path";
import { kebabCase } from "es-toolkit";
import type { NodePlopAPI } from "plop";

const mdxGenAction = (plop: NodePlopAPI) => {
  plop.setActionType("mdx-generator-action", async (answers) => {
    try {
      const typedAnswers = answers as {
        category: string;
        title: string;
        description: string;
      };
      const { category, title, description } = typedAnswers;
      const fileName = `${kebabCase(title)}.mdx`;
      const targetDir = path.resolve(process.cwd(), "contents", category);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const mdxContent = `---\ntitle: \"${title}\"\ndescription: \"${description}\"\ncanView: true\n---\n\n`;
      fs.writeFileSync(path.join(targetDir, fileName), mdxContent);
      return `✅ ${fileName} 파일이 ${category} 카테고리에 생성되었어요`;
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
