I was working on a project that was supoosted to stream logs from platform A to platform B.
- While there was a service setup at platform A side, which was emitting events, but platform B service was something I had to setup. And in platform A, I had to create a plugin responsible for event emissions.
- Given log volumes as 20 TB per day
- I did setup plugin, it was working all good from perf side(latency, success rate of emission)
- I had also setup service on platform B. But it had only 10 machines with each machine having 4 cores. within few hours of creating this service, and deploying plugin, I saw service B incoming data delay by hours.
- - I checked cpu usage going to 100%, then I decided to pick high performance machine. 64 cores I tried
  - Still I saw delay in logs syncing
  - Then I thought we need to add more machines given that incoming logs volume ks high.
  - With trial and error, I was able to achieve latency in few seconds with 50 machines
  - Few months later, I got to know the first exercise is called vertical scaling, and second exercise is called horizontal scaling
