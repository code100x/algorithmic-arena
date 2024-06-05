import Router from "express";
import submissionRouter from "./submission";
import contestRouter from "./contest";
import problemRouter from "./problem";

const router = Router();

router.use("/submission", submissionRouter);
router.use("/contest", contestRouter);
router.use("/problem", problemRouter);

export default router;
