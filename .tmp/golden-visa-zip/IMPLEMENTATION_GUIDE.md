# Implementation Guide

## 🚀 Quick Start

### Step 1: Setup Project
```bash
# Create Next.js project (if not already created)
npx create-next-app@latest greece-golden-visa --typescript --tailwind --app

# Navigate to project
cd greece-golden-visa

# Copy all files from this package to your project
```

### Step 2: File Structure
Ensure your project has this structure:
```
your-project/
├── app/
│   ├── golden-visa/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   └── golden-visa/
│       ├── Benefits.tsx
│       ├── DocumentsAccordion.tsx
│       ├── FAQ.tsx
│       ├── FinalCTA.tsx
│       ├── HeroSection.tsx
│       ├── InvestmentOptions.tsx
│       ├── ProcessSteps.tsx
│       ├── ScrollProgress.tsx
│       ├── Services.tsx
│       ├── StickyCTA.tsx
│       ├── TrustIndicators.tsx
│       └── WhyChoose.tsx
├── public/
│   └── greece.jpg          # ADD YOUR HERO IMAGE HERE
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### Step 3: Add Hero Image
**IMPORTANT**: Place your Greece/Parthenon image in `/public/greece.jpg`

Recommended image specs:
- Format: JPG or WebP
- Size: 1200x800px minimum
- Quality: High (80-90%)
- Subject: Greek architecture (Parthenon, Santorini, etc.)

### Step 4: Install & Run
```bash
npm install
npm run dev
```

Visit: `http://localhost:3000/golden-visa`

## 🎨 Customization Guide

### 1. Update Content

#### Change Benefits
Edit `components/golden-visa/Benefits.tsx`:
```typescript
const benefits = [
  {
    icon: "✈️",
    title: "Your Benefit",
    desc: "Your Description",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50"
  },
  // Add more...
];
```

#### Change Investment Options
Edit `components/golden-visa/InvestmentOptions.tsx`:
```typescript
const options = [
  {
    price: "€250,000",
    title: "Your Tier",
    popular: true,  // or false
    points: [
      "Feature 1",
      "Feature 2",
    ],
    gradient: "from-amber-600 to-orange-600",
  },
];
```

#### Change FAQs
Edit `components/golden-visa/FAQ.tsx`:
```typescript
const faqs = [
  {
    question: "Your question?",
    answer: "Your detailed answer..."
  },
];
```

### 2. Modify Colors

#### Primary Brand Color
Find and replace gradient classes throughout:
- Current: `from-amber-500 to-orange-500`
- Replace with your brand gradient

Common files:
- `HeroSection.tsx` - CTA buttons
- `Benefits.tsx` - Accent elements
- `InvestmentOptions.tsx` - Pricing cards
- `FinalCTA.tsx` - Main CTA

#### Global Color Scheme
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      secondary: '#YOUR_COLOR',
    }
  }
}
```

### 3. Adjust Animations

#### Speed
Change duration values:
- `transition-all duration-300` → `duration-500` (slower)
- `transition-all duration-300` → `duration-150` (faster)

#### Disable Animations (for performance)
Remove these classes:
- `animate-blob`
- `animate-fade-in`
- `animate-slide-in-left/right`
- Intersection Observer code in components

### 4. Typography

#### Change Fonts
Add to `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
  font-family: 'Your Font', sans-serif;
}
```

#### Adjust Sizes
Find and replace:
- `text-5xl` → `text-6xl` (larger headings)
- `text-xl` → `text-lg` (smaller body)

### 5. Layout Adjustments

#### Section Spacing
Change `py-24` (96px) to:
- `py-16` (64px) - tighter
- `py-32` (128px) - more spacious

#### Container Width
Edit `page.tsx`:
```typescript
// Current
<main className="max-w-7xl mx-auto px-6">

// Wider
<main className="max-w-full mx-auto px-6">

