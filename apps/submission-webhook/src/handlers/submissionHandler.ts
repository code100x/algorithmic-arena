import { SubmissionInput } from '@repo/common/zod';
import { Judge0Submission } from '../models/Judge0Submission';
import { Submission } from '../models/Submission';

export async function handleSubmission(submissionData: SubmissionInput) {
  const { code, languageId, problemId, activeContestId } = submissionData;

  const submission = await Submission.create({
    code,
    languageId,
    problemId,
    activeContestId,
    status: 'PENDING',
  });

  const judge0Submission = await Judge0Submission.create({
    submissionId: submission.id,
    status: 'PENDING',
  });

// await judge0Submission.sendToJudge0(); // This will send the submission to judge0
// await judge0Submission.awaitCallback(); // This will wait for the callback from judge0


  return submission;
}