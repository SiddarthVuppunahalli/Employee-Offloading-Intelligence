import { NextResponse } from 'next/server';
import type { KnowledgeProviderStatus } from '@app-starter/shared';
import { getKnowledgeProviderStatus } from '@/lib/server/knowledge-analysis-provider';

export const dynamic = 'force-dynamic';

export const GET = async (): Promise<NextResponse<KnowledgeProviderStatus>> =>
  NextResponse.json(await getKnowledgeProviderStatus());
