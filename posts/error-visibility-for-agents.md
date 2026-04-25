Errors in a system are common. They could be during feature development, CICD stage, deployment or post productions.
Given the rise of AI agents, we would need to design next generation of softwares keeping in mind errors and required info(message, stack trace) should be visible to AI agents.
1. Feature development - build, test in agent machine setup. Can be setup throuh skills/instructions/agents.md
2. CICD stage - error exposure in remote pipeline. Agent should have access to remote log storage/pipelines.
3. deployment - agent should have access to deployment cloud like Azure/AWS. It should be able to track deployment through APIs and alert/act through APIs.
4. Post production - Agentic access to production logs, metrics at machine level, service level, region level, etc. Centralized MCP server with limited access to remote cloud should be setup here given that it is production environment, and any wrong action could take down a produciton service.
