# SolanaForensics.com

Astro static site for solanaforensics.com. Powered by Clavestra Intel.

## Stack
- **Framework**: Astro 4
- **CMS**: Decap CMS (git-based, free)
- **Hosting**: Netlify (free tier)
- **Domain**: solanaforensics.com (GoDaddy)

## Pages
- `/` — Homepage (hero, features preview, use cases, CTA)
- `/features` — Full feature breakdown
- `/use-cases` — LE, compliance, fraud, legal verticals
- `/blog` — Intelligence reports (Decap CMS managed)
- `/about` — About / Clavestra Intel
- `/contact` — Access request form (Netlify Forms)
- `/privacy-policy` — Privacy policy
- `/terms` — Terms of service
- `/disclaimer` — Forensic disclaimer

## Deploy to Netlify

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/solanaforensics
git push -u origin main
```

### 2. Connect to Netlify
1. Go to netlify.com → Add new site → Import from Git
2. Select your GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### 3. Add Custom Domain
1. Netlify → Site settings → Domain management → Add custom domain
2. Enter `solanaforensics.com`
3. Update GoDaddy DNS:
   - A record: `@` → `75.2.60.5`
   - CNAME: `www` → `your-site.netlify.app`

### 4. Enable Decap CMS
1. Netlify → Site settings → Identity → Enable
2. Identity → Registration → Invite only
3. Identity → Services → Enable Git Gateway
4. Invite yourself at: `https://solanaforensics.com/admin`

### 5. Enable Netlify Forms
The contact form uses `data-netlify="true"` — Netlify detects this automatically on first deploy.
Check: Netlify dashboard → Forms.

## Local Development
```bash
npm install
npm run dev
```

## Adding Blog Posts via CMS
Go to `https://solanaforensics.com/admin` → Log in → Reports & Blog Posts → New post.
