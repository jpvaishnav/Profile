Flakiness in a large scale cicd system can come from 3 major reasons-
1. Test itself is flaky
2. test infra is flaky
3. machine is under heavy load

few years ago, If I was asked to reduce flakiness, I would have tried to do data analysis of flaky tests, their exceptions, and prioritize top reasons fix.
But today we have AI agents, where we can create an agentic guideline that fetches flaky tests, reads their errors and fixes the root cause (test or test infra).

why solving flakiness is important?
it increased waiting time for an end user(agents now a days)
