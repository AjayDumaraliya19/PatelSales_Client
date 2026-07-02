# Patel Sales — Netlify Hosting Guide

Is guide se aap project ko Netlify par host kar sakte ho taaki **local jaisa hi** mobile PWA client ko dikhe.

Live URL: `https://peppy-gelato-08d6ff.netlify.app`

---

## Pehle yeh check karo (local)

Project folder (`client`) mein terminal kholo:

```bash
npm install
npm run build
npm run preview
```

Browser mein `http://localhost:4173` kholo — agar yahan sab theek dikhe, Netlify par bhi theek chalega.

---

## Netlify Settings (Important)

Repository root = **`client`** folder (jahan `package.json` hai).

| Setting | Value |
|---------|--------|
| **Base directory** | *(khali chhodo — repo root hi client folder hai)* |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Node version** | `20` (`.nvmrc` file se auto) |

> **Galat setup:** Publish = `.` ya `src` → site blank / 404 aayega.  
> **Sahi setup:** Publish = `dist` (build output folder)

`netlify.toml` file project mein already hai — Netlify yeh settings automatically use karega.

---

## Method 1: GitHub se Deploy (Recommended)

### Step 1 — GitHub par code push karo

```bash
git add .
git commit -m "Add Netlify deployment config"
git push origin main
```

### Step 2 — Netlify account

1. [https://app.netlify.com](https://app.netlify.com) par login karo
2. **Add new site** → **Import an existing project**
3. **GitHub** connect karo → apna repository select karo

### Step 3 — Build settings verify karo

Netlify auto-detect karega `netlify.toml` se:

- Build command: `npm run build`
- Publish: `dist`

**Deploy site** click karo.

### Step 4 — Deploy complete

- **Deploys** tab → green **Published** dikhe
- Site URL milega: `https://random-name.netlify.app`
- **Site settings → Domain management** se custom name set kar sakte ho

### Step 5 — Redeploy (code update ke baad)

Har `git push` par Netlify automatically naya build karega.

---

## Method 2: Netlify CLI se Deploy

```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

Pehli baar site link karna padega — CLI guide dega.

---

## Method 3: Manual Drag & Drop

1. Local: `npm run build`
2. `dist` folder banega
3. [https://app.netlify.com/drop](https://app.netlify.com/drop) par `dist` folder drag karo

> Manual method mein har update par dubara upload karna padega. GitHub method better hai.

---

## Client ko mobile par kaise dikhayen

### Link bhejo

```
https://peppy-gelato-08d6ff.netlify.app
```

**Note:** `localhost` client ke phone par kaam nahi karega — sirf live HTTPS link.

### Android (Chrome)

1. Link phone ke Chrome mein kholo
2. Top par **Install app** banner aayega, ya
3. Menu (⋮) → **Install app** / **Add to Home screen**
4. Home screen icon se open karo → native app jaisa feel

### iPhone (Safari)

1. **Safari** mein link kholo (Chrome se install limited hai)
2. Share button → **Add to Home Screen**
3. Home screen se open karo

### Get the App page

Client yeh page bhi khol sakta hai:

```
https://peppy-gelato-08d6ff.netlify.app/get-the-app
```

Is page par platform-wise install steps dikhte hain (iPhone Safari, Android Chrome, Desktop). Site par **Get App** button / banner bhi hai — agar browser install allow kare to direct install, warna step-by-step guide.

### Install nahi ho raha?

1. **HTTPS** zaroori hai — Netlify par automatic hai
2. **Android:** Chrome browser use karo (not in-app browser like Facebook/WhatsApp)
3. **iPhone:** Safari mein kholo → Share → Add to Home Screen
4. **Icons missing:** `npm run build` se icons generate hote hain — deploy se pehle build zaroor chalao
5. **Cache clear:** Purana service worker ho to browser cache clear karke dubara try karo

---

## PWA features (project mein already hai)

- Install to home screen
- Standalone mode (browser bar hide)
- Offline caching (basic)
- Bottom mobile navigation
- App icons & manifest

**HTTPS required** — Netlify automatically HTTPS deta hai.

---

## Troubleshooting

### Site blank / white page

1. Netlify → **Deploys** → build **Failed** to nahi?
2. **Publish directory** = `dist` verify karo
3. Build log mein error dekho

### Routes 404 (`/products`, `/register`)

- `netlify.toml` SPA redirects handle karta hai
- **Clear cache and deploy** karo: Deploys → Trigger deploy

### Build fail — `sharp` error

- Node 20 use ho raha ho (`.nvmrc`)
- Netlify → Site settings → Environment → `NODE_VERSION` = `20`

### Local jaisa nahi dikh raha

1. Hard refresh: `Ctrl + Shift + R`
2. Phone par incognito / private window try karo
3. Purana service worker: browser cache clear karo

### Install button nahi aa raha

- HTTPS link honi chahiye (Netlify par automatic)
- iPhone: manually **Add to Home Screen** karo
- Pehle site 2-3 baar visit karo (Chrome install criteria)

---

## Checklist — Client ko link bhejne se pehle

- [ ] `npm run build` local pass
- [ ] Netlify deploy **Published** (green)
- [ ] Homepage mobile par sahi
- [ ] `/products`, `/cart`, `/register`, `/contact` routes kaam karein
- [ ] Mobile menu dropdowns kaam karein
- [ ] Add to Home Screen test kiya

---

## Files added for Netlify

| File | Purpose |
|------|---------|
| `netlify.toml` | Build command, publish dir, SPA redirects, headers |
| `.nvmrc` | Node 20 for consistent builds |
| `NETLIFY_DEPLOY.md` | Yeh guide |

---

## Custom domain (optional)

Netlify → **Site settings → Domain management → Add custom domain**

Example: `shop.patelsales.com`

DNS mein Netlify ke records add karo — Netlify wizard step-by-step batayega.

---

## Support

Deploy fail ho to Netlify **Deploy log** ka screenshot share karo — exact error fix kar sakte ho.
