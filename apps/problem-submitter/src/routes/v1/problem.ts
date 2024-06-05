import Express from "express";
import { JUDGE0_URI } from "../../config";
import axios from "axios";
import { SubmissionInput } from "../../types";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { getProblem } from "../../problems";
import { prismaClient } from "../../db";

const router = Express.Router();

router.post("/", async (req, res) => {
    const submissionInput = SubmissionInput.safeParse(req.body);
    if (!submissionInput.success) {
        return res.status(403).json({
            message: "Invalid input"
        })
    }

    const problem = await getProblem(submissionInput.data.problemId, submissionInput.data.languageId);
    problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace("##USER_CODE_HERE##", submissionInput.data.code);

    const response = await axios.post(`${JUDGE0_URI}/submissions/batch?base64_encoded=false`, {
            "submissions": problem.inputs.map((input, index) => ({
                "language_id": LANGUAGE_MAPPING[submissionInput.data.languageId].judge0,
                "source_code": problem.fullBoilerplateCode,
                "stdin": input,
                "expected_output": problem.outputs[index],
                "callback_url": "https://httpdump.app/dumps/2e3f2f40-2515-47e7-930e-04d79e2a932f"
            }))
    });

    const submission = await prismaClient.submission.create({
        data: {
            problemId: submissionInput.data.problemId,
            languageId: LANGUAGE_MAPPING[submissionInput.data.languageId].internal,
            code: submissionInput.data.code,
            fullCode: problem.fullBoilerplateCode,
            status: "PENDING",
        }
    });

    await prismaClient.testCase.createMany({
        data: problem.inputs.map((input, index) => ({
            submissionId: submission.id,
            status: "PENDING",
            index,
            judge0TrackingId: response.data[index].token,
        }))
    });
    res.send("Submission made");
});

export default router;