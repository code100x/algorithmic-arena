import { LANGUAGE_MAPPING } from "@repo/common/language";
import { capitalize } from "@repo/common/utils";
import fs from "fs";
import prismaClient from "../src";

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

async function main(problemSlug: string, problemTitle: string) {
  const problemStatement = await promisifedReadFile(
    `${MOUNT_PATH}/${problemSlug}/Problem.md`
  );

  const t = await promisifedReadFile(`${MOUNT_PATH}/${problemSlug}/topics.txt`);
  const topics = t.split(",");

  const constraints = await promisifedReadFile(
    `${MOUNT_PATH}/${problemSlug}/constraints.md`
  );

  const examples: string[] = [];
  const dirs = fs.readdirSync(`${MOUNT_PATH}/${problemSlug}/examples`);
  const readExamples = dirs.map(async (dir) => {
    const example = await promisifedReadFile(
      `${MOUNT_PATH}/${problemSlug}/examples/${dir}`
    );
    return example;
  });

  await Promise.all(readExamples).then((results) => {
    examples.push(...results);
  });

  const problem = await prismaClient.problem.upsert({
    where: {
      slug: problemSlug,
    },
    create: {
      title: capitalize(problemTitle),
      slug: problemSlug,
      description: problemStatement,
      hidden: false,
      topics,
      examples,
      constraints,
    },
    update: {
      title: capitalize(problemTitle),
      description: problemStatement,
      hidden: false,
      topics,
      examples,
      constraints,
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
      await main(dir, dir);
    });
  });
}