// Narrower
<main className="max-w-5xl mx-auto px-6">
```

## 🔧 Common Modifications

### Add New Section
1. Create component in `components/golden-visa/YourSection.tsx`
2. Import in `app/golden-visa/page.tsx`
3. Add between existing sections

```typescript
// Example new section
export default function YourSection() {
  return (
    <section className="py-24 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-10">
        Your Heading
      </h2>
      {/* Your content */}
    </section>
  );
}
```

### Remove Section
Simply comment out or delete the import/component in `page.tsx`:
```typescript
// import FAQ from "@/components/golden-visa/FAQ";
// <FAQ />
```

### Change Section Order
Reorder components in `page.tsx`:
```typescript
<main>
  <HeroSection />
  <Benefits />        {/* Moved up */}
  <WhyChoose />       {/* Moved down */}
  {/* ... */}
</main>
```

### Add Contact Form
Create `ContactForm.tsx`:
```typescript
"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="py-24">
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </section>
  );
}
```

## 📱 Responsive Testing

### Test Breakpoints
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px+ (Laptop)
- Large: 1920px (Desktop)

### Browser Testing
- Chrome (primary)
- Safari (iOS)
- Firefox
- Edge

## ⚡ Performance Optimization

### 1. Image Optimization
Use Next.js Image component everywhere:
```typescript
import Image from "next/image";

<Image
  src="/your-image.jpg"
  alt="Description"
  width={1200}
  height={800}
  priority // for above-fold images
/>
```

### 2. Lazy Load Components
For below-fold sections:
```typescript
import dynamic from 'next/dynamic';

const FAQ = dynamic(() => import('@/components/golden-visa/FAQ'));
```

### 3. Reduce Animation Complexity
On mobile, simplify animations:
```typescript
const isMobile = window.innerWidth < 768;

{!isMobile && (
  <div className="animate-blob">...</div>
)}
```

## 🐛 Troubleshooting

### Animations Not Working
1. Check `tailwind.config.ts` has keyframes
2. Verify `globals.css` is imported in root layout
3. Check browser supports CSS animations

### Images Not Showing
1. Ensure image is in `/public` folder
2. Check file path is correct
3. Verify Next.js Image component is used correctly

### Typescript Errors
1. Run `npm install --save-dev @types/react @types/node`
2. Check tsconfig.json paths are correct
3. Restart TypeScript server in VS Code

### Styling Not Applied
1. Verify Tailwind CSS is installed
2. Check `tailwind.config.ts` content paths
3. Rebuild: `npm run build`

## 🔒 Production Checklist

Before deploying:

- [ ] Replace all placeholder images
- [ ] Update all text content
- [ ] Test all CTAs (buttons, links)
- [ ] Add actual contact form backend
- [ ] Test on real devices
- [ ] Optimize all images
- [ ] Add meta tags for SEO
- [ ] Test page speed (Lighthouse)
- [ ] Add analytics tracking
- [ ] Test form validation
- [ ] Add error boundaries
- [ ] Test accessibility (WCAG)

## 📊 Analytics Integration

### Google Analytics
Add to `app/layout.tsx`:
```typescript
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Track CTA Clicks
```typescript
const handleCTAClick = () => {
  // Track event
  gtag('event', 'click', {
    event_category: 'CTA',
    event_label: 'Schedule Meeting'
  });
  
  // Your action
  window.location.href = '/contact';
};
```

## 🌐 SEO Optimization

Add to `app/golden-visa/page.tsx`:
```typescript
export const metadata = {
  title: 'Greece Golden Visa | EU Residency Investment Program',
  description: 'Secure EU residency through Greece Golden Visa. €250K investment, visa-free travel to 29 countries, no stay requirement.',
  keywords: 'greece golden visa, eu residency, investment visa',
  openGraph: {
    title: 'Greece Golden Visa Program',
    description: 'Your path to EU residency',
    images: ['/og-image.jpg'],
  }
};
```

## 🎯 Conversion Tracking

Add tracking to forms:
```typescript
const trackConversion = () => {
  // Facebook Pixel
  fbq('track', 'Lead');
  
  // Google Ads
  gtag('event', 'conversion', {
    send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL'
  });
};
```

---

Need more help? Check the README.md for detailed documentation or the DESIGN_OVERVIEW.md for design specifications.
