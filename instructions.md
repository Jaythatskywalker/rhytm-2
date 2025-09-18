# RHYTM Landing Page - Product Requirements Document (PRD)

## 🎯 Project Overview

**Product Name**: RHYTM  
**Purpose**: AI-powered music curation platform for DJs  
**Landing Page Goal**: Convert visitors into beta testers with compelling design and clear value proposition  
**Target Audience**: Aspiring and veteran DJs looking for better music discovery tools  

---

## 🎨 Design System & Brand Guidelines

### Color Palette
```css
/* Primary Brand Colors */
--brand-gradient: linear-gradient(to right, #9D4EDD, #EC4899, #14B8A6);
--accent-emerald: #10B981 (dark) / #059669 (light);
--background-dark: #0a0a0d;
--background-light: #f0e7d8;
--text-dark: #ffffff;
--text-light: #1a1a17;

/* Supporting Colors */
--purple-400: #9D4EDD;
--pink-500: #EC4899;
--teal-400: #14B8A6;
--emerald-400: #10B981;
--emerald-600: #059669;
```

### Typography Hierarchy
- **Hero Headline**: 2xl-4xl, font-bold, gradient text
- **Section Titles**: 3xl-4xl, font-bold, gradient text
- **Subsections**: xl-2xl, font-semibold
- **Body Text**: Base, font-normal, opacity-70
- **CTAs**: lg, font-bold/semibold

### Icon Design Philosophy
**CRITICAL RULE**: Never use colorful emoji icons (🎵, 🎯, 💰, etc.)

**Always Use**:
- Abstract vector-style SVG icons
- Monochrome or duochrome color schemes
- `stroke="currentColor"` and `fill="none"`
- `strokeWidth="2"` for consistency
- Emerald accent colors only

**Example Good Icon**:
```jsx
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
  <path d="M9 18V5l12-2v13"/>
  <circle cx="6" cy="18" r="3"/>
  <circle cx="18" cy="16" r="3"/>
</svg>
```

---

## 🏗️ Page Structure & Components

### 1. Header Section
**Layout**: Sticky header with backdrop blur
- **Logo**: Dynamic theme-aware logo (dark/light variants)
- **Navigation**: How it works, Features, Waiting list
- **Theme Toggle**: Dark/Light mode switcher
- **CTA Button**: "Join Beta" with emerald styling

**Visual Effects**:
- Grid pattern background with opacity variations
- Radial gradient overlays with brand colors
- Backdrop blur effect

### 2. Hero Section (80vh height)
**Layout**: Two-column grid (content + image)

**Left Column - Content**:
- **Headline**: "Stop wasting time. Find the perfect tracks."
- **Subheading**: AI-powered curation description
- **CTAs**: Primary "Join the waiting list" + Secondary "Watch demo"
- **Feature List**: 3 bullet points with hover effects

**Right Column - Visual**:
- **Hero Image**: DJ headphones (553x553px)
- **Floating Elements**: Abstract musical notes with staggered animations
- **Interactive Effects**: Parallax movement, crackle effects on click

**Background Effects**:
- Multi-layer radial gradients
- Interactive wave following mouse
- Grid pattern with parallax movement

### 3. Pain Point Section
**Layout**: Two-column grid
- **Problem Statement**: "Too many tracks. Too little time."
- **Pain Points**: Time wasted, buried music, exploration difficulty
- **Solution Card**: Beatport Curator benefits with data tiles

### 4. How It Works Section (VERTICAL LAYOUT)
**Header**:
- **Custom Vector Icon**: DJ turntable with brand gradient
- **Title**: "How it Works" with gradient text
- **Subtitle**: Process explanation

**Steps** (Vertical Flow):
- **Step Cards**: Numbered badges with connecting lines
- **Icons**: Abstract vector icons (link, music, sparkles)
- **Content**: Title + description for each step

**CTA**: "Start Your Journey" button with arrow icon

### 5. Features Grid
**Layout**: 3-column responsive grid
- **6 Feature Cards**: AI Recommendations, Natural Language Search, etc.
- **Hover Effects**: Translate-y animation
- **Consistent Styling**: Glass morphism cards

