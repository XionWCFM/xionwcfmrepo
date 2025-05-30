import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import type { MdxRepositoryItem } from "./type";

const __dirname = process.cwd();

const asyncReadFileStat = async (filePath: string) => {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
};

const asyncReadFile = async (filePath: string) => {
  return fs.promises.readFile(filePath, "utf8");
};

export class MdxRepository<T> {
  private rootDir: string;
  private globPattern: string;
  validate: (value: unknown) => T;
  private sortedResources: MdxRepositoryItem<T>[] | null;

  constructor(props: {
    rootDir: string;
    globPattern: string;
    validate: (value: unknown) => T;
  }) {
    this.rootDir = path.join(__dirname, props.rootDir);
    this.globPattern = props.globPattern;
    this.validate = props.validate;
    this.sortedResources = null;
  }

  getAllFilePaths() {
    const files = fg.sync(this.globPattern, { cwd: this.rootDir });
    const mappedFiles = files.map((item) => {
      const fullPath = `${"/"}${item.replace(/\\/g, "/")}`;
      const fileName = path.basename(item).replace(/\.mdx$/, "");
      const dirPath = `${"/"}${path.dirname(item).replace(/\\/g, "/")}`;

      return {
        fullPath,
        fileName,
        path: dirPath === "/." ? "/" : dirPath,
      };
    });
    return mappedFiles;
  }

  async getSortedResources() {
    if (this.sortedResources) {
      return this.sortedResources;
    }
    this.sortedResources = await this.getAllFilesUpdatedAt();
    return this.sortedResources;
  }

  async getAllFilesUpdatedAt() {
    const files = this.getAllFilePaths();
    const mapped = await Promise.all(
      files.map((item) => {
        return (async () => {
          const result = await this.asyncGetFrontmatterByFileName(item.fileName);
          return {
            ...item,
            ...result,
          };
        })();
      }),
    );
    const sorted = mapped.sort((a, b) => {
      return new Date(b.stats.updatedAt).getTime() - new Date(a.stats.updatedAt).getTime();
    });

    return sorted;
  }

  async getFileByFileName(inputFileName: string) {
    const fileNameWithExt = inputFileName.endsWith(".mdx") ? inputFileName : `${inputFileName}.mdx`;
    const globFile = `**/${fileNameWithExt}`;
    const result = await fg(globFile, { cwd: this.rootDir });
    if (!result[0]) {
      throw new Error("File not found");
    }
    const finalPath = path.join(this.rootDir, result[0]);
    const [file, stats] = await Promise.all([asyncReadFile(finalPath), asyncReadFileStat(finalPath)]);

    const fullPath = `${"/"}${result[0].replace(/\\/g, "/")}`;
    const fileName = path.basename(result[0]).replace(/\.mdx$/, "");
    const dirPath = `${"/"}${path.dirname(result[0]).replace(/\\/g, "/")}`;

    return { file, stats, fullPath, fileName, path: dirPath };
  }

  readFileByName(fileName: string) {
    const filePath = path.join(this.rootDir, fileName);
    const file = fs.readFileSync(filePath, "utf8");
    return file;
  }

  async asyncGetFrontmatterByFileName(
    fileName: string,
  ): Promise<{ frontmatter: T; stats: { updatedAt: string; createdAt: string } }> {
    const { file, stats } = await this.getFileByFileName(fileName);
    const { data } = matter(file);

    return {
      frontmatter: this.validate(data),
      stats: {
        updatedAt: stats.mtime.toISOString(),
        createdAt: stats.birthtime.toISOString(),
      },
    };
  }

  async compileMdxByFileName(inputFileName: string) {
    const { file, stats, fullPath, fileName, path } = await this.getFileByFileName(inputFileName);
    const result = matter(file);
    return {
      frontmatter: this.validate(result.data),
      stats: {
        updatedAt: stats.mtime.toISOString(),
        createdAt: stats.birthtime.toISOString(),
      },
      fullPath,
      fileName,
      path,
      code: result.content,
    };
  }

  getFrontmatterByMdx(mdx: string): { frontmatter: T } {
    const { data } = matter(mdx);
    return { frontmatter: this.validate(data) };
  }

  async pagination(page: number, limit: number): Promise<MdxRepositoryItem<T>[]> {
    const sortedResources = await this.getSortedResources();
    const start = (page - 1) * limit;
    const end = start + limit;
    const resources = sortedResources.slice(start, end);
    return resources;
  }
}
