# Deployment Process

This document outlines the deployment workflow for the TryOnAR Marketing Website.

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐                │
│   │  GitHub  │ ──► │  Netlify │ ──► │   CDN    │                │
│   │   Push   │     │   Build  │     │   Edge   │                │
│   └──────────┘     └──────────┘     └──────────┘                │
│                                                                  │
│   ┌──────────┐     ┌──────────┐                                 │
│   │  Sanity  │ ──► │  Sanity  │                                 │
│   │  Studio  │     │  Cloud   │                                 │
│   │ (local)  │     │ (hosted) │                                 │
│   └──────────┘     └──────────┘                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Environments

| Environment | Purpose | URL |
|-------------|---------|-----|
| Development | Local development | http://localhost:3000 |
| Staging | Preview deployments | https://deploy-preview-*.netlify.app |
| Production | Live site | https://tryonar.com |

## Deployment Methods

### Automatic Deployment (CI/CD)

**Trigger**: Push to `master` branch

1. GitHub webhook triggers Netlify build
2. Netlify installs dependencies (`pnpm install`)
3. Netlify builds Next.js (`pnpm --filter web build`)
4. Build artifacts deployed to CDN
5. Cache invalidated for updated pages

### Preview Deployments

**Trigger**: Pull request opened/updated

1. Netlify creates unique preview URL
2. Preview link added as PR comment
3. Allows testing before merge
4. Preview deleted after PR closed

### Manual Deployment

```bash
# Deploy from CLI
netlify deploy --prod --dir=apps/web/.next

# Or trigger via Netlify dashboard
# Go to Deploys → Trigger deploy → Deploy site
```

## Build Configuration

### Netlify Configuration

```toml
# netlify.toml
[build]
  base = "apps/web"
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--prefix=/dev/null"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# Redirects
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables

Set in Netlify Dashboard (Site settings → Environment variables):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=90a20xmm
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<your-token>
```

## Deployment Checklist

### Pre-Deployment

- [ ] All tests pass locally
- [ ] TypeScript compiles without errors
- [ ] Build succeeds locally (`pnpm build`)
- [ ] No console errors in development
- [ ] Content reviewed in Sanity Studio
- [ ] SEO metadata verified

### Deployment

- [ ] Create PR to master
- [ ] Review preview deployment
- [ ] Get code review approval
- [ ] Merge PR to master
- [ ] Monitor build in Netlify

### Post-Deployment

- [ ] Verify production site loads
- [ ] Check key pages and features
- [ ] Verify images load correctly
- [ ] Test navigation and links
- [ ] Check mobile responsiveness
- [ ] Monitor for errors

## Sanity Studio Deployment

### Deploy Sanity Studio

```bash
# Navigate to studio directory
cd apps/studio

# Deploy to Sanity cloud
pnpm sanity deploy

# Studio URL: https://tryonar.sanity.studio
```

### Studio Access

- **URL**: https://tryonar.sanity.studio
- **Project ID**: 90a20xmm
- **Dataset**: production

## Rollback Procedures

### Netlify Rollback

1. Go to Netlify Dashboard
2. Navigate to Deploys
3. Find the last working deploy
4. Click "Publish deploy"

### Git Rollback

```bash
# Revert last commit
git revert HEAD
git push origin master

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin master --force  # Use with caution!
```

## Content Publishing Workflow

### Sanity Content Updates

1. Editor makes changes in Sanity Studio
2. Changes saved to Sanity Cloud immediately
3. Next.js fetches updated content via ISR
4. Page regenerates within 60 seconds
5. CDN serves fresh content

### Content Rollback

Sanity maintains version history:

1. Open document in Sanity Studio
2. Click "History" in document inspector
3. Select previous version
4. Click "Restore"

## Monitoring & Alerts

### Netlify Monitoring

- Build notifications (success/failure)
- Deploy previews
- Form submissions (if used)

### Error Monitoring

Consider adding:

```typescript
// Sentry integration
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

### Performance Monitoring

- Netlify Analytics
- Google PageSpeed Insights
- Lighthouse CI

## Build Optimization

### Speed Up Builds

```toml
# netlify.toml

# Enable persistent caching
[build]
  ignore = "git diff --quiet HEAD^ HEAD -- apps/web/"
```

### Cache Dependencies

Netlify automatically caches:
- `node_modules`
- `.next/cache`
- pnpm store

## Branch Strategy

```
master (production)
  │
  ├── feature/add-pricing-section
  ├── fix/mobile-nav-issue
  └── docs/update-readme
```

### Branch Rules

| Branch | Deploys To | Auto Deploy |
|--------|------------|-------------|
| `master` | Production | Yes |
| `develop` | Staging | Yes |
| Feature branches | Preview | Yes (PR only) |

## Deployment Commands

```bash
# Local Development
pnpm dev                    # Start both apps
pnpm --filter web dev       # Start Next.js only
pnpm --filter studio dev    # Start Sanity only

# Build
pnpm build                  # Build all apps
pnpm --filter web build     # Build Next.js only

# Sanity
cd apps/studio
pnpm sanity deploy          # Deploy Sanity Studio

# Netlify CLI
netlify deploy              # Deploy preview
netlify deploy --prod       # Deploy to production
netlify open                # Open dashboard
```

## Troubleshooting

### Build Failures

1. Check Netlify build logs
2. Reproduce locally with `pnpm build`
3. Verify environment variables
4. Check Node.js version compatibility

### Content Not Updating

1. Check ISR revalidation period (60s)
2. Verify Sanity webhook triggers
3. Clear Netlify cache and redeploy
4. Check Sanity API token validity

### Performance Issues

1. Analyze bundle with `ANALYZE=true pnpm build`
2. Check Lighthouse scores
3. Verify image optimization
4. Review Core Web Vitals

## Related Documentation

- [Architecture Overview](./architecture-overview.md)
- [Performance Optimization](./performance-optimization.md)
- [Security Guidelines](./security-guidelines.md)
