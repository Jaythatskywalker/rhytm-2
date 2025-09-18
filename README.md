# RHYTM Landing Page

AI-powered music curation platform for DJs - Landing page built with Next.js 15.5.3

## 🎯 Overview

This is the official landing page for RHYTM, an AI-powered music curation platform designed for aspiring and veteran DJs. The page is built to convert visitors into beta testers with a compelling design and clear value proposition.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15.5.3, React 19, TypeScript, Tailwind CSS
- **Professional Design**: Glass morphism, gradient text, smooth animations
- **Theme System**: Complete dark/light theme support
- **Interactive Effects**: Mouse parallax, crackle animations, hover states
- **Responsive**: Mobile-first design with optimized layouts
- **Performance**: Optimized images and bundle size
- **SEO Ready**: Complete metadata and OpenGraph support

## 🎨 Design Guidelines

- **NO EMOJI ICONS**: Only abstract vector SVG icons with `stroke="currentColor"`
- **Brand Colors**: Purple-Pink-Teal gradient (#9D4EDD, #EC4899, #14B8A6)
- **Accent Colors**: Emerald-400 (dark) / Emerald-600 (light)
- **Glass Morphism**: Cards with `bg-white/5` and backdrop blur
- **Professional Aesthetic**: Minimalist, clean, modern

## 🏗️ Page Structure

1. **Header**: Sticky backdrop-blur header with logo, navigation, theme toggle
2. **Hero (80vh)**: Gradient headline, CTAs, feature bullets, headphones image
3. **Pain Point**: Problem/solution grid with data tiles
4. **How It Works**: Vertical step cards with custom DJ turntable icon
5. **Features**: 6-card grid with glass morphism and hover effects
6. **Testimonials**: DJ portraits with quotes and testimonials
7. **Waitlist (80vh)**: Beta badge, benefits grid, email form with trust indicators
8. **Footer**: Copyright, navigation links, background effects

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Server

The development server runs on [http://localhost:3000](http://localhost:3000)

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
rhytm-2/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Main page component
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── LandingPage.tsx # Main landing component
│   └── types/
│       └── index.ts        # TypeScript definitions
├── public/                 # Static assets
├── .cursorrules           # Design consistency rules
└── package.json           # Dependencies
```

## 🎪 Interactive Features

- **Hero Parallax**: Mouse movement creates background offset
- **Crackle Effects**: Expanding circles on hero click
- **Floating Musical Notes**: 8 animated symbols with staggered bounce
- **Theme Toggle**: Complete dark/light theme system
- **Form Validation**: Email validation with success states
- **Smooth Scrolling**: Navigation links with smooth scroll behavior

## 🔧 Technical Details

- **Framework**: Next.js 15.5.3 with App Router
- **Styling**: Tailwind CSS 3.4.17 with custom animations
- **Icons**: Abstract SVG icons (no emoji or colorful icons)
- **Images**: Next.js Image component for optimization
- **Fonts**: Inter from Google Fonts
- **Performance**: <20kB page size target

## 🎯 Conversion Optimization

### Primary Goal: Beta Signups

- **Multiple CTAs**: Header, hero, how-it-works, waitlist sections
- **Value Stacking**: Early access + 50% discount + product influence
- **Urgency**: Limited 500 spots messaging
- **Social Proof**: DJ testimonials + signup counters
- **Trust Signals**: Security assurance + no spam promise

## 📱 Responsive Breakpoints

- **Mobile**: Base styles (single column)
- **Tablet**: md: prefix (768px+, 2-column grids)
- **Desktop**: lg: prefix (1024px+, full layouts)
- **Wide**: xl: prefix (1280px+, optimized spacing)

## 🎨 Brand Assets

- Logo: `/rhytm-logo-dark.png` & `/rhytm-logo-light.png`
- Hero Image: `/hero-headphones.png` (553x553px)
- DJ Portraits: `/dj-portrait-1.jpg`, `/dj-portrait-2.jpg`, `/dj-portrait-3.jpg`
- Favicons: Multiple sizes in `/public/`

## 🚀 Deployment

The project is optimized for Vercel deployment:

```bash
# Build and deploy
npm run build
```

## 📄 License

© 2025 RHYTM - A brand owned by Sky Walker Enterprise

---

**Built with ❤️ for the DJ community**
