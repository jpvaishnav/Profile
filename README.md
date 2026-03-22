# Personal Portfolio & Blog Website

A clean, modern personal website with a blog for posting learning notes, technical concepts, and insights. Built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no payment required.

## Features

- **Portfolio home page** — Hero section, About, Skills, Projects, Certifications, Contact
- **Blog / Learning Notes** — Write, publish, and filter posts by category
- **Post viewer** — Click any post to read it in a modal with Markdown rendering
- **Persistent storage** — Posts are saved in browser localStorage
- **Responsive** — Works on desktop, tablet, and mobile
- **Dark theme** — Modern dark UI with accent colors
- **Zero dependencies** — No npm, no build step, just files

## Quick Start

### Personalize

1. Open `index.html` and replace:
   - `Your Name` with your actual name
   - `your.email@example.com` with your email
   - `yourusername` in GitHub/LinkedIn URLs with yours
   - Update the About, Skills, Projects, and Certifications sections
2. Add your profile photo as `images/profile.jpg` (square, ~400×400px recommended)

---

## Running Locally

### Option 1: VS Code Live Server (Recommended)

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Open the `website` folder in VS Code
3. Right-click `index.html` → **Open with Live Server**
4. Site opens at `http://127.0.0.1:5500`

### Option 2: Python HTTP Server

```bash
cd website
python -m http.server 8080
```
Open `http://localhost:8080` in your browser.

### Option 3: Node.js HTTP Server

```bash
npx serve website
```
Or install globally:
```bash
npm install -g serve
serve website
```

### Option 4: Just Open the File

Double-click `index.html` in your file explorer. Everything works offline except Google Fonts (which gracefully fall back to system fonts).

---

## Deploying Remotely (Free Options)

### GitHub Pages

1. Push this `website` folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to the branch/folder containing `index.html`
4. Your site will be live at `https://yourusername.github.io/reponame/`

### Netlify

1. Go to [netlify.com](https://www.netlify.com/) and sign up (free)
2. Drag and drop the `website` folder onto the Netlify dashboard
3. Your site gets a URL like `https://your-site.netlify.app`
4. Optionally connect a custom domain

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `website` folder
3. Follow the prompts — site deploys in seconds

### Azure Static Web Apps

1. Create a Static Web App in the Azure Portal (free tier)
2. Connect your GitHub repo
3. Set the app location to the `website` folder
4. Deploys automatically on push

---

## Project Structure

```
website/
├── index.html          # Main portfolio page
├── blog.html           # Blog listing + new post form
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Blog logic, navigation, rendering
├── images/
│   ├── profile.jpg     # Your photo (add this yourself)
│   └── README.md       # Image guidelines
└── README.md           # This file
```

## Blog Usage

- Navigate to the **Blog** page
- Scroll down to **Write a New Post**
- Fill in title, category, content (Markdown supported), and tags
- Click **Publish Post** — it's saved to localStorage and appears immediately
- Use filter buttons to browse by category
- Click any post card to read the full content

## Customization

- **Colors**: Edit CSS variables in `:root` at the top of `css/style.css`
- **Fonts**: Change the Google Fonts import in both HTML files
- **Sections**: Add/remove HTML sections in `index.html`
- **Categories**: Update filter buttons in `blog.html` and the `<select>` options
