# How to Add a New Blog Post

Adding a new post is a **2-step process** — create the `.md` file and register it in `index.json`.

---

## Step 1: Create a Markdown file

Go to GitHub → your repo → `posts/` folder → **Add file** → **Create new file**

**Filename:** `your-post-slug.md` (use lowercase, hyphens, no spaces)

**Content — just write plain Markdown:**

```markdown
Write your introduction paragraph here.

## Section Heading

Your content goes here. You can use:

- **Bold text** for emphasis
- `inline code` for technical terms
- Bullet lists like this one

## Code Example

​```csharp
public void MyMethod()
{
    Console.WriteLine("Hello World");
}
​```

## Key Takeaways

1. First point
2. Second point
3. Third point
```

That's it — just write naturally in Markdown. No special headers or metadata needed in the `.md` file.

---

## Step 2: Register the post in index.json

Go to `posts/index.json` and **add a new entry at the TOP** of the array:

```json
[
    {
        "slug": "your-post-slug",
        "title": "Your Post Title Here",
        "category": "concepts",
        "date": "2026-03-22",
        "tags": ["tag1", "tag2"],
        "excerpt": "A one-line summary of what this post covers."
    },
    ... existing posts ...
]
```

### Field reference:

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | Yes | Must match your `.md` filename (without `.md`) |
| `title` | Yes | Display title on the blog |
| `category` | Yes | One of: `concepts`, `tutorials`, `til`, `devops` |
| `date` | Yes | Format: `YYYY-MM-DD` |
| `tags` | Yes | Array of lowercase tag strings |
| `excerpt` | Yes | Short summary (1-2 sentences) shown on the card |

### Available categories:
- `concepts` — Technical concepts and deep dives
- `tutorials` — Step-by-step how-to guides
- `til` — Today I Learned (short notes)
- `devops` — DevOps, CI/CD, infrastructure

---

## Example: Complete new post

**1. Create file** `posts/react-hooks-intro.md`:

```markdown
React Hooks let you use state and lifecycle features in functional components.

## Why Hooks?

Before Hooks, you needed class components for state. Now functional components can do everything.

## useState

​```javascript
const [count, setCount] = useState(0);
​```

## useEffect

​```javascript
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);
​```

## Rules of Hooks

1. Only call at the top level — not inside loops or conditions
2. Only call from React functions — not regular JS functions
```

**2. Add to** `posts/index.json` **(at the top of the array):**

```json
{
    "slug": "react-hooks-intro",
    "title": "Introduction to React Hooks",
    "category": "concepts",
    "date": "2026-03-22",
    "tags": ["react", "javascript", "hooks"],
    "excerpt": "Learn how React Hooks simplify state management in functional components."
}
```

Commit both changes → your post appears on the website within ~1 minute.
