import type {
  InterviewQuestionsResponse,
  KnowledgeArtifactSummary,
  KnowledgeRisk,
} from '@app-starter/shared';

export const DEMO_EMPLOYEE = {
  name: 'Sam Rivera',
  initials: 'SR',
  title: 'Senior Platform Engineer',
  team: 'Shipment Experience',
  noticeDate: 'November 4, 2026',
  finalDay: 'November 18, 2026',
} as const;

export const DEMO_ARTIFACTS: KnowledgeArtifactSummary[] = [
  {
    id: 'adr-vendor',
    filename: 'adr-notifications-vendor.md',
    source: 'DOCUMENT',
    author: 'Sam Rivera',
    excerpt: 'Corvid SMS selected for cost. Migration scheduled for Q2.',
    riskIds: ['vendor-decision'],
  },
  {
    id: 'slack-vendor',
    filename: 'slack-platform-vendor-eval.txt',
    source: 'CHAT',
    author: 'Sam Rivera, Priya Shah',
    excerpt: 'Sam mentions a vendor call and “the carrier thing” without further detail.',
    riskIds: ['vendor-decision'],
  },
  {
    id: 'ticket-sms',
    filename: 'ticket-1042-sms-delivery.txt',
    source: 'TICKET',
    author: 'Sam Rivera',
    excerpt: 'Regional delivery failures resolved. No remediation details recorded.',
    riskIds: ['vendor-decision'],
  },
  {
    id: 'runbook-batch',
    filename: 'runbook-nightly-batch.md',
    source: 'DOCUMENT',
    author: 'Sam Rivera',
    excerpt: 'Nightly shipment batch runbook omits the time-zone recovery step.',
    riskIds: ['batch-workaround'],
  },
  {
    id: 'slack-timezone',
    filename: 'slack-incident-batch-timezone.txt',
    source: 'CHAT',
    author: 'Sam Rivera',
    excerpt: 'Sam fixes the incident in minutes but does not explain the workaround.',
    riskIds: ['batch-workaround'],
  },
  {
    id: 'ticket-recon',
    filename: 'ticket-1187-invoice-recon.txt',
    source: 'TICKET',
    author: 'Sam Rivera',
    excerpt: 'Quarterly invoice reconciliation is assigned to Sam with no procedure.',
    riskIds: ['invoice-reconciliation'],
  },
  {
    id: 'email-finance',
    filename: 'email-finance-recon.txt',
    source: 'EMAIL',
    author: 'Sam Rivera, Finance',
    excerpt: 'Figures and approvals are exchanged informally over email.',
    riskIds: ['invoice-reconciliation'],
  },
  {
    id: 'deploy-staging',
    filename: 'deploy-checklist-staging.md',
    source: 'DOCUMENT',
    author: 'Sam Rivera',
    excerpt: 'Staging deploy checklist has no cache reset step.',
    riskIds: ['staging-cache'],
  },
  {
    id: 'slack-harborline',
    filename: 'slack-client-harborline.txt',
    source: 'CHAT',
    author: 'Sam Rivera, Account Team',
    excerpt: 'Sam handles Harborline escalations directly with an unnamed contact.',
    riskIds: ['harborline-relationship'],
  },
  {
    id: 'org-chart',
    filename: 'team-org-chart.md',
    source: 'DOCUMENT',
    author: 'Elena Vasquez',
    excerpt: 'Sam owns notifications; no secondary owner is listed.',
    riskIds: [
      'vendor-decision',
      'batch-workaround',
      'invoice-reconciliation',
      'staging-cache',
      'harborline-relationship',
    ],
  },
  {
    id: 'runbook-search',
    filename: 'runbook-search-reindex.md',
    source: 'DOCUMENT',
    author: 'Priya Shah',
    excerpt: 'Complete reindex runbook with steps, rationale, rollback, and owners.',
    riskIds: [],
  },
  {
    id: 'adr-logging',
    filename: 'adr-logging-stack.md',
    source: 'DOCUMENT',
    author: 'Marcus Lee',
    excerpt: 'Full decision record comparing three logging alternatives.',
    riskIds: [],
  },
  {
    id: 'slack-oncall',
    filename: 'slack-oncall-rotation.txt',
    source: 'CHAT',
    author: 'Priya Shah, Marcus Lee',
    excerpt: 'Other systems have clear on-call coverage; notifications do not.',
    riskIds: [],
  },
];

