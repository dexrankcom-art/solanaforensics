# SolanaForensics — Cursor Build Plan
**solanaforensics.com | Powered by Clavestra Intel**

> This document is the complete specification for Cursor to build and deploy the SolanaForensics website. The ZIP file `solanaforensics-site.zip` contains the reference Astro project — use it as a structural and design starting point.

---

## Project Summary

SolanaForensics is a **Telegram-based on-chain intelligence bot** for Solana investigations. The website is a marketing and information site for the bot — it explains what the bot does, who it's for, and how to get access.

**Core product:** A Telegram bot users chat with to investigate Solana wallets, tokens, and custodial platforms — powered by Clavestra Intel's forensic infrastructure (Helius, Arkham, Solscan Pro, CoinGecko).

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Astro 4** | Static, fast, SEO-perfect, easy CMS integration |
| CMS | **Decap CMS** | Free, git-based, no API needed, Netlify-integrated |
| Hosting | **Netlify** (free tier) | Auto-deploy from GitHub, Netlify Forms, Identity |
| Domain | **solanaforensics.com** | Already owned (GoDaddy) |
| Forms | **Netlify Forms** | Built-in, no backend needed |
| Fonts | Google Fonts: **Share Tech Mono** + **Syne** | Dark techy aesthetic |

---

## Repository Structure

```
solanaforensics/
├── public/
│   ├── favicon.svg
│   ├── og-image.png               ← create a 1200x630 OG image
│   └── admin/
│       ├── index.html             ← Decap CMS entry point
│       └── config.yml             ← Decap CMS configuration
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro       ← Head, Nav, Footer wrapper
│   │   └── BlogLayout.astro       ← Report/post layout with sidebar
│   ├── components/
│   │   ├── Nav.astro
│   │   └── Footer.astro
│   ├── styles/
│   │   └── global.css             ← CSS variables, base styles, utilities
│   └── pages/
│       ├── index.astro            ← Homepage
│       ├── features.astro         ← What the bot can do (5 modules)
│       ├── use-cases.astro        ← LE, compliance, fraud, legal
│       ├── about.astro            ← About + Clavestra Intel
│       ├── contact.astro          ← Access request form
│       ├── privacy-policy.astro
│       ├── terms.astro
│       ├── disclaimer.astro
│       └── blog/
│           ├── index.astro        ← Reports listing
│           └── *.md               ← Individual reports (CMS-managed)
├── astro.config.mjs
├── package.json
└── netlify.toml
```

---

## Design System

**Aesthetic:** Dark techy / cybersecurity. NOT generic. Distinctive, serious, institutional.

### CSS Variables (in `global.css`)
```css
:root {
  --bg: #050810;
  --bg-2: #080d1a;
  --bg-card: #0a1020;
  --border: #1a2540;
  --border-glow: #1e3a6e;
  --accent: #00d4ff;
  --accent-2: #0066ff;
  --accent-dim: rgba(0, 212, 255, 0.12);
  --text: #e8eaf0;
  --text-muted: #6b7a99;
  --text-dim: #3a4560;
  --danger: #ff3366;
  --success: #00ff88;
  --mono: 'Share Tech Mono', monospace;
  --sans: 'Syne', sans-serif;
}
```

### Key Design Elements
- **Scanline overlay** on body (subtle CRT effect via `repeating-linear-gradient`)
- **Grid background** pattern on hero sections (`background-image` with `linear-gradient`)
- **Terminal UI component** on homepage — animated, shows a fake forensic trace in real-time
- **Left accent border** on cards (3px `--accent` bar animates in on hover)
- **Monospace tags** for labels: `// Section Name`
- **Blinking cursor** `█` in terminal, CSS `animation: blink 1s step-end infinite`
- **Glow effects** on primary CTAs and hero headings

---

## Pages — Detailed Specifications

### 1. Homepage (`/`)

