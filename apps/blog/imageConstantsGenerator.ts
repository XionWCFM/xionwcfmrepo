import fs from "node:fs";
import path from "node:path";
import { constantCase } from "es-toolkit";
import { execa } from "execa";
import fg from "fast-glob";
import sharp from "sharp";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const publicImagesDir = path.join(__dirname, "public");
const outputDir = path.join(__dirname, "src/shared/constants/images");
const globPattern = "**/*.webp";

const getImageFiles = () => {
  const files = fg.sync(globPattern, { cwd: publicImagesDir });
  const mappedFiles = files.map((item) => {
    const src = `${"/"}${item.replace(/\\/g, "/")}`;
    const fileName = path.basename(item);
    const dirPath = `${"/"}${path.dirname(item).replace(/\\/g, "/")}`;

    return {
      src,
      fileName,
      path: dirPath === "/." ? "/" : dirPath,
    };
  });
  const filteredFiles = mappedFiles.filter((item) => !item.path.includes("/posts"));
  return filteredFiles;
};

const transformPathData = async <T, K extends string>(array: T[], callback: (item: T) => K) => {
  const result = await Promise.all(
    array.map((item) => {
      return (async () => {
        const image = sharp(path.join(publicImagesDir, callback(item)));
        const metadata = await image.metadata();
        return {
          ...item,
          width: metadata.width,
          height: metadata.height,
          image,
        };
      })();
    }),
  );
  return result;
};

const generateOutputData = async () => {
  const files = getImageFiles();

  const transformedFiles = await transformPathData(files, (file) => file.src);

  const outputData = transformedFiles.reduce((acc, cur) => {
    const constantName = constantCase(cur.fileName);
    return `${acc}
    export const ${constantName} = {
      src: "${cur.src}",
      width: ${cur.width},
      height: ${cur.height},
    };
  `;
  }, "");
  return outputData;
};

const writeOutputFile = async () => {
  const outputData = await generateOutputData();
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "images.ts"), outputData);
  await execa("npx", [
    "@biomejs/biome",
    "format",
    "--config-path=../../biome.json",
    "--write",
    path.join(outputDir, "images.ts"),
  ]);
};

writeOutputFile();