### 6. Social Proof Section
**Layout**: 3-column testimonial grid
- **DJ Portraits**: Rounded images with hover scale effects
- **Quotes**: Professional testimonials
- **Attribution**: DJ categories (Resident, Aspiring, Newcomer)

### 7. Enhanced Waitlist Section (80vh height)
**Header**:
- **Beta Badge**: Animated pulse indicator
- **Hero Title**: "Be the First to Experience The Future of DJ Curation"
- **Value Proposition**: 50% discount messaging

**Benefits Grid**:
- **Early Access**: First 500 users
- **50% Discount**: Lifetime pricing benefit
- **Product Influence**: Beta feedback importance

**Form**:
- **Email Input**: Large, rounded with email icon
- **Submit Button**: Gradient CTA "Secure My Beta Spot"
- **Trust Indicators**: Security message + social proof counters

### 8. Footer
**Layout**: Horizontal flex layout
- **Copyright**: RHYTM + Sky Walker Enterprise
- **Links**: About, Privacy, Terms
- **Background**: Same grid + gradient pattern

---

## ⚡ Interactive Effects & Animations

### Scroll-Based Effects
```css
.scroll-reveal {
  transform: translateY(${scrollY * 0.5}px);
  opacity: ${Math.max(0, 1 - scrollY / 600)};
}
```

### Hover Animations
- **Cards**: `-translate-y-0.5` on hover
- **Buttons**: `-translate-y-1` with shadow increase
- **Images**: `scale-105` with smooth transitions

### Click Effects
- **Crackle Animation**: Expanding circles on hero click
- **Button Press**: `scale-[0.98]` active state

### Background Animations
- **Floating Notes**: Staggered bounce animations
- **Gradient Movement**: Parallax-based transforms
- **Grid Pattern**: Subtle opacity changes

---

## 🎛️ Theme System

### Dark Theme (Default)
```css
background: #0a0a0d;
text: white;
cards: bg-white/5 border-white/10;
accents: emerald-400, purple-400, pink-500, teal-400;
```

### Light Theme
```css
background: #f0e7d8;
text: #1a1a17;
cards: bg-[#1a1a17]/5 border-[#1a1a17]/10;
accents: emerald-600, purple-600, pink-600, teal-600;
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Base styles, single column
- **Tablet**: md: prefix, adjusted grid layouts
- **Desktop**: lg: prefix, full multi-column layouts

### Key Responsive Changes
- **Hero**: Stacked on mobile, side-by-side on desktop
- **Grid Sections**: 1 column → 2 columns → 3 columns
- **Typography**: Smaller sizes on mobile
- **Spacing**: Reduced padding on mobile

---

## 🔧 Technical Implementation

### Framework Stack
- **Next.js 15.5.3**: App Router
- **React 19.1.0**: Client components
- **TypeScript 5**: Type safety
- **Tailwind CSS 3.4.17**: Styling system

### Key Dependencies
```json
{
  "react-hot-toast": "Notifications",
  "lucide-react": "Abstract icons",
  "clsx": "Conditional classes",
  "zustand": "State management"
}
```

### File Structure
```
src/
├── app/
│   ├── layout.tsx (Root layout with metadata)
│   ├── page.tsx (Main page component)
│   └── globals.css (Global styles)
├── components/
│   └── LandingPage.tsx (Main landing component)
└── types/
    └── index.ts (TypeScript definitions)
```

---

## 📋 Cursor Rules Implementation

### Creating .cursorrules File
```markdown
# RHYTM Project - Design & Development Rules

## 🎨 Icon Design Guidelines

### NEVER use colorful emoji icons or regular colorful icons
- **Prohibition**: No emoji icons (🎵, 🎯, 💰, 🎧, 🔗, ✨, etc.)
- **Prohibition**: No colorful icon libraries with bright colors
- **Reason**: These look cheap and don't fit the professional, minimalist theme