**Hero Section**
- Full viewport height
- Left column: tag label, H1 ("Track. Trace. Expose."), subheading explaining it's a Telegram bot for Solana forensics, two CTAs ("Start on Telegram →" linking to Telegram bot, "See Features")
- Right column: **animated terminal** showing a live wallet investigation sequence
- Terminal animation: types out commands with cursor blink, reveals results progressively using JS `setTimeout`
- Three stats below hero: "500M+ Transactions Indexed", "Real-time Monitoring", "LE-Ready Reports"
- Background: `grid-bg` class with radial glow from center

**How It Works Section** (new — key for a Telegram bot)
- 3-step visual: `01 Start a chat` → `02 Ask your question` → `03 Get forensic intelligence`
- Show example Telegram-style message bubbles — user asks "Check wallet 9xTz...mK4p" and bot responds with structured intelligence output
- This makes the product immediately understandable

**Features Preview**
- 6 cards in 3×2 grid (the 5 modules + cross-chain)
- Each card: icon, title, 2-line description, "Explore →" link
- Grid uses `1.5px` gap with `var(--border)` background (creates thin line effect between cards)

**Use Cases Preview**
- 4 cards: Law Enforcement, Compliance & AML, Fraud Investigation, Legal & Asset Recovery

**CTA Section**
- Centered, radial glow background
- "Start investigating on Telegram." headline
- Link to Telegram bot

---

### 2. Features Page (`/features`)

Detail each of the 5 bot modules. Each module gets:
- Number label (`// 01`)
- Module name as H2
- 2-paragraph description of what the bot does
- Bullet list of specific capabilities
- (Where relevant) a terminal/code block showing an example bot output

**The 5 modules:**

#### 01 — Wallet Investigation
- Ecosystem mapping (hot wallets, staging, intermediaries, CEX endpoints)
- Entity resolution via Arkham, Solscan, Helius
- Depositor outcome analysis
- Multi-hop fund flow tracing

**Example bot output block:**
```
WALLET REPORT: 9xTz...mK4p
━━━━━━━━━━━━━━━━━━━━━━━━
Risk Score:     94/100 [CRITICAL]
Entity:         Unknown — flagged cluster
Funding Source: Binance withdrawal (3 hops)
CEX Endpoints:  Kraken deposit (2 confirmed)
Depositors:     847 wallets identified
Outcome:        94% losses > 80%
━━━━━━━━━━━━━━━━━━━━━━━━
Recommended: Freeze request — Kraken EU
```

#### 02 — Token Tracing
- SPL token flow analysis (USDC, USDT, any SPL token)
- Token mint/burn activity tracking
- Cross-token movement (SOL → stables → CEX)
- Wash trading & circular flow detection

#### 03 — Custodial Platform Audits
- 6-point fraud checklist: yield math, depositor outcomes, insider extraction, solvency, CEX cashouts, predecessor ops
- DeFi protocol interaction analysis (Orca, Jupiter, Raydium)
- Legitimate activity vs façade separation

#### 04 — CEX Cashout Mapping
- Exchange deposit address identification across 10+ major CEXs (Binance, Kraken, OKX, Bybit, Coinbase, KuCoin, Gate.io, HTX, MEXC, Bitget)
- Evidence packaging for freeze/seizure requests
- Intermediary chain documentation

#### 05 — Law Enforcement Reports
- PDF forensic reports, court-ready
- On-chain evidence citations
- Timeline reconstruction
- Recommended actions (freeze requests, jurisdictions)

---

### 3. Use Cases Page (`/use-cases`)

Two-column layout (label | content) for each vertical. 4 verticals, each with 3 scenario cards.

**Law Enforcement** — crypto fraud investigations, investment scam takedowns, money laundering cases
**Compliance & AML** — SAR generation, counterparty risk, travel rule compliance
**Fraud Investigation** — exit scam analysis, DeFi exploit tracing, insider trading detection
**Legal & Asset Recovery** — freezing orders, victim restitution, litigation support

---

### 4. About Page (`/about`)