export const DEMO_RISKS: KnowledgeRisk[] = [
  {
    id: 'vendor-decision',
    title: 'Corvid SMS vendor decision',
    severity: 'HIGH',
    whyOnlyEmployeeKnows:
      'Sam authored the decision record, resolved the related delivery incident, and is the only person referenced in the vendor evaluation.',
    missingKnowledge:
      'The evaluated alternatives, regional-carrier advantage, switching cost, and vendor relationship are not documented.',
    evidenceFiles: [
      'adr-notifications-vendor.md',
      'slack-platform-vendor-eval.txt',
      'ticket-1042-sms-delivery.txt',
    ],
  },
  {
    id: 'batch-workaround',
    title: 'Nightly batch time-zone workaround',
    severity: 'HIGH',
    whyOnlyEmployeeKnows:
      'Sam is the only person shown resolving carrier time-zone failures, and the recovery action never reaches the runbook.',
    missingKnowledge:
      'The detection signal, exact recovery command, and safe replay window are absent.',
    evidenceFiles: ['runbook-nightly-batch.md', 'slack-incident-batch-timezone.txt'],
  },
  {
    id: 'invoice-reconciliation',
    title: 'Quarterly invoice reconciliation',
    severity: 'HIGH',
    whyOnlyEmployeeKnows:
      'The recurring task is assigned only to Sam and approvals happen through Sam’s direct finance thread.',
    missingKnowledge:
      'The reconciliation steps, approval threshold, and finance owner are not documented.',
    evidenceFiles: ['ticket-1187-invoice-recon.txt', 'email-finance-recon.txt'],
  },
  {
    id: 'staging-cache',
    title: 'Staging cache reset before deploys',
    severity: 'MEDIUM',
    whyOnlyEmployeeKnows:
      'Sam owns the deployment checklist, but successful staging deploys depend on an undocumented manual step.',
    missingKnowledge:
      'Which cache to reset, when to reset it, and the failure symptom are missing.',
    evidenceFiles: ['deploy-checklist-staging.md', 'team-org-chart.md'],
  },
  {
    id: 'harborline-relationship',
    title: 'Harborline Freight escalation path',
    severity: 'MEDIUM',
    whyOnlyEmployeeKnows:
      'Sam is the sole technical contact shown handling the largest client’s urgent escalations.',
    missingKnowledge:
      'The client contact, preferred escalation channel, and relationship context are missing.',
    evidenceFiles: ['slack-client-harborline.txt', 'team-org-chart.md'],
  },
];

export const VENDOR_INTERVIEW_OBJECTIVE =
  'Recover the decision context, switching constraints, and ownership needed to operate the SMS vendor relationship after Sam leaves.';

export const VENDOR_INTERVIEW_QUESTIONS = [
  {
    id: 'alternatives',
    prompt: 'What alternatives did you compare before choosing Corvid SMS?',
    rationale:
      'The decision record names Corvid, but never records the rejected vendors or the selection criteria.',
    evidenceFiles: ['adr-notifications-vendor.md', 'slack-platform-vendor-eval.txt'],
  },
  {
    id: 'switching-cost',
    prompt: 'What would break or cost more if Brightline switched providers?',
    rationale:
      'The delivery incident implies a carrier-routing advantage that is absent from the architecture record.',
    evidenceFiles: ['ticket-1042-sms-delivery.txt', 'adr-notifications-vendor.md'],
  },
  {
    id: 'ownership',
    prompt: 'Who should own the vendor relationship after you leave?',
    rationale:
      'Sam is the only internal contact in the available evidence, with no successor or renewal owner named.',
    evidenceFiles: ['slack-platform-vendor-eval.txt'],
  },
] as const;

