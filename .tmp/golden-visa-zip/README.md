# Greece Golden Visa Landing Page - Premium Redesign

A stunning, conversion-focused landing page for a Greece Golden Visa service built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Design Philosophy

This redesign follows a **premium fintech/luxury real estate aesthetic** inspired by high-end platforms like Stripe, Apple, and leading investment firms. The page focuses on:

- **Visual Excellence**: Sophisticated gradients, glassmorphism, and smooth animations
- **Conversion Optimization**: Strategic CTAs, trust indicators, and clear value propositions
- **Premium Feel**: Gold/amber accents, refined typography, and spacious layouts
- **User Experience**: Smooth scrolling, progressive disclosure, and intuitive navigation

## ✨ Key Features

### Visual Enhancements
- ✅ Animated gradient backgrounds with floating blobs
- ✅ Glassmorphic cards with blur effects
- ✅ Smooth scroll-triggered animations
- ✅ Staggered card entry animations
- ✅ Hover effects with scale, glow, and border highlights
- ✅ Count-up number animations
- ✅ Gradient text and borders
- ✅ Micro-interactions on buttons

### Components

1. **HeroSection** - Eye-catching hero with animated text, trust badges, and floating info card
2. **ScrollProgress** - Top progress bar showing scroll position
3. **WhyChoose** - Glassmorphic cards showcasing key differentiators
4. **Benefits** - Icon-based benefit cards with gradient styling
5. **InvestmentOptions** - Premium pricing cards with popular badge
6. **ProcessSteps** - Animated timeline (horizontal on desktop, vertical on mobile)
7. **Services** - Service grid with gradient border effects
8. **TrustIndicators** - Dark section with stats and partner badges
9. **DocumentsAccordion** - Smooth expanding accordion with gradient accents
10. **FAQ** - Clean FAQ section with smooth animations
11. **FinalCTA** - Powerful closing section with gradient background
12. **StickyCTA** - Sticky bottom bar that appears on scroll

### Animations & Interactions

- **On Load**: Staggered fade-in animations for hero elements
- **On Scroll**: Intersection Observer triggers for section animations
- **On Hover**: Scale, glow, and border effects on cards
- **Count-up**: Animated numbers in stats sections
- **Timeline**: Progressive reveal of process steps
- **Accordion**: Smooth height transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000/golden-visa` to see the page.

## 📁 Project Structure

```
├── app/
│   ├── golden-visa/
│   │   └── page.tsx          # Main page component
│   └── globals.css            # Global styles and utilities
├── components/
│   └── golden-visa/
│       ├── HeroSection.tsx
│       ├── WhyChoose.tsx
│       ├── Benefits.tsx
│       ├── InvestmentOptions.tsx
│       ├── ProcessSteps.tsx
│       ├── Services.tsx
│       ├── TrustIndicators.tsx
│       ├── DocumentsAccordion.tsx
│       ├── FAQ.tsx
│       ├── FinalCTA.tsx
│       ├── ScrollProgress.tsx
│       └── StickyCTA.tsx
└── tailwind.config.ts         # Tailwind configuration with custom animations
```

## 🎨 Design System

### Color Palette
- **Primary**: Amber/Orange gradient (`from-amber-500 to-orange-500`)
- **Secondary**: Blue/Indigo, Purple/Pink, Emerald/Teal
- **Neutral**: Gray scale from 50 to 900
- **Background**: White, light gray (50), dark gray (900)

### Typography
- **Headings**: Bold, 4xl to 7xl sizes
- **Body**: Regular, gray-600 to gray-900
- **Accents**: Gradient text using bg-clip-text

### Spacing
- **Sections**: py-24 (96px vertical padding)
- **Cards**: p-6 to p-8 (24px to 32px padding)
- **Gaps**: gap-6 to gap-12 (24px to 48px)

### Border Radius
- **Small**: rounded-xl (12px)
- **Medium**: rounded-2xl (16px)
- **Large**: rounded-3xl (24px)

### Shadows
- **Base**: shadow-lg
- **Hover**: shadow-2xl
- **Colored**: shadow-amber-500/30 for glow effects

## 🔧 Customization

### Changing Colors
Edit gradient classes in components. Main gradients:
- Gold: `from-amber-500 to-orange-500`
- Blue: `from-blue-500 to-cyan-500`
- Purple: `from-purple-500 to-pink-500`

### Modifying Animations
Edit `tailwind.config.ts` keyframes section or component-specific `<style jsx>` blocks.

### Adding/Removing Sections
Import/remove components in `app/golden-visa/page.tsx`.

### Content Updates
Edit the data arrays at the top of each component file:
- Benefits: `benefits` array
- Services: `services` array
- FAQs: `faqs` array
- etc.

## 📱 Responsive Design

All components are fully responsive with breakpoints:
- **Mobile**: Default (< 768px)
- **Tablet**: md: (768px+)
- **Desktop**: lg: (1024px+)

Key responsive features:
- Grid layouts switch from 1 column → 2 columns → 3/4 columns
- Timeline changes from horizontal to vertical
- Text sizes scale down on mobile
- CTAs stack vertically on small screens

## ⚡ Performance

- **Next.js Image Optimization**: Using `next/image` for hero image
- **CSS-based Animations**: Minimal JavaScript, leveraging CSS transitions
- **Lazy Loading**: Intersection Observer for scroll animations
- **Code Splitting**: Component-based architecture
- **Minimal Dependencies**: Only React, Next.js, and Tailwind

## 🎯 Conversion Optimization

- **Multiple CTAs**: Placed strategically throughout the page
- **Sticky CTA Bar**: Persistent call-to-action on scroll
- **Trust Indicators**: Stats, badges, and social proof
- **Clear Value Props**: Benefits and differentiators highlighted
- **Progressive Disclosure**: Accordion for detailed information
- **FAQ Section**: Addressing common objections

## 🛠️ Technologies

- **Next.js 14**: App Router, Server Components
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: useState, useEffect, useRef
- **Intersection Observer API**: Scroll animations

## 📄 License

This is a proprietary design for a Greece Golden Visa service.

## 🤝 Support

For questions or customization requests, contact the development team.

---

**Note**: Replace `/greece.jpg` with actual hero image path in your public folder.