Two-column layout:
- Left: story text explaining SolanaForensics emerged from real investigative work on Solana fraud cases. The tools were forged in the field — not built speculatively. Reference Clavestra Intel as the operating entity.
- Right sidebar: two cards — "Focus Areas" list and "Integrations" list (Helius, Arkham, Solscan Pro, CoinGecko)

**Principles section** (3-column grid):
1. Evidence First — outputs are documented forensic records, not assessments
2. No Sensationalism — precision and restraint, document what the data shows
3. Investigator-Led — built around real investigative workflows

---

### 5. Contact Page (`/contact`)

**Access request form** with Netlify Forms (`data-netlify="true"`):
- Full Name
- Organisation
- Email
- Professional Role (select: LE Officer, FIU Analyst, Compliance, Licensed Investigator, Legal Counsel, Other)
- Investigation Context (textarea)
- Submit button: "Submit Request →"

Sidebar: verification note, direct contact note, "Powered by Clavestra Intel" card.

**IMPORTANT:** Add `netlify-honeypot="bot-field"` for spam protection. Add hidden `<input name="form-name" value="contact" />`.

---

### 6. Blog / Reports (`/blog`)

Index page lists all `.md` posts from `src/pages/blog/`. Sorted by date descending.

**Frontmatter schema:**
```yaml
---
title: "string"
description: "string"
date: "YYYY-MM-DD"
category: "Analysis | Case Study | Intelligence | Tool Update"
layout: "../../layouts/BlogLayout.astro"
---
```

Include one **seed post**: "Understanding Solana DeFi Obfuscation Techniques" — already written in the reference ZIP.

---

### 7. Legal Pages

- `/privacy-policy` — standard GDPR-adjacent privacy policy
- `/terms` — terms of service, access restricted to verified professionals
- `/disclaimer` — forensic intelligence disclaimer (outputs are investigative, not legal advice)

All use the same single-column `legal-body` layout with `max-width: 760px`.

---

## Decap CMS Configuration

**File:** `public/admin/config.yml`

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "blog"
    label: "Reports & Blog Posts"
    folder: "src/pages/blog"
    create: true
    slug: "{{slug}}"
    extension: "md"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Description", name: "description", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Category", name: "category", widget: "select", options: ["Analysis", "Case Study", "Intelligence", "Tool Update"], required: false }
      - { label: "Layout", name: "layout", widget: "hidden", default: "../../layouts/BlogLayout.astro" }
      - { label: "Body", name: "body", widget: "markdown" }
```

**File:** `public/admin/index.html`
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex" />
  <title>SolanaForensics CMS</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

---

## Netlify Configuration

**File:** `netlify.toml`
```toml
[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200

[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## Navigation Structure

```
Nav links (left to right):
Logo | Home | Features | Use Cases | Reports | About | Contact | [Request Access CTA]
```

Footer columns:
```
Brand (logo + tagline + "Powered by Clavestra Intel") | Platform | Company | Legal
```

Footer legal links: Privacy Policy, Terms of Service, Disclaimer

---

## Terminal Animation (Homepage)

Implement as a JavaScript-driven animation in the hero section. Use `setTimeout` chains to simulate typing:

```javascript
const lines = [
  { text: '$ trace --wallet 9xTz...mK4p', delay: 0, class: 'cmd' },
  { text: 'Initializing trace engine...', delay: 600, class: 'dim' },
  { text: '✓ Connected to Helius RPC', delay: 1200, class: 'ok' },
  { text: '✓ Loaded 1,247 transactions', delay: 1800, class: 'ok' },
  { text: '✓ Cross-referencing Arkham clusters', delay: 2400, class: 'ok' },
  { text: '', delay: 3000, class: '' },
  { text: '⚠ HIGH RISK wallet detected', delay: 3200, class: 'warn' },
  { text: '— Linked to 3 flagged entities', delay: 3600, class: 'dim' },
  { text: '— $842,000 extracted (6 hops)', delay: 4000, class: 'dim' },
  { text: '— Last active: 2h ago', delay: 4400, class: 'dim' },
  { text: '', delay: 4800, class: '' },
  { text: '$ export --format law_enforcement_pdf', delay: 5000, class: 'cmd' },
  { text: '✓ Report generated → report_001.pdf', delay: 5800, class: 'ok' },
];
```

---

## Telegram Bot CTA

The primary CTA throughout the site should link to the Telegram bot. Use a placeholder link for now:

```
https://t.me/SolanaForensicsBot
```

(Replace with actual bot username once created.)

Hero buttons: "Start on Telegram →" (primary) + "See Features" (outline)
All section CTAs: "Start Investigating →" linking to Telegram

---

## SEO Configuration

**`BaseLayout.astro` head should include:**
- `<title>` — page-specific + " — SolanaForensics"
- `<meta name="description">` — page-specific
- `<link rel="canonical">`
- Open Graph: `og:title`, `og:description`, `og:image` (→ `/og-image.png`), `og:url`, `og:type`
- Twitter card: `twitter:card = summary_large_image`
- `<link rel="sitemap" href="/sitemap-index.xml">` (Astro sitemap integration)

**`astro.config.mjs`:**
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://solanaforensics.com',
  integrations: [mdx(), sitemap()],
});
```

---

## Deployment Instructions (for Cursor to follow after build)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — SolanaForensics site"
gh repo create solanaforensics --public --push
# or manually: git remote add origin https://github.com/USERNAME/solanaforensics && git push -u origin main
```

