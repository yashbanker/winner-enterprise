# 🚀 Deployment Guide — WINNER ENTERPRISE

Complete step-by-step guide to deploy on **MongoDB Atlas + Render/Railway + Vercel** (recommended free-tier stack).

---

## 1️⃣ MongoDB Atlas (Database)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Sign up / log in.
2. **Create a Project** → "Winner Enterprise".
3. **Build a Database** → Choose **M0 Free** (512 MB) → AWS Mumbai region.
4. **Database Access** → Add database user (`winner_admin` / strong password).
5. **Network Access** → Add IP → `0.0.0.0/0` (allow access from anywhere).
6. **Connect** → "Drivers" → Copy connection string:
   ```
   mongodb+srv://winner_admin:<password>@cluster0.xxxxx.mongodb.net/winner_enterprise?retryWrites=true&w=majority
   ```
7. Save it — you'll use this as `MONGO_URI`.

---

## 2️⃣ Cloudinary (Optional but recommended for production images)

1. Sign up at [cloudinary.com](https://cloudinary.com).
2. From **Dashboard**, copy:
   - `Cloud name`
   - `API Key`
   - `API Secret`
3. Save these for the backend `.env` (`CLOUDINARY_*`).

> Without Cloudinary, images are stored locally in `backend/uploads/` — note: free Render/Railway tiers may lose local files on redeploys, so Cloudinary is strongly recommended.

---

## 3️⃣ Backend — Render.com (Recommended)

1. Push your repo to **GitHub**.
2. Go to [render.com](https://render.com) → New → **Web Service**.
3. Connect your GitHub repo → select the `winner-enterprise` repository.
4. Configure:
   - **Name:** `winner-enterprise-api`
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. **Environment Variables** — add all from `.env.example`:
   ```
   NODE_ENV=production
   MONGO_URI=<your Atlas connection string>
   JWT_SECRET=<long random string, e.g. 64 hex chars>
   JWT_EXPIRE=7d
   ADMIN_EMAIL=admin@winnerenterprise.com
   ADMIN_PASSWORD=<strong password>
   ADMIN_NAME=Winner Admin
   CLOUDINARY_CLOUD_NAME=<from cloudinary>
   CLOUDINARY_API_KEY=<from cloudinary>
   CLOUDINARY_API_SECRET=<from cloudinary>
   CLIENT_URL=https://winnerenterprise.vercel.app
   ```
6. Click **Create Web Service** → wait for deploy.
7. **Seed the database** once: open the Render Shell tab and run:
   ```bash
   npm run seed
   ```
8. Copy the live URL (e.g. `https://winner-enterprise-api.onrender.com`).

### Alternative: Railway.app
- Same flow: create project → deploy from GitHub → set root to `backend` → add env vars → it auto-detects Node.
- Free tier includes $5 monthly credit.

---

## 4️⃣ Frontend — Vercel.com

1. Sign up at [vercel.com](https://vercel.com) with GitHub.
2. **New Project** → Import the `winner-enterprise` repo.
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment Variables:**
   ```
   VITE_API_URL=https://winner-enterprise-api.onrender.com/api
   ```
5. Click **Deploy**.
6. After deploy, update the backend `CLIENT_URL` env var in Render to the Vercel URL.

---

## 5️⃣ Post-Deployment Checklist

- [ ] Visit your Vercel URL — homepage loads
- [ ] Login at `/admin/login` with your admin credentials
- [ ] Upload a test product image — confirm it loads correctly (Cloudinary URL)
- [ ] Submit a test inquiry from the contact page — confirm it appears in admin
- [ ] Test CSV export from Admin → Inquiries
- [ ] Test WhatsApp floating button
- [ ] Verify mobile responsiveness on a real device
- [ ] Update `index.html` Open Graph image URL and sitemap to your real domain
- [ ] Setup custom domain on Vercel (Settings → Domains → Add)

---

## 6️⃣ Custom Domain

### Vercel
1. Settings → Domains → Add `winnerenterprise.com`.
2. Update your DNS to point CNAME `www` → `cname.vercel-dns.com`.
3. Add A record `@` → `76.76.21.21`.

### Render
1. Settings → Custom Domain → Add `api.winnerenterprise.com`.
2. Add CNAME `api` → your Render hostname.

Update env vars again to use the new domains.

---

## 🆘 Troubleshooting

| Issue | Solution |
|---|---|
| `CORS error` | Set `CLIENT_URL` on backend to exact Vercel URL (no trailing slash) |
| `401 on /uploads` | Cloudinary not configured — images are local. Migrate to Cloudinary or use a persistent disk. |
| MongoDB connection timeout | Atlas Network Access must allow `0.0.0.0/0` |
| Render free tier sleeps | First request after 15 min idle takes ~30s to wake up. Upgrade to paid for always-on. |
| Build fails on Vercel | Ensure root is set to `frontend` and Node version >= 18 |

---

## 🐳 Optional: Docker (single command)

Create `docker-compose.yml` at project root if you want one-command local stack:
```yaml
version: '3.8'
services:
  mongo:
    image: mongo:7
    ports: ['27017:27017']
    volumes: ['mongo-data:/data/db']
  api:
    build: ./backend
    ports: ['5000:5000']
    environment:
      MONGO_URI: mongodb://mongo:27017/winner_enterprise
      JWT_SECRET: change_me
      CLIENT_URL: http://localhost:5173
    depends_on: [mongo]
  web:
    build: ./frontend
    ports: ['5173:5173']
volumes:
  mongo-data:
```

(Add corresponding `Dockerfile` in each service.)

---

🎉 **You're live!** Visit your Vercel URL and start managing products at `/admin`.
