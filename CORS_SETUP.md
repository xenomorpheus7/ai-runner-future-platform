# CORS Fix Setup Guide

This guide explains how to set up the local proxy server to fix CORS issues with the Hugging Face API.

## Quick Start

### Option 1: Run Both Servers (Recommended)

1. **Terminal 1 - Start the proxy server:**
   ```bash
   npm run dev:proxy
   ```
   This starts the proxy server on `http://localhost:8787`

2. **Terminal 2 - Start the Vite dev server:**
   ```bash
   npm run dev
   ```
   This starts the frontend on `http://localhost:8080`

### Option 2: Use Concurrently (Optional)

If you have `concurrently` installed, you can run both servers at once:
```bash
npm install -D concurrently
npm run dev:all
```

## How It Works

1. **Frontend** (`src/components/AITestingSpace.tsx`) makes requests to `/api/hf/generate-image`
2. **Vite Proxy** (`vite.config.ts`) forwards `/api/hf/*` to `http://localhost:8787`
3. **Proxy Server** (`proxy-server.js`) handles CORS and forwards to Hugging Face API
4. **Hugging Face API** returns the generated image

## Environment Variables

Make sure you have your Hugging Face token set:

```bash
# In your .env file
VITE_HF_TOKEN=your_token_here

# Or as environment variable
export VITE_HF_TOKEN=your_token_here
```

The proxy server will use `VITE_HF_TOKEN` or `HF_TOKEN` from your environment.

## Cloudflare Pages Functions (Production)

For production deployment, the `functions/generate-image.ts` file will be automatically used by Cloudflare Pages. Make sure to set the `HF_TOKEN` environment variable in your Cloudflare Pages settings.

## Troubleshooting

- **CORS errors still appearing?** Make sure the proxy server is running on port 8787
- **Token errors?** Check that `VITE_HF_TOKEN` is set in your `.env` file
- **Connection refused?** Ensure both servers are running (proxy on 8787, vite on 8080)

