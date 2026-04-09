# Theme System Guide

## Overview
The AI Software Engineer V2 frontend features a sophisticated theme system that supports both dark (default) and light modes with smooth transitions, persistent user preferences, and a comprehensive design token system.

## How It Works

### 1. Theme Provider Setup
The theme system is initialized in `App.jsx` using the `ThemeProvider` wrapper:

```jsx
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
```

### 2. CSS Variable System
All colors are defined as CSS custom properties in `index.css`:

```css
:root {
  /* Dark mode (default) */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 59 89% 48%;
  /* ... more variables ... */
}

html.light {
  /* Light mode overrides */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more variables ... */
}
```

### 3. Tailwind Integration
Tailwind CSS is configured to use these variables:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: "hsl(var(--primary))",
      /* ... more color mappings ... */
    }
  }
}
```

### 4. Theme Toggle
The theme can be toggled using the `useTheme` hook:

```jsx
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
```

## Color Tokens

### Background & Foreground
- `background`: Main page background color
- `foreground`: Primary text color
- `surface`: Card/panel background color
- `surface-light`: Lighter surface for hover states

### Semantic Colors
- `primary`: Main action color (green #6FD86F)
- `accent`: Secondary accent color (blue #96CFEF)
- `success`: Positive actions (green)
- `warning`: Warning/attention (orange)
- `destructive`: Dangerous/delete actions (red)
- `muted`: Disabled/secondary text
- `muted-foreground`: Secondary text color

### UI Elements
- `border`: Border colors
- `input`: Input field backgrounds
- `input-foreground`: Input field text color
- `card`: Card backgrounds
- `card-foreground`: Card text color
- `ring`: Focus ring color

## Using Colors in Components

### Option 1: Tailwind Classes (Recommended)
```jsx
export default function MyComponent() {
  return (
    <div className="bg-background text-foreground">
      <div className="rounded-lg bg-card border border-border p-4">
        <h2 className="text-foreground font-semibold">Title</h2>
        <p className="text-muted-foreground">Subtitle</p>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
          Action
        </button>
      </div>
    </div>
  );
}
```

### Option 2: CSS Variables (Advanced)
```css
.my-component {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border-color: hsl(var(--border));
}

.my-component-button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

## Dark Mode (Default)

### Color Scheme
```
Background: Very Dark Blue-Gray (#0D0D1F)
Foreground: Almost White (#FAFAFA)
Surface: Medium Dark Gray-Blue (#2A2A48)
Primary: Fresh Green (#6FD86F)
Accent: Sky Blue (#96CFEF)
```

### Characteristics
- High contrast for readability
- Reduced eye strain for extended use
- Modern SaaS aesthetic
- Professional appearance
- Sophisticated shadows and depth

### When to Use
- Default for all users
- Night/dark environments
- Extended viewing sessions
- Professional settings

## Light Mode

### Color Scheme
```
Background: Pure White (#FFFFFF)
Foreground: Very Dark Blue-Gray (#0D0D1F)
Surface: Light Gray (#F5F5F5)
Primary: Fresh Green (#6FD86F)
Accent: Sky Blue (#96CFEF)
```

### Characteristics
- Clean, minimal appearance
- High readability
- Professional look
- Standard business aesthetic
- Light shadows for subtlety

### When to Use
- Daytime usage
- Bright environments
- Print-friendly layouts
- Business presentations

## Transition Effects

### Smooth Transitions
All theme changes use smooth 300ms transitions:

```css
/* Defined in index.css */
.transition-theme {
  transition-property: background-color, color, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}
```

### Apply to Components
```jsx
<div className="transition-theme bg-background text-foreground">
  Content smoothly transitions when theme changes
</div>
```

## localStorage Persistence

### How It Works
```jsx
// When theme is toggled
toggleTheme = () => {
  const newIsDark = !isDark;
  localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  applyTheme(newIsDark);
}

// On page load
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme ? savedTheme === 'dark' : true;
  applyTheme(isDark);
}, []);
```

### User Experience
1. User toggles theme
2. Preference is saved to localStorage
3. Page refreshes - theme persists
4. New sessions remember the preference
5. Can be cleared by clearing localStorage

## Best Practices

### ✅ Do
- Use semantic color tokens (e.g., `bg-primary` not `bg-blue-600`)
- Test components in both light and dark modes
- Add `transition-theme` class to all colored elements
- Use `text-muted-foreground` for secondary text
- Use `border-border` for all borders
- Use `bg-surface` for card backgrounds
- Document color choices for custom components

### ❌ Don't
- Hardcode color values like `bg-gray-900`
- Use old hardcoded class names
- Skip testing in both themes
- Forget the `transition-theme` class
- Use non-semantic colors
- Hardcode hex values in CSS
- Mix theme systems

## Custom Components

