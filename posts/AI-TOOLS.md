diffferent tools which I used in development process in past few years
1. mcp server - I had created an mcp server for a service which was used by 1000 developers. The early excitement was centred around giving more context to an agent through mcp. But over period of time, we saw setup overhead,mcp execution being a black box for agent. Like if agent wants to modify the way a script/tool is written, it fails. because it doesn't have access to how mcp tool is written

2. Instructions - mostly used for fixed types of steps or guidelines

3. Skills - since they are auto loaded in a session, so created around 10-15 skills in 1st month of its release. Since my application was in dotnet, so I combined it with dotnet script for static executions. Advantages I see is - lesser setup cost, less dependency on remote endpoint/system unlike mcp server. Future problem I see is when too many skills for a repo, it might confuse agent or overload contrxt. Another one is someone will have to update skills as going forward when underlying workflows are updated. Maybe a pipeline for skills?

4. Hooks - haven't used much, but seems useful from security point of view. They are triggered on an event, so can be configured to trigger on security related operations during dev phase
