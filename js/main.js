// ===== Blog Data Store (fetched from posts/ folder) =====
// Posts are stored as .md files in the posts/ folder.
// posts/index.json contains the list of all posts with metadata.
// To add a new post: create a .md file in posts/ and add an entry to index.json.

let allPosts = []; // populated by fetchPosts()

async function fetchPosts() {
    try {
        const response = await fetch('posts/index.json');
        if (!response.ok) throw new Error('Failed to load posts index');
        allPosts = await response.json();
        // Sort by date descending
        allPosts.sort((a, b) => b.date.localeCompare(a.date));
        return allPosts;
    } catch (err) {
        console.error('Error loading posts:', err);
        allPosts = [];
        return [];
    }
}

async function fetchPostContent(slug) {
    try {
        const response = await fetch(`posts/${slug}.md`);
        if (!response.ok) throw new Error('Post not found');
        return await response.text();
    } catch (err) {
        console.error(`Error loading post ${slug}:`, err);
        return 'Failed to load post content.';
    }
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
    // Create modal with loading state
    const overlay = document.createElement('div');
    overlay.className = 'post-modal-overlay';
    overlay.innerHTML = `
        <div class="post-modal">
            <button class="post-modal-close" aria-label="Close">&times;</button>
            <h1>${escapeHtml(post.title)}</h1>
            <div class="post-modal-meta">${formatDate(post.date)} &middot; ${escapeHtml(post.category)}</div>
            <div class="post-modal-body"><p>Loading...</p></div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Animate in
    requestAnimationFrame(() => overlay.classList.add('visible'));

    // Fetch markdown content from posts/ folder
    fetchPostContent(post.slug).then(content => {
        const bodyEl = overlay.querySelector('.post-modal-body');
        bodyEl.innerHTML = renderMarkdown(content);
    });

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
async function initBlogPage() {
    const blogGrid = document.getElementById('blogGrid');
    const blogEmpty = document.getElementById('blogEmpty');
    const filterTags = document.getElementById('filterTags');

    if (!blogGrid) return;

    await fetchPosts();

    function render(filter = 'all') {
        blogGrid.innerHTML = '';
        const filtered = filter === 'all'
            ? allPosts
            : allPosts.filter(p => p.category === filter);

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
}

// ===== Recent Posts Preview (Home page) =====
async function initRecentPosts() {
    const container = document.getElementById('recentPosts');
    if (!container) return;

    await fetchPosts();
    const posts = allPosts.slice(0, 3);
    posts.forEach(post => container.appendChild(createBlogCard(post)));
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initBlogPage();
    initRecentPosts();
});
