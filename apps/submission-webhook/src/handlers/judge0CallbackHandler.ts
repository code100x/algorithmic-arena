import { SubmissionCallback } from '@repo/common/zod';
import { Judge0Submission } from '../models/Judge0Submission';
import { Submission } from '../models/Submission';
import { TestCase } from '../models/TestCase';

export async function handleJudge0Callback(callbackData: typeof SubmissionCallback._type['output']) {
  const { token, status, stdout, stderr, compileOutput, time, memory } = callbackData;

  const judge0Submission = await Judge0Submission.findBySubmissionId(token);
  if (!judge0Submission) {
    throw new Error('Judge0 submission not found');
  }

  const updatedJudge0Submission = await judge0Submission.update({
    status: status.description,
    stdout,
    stderr,
    compileOutput,
    time: parseFloat(time || '0'),
    memory: memory || null,
  });

  const submission = await Submission.findById(updatedJudge0Submission.submissionId);
  if (!submission) {
    throw new Error('Submission not found');
  }


  let testCase = await TestCase.findByJudge0TrackingId(token);
  if (!testCase) {
    testCase = await TestCase.create({
      judge0TrackingId: token,
      status: status.description,
      time: parseFloat(time || '0'),
      memory: memory || null,
      submissionId: submission.id,
    });
  } else {
    await testCase.update({
      status: status.description,
      time: parseFloat(time || '0'),
      memory: memory || null,
    });
  }

  await submission.update({
    status: updatedJudge0Submission.status,
    time: updatedJudge0Submission.time,
    memory: updatedJudge0Submission.memory,
  });


}
