# Portfolio Design System — Agha Hammad Ahmed

## Aesthetic Direction
Editorial-meets-developer. Large typography dominates. The layout
feels like a high-end magazine built by a coder. Interactions are
deliberate and cinematic — not flashy, but confident.

## Color System
Two colors only. Everything derives from these.

- Light Color: #F5F0E8 (Warm Cream)
- Dark Color:  #1A1A1A (Charcoal)

Light Mode: bg = Light Color, text = Dark Color
Dark Mode:  bg = Dark Color, text = Light Color

Use opacity variants for borders, muted text, hover states.
No third accent color.

## Typography
Font: Neue Montreal (primary for everything)
- Display: Neue Montreal Bold/Black — viewport-filling, use clamp()
- Body: Neue Montreal Regular — clean, readable
- Weights used: 300, 400, 500, 700, 800

Load via localFont (next/font/local) since Neue Montreal is a 
purchased/self-hosted font.

## Spacing
- Section padding: py-24 md:py-40
- Generous whitespace, large gaps
- Mobile: scale down 40%, keep proportions

## Smooth Scroll
- Lenis for smooth scrolling, initialized in a client component
- Wrap entire app in LenisProvider
- All Framer Motion scroll hooks use Lenis-compatible scroll

## Animation Rules
- Loader exit: the entire loader screen animates fadeInUpBig (y: 0 → -100vh), 
  0.8s ease-in-out, reveals hero underneath
- Hero image on scroll: blurs + slides down (useScroll + useTransform)
- Section entrances: fade up 40px, opacity 0→1, 0.6s, useInView
- Stagger children: 0.1s delay between items
- Menu open: full screen overlay, Framer Motion AnimatePresence
- Menu item hover: full row background transitions, 0.2s
- All animations respect prefers-reduced-motion

## Components

### Hamburger Menu
- Always visible top right, all screen sizes
- Opens full-screen overlay covering entire viewport
- Each menu item is a full-width row with large text (min 5xl-8xl)
- Hover: row background fills with dark color (light mode) / light color (dark mode)
  and text color inverts
- Links: Home, About, Projects, Testimonials, Contact Us
- Framer Motion AnimatePresence for mount/unmount

### Loader
- Full screen, centered
- Catchy small-medium text: "i build things that feel alive"
- After 2.5s, entire screen slides up (fadeInUpBig) and unmounts
- Hero animates in after loader exits

### Hero
- Name "AGHA HAMMAD AHMED" fills background: outlined ghost text, ~20vw size
- Portrait photo in front, overlapping letters
- On scroll: photo blurs (0px→20px) + slides down (y: 0→150px)
  using useScroll + useTransform mapped to scrollYProgress
- Name fully revealed as photo moves away

### About Section (Homepage)
- 2x2 grid of large cards
- Cards have hover tilt effect (useMotionValue + rotateX/Y)
- Each card represents something: skills, experience, philosophy, contact

### Projects Section (Homepage)
- Pinned horizontal scroll section
- While user scrolls vertically, content moves horizontally
- 3-4 project cards, each near-full-screen width
- Project screenshot as bg, name overlaid in large text
- "See All Projects" button links to /projects

### Before/After Section
- Two column list comparison
- Left: before working with me, Right: after
- Scroll-triggered reveal, items animate in staggered

### Testimonials Section (Homepage)
- Monologue/quote style
- Large pull-quote typography
- Scroll-triggered

### Contact Form (Homepage)
- Reveals on scroll with animation
- Minimal fields: name, email, message

### Footer
- Not standard
- Large typographic statement across full width
- Minimal links below

## Pages
- /about — LinkedIn profile layout: cover photo, avatar, name, 
  headline, about section, experience, education, skills
- /projects — masonry or grid, hover over image scrolls/previews the site
- /testimonials — full slider with quotes
- /contact — standalone contact form page

## Tech Stack
- Next.js 14 App Router
- Tailwind CSS with CSS variables
- TypeScript
- Framer Motion (all animations)
- React Icons
- next/font/local for Neue Montreal
- Lenis for smooth scroll

## CSS Variables (in globals.css)
--color-light: #F5F0E8
--color-dark: #1A1A1A
--font-primary: 'Neue Montreal', sans-serif