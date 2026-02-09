Examples:

- Implement user authentication flow
- Configure Supabase database connection
- Refactor checkout API error handling
- Create Google Ads conversion tracking

Avoid:

- Vague titles ("Fix login")
- Multi-action titles
- Technical noise in the title

---

## Task Description Structure (MANDATORY)

Every task MUST include the following sections:

### 1. Context

Explain **why** this task exists.

- What problem does it solve?
- What feature or goal does it support?

### 2. Scope

Clearly define **what is included**.
Use bullet points.

### 3. Out of Scope

Explicitly define **what is NOT included** to avoid scope creep.

### 4. Acceptance Criteria

Define clear, verifiable conditions for completion.
Use bullet points.
Each criterion must be objectively testable.

### 5. Dependencies (if any)

List blockers, prerequisites, or related tasks.

---

## Acceptance Criteria Rules

Acceptance criteria MUST:

- Be binary (pass/fail)
- Avoid subjective language
- Avoid implementation details unless necessary

Good example:

- User can successfully log in using email and password
- Error message is shown when credentials are invalid

Bad example:

- Login works properly
- UI looks good

---

## Estimation Guidelines

When applicable:

- Use **Story Points** for Stories
- Use **Time-based estimates** only for operational tasks

Sizing rules:

- If task feels too big → split it
- If task exceeds one sprint → split it
- Ideal task size: 0.5 to 3 days of work

---

## Priority & Ordering

Assign priority based on:

1. User or business impact
2. Dependency criticality
3. Risk reduction

Never create tasks without a clear priority.

---

## Technical Tasks Best Practices

For technical tasks:

- Specify the system or layer (frontend, backend, infra, data)
- Reference technologies only when relevant
- Avoid low-level implementation unless required

Example:

- Implement API rate limiting for authentication endpoints

---

## Bugs Best Practices

Bug tasks MUST include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (if relevant)

---

## Checklist Before Creating a Task

Before finalizing a Jira task, verify:

- [ ] Title is clear and action-oriented
- [ ] Description follows the required structure
- [ ] Acceptance criteria are testable
- [ ] Task fits within a sprint
- [ ] Dependencies are explicit
- [ ] No unnecessary scope included

---

## Agent Behavior Rules

When using this skill, the agent MUST:

- Ask for missing critical information if needed
- Make reasonable assumptions explicit
- Prefer splitting tasks over creating large ones
- Default to clarity over brevity

The agent should behave like an experienced Scrum team member.

---

## Output Format (for Agents)

When generating Jira tasks, output:

- Title
- Issue Type
- Description (formatted)
- Acceptance Criteria (bulleted)
- Priority
- Dependencies (if any)

Do NOT include explanations or meta commentary.
