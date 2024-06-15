import prismaClient from "../src";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { addProblemsInDB } from "./updateQuestion";
import languages from "../src/languages";

(async () => {
  try {
    await prismaClient.language.createMany({
      data: Object.keys(LANGUAGE_MAPPING).map((language) => ({
        id: LANGUAGE_MAPPING[language].internal,
        name: language,
        judge0Id: LANGUAGE_MAPPING[language].judge0,
      })),
    })
  } catch (e) {
    console.log("Languages already persist in the DB!");

  }
})();
(async () => {
  try {
    await prismaClient.languages.createMany({ data: languages })
  }
  catch (e) {
    console.log("Languages2 already persist in the DB!");
  }
}
)();
try {
  addProblemsInDB();
}
catch (e) {
  console.log("Data already persist in the DB!")
}
