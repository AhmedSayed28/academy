# Academy Platform — Architecture v1.0

## 1. Purpose

This document defines the technical architecture of the Academy platform.

It describes:

- System structure
- Application boundaries
- Technology choices
- Data flow
- Folder organization
- Backend strategy
- Database strategy
- API conventions
- Security principles
- Testing strategy
- Deployment model
- Future evolution

This document is the primary technical reference for implementation decisions.

---

## 2. Architecture Goals

The architecture should optimize for:

- Simplicity
- Maintainability
- Fast development
- Low operational overhead
- Strong SEO
- Good performance
- Type safety
- Testability
- Future scalability

Academy v1 should avoid unnecessary infrastructure.

The platform must remain simple until product requirements justify additional complexity.

---

## 3. Architectural Style

Academy v1 will use a lightweight modular full-stack architecture.

The platform will initially be implemented as a single Next.js application.

High-level architecture:

```text
                User Browser
                     │
                     ▼
               Next.js Application
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
       UI        Server Logic   API Routes
        │            │            │
        └────────────┴──────┬─────┘
                            │
                            ▼
                     Service Layer
                            │
                            ▼
                    Repository Layer
                            │
                            ▼
                       Supabase
                            │
                            ▼
                      PostgreSQL
```

No separate backend service will be introduced in v1.

---

## 4. Approved Technology Stack

### Frontend

- Next.js
- React
- TypeScript

### Styling

- Tailwind CSS
- shadcn/ui

### Backend

- Next.js Route Handlers
- Server-side application logic

### Database

- PostgreSQL
- Supabase

### Forms

- React Hook Form

### Validation

- Zod

### Testing

- Vitest
- Playwright

### Package Management

- pnpm

### Source Control

- Git
- GitHub

### Deployment

- Vercel

---

## 5. Application Boundaries

The application should be divided into clear logical layers.

### Presentation Layer

Responsible for:

- Rendering pages
- Rendering components
- User interaction
- Responsive design
- Accessibility
- UI state

Examples:

- Homepage
- Course cards
- Navigation
- Contact forms
- Track sections

The presentation layer should not contain direct database queries.

---

### Application / Service Layer

Responsible for:

- Business logic
- Application rules
- Feature orchestration
- Data transformation
- Use-case execution

Examples:

```text
getPublishedCourses()
getFeaturedCourses()
getCourseBySlug()
createLead()
submitContactRequest()
```

---

### Repository Layer

Responsible for:

- Database communication
- Supabase queries
- Persistence
- Data retrieval
- Database-specific mapping

Examples:

```text
courseRepository
trackRepository
leadRepository
instructorRepository
```

The repository layer hides database implementation details from the rest of the application.

---

### Infrastructure Layer

Responsible for external platform integrations.

Examples:

- Supabase
- Email provider
- Analytics
- File storage
- External APIs

These integrations should remain isolated where practical.

---

## 6. Dependency Direction

Dependencies should flow inward.

Preferred flow:

```text
UI
↓
Service
↓
Repository
↓
Infrastructure
```

Avoid:

```text
UI
↓
Supabase
```

or:

```text
Component
↓
Database Query
```

This separation improves:

- Maintainability
- Testing
- Future migration
- Refactoring
- Reusability

---

## 7. Next.js Architecture

The project should use the Next.js App Router.

Suggested structure:

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
├── hooks/
└── schemas/
```

---

## 8. App Router Structure

Initial routes may include:

```text
src/app/

├── page.tsx
├── layout.tsx
├── globals.css
│
├── courses/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
│
├── tracks/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
│
├── instructors/
│   └── page.tsx
│
├── about/
│   └── page.tsx
│
├── contact/
│   └── page.tsx
│
└── api/
    ├── courses/
    │   └── route.ts
    │
    ├── leads/
    │   └── route.ts
    │
    └── contact/
        └── route.ts
```

Routes should remain aligned with actual product requirements.

Do not create empty routes for hypothetical future features.

---

## 9. Server Components Strategy

Server Components should be preferred by default.

They are appropriate for:

- Course listing
- Track listing
- Course details
- Instructor profiles
- SEO-sensitive content
- Initial data loading

Use Client Components only when browser interactivity is required.

Examples:

- Interactive menus
- Forms
- Modals
- Carousels
- Local state
- Browser APIs

Avoid adding:

```text
"use client"
```

to large page trees unnecessarily.

---

## 10. Feature Organization

Complex feature logic should be grouped by feature.

Example:

```text
src/features/courses/

