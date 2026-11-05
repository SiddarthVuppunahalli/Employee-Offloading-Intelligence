import { NextResponse } from 'next/server';
import type { KnowledgeScanResponse } from '@app-starter/shared';
import { DEMO_ARTIFACTS, DEMO_EMPLOYEE } from '@/data/handoff-demo';
import { scanKnowledgeRisks } from '@/lib/server/knowledge-analysis-provider';

export const POST = async (): Promise<NextResponse<KnowledgeScanResponse>> => {
  await new Promise((resolve) => setTimeout(resolve, 900));
  const result = await scanKnowledgeRisks(DEMO_ARTIFACTS);

  return NextResponse.json({
    employeeName: DEMO_EMPLOYEE.name,
    artifactsScanned: DEMO_ARTIFACTS.length,
    risks: result.risks,
    provider: result.provider,
  });
};
