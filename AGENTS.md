# AGENTS.md

## 1. Purpose

This document defines the engineering rules that AI coding agents must follow when working on the Academy project.

All agents must read this document before making any code changes.

The project documentation is the source of truth.

Before implementing a feature, read relevant documents inside:

`/docs`

At minimum, review:

- PROJECT_VISION.md
- ARCHITECTURE.md
- UI_GUIDELINES.md
- FEATURES.md

Do not invent product requirements when documentation already defines the expected behavior.

---

## 2. Project Context

Academy is a technology education platform.

Academy v1 focuses on:

- Public marketing website
- Technology learning tracks
- Course discovery
- Course details
- Instructors
- Lead generation
- Contact functionality
- SEO

Academy v1 is NOT a full LMS.

Do not introduce LMS functionality unless explicitly requested.

---

## 3. Approved Technology Stack

Use the following technologies.

### Application

- Next.js
- React
- TypeScript

### Styling

- Tailwind CSS
- shadcn/ui

### Backend

- Next.js Route Handlers

### Database

- PostgreSQL through Supabase

### Forms

- React Hook Form

### Validation

- Zod

### Testing

- Vitest
- Playwright

### Package Manager

- pnpm

### Deployment

- Vercel

Do not replace or add major frameworks unless explicitly requested.

---

## 4. Architecture Rules

Follow a simple layered architecture.

Preferred dependency direction:

UI

↓

Feature / Service Layer

↓

Repository / Data Access Layer

↓

External services / Supabase

### UI Layer

Responsible for:

- Rendering
- User interaction
- Client-side presentation
- Calling application services

UI components must not contain database logic.

---

### Service Layer

Responsible for:

- Business rules
- Application logic
- Use-case orchestration

Keep service logic independent from presentation whenever possible.

---

### Data Layer

Responsible for:

- Database communication
- Supabase interaction
- Data mapping
- Queries

Do not expose database implementation details directly to UI components.

---

## 5. Project Structure

Prefer the following structure.

```text
src/
├── app/
├── components/
├── features/
├── lib/
├── services/
├── repositories/
├── types/
├── config/
└── hooks/

tests/
├── unit/
└── e2e/

docs/
```

Do not create unnecessary folders.

Do not introduce a new architectural pattern without clear justification.

---

## 6. Feature Organization

Feature-specific code should be colocated where practical.

Example:

```text
features/
└── courses/
    ├── components/
    ├── services/
    ├── repositories/
    ├── schemas/
    ├── types/
    └── utils/
```

Reusable generic components should live under:

`src/components`

Feature-specific components should remain inside their feature.

---

## 7. TypeScript Rules

Use TypeScript strictly.

Avoid:

```text
any
```

unless there is an exceptional technical reason.

Prefer:

- Explicit interfaces
- Type aliases
- Typed API responses
- Typed component props
- Typed service responses

Do not suppress TypeScript errors without justification.

---

## 8. Component Rules

Components should be:

- Small
- Focused
- Reusable where appropriate
- Easy to test
- Easy to understand

Avoid giant components containing:

- API calls
- Business logic
- UI logic
- Form validation
- Data transformations

all in one file.

Break responsibilities into appropriate modules.

---

## 9. Server and Client Components

Use Server Components by default when possible.

Only add:

```text
"use client"
```

when required for:

- Browser APIs
- State
- Event handlers
- Client-only libraries
- Interactive UI

Do not convert components into Client Components unnecessarily.

---

## 10. API Rules

API routes should follow REST-like naming where appropriate.

Example:

```text
GET /api/courses

GET /api/courses/:slug

POST /api/leads

POST /api/contact
```

API responses should use predictable structures.

Example:

```json
{
  "success": true,
  "data": {}
}
```

Error example:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data"
  }
}
```

Do not leak:

- Database errors
- Stack traces
- Sensitive information

to clients.

---

## 11. Validation Rules

All external input must be validated.

Use Zod for:

- Forms
- API payloads
- Environment validation
- External data where appropriate

Validation should exist on the server even when client-side validation exists.

Never trust client input.

---

## 12. Database Rules

Database access should be abstracted through repository or data-access modules.

Avoid direct Supabase queries inside UI components.

Bad:

```text
CourseCard
→ Supabase query
```

Preferred:

```text
CourseCard
→ Course Service
→ Course Repository
→ Supabase
```

---

## 13. Environment Variables

Never hardcode:

- Secrets
- API keys
- URLs that belong in configuration
- Database credentials

Use environment variables.

Maintain:

`.env.example`

Never commit real secrets.

---

## 14. Styling Rules

Use Tailwind CSS for styling.

Use shadcn/ui primitives where they provide value.

Do not mix multiple styling systems without justification.

Avoid:

- Inline styles
- Hardcoded repeated color values
- Random spacing values
- Duplicate styling patterns

Use reusable design tokens.

---

## 15. Design Tokens

Use centralized theme variables for colors.

Initial theme:

```text
Primary
#6366F1

Secondary
#8B5CF6

Accent
#22D3EE

Dark
#0F172A

Background
#F8FAFC

Text
#1E293B

