How I solved a timeout of requests last week.

Problem: Frontend request from client -> CDN -> Service. Service was making call to another backend cloud API to get JSON, and create HTML and return.
Backend API call was taking ~35 seconds to respond. And CDN was timing out within 10 seconds of requests.

How I solved?
1. Ask CDN to increase wait time for given endpoint. But CDN changes was not in my control. ANother cons is end user would still see 35 seconds latency.
2. Option 2 is: Cache(Every request has an input id, for which backend returns same response) the backend API response after first request, so that next request is served from disk. 
Cons: LoadBalancer does not guarantee that same machine will be hit for given request. First request would still take 35 seconds
3. Option 3: At the source side, when the 4 MB content was put into API. I created another API, which puts the same content in a json file. Fortunately he cloud I was using was exposing an API to have a json attachment for given id, if not then I would have just uploaded the content to blob storage, and update destination to get file from FILE API/BLOB Storage rather than 35 seconds API.

Option 3 reduced the time from 35 seconds to 3 seconds.
