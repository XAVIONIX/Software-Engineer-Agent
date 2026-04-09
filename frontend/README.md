# AI Software Engineer V2 - Frontend

A professional, production-grade frontend for a SaaS platform where multiple AI agents collaborate like a real software development team.

## Features

### 🎨 Professional Design System
- **Premium SaaS Aesthetic**: Clean, minimal design with smooth animations and professional styling
- **Modern Component Library**: Built with React and Tailwind CSS for rapid development
- **Responsive Layout**: Fully responsive design that works seamlessly on all screen sizes
- **Glassmorphism Elements**: Subtle glass-effect cards and overlays for a sophisticated look

### 🌓 Theme Toggle (Dark & Light Mode)
- **Dark Mode (Default)**: Premium dark theme optimized for extended viewing and reduced eye strain
- **Light Mode**: Clean, professional light theme for daytime use
- **Persistent Storage**: Theme preference is saved to localStorage and persists across sessions
- **Smooth Transitions**: All colors smoothly transition between themes for a polished experience
- **Toggle Button**: Easy-to-access theme toggle in the header with Sun/Moon icons

### 🏗️ Application Layout

#### Header
- Xavionix branding with gradient logo
- Project status indicator (Building/Planning/Reviewing/Completed)
- Export Project button for downloading generated code
- Theme toggle button (Sun/Moon icon)
- Settings and Profile buttons

#### Left Sidebar
- Navigation tabs: Dashboard, Projects, Active Session, History, Agents
- Agent Roster showing all AI team members with:
  - Status indicators (Idle, Thinking, Working, Reviewing)
  - Real-time activity updates
  - Click to view agent details
- Team Pulse metrics showing:
  - Active agents count
  - Total roles available
  - Direct chat access button

#### Main Dashboard
- Executive Command Center overview
- Real-time status indicators
- Agent team statistics
- Project pipeline with:
  - Project status badges
  - Progress bars
  - Team assignments
  - Due dates
- Platform summary with:
  - Active users
  - API requests per hour
  - Design reviews count
- Agent health monitoring showing:
  - Active agents
  - Idle agents

#### Agent Chat System
- Modal chat interface for direct agent communication
- Message history with timestamps
- Agent-specific filtering
- Real-time message updates

### 🚀 Core Features

#### AI Agent Team
The platform simulates a real engineering team with the following roles:
- Orchestrator (Team Lead)
- Project Manager
- Planner
- Frontend Engineer
- Backend Engineer
- Database Designer
- Integrator
- DevOps
- QA Tester
- Code Reviewer
- UI/UX Designer

#### Real-Time Simulation
- Agent activity simulation with status changes
- Automated message generation
- Live status updates every 3 seconds
- Visual indicators for agent workload

#### Code & Architecture Panels
- Frontend code preview
- Backend code preview
- Database schema visualization
- File explorer integration

## Design Tokens

The application uses a comprehensive CSS variable system for consistent theming:

### Colors
- **Primary**: Green (#6FD86F) - Main accent color for actions and highlights
- **Accent**: Blue (#96CFEF) - Secondary accent for special elements
- **Success**: Green (#6FD86F) - Positive actions and confirmations
- **Warning**: Orange - Attention-requiring information
- **Destructive**: Red - Dangerous or destructive actions

### Typography
- **Sans-serif Font**: For headers and UI labels (1 primary font)
- **Line Height**: 1.4-1.6 for optimal readability
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## Development

### Tech Stack
- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, consistent icon set
- **Vite**: Fast build tool and dev server

### Running the Development Server
```bash
cd frontend
npm install
npm run dev
```

The app will start at `http://localhost:5173`

### Building for Production
```bash
npm run build
npm run preview
```

## Theme Implementation

### How the Theme Works
1. **ThemeContext**: Central context provider manages dark/light mode state
2. **CSS Variables**: All colors use CSS custom properties defined in `index.css`
3. **HTML Class**: Dark/light classes on the `<html>` element control which variables are active
4. **LocalStorage**: User preference is persisted across sessions
5. **Smooth Transitions**: `transition-theme` class provides smooth color transitions

### Using the Theme in Components
All components use semantic CSS variable names:
```tailwind
bg-background      /* Page background */
bg-card            /* Card backgrounds */
text-foreground    /* Primary text */
text-muted-foreground  /* Secondary text */
bg-primary         /* Primary button/accent */
text-primary-foreground  /* Text on primary bg */
border-border      /* Border colors */
```

## Component Structure

### Main Components
- **App.jsx**: Root application component with theme provider
- **Header.jsx**: Top navigation with theme toggle
- **Sidebar.jsx**: Left navigation and agent roster
- **Dashboard.jsx**: Main content area with metrics and projects
- **AgentCard.jsx**: Individual agent status card
- **ChatPanel.jsx**: Agent chat interface
- **MessageBubble.jsx**: Individual message display
- **ChatInput.jsx**: Message input form

### Supporting Files
- **ThemeContext.jsx**: Theme state management
- **mockData.js**: Simulated data for agents, projects, and messages

## Styling Guidelines

### Color Usage
- Primary color for main CTAs and active states
- Accent color for secondary interactions
- Success/Warning/Destructive for semantic meaning
- Muted for disabled or secondary information

### Spacing
- Use Tailwind spacing scale (p-4, m-2, gap-4, etc.)
- Never use arbitrary values like `p-[16px]`
- Use `gap` classes for spacing between flex/grid items

### Responsive Design
- Mobile-first approach with `md:`, `lg:`, `xl:` breakpoints
- Use `flex` for 1D layouts
- Use `grid` only for complex 2D layouts
- Test on multiple screen sizes

## Performance

- Smooth 300ms transitions between theme changes
- Optimized Tailwind CSS output
- Efficient re-renders with React hooks
- Lightweight icon set with Lucide
- No unnecessary animations on load

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Project creation and management
- [ ] Real backend integration
- [ ] WebSocket support for live updates
- [ ] Code preview and syntax highlighting
- [ ] Export to various formats
- [ ] Team collaboration features
- [ ] Analytics dashboard
