'use client';

import { useMemo, useState } from 'react';
import type {
  CitedAnswer,
  CompleteInterviewResponse,
  InterviewQuestionsResponse,
  KnowledgeRisk,
  KnowledgeScanResponse,
} from '@app-starter/shared';
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDot,
  FileText,
  Loader2,
  MessageSquareText,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { DEMO_ARTIFACTS, DEMO_EMPLOYEE } from '@/data/handoff-demo';

const DEFAULT_QUESTION = 'Why do we use Corvid SMS?';

const SEVERITY_STYLES: Record<KnowledgeRisk['severity'], string> = {
  HIGH: 'border-red-200 bg-red-50 text-red-700',
  MEDIUM: 'border-amber-200 bg-amber-50 text-amber-700',
  LOW: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

const DemoPage = () => {
  const [risks, setRisks] = useState<KnowledgeRisk[]>([]);
  const [selectedRiskId, setSelectedRiskId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [answer, setAnswer] = useState<CitedAnswer | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [interview, setInterview] = useState<InterviewQuestionsResponse | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [interviewAnswers, setInterviewAnswers] = useState<string[]>([]);
  const [isStartingInterview, setIsStartingInterview] = useState(false);
  const [isSavingInterview, setIsSavingInterview] = useState(false);
  const [knowledgeDocument, setKnowledgeDocument] = useState<CompleteInterviewResponse | null>(
    null,
  );

  const selectedRisk = useMemo(
    () => risks.find((risk) => risk.id === selectedRiskId) ?? null,
    [risks, selectedRiskId],
  );

  const sourceCount = DEMO_ARTIFACTS.length + (knowledgeDocument ? 1 : 0);
  const currentInterviewQuestion = interview?.questions[questionIndex];

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const response = await fetch('/api/demo/scan', { method: 'POST' });
      const data = (await response.json()) as KnowledgeScanResponse;
      setRisks(data.risks);
      setSelectedRiskId(data.risks[0]?.id ?? null);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    setIsAsking(true);
    setAnswer(null);
    try {
      const response = await fetch('/api/demo/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          hasCompletedInterview: knowledgeDocument !== null,
        }),
      });
      setAnswer((await response.json()) as CitedAnswer);
    } finally {
      setIsAsking(false);
    }
  };

  const handleStartInterview = async () => {
    if (!selectedRisk) return;

    setIsStartingInterview(true);
    try {
      const response = await fetch('/api/demo/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'questions', riskId: selectedRisk.id }),
      });
      setInterview((await response.json()) as InterviewQuestionsResponse);
      setQuestionIndex(0);
      setInterviewAnswers([]);
      setCurrentAnswer('');
    } finally {
      setIsStartingInterview(false);
    }
  };

  const handleSaveAnswer = async () => {
    if (!interview || !currentAnswer.trim() || !selectedRisk) return;

    const nextAnswers = [...interviewAnswers, currentAnswer.trim()];
    const isLastQuestion = questionIndex === interview.questions.length - 1;

    if (!isLastQuestion) {
      setInterviewAnswers(nextAnswers);
      setQuestionIndex((index) => index + 1);
      setCurrentAnswer('');
      return;
    }

    setIsSavingInterview(true);
    try {
      const response = await fetch('/api/demo/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete',
          riskId: selectedRisk.id,
          answers: nextAnswers,
        }),
      });
      setInterviewAnswers(nextAnswers);
      setKnowledgeDocument((await response.json()) as CompleteInterviewResponse);
      setCurrentAnswer('');
    } finally {
      setIsSavingInterview(false);
    }
  };

  const handleUseSuggestedAnswer = () => {
    const suggestedAnswer = interview?.suggestedAnswers[questionIndex];
    if (suggestedAnswer) setCurrentAnswer(suggestedAnswer);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-white/10 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">Knowledge Handoff</p>
              <p className="text-xs text-slate-400">Brightline Logistics · Company Brain</p>
            </div>
          </div>
          <Badge className="border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/10">
            Live demo workspace
          </Badge>
        </div>

        <div className="mx-auto grid max-w-[1500px] gap-8 px-5 pb-8 pt-5 lg:grid-cols-[1fr_auto] lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-cyan-300 text-lg font-bold text-slate-950">
              {DEMO_EMPLOYEE.initials}
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">{DEMO_EMPLOYEE.name}</h1>
                <Badge className="border border-amber-300/20 bg-amber-300/10 text-amber-200 hover:bg-amber-300/10">
                  Notice given
                </Badge>
              </div>
              <p className="text-sm text-slate-300">
                {DEMO_EMPLOYEE.title} · {DEMO_EMPLOYEE.team}
              </p>
              <p className="mt-1 text-xs text-slate-500">Final day {DEMO_EMPLOYEE.finalDay}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <Metric value={String(sourceCount)} label="Sources" />
            <Metric value={risks.length ? String(risks.length) : '—'} label="Risks" />
            <Metric
              value={knowledgeDocument ? '1' : '0'}
              label="Captured"
              accent={knowledgeDocument !== null}
            />
          </div>
        </div>
      </header>

      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center gap-2 overflow-x-auto px-5 py-3 lg:px-8">
          <JourneyStep
            number="1"
            label="Ask before"
            isComplete={answer !== null && !answer.isDocumented}
          />
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
          <JourneyStep number="2" label="Scan risks" isComplete={risks.length > 0} />
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
          <JourneyStep number="3" label="Interview Sam" isComplete={knowledgeDocument !== null} />
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
          <JourneyStep number="4" label="Ask again" isComplete={answer?.isDocumented === true} />
        </div>
      </section>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-5 py-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-8">
        <section className="space-y-5">
          <Card className="overflow-hidden border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-white pb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-violet-600" />
                    <CardTitle className="text-lg">Knowledge risk scan</CardTitle>
                  </div>
                  <p className="text-sm text-slate-500">
                    Compare Sam’s work with the rest of the team to find likely single points of
                    failure.
                  </p>
                </div>
                <Button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  {isScanning ? <Loader2 className="animate-spin" /> : <Sparkles />}
                  {isScanning
                    ? 'Analyzing 13 sources…'
                    : risks.length
                      ? 'Run scan again'
                      : 'Scan Sam’s work'}
                </Button>
              </div>
              {isScanning && <Progress value={68} className="mt-4 h-1.5" />}
            </CardHeader>

            <CardContent className="p-0">
              {risks.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-16 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <Search className="h-6 w-6" />
                  </div>
                  <p className="font-medium">No scan has been run yet</p>
                  <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
                    The scan looks for topics where Sam is the only author, decision maker, or
                    contact—and checks whether the essential context is missing.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {risks.map((risk, index) => {
                    const isSelected = risk.id === selectedRiskId;
                    return (
                      <button
                        key={risk.id}
                        type="button"
                        onClick={() => setSelectedRiskId(risk.id)}
                        className={cn(
                          'grid w-full grid-cols-[32px_1fr_auto] gap-3 px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500',
                          isSelected ? 'bg-violet-50/70' : 'bg-white hover:bg-slate-50',
                        )}
                        aria-pressed={isSelected}
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">
                          {index + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="mb-1.5 flex flex-wrap items-center gap-2">
                            <span className="font-medium text-slate-900">{risk.title}</span>
                            <Badge
                              variant="outline"
                              className={cn('text-[10px]', SEVERITY_STYLES[risk.severity])}
                            >
                              {risk.severity}
                            </Badge>
                          </span>
                          <span className="line-clamp-2 text-sm leading-5 text-slate-500">
                            {risk.missingKnowledge}
                          </span>
                          <span className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                            <FileText className="h-3.5 w-3.5" />
                            {risk.evidenceFiles.length} evidence files
                          </span>
                        </span>
                        <ChevronRight
                          className={cn(
                            'mt-2 h-4 w-4',
                            isSelected ? 'text-violet-600' : 'text-slate-300',
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {selectedRisk && (
            <Card className="border-violet-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-violet-600">
                      Selected risk
                    </p>
                    <CardTitle className="text-xl">{selectedRisk.title}</CardTitle>
                  </div>
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Why this is at risk
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {selectedRisk.whyOnlyEmployeeKnows}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Evidence
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedRisk.evidenceFiles.map((filename) => (
                      <Badge
                        key={filename}
                        variant="outline"
                        className="bg-slate-50 font-mono text-[10px] font-normal text-slate-600"
                      >
                        {filename}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selectedRisk.id === 'vendor-decision' ? (
                  <Button
                    onClick={handleStartInterview}
                    disabled={isStartingInterview || knowledgeDocument !== null}
                    className="w-full bg-slate-950 hover:bg-slate-800"
                  >
                    {isStartingInterview ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <MessageSquareText />
                    )}
                    {knowledgeDocument ? 'Knowledge captured' : 'Interview Sam about this gap'}
                    {!knowledgeDocument && <ArrowRight className="ml-auto" />}
                  </Button>
                ) : (
                  <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                    The prepared live interview focuses on the Corvid SMS decision.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </section>

        <aside className="space-y-5 xl:sticky xl:top-5 xl:self-start">
          <Card className="overflow-hidden border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-slate-950 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">Ask the company brain</CardTitle>
                  <p className="mt-1 text-xs text-slate-400">
                    Answers only from cited company knowledge
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <div className="flex gap-2">
                <Input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') void handleAsk();
                  }}
                  aria-label="Question for the company brain"
                  className="h-11"
                />
                <Button
                  size="icon"
                  onClick={handleAsk}
                  disabled={isAsking || !question.trim()}
                  className="h-11 w-11 shrink-0 bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                >
                  {isAsking ? <Loader2 className="animate-spin" /> : <Send />}
                  <span className="sr-only">Ask</span>
                </Button>
              </div>

              {!answer && !isAsking && (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center">
                  <MessageSquareText className="mx-auto mb-3 h-6 w-6 text-slate-300" />
                  <p className="text-sm font-medium text-slate-600">Ask before the interview</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    The brain should admit when the reason is missing. Ask the same question after
                    the interview to see the knowledge appear.
                  </p>
                </div>
              )}

              {isAsking && (
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-6 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin text-cyan-600" />
                  Searching {sourceCount} sources and checking citations…
                </div>
              )}

              {answer && (
                <div
                  className={cn(
                    'rounded-xl border p-4',
                    answer.isDocumented
                      ? 'border-emerald-200 bg-emerald-50/60'
                      : 'border-amber-200 bg-amber-50/60',
                  )}
                >
                  <div className="mb-3 flex items-center gap-2">
                    {answer.isDocumented ? (
                      <BookOpenCheck className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    )}
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        answer.isDocumented ? 'text-emerald-800' : 'text-amber-800',
                      )}
                    >
                      {answer.isDocumented ? 'Answer found' : 'Knowledge gap detected'}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{answer.answer}</p>
                  {answer.citations.length > 0 && (
                    <div className="mt-4 border-t border-black/5 pt-3">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Sources
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {answer.citations.map((citation) => (
                          <Badge
                            key={citation}
                            variant="outline"
                            className="bg-white font-mono text-[10px] font-normal text-slate-600"
                          >
                            {citation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {interview && !knowledgeDocument && (
            <Card className="overflow-hidden border-cyan-200 shadow-sm">
              <CardHeader className="border-b border-cyan-100 bg-cyan-50 pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white">
                      <UserRoundCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Guided exit interview</CardTitle>
                      <p className="mt-1 text-xs text-slate-500">
                        Question {questionIndex + 1} of {interview.questions.length}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-cyan-200 bg-white text-cyan-700">
                    Sam
                  </Badge>
                </div>
                <Progress
                  value={((questionIndex + 1) / interview.questions.length) * 100}
                  className="mt-4 h-1.5"
                />
              </CardHeader>
              <CardContent className="space-y-4 p-5">
                <div className="rounded-xl bg-slate-950 px-4 py-3 text-sm leading-6 text-white">
                  {currentInterviewQuestion}
                </div>
                <Textarea
                  value={currentAnswer}
                  onChange={(event) => setCurrentAnswer(event.target.value)}
                  rows={4}
                  placeholder="Capture Sam’s answer…"
                  aria-label="Sam's interview answer"
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleUseSuggestedAnswer}
                    className="text-violet-700"
                  >
                    <Sparkles />
                    Use demo answer
                  </Button>
                  <Button
                    onClick={handleSaveAnswer}
                    disabled={!currentAnswer.trim() || isSavingInterview}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    {isSavingInterview ? <Loader2 className="animate-spin" /> : null}
                    {questionIndex === interview.questions.length - 1
                      ? 'Create knowledge entry'
                      : 'Save & continue'}
                    {!isSavingInterview && <ArrowRight />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {knowledgeDocument && (
            <Card className="overflow-hidden border-emerald-200 shadow-sm">
              <CardHeader className="border-b border-emerald-100 bg-emerald-50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Knowledge captured</CardTitle>
                    <p className="mt-1 font-mono text-[11px] text-emerald-700">
                      {knowledgeDocument.filename}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <h3 className="text-base font-semibold">{knowledgeDocument.title}</h3>
                <p className="mt-2 line-clamp-4 whitespace-pre-line text-sm leading-6 text-slate-600">
                  {knowledgeDocument.content.replace(/^# .+\n+/, '')}
                </p>
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500">
                  <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  This interview is now part of the company brain. Ask the Corvid question again.
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </main>
  );
};

interface MetricProps {
  value: string;
  label: string;
  accent?: boolean;
}

const Metric = ({ value, label, accent = false }: MetricProps) => (
  <div
    className={cn(
      'min-w-20 rounded-xl border px-4 py-3',
      accent ? 'border-emerald-400/30 bg-emerald-400/10' : 'border-white/10 bg-white/5',
    )}
  >
    <p className={cn('text-lg font-semibold', accent ? 'text-emerald-300' : 'text-white')}>
      {value}
    </p>
    <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
  </div>
);

interface JourneyStepProps {
  number: string;
  label: string;
  isComplete: boolean;
}

const JourneyStep = ({ number, label, isComplete }: JourneyStepProps) => (
  <div
    className={cn(
      'flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium',
      isComplete ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500',
    )}
  >
    <span
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full text-[10px]',
        isComplete ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500',
      )}
    >
      {isComplete ? <Check className="h-3 w-3" /> : number}
    </span>
    {label}
  </div>
);

export default DemoPage;
