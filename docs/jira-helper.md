# Jira Helper - Quick Reference for Creating Tasks

## Quick Commands for Claude

### Create a Single Task
```
Claude, create a Jira task:
- Title: [task name]
- Description: [what needs to be done]
- Type: Task (or Bug/Story if applicable)
```

### Create Multiple Related Tasks
```
Claude, create Jira tasks for [feature name]:
1. [Task 1]
2. [Task 2]
3. [Task 3]

Link them to a parent issue if it's an Epic.
```

### Common Task Types
- **Task**: Regular work item (default)
- **Bug**: Something broken that needs fixing
- **Story**: Feature from user perspective
- **Subtask**: Child of another issue

## Task Naming Convention

Use clear, actionable titles:
- ✅ Good: "Implement user authentication endpoint"
- ❌ Bad: "Fix auth"

Include context in description:
- What needs to be done
- Why it's needed
- Acceptance criteria
- Related issues/dependencies

## Integration with Development

Once a task is created (e.g., IMB-123):
1. Reference it in commits: `git commit -m "IMB-123: Implement feature"`
2. Reference it in PRs: Link the GitHub PR to the Jira issue
3. Update status in Jira as you progress

## Examples

### Example 1: Feature Task
```
Create a Jira task:
- Title: Implement email verification for user signup
- Description: Users should receive an email verification link after signup.
  Must verify email before account is fully activated.
- Type: Story
```

### Example 2: Bug Task
```
Create a Jira task:
- Title: Fix password reset token expiration
- Description: Reset tokens should expire after 24 hours.
  Currently they don't expire, creating a security issue.
- Type: Bug
```

### Example 3: Multiple Related Tasks
```
Create 3 Jira tasks for the OAuth integration feature:
1. Add Google OAuth provider configuration
2. Implement OAuth callback endpoint
3. Create user profile sync from OAuth data

These are all related to the OAuth feature.
```

## Tips

- Claude can see your current board: https://lucasoisa.atlassian.net/jira/software/projects/IMB/boards/3
- Tasks are created in the IMB project automatically
- You can ask Claude to show you open issues, recent tasks, or anything on your board
- Use descriptive titles - they show up in commits and PRs
