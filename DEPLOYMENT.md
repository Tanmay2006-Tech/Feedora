# Vercel Deployment Guide

## Project Overview

This is a monorepo containing:
- **Frontend**: React + Vite app (artifacts/feedora)
- **API Server**: Express.js API (artifacts/api-server)
- **Shared Libraries**: API client, Zod schemas, database (lib/)

## Deployment Architecture

### Frontend Deployment
- **Output**: `artifacts/feedora/dist`
- **Framework**: Vite (React)
- **Deployment**: Static site on Vercel

### API Deployment
- **Location**: `api/` directory (Vercel Functions)
- **Runtime**: Node.js 20.x
- **Handler**: `api/[[...slug]].ts`

## Prerequisites

1. **Git Repository**: Your project must be on GitHub, GitLab, or Bitbucket
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Environment Variables**: Set up in Vercel dashboard

## Step-by-Step Deployment

### 1. Connect Repository to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your repository
4. Configure project settings

### 2. Project Configuration

Vercel will automatically detect the configuration from:
- `vercel.json` - Main configuration file
- `package.json` - Build and installation commands
- `.vercelignore` - Files to exclude from deployment

### 3. Environment Variables Setup

In Vercel Dashboard → Project Settings → Environment Variables:

**Frontend (Production/Preview/Development)**:
```
PORT=3000
BASE_PATH=/
VITE_API_BASE_URL=https://your-api-endpoint.com
```

**Backend/API** (optional, if using local functions):
```
DATABASE_URL=your-database-url
JWT_SECRET=your-secret-key
NODE_ENV=production
```

### 4. Deploy

Option A: **Automatic Deployment**
- Push to main branch → Automatic deployment

Option B: **Manual Deployment**
```bash
npm install -g vercel
vercel --prod
```

## Configuration Details

### vercel.json Breakdown

```json
{
  "version": 2,                              // Vercel v2 API
  "buildCommand": "pnpm run build",         // Build command
  "installCommand": "pnpm install --frozen-lockfile",  // Install command
  "outputDirectory": "artifacts/feedora/dist", // Static output
  "env": {                                   // Default environment variables
    "PORT": { "default": "3000" },
    "BASE_PATH": { "default": "/" },
    "NODE_ENV": { "default": "production" }
  },
  "functions": {
    "api/**": {
      "runtime": "nodejs20.x",              // Node.js version
      "memory": 1024,                       // Memory allocation (MB)
      "maxDuration": 60                     // Max execution time (seconds)
    }
  },
  "rewrites": [                              // URL rewrites
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }  // SPA fallback
  ]
}
```

### Environment Variables

**Frontend Variables**:
- `PORT`: Server port (default: 3000)
- `BASE_PATH`: Base URL path for frontend (default: /)
- `VITE_*`: Exposed to client-side code via Vite

**Backend Variables**:
- `DATABASE_URL`: Database connection string
- `JWT_SECRET`: Secret key for authentication
- `NODE_ENV`: Set to "production" for Vercel

## Build Process

### What Happens During Build

1. **Type Checking**: TypeScript validation across workspace
2. **Library Build**: Compile shared libraries (lib/)
3. **API Build**: Bundle Express app with esbuild
4. **Frontend Build**: Vite build for React app
5. **Output**: `artifacts/feedora/dist` → Vercel CDN

### Build Commands

```bash
# Root level
pnpm run build          # Full build (typecheck + all packages)
pnpm run build:vercel   # Vercel-specific build

# Individual packages
pnpm -r run build       # Build all packages
pnpm run typecheck      # Type checking only
```

## Troubleshooting

### Build Failures

1. **Dependencies**: Check `pnpm-lock.yaml` is committed
   ```bash
   git add pnpm-lock.yaml
   git commit -m "Update lockfile"
   ```

2. **Environment Variables**: Verify in Vercel Dashboard
   - Project Settings → Environment Variables
   - Check variable names match exactly

3. **Port Issues**: If PORT is required, set default in vite.config.ts ✓ (already fixed)

### Runtime Issues

1. **API Not Working**: Check `api/[[...slug]].ts` handler
2. **CORS Errors**: Add CORS headers in API configuration
3. **Asset 404s**: Verify `outputDirectory` path is correct

### Local Testing

```bash
# Install Vercel CLI
npm install -g vercel

# Test locally
vercel dev

# Deploy to staging
vercel --prod --prebuilt
```

## API Configuration

Currently, the API handler (`api/[[...slug]].ts`) returns a placeholder. To enable the API:

### Option 1: External API Service
```typescript
// In api/[[...slug]].ts
const apiUrl = process.env.API_URL;
const response = await fetch(apiUrl + req.url, {
  method: req.method,
  headers: req.headers,
  body: req.body
});
```

### Option 2: Use Built API Server
Connect to external API server running on Render, Railway, or AWS Lambda.

### Option 3: Database Direct Connection
Query database directly from Vercel Functions using Drizzle ORM.

## Performance Optimization

1. **Image Optimization**
   - Use Next.js Image (if migrating)
   - Use WebP format
   - Implement lazy loading

2. **Bundle Size**
   ```bash
   pnpm run build
   # Check artifacts/feedora/dist size
   ```

3. **Caching**
   - Static assets: 1 year cache
   - HTML: no cache (revalidate on deploy)
   - API responses: configure in api/[[...slug]].ts

## Security

✓ Security headers already configured in vercel.json:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

Additional recommendations:
1. Use environment variables for secrets (never commit .env files)
2. Enable HTTPS (automatic with Vercel)
3. Set up rate limiting for API endpoints
4. Configure CORS properly
5. Use Content Security Policy headers

## Monitoring

1. **Vercel Analytics**: View in Dashboard → Analytics
2. **Performance**: Check Lighthouse scores
3. **Logs**: Dashboard → Deployments → Logs
4. **Errors**: Sentry integration recommended

## Next Steps

1. Add `@vercel/node` types to devDependencies
   ```bash
   pnpm add -D @vercel/node
   ```

2. Configure API backend:
   - External service URL
   - Database connection
   - Authentication

3. Set up environment variables in Vercel Dashboard

4. Test deployment:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Express.js Documentation](https://expressjs.com)

## References

- Vercel Config: `./vercel.json`
- Environment Defaults: `./.env.example`
- Ignore Rules: `./.vercelignore`