├── components/
│   ├── CourseCard.tsx
│   ├── CourseGrid.tsx
│   └── CourseDetails.tsx
│
├── services/
│   └── course.service.ts
│
├── repositories/
│   └── course.repository.ts
│
├── schemas/
│   └── course.schema.ts
│
├── types/
│   └── course.types.ts
│
└── utils/
```

This approach keeps feature-specific implementation together.

---

## 11. Shared Components

Generic reusable components should live under:

```text
src/components/
```

Possible categories:

```text
src/components/

├── ui/
├── layout/
├── navigation/
└── common/
```

Examples:

- Button
- Container
- Section
- Navbar
- Footer
- EmptyState
- LoadingState

Avoid moving feature-specific components into the global component directory.

---

## 12. Configuration

Application-wide configuration should be centralized.

Recommended directory:

```text
src/config/
```

Possible configuration files:

```text
site.config.ts
navigation.config.ts
theme.config.ts
social.config.ts
```

Example:

```text
siteName
siteDescription
contactEmail
socialLinks
```

Do not scatter reusable configuration throughout the codebase.

---

## 13. Environment Configuration

Environment variables should be used for deployment-specific values.

Example:

```text
NEXT_PUBLIC_APP_NAME
NEXT_PUBLIC_APP_URL

SUPABASE_URL
SUPABASE_SECRET_KEY
```

Sensitive environment variables must only be accessed server-side.

Maintain:

```text
.env.example
```

Never commit real credentials.

---

## 14. Database Architecture

Academy will use PostgreSQL through Supabase.

Initial entities may include:

```text
courses
tracks
instructors
course_instructors
leads
testimonials
faqs
```

The database schema should evolve only when required by product functionality.

### Approved public content source

Phase 11 course, track, and instructor records use the existing validated repository source arrays.
This keeps reviewed launch content server-rendered and avoids introducing a CMS, admin portal, or
database migration before those capabilities are in scope. Non-production environment overrides
remain reserved for synthetic automated-test fixtures and replace, rather than mix with, approved
production records.

Course records may include structured price data (`amount` plus an approved ISO currency), a
truthful start-date label, and explicit track and instructor slugs. Delivery type is optional; the
presentation layer must omit it when the product has not supplied a value. Track detail resolution
includes a related course only when both the track's course-slug list and the course's `trackSlug`
agree.

---

## 15. Initial Domain Relationships

Conceptually:

```text
Track
  │
  └──── has many ──── Course

Course
  │
  └──── belongs to ── Track

Course
  │
  └──── taught by ─── Instructor

Instructor
  │
  └──── teaches ───── Course

Lead
  │
  ├──── interested in Course
  └──── may be interested in Track
```

Actual schema details will be documented in:

```text
docs/DATABASE.md
```

---

## 16. Identifier Strategy

Internal database entities should use stable unique identifiers.

Public-facing content should also have human-readable slugs.

Example:

```text
id:
c0f2...

slug:
software-testing-fundamentals
```

Routes should use slugs rather than database identifiers.

Preferred:

```text
/courses/software-testing-fundamentals
```

Avoid:

```text
/courses/84723
```

for public SEO pages.

---

## 17. Repository Pattern

Database operations should be isolated behind repositories.

Example:

```text
course.repository.ts
```

Responsibilities may include:

```text
findAllPublished()
findFeatured()
findBySlug()
findByTrack()
```

Repositories should not contain presentation logic.

---

## 18. Service Layer

The service layer should orchestrate application behavior.

Example:

```text
course.service.ts
```

Possible operations:

```text
getCourses()
getFeaturedCourses()
getCourseDetails(slug)
```

The service layer may:

- Call repositories
- Apply business rules
- Transform data
- Handle application-level decisions

---

## 19. API Architecture

Academy should expose API routes only where appropriate.

Not every page requires an API endpoint.

Server Components may call services directly on the server.

API endpoints are appropriate for:

- Form submission
- Client-side interactions
- Future third-party integrations
- External consumers

Initial API examples:

```text
GET /api/courses

