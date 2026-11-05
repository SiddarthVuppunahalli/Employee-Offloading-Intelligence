import { NextRequest, NextResponse } from 'next/server';
import type {
  CompleteInterviewRequest,
  CompleteInterviewResponse,
  InterviewQuestionsRequest,
  InterviewQuestionsResponse,
} from '@app-starter/shared';
import { DEMO_INTERVIEW_PLANS } from '@/data/handoff-demo';

type InterviewRequest = InterviewQuestionsRequest | CompleteInterviewRequest;
type InterviewResponse =
  | InterviewQuestionsResponse
  | CompleteInterviewResponse
  | { message: string };

export const POST = async (request: NextRequest): Promise<NextResponse<InterviewResponse>> => {
  const body = (await request.json()) as InterviewRequest;

  await new Promise((resolve) => setTimeout(resolve, 350));
  const plan = DEMO_INTERVIEW_PLANS[body.riskId];

  if (!plan) {
    return NextResponse.json(
      { message: `No interview plan exists for risk ${body.riskId}.` },
      { status: 404 },
    );
  }

  if (body.action === 'questions') {
    return NextResponse.json({
      objective: plan.objective,
      questions: plan.questions.map((question) => ({
        ...question,
        evidenceFiles: [...question.evidenceFiles],
      })),
      suggestedAnswers: [...plan.suggestedAnswers],
    });
  }

  const capturedAnswers = plan.questions
    .map((question, index) => `## ${question.prompt}\n\n${body.answers[index] ?? 'Not captured.'}`)
    .join('\n\n');

  return NextResponse.json({
    filename: plan.filename,
    title: plan.title,
    content: plan.curatedContent ?? `# ${plan.title}\n\n${capturedAnswers}`,
  });
};