export const VENDOR_SUGGESTED_ANSWERS = [
  'We compared Northstar Messaging and RelayText. Corvid was about a third cheaper at our message volume.',
  'Corvid has direct agreements with regional carriers in our two biggest markets. The alternatives route through a slower hub, so delivery alerts would be delayed.',
  'Dana Okafor is our Corvid account manager. Priya Shah should take over internally, and the contract renews in March.',
] as const;

export const VENDOR_KNOWLEDGE_DOCUMENT = `# Why Brightline uses Corvid SMS

Brightline compared Corvid SMS with Northstar Messaging and RelayText. Corvid was approximately one third cheaper at Brightline's message volume.

The more important operational advantage is that Corvid has direct agreements with regional carriers in Brightline's two largest markets. The alternatives route messages through a slower hub, which would delay customer delivery alerts.

Dana Okafor is the Corvid account manager. Priya Shah should become the internal owner after Sam leaves. The contract renews in March.`;

export interface DemoInterviewPlan extends InterviewQuestionsResponse {
  filename: string;
  title: string;
  curatedContent?: string;
}

export const DEMO_INTERVIEW_PLANS: Record<string, DemoInterviewPlan> = {
  'vendor-decision': {
    objective: VENDOR_INTERVIEW_OBJECTIVE,
    questions: VENDOR_INTERVIEW_QUESTIONS.map((question) => ({
      ...question,
      evidenceFiles: [...question.evidenceFiles],
    })),
    suggestedAnswers: [...VENDOR_SUGGESTED_ANSWERS],
    filename: 'interview-corvid-sms.md',
    title: 'Why Brightline uses Corvid SMS',
    curatedContent: VENDOR_KNOWLEDGE_DOCUMENT,
  },
  'batch-workaround': {
    objective:
      'Capture how to detect, safely recover, and validate the nightly batch when carrier time zones cause a failure.',
    questions: [
      {
        id: 'detection-signal',
        prompt:
          'What exact signal tells you the nightly batch failed because of a carrier time zone?',
        rationale:
          'The runbook lists a generic batch alert, while the incident thread shows Sam recognizing a more specific pattern.',
        evidenceFiles: ['runbook-nightly-batch.md', 'slack-incident-batch-timezone.txt'],
      },
      {
        id: 'recovery-command',
        prompt: 'What recovery command do you run, and what must be checked before running it?',
        rationale:
          'The incident was resolved with an undocumented manual command and no recorded safety checks.',
        evidenceFiles: ['slack-incident-batch-timezone.txt'],
      },
      {
        id: 'replay-validation',
        prompt:
          'How late can we safely replay the batch, and how do we verify that it completed correctly?',
        rationale:
          'Neither the replay window nor the post-recovery validation is present in the operating runbook.',
        evidenceFiles: ['runbook-nightly-batch.md', 'slack-incident-batch-timezone.txt'],
      },
    ],
    suggestedAnswers: [
      'Look for carrier rows stuck in PENDING after 02:20 UTC together with the timezone-normalization warning in the worker logs.',
      'Confirm the prior job is no longer running, then execute the replay command with the affected carrier and business date. Never replay the whole batch.',
      'Replay before 04:00 UTC so customer ETAs are ready for the morning dispatch. Verify the row count and confirm no duplicate shipment events were emitted.',
    ],
    filename: 'runbook-nightly-batch-timezone-recovery.md',
    title: 'Recovering the nightly batch from carrier time-zone failures',
  },
  'invoice-reconciliation': {
    objective:
      'Transfer the quarterly reconciliation procedure, exception threshold, and finance approval path.',
    questions: [
      {
        id: 'reconciliation-steps',
        prompt: 'Walk me through the quarterly invoice reconciliation from export to sign-off.',
        rationale:
          'The recurring ticket assigns the task to Sam but contains no executable procedure.',
        evidenceFiles: ['ticket-1187-invoice-recon.txt'],
      },
      {
        id: 'exception-threshold',
        prompt:
          'Which discrepancies can be corrected directly, and which require finance approval?',
        rationale:
          'The finance thread mentions approvals without documenting the amount or percentage threshold.',
        evidenceFiles: ['ticket-1187-invoice-recon.txt', 'email-finance-recon.txt'],
      },
      {
        id: 'finance-owner',
        prompt:
          'Who should approve exceptions after you leave, and what information do they expect?',
        rationale:
          'Approval currently happens through Sam’s direct thread with no named successor or standard handoff.',
        evidenceFiles: ['email-finance-recon.txt'],
      },
    ],
    suggestedAnswers: [
      'Export carrier usage and invoices, join them by shipment ID, group differences by fee code, then attach the summary to the quarterly ticket.',
      'Correct rounding differences under $100 directly. Anything larger or any new fee code needs finance approval before the invoice is released.',
      'Maya Chen in Finance should approve exceptions. Send the variance total, affected shipments, fee code, and the carrier invoice excerpt.',
    ],
    filename: 'quarterly-invoice-reconciliation.md',
    title: 'Quarterly carrier invoice reconciliation',
  },
  'staging-cache': {
    objective:
      'Document the staging cache reset that prevents stale configuration during deployments.',
    questions: [
      {
        id: 'cache-target',
        prompt: 'Which staging cache must be reset, and at what point in a deployment?',
        rationale:
          'The deployment checklist skips the manual cache action that Sam performs during successful releases.',
        evidenceFiles: ['deploy-checklist-staging.md'],
      },
      {
        id: 'failure-symptom',
        prompt: 'What symptom indicates that the cache reset was missed?',
        rationale:
          'The checklist has no diagnostic guidance, making the undocumented step difficult for another engineer to infer.',
        evidenceFiles: ['deploy-checklist-staging.md', 'team-org-chart.md'],
      },
      {
        id: 'verification',
        prompt: 'How do you verify the reset worked before promoting the release?',
        rationale:
          'There is no recorded validation step or named backup owner for the deployment procedure.',
        evidenceFiles: ['deploy-checklist-staging.md', 'team-org-chart.md'],
      },
    ],
    suggestedAnswers: [
      'Clear the staging feature-config Redis namespace after migrations and before the smoke-test deployment starts.',
      'The app reports the new version but continues using the previous carrier feature flags, usually causing the notification smoke test to fail.',
      'Check the config version endpoint, rerun the notification smoke test, and confirm the Redis namespace was recreated with the current release ID.',
    ],
    filename: 'staging-cache-reset.md',
    title: 'Staging cache reset during deployments',
  },
  'harborline-relationship': {
    objective:
      'Preserve Harborline Freight’s escalation contacts, communication expectations, and internal ownership.',
    questions: [
      {
        id: 'client-contact',
        prompt:
          'Who is Harborline’s escalation contact, and which channel should we use for urgent issues?',
        rationale:
          'The client thread routes urgent requests through Sam without recording the external contact or preferred channel.',
        evidenceFiles: ['slack-client-harborline.txt'],
      },
      {
        id: 'relationship-context',
        prompt: 'What commitments or sensitivities should the next owner know before responding?',
        rationale:
          'The available messages show special handling but do not explain the history or service expectations behind it.',
        evidenceFiles: ['slack-client-harborline.txt'],
      },
      {
        id: 'successor',
        prompt:
          'Who should take over this relationship internally, and how should you introduce them?',
        rationale:
          'The organization chart has no successor for Sam’s client-facing technical ownership.',
        evidenceFiles: ['slack-client-harborline.txt', 'team-org-chart.md'],
      },
    ],
    suggestedAnswers: [
      'Elena Marquez is Harborline’s operations lead. Use the shared Slack channel for normal issues and call her for shipment-blocking incidents.',
      'They need an acknowledgement within 15 minutes during dispatch hours. Avoid promising a fix time until the carrier impact is confirmed.',
      'Marcus Lee should become the technical owner. I should introduce him to Elena in the shared channel and join their first monthly review.',
    ],
    filename: 'harborline-escalation-handoff.md',
    title: 'Harborline Freight escalation and relationship handoff',
  },
};
