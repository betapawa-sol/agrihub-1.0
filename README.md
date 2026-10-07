# Betapawa AgriPower™ — Productive-Use Solar Infrastructure

**Powering Food. Powering Income. Powering Resilience.**

Production landing page, interactive hub explorer, unit-economics sandbox, and impact measurement framework for **Betapawa AgriPower™**, developed by **Betapawa Solutions Limited**.

---

## Deploying to GitHub & GitHub Pages

This project is pre-configured with an automated GitHub Actions deployment workflow (`.github/workflows/deploy.yml`) and relative asset bundling (`npm run build:gh-pages`) so all images, interactive calculators, and styles work out-of-the-box on GitHub Pages, Vercel, or Netlify.

### Step 1: Export / Push from Google AI Studio to GitHub
1. In the **Google AI Studio** top toolbar, click the **GitHub icon ("Save to GitHub")** or **Download ZIP**.
2. Authenticate with your GitHub account and choose a repository name (e.g. `betapawa-agripower`) and branch (`main`).
   - *Alternatively, if pushing via Git CLI locally:*
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Betapawa AgriPower platform"
     git branch -M main
     git remote add origin https://github.com/<your-username>/betapawa-agripower.git
     git push -u origin main
     ```

### Step 2: Enable GitHub Pages (Automatic Deployment)
1. Open your repository on GitHub.
2. Go to **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) will automatically run on push to `main`, build the `./dist` bundle with bundled images, and publish your live site at:
   `https://<your-username>.github.io/<repository-name>/`

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server on http://localhost:3000
npm run dev

# 3. Type-check and lint
npm run lint

# 4. Build production bundle
npm run build
```

---

## Project Architecture & Configuration Layer

- **`src/config/agripowerConfig.ts`**: Centralised configuration for company traction metrics, sourced problem citations, prototype hotspot specifications, 5 revenue streams, default unit-economics assumptions, impact metrics & GHG emission factors (`2.68 kg CO₂e/L` IPCC off-grid diesel baseline), FAQs, and the Betapawa Information Readiness Checklist.
- **`src/config/agripowerConfig.test.ts`**: Automated verification suite for the unit-economics and cash-flow calculations.
- **`src/components/`**: Modular React components covering Sections A through O.
