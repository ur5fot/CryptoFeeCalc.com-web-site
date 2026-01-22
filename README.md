# CryptoFeeCalc Frontend

Crypto fee calculator web application built with Nuxt 3 and TypeScript.

## Tech Stack

- **Framework**: Nuxt 3.12.4
- **Language**: TypeScript
- **UI**: Vue 3 (Composition API)
- **Styling**: Scoped CSS with CSS Grid/Flexbox
- **Fonts**: IBM Plex Sans, IBM Plex Mono, Space Grotesk
- **Rendering**: SSR (Server-Side Rendering)

## Setup

```bash
npm install
```

### Environment Variables

Create `.env` file for local development:

```env
NUXT_PUBLIC_API_BASE=http://localhost:8787
```

| Variable | Description | Default |
|----------|-------------|---------|
| `NUXT_PUBLIC_API_BASE` | API endpoint URL | `https://api.cryptofeecalc.com` |

For local development, set to `http://localhost:8787` (Wrangler dev server).
If not set, the default is `https://api.cryptofeecalc.com` (see `nuxt.config.ts`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Preview production build |
| `npm run type-check` | Run TypeScript type checking |

## Development

Run locally:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Agent Notes

Project-specific agent guidance: `AGENTS.md`.
Global session summaries: `../AGENTS.md`.

### Local Development Setup

1. Start the API locally:
```bash
cd ../cryptofeecalc-api
npm run dev
```

2. Start the frontend:
```bash
npm run dev
```

3. Open `http://localhost:3000`

## Features

### Fee Estimator
- Calculate TRX transfer fees on TRON network
- Real-time bandwidth and fee estimation
- Support for multi-signature transactions (1-10 signatures)
- Display breakdown: total fee, bandwidth used, burned sun

### Donation Support
- USDT (TRC-20) donation address
- QR code for easy scanning
- Copy address to clipboard

### SEO
- Server-side rendering (SSR)
- Meta tags configuration
- Automatic robots.txt generation based on branch
- Sitemap included

## Project Structure

```
CryptoFeeCalc.com/
├── pages/
│   └── index.vue          # Main page with fee calculator
├── types/
│   └── api.ts             # Shared types (synced from API)
├── public/
│   ├── logo.svg           # Logo assets
│   ├── logo.png
│   ├── logo-icon.svg
│   ├── logo-icon.png
│   ├── qr-code-walet.jpeg # Donation QR code
│   ├── robots.txt         # Auto-generated
│   └── sitemap.xml
├── scripts/
│   └── generate-robots.js # Robots.txt generator
├── nuxt.config.ts         # Nuxt configuration
├── tsconfig.json          # TypeScript configuration
├── .env                   # Local environment (not committed)
├── .env.example           # Environment template
├── .gitignore
├── package.json
└── README.md
```

## Type Definitions

Types are shared with the API via `types/api.ts` (automatically synced from API on each commit):

The sync runs in the API repo via `scripts/sync-types.sh` (husky pre-commit).
To sync manually:
```bash
cd ../cryptofeecalc-api
npm run sync-types
```

```typescript
interface EstimateResponse {
  chain: 'tron'
  asset: 'TRX'
  amount: string
  amountSun: string
  from: string
  to: string
  bandwidth: BandwidthInfo
  createAccountFeeSun: string
  totalFeeSun: string
  totalFeeTrx: number
}

interface BandwidthInfo {
  available: string
  usedBytes: string
  priceSunPerByte: string
  burnSun: string
}
```

## Deployment

### Cloudflare Pages

The project is configured for Cloudflare Pages deployment.

**Build settings:**
- Build command: `npm run build`
- Build output directory: `.output/public`
- Root directory: `/` (or `CryptoFeeCalc.com` if in monorepo)

**Environment variables (Cloudflare Dashboard):**
- Production: `NUXT_PUBLIC_API_BASE=https://api.cryptofeecalc.com`
- Preview: `NUXT_PUBLIC_API_BASE=https://cryptofeecalc-api-dev.workers.dev`

### Robots.txt Generation

The `scripts/generate-robots.js` automatically generates `robots.txt`:
- **Production** (`main`/`master` branch): `Allow: /`
- **Other branches**: `Disallow: /`

Supported CI/CD environments:
- Cloudflare Pages (`CF_PAGES_BRANCH`)
- GitHub Actions (`GITHUB_REF_NAME`)
- Vercel (`VERCEL_GIT_COMMIT_REF`)

## Configuration

### Nuxt Config (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-12-21',
  ssr: true,
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.cryptofeecalc.com'
    }
  }
})
```

### TypeScript Config (`tsconfig.json`)

```json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "types": ["@types/node"]
  }
}
```

## API Integration

The frontend communicates with the CryptoFeeCalc API:

- **Production**: `https://api.cryptofeecalc.com`
- **Development**: `http://localhost:8787`

### API Endpoint Used

```typescript
POST /api/estimate
{
  "chain": "tron",
  "asset": "TRX",
  "amount": "100",
  "from": "T...",
  "to": "T...",
  "signatureCount": 1
}
```

## Git Workflow

1. **Development**: Work on `dev` branch
2. **Local testing**: Use `.env` with `http://localhost:8787`
3. **Commit**: Changes are committed to `dev`
4. **Deploy to production**: Merge `dev` → `main`
5. **Cloudflare Pages**: Auto-deploys on push to `main`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- Clipboard API with fallback for older browsers

## Related Projects

- [CryptoFeeCalc API](../cryptofeecalc-api) - Backend API (Cloudflare Workers)

## License

Private
