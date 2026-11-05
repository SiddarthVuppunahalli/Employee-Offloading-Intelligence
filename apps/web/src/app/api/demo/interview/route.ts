import { NextRequest, NextResponse } from 'next/server';
import type {
  CompleteInterviewRequest,
  CompleteInterviewResponse,
  InterviewQuestionsRequest,
  InterviewQuestionsResponse,
} from '@app-starter/shared';
import {
  VENDOR_INTERVIEW_QUESTIONS,
  VENDOR_KNOWLEDGE_DOCUMENT,
  VENDOR_SUGGESTED_ANSWERS,
} from '@/data/handoff-demo';

type InterviewRequest = InterviewQuestionsRequest | CompleteInterviewRequest;

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<InterviewQuestionsResponse | CompleteInterviewResponse>> => {
  const body = (await request.json()) as InterviewRequest;

  await new Promise((resolve) => setTimeout(resolve, 350));

  if (body.action === 'questions') {
    return NextResponse.json({
      questions: [...VENDOR_INTERVIEW_QUESTIONS],
      suggestedAnswers: [...VENDOR_SUGGESTED_ANSWERS],
    });
  }

  return NextResponse.json({
    filename: 'interview-corvid-sms.md',
    title: 'Why Brightline uses Corvid SMS',
    content: VENDOR_KNOWLEDGE_DOCUMENT,
  });
};
