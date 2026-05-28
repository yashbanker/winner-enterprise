# ✨ WINNER ENTERPRISE — Premium Glass Beads Supplier

A **premium, full-stack B2B website** built with the MERN stack featuring a luxury White + Royal Gold + Navy Blue theme, glassmorphism, framer-motion animations, and a complete admin panel.

> Shop No. 2, Plot No. 8, Vedant Ind., V-15, Kosad Ring Road, Surat – 394107  
> **Hiren Jiyani** · +91 97120 83440 · **Vijay Virani** · +91 97123 59124

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 · Vite · Tailwind CSS · Framer Motion · React Router · Lucide Icons · React Hot Toast |
| Backend | Node.js · Express 4 · ES Modules |
| Database | MongoDB (Mongoose 8) |
| Auth | JWT · bcrypt |
| Uploads | Multer (local) · Cloudinary (optional) |
| Email | Nodemailer (optional) |

---

## 📁 Project Structure

```
winner-enterprise/
├── backend/
│   ├── src/
│   │   ├── config/        # db, cloudinary
│   │   ├── controllers/   # business logic
│   │   ├── middleware/    # auth, upload, errors
│   │   ├── models/        # mongoose schemas
│   │   ├── routes/        # express routers
│   │   ├── utils/         # seed, helpers
│   │   └── server.js
│   ├── uploads/           # local image storage (gitignored)
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/assets/     # logo, hero, product images
    ├── src/
    │   ├── components/    # Navbar, Footer, ProductCard, InquiryModal...
    │   ├── pages/         # Home, About, Products, Gallery, Contact...
    │   │   └── admin/     # Dashboard, Products, Categories, Inquiries...
    │   ├── context/       # AuthContext (JWT)
    │   ├── utils/         # api client, constants
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ Quick Start (Local Development)

### Prerequisites
- **Node.js 18+**
- **MongoDB** (local installation OR free MongoDB Atlas cluster)

### 1. Backend setup
```bash
cd backend
cp .env.example .env
# Edit .env — set MONGO_URI, JWT_SECRET, ADMIN_PASSWORD
npm install
npm run seed         # creates admin user + categories + sample products + banner
npm run dev          # starts on http://localhost:5000
```

### 2. Frontend setup
```bash
cd ../frontend
cp .env.example .env       # optional
npm install
npm run dev                # starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser. 🎉

### 3. Admin Login
Use the credentials from your backend `.env`:
- **URL:** http://localhost:5173/admin/login
- **Default Email:** `admin@winnerenterprise.com`
- **Default Password:** `Winner@2026` (change immediately after first login)

---

## 🎨 Features Overview

### 🌐 Public Website
- **Premium Homepage** — Full-screen hero with animated industrial background, golden wave curves, floating particles, animated counter stats, parallax effects
- **Sticky Navbar** — Transparent on home, solid white on scroll, mobile drawer menu
- **About Page** — Mission/Vision/Values cards, stats grid, glassmorphism
- **Products Page** — Live filter (search/category/color/availability), category pills, responsive grid with hover glow & zoom
- **Product Detail** — Image gallery, full specs, inquiry modal, related products
- **Industries Page** — 5 sector cards (Road Marking, Decorative, Industrial, Reflective, Construction)
- **Gallery** — Masonry layout, category tabs, lightbox preview with prev/next
- **Catalogue Page** — Print-ready PDF generation via browser print
- **Contact Page** — Google Maps embed, info cards, inquiry form, WhatsApp CTA
- **Floating WhatsApp** — Animated pulse button on every page
- **SEO** — Helmet meta tags, Open Graph, sitemap.xml, robots.txt

### 🛡️ Admin Panel (`/admin`)
- **Dashboard** — Key stats, recent inquiries, featured products
- **Products CRUD** — Multi-image upload, set primary image, featured toggle, availability status
- **Categories** — Create / edit / delete with safety check (cannot delete with products)
- **Inquiries** — Status workflow (new → in_progress → contacted → closed), CSV export, detail view
- **Gallery** — Upload, categorize (products/warehouse/packaging/team)
- **Banners** — Manage hero banner content
- **JWT auth** — Secure, 7-day token, automatic logout on 401

### 🎨 Design System
- **Colors:** Navy `#0a1a3d` · Royal Gold `#c9a227` · White
- **Fonts:** Playfair Display (display) + Inter (body)
- **Effects:** Glassmorphism, gold gradient borders, smooth scroll, fade-up animations, golden wave decorations
- **Responsive:** Mobile → Tablet → Desktop → Large screens

---

## 🔐 Environment Variables

### Backend `.env`
| Key | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string for token signing |
| `JWT_EXPIRE` | Token validity (default `7d`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Seed admin credentials |
| `CLOUDINARY_*` | (Optional) Cloud image hosting — falls back to local `/uploads` if blank |
| `CLIENT_URL` | Frontend origin for CORS |
| `SMTP_*` / `MAIL_TO` | (Optional) Email notifications for new inquiries |

### Frontend `.env`
| Key | Description |
|---|---|
| `VITE_API_URL` | Backend API URL (e.g. `https://api.winnerenterprise.com/api`) |

---

## ☁️ Production Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full step-by-step guides on:
- 🌐 **Vercel** (frontend)
- 🛤️ **Render / Railway** (backend)
- 🍃 **MongoDB Atlas** (database)
- ☁️ **Cloudinary** (image hosting)

---

## 📜 API Reference (selected)

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/login` | – | Admin login |
| `GET`  | `/api/auth/me` | ✅ | Get logged-in user |
| `GET`  | `/api/products` | – | List products (filters: `search,category,color,availability,featured,page,limit`) |
| `GET`  | `/api/products/featured` | – | Featured products |
| `GET`  | `/api/products/:id` | – | Product by id or slug |
| `POST` | `/api/products` | 🔒 | Create product |
| `PUT`  | `/api/products/:id` | 🔒 | Update product |
| `DELETE` | `/api/products/:id` | 🔒 | Delete product |
| `GET`  | `/api/categories` | – | All categories with product counts |
| `POST` | `/api/inquiries` | – | Submit inquiry |
| `GET`  | `/api/inquiries/export` | 🔒 | Download CSV |
| `POST` | `/api/upload/single` | 🔒 | Upload one image |
| `POST` | `/api/upload/multiple` | 🔒 | Upload many images |

---

## 🛠️ NPM Scripts

**Backend**
- `npm run dev` — start with nodemon (auto-reload)
- `npm start` — production mode
- `npm run seed` — create admin, categories, sample products, gallery & banner

**Frontend**
- `npm run dev` — Vite dev server
- `npm run build` — build to `dist/`
- `npm run preview` — preview production build

---

## 💎 Credits
Designed & built for **WINNER ENTERPRISE — Premium Glass Beads Supplier · Surat, India**.

© 2026 WINNER ENTERPRISE. All rights reserved.
