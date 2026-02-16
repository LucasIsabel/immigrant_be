# Jira Integration Setup

Your Immigrant Backend project is now configured to work seamlessly with your Jira board!

## What Was Configured

✅ **Jira Board Connection**
- Project: Immigrant Backend (IMB)
- Board: https://lucasoisa.atlassian.net/jira/software/projects/IMB/boards/3

✅ **Configuration Files**
- `CLAUDE.md` - Main project configuration (in project root)
- `jira-config.json` - Jira settings reference
- `jira-helper.md` - Quick reference guide

## How to Use

### Method 1: Direct Request (Easiest)
Simply ask Claude to create a task during planning:

```
"Create a Jira task for implementing the user authentication endpoint"
```

Claude will:
1. Understand your requirement
2. Create the task in IMB project
3. Show you the issue key (e.g., IMB-123)

### Method 2: Structured Planning
For larger features, describe the plan and ask to create tasks:

```
"I need to implement the visa recommendation feature. Create Jira tasks for:
1. Design the recommendation algorithm
2. Implement the API endpoint
3. Add unit tests
4. Create API documentation"
```

Claude will create all tasks and link them appropriately.

### Method 3: From Existing Plans
If you already have a plan documented:

```
"Create Jira tasks from the plan in PLAN.md"
```

Claude will parse your plan and create corresponding tasks.

## Best Practices

### Naming Conventions
Use the format: `[IMB-XXX]: Description`
- Example in commits: `git commit -m "IMB-123: Implement user authentication"`

### Task Descriptions
Always include:
- **What**: What needs to be built/fixed
- **Why**: Why it's important
- **Acceptance Criteria**: How to know when it's done

### Linking Issues
When creating related tasks, ask Claude to:
- Link subtasks to parent stories
- Create dependencies between issues
- Reference related issues in descriptions

### Syncing with Development
1. Create task first (get issue key)
2. Create feature branch: `git checkout -b imb-123-feature-name`
3. Work on the feature
4. Reference in commits and PRs
5. Update task status in Jira as you progress

## Examples

### Example 1: Quick Task Creation
```
User: "Create a task to implement rate limiting on the API"

Claude will:
1. Ask clarifying questions if needed
2. Create IMB-124 in your board
3. Show confirmation with link
```

### Example 2: Feature with Multiple Tasks
```
User: "Create tasks for OAuth 2.0 integration"

Claude will:
1. Break down into subtasks
2. Create parent epic/story
3. Create individual task items
4. Show all created issues with IMB-XXX keys
```

### Example 3: Bug Tracking
```
User: "Create a bug task for the token expiration issue in password reset"

Claude will:
1. Classify as Bug type
2. Add description with reproduction steps
3. Create IMB-125 and link to your board
```

## Accessing Your Board

- **Direct Link**: https://lucasoisa.atlassian.net/jira/software/projects/IMB/boards/3
- **Via Claude**: Ask "Show me the current tasks on my Jira board"
- **From Commit**: Reference IMB-XXX to auto-link to GitHub/Jira

## Tips

💡 **Pro Tips**:
- Ask Claude to "summarize what's on my Jira board"
- Use "What tasks do I have assigned?" to track work
- Ask for "high priority bugs" or "overdue tasks"
- Request "Create a task based on this error:" and paste an error

## Troubleshooting

If tasks aren't creating:
1. Verify Atlassian MCP is configured (it is ✓)
2. Check that IMB project is accessible
3. Ask Claude: "Can you access my Jira board?"

If you need to change settings:
- Edit `jira-config.json` for non-default configurations
- Update `CLAUDE.md` for project-specific instructions
