README.md
# TSK – Kanban CRM Board for Tax Advisory Client Onboarding

A Kanban-style CRM board built for the client onboarding process at a tax advisory firm. Designed for internal teams to track new mandates from first inquiry through full onboarding.

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | React 18 + TypeScript | Type safety, component architecture, industry standard |
| Build Tool | Vite | Fast HMR, minimal config, modern ES modules |
| Styling | Pure CSS (custom properties) | Full control over branding, no dependency bloat, easy to customize |
| Drag & Drop | HTML5 native DnD API | Zero-dependency, sufficient for column-to-column moves |
| State | React useState | Simple enough for client-side-only state; no Redux needed |

**Why no UI library?** The brief asks for a design that matches a specific brand identity. Using Material UI or Tailwind would fight against that goal. Custom CSS with design tokens gives full control.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app runs at `http://localhost:5173` by default.

## Project Structure

```
src/
├── main.tsx                # React entry point
├── App.tsx                 # Root component with state management
├── types.ts               # TypeScript interfaces
├── data.ts                # Phase definitions, sample data, team members
├── components/
│   ├── Board.tsx           # Horizontal board layout
│   ├── Column.tsx          # Phase column with drop zone
│   ├── Card.tsx            # Draggable client card
│   ├── CardModal.tsx       # Full detail view / edit modal
│   └── AddCardForm.tsx     # Inline form to add new clients
└── styles/
    └── index.css           # All styles with CSS custom properties
```

## Features

- **7 onboarding phases** reflecting the real tax advisory workflow (German labels)
- **Drag & drop** between columns – smooth, no page reload
- **Card detail modal** – click any card to see full info or edit
- **Inline add** – add a new client directly within any column
- **Status indicators** – Urgent, Normal, Waiting, VIP with color coding
- **Responsive** – horizontally scrollable board on smaller screens
- **Professional design** – dark navy + gold accent palette, Inter typography

## Design Decisions

### Onboarding Phases
The phases map to how a German Steuerberatung actually onboards clients:
1. **Neue Anfrage** – Lead comes in (website, referral, phone)
2. **Erstgespräch geplant** – Initial consultation scheduled
3. **Unterlagen angefordert** – Document checklist sent to client
4. **Unterlagen erhalten** – Documents complete, internal review
5. **Mandatsvertrag versendet** – Engagement letter / Mandatsvertrag sent
6. **Unterschrieben & Aktiv** – Fully onboarded, active mandate
7. **Pausiert** – On hold (vacation, unresponsive, etc.)

### Branding
- Navy (#1B2B4B) primary with gold (#E8C47C) accents
- Inter font family for clean, professional readability
- Subtle shadows and rounded corners for a modern but trustworthy feel
- No generic SaaS colors – designed to feel bespoke

## What I'd Improve With More Time

1. **Persistence** – Add a backend (Node + PostgreSQL or Supabase) for real data storage
2. **Authentication** – Login per team member, role-based access
3. **Activity log** – Track when cards move between phases, who made changes
4. **Search & filter** – Filter by team member, mandate type, status
5. **Due dates & reminders** – Deadline tracking with notification system
6. **File attachments** – Upload documents directly to client cards
7. **Keyboard shortcuts** – Power-user efficiency (e.g., quick-add with Ctrl+N)
8. **Animations** – Framer Motion for smoother drag transitions
9. **Mobile view** – Stacked column view for phone/tablet use
10. **Tests** – Unit tests with Vitest + React Testing Library

## Workflow & Tools

- Built with VS Code + GitHub Copilot
- React + TypeScript for type-safe component architecture
- Pure CSS approach for full brand control
- HTML5 Drag and Drop for zero-dependency interactions
- German UI labels to match the actual use case and target audience