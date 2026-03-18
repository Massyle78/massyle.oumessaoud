# Massyle Oumessaoud — Portfolio

A personal portfolio site with an **Editorial Tech** aesthetic. Built with Vite + vanilla JS + GSAP. Deploys to GitHub Pages.

## Quick Start

```bash
npm install
npm run dev      # Local dev server on :3000
npm run build    # Production build → dist/
npm run preview  # Preview the build
```

## Deployment (GitHub Pages)

1. Push to a repo named `massyle78.github.io` (or any repo with Pages enabled).
2. The included `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
3. In **Settings → Pages**, set source to "GitHub Actions".

## Customization

### Content
All content is in `index.html`. Edit the text directly — no CMS or data files needed.

### Colors
Edit CSS custom properties in `src/css/main.css` under `:root`:
- `--accent` — primary accent color (default: `#00e5c7` deep cyan)
- `--bg-primary` — main background
- Light theme colors are under `[data-theme="light"]`

### Fonts
Fonts load from [Fontshare](https://www.fontshare.com/) (free, no API key):
- **Satoshi** (display/headings)
- **Switzer** (body text)

To change: update the `<link>` in `index.html` and `--font-display` / `--font-body` in CSS.

### Photo
Replace the placeholder SVG in the About section with an `<img>` tag pointing to your photo.

### Contact Form
Replace `YOUR_FORM_ID` in the form action URL with your [Formspree](https://formspree.io/) form ID.

### Projects
Add/remove `<article class="project-card">` blocks. Set `data-category` to match filter buttons.

## Color Palette

| Token | Dark | Light |
|-------|------|-------|
| Accent | `#00e5c7` | `#009e8a` |
| Background | `#0a0a0f` | `#f5f5f0` |
| Card | `#16161f` | `#ffffff` |
| Text | `#e8e8ed` | `#1a1a2e` |
| Muted | `#5c5c6e` | `#888899` |

## Features

- Dark/light theme with animated toggle
- Neural network canvas animation (interactive)
- Scroll-triggered reveals (IntersectionObserver + GSAP)
- Counter animations on metrics
- Project filtering by category
- Custom cursor (desktop)
- Grain overlay + mesh gradient background
- Terminal easter egg (Ctrl+Shift+T)
- Mobile responsive with animated burger menu
- SEO: Open Graph, JSON-LD structured data
- GitHub Actions CI/CD

## Tech Stack

| Layer | Tool |
|-------|------|
| Build | Vite 5 |
| Animations | GSAP 3 |
| Fonts | Fontshare (Satoshi + Switzer) |
| Icons | Inline SVG (Lucide-style) |
| Form | Formspree |
| Deploy | GitHub Pages + Actions |

## File Structure

```
├── index.html              # Single-page site
├── src/
│   ├── css/main.css        # All styles
│   └── js/main.js          # All interactivity
├── public/
│   └── favicon.svg         # Favicon
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages CI/CD
├── vite.config.js
└── package.json
```
