# Deployment Guide - Netlify

## Prerequisites

1. A Netlify account
2. Your Sanity project deployed and accessible
3. Git repository connected to Netlify

## Steps to Deploy

### 1. Connect Repository to Netlify

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub, GitLab, Bitbucket)
4. Select your repository

### 2. Configure Build Settings

Netlify should auto-detect the `netlify.toml` configuration. Verify these settings:

- **Base directory**: `apps/web`
- **Build command**: `pnpm build`
- **Publish directory**: `.next`
- **Node version**: 20

### 3. Set Environment Variables

In Netlify dashboard, go to: **Site settings** → **Environment variables**

Add the following variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=90a20xmm
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Optional (for ISR and revalidation):
```
SANITY_API_TOKEN=your-sanity-read-token
```

### 4. Install Netlify Next.js Plugin

The `@netlify/plugin-nextjs` is configured in `netlify.toml`. It will be automatically installed during build.

### 5. Deploy

Click "Deploy site" and Netlify will:
1. Install dependencies using pnpm
2. Build your Next.js application
3. Deploy to Netlify's edge network

## CORS Configuration

Don't forget to add your Netlify domain to Sanity CORS origins:

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **CORS Origins**
4. Add your Netlify domain (e.g., `https://your-site.netlify.app`)
5. Enable "Allow credentials"

## Post-Deployment Checklist

- [ ] Site is accessible at your Netlify URL
- [ ] Pages load correctly with Sanity content
- [ ] Images from Sanity CDN are displaying
- [ ] Navigation works properly
- [ ] SEO meta tags are rendering
- [ ] Check browser console for any errors

## Custom Domain (Optional)

1. In Netlify: **Domain settings** → **Add custom domain**
2. Follow DNS configuration instructions
3. Add custom domain to Sanity CORS origins

## Continuous Deployment

Netlify will automatically deploy when you push to your connected Git branch.

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify all environment variables are set
- Ensure pnpm-workspace.yaml is properly configured

### Content Not Displaying
- Verify Sanity API credentials
- Check CORS settings in Sanity
- Review browser console for API errors

### 404 Errors on Pages
- Ensure dynamic routes are properly configured in Next.js
- Check Sanity content has been published

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Sanity Documentation](https://www.sanity.io/docs)