### Template for New Components
```jsx
// ✅ Good - Using semantic tokens
export default function Card() {
  return (
    <div className="transition-theme rounded-lg bg-card border border-border p-6">
      <h3 className="text-foreground font-semibold">Title</h3>
      <p className="text-muted-foreground text-sm">Description</p>
      <button className="transition-theme mt-4 bg-primary text-primary-foreground px-4 py-2 rounded">
        Action
      </button>
    </div>
  );
}
```

### Testing Checklist
- [ ] Component renders correctly in dark mode
- [ ] Component renders correctly in light mode
- [ ] Text has sufficient contrast in both modes
- [ ] Transitions are smooth when theme changes
- [ ] All colored elements use semantic tokens
- [ ] Hover/focus states visible in both modes

## Advanced Usage

### Conditional Styling Based on Theme
```jsx
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeAwareComponent() {
  const { isDark } = useTheme();
  
  return (
    <div className={isDark ? 'shadow-lg' : 'shadow'}>
      {/* Use different shadow intensity based on theme */}
    </div>
  );
}
```

### Dynamic Color Generation
```jsx
// For advanced customization
const getDynamicColor = (isDark) => {
  return isDark ? '#6FD86F' : '#4CAF50';
};
```

### CSS-in-JS Integration
```jsx
const styles = {
  container: {
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
  },
  button: {
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
  }
};
```

## Troubleshooting

### Colors Not Changing on Theme Toggle
1. Ensure component has `transition-theme` class
2. Check that colors use semantic tokens, not hardcoded values
3. Verify ThemeProvider wraps the component
4. Clear browser cache and localStorage
5. Check browser console for CSS errors

### Contrast Issues
1. Use DevTools color picker to check contrast ratio
2. Ensure text uses `text-foreground` or `text-muted-foreground`
3. Test with accessibility tools like WAVE or Lighthouse
4. Adjust shadow depth if needed

### Theme Not Persisting
1. Check if localStorage is enabled
2. Verify `localStorage.setItem` is being called
3. Check browser privacy settings
4. Clear browser cookies/cache and try again

### Transitions Not Smooth
1. Add `transition-theme` class to elements
2. Check for CSS conflicts
3. Verify postcss.config.js includes Tailwind
4. Check browser DevTools for animation performance

## Performance Considerations

### Optimizations
- CSS variables are extremely performant
- Theme switching uses minimal JavaScript
- Transitions use GPU acceleration
- No layout recalculations needed
- Efficient color parsing with HSL format

### Metrics
- Theme switch: <300ms
- No flickering
- No performance degradation
- Lightweight bundle size

## Accessibility

### WCAG Compliance
- ✅ Contrast ratio: 4.5:1 for normal text
- ✅ Contrast ratio: 3:1 for large text
- ✅ Color not sole means of distinction
- ✅ Keyboard navigation support
- ✅ Screen reader compatible

### Testing
```jsx
// Use tools like:
// - Chrome DevTools (Accessibility panel)
// - axe DevTools
// - WAVE (WebAIM)
// - Lighthouse
```

## Examples

### Example 1: Simple Card
```jsx
export default function SimpleCard() {
  return (
    <div className="transition-theme bg-card rounded-lg border border-border p-6 shadow-lg">
      <h2 className="text-foreground font-semibold mb-2">Card Title</h2>
      <p className="text-muted-foreground mb-4">Card content goes here.</p>
      <button className="transition-theme bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90">
        Learn More
      </button>
    </div>
  );
}
```

### Example 2: Form Input
```jsx
export default function FormInput() {
  return (
    <div className="mb-4">
      <label className="text-foreground font-medium mb-2 block">
        Email Address
      </label>
      <input
        type="email"
        className="transition-theme w-full bg-input text-input-foreground border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter your email"
      />
    </div>
  );
}
```

### Example 3: Status Badge
```jsx
export default function StatusBadge({ status }) {
  const getStatusColor = () => {
    switch(status) {
      case 'success':
        return 'bg-success text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'error':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <span className={`transition-theme px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
      {status}
    </span>
  );
}
```

## Migration Guide

### From Old System to New System
```jsx
// ❌ Old way
<div className="bg-gray-900 text-white border border-gray-700">

// ✅ New way
<div className="transition-theme bg-background text-foreground border border-border">
```

### Batch Migration
1. Search for hardcoded color classes: `bg-gray-*`, `text-white`, etc.
2. Replace with semantic tokens
3. Add `transition-theme` class
4. Test in both themes
5. Verify all styles work correctly

## Support & Resources

### Documentation Files
- `frontend/README.md` - Feature overview
- `FRONTEND_IMPLEMENTATION.md` - Implementation details
- `THEME_GUIDE.md` - This file
- `frontend/src/contexts/ThemeContext.jsx` - Source code
- `frontend/src/index.css` - CSS variables

### Testing Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Complete ✅
