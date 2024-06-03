
import Express from "express";
import { JUDGE0_URI } from "../../config";
import axios from "axios";
import { SubmissionInput } from "../../types";
import { LANGUAGE_MAPPING } from "../../judge0";
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
                "language_id": LANGUAGE_MAPPING[submissionInput.data.languageId],
                "source_code": problem.fullBoilerplateCode,
                "stdin": input,
                "expected_output": problem.outputs[index],
                "callback_url": "https://httpdump.app/dumps/ef2e5e04-0b69-4c52-96ba-d6be23ce3755"
            }))
    });

    console.log(response.data)
    await prismaClient.submission.create({
        data: {
            problemId: submissionInput.data.problemId,
            languageId: submissionInput.data.languageId,
            code: submissionInput.data.code,
            fullCode: problem.fullBoilerplateCode,
            status: "PENDING",
            testcases: {
                create: problem.inputs.map((input, index) => ({
                    status: "PENDING",
                    index,
                    judge0TrackingId: response.data[index].token,
                }))
            }
        }
    });

    
        res.send("Submission made");
});

export default router;