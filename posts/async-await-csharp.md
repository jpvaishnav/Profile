Async/Await is one of the most powerful features in C# for writing asynchronous code that reads like synchronous code.

## Why Async Matters

When you call a synchronous method that does I/O (like reading a file or making an HTTP call), the thread is **blocked** until the operation completes. In a web server, this means that thread can't serve other requests.

With `async/await`, the thread is released back to the thread pool while waiting, allowing it to handle other work.

## Basic Pattern

```csharp
public async Task<string> GetDataAsync()
{
    using var client = new HttpClient();
    var response = await client.GetStringAsync("https://api.example.com/data");
    return response;
}
```

## Key Rules

- Always use `async Task` (not `async void`) for methods that return nothing
- The `await` keyword can only be used inside `async` methods
- Name async methods with the `Async` suffix by convention
- Use `ConfigureAwait(false)` in library code to avoid deadlocks

## Common Pitfalls

1. **Async void** — only use for event handlers; exceptions can't be caught
2. **Blocking on async** — never use `.Result` or `.Wait()` on async code
3. **Not awaiting** — forgetting to await a Task means fire-and-forget