GET /api/courses/:slug

POST /api/leads

POST /api/contact
```

`POST /api/contact` follows the presentation → contact service → contact repository → Supabase
boundary. The route validates the shared Zod request schema, the service coordinates submission,
and the repository performs an idempotent upsert to `public.contact_messages` using the server-only
Supabase configuration. Database and configuration failures are mapped to a safe
`PERSISTENCE_ERROR` response.

---

## 20. API Response Convention

Success:

```json
{
  "success": true,
  "data": {}
}
```

Failure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data"
  }
}
```

API error messages must not expose:

- Database internals
- Stack traces
- Credentials
- Infrastructure details

---

## 21. Validation Architecture

All user-controlled input must be validated server-side.

Use Zod schemas.

Example flow:

```text
User Form
↓
Client Validation
↓
API
↓
Server Validation
↓
Service
↓
Repository
↓
Database
```

Client-side validation improves UX.

Server-side validation provides security and correctness.

Server validation must never be skipped.

---

## 22. Lead Submission Flow

Example:

```text
Interest Form
     │
     ▼
React Hook Form
     │
     ▼
Zod Client Validation
     │
     ▼
POST /api/leads
     │
     ▼
Zod Server Validation
     │
     ▼
Lead Service
     │
     ▼
Lead Repository
     │
     ▼
PostgreSQL
```

The API returns a predictable response to the UI.

The initial general-interest flow collects full name and email plus optional phone and message.
It intentionally does not require a course or track until approved records can be offered. The
lead repository writes to Supabase's PostgreSQL-backed REST endpoint with a server-only secret
key. Configuration and migration steps are documented in `docs/DATABASE.md`; there is no
in-memory production fallback.

---

## 23. Authentication

Authentication is not required for the initial public website.

Future authentication may use:

```text
Supabase Auth
```

Potential authenticated users:

- Students
- Instructors
- Administrators

Authentication infrastructure should not be implemented until required.

---

## 24. Authorization

When authenticated functionality is introduced, authorization must be implemented server-side.

Possible roles:

```text
ADMIN
INSTRUCTOR
STUDENT
```

UI visibility must never be treated as sufficient authorization.

---

## 25. Security Principles

The project should follow these baseline rules:

- Validate all external input.
- Keep secrets server-side.
- Never expose Supabase secret credentials to the browser.
- Never trust client authorization decisions.
- Sanitize or safely render user content.
- Avoid leaking database errors.
- Use secure environment configuration.
- Use dependency updates responsibly.

Additional security controls should be introduced when required.

---

## 26. Rate Limiting

Public form endpoints may eventually require rate limiting.

Examples:

```text
POST /api/leads
POST /api/contact
```

Rate limiting is not required until the relevant endpoints exist, but should be considered before public production launch.

Spam protection may later include:

- Honeypot fields
- Rate limiting
- CAPTCHA if abuse justifies it

Do not add CAPTCHA by default unless needed.

---

## 27. Styling Architecture

Use Tailwind CSS.

Reusable UI primitives should use shadcn/ui where suitable.

Styling should follow shared design tokens.

Avoid repeating hardcoded colors.

---

## 28. Theme Tokens

Initial semantic tokens should represent:

```text
primary
secondary
accent
background
foreground
muted
border
success
warning
destructive
```

Brand colors:

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

Implementation details should remain centralized.

---

## 29. Responsive Architecture

The UI should follow a mobile-first approach.

Primary breakpoints should use Tailwind defaults unless there is a strong reason to customize them.

Pages must work on:

- Mobile
- Tablet
- Laptop
- Desktop

Responsive behavior is part of feature completion.

---

## 30. SEO Architecture

SEO is a first-class technical concern.

Public pages should support:

- Static or server-rendered content
- Metadata
- Canonical URLs
- Semantic HTML
- Meaningful headings
- Open Graph metadata
- Sitemap
- robots.txt

Course URLs:

```text
/courses/{slug}
```

Track URLs:

```text
/tracks/{slug}
```

Avoid putting core SEO content exclusively behind client-side rendering.

---

## 31. Metadata

Each important public page should define meaningful metadata.

Examples:

```text
title
description
openGraph
twitter
```

Dynamic course pages should generate metadata using course content where appropriate.

