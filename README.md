# Aaddy Portfolio

A modern, responsive personal portfolio website built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, and **Framer Motion**.

## Features

- **Hero Section** — Animated gradient orbs, stats badges, dual CTAs
- **About** — Bio, stats cards, focus tags, resume & social links
- **Skills** — 3 categories with animated stagger entrance, "Currently Exploring" section
- **Projects** — Category filter pills, grid/list toggle, hover-reveal cards
- **Services** — 4 service cards with icons, hover effects, CTA to contact
- **Contact** — Floating-label inputs, real-time validation, Resend email API
- **Footer** — 4-column nav, social links, scroll-to-top
- **Sticky Navbar** — Active section tracking, mobile drawer, theme toggle
- **Dark/Light Mode** — Single accent color (cyan #22d3ee), CSS custom properties
- **Accessibility** — Semantic HTML, focus-visible outlines, reduced-motion support
- **SEO** — Metadata, Open Graph, Twitter cards, sitemap, robots.txt, JSON-LD Person schema

## Tech Stack

- **Framework:** Next.js 16.4.5 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 with CSS custom properties
- **Animation:** Framer Motion 12
- **Fonts:** Space Grotesk (display) + Inter (body) via `next/font`
- **Email:** Resend API route
- **Language:** TypeScript (strict mode)
- **Linting:** ESLint (Next.js config)

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd aaddy-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root:

```env
# Resend (for contact form emails)
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=your-email@example.com
```

The contact form works without Resend configured — it falls back to console logging.

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts    # Resend email API
│   ├── globals.css             # Design system, CSS variables, utilities
│   ├── layout.tsx              # Fonts, metadata, JSON-LD schema
│   ├── page.tsx                # Main page composition
│   ├── robots.ts               # robots.txt generation
│   └── sitemap.ts              # sitemap.xml generation
├── components/
│   ├── Navbar.tsx              # Sticky nav, mobile drawer, theme toggle
│   ├── Hero.tsx                # Gradient orbs, stats, CTAs
│   ├── About.tsx               # Bio, stats cards, focus tags
│   ├── Skills.tsx              # Category buttons, exploring section
│   ├── Projects.tsx            # Filter, grid/list, project cards
│   ├── Services.tsx            # Service cards with icons
│   ├── Contact.tsx             # Form with validation, info cards
│   ├── Footer.tsx              # 4-col nav, social links, scroll-top
│   └── ThemeToggle.tsx         # Dark/light switch
├── data/
│   └── projects.ts             # All content data (projects, skills, services, personal)
└── public/
    └── projects/               # Project placeholder images (.svg)
```

## Customization

### Personal Info

Edit `src/data/projects.ts`:

```typescript
export const personal = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  bio: "Your bio...",
  email: "you@example.com",
  location: "City, Country",
  github: "https://github.com/you",
  linkedin: "https://linkedin.com/in/you",
  resume: "/resume.pdf",
  avatar: "/avatar.jpg",
};
```

### Projects

Add/modify projects in `src/data/projects.ts`:

```typescript
export const projects = [
  {
    id: "unique-id",
    title: "Project Name",
    description: "Description...",
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/projects/project-name.svg",
    liveUrl: "https://demo.example.com",
    githubUrl: "https://github.com/you/repo",
    featured: true,
    year: 2025,
  },
];
```

### Skills & Services

Update the `skills` and `services` arrays in the same file.

### Colors

Modify CSS custom properties in `src/app/globals.css`:

```css
:root {
  --accent: #22d3ee;        /* Primary accent (cyan) */
  --accent-muted: #06b6d4;  /* Accent variant */
  --background: #030305;    /* Dark bg */
  --foreground: #fafafa;    /* Dark text */
  /* ... */
}

.light {
  --background: #fafafa;    /* Light bg */
  --foreground: #030305;    /* Light text */
  /* ... */
}
```

### Fonts

Change fonts in `src/app/layout.tsx`:

```typescript
const displayFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab/Bitbucket
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variables:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy

Vercel auto-detects Next.js and configures optimal settings.

### Other Platforms

The app is a standard Next.js project — deploy anywhere Node.js is supported:

```bash
npm run build
npm run start
```

### Static Export (if needed)

For fully static hosting, add to `next.config.ts`:

```typescript
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};
```

Note: The contact API route requires a server — it won't work with static export.

## License

MIT — feel free to use as a template for your own portfolio.

---

Built with ❤️ using Next.js, Tailwind CSS & Framer Motion.