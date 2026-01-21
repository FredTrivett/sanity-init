# Sanity Page Builder

A clean, reusable website template with a visual page builder. Built with **Next.js** and **Sanity CMS**, optimized for **Cloudflare Pages**.

## What is this?

A starter template for building client websites with:

- **Page Builder** - Create pages by adding and reordering sections
- **Visual Editing** - Edit content directly on the page preview in Sanity Studio
- **Live Preview** - See changes instantly as you type
- **Edge Deployment** - Fast global delivery via Cloudflare

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js](https://nextjs.org) | React framework |
| [Sanity](https://sanity.io) | Headless CMS |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Cloudflare Pages](https://pages.cloudflare.com) | Hosting |

---

## Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd sanity-init
npm install
```

### 2. Create Sanity Project

Go to [sanity.io/manage](https://sanity.io/manage) and create a new project. Copy your **Project ID**.

### 3. Create API Token

In Sanity Manage:
1. Go to **API** → **Tokens**
2. Click **Add API token**
3. Name it "Viewer Token"
4. Set permissions to **Viewer**
5. Copy the token

### 4. Set Up Environment Variables

Create `.env.local` in the project root:

```bash
# Public
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_STUDIO_URL="http://localhost:3000/studio"

# Studio preview
SANITY_STUDIO_PREVIEW_ORIGIN="http://localhost:3000"

# Private
SANITY_VIEWER_TOKEN="your-viewer-token"
```

### 5. Run Locally

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Creating Content

1. Go to `/studio`
2. Click **Pages** → **+** to create a new page
3. Set the slug to `home` for the homepage
4. Add sections (Hero, etc.)
5. Click **Publish**

---

## Deploying to Cloudflare Pages

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connect to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create**
3. Select **Connect to Git**
4. Choose your repository
5. Configure build settings:
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Build output directory:** `.open-next`

### Step 3: Add Environment Variables

In Cloudflare Pages settings → **Variables and Secrets**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | `https://your-site.pages.dev/studio` |
| `SANITY_STUDIO_PREVIEW_ORIGIN` | `https://your-site.pages.dev` |
| `SANITY_VIEWER_TOKEN` | Your viewer token |

### Step 4: Deploy

Cloudflare will automatically deploy when you push to GitHub.

For manual deployment:

```bash
npm run deploy
```

---

## Making Changes

### Workflow

1. **Make code changes** locally
2. **Test** with `npm run dev`
3. **Commit & push** to GitHub
4. Cloudflare **auto-deploys** from GitHub

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run preview` | Test in Cloudflare Workers locally |
| `npm run deploy` | Deploy to Cloudflare |

---

## Adding New Sections

1. Create schema in `src/sanity/schemaTypes/`
2. Register in `schemaTypes/index.ts`
3. Add to `pageType.ts` sections array
4. Create React component in `src/components/sections/`
5. Add render case in `SectionsRenderer.tsx`

---

## Project Structure

```
sanity-init/
├── src/
│   ├── app/
│   │   ├── (site)/          # Website pages
│   │   ├── api/             # API routes
│   │   └── studio/          # Sanity Studio
│   ├── components/
│   │   └── sections/        # Page sections
│   └── sanity/
│       ├── lib/             # Client & queries
│       └── schemaTypes/     # Content schemas
├── .env.local               # Environment variables
├── wrangler.jsonc           # Cloudflare config
└── sanity.config.ts         # Studio config
```

---

## License

MIT