### Step 2 — Deploy on Netlify
1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
2. Select GitHub → select `solanaforensics` repo
3. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy site**

### Step 3 — Add Custom Domain
1. Netlify → Site settings → **Domain management** → **Add custom domain**
2. Enter `solanaforensics.com`
3. Go to GoDaddy DNS tab for `solanaforensics.com`:
   - **Delete** any existing A record for `@`
   - **Add** A record: `@` → `75.2.60.5`
   - **Add/update** CNAME: `www` → `your-site-name.netlify.app`
4. SSL auto-provisions within ~10 minutes

### Step 4 — Enable Decap CMS
1. Netlify → Site settings → **Identity** → **Enable Identity**
2. Identity → **Registration** → set to **Invite only**
3. Identity → **Services** → **Enable Git Gateway**
4. Go to `https://solanaforensics.com/admin` → accept the invite
5. CMS is live — write reports from `/admin` without touching code

### Step 5 — Enable Netlify Forms
- Happens automatically on first deploy (Netlify detects `data-netlify="true"`)
- Verify: Netlify dashboard → **Forms** → should see `contact` form listed
- Set up email notifications: Forms → contact → **Form notifications**

---

## Package Dependencies

```json
{
  "dependencies": {
    "astro": "^4.5.0",
    "@astrojs/mdx": "^3.0.0",
    "@astrojs/sitemap": "^3.0.0"
  }
}
```

No other dependencies needed. Everything else is CSS and vanilla JS.

---

## Reference Files

The ZIP file `solanaforensics-site.zip` contains a complete working reference implementation. Use it for:
- Design reference (colors, typography, component patterns)
- Code structure reference
- Copy and content starting points

**Key additions in this plan vs the ZIP:**
1. "How It Works" section (3-step Telegram bot explainer with mock chat bubbles)
2. Updated hero CTAs — "Start on Telegram →" instead of "Request Access"
3. Updated copy throughout to reflect **Telegram bot** as the product, not a SaaS platform
4. Example bot output blocks in Features page
5. Telegram bot link as primary CTA sitewide

---

## Content Tone Guidelines

- **Professional and serious** — this serves law enforcement and compliance professionals
- **No hype, no vague promises** — document capabilities precisely
- **Data-driven** — use specific numbers where possible (10+ CEXs, multi-hop tracing, etc.)
- **Monospace aesthetic for technical outputs** — bot outputs, wallet addresses, terminal lines
- Brand voice: terse, technical, authoritative
- "Powered by Clavestra Intel" appears in footer and About page only — not plastered everywhere

---

*End of build specification. All pages, components, styles, and deployment steps are fully defined above. The reference ZIP provides working code to accelerate implementation.*
