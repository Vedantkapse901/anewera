# A New Era Developers - Modern Web Platform

A professional, multi-page website built with **Next.js 14**, **React 18**, **Framer Motion**, and **Tailwind CSS** for a premium real estate and construction company.

## 🎯 Features

- **Modern Stack**: Next.js 14 App Router with React 18
- **Smooth Animations**: Framer Motion for professional, glitch-free animations
- **Multi-Page Architecture**: Proper routing with file-based pages
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional UI/UX**: Premium design with smooth page transitions
- **API Ready**: Express backend for bookings, projects, reviews, and admin
- **Optimized Performance**: Image optimization, code splitting, and SSR

## 📁 Project Structure

```
anewera/
├── app/
│   ├── layout.js          # Root layout with fonts
│   ├── globals.css        # Global styles
│   ├── page.js            # Home page
│   ├── projects/
│   │   └── page.js        # Projects listing with filters
│   └── booking/
│       └── page.js        # Multi-step booking form
├── components/
│   ├── Navbar.js          # Animated navigation
│   ├── Footer.js          # Footer with links
│   ├── PageTransition.js  # Page transition wrapper
│   └── AnimatedContainer.js # Reusable animation components
├── public/
│   ├── images/            # Logo and images
│   └── [project images]   # s1.jpg, s2.jpg, s3.jpg
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind theme configuration
├── postcss.config.js      # PostCSS configuration
├── server.js              # Express API server
├── routes/                # API endpoints
└── package.json           # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env.local
```

3. **Start development server**:
```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Royal Blue**: `#1A237E` - Primary color
- **Gold**: `#D4A017` - Accent color
- **Royal Red**: `#B71C1C` - Secondary accent
- **Royal Green**: `#1B5E20` - Success color

### Typography
- **Heading**: Playfair Display (serif)
- **Display**: Cinzel (serif)
- **UI**: Raleway (sans-serif)
- **Labels**: Josefin Sans (sans-serif)
- **Body**: Lato (sans-serif)

## 🎬 Animation Features

All animations use **Framer Motion** for smooth, GPU-accelerated performance:

- **Page Transitions**: Smooth fade-in animations when navigating
- **Component Animations**: Staggered entrance animations
- **Interactive Elements**: Hover effects with scale and shadow
- **Form Animations**: Step-by-step form progression with smooth transitions
- **Image Zoom**: Hover zoom effects on project images
- **Button Effects**: Spring-based interactions

## 📄 Pages

### Home (`/`)
- Hero section with animated background
- Feature highlights with hover effects
- Project preview grid
- Call-to-action sections

### Projects (`/projects`)
- Project grid with category filtering
- Smooth filter animations
- Hover effects with image zoom
- Project details and amenities

### Booking (`/booking`)
- Multi-step form with progress indicators
- Smooth step transitions
- Form validation
- WhatsApp integration

## 🔧 Configuration

### Tailwind CSS
Theme colors and fonts are configured in `tailwind.config.js`. Customize colors and spacing here.

### Next.js
App Router is configured for file-based routing. Add new pages by creating files in the `app/` directory.

## 🌐 API Integration

Express server runs alongside Next.js to handle:
- `/api/bookings` - Booking submissions
- `/api/projects` - Project data
- `/api/reviews` - Client testimonials
- `/api/admin` - Admin dashboard

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t anewera .
docker run -p 3000:3000 anewera
```

### Self-hosted
```bash
npm run build
npm start
```

## 📝 Performance Tips

- Images are automatically optimized with Next.js Image component
- Code splitting happens automatically
- CSS is minified in production
- Animations use GPU acceleration (transform/opacity)

## 🛠️ Development Tips

- Use `motion.div` from Framer Motion for animated containers
- Leverage Tailwind's responsive utilities for mobile-first design
- Keep animations under 600ms for optimal UX
- Test on real devices for animation performance

## 📄 License

ISC License - See LICENSE file

## 👤 Author

A New Era Developers

## 📧 Contact

- **Phone**: +91 7208324505
- **Email**: aneweradevelopers@gmail.com
- **Website**: [anewera.dev](https://anewera.dev)

---

Built with ❤️ using Next.js and Framer Motion