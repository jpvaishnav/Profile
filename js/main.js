// ===== Blog Data Store (localStorage) =====
const STORAGE_KEY = 'personalBlog_posts';

const samplePosts = [
    {
        id: 1,
        title: 'Understanding Async/Await in C#',
        category: 'concepts',
        content: `Async/Await is one of the most powerful features in C# for writing asynchronous code that reads like synchronous code.

## Why Async Matters

When you call a synchronous method that does I/O (like reading a file or making an HTTP call), the thread is **blocked** until the operation completes. In a web server, this means that thread can't serve other requests.

With \`async/await\`, the thread is released back to the thread pool while waiting, allowing it to handle other work.

## Basic Pattern

\`\`\`csharp
public async Task<string> GetDataAsync()
{
    using var client = new HttpClient();
    var response = await client.GetStringAsync("https://api.example.com/data");
    return response;
}
\`\`\`

## Key Rules

- Always use \`async Task\` (not \`async void\`) for methods that return nothing
- The \`await\` keyword can only be used inside \`async\` methods
- Name async methods with the \`Async\` suffix by convention
- Use \`ConfigureAwait(false)\` in library code to avoid deadlocks

## Common Pitfalls

1. **Async void** — only use for event handlers; exceptions can't be caught
2. **Blocking on async** — never use \`.Result\` or \`.Wait()\` on async code
3. **Not awaiting** — forgetting to await a Task means fire-and-forget`,
        tags: ['csharp', 'async', 'dotnet'],
        date: '2026-03-20',
        excerpt: 'A deep dive into async/await patterns in C# — why they matter, how to use them correctly, and common pitfalls to avoid.'
    },
    {
        id: 2,
        title: 'Docker Basics: Containerize Your .NET App',
        category: 'tutorials',
        content: `Getting started with Docker for .NET applications is simpler than you might think.

## What is Docker?

Docker packages your application and all its dependencies into a **container** — a lightweight, standalone unit that runs the same everywhere.

## Creating a Dockerfile

\`\`\`dockerfile
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "MyApp.dll"]
\`\`\`

## Build and Run

\`\`\`bash
docker build -t myapp .
docker run -p 8080:80 myapp
\`\`\`

## Key Concepts

- **Image**: A read-only template (like a class)
- **Container**: A running instance of an image (like an object)
- **Volume**: Persistent storage that survives container restarts
- **Multi-stage builds**: Keep your final image small by separating build and runtime stages`,
        tags: ['docker', 'dotnet', 'devops'],
        date: '2026-03-18',
        excerpt: 'Learn how to containerize a .NET application with Docker using multi-stage builds for optimal image size.'
    },
    {
        id: 3,
        title: 'TIL: Git Interactive Rebase',
        category: 'til',
        content: `Today I learned how to clean up messy commit history using interactive rebase.

## The Command

\`\`\`bash
git rebase -i HEAD~5
\`\`\`

This opens your editor with the last 5 commits. You can:

- **pick** — keep the commit as-is
- **reword** — change the commit message
- **squash** — combine with the previous commit
- **fixup** — like squash but discard the message
- **drop** — remove the commit entirely

## When to Use It

- Before creating a pull request, squash WIP commits
- Fix typos in commit messages
- Reorder commits for a cleaner narrative

## Warning

Never rebase commits that have been pushed to a shared branch. It rewrites history and will cause problems for others.`,
        tags: ['git', 'til'],
        date: '2026-03-15',
        excerpt: 'How to use git interactive rebase to clean up commit history before creating pull requests.'
    },
    {
        id: 4,
        title: 'CI/CD Pipeline Design Principles',
        category: 'devops',
        content: `Good CI/CD pipelines follow certain principles that make them reliable and fast.

## Core Principles

1. **Fast feedback** — keep build times under 10 minutes
2. **Fail fast** — run quick checks (lint, format) before slow ones (tests, build)
3. **Reproducible** — builds should be deterministic
4. **Immutable artifacts** — build once, deploy the same artifact everywhere

## Pipeline Stages

\`\`\`
Commit → Build → Unit Test → Integration Test → Deploy to Staging → Deploy to Production
\`\`\`

## Tips

- Cache dependencies between runs
- Run tests in parallel when possible
- Use branch protection rules to enforce CI passing
- Keep secrets in your CI platform's secret store, never in code
- Monitor pipeline metrics: build time, failure rate, flaky test count

## Tools

Popular options: Azure DevOps Pipelines, GitHub Actions, Jenkins, GitLab CI`,
        tags: ['devops', 'ci-cd', 'best-practices'],
        date: '2026-03-10',
        excerpt: 'Key principles for designing CI/CD pipelines that are fast, reliable, and maintainable.'
    }
];

