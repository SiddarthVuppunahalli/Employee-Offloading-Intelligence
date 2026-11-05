export type KnowledgeRiskSeverity = 'HIGH' | 'MEDIUM' | 'LOW';

export type KnowledgeArtifactSource = 'DOCUMENT' | 'TICKET' | 'CHAT' | 'EMAIL' | 'INTERVIEW';

export interface KnowledgeArtifactSummary {
  id: string;
  filename: string;
  source: KnowledgeArtifactSource;
  author: string;
  excerpt: string;
  riskIds: string[];
}

export interface KnowledgeRisk {
  id: string;
  title: string;
  severity: KnowledgeRiskSeverity;
  whyOnlyEmployeeKnows: string;
  missingKnowledge: string;
  evidenceFiles: string[];
}

export interface KnowledgeScanResponse {
  employeeName: string;
  artifactsScanned: number;
  risks: KnowledgeRisk[];
  provider: KnowledgeProviderStatus;
}

export type KnowledgeProviderMode = 'TRIGGERWARE' | 'DEMO';

export interface KnowledgeProviderStatus {
  mode: KnowledgeProviderMode;
  label: string;
  isConnected: boolean;
  detail: string;
}

export interface CitedAnswer {
  answer: string;
  citations: string[];
  isDocumented: boolean;
}

export interface AskKnowledgeRequest {
  question: string;
  hasCompletedInterview: boolean;
}

export interface InterviewQuestionsRequest {
  action: 'questions';
  riskId: string;
}

export interface CompleteInterviewRequest {
  action: 'complete';
  riskId: string;
  answers: string[];
}

export interface InterviewQuestion {
  id: string;
  prompt: string;
  rationale: string;
  evidenceFiles: string[];
}

export interface InterviewQuestionsResponse {
  objective: string;
  questions: InterviewQuestion[];
  suggestedAnswers: string[];
}

export interface CompleteInterviewResponse {
  filename: string;
  title: string;
  content: string;
}
