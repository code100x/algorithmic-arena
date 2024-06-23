import { addProblem } from "../prisma/updateQuestion";

(async () => {
  const problemSlug = process.argv[2];
  if (!problemSlug) process.exit(1);
  try {
    await addProblem(problemSlug, problemSlug);
  } catch (e) {
    console.error(`An error occurred while populating ${problemSlug}`);
    console.error(e);
  }
})();