`NEXT_PUBLIC_APP_URL` is the single validated canonical origin. It must be the production origin
in both Vercel Production and Preview so preview pages never declare themselves canonical.
Static metadata uses a shared metadata factory; dynamic course and track metadata continues to
cross the published-content service boundary before exposing a canonical URL.

Next.js metadata routes provide `/sitemap.xml` and `/robots.txt`. The sitemap consumes published
course and track services and does not infer timestamps. Preview deployments use `VERCEL_ENV` to
emit a site-wide no-index policy in both root metadata and `robots.txt`; Vercel supplies an
additional `X-Robots-Tag: noindex` policy for preview deployment responses.

---

## 32. Performance Strategy

Prefer server rendering where suitable.

Avoid unnecessary JavaScript sent to clients.

Optimize:

- Images
- Fonts
- Client bundles
- Third-party scripts
- Network requests

Do not add libraries simply for small convenience functions.

---

## 33. Image Handling

Use Next.js Image where appropriate.

Images should:

- Have appropriate dimensions
- Avoid layout shift
- Use responsive sizes
- Use meaningful alt text

External image domains must be explicitly configured.

---

## 34. Caching

Caching should remain simple initially.

Use framework-native caching behavior where appropriate.

Potentially cache:

- Published courses
- Tracks
- Instructor profiles

Dynamic operations such as lead submission must never be cached.

Caching strategy may evolve when real traffic patterns are available.

---

## 35. Error Handling

Application errors should be categorized where useful.

Examples:

```text
VALIDATION_ERROR
NOT_FOUND
DATABASE_ERROR
UNAUTHORIZED
FORBIDDEN
INTERNAL_ERROR
```

Users should receive clear, non-technical messages.

Internal logs may contain more technical context.

---

## 36. Loading States

Interactive or asynchronous operations should provide explicit feedback.

Examples:

- Loading
- Saving
- Submission success
- Submission failure

Buttons should prevent accidental duplicate submissions where relevant.

---

## 37. Empty States

Pages and sections should handle empty data gracefully.

Example:

If there are no upcoming courses, show a meaningful message instead of a blank section or error.

---

## 38. Analytics

Analytics may be added when the public website is ready.

Potential metrics include:

- Page views
- Course views
- CTA clicks
- Lead submissions
- WhatsApp clicks
- Conversion rate

Analytics implementation must not block initial development.

---

## 39. Logging

Server-side failures should be logged appropriately.

Avoid uncontrolled logging.

Remove debug output before production.

Future structured logging may be introduced when operational needs justify it.

---

## 40. Testing Architecture

Testing should focus on meaningful behavior.

### Unit Tests

Use Vitest.

Suitable targets:

- Zod schemas
- Utilities
- Business rules
- Data transformations
- Services

---

### End-to-End Tests

Use Playwright.

Initial critical flows may include:

```text
Visitor opens homepage

Visitor browses courses

Visitor opens course details

Visitor submits interest form

Visitor submits contact form
```

---

## 41. Test Data

Tests should use predictable data.

Avoid relying on production data.

Future database-integrated tests should use:

- Isolated test data
- Test environments
- Controlled fixtures

---

## 42. Build Validation

Before merging significant code, run:

```bash
pnpm lint
pnpm test
pnpm build
```

When E2E functionality is affected:

```bash
pnpm test:e2e
```

---

## 43. Deployment Architecture

Initial deployment:

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Next.js Application
   │
   ▼
