import type { KnowledgeArtifactSummary, KnowledgeRisk } from '@app-starter/shared';

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

export const VENDOR_INTERVIEW_QUESTIONS = [
  'What alternatives did you compare before choosing Corvid SMS?',
  'What would break or cost more if Brightline switched providers?',
  'Who should own the vendor relationship after you leave?',
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
