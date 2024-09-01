import { addUsers } from "./addUsers";
import { addSubmissions } from "./addSubmissions";
import { addLanguage } from "./addLanguages";
import { addProblemsInDB } from "./updateQuestion";

async function seed() {
  try {
    await addLanguage();
    await addProblemsInDB();
    await addUsers();
    await addSubmissions();
  } catch (e) {
    console.log("Data already persist in the DB!");
  }
}

seed();
