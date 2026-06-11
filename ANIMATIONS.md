# Animation Guide - A New Era Developers

Complete guide to animations used throughout the A New Era Developers website.

## Overview

All animations are built with **Framer Motion** for optimal performance and smooth 60fps animations across all devices. The design uses a consistent easing function and timing to create a cohesive, professional feel.

## Core Animation Principles

### Easing Function
Default easing: `[0.22, 1, 0.36, 1]` (custom Bezier curve)
- Creates smooth, natural motion
- Optimized for UI interactions
- Used across 95% of animations

### Duration
- **Quick interactions**: 0.3s
- **Standard animations**: 0.5-0.6s
- **Page transitions**: 0.6s
- **Complex sequences**: 0.8s

### GPU Acceleration
Only animate these properties for best performance:
- `transform` (translate, scale, rotate)
- `opacity`

Never animate:
- `width`, `height`
- `left`, `right`, `top`, `bottom`
- `margin`, `padding`
- `backgroundColor`

## Animation Categories

### 1. Entrance Animations

#### Fade In Up
```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
  Content
</motion.div>
```
**Used for**: Section headings, cards, form fields

#### Fade In Down
```jsx
<motion.div
  initial={{ opacity: 0, y: -24 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>
```
**Used for**: Navigation bars, headers

#### Staggered Children
```jsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```
**Used for**: Lists, grids, multiple cards

### 2. Hover Interactions

#### Scale & Shadow
```jsx
<motion.button
  whileHover={{
    scale: 1.05,
    boxShadow: '0 12px 48px rgba(26, 35, 126, 0.22)'
  }}
  transition={{ duration: 0.3 }}
>
  Button
</motion.button>
```
**Used for**: Cards, buttons, project tiles

#### Image Zoom
```jsx
<motion.div
  whileHover={{ scale: 1.1 }}
  transition={{ duration: 0.5 }}
>
  <Image />
</motion.div>
```
**Used for**: Project images, thumbnails

#### Underline Animation
```jsx
<motion.span
  initial={{ width: 0 }}
  whileHover={{ width: '100%' }}
  transition={{ duration: 0.3 }}
/>
```
**Used for**: Navigation links, text decorations

### 3. Page Transitions

#### Fade Transition
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.6 }}
>
  Page Content
</motion.div>
```
**Used for**: Between page navigations

#### Slide Transition
```jsx
<motion.div
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -100 }}
>
  Content
</motion.div>
```
**Used for**: Modal, drawer, sidebar transitions

### 4. Scroll Animations

#### Reveal on Scroll
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```
**Used for**: Sections, cards on scroll

#### Parallax Effect
```jsx
<motion.div
  style={{
    y: useMotionTemplate`calc(${scrollY} * 0.5)`
  }}
>
  Background
</motion.div>
```
**Used for**: Hero backgrounds, depth effects

### 5. Form Animations

#### Step Progress
```jsx
<motion.div
  animate={{
    width: `${(step / totalSteps) * 100}%`
  }}
  transition={{ duration: 0.5 }}
/>
```
**Used for**: Progress bars, indicators

#### Step Transitions
```jsx
<motion.div
  initial={{ opacity: 0, x: 100 }}
  animate={step === 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
  exit={{ opacity: 0, x: -100 }}
>
  Step Content
</motion.div>
```
**Used for**: Multi-step forms, wizards

#### Field Focus
```jsx
<motion.div
  whileFocus={{
    scale: 1.02,
    boxShadow: '0 0 0 3px rgba(212, 160, 23, 0.12)'
  }}
>
  <input />
</motion.div>
```
**Used for**: Form inputs, focus states

### 6. Complex Sequences

#### Staggered List
```jsx
const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};
```
**Used for**: Project grids, feature lists

## Real World Examples

### Project Card Animation
```jsx
<motion.article
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{
    y: -12,
    boxShadow: '0 12px 48px rgba(26, 35, 126, 0.22)'
  }}
  transition={{
    initial: { duration: 0.5 },
    hover: { duration: 0.3 }
  }}
>
  <motion.div
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.5 }}
  >
    <Image />
  </motion.div>
  {/* Card content */}
</motion.article>
```

### Navigation Link Animation
```jsx
<Link href={item.href} className="relative group">
  {item.label}
  <motion.span
    className="absolute bottom-0 left-0 h-0.5 bg-gold-bright"
    initial={{ width: 0 }}
    whileHover={{ width: '100%' }}
    transition={{ duration: 0.3 }}
  />
</Link>
```

### Button with Spring Physics
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{
    type: 'spring',
    stiffness: 300,
    damping: 20
  }}
>
  Click Me
</motion.button>
```

### Multi-Step Form
```jsx
const stepVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, x: -100, transition: { duration: 0.3 } }
};

<AnimatePresence mode="wait">
  <motion.div
    key={step}
    variants={stepVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {/* Step content */}
  </motion.div>
</AnimatePresence>
```

## Performance Optimization

### Use `viewport` for Lazy Animations
```jsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}  // Only animate once
>
  Content
</motion.div>
```

### Use `AnimatePresence` for Exit Animations
```jsx
<AnimatePresence mode="wait">
  {isOpen && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

### Avoid Animating Large Content
```jsx
// ❌ Bad - Animate container
<motion.div animate={{ width: '100vw' }} />

// ✅ Good - Animate position
<motion.div animate={{ x: 100 }} />
```

### Use `initial={false}` to Skip Animations
```jsx
// Skip animation on mount, only on prop change
<motion.div initial={false} animate={{ x }} />
```

## Testing Animations

### Check Frame Rate
1. Open Chrome DevTools
2. Go to Performance tab
3. Record interaction
4. Look for 60 FPS timeline

### Check Bundle Impact
```bash
npm run build
# Check .next/static/chunks/ for animation library size
```

### Mobile Testing
- Test on real iOS/Android devices
- Check Safari and Chrome
- Verify smooth performance on slower devices

## Accessibility

### Respect prefers-reduced-motion
```jsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<motion.div
  animate={prefersReducedMotion ? { opacity: 1 } : customAnimation}
>
  Content
</motion.div>
```

### Ensure Content is Readable
- Don't move text aggressively
- Keep high contrast with dark overlay
- Make interactive elements easily clickable

## Common Pitfalls to Avoid

1. **Too Many Simultaneous Animations**
   - Can cause 60fps drops
   - Limit to 5-8 animations per screen

2. **Animating Position Instead of Transform**
   - Use `translateX/Y` not `left/right`
   - Use `scale` not `width/height`

3. **Long Animation Durations**
   - Keep under 1 second for interactions
   - Feels sluggish over 800ms

4. **Inconsistent Easing**
   - Use same easing curve throughout
   - Creates cohesive feel

5. **Blocking Interactions**
   - Always use `pointerEvents: 'none'` on overlays
   - Enable buttons during animations

## Animation Checklist

- [ ] Animations under 600ms for interactions
- [ ] Using only `transform` and `opacity`
- [ ] Testing on multiple devices
- [ ] Checking 60fps performance
- [ ] Respecting `prefers-reduced-motion`
- [ ] Using consistent easing
- [ ] Accessible to keyboard users
- [ ] No memory leaks in scroll animations
- [ ] Proper cleanup in useEffect
- [ ] Loading animations while content loads

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Animation Performance](https://web.dev/animations/)
- [CSS Tricks: Animation Performance](https://css-tricks.com/animation-performance/)
- [MDN: Using CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)

---

For implementation questions, refer to the component files in `components/` directory.