### ALWAYS use abstract vector-style icons
- **Requirement**: Use monochrome or duochrome SVG icons
- **Style**: Abstract, minimalist, line-based designs
- **Colors**: 
  - Primary: `text-emerald-400` (dark theme) / `text-emerald-600` (light theme)
  - Secondary: `text-white/60` or `text-gray-600`
  - Never use bright, saturated colors

### Icon Implementation Standards
- **Format**: Inline SVG with `stroke="currentColor"` and `fill="none"`
- **Size**: Consistent sizing (16px, 20px, 24px, 32px, 48px)
- **Stroke**: `strokeWidth="2"` for most icons
- **Accessibility**: Include proper `viewBox` and semantic meaning
```

---

## 🎪 Visual Effects Catalog

### 1. Background Patterns
**Grid Pattern**:
```css
bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.08)_95%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.08)_95%)]
bg-[size:20px_20px]
opacity-40
```

**Radial Gradients**:
```css
bg-[radial-gradient(circle_at_20%_10%,rgba(157,78,221,0.4),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.4),transparent_35%),radial-gradient(circle_at_60%_80%,rgba(56,189,248,0.3),transparent_35%)]
```

### 2. Glass Morphism Cards
```css
bg-white/5 (dark) / bg-[#1a1a17]/5 (light)
border-white/10 (dark) / border-[#1a1a17]/10 (light)
backdrop-blur
rounded-2xl
```

### 3. Gradient Text
```css
bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400
bg-clip-text text-transparent
```

### 4. Button Styles
**Primary CTA**:
```css
bg-gradient-to-r from-emerald-500 to-teal-500
text-black (dark) / text-white (light)
px-8 py-4 rounded-xl
hover:-translate-y-1 hover:shadow-2xl
active:scale-[0.98]
```

---

## 🚀 Deployment Configuration

### Next.js Configuration
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    domains: ['www.soundhelix.com'],
  },
  // No standalone output for Vercel
};
```

### Vercel Configuration
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

---

## 📐 Component Specifications

### VerticalStepCard Component
```typescript
interface Props {
  theme: 'dark' | 'light';
  n: number;
  title: string;
  text: string;
  icon: 'link' | 'music' | 'sparkles';
}
```

**Visual Structure**:
- **Number Badge**: 64x64px gradient circle
- **Icon Badge**: 32x32px overlay with abstract SVG
- **Content**: Title (xl font) + Description (base font)
- **Connector**: Vertical line between steps

### Enhanced Waitlist Section
**Dimensions**: min-h-[80vh]
**Layout**: Centered content with max-w-5xl
**Key Elements**:
- Beta badge with pulse animation
- Large gradient headline (4xl-6xl)
- 3-column benefits grid
- Enhanced form with icons
- Trust indicators with counters

---

## 🎭 Animation Specifications

### CSS Keyframes
```css
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes crackle {
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
  100% { transform: scale(2) rotate(360deg); opacity: 0; }
}
```

### Interactive Parallax
```javascript
// Mouse movement creates offset for background elements
const offset = { x: mouseX * 0.5, y: mouseY * 0.5 };
transform: `translate3d(${offset.x * 40}px, ${offset.y * 40}px, 0)`;
```

---

## 📊 Performance Requirements

### Image Optimization
- Use Next.js `Image` component for all images
- Proper width/height attributes
- Responsive srcSet generation

### Bundle Size Targets
- Landing page: < 20kB
- First Load JS: < 150kB
- Images: Optimized WebP/PNG formats

---

## 🔍 SEO & Metadata

```typescript
export const metadata: Metadata = {
  title: "RHYTM",
  description: "AI-powered music curation for DJs. Discover, curate, and sync tracks effortlessly.",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};
```

---

## 🎪 Section-by-Section Breakdown

### Hero Section
**Height**: 80vh  
**Layout**: Grid lg:grid-cols-2  
**Background**: Multi-layer animated gradients  
**Interactive**: Mouse parallax, click crackle effects  

**Content Elements**:
1. **Headline**: Gradient text with line break
2. **Description**: Muted text with proper line height
3. **CTA Buttons**: Primary + Secondary with different styles
4. **Feature List**: 3 items with hover translate effects

**Visual Elements**:
1. **Hero Image**: DJ headphones with parallax movement
2. **Floating Notes**: 8 musical symbols with staggered bounce
3. **Background**: 3-layer gradient system with grid overlay

### How It Works Section
**Layout**: Vertical flow (changed from horizontal)  
**Background**: Glass morphism with subtle gradients  
**Header**: Custom DJ turntable icon + gradient title  

**Step Cards**:
- **Number Badge**: Gradient circle (emerald to teal)
- **Icon**: Abstract SVG in small circle overlay
- **Content**: Large title + detailed description
- **Connector**: Vertical line between steps (except last)

### Waitlist Section
**Height**: min-h-[80vh]  
**Purpose**: Convert visitors with urgency and value  

**Key Elements**:
1. **Beta Badge**: Pulse animation + gradient text
2. **Hero Title**: Multi-line with size variation
3. **Value Props**: 50% discount + 500 spots messaging
4. **Benefits Grid**: 3 cards with abstract icons
5. **Enhanced Form**: Large input + gradient button
6. **Trust Signals**: Security + social proof

---

## 🛠️ Implementation Notes

### State Management
```typescript
const [theme, setTheme] = useState<'dark'|'light'>('dark');
const [email, setEmail] = useState('');
const [submitted, setSubmitted] = useState(false);
const [offset, setOffset] = useState({x:0, y:0});
```

### Theme Implementation
All components support dynamic theming with conditional classes:
```typescript
className={(theme==='dark'?'bg-white/5':'bg-[#1a1a17]/5')}
```

### Form Handling
```typescript
const submit = (e: React.FormEvent) => {
  e.preventDefault();
  // Email validation with regex
  // Success state with celebration
};
```

---

## 📋 Quality Checklist

### Visual Quality
- [ ] No emoji icons used
- [ ] Abstract vector icons only
- [ ] Consistent emerald accent colors
- [ ] Proper gradient applications
- [ ] Glass morphism effects
- [ ] Smooth animations

### Technical Quality
- [ ] TypeScript strict mode
- [ ] Next.js Image optimization
- [ ] Responsive design
- [ ] Accessibility compliance
- [ ] Performance optimization

### Content Quality
- [ ] Clear value proposition
- [ ] Compelling beta messaging
- [ ] Professional tone
- [ ] Urgency creation (500 spots)
- [ ] Trust building elements

---

## 🎯 Conversion Optimization

### Primary Goal: Beta Signups
**Conversion Elements**:
1. **Multiple CTAs**: Header, hero, how-it-works, waitlist
2. **Value Stacking**: Early access + discount + influence
3. **Urgency**: Limited spots messaging
4. **Social Proof**: DJ testimonials + signup counters
5. **Trust Signals**: Security assurance + no spam promise

### Success Metrics
- **Email Signups**: Primary conversion goal
- **Scroll Depth**: Engagement measurement
- **Time on Page**: Interest indication
- **CTA Click Rate**: Button effectiveness

---

## 🔧 Development Guidelines

### Code Organization
- **Single File Component**: All in LandingPage.tsx
- **Helper Components**: Extracted for reusability
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized images and animations

### Maintenance
- **Design System**: Consistent color/spacing variables
- **Component Isolation**: Easy to modify sections
- **Theme Support**: Complete dark/light implementation
- **Responsive**: Mobile-first approach

---

## 🚀 Future Enhancements

### Potential Additions
1. **Video Background**: Hero section enhancement
2. **Testimonial Carousel**: More social proof
3. **Feature Demos**: Interactive previews
4. **A/B Testing**: Conversion optimization
5. **Analytics Integration**: User behavior tracking

### Technical Improvements
1. **PWA Support**: Offline functionality
2. **Performance**: Further optimization
3. **Accessibility**: Enhanced screen reader support
4. **SEO**: Structured data markup

---

**Last Updated**: September 2025  
**Version**: 1.0  
**Status**: Production Ready
