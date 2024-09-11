import { LANGUAGE_MAPPING } from "@repo/common/language";
import { capitalize } from "@repo/common/utils";
import fs from "fs";
import prismaClient from "../src";
import { parse } from "yaml";

const MOUNT_PATH = process.env.MOUNT_PATH ?? "../../apps/problems";
function promisifedReadFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

type ProblemYaml = {
  Title: string;
  Description: string;
  Constraints?: string[];
  Examples?: { Input: string; Output: string }[];
  Topics?: string[];
};

async function main(problemSlug: string) {
  const problemStatement = await promisifedReadFile(
    `${MOUNT_PATH}/${problemSlug}/Problem.yml`
  );

  const problemYaml: ProblemYaml = parse(problemStatement);
  console.log(problemYaml);

  const examples = problemYaml.Examples?.map((example) => {
    return `**Input:** \`${example.Input}\`\n\n**Output:** \`${example.Output}\``;
  });

  let constraints = problemYaml.Constraints?.reduce((acc, constraint) => {
    return `${acc}- \`${constraint}\`\n`;
  }, "");
  constraints = constraints?.replace(/\n$/, "");

  const problem = await prismaClient.problem.upsert({
    where: {
      slug: problemSlug,
    },
    create: {
      title: problemYaml.Title,
      slug: problemSlug,
      description: problemYaml.Description,
      hidden: false,
      topics: problemYaml.Topics ?? [],
      examples: examples ?? [],
      constraints: constraints ?? null,
    },
    update: {
      title: problemYaml.Title,
      description: problemYaml.Description,
      hidden: false,
      topics: problemYaml.Topics ?? [],
      examples: examples ?? [],
      constraints: constraints ?? null,
    },
  });

  await Promise.all(
    Object.keys(LANGUAGE_MAPPING).map(async (language) => {
      const code = await promisifedReadFile(
        `${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`
      );
      await prismaClient.defaultCode.upsert({
        where: {
          problemId_languageId: {
            problemId: problem.id,
            languageId: LANGUAGE_MAPPING[language].internal,
          },
        },
        create: {
          problemId: problem.id,
          languageId: LANGUAGE_MAPPING[language].internal,
          code,
        },
        update: {
          code,
        },
      });
    })
  );
}

export async function addProblemsInDB() {
  fs.readdir(MOUNT_PATH, (err, dirs) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    dirs.forEach(async (dir) => {
      await main(dir);
    });
  });
}
