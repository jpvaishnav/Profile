- Different levels of parallalism in a test infra that we can set/configure
  1. Number of machines executing total tests/test-groups
  2. Number of test-groups running at a time. Given that each test-group can take different amount of duration.
     so If a test group completes its executions, and other test-groups are still in progress, we should start execute next test group from queue on this thread.
     Few things we should consider here from optimization point of view is to avoid long tail: For example: If a test group taking 20 mins is getting executed at last and in only 1 machine,
     While all other machines have completed their execution of assigned test-groups. Then either other machines will wait(If we have custom machine release logic to release all machines together), or the overall
     test group execution stage will wait.
     this can be solved by 2 ways - 1st is we follow longest test-group execution first, and smallest last across all machines. We should consider this during test group to maachine mapping(distribution) stage.
     2nd is - we break down given test group into multiple components (This can be based on historical data)
  3. 3rd level of parallelism can be within test group level. for example, number of parallel tests running within a class. Most of modern test execution libraries should have this capability, where they create multiple threads, and tests are executed on thread. This number should be based on compute power of a machine. For example, a machine with 2 cores(CPU) with max 10 threads per core, should run less than 20 tests at a time.
It shoudl be lower than a threshold number to allow some threads for other processes in the computuer.
