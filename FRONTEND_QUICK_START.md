# Frontend Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation
```bash
cd frontend
npm install
```

### Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🌓 Theme Toggle

### How to Use
1. Click the **Sun/Moon icon** in the top-right corner of the header
2. The entire UI smoothly transitions between dark and light modes
3. Your preference is saved automatically
4. Refresh the page - your theme preference persists!

### Theme Details
- **Dark Mode** (default): Professional dark theme, perfect for long viewing sessions
- **Light Mode**: Clean light theme, ideal for daytime use

## 📁 Key Files

### Theme System
- `frontend/src/contexts/ThemeContext.jsx` - Theme state management
- `frontend/src/index.css` - CSS variables for colors
- `frontend/tailwind.config.js` - Tailwind theme configuration

### Main Components
- `frontend/src/components/Header.jsx` - Top navigation + theme toggle
- `frontend/src/components/Sidebar.jsx` - Left sidebar with agents
- `frontend/src/components/Dashboard.jsx` - Main dashboard area
- `frontend/src/App.jsx` - Root app component

## 🎨 Using the Color System

### For Creating New Components
Always use semantic color tokens:

```jsx
// ✅ Good
<div className="bg-background text-foreground border border-border">
  <button className="bg-primary text-primary-foreground">Click</button>
</div>

// ❌ Wrong
<div className="bg-gray-900 text-white border border-gray-800">
  <button className="bg-blue-600">Click</button>
</div>
```

### Common Color Tokens
- `background` - Page background
- `foreground` - Main text
- `surface` - Card backgrounds
- `primary` - Main action color
- `accent` - Secondary accents
- `border` - Border color
- `muted-foreground` - Secondary text

### Transitions
Always add the transition class:
```jsx
<div className="transition-theme bg-background text-foreground">
  Colors smoothly transition when theme changes
</div>
```

## 📦 Build for Production

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 🐛 Common Issues & Solutions

### Theme Not Changing?
- Ensure you're clicking the Sun/Moon button in the header
- Check browser console for JavaScript errors
- Clear browser cache (Ctrl+Shift+Delete)
- Try a hard refresh (Ctrl+Shift+R)

### Colors Look Wrong?
- Verify you're using semantic tokens (not hardcoded colors)
- Check that `transition-theme` class is applied
- Ensure `index.css` is imported in `main.jsx`
- Check browser DevTools for CSS errors

### Theme Not Saving?
- Ensure localStorage is enabled
- Check browser privacy settings
- Try incognito/private mode
- Clear localStorage and try again

## 📚 Documentation

### Full Guides
1. **FRONTEND_IMPLEMENTATION.md** - Detailed implementation overview
2. **THEME_GUIDE.md** - Complete theme system documentation
3. **frontend/README.md** - Feature overview and component structure

### What Each Document Contains
- **FRONTEND_IMPLEMENTATION.md**: What was built, how it works, file structure
- **THEME_GUIDE.md**: Deep dive into theme system, color tokens, best practices
- **README.md**: Feature list, setup instructions, development info

## ✨ Features Implemented

### ✅ Professional Design
- Premium SaaS aesthetic with modern styling
- Consistent spacing and typography
- Smooth animations and transitions
- Professional color scheme

### ✅ Theme System
- Dark mode (default) with high contrast
- Light mode for daytime usage
- One-click toggle in header
- Persistent user preference
- Smooth 300ms transitions

### ✅ Components
- Header with theme toggle
- Sidebar with agent roster
- Dashboard with metrics
- Chat system for agent communication
- Code preview panels
- All styled with semantic colors

### ✅ Accessibility
- WCAG AA contrast compliance
- Keyboard navigation support
- Screen reader compatible
- Semantic HTML structure

## 🎯 Next Steps

### For Development
1. Review the component files in `frontend/src/components/`
2. Check `ThemeContext.jsx` to understand theme management
3. Use semantic colors in any new components
4. Add `transition-theme` class to all colored elements
5. Test in both dark and light modes

### For Customization
1. Edit color values in `frontend/src/index.css`
2. Modify Tailwind config in `frontend/tailwind.config.js`
3. Update component styles while maintaining semantic tokens
4. Test theme toggle to ensure smooth transitions

### For Production
1. Run `npm run build`
2. Test the production build with `npm run preview`
3. Deploy to your hosting platform
4. Users can toggle theme anytime with the header button

## 📞 Support

### Having Issues?
1. **Check the docs**: Review THEME_GUIDE.md or FRONTEND_IMPLEMENTATION.md
2. **Check console**: Look for JavaScript or CSS errors
3. **Clear cache**: Hard refresh (Ctrl+Shift+R) or clear localStorage
4. **Inspect element**: Use DevTools to check what classes are applied
5. **Review code**: Check component implementation and CSS variables

### Common Patterns
```jsx
// Always use semantic tokens
className="bg-background text-foreground border border-border"

// Always add transition class
className="transition-theme ..."

// Always use theme context for dynamic changes
const { isDark, toggleTheme } = useTheme();
```

## 🎓 Learning Resources

### Understanding the Theme System
1. Read `THEME_GUIDE.md` - Complete guide
2. Check `ThemeContext.jsx` - How theme state works
3. Look at `index.css` - CSS variable definitions
4. Study component examples in `Dashboard.jsx`

### Best Practices
- Use semantic color tokens everywhere
- Test components in both themes
- Add smooth transitions to all colored elements
- Maintain consistent spacing and sizing
- Follow existing component patterns

## 📋 Checklist for New Components

When creating new components, ensure:
- [ ] Using semantic color tokens (not hardcoded colors)
- [ ] `transition-theme` class applied to colored elements
- [ ] Tested in both dark and light modes
- [ ] Good contrast in both themes
- [ ] Following existing component patterns
- [ ] Proper spacing and sizing

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# The project can be deployed directly to Vercel
# which will automatically detect the Vite setup
npm run build
```

### Deploy to Other Platforms
```bash
# Build the production files
npm run build

# The 'dist' folder contains production-ready files
# Upload the contents of 'dist' to your hosting
```

## 💡 Pro Tips

1. **Use DevTools**: Chrome DevTools has excellent theme/color debugging
2. **Test Often**: Toggle theme frequently while developing
3. **Consistent Naming**: Use semantic token names for consistency
4. **Component Reuse**: Build small, reusable components
5. **Document Changes**: Keep notes of any custom styles

---

**Quick Links**:
- 🚀 [Start Dev Server](#installation)
- 🌓 [Learn About Themes](#theme-toggle)
- 📖 [Full Documentation](./FRONTEND_IMPLEMENTATION.md)
- 🎨 [Theme Guide](./frontend/THEME_GUIDE.md)

**Happy Coding! 🎉**
