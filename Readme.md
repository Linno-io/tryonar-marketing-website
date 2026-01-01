# TryonAR Marketing Website 🚀

A modern, content-driven marketing website built with Next.js and Sanity CMS, structured as a monorepo for optimal development experience.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Working with Content](#working-with-content)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This monorepo contains two main applications:

- **Studio** (`apps/studio`): Sanity Studio CMS for content management
- **Web** (`apps/web`): Next.js frontend application that consumes content from Sanity

The setup enables seamless content editing and preview capabilities, with both applications running independently but working together.

## 🛠 Tech Stack

### Frontend (apps/web)
- **Framework**: Next.js 16.1.0 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4
- **Content**: next-sanity 12.0.5
- **Deployment**: Netlify
- **Package Manager**: pnpm

### CMS (apps/studio)
- **CMS**: Sanity v5.1.0
- **Plugins**: Structure Tool, Vision (GROQ playground)
- **Styling**: Styled Components 6.1.18
- **React**: 19.1

## 📁 Project Structure

```
tryonar-marketing-website/
├── apps/
│   ├── studio/                    # Sanity Studio CMS
│   │   ├── schemaTypes/           # Content type definitions
│   │   │   ├── categoryType.ts
│   │   │   ├── commentType.ts
│   │   │   ├── ctaSectionType.ts
│   │   │   ├── heroSectionType.ts
│   │   │   ├── pageType.ts
│   │   │   ├── postType.ts
│   │   │   ├── seoType.ts
│   │   │   └── ...
│   │   ├── sanity.config.ts       # Sanity configuration
│   │   ├── sanity.cli.ts          # CLI configuration
│   │   └── package.json
│   │
│   └── web/                       # Next.js Frontend
│       ├── src/
│       │   ├── app/               # App Router pages
│       │   │   ├── page.tsx       # Homepage
│       │   │   ├── layout.tsx     # Root layout
│       │   │   └── [slug]/        # Dynamic pages
│       │   ├── components/        # React components
│       │   │   ├── sections/      # Page section components
│       │   │   └── ui/            # Reusable UI components
│       │   └── lib/
│       │       ├── sanity/        # Sanity client & queries
│       │       ├── types/         # TypeScript types
│       │       └── utils/         # Utility functions
│       ├── public/                # Static assets
│       ├── next.config.ts         # Next.js configuration
│       ├── netlify.toml           # Netlify deployment config
│       └── package.json
│
├── package.json                   # Root package.json (workspace)
├── pnpm-workspace.yaml           # pnpm workspace configuration
├── DEPLOYMENT.md                 # Deployment instructions
└── README.md                     # This file
```

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 20.0.0 (LTS recommended)
- **pnpm**: >= 10.0.0
- **Git**: Latest version

### Installing pnpm

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

Or using Homebrew on macOS:

```bash
brew install pnpm
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tryonar-marketing-website
```

### 2. Install Dependencies

From the root directory, install all dependencies for both apps:

```bash
pnpm install
```

This will install dependencies for all workspaces (studio and web) in one command.

### 3. Set Up Environment Variables

#### For Sanity Studio (apps/studio)

The Studio is already configured with the project ID in `sanity.config.ts`:
- **Project ID**: `90a20xmm`
- **Dataset**: `production`

No additional `.env` file is needed for the studio.

#### For Next.js Frontend (apps/web)

Create a `.env.local` file in `apps/web/`:

```bash
cd apps/web
touch .env.local
```

Add the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=90a20xmm
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Optional: For ISR/revalidation (requires read token from Sanity)
SANITY_API_TOKEN=your-sanity-read-token
```

### 4. Start Development Servers

You have two options:

#### Option A: Start Both Apps Simultaneously (Recommended)

From the root directory:

```bash
pnpm dev
```

This will start:
- 🎨 Sanity Studio at [http://localhost:3333](http://localhost:3333)
- 🌐 Next.js app at [http://localhost:3000](http://localhost:3000)

#### Option B: Start Apps Individually

**Start Sanity Studio:**
```bash
cd apps/studio
pnpm dev
```

**Start Next.js Frontend:**
```bash
cd apps/web
pnpm dev
```

## 💻 Development

### Working with Sanity Studio

1. Open [http://localhost:3333](http://localhost:3333) in your browser
2. Sign in with your Sanity account
3. Create and edit content using the Studio interface
4. Changes are saved as drafts automatically
5. Publish content to make it available to the frontend

### Working with the Frontend

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. The site will automatically reflect published content from Sanity
3. Make changes to components in `apps/web/src/`
4. Hot reload is enabled - changes appear instantly

### Modifying Content Schemas

Schema types are defined in `apps/studio/schemaTypes/`. To add a new content type:

1. Create a new file in `apps/studio/schemaTypes/` (e.g., `newType.ts`)
2. Define your schema using Sanity's schema definition
3. Export it from `apps/studio/schemaTypes/index.ts`
4. Restart the Studio dev server

Example:
```typescript
import {defineType} from 'sanity'

export default defineType({
  name: 'newType',
  type: 'document',
  title: 'New Type',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
  ],
})
```

### Adding New UI Components

Components are organized by purpose:

- **Page Sections**: `apps/web/src/components/sections/`
- **UI Components**: `apps/web/src/components/ui/`
- **Layout Components**: `apps/web/src/components/`

### Type Safety

TypeScript types for content are defined in `apps/web/src/lib/types/`. Update these when modifying schemas to maintain type safety.

## 🚢 Deployment

### Deploying to Netlify

The project is configured for deployment on Netlify. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Deploy Steps:**

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Configure environment variables in Netlify dashboard
4. Deploy!

### Deploying Sanity Studio

Deploy your Sanity Studio to make it accessible online:

```bash
cd apps/studio
pnpm deploy
```

This will deploy the Studio to `https://your-project.sanity.studio`

