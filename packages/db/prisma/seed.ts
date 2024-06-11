import { prismaClient } from "../src";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { addProblemsInDB } from "./updateQuestion";
(async () =>
  await prismaClient.language.createMany({
    data: Object.keys(LANGUAGE_MAPPING).map((language) => ({
      id: LANGUAGE_MAPPING[language].internal,
      name: language,
      judge0Id: LANGUAGE_MAPPING[language].judge0,
    })),
  }))();
  
  addProblemsInDB();