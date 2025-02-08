import fs from "node:fs";
import path from "node:path";
import type { NodePlopAPI } from "plop";

declare module "plop" {
  interface ActionConfig {
    [key: string]: unknown;
  }
}

function getProjectChoices() {
  const baseDirs = ["apps"];
  const choices: { name: string; value: string }[] = [];

  baseDirs.forEach((baseDir) => {
    const dirPath = path.join(process.cwd(), baseDir);
    if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
      const subDirs = fs.readdirSync(dirPath).filter((name) => {
        const fullPath = path.join(dirPath, name);
        return fs.lstatSync(fullPath).isDirectory();
      });
      subDirs.forEach((sub) => {
        choices.push({
          name: `${baseDir}/${sub}`,
          value: `${baseDir}/${sub}`,
        });
      });
    }
  });

  return choices;
}
export default function (plop: NodePlopAPI) {
  plop.setHelper("upperCase", (txt: string) => txt.toUpperCase());
  plop.setHelper("lowerCase", (txt: string) => txt.toLowerCase());

  plop.setActionType("mkdir", (answers, config, plop) => {
    const targetPath = path.resolve(
      process.cwd(),
      plop.renderString((config as unknown as { path: string }).path, answers),
    );
    try {
      fs.mkdirSync(targetPath, { recursive: true });
      return `디렉토리 생성됨: ${targetPath}`;
    } catch (err: any) {
      return `디렉토리 생성 실패 (${targetPath}): ${err.message}`;
    }
  });

  plop.setGenerator("fsd-folder-generator", {
    description: "FSD 구조를 위한 폴더 생성 (entities, features, shared)",
    prompts: [
      {
        type: "list",
        name: "project",
        message: "어떤 프로젝트에 생성하실래요?",
        choices: getProjectChoices,
      },
      {
        type: "list",
        name: "module",
        message: "생성할 모듈 종류를 선택하세요:",
        choices: ["entities", "features", "shared"],
      },
      {
        type: "input",
        name: "folderName",
        message: "생성할 폴더 이름을 입력하세요:",
      },
    ],
    actions: [
      {
        type: "mkdir",
        path: "./{{project}}/src/{{module}}/{{folderName}}/api",
      },
      {
        type: "mkdir",
        path: "./{{project}}/src/{{module}}/{{folderName}}/model",
      },
      {
        type: "mkdir",
        path: "./{{project}}/src/{{module}}/{{folderName}}/components",
      },
      {
        type: "mkdir",
        path: "./{{project}}/src/{{module}}/{{folderName}}/lib",
      },
    ],
  });

  plop.setGenerator("animation-component-generator", {
    description: "애니메이션 컴포넌트 생성",
    prompts: [
      {
        type: "input",
        name: "folderName",
        message: "생성할 컴포넌트의 이름을 입력하세요:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "./apps/blog/src/shared/ui/animations/{{pascalCase folderName}}/{{pascalCase folderName}}.tsx",
        templateFile: "./.templates/animation-component.tsx.hbs",
      },
      {
        type: "add",
        path: "./apps/blog/src/shared/ui/animations/{{pascalCase folderName}}/{{pascalCase folderName}}.css",
        templateFile: "",
      },
    ],
  });
}
