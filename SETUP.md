# Setup Guide - A New Era Developers Website

This document provides detailed setup instructions for the modernized Next.js version of the A New Era Developers website.

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Architecture Overview

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Framer Motion for smooth, performance-optimized animations
- **Components**: Reusable React components with automatic code splitting

### Backend (Express)
- **Server**: Node.js Express server
- **API Routes**: `/api/*` endpoints for bookings, projects, reviews, dashboard
- **Database**: Configured via routes (see `/routes` directory)

### Image Assets
Place image files in `public/` directory:
- `public/images/logo.png` - Company logo
- `public/s1.jpg` - Shivneri project image
- `public/s2.jpg` - Dream City project image
- `public/s3.jpg` - Mira Residence project image

## Page Structure

### Home Page (`/`)
**File**: `app/page.js`
- Animated hero section with background slider
- Feature showcase grid with hover effects
- Project preview cards
- Call-to-action sections
- Smooth page animations on scroll

### Projects Page (`/projects`)
**File**: `app/projects/page.js`
- Category filtering (All, Land Development, Building Construction)
- Animated project grid with stagger effects
- Image zoom on hover
- Smooth transitions between filter states

### Booking Page (`/booking`)
**File**: `app/booking/page.js`
- Multi-step form (3 steps)
- Animated progress indicators
- Smooth step transitions
- WhatsApp integration for booking confirmation

## Component System

### Core Components

**Navbar** (`components/Navbar.js`)
- Fixed navigation with scroll effects
- Mobile menu with animations
- Navigation links with underline animations

**Footer** (`components/Footer.js`)
- Company info and links
- Contact details
- Social/WhatsApp integration

**PageTransition** (`components/PageTransition.js`)
- Wrapper for smooth page entrance animations
- Fade-in effect on page load

**AnimatedContainer** (`components/AnimatedContainer.js`)
- Reusable animation components
- Staggered text animations
- Container-based entrance animations

## Animation Principles

All animations follow these best practices:

1. **Duration**: Most animations are 0.5-0.6 seconds
2. **Easing**: Custom easing `[0.22, 1, 0.36, 1]` for smooth motion
3. **GPU Acceleration**: Using `transform` and `opacity` only
4. **Mobile Optimization**: Reduced complexity on touch devices
5. **No Jank**: All animations use Framer Motion's optimized rendering

## Customization Guide

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'royal-blue': '#1A237E',
  'gold-bright': '#D4A017',
  // ... more colors
}
```

### Fonts
Edit `app/layout.js` to change Google Fonts:
```javascript
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700', '900'],
});
```

### Add New Pages
1. Create folder in `app/` directory
2. Add `page.js` file
3. Wrap content in `<PageTransition>` component
4. Use Framer Motion components for animations

### Add New Routes
1. Create `.js` file in appropriate folder
2. Export component as default
3. Use app router conventions

## Performance Optimization

### Image Optimization
- Always use Next.js `Image` component
- Specify `sizes` prop for responsive images
- Use `priority` for above-fold images

### Animation Performance
- Test animations on real mobile devices
- Use Lighthouse to check performance metrics
- Keep animation duration under 600ms
- Avoid animating large content on initial load

### Code Splitting
- Next.js automatically splits at page boundaries
- Use dynamic imports for heavy components
- Monitor bundle size with `npm run build`

## Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```
- Automatic deployments on push
- Instant preview deployments
- Best performance for Next.js

### Docker
```bash
docker build -t anewera .
docker run -p 3000:3000 anewera
```

### Traditional VPS
```bash
npm run build
npm start
```

## Troubleshooting

### Animations Stuttering
- Check if using `will-change` CSS property
- Verify animations use only `transform`/`opacity`
- Test on different devices

### Images Not Loading
- Verify image files in `public/` directory
- Check file paths are relative to `public/`
- Use `Image` component from next/image

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

## API Endpoints

The Express backend provides:

- `GET /health` - Health check
- `POST /api/bookings` - Submit booking
- `GET /api/projects` - Get projects
- `POST /api/reviews` - Submit review
- `GET /api/dashboard` - Admin dashboard data

## Best Practices

1. **Always wrap animations in `motion` components** from Framer Motion
2. **Use `whileInView` for scroll animations** to reduce memory usage
3. **Test on both desktop and mobile** before deploying
4. **Keep state management simple** with React hooks
5. **Use Tailwind utilities** for responsive design
6. **Add `key` prop to animated lists** for proper rendering

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test locally: `npm run dev`
3. Build for production: `npm run build`
4. Test production build: `npm start`
5. Commit and push: `git commit -m "feat: description"`
6. Create pull request for review

## Performance Targets

- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Animation FPS**: 60+ on most devices
- **Bundle Size**: < 150KB (gzipped)

---

For more help, check the README.md file or contact the development team.