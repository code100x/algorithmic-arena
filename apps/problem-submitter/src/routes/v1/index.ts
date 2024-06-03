
import Router from "express";
import submissionRouter from "./submission";

const router = Router();

router.use("/submission", submissionRouter);

export default router;