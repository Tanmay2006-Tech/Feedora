# Feedora - Vercel Deployment Guide

## Project Status
✅ **Fully Vercel-Ready** - All Replit references removed and project configured for production deployment.

## Quick Start

### Local Testing
```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# Verify build output
ls artifacts/feedora/dist
```

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Fix: Remove Replit references and make Vercel-ready"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Automatic Configuration**
   - Vercel will detect `vercel.json` configuration
   - Frontend will be deployed from `artifacts/feedora/dist`
   - API routes available from `/api/*`

## Configuration Files

### vercel.json
- Build command: `pnpm run build`
- Output directory: `artifacts/feedora/dist`
- Security headers pre-configured
- API routing configured

### .vercelignore
Excludes:
- Git files
- node_modules
- Logs and caches
- Development files

### package.json
- pnpm monorepo configuration
- All Replit dependencies removed

## Changes Made

### Removed Replit References
- ✅ `@replit/vite-plugin-cartographer` - Removed from all configs
- ✅ `@replit/vite-plugin-dev-banner` - Removed from all configs
- ✅ `@replit/vite-plugin-runtime-error-modal` - Removed from all configs
- ✅ `.replitignore` file - Deleted
- ✅ `.replit-artifact` directories - Cleaned up
- ✅ Replit-specific environment checks - Removed from vite configs

### Updated Vite Configuration
- **artifacts/feedora/vite.config.ts**
  - Removed all Replit plugin imports
  - Removed REPL_ID environment variable checks
  - Simplified to essential plugins only
  - Changed build output from `dist/public` to `dist`

- **artifacts/mockup-sandbox/vite.config.ts**
  - Removed Replit plugins and imports
  - Made PORT and BASE_PATH optional with sensible defaults
  - Simplified plugin configuration

### Updated Dependencies
- **artifacts/feedora/package.json** - Removed @replit packages
- **artifacts/mockup-sandbox/package.json** - Removed @replit packages
- **pnpm-workspace.yaml** - Removed Replit from catalog and exclusions

### Updated .gitignore
- Removed Replit cache directories
- Kept essential ignore patterns for Node.js

## Environment Variables

### Frontend Variables
Set in Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_BASE_URL=https://your-api.com  # Optional: API endpoint
```

### Optional for Local Development
Create `.env.local`:
```
VITE_API_BASE_URL=http://localhost:3001
```

## Build Process

### Monorepo Structure
```
feedora/
├── package.json          # Root workspace
├── vercel.json          # Vercel config
├── artifacts/
│   ├── feedora/         # React + Vite frontend
│   │   ├── src/
│   │   ├── dist/        # Built output (deployed)
│   │   └── package.json
│   ├── api-server/      # Express backend
│   └── mockup-sandbox/  # UI components preview
├── api/                 # Vercel API functions
├── lib/                 # Shared libraries
└── scripts/             # Build scripts
```

### Build Steps
1. **TypeScript Validation** - Type checking across workspace
2. **Shared Libraries** - Compile from `lib/`
3. **Frontend Build** - Vite build to `artifacts/feedora/dist`
4. **API Bundling** - Express app for Vercel Functions
5. **Deployment** - Static assets + serverless functions

## Troubleshooting

### Build Fails
**Issue**: Dependencies not found
- Solution: Ensure `pnpm-lock.yaml` is committed
- Command: `git add pnpm-lock.yaml && git commit -m "Update lockfile"`

### Frontend Shows 404
**Issue**: Pages returning 404
- Solution: Check `outputDirectory` in `vercel.json` matches actual output
- Current: `artifacts/feedora/dist`
- Verify: `pnpm run build && ls artifacts/feedora/dist`

### Port Binding Issues
**Issue**: "Port already in use" errors
- Solution: Fixed - vite.config.ts no longer enforces specific port
- Vercel handles port assignment automatically

### Build Output Missing
**Issue**: `artifacts/feedora/dist` directory not created
- Solution: Build locally first
  ```bash
  pnpm run build
  ls -la artifacts/feedora/dist
  ```

## Security Checklist

- ✅ Security headers configured in `vercel.json`
- ✅ HTTPS enabled automatically
- ✅ Environment variables in Vercel (not committed)
- ✅ No sensitive data in public/ directory
- ✅ API CORS headers configured

### Additional Recommendations
- [ ] Set up Vercel Analytics
- [ ] Enable Web Vitals tracking
- [ ] Configure error monitoring (Sentry, etc.)
- [ ] Set up database backups if using external DB
- [ ] Configure API rate limiting

## Performance Optimization

### Current Configuration
- Build output: Optimized Vite build
- Asset caching: Static assets cached indefinitely
- HTML: No-cache (fresh on each deploy)
- Compression: Vercel handles gzip/brotli

### Further Optimization
- Image optimization: Use WebP format
- Code splitting: Already handled by Vite
- Bundle analysis: `pnpm run build --analyze`

## API Integration

The API handler at `api/[[...slug]].ts` is configured to:
- Accept all HTTP methods
- Pass through CORS headers
- Support any backend integration

### Integration Options
1. **External API** (Recommended)
   - Host backend on Railway, Render, AWS, etc.
   - Set environment variable: `API_URL`

2. **Vercel Functions**
   - Add serverless functions in `api/` directory
   - TypeScript support included

3. **Database Direct**
   - Query Neon/Supabase directly from frontend
   - Requires RLS configuration

## Monitoring & Analytics

### Vercel Dashboard
- View deployment status
- Check build logs
- Monitor performance
- Track Web Vitals

### Recommended Integrations
- **Error Tracking**: Sentry, Datadog
- **Analytics**: Vercel Analytics, Plausible
- **Monitoring**: New Relic, Grafana

## Next Steps

1. **Local Verification**
   ```bash
   pnpm install
   pnpm run build
   pnpm run build:vercel
   ```

2. **Deploy to Staging**
   - Create a preview deployment for testing
   - Verify all features work in Vercel environment

3. **Production Deployment**
   - Deploy to main branch for production
   - Monitor for any issues

4. **Post-Deployment**
   - Set up monitoring and alerts
   - Configure domain and SSL
   - Enable analytics

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [pnpm Documentation](https://pnpm.io)

## Deployment Checklist

- [ ] All Replit references removed
- [ ] `pnpm-lock.yaml` committed
- [ ] `vercel.json` in root directory
- [ ] `.vercelignore` properly configured
- [ ] Build command: `pnpm run build`
- [ ] Output directory: `artifacts/feedora/dist`
- [ ] Node version compatible (20.x recommended)
- [ ] Environment variables set in Vercel Dashboard
- [ ] GitHub repository connected to Vercel
- [ ] Test deployment preview first
- [ ] Monitor logs during deployment
- [ ] Verify frontend loads correctly
- [ ] Verify API routes work
- [ ] Set up error tracking
- [ ] Enable Vercel Analytics

---

**Status**: ✅ Ready for Production Deployment
**Last Updated**: 2024-06-26
**Replit References**: ✅ All Removed
