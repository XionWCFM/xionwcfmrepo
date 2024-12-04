import path from "node:path";
import chalk from "chalk";
import { Command } from "commander";
import { mkdirSync, writeFileSync } from "fs-extra";
import inquirer from "inquirer";

const program = new Command();

program.name("repo-cli").description("모노레포 프로젝트를 위한 패키지 생성기").version("1.0.0");

async function createPackage() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter a package name",
      validate: (input: string) => !!input || "Enter a package name",
    },
    {
      type: "list",
      name: "tsconfig",
      message: "Choose a tsconfig",
      choices: ["base.json", "react-library.json", "nextjs.json"],
    },
  ]);

  const projectName = answers.projectName;
  const tsconfig = answers.tsconfig;

  const packagePath = path.resolve(process.cwd(), `packages/${projectName}`);
  const srcPath = path.join(packagePath, "src");
  const indexPath = path.join(srcPath, "index.ts");
  const packageJsonPath = path.join(packagePath, "package.json");
  const tsconfigPath = path.join(packagePath, "tsconfig.json");

  try {
    // 패키지 디렉토리 생성
    mkdirSync(packagePath, { recursive: true });

    // src 디렉토리와 index.ts 생성
    mkdirSync(srcPath, { recursive: true });
    writeFileSync(indexPath, ""); // 빈 파일 생성

    // package.json 생성
    const packageJson = {
      name: `@repo/${projectName}`,
      version: "0.0.0",
      main: "index.js",
      devDependencies: {
        "@repo/typescript-config": "workspace:*",
        typescript: "latest",
      },
    };
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // tsconfig.json 생성
    const tsconfigContent = {
      extends: `@repo/typescript-config/${tsconfig}`,
      compilerOptions: {
        outDir: "dist",
        rootDir: "src",
      },
      include: ["src"],
      exclude: ["node_modules", "dist"],
    };
    writeFileSync(tsconfigPath, JSON.stringify(tsconfigContent, null, 2));

    console.log(chalk.green(`✅ 패키지 "${projectName}"가 생성되었습니다!`));
  } catch (err) {
    if (err instanceof Error) {
      console.error(chalk.red(`❌ 패키지 생성 중 에러가 발생했습니다: ${err.message}`));
    } else {
      console.error(chalk.red(`❌ 패키지 생성 중 알 수 없는 에러가 발생했습니다.`));
    }
  }
}

program.action(createPackage);

program.parse(process.argv);
