import { NextResponse } from 'next/server';
import type { KnowledgeScanResponse } from '@app-starter/shared';
import { DEMO_ARTIFACTS, DEMO_EMPLOYEE, DEMO_RISKS } from '@/data/handoff-demo';

export const POST = async (): Promise<NextResponse<KnowledgeScanResponse>> => {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return NextResponse.json({
    employeeName: DEMO_EMPLOYEE.name,
    artifactsScanned: DEMO_ARTIFACTS.length,
    risks: DEMO_RISKS,
  });
};