Muted
#64748B
```

Components should consume semantic tokens instead of repeating hexadecimal values.

Example:

Prefer:

```text
bg-primary
text-muted
```

instead of:

```text
bg-[#6366F1]
```

everywhere.

---

## 16. Responsive Design

All UI implementation must support:

- Mobile
- Tablet
- Desktop

Do not implement desktop-only interfaces.

Use mobile-first responsive design.

Check:

- Overflow
- Navigation
- Cards
- Forms
- Text readability
- Touch targets
- Images

---

## 17. Accessibility

Use semantic HTML whenever possible.

All relevant interactive elements must support accessibility.

Requirements include:

- Buttons must be buttons
- Inputs must have labels
- Images must have appropriate alt text
- Keyboard navigation must work
- Focus states must remain visible
- Color contrast must remain readable

Do not use clickable `div` elements when semantic elements exist.

---

## 18. SEO Rules

SEO is a core product requirement.

Public pages should use:

- Semantic page structure
- Metadata
- Page titles
- Meta descriptions
- Meaningful URLs
- Appropriate headings
- Open Graph metadata where relevant

Prefer server-rendered content for SEO-critical pages.

---

## 19. Performance Rules

Avoid unnecessary dependencies.

Before adding a package, determine whether the existing stack already solves the problem.

Avoid:

- Large client bundles
- Unnecessary client-side state
- Unoptimized images
- Excessive JavaScript
- Duplicate network requests

Use Next.js platform capabilities when appropriate.

---

## 20. Image Rules

Use Next.js image optimization where appropriate.

Images should define dimensions or layout behavior to reduce layout shift.

Do not include unnecessarily large assets.

---

## 21. Forms

Use:

- React Hook Form
- Zod

Forms should handle:

- Loading state
- Validation errors
- Server errors
- Successful submission
- Disabled submission when processing

Do not allow accidental multiple form submissions.

---

## 22. Error Handling

Errors should be handled intentionally.

Users should receive useful feedback.

Do not silently fail.

Log technical information appropriately while showing user-friendly messages to the user.

---

## 23. Logging

Avoid unnecessary console logging.

Remove debug logs before completion.

Production-facing code should not contain:

```text
console.log
```

unless intentionally required.

---

## 24. Testing Rules

Add tests proportional to the feature risk.

### Unit Tests

Use Vitest for:

- Business logic
- Utilities
- Validation
- Data transformation

### E2E Tests

Use Playwright for critical flows.

Examples:

- Browse courses
- Open course details
- Submit interest form
- Submit contact form

Do not create meaningless tests simply to increase test count.

---

## 25. Required Checks

Before considering a task complete, run:

```bash
pnpm lint
pnpm test
pnpm build
```

If E2E tests are relevant:

```bash
pnpm test:e2e
```

Do not declare a task complete while required checks are failing.

---

## 26. Code Quality

Prefer clarity over cleverness.

Avoid:

- Overengineering
- Premature abstractions
- Deep inheritance
- Duplicate logic
- Huge utility files
- Magic values
- Hidden side effects

Use descriptive naming.

Code should be understandable without excessive comments.

---

## 27. Dependency Rules

Do not add dependencies without a real need.

Before installing a library:

1. Check whether Next.js already supports the requirement.
2. Check whether React already supports it.
3. Check whether the project already contains a suitable dependency.
4. Consider implementation cost and bundle impact.

If a new dependency is added, explain why.

---

## 28. Git Rules

Each feature should use a dedicated branch.

Examples:

```text
feature/project-setup

feature/home-hero

feature/course-list

feature/course-details

feature/contact-form
```

Keep pull requests focused.

Avoid mixing unrelated features in one branch.

---

## 29. Scope Discipline

Implement only the requested task.

Do not expand scope by adding unrelated:

- Features
- Packages
- Pages
- APIs
- Infrastructure

Minor refactoring is acceptable only when required for the requested implementation.

---

## 30. Product Decisions

Do not make major product decisions independently.

If requirements are unclear:

Prefer existing documentation and project conventions.

If a reasonable implementation assumption is required, keep it minimal and report it in the completion summary.

---

## 31. Documentation

When implementation changes architecture, configuration, API behavior, or product behavior, update relevant documentation.

Possible documents include:

- PROJECT_VISION.md
- ARCHITECTURE.md
- FEATURES.md
- API.md
- DATABASE.md
- UI_GUIDELINES.md

Documentation and implementation should not contradict each other.

---

## 32. Definition of Done

A task is considered complete only when applicable requirements are satisfied.

Checklist:

- Feature requirements implemented
- Acceptance criteria satisfied
- TypeScript passes
- Lint passes
- Build passes
- Tests pass
- Responsive behavior checked
- Accessibility considered
- SEO considered
- No unnecessary dependencies
- No debug code
- No exposed secrets
- No obvious duplicated logic
- Error states handled
- Loading states handled
- Documentation updated when necessary

---

## 33. Completion Output

After completing a task, provide a concise summary containing:

### Summary

What was implemented.

### Files Created

List new files.

### Files Modified

List modified files.

### Tests

Explain tests added or executed.

### Validation

Report results of:

```text
pnpm lint
pnpm test
pnpm build
```

### Assumptions

List any assumptions made.

### Remaining Issues

List anything intentionally not completed.

If there are no remaining issues, explicitly state:

```text
None.
```

---

## 34. Core Engineering Principle

Keep Academy simple until product requirements justify complexity.

Do not build infrastructure for hypothetical future requirements.

Build clean foundations that allow future expansion without prematurely implementing that future.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
