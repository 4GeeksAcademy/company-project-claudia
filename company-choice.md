# Company Choice — HealthCore

## Why I Chose HealthCore

I chose HealthCore because it combines real operational problems with the challenges of applying AI in a highly regulated and high-impact environment. The company operates 12 clinics across the United States and the United Kingdom, while its current technology landscape is fragmented across different EHR, billing, scheduling, and reporting systems.

What makes HealthCore particularly interesting to me is that introducing AI into this environment requires more than building models or agents that produce useful answers. Healthcare systems must also consider reliability, privacy, security, traceability, regulatory constraints, and human oversight.

I want to use this project to explore how production AI systems can be designed so that their behavior can be measured, evaluated, and audited, with explicit criteria for determining when an AI recommendation can be trusted and when human intervention is required.

## Departments of Interest

### Revenue Cycle and Billing

HealthCore currently has a 14% claim rejection rate in the United States. Claims are submitted manually, coding practices are inconsistent across locations, and rejected or unpaid claims require significant manual follow-up.

The department needs AI-assisted claim review before submission, coding suggestions, rejection-pattern analysis, unified billing visibility, and automated follow-up workflows.

I am particularly interested in this area because claim processing provides measurable outcomes. AI predictions and recommendations can eventually be compared with human reviews and actual payer outcomes, creating a feedback loop that can be used to evaluate and improve the system over time.

### Compliance and Data Governance

HealthCore operates under HIPAA in the United States and UK GDPR in the United Kingdom. Patient information, access records, and audit trails are currently distributed across multiple systems.

This area is particularly interesting because an AI system operating across different jurisdictions and clinics must retrieve and use the correct information while respecting privacy, authorization, regulatory, and organizational constraints.

It creates an opportunity to explore secure and policy-aware RAG, versioned knowledge sources, PII/PHI protection, auditability, prompt-injection defenses, and explicit escalation when information is missing, conflicting, or outside the system's permitted level of autonomy.

### Technology

HealthCore currently has multiple disconnected systems with no shared data layer, centralized telemetry, or monitoring.

The Technology department needs a central API, data pipelines, real-time monitoring, automated health checks, and technical documentation indexed for semantic search.

This area is relevant to the project because trustworthy AI requires infrastructure around the models themselves: observability, tracing, versioning, monitoring, security controls, and the ability to reconstruct how a particular AI-assisted decision was produced.

## Milestone / Automation Challenge

The milestone I would like to explore is an **AI-assisted pre-submission claim review workflow with risk-based human oversight**.

Before a claim is submitted, the system would analyze the claim and its supporting information and retrieve the billing rules, payer documentation, corporate policies, local procedures, and relevant regulatory information applicable to its context.

The system would identify potential problems, provide supporting evidence, and estimate the risk associated with the claim.

Rather than automatically trusting every AI recommendation, explicit decision policies would determine whether the workflow can continue, additional information is required, part of the analysis should be retried, or a human specialist must review the case.

Cases involving insufficient evidence, conflicting policies, unusual conditions, high-impact decisions, or other predefined constraints could therefore be automatically escalated for human review.

Human decisions and final payer outcomes would be captured as feedback, allowing the system's performance to be evaluated and monitored over time.

## My AI Agent Idea

I propose a **HealthCore AI Revenue Cycle Copilot**, an internal AI platform designed to assist the Revenue Cycle and Billing team.

The solution would initially expose two complementary AI capabilities:

### 1. Claim Review Agent

The Claim Review Agent would operate as an automated workflow before claim submission.

It would:

- Analyze structured claim information and relevant supporting documentation.
- Determine the context of the claim, such as clinic, jurisdiction, payer, and claim type.
- Retrieve applicable billing rules, payer documentation, corporate policies, local procedures, and regulatory information.
- Identify missing, inconsistent, or potentially problematic information.
- Estimate rejection and decision risk.
- Provide evidence and references supporting its findings.
- Recommend whether the normal workflow can continue or human review is required.

The agent would not have unrestricted autonomy. Its actions would be governed by explicit risk and compliance policies, and situations such as conflicting policies, insufficient evidence, high-risk decisions, or security concerns could require mandatory human intervention.

### 2. Revenue Cycle Conversational Copilot

The same AI platform would provide an internal conversational interface for authorized Revenue Cycle and Billing staff.

Users could ask questions such as:

- "What is the current status of this claim?"
- "Why was this claim classified as high risk?"
- "Why was this claim sent for human review?"
- "Which policy supports this recommendation?"
- "Show me the claims currently waiting for review."
- "What rejection patterns are we seeing for this payer?"

The Copilot would use different information sources depending on the question. Structured operational information such as claim status or history would be obtained through authorized APIs and tools, while policies, procedures, and other unstructured knowledge would be retrieved through RAG.

The Copilot could also expose controlled actions, such as creating a human-review task or requesting additional information, subject to role-based authorization, risk level, and approval requirements.

The conversational interface would initially be designed for internal staff rather than patients.

### Information and Knowledge Required

The platform would need controlled access to:

- Claim information and claim history.
- Relevant clinical documentation.
- Historical accepted and rejected claims.
- Clinic and jurisdiction information.
- Billing and coding rules.
- Payer-specific documentation.
- Corporate HealthCore policies.
- Local clinic procedures.
- Relevant regulatory and compliance documentation.
- User identity, role, permissions, and access policies.

Knowledge sources would be versioned and associated with metadata such as jurisdiction, clinic, document type, authority, and effective dates. This would allow retrieval to be restricted to information applicable to each case and would help reconstruct historical decisions using the information that was valid at that time.

### Outputs and Actions

The platform could produce:

- Identified claim issues or inconsistencies.
- Estimated rejection or decision risk.
- Supporting evidence and source references.
- Missing or conflicting information.
- Recommended next actions.
- Human-review requests.
- Grounded answers to internal user questions.
- Controlled tool actions according to user permissions and risk policies.
- A complete audit trail of AI-assisted decisions and actions.

Every relevant AI execution would be traceable to the model, prompt, retrieved knowledge, tool calls, policy versions, and decision rules involved.

A key goal of the project would be to make AI-assisted decisions **measurable, traceable, reproducible, and auditable**, providing evidence for when an AI recommendation can be trusted and defining when human intervention is mandatory.

The project would therefore provide an opportunity to explore production AI engineering practices including **RAG and RAG evaluation, model and prompt versioning, AI observability, risk scoring, human-in-the-loop workflows, PII/PHI security, auditability, guardrails, drift detection, prompt-injection testing, and agent/tool evaluation**.