# netprofile.net

Private website for netprofile.net: speedtest widget, documentation, and blog.

Built with Next.js (App Router) + Tailwind CSS + `@netprofile/qoe-js`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Local qoe-js development

To iterate on unreleased qoe-js changes:

```bash
# In package.json, change:
"@netprofile/qoe-js": "^1.0.0"
# to:
"@netprofile/qoe-js": "file:../qoe-js"

npm install
```

## Deployment

Deployed via Vercel. Push to `main` triggers a production deployment.
