# Security Guidelines

This document outlines security best practices for the TryOnAR Marketing Website.

## Environment Variables

### Protecting Sensitive Data

**Never commit secrets to version control:**

```bash
# .gitignore should include:
.env
.env.local
.env.*.local
```

**Required environment variables:**

| Variable | Sensitivity | Description |
|----------|-------------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | Safe to expose (public API) |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Public | API version date |
| `SANITY_API_TOKEN` | **Secret** | Never expose client-side |

### Environment Variable Best Practices

1. Use `NEXT_PUBLIC_` prefix only for truly public values
2. Store secrets in environment variables, not code
3. Use different tokens for development and production
4. Rotate tokens periodically
5. Audit token permissions (use least privilege)

## Content Security

### Sanity Studio Access

1. **Authentication**: All Sanity Studio users must authenticate
2. **Role-based Access**: Configure appropriate roles:
   - Administrator: Full access
   - Editor: Content management only
   - Viewer: Read-only access
3. **Audit Logging**: Sanity logs all content changes

### Content Sanitization

```typescript
// Always sanitize user-generated content
import DOMPurify from 'dompurify'

const sanitizedHtml = DOMPurify.sanitize(userContent)
```

## Image Security

### Allowed Domains

Configure allowed image sources in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' },
    { protocol: 'https', hostname: 'images.unsplash.com' }
  ]
}
```

**Do not add untrusted domains to this list.**

### Image Upload Validation

In Sanity Studio:
1. Validate file types (allow only images)
2. Set maximum file sizes
3. Scan for malicious content

## API Security

### GROQ Query Safety

```typescript
// Good: Use parameterized queries
const query = groq`*[_type == "page" && slug.current == $slug][0]`
const result = await client.fetch(query, { slug: userInput })

// Bad: String interpolation (XSS risk)
const query = groq`*[_type == "page" && slug.current == "${userInput}"][0]`
```

### Rate Limiting

Sanity implements rate limiting on the API. For custom endpoints:

```typescript
// Consider implementing rate limiting for any custom APIs
import rateLimit from 'express-rate-limit'
```

## Dependency Security

### Regular Updates

```bash
# Check for vulnerabilities
pnpm audit

# Update dependencies
pnpm update

# Update to latest major versions (careful)
pnpm update --latest
```

### Dependency Review

1. Review new dependencies before adding
2. Check package reputation and maintenance
3. Prefer well-known, actively maintained packages
4. Minimize dependency count

## Headers & CSP

### Security Headers

Configure in `netlify.toml` or `next.config.ts`:

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ]
}
```

### Content Security Policy

```typescript
{
  key: 'Content-Security-Policy',
  value: `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' cdn.sanity.io images.unsplash.com data:;
    font-src 'self';
    connect-src 'self' *.sanity.io;
  `.replace(/\n/g, '')
}
```

## Authentication Best Practices

### If Adding User Authentication

1. Use established auth providers (Auth0, NextAuth.js, Clerk)
2. Implement proper session management
3. Use HTTPS everywhere
4. Implement CSRF protection
5. Hash passwords with bcrypt or Argon2
6. Enforce strong password policies

## Form Security

### Input Validation

```typescript
// Validate all user inputs
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

// Validate before processing
const result = contactSchema.safeParse(formData)
if (!result.success) {
  return { error: result.error.issues }
}
```

### CSRF Protection

Next.js App Router handles this automatically for Server Actions. For custom API routes:

```typescript
// Use csrf tokens for form submissions
import csrf from 'csrf'
```

## Deployment Security

### Netlify Configuration

```toml
# netlify.toml
[build.environment]
  NODE_VERSION = "20"

# Redirect HTTP to HTTPS
[[redirects]]
  from = "http://example.com/*"
  to = "https://example.com/:splat"
  status = 301
  force = true
```

### Branch Protection

1. Protect main/master branch
2. Require pull request reviews
3. Require status checks to pass
4. No force pushes to protected branches

## Incident Response

### If a Security Issue is Discovered

1. **Assess** the severity and scope
2. **Contain** the issue (revoke tokens, disable features)
3. **Investigate** root cause
4. **Fix** the vulnerability
5. **Document** the incident and response
6. **Review** and improve processes

### Token Rotation

If a secret is compromised:

1. Immediately revoke the compromised token
2. Generate a new token
3. Update all environments
4. Audit for unauthorized access
5. Investigate how the leak occurred

## Security Checklist

### Pre-Deployment

- [ ] No secrets in code or version control
- [ ] Dependencies audited for vulnerabilities
- [ ] Environment variables configured correctly
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Image domains restricted

### Regular Maintenance

- [ ] Weekly dependency audits
- [ ] Monthly secret rotation review
- [ ] Quarterly security review
- [ ] Annual penetration testing

## Related Documentation

- [Best Practices](./best-practices.md)
- [Deployment Process](./deployment-process.md)
- [Contribution Guidelines](./contribution-guidelines.md)