function getPosts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    // Initialize with sample posts
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
    return samplePosts;
}

function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function addPost(post) {
    const posts = getPosts();
    post.id = Date.now();
    post.date = new Date().toISOString().split('T')[0];
    posts.unshift(post);
    savePosts(posts);
    return post;
}

// ===== Rendering =====
function createBlogCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.setAttribute('data-category', post.category);
    card.setAttribute('data-id', post.id);

    const tagsHtml = (post.tags || [])
        .map(t => `<span>#${escapeHtml(t)}</span>`)
        .join('');

    card.innerHTML = `
        <span class="blog-card-category">${escapeHtml(post.category)}</span>
        <h3 class="blog-card-title">${escapeHtml(post.title)}</h3>
        <p class="blog-card-excerpt">${escapeHtml(post.excerpt || post.content.substring(0, 150) + '...')}</p>
        <div class="blog-card-meta">
            <span>${formatDate(post.date)}</span>
            <div class="blog-card-tags">${tagsHtml}</div>
        </div>
    `;

    card.addEventListener('click', () => openPost(post));
    return card;
}

function openPost(post) {
    // Create modal
    const overlay = document.createElement('div');
    overlay.className = 'post-modal-overlay';
    overlay.innerHTML = `
        <div class="post-modal">
            <button class="post-modal-close" aria-label="Close">&times;</button>
            <h1>${escapeHtml(post.title)}</h1>
            <div class="post-modal-meta">${formatDate(post.date)} &middot; ${escapeHtml(post.category)}</div>
            <div class="post-modal-body">${renderMarkdown(post.content)}</div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Animate in
    requestAnimationFrame(() => overlay.classList.add('visible'));

    // Close handlers
    const close = () => {
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.querySelector('.post-modal-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') {
            close();
            document.removeEventListener('keydown', handler);
        }
    });
}

// ===== Simple Markdown Renderer =====
function renderMarkdown(text) {
    let html = escapeHtml(text);

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');

    // Bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Unordered lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

    // Paragraphs (lines that aren't already tags)
    html = html.replace(/^(?!<[huolp])((?!<).+)$/gm, '<p>$1</p>');

    // Clean empty lines
    html = html.replace(/\n{2,}/g, '\n');

    return html;
}

// ===== Utilities =====
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Navigation =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!navbar) return;

    // Scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }
}

// ===== Blog Page =====
function initBlogPage() {
    const blogGrid = document.getElementById('blogGrid');
    const blogEmpty = document.getElementById('blogEmpty');
    const filterTags = document.getElementById('filterTags');

    if (!blogGrid) return;

    const posts = getPosts();

    function render(filter = 'all') {
        blogGrid.innerHTML = '';
        const filtered = filter === 'all'
            ? posts
            : posts.filter(p => p.category === filter);

        if (filtered.length === 0) {
            blogEmpty.style.display = 'block';
        } else {
            blogEmpty.style.display = 'none';
            filtered.forEach(post => blogGrid.appendChild(createBlogCard(post)));
        }
    }

    render();

    // Filter buttons
    if (filterTags) {
        filterTags.addEventListener('click', (e) => {
            if (!e.target.classList.contains('filter-btn')) return;
            filterTags.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            render(e.target.dataset.filter);
        });
    }

    // New post form
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('postTitle').value.trim();
            const category = document.getElementById('postCategory').value;
            const content = document.getElementById('postContent').value.trim();
            const tagsRaw = document.getElementById('postTags').value.trim();
            const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

            if (!title || !content) return;

            const post = addPost({
                title,
                category,
                content,
                tags,
                excerpt: content.substring(0, 150) + '...'
            });

            showToast('Post published successfully!');
            postForm.reset();

            // Re-render with "all" filter
            const allBtn = filterTags?.querySelector('[data-filter="all"]');
            if (allBtn) {
                filterTags.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                allBtn.classList.add('active');
            }
            render('all');
        });
    }
}

// ===== Recent Posts Preview (Home page) =====
function initRecentPosts() {
    const container = document.getElementById('recentPosts');
    if (!container) return;

    const posts = getPosts().slice(0, 3);
    posts.forEach(post => container.appendChild(createBlogCard(post)));
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initBlogPage();
    initRecentPosts();
});
