import { NextRequest, NextResponse } from 'next/server';
import type { AskKnowledgeRequest, CitedAnswer } from '@app-starter/shared';

export const POST = async (request: NextRequest): Promise<NextResponse<CitedAnswer>> => {
  const body = (await request.json()) as AskKnowledgeRequest;
  const normalizedQuestion = body.question.trim().toLowerCase();

  await new Promise((resolve) => setTimeout(resolve, 550));

  if (!body.hasCompletedInterview && normalizedQuestion.includes('corvid')) {
    return NextResponse.json({
      answer:
        'This is not documented. The closest records say Corvid SMS was selected for cost and mention a carrier consideration, but they do not explain the alternatives or the deciding reason.',
      citations: ['adr-notifications-vendor.md', 'slack-platform-vendor-eval.txt'],
      isDocumented: false,
    });
  }

  if (body.hasCompletedInterview && normalizedQuestion.includes('corvid')) {
    return NextResponse.json({
      answer:
        'Brightline chose Corvid SMS because it was roughly one third cheaper at the company’s message volume and has direct agreements with regional carriers in its two largest markets. Competing providers would route messages through a slower hub. Dana Okafor is the vendor contact, and Priya Shah should take over internally before the March renewal.',
      citations: ['interview-corvid-sms.md', 'adr-notifications-vendor.md'],
      isDocumented: true,
    });
  }

  return NextResponse.json({
    answer:
      'The available sources do not contain enough evidence to answer that confidently. Try asking about Corvid SMS for this prepared demo.',
    citations: [],
    isDocumented: false,
  });
};