Supabase
```

Vercel will host the web application.

Supabase will host:

- PostgreSQL
- Future authentication
- Future storage

---

## 44. Environments

Recommended environments:

```text
Local
Preview
Production
```

Later, if needed:

```text
Development
Staging
Production
```

Do not create unnecessary environment complexity during early development.

The current environment requirements and deployment verification procedure are documented in
[`DEPLOYMENT.md`](DEPLOYMENT.md).

---

## 45. GitHub Workflow

Recommended branch model:

```text
main
│
├── feature/project-setup
├── feature/home-hero
├── feature/course-list
└── feature/contact-form
```

Each feature should have its own branch and focused pull request.

---

## 46. CI/CD

Initial CI may validate:

```text
Install
↓
Lint
↓
Unit Tests
↓
Build
```

E2E testing may be added to CI when stable test environments exist.

Deployment may be triggered from merged branches using Vercel integration.

---

## 47. Architecture Decision: No Separate Backend

Academy v1 will not use:

- Spring Boot
- .NET API
- NestJS
- Express
- Hono
- Dedicated API servers

The initial backend will remain inside the Next.js application.

Reasons:

- Lower complexity
- Faster delivery
- Shared TypeScript ecosystem
- Lower deployment overhead
- Sufficient capability for v1 requirements

A dedicated backend may be introduced later if justified by actual product needs.

---

## 48. Architecture Decision: No Microservices

Microservices are explicitly out of scope.

The initial system does not require independent services.

Avoid:

```text
Course Service
Student Service
Payment Service
Instructor Service
```

as separate deployed applications.

Use logical modules within the same application instead.

---

## 49. Architecture Decision: PostgreSQL

PostgreSQL is the primary database.

Reasons include:

- Strong relational capabilities
- Mature ecosystem
- Good support for structured educational data
- Supabase integration
- Future reporting flexibility

---

## 50. Architecture Decision: Supabase

Supabase will initially provide managed PostgreSQL.

Potential future usage:

- Authentication
- Storage
- Realtime capabilities if needed

Do not adopt Supabase-specific functionality unless it provides clear value.

The application architecture should avoid unnecessary vendor lock-in.

---

## 51. Future Admin Portal

The future admin interface may initially exist inside the same application.

Example:

```text
/admin
```

It may later become a separate application only if product or organizational requirements justify it.

Do not create a separate admin application during v1.

---

## 52. Future LMS Evolution

When Academy evolves into an LMS, additional domains may appear:

```text
Users
Enrollments
Lessons
Course Content
Assignments
Quizzes
Progress
Certificates
Payments
```

These features should be introduced incrementally.

Existing public academy functionality should remain independent from unnecessary LMS complexity.

---

## 53. Future Architecture Evolution

The architecture may eventually evolve into:

```text
Frontend
   │
   ▼
Dedicated Backend
   │
   ▼
PostgreSQL
```

or additional supporting services.

Such changes must be driven by measurable needs such as:

- Complex business logic
- Multiple clients
- High API usage
- Background processing
- Large-scale integrations
- Organizational team boundaries

Do not migrate architecture based solely on hypothetical scale.

---

## 54. Architecture Review Rule

Any change introducing one of the following should require explicit architecture review:

- New major framework
- Separate deployed service
- New database technology
- Authentication provider
- Payment provider
- Queue system
- Search engine
- Background worker
- New cloud provider
- Large third-party dependency

The reason and tradeoffs should be documented before implementation.

---

## 55. Architecture Principles Summary

Academy architecture should follow these principles:

1. Start simple.
2. Prefer platform-native capabilities.
3. Separate UI, business logic, and data access.
4. Use Server Components by default.
5. Use TypeScript strictly.
6. Validate all external input.
7. Keep public content SEO-friendly.
8. Keep dependencies minimal.
9. Test critical behavior.
10. Scale architecture only when real requirements demand it.

---

## 56. Current Architecture Status

Current architecture:

```text
Status:
Approved for Academy v1

Application Style:
Modular full-stack monolith

Frontend:
Next.js

Backend:
Next.js server functionality and Route Handlers

Database:
Supabase PostgreSQL

Deployment:
Vercel

Architecture Complexity:
Low

Primary Goal:
Fast, maintainable MVP delivery
```

---

## 57. Localization Architecture

Academy uses the Next.js App Router's built-in dynamic locale segment instead of an internationalization dependency. Public pages live below `app/[locale]`, with `ar` and `en` as the only valid locale values. The root and legacy unprefixed routes redirect permanently to their Arabic equivalents; API routes remain unprefixed.

Typed dictionaries in `src/i18n/translations.ts` own visible copy. Stable record identifiers, slugs, prices, publication state, relationships, and validation/business behavior remain language-neutral. Localized content adapters combine those two layers at the server-rendered page boundary. Client forms receive translated labels and validation messages while continuing to submit the same payloads and interpret stable API error codes.

Metadata is generated per locale with a self-referencing canonical, reciprocal `ar`/`en` alternates, and an Arabic `x-default`. The sitemap lists only localized canonical routes. No browser-language detection or locale cookie is used, so an explicitly selected English URL remains English.
