import { LANGUAGE_MAPPING } from "@repo/common/language";
import languages from "../src/languages";
import prismaClient from "../src";

export async function addLanguage() {
  try {
    await prismaClient.language.createMany({
      data: Object.keys(LANGUAGE_MAPPING).map((language) => ({
        id: LANGUAGE_MAPPING[language].internal,
        name: language,
        judge0Id: LANGUAGE_MAPPING[language].judge0,
      })),
    });
  } catch (e) {
    console.log("Languages already persist in the DB!");
  }

  try {
    await prismaClient.languages.createMany({ data: languages });
  } catch (e) {
    console.log("Languages2 already persist in the DB!");
  }
}
