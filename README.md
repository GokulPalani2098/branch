# EuroBranch — Your Gateway to Europe

A professional multi-page website for the Europe Branch Setup & Representation service. Built with **Next.js 14**, **React 18**, and **Lucide React** icons.

## 📁 Project Structure

```
eurobranch-react/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── globals.css         # Global styles & design tokens
│   ├── page.js             # Home page
│   ├── HomeClient.js       # Home page component
│   ├── about/
│   │   ├── page.js
│   │   └── AboutClient.js
│   ├── how-it-works/
│   │   ├── page.js
│   │   └── HowItWorksClient.js
│   ├── pricing/
│   │   ├── page.js
│   │   └── PricingClient.js
│   ├── contact/
│   │   ├── page.js
│   │   └── ContactClient.js
│   └── blog/
│       ├── page.js
│       └── BlogClient.js
├── components/
│   ├── Nav.js              # Shared navigation
│   ├── Footer.js           # Shared footer
│   └── Reveal.js           # Scroll animation component
├── next.config.js
├── package.json
└── README.md
```

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
```

## 🌐 Deploy to Vercel (Recommended)

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → Select your repo
4. Vercel auto-detects Next.js — click Deploy
5. Your site is live in ~60 seconds

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, services, comparison table, pricing, contact form |
| `/about` | About Us | Story, mission/vision, Why Netherlands, team |
| `/how-it-works` | How It Works | 4-step process, what's included, FAQ |
| `/pricing` | Pricing | Plans, cost comparison, ROI calculator, FAQ |
| `/contact` | Contact | Multi-step form, office info, business hours |
| `/blog` | Blog & Resources | Articles with filtering, guides, external links, newsletter |

## 🎨 Design System

- **Fonts:** DM Serif Display (headings) + DM Sans (body)
- **Colors:** Navy (#1E2761), Red (#B91C1C), Green (#166534)
- **Style:** Clean, corporate, trust-focused
- **Animations:** Scroll-triggered reveal animations
- **Responsive:** Full mobile support with hamburger menu

## ✏️ Customization

- Replace "EuroBranch" with your real company name in `Nav.js` and `Footer.js`
- Update contact details (email, phone) across all pages
- Add real team member names and photos in the About page
- Connect the contact form to your backend/email service
- Add real blog content as you publish articles

## 📦 Tech Stack

- **Next.js 14** — React framework with file-based routing
- **React 18** — UI library
- **Lucide React** — Icon library
- **Google Fonts** — DM Serif Display + DM Sans