## 📝 Working with Content

### Content Types

The project includes the following content types:

- **Page**: Main page content with sections
- **Post**: Blog posts with categories and comments
- **User**: Author information
- **Category**: Content categorization
- **Site Settings**: Global site configuration
- **SEO**: SEO metadata for pages

### Section Types

Reusable page sections:
- Hero Section
- CTA Section
- Industry Solutions Section
- Success Stories Section
- Reality Check Section
- And more...

### Querying Content

GROQ queries are defined in `apps/web/src/lib/sanity/queries.ts`. Example:

```typescript
export const pageQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    sections[]-> {
      _type,
      ...
    }
  }
`
```

## 📜 Available Scripts

### Root Level

```bash
# Start both apps in development mode
pnpm dev

# Build both apps
pnpm build
```

### Studio (apps/studio)

```bash
# Start Sanity Studio development server
pnpm dev

# Build Studio for production
pnpm build

# Deploy Studio to Sanity hosting
pnpm deploy

# Deploy GraphQL API
pnpm deploy-graphql
```

### Web (apps/web)

```bash
# Start Next.js development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## 🔐 Environment Variables

### Required for Production (apps/web)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | `90a20xmm` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version | `2024-01-01` |

### Optional

| Variable | Description | When to Use |
|----------|-------------|-------------|
| `SANITY_API_TOKEN` | Sanity read token | For ISR, on-demand revalidation, or draft previews |

## 🐛 Troubleshooting

### pnpm install fails

**Problem**: Installation errors or missing packages

**Solution**:
```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules
rm -rf node_modules apps/*/node_modules

# Reinstall
pnpm install
```

### Studio won't start

**Problem**: Port 3333 already in use

**Solution**:
```bash
# Find process using port 3333
lsof -i :3333

# Kill the process
kill -9 <PID>

# Or specify a different port
cd apps/studio
pnpm dev --port 3334
```

### Content not showing on frontend

**Problem**: Changes in Studio not reflecting on the website

**Solutions**:
1. Ensure content is **published** (not just saved as draft)
2. Check environment variables are set correctly
3. Verify CORS settings in Sanity dashboard
4. Restart the Next.js dev server

### Build errors

**Problem**: Build fails in production

**Common Causes**:
- Missing environment variables
- TypeScript errors
- Outdated dependencies

**Solution**:
```bash
# Check TypeScript errors
cd apps/web
npx tsc --noEmit

# Update dependencies
pnpm update

# Clear Next.js cache
rm -rf .next
pnpm build
```

### CORS errors

**Problem**: API requests blocked by CORS

**Solution**:
1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select project `90a20xmm`
3. Navigate to **API** → **CORS Origins**
4. Add your domain (e.g., `http://localhost:3000`, `https://your-site.netlify.app`)
5. Enable "Allow credentials"

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [pnpm Documentation](https://pnpm.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test locally with both apps running
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

## 📄 License

UNLICENSED - Private project

## 💬 Support

For questions or issues, please contact the development team or open an issue in the repository.

---

**Happy Coding! 🎉**
