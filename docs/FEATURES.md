# Academy Platform — Features v1.0

## 1. Purpose

This document defines the functional scope of Academy v1.

It describes the features that should be implemented in the first public version of the platform.

The document is intended to be used by:

- Product
- Engineering
- QA
- AI coding agents
- Future contributors

Academy v1 focuses on:

- Brand presence
- Course discovery
- Learning track discovery
- Instructor credibility
- Lead generation
- Contact and conversion

Academy v1 is not a full Learning Management System.

---

## 2. Scope Classification

Features are classified into:

### Must Have

Required for the first public release.

### Should Have

Important features that should be included if they do not delay the initial release significantly.

### Could Have

Useful improvements that may be included later.

### Out of Scope

Explicitly excluded from Academy v1.

---

# 3. Public Website Features

## FEAT-001 — Global Navigation

### Priority

Must Have

### Description

The platform should provide a consistent main navigation across public pages.

### Navigation Items

Initial navigation:

- Home
- Courses
- Tracks
- Instructors
- About
- Contact

### Primary CTA

Recommended:

`Explore Courses`

or

`Browse Courses`

### Requirements

- Visible on desktop
- Responsive mobile menu
- Keyboard accessible
- Current page state should be understandable where appropriate
- Logo should navigate to homepage
- Primary CTA should remain visually distinguishable

### Acceptance Criteria

- User can navigate between all major public pages.
- Navigation works correctly on desktop and mobile.
- Mobile menu opens and closes correctly.
- Navigation does not overflow on common screen sizes.
- Interactive elements support keyboard navigation.
- Logo links to `/`.

---

## FEAT-002 — Homepage Hero

### Priority

Must Have

### Description

The homepage should clearly communicate the academy's value proposition.

### Content

The hero should include:

- Optional eyebrow or badge
- Primary headline
- Supporting description
- Primary CTA
- Secondary CTA
- Technology-oriented visual

### Primary User Question

The hero should answer:

- What is Academy?
- Who is it for?
- Why is it valuable?
- What should I do next?

### Acceptance Criteria

- Main value proposition is visible without scrolling on common desktop screens.
- Hero adapts correctly to mobile.
- Primary CTA is visually dominant.
- Secondary CTA does not compete with the primary CTA.
- Hero visual does not significantly harm page performance.
- Heading hierarchy contains only one primary H1 for the page.

---

## FEAT-003 — Learning Tracks Preview

### Priority

Must Have

### Description

The homepage should present available technology learning tracks.

### Initial Tracks

Potential tracks:

- Software Testing
- Frontend Development
- Backend Development
- Artificial Intelligence
- DevOps
- Data Engineering
- Cybersecurity
- Mobile Development

### Track Card Content

May include:

- Track name
- Short description
- Icon
- Skills summary
- Number of courses
- CTA

### Acceptance Criteria

- Tracks are easy to scan.
- User can navigate from a track card to its detail page when available.
- Cards work correctly across mobile, tablet, and desktop layouts.
- Track information is not hardcoded directly inside reusable UI components.

---

## FEAT-004 — Featured Courses

### Priority

Must Have

### Description

The homepage should display a curated selection of featured courses.

### Course Card Content

May include:

- Course title
- Track
- Short description
- Level
- Duration
- Delivery method
- Instructor
- Availability status

### Actions

Primary action:

`View Course`

### Acceptance Criteria

- Featured courses are clearly distinguishable.
- Course cards link to valid course detail pages.
- Course cards remain visually consistent.
- Missing optional information does not break layout.
- Cards are responsive.

---

## FEAT-005 — Why Academy Section

### Priority

Should Have

### Description

The homepage should communicate the platform's core differentiators.

Potential themes:

- Practical learning
- Real-world projects
- Industry-focused content
- Structured career paths
- Experienced instructors

### Acceptance Criteria

- Section contains concise differentiators.
- Content avoids generic unsupported claims.
- Visual design remains consistent with the overall design system.

---

## FEAT-006 — Learning Experience / Journey

### Priority

Should Have

### Description

Explain how a learner moves through the Academy experience.

Example journey:

```text
Choose Track
↓
Learn Fundamentals
↓
Practice
↓
Build Projects
↓
Develop Career Skills
```

### Acceptance Criteria

- Learning journey is easy to understand.
- Layout works on both horizontal desktop and vertical mobile presentation.
- Steps remain ordered correctly.

---

## FEAT-007 — Instructor Preview

### Priority

Should Have

### Description

Highlight selected instructors on the homepage.

### Content

May include:

- Photo
- Name
- Role
- Main expertise
- Relevant course or track

### Acceptance Criteria

- Instructor information is readable.
- Photos maintain consistent sizing.
- Missing optional links do not affect layout.
- Cards can link to an instructor page if one exists.

---

## FEAT-008 — Testimonials

### Priority

Should Have

### Description

Display authentic learner feedback.

### Content

Potential fields:

- Learner name
- Feedback
- Course or track
- Optional image

### Acceptance Criteria

- Testimonials are readable.
- Section handles fewer testimonials gracefully.
- Long feedback does not destroy card layout.
- Testimonials are not invented by the application.

---

## FEAT-009 — Upcoming Courses

### Priority

Should Have

### Description

Display courses or cohorts expected to start soon.

### Potential Content

- Course name
- Start date
- Enrollment state
- Delivery type
- CTA

### Acceptance Criteria

- Upcoming courses are clearly identified.
- Empty state is shown when no upcoming courses exist.
- Expired courses should not appear as upcoming.

---

## FEAT-010 — FAQ Preview

### Priority

Should Have

### Description

The homepage may display frequently asked questions.

Potential topics:

- Course delivery
- Prerequisites
- Certification
- Scheduling
- Enrollment
- Payments

### Acceptance Criteria

- FAQ interaction is accessible.
- Accordion behavior works correctly where used.
- User can clearly identify questions and answers.
- Keyboard interaction works where appropriate.

### Implementation

Implemented as a shared, server-rendered FAQ list using native disclosure semantics. The homepage
shows a four-question preview with a link to `/faq`, while the full FAQ page covers Academy's
purpose, learning approach, course and track discovery, general-interest registration, and contact
flow. Answers are limited to documented or implemented behavior and direct visitors to published
course information or `/contact` when details vary.

---

## FEAT-011 — Final Homepage CTA

### Priority

Must Have

### Description

The homepage should end with a strong conversion section.

Potential CTA:

`Explore Courses`

or

`Register Your Interest`

### Acceptance Criteria

- CTA clearly communicates the next action.
- CTA is visible and functional.
- Section remains readable on mobile.

---

# 4. Courses Features

## FEAT-020 — Courses Listing Page

### Priority

Must Have

### Route

```text
/courses
```

### Description

Users should be able to browse available courses.

### Course Information

Each course may expose:

- Title
- Slug
- Short description
- Track
- Level
- Duration
- Delivery type
- Instructor
- Availability
- Image or visual

### Acceptance Criteria

- Published courses appear on the page.
- Unpublished courses are not exposed publicly.
- Course cards link to correct detail pages.
- Page supports responsive layouts.
- Empty state exists when no courses are available.
- Course titles use semantic heading hierarchy.

---

## FEAT-021 — Course Detail Page

### Priority

Must Have

### Route

```text
/courses/{slug}
```

### Description

Each published course should have an SEO-friendly detail page.

### Content

Potential sections:

- Course hero
- Overview
- Learning outcomes
- Target audience
- Prerequisites
- Curriculum
- Instructor
- Duration
- Level
- Delivery type
- FAQ
- Registration CTA

### Acceptance Criteria

- Published course can be opened using its slug.
- Unknown slug returns an appropriate not-found experience.
- Course information is server-rendered where practical.
- Metadata is generated for each course.
- Registration CTA is visible.
- Missing optional content does not leave empty sections.
- Page works on mobile and desktop.

---

## FEAT-022 — Course Level

### Priority

Should Have

### Supported Initial Values

Recommended:

- Beginner
- Intermediate
- Advanced

### Acceptance Criteria

- Course level is displayed consistently.
- Invalid values are rejected at the data validation layer.

---

## FEAT-023 — Course Delivery Type

### Priority

Should Have

Potential values:

- Online
- Offline
- Hybrid
- Live Online

### Acceptance Criteria

- Delivery type is displayed consistently.
- Internal implementation should avoid uncontrolled free-text duplication where practical.

---

## FEAT-024 — Course Availability Status

### Priority

Should Have

Potential statuses:

- Open
- Upcoming
- Closed

### Acceptance Criteria

- Status is clearly visible where relevant.
- Closed courses should not present misleading registration behavior.
- Upcoming status should be distinguishable from currently open enrollment.

---

# 5. Learning Track Features

## FEAT-030 — Tracks Listing Page

### Priority

Must Have

### Route

```text
/tracks
```

### Description

Users should be able to browse career-oriented learning tracks.

### Acceptance Criteria

- Published tracks are displayed.
- Each track communicates its purpose.
- Track cards link to corresponding detail pages.
- Layout is responsive.

---

## FEAT-031 — Track Detail Page

### Priority

Must Have

### Route

```text
/tracks/{slug}
```

### Description

The page should explain the full learning journey for a selected career track.

### Content

Potential sections:

- Track title
- Description
- Career goal
- Skills
- Learning journey
- Recommended courses
- Technologies or tools
- CTA

### Acceptance Criteria

- Valid published track loads by slug.
- Invalid slug returns not-found behavior.
- Courses belonging to the track can be displayed.
- Learning sequence is understandable.
- Metadata is generated for SEO.
- Page is responsive.

---

# 6. Instructor Features

## FEAT-040 — Instructors Listing

### Priority

Must Have

### Route

```text
/instructors
```

### Description

The academy should present its instructors and their professional expertise.

### Instructor Information

Potential fields:

- Name
- Slug
- Professional title
- Short biography
- Expertise
- Profile image
- Professional links

### Acceptance Criteria

- Published instructors are displayed.
- Instructor card layout is responsive.
- Missing social links do not create empty UI controls.

---

## FEAT-041 — Instructor Detail Page

### Priority

Could Have

### Route

Potential route:

```text
/instructors/{slug}
```

### Description

A dedicated profile may provide:

- Biography
- Expertise
- Courses
- Professional experience
- Links

This is not mandatory for the first release.

---

# 7. Lead Generation Features

## FEAT-050 — Register Interest Form

### Priority

Must Have

### Description

A visitor should be able to register interest in a course or track.

### Potential Fields

- Full name
- Email
- Phone number
- Course
- Track
- Message

Only required information should be collected.

### Requirements

- Client-side validation
- Server-side validation
- Loading state
- Success state
- Error state
- Duplicate submission protection

### Acceptance Criteria

- Valid form submission creates a lead.
- Invalid data is rejected.
- Required fields are clearly indicated.
- User receives success feedback after valid submission.
- Failure does not expose technical information.
- Multiple accidental submissions are prevented.
- Form works on mobile.

---

## FEAT-051 — Lead API

### Priority

Must Have

### Endpoint

```text
POST /api/leads
```

### Responsibilities

- Validate request
- Normalize input where needed
- Call lead service
- Store lead
- Return standard API response

### Success Response

```json
{
  "success": true,
  "data": {
    "submitted": true
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data"
  }
}
```

### Acceptance Criteria

- Invalid input does not reach persistence.
- Endpoint does not expose internal database errors.
- Sensitive implementation details are not returned.
- Server validation exists even if client validation is present.

---

# 8. Contact Features

## FEAT-060 — Contact Page

### Priority

Must Have

### Route

```text
/contact
```

### Content

Potential content:

- Contact introduction
- Contact form
- Email
- WhatsApp
- Social links

### Acceptance Criteria

- Contact methods are clearly visible.
- Page works on mobile and desktop.
- Contact form contains accessible labels.

### Implementation

Implemented at `/contact`. Direct contact methods render only when they are genuinely configured;
the current configuration does not publish an email address, phone number, WhatsApp number, or
social link.

---

## FEAT-061 — Contact Form

### Priority

Must Have

### Potential Fields

- Full name
- Email
- Phone number
- Subject
- Message

### Acceptance Criteria

- Valid requests can be submitted.
- Validation errors are displayed clearly.
- Submit button provides loading state.
- Duplicate submissions are prevented.
- Success and error states exist.

### Implementation

The form uses shared React Hook Form and Zod validation, preserves values after a failed request,
and reuses a unique submission ID for an edited retry so persistence replaces an uncertain earlier
payload instead of creating a duplicate.

---

## FEAT-062 — Contact API

### Priority

Must Have

### Endpoint

```text
POST /api/contact
```

### Acceptance Criteria

- Server validates incoming payload.
- Invalid requests return consistent error responses.
- Internal details are not exposed.
- Valid contact messages are persisted or passed to the approved communication mechanism.

The exact communication provider may be selected later.

### Implementation

`POST /api/contact` validates and normalizes input on the server, then persists through the contact
service and repository to `public.contact_messages`. It returns success only after Supabase accepts
the write. No email provider or notification integration is configured.

---

# 9. About Features

## FEAT-070 — About Page

### Priority

Must Have

### Route

```text
/about
```

### Content

Should communicate:

- Mission
- Vision
- Teaching philosophy
- Practical learning approach
- Career-oriented approach

### Acceptance Criteria

- Content follows Academy product vision.
- Page contains clear semantic heading hierarchy.
- Page is responsive.

### Implementation

Implemented at `/about` as a server-rendered page with one primary heading and concise sections for
Academy's mission, vision, teaching philosophy, practical learning approach, and career-oriented
direction. The page links to the implemented courses and general-interest routes and avoids
unsupported organizational history, credentials, metrics, testimonials, or outcome promises.

---

# 10. Footer Features

## FEAT-080 — Global Footer

### Priority

Must Have

### Content

Potential sections:

- Academy information
- Main navigation
- Courses or tracks
- Contact
- Social media
- Legal links
- Copyright

### Acceptance Criteria

- Footer exists across public pages.
- Links are valid.
- External links behave correctly.
- Footer is responsive.
- Footer does not become excessively large.

---

# 11. WhatsApp Integration

## FEAT-090 — WhatsApp CTA

### Priority

Should Have

### Description

Visitors may contact the academy using WhatsApp.

### Potential Locations

- Homepage
- Contact page
- Course detail page

### Acceptance Criteria

- Link opens the configured WhatsApp contact.
- Phone number is configured centrally.
- Phone number is not duplicated throughout source code.
- Optional prefilled message may contain relevant context.

Example concept:

```text
Hello, I am interested in the API Testing course.
```

---

# 12. SEO Features

## FEAT-100 — Page Metadata

### Priority

Must Have

### Requirements

Important public pages should define:

- Title
- Description
- Open Graph data where appropriate

### Acceptance Criteria

- Homepage has metadata.
- Courses page has metadata.
- Course detail pages have dynamic metadata.
- Track pages have relevant metadata.
- Important pages do not share meaningless duplicate titles.

---

## FEAT-101 — Sitemap

### Priority

Should Have

### Description

Generate a sitemap containing relevant public URLs.

Potential URLs:

- Homepage
- Courses
- Published course pages
- Tracks
- Published track pages
- Instructors
- About
- Contact

### Acceptance Criteria

- Private or admin pages are not included.
- Unpublished content is not included.

---

## FEAT-102 — Robots Configuration

### Priority

Should Have

### Acceptance Criteria

- Public content can be crawled appropriately.
- Future private areas are not unintentionally exposed to search engines.

---

## FEAT-103 — Semantic URLs

### Priority

Must Have

Examples:

Preferred:

```text
/courses/api-testing
/tracks/software-testing
```

Avoid:

```text
/course?id=1325
```

for primary public pages.

---

# 13. Responsive Features

## FEAT-110 — Mobile Support

### Priority

Must Have

### Requirements

All public pages must support mobile layouts.

### Acceptance Criteria

- No horizontal overflow under normal content.
- Navigation works.
- Forms remain usable.
- CTA buttons remain usable.
- Text remains readable.
- Cards reflow correctly.

---

## FEAT-111 — Tablet Support

### Priority

Must Have

### Acceptance Criteria

- Grid layouts adapt appropriately.
- Navigation and content spacing remain usable.
- No large desktop-only gaps or overflow issues exist.

---

## FEAT-112 — Desktop Support

### Priority

Must Have

### Acceptance Criteria

- Content uses available space effectively.
- Maximum-width containers prevent excessive stretching.
- Sections maintain consistent alignment.

---

# 14. Accessibility Features

## FEAT-120 — Keyboard Navigation

### Priority

Must Have

### Acceptance Criteria

- Navigation is keyboard accessible.
- Buttons and links receive visible focus.
- Form controls can be accessed without mouse input.

---

## FEAT-121 — Form Accessibility

### Priority

Must Have

### Acceptance Criteria

- Fields use visible labels.
- Validation messages are associated with relevant fields where practical.
- Required state is understandable.
- Errors are not communicated through color alone.

---

## FEAT-122 — Semantic HTML

### Priority

Must Have

### Requirements

Use appropriate elements such as:

```text
header
nav
main
section
article
footer
button
form
```

Do not use non-semantic interactive `div` elements unnecessarily.

---

# 15. Error and State Features

## FEAT-130 — Not Found Page

### Priority

Must Have

### Description

A friendly not-found experience should exist.

### Acceptance Criteria

- Invalid public routes show appropriate 404 behavior.
- User has a clear path back to useful content.

---

## FEAT-131 — Loading States

### Priority

Must Have where applicable

### Acceptance Criteria

- Async operations provide visible feedback.
- Submission buttons communicate processing state.
- Loading UI does not cause excessive layout shift.

---

## FEAT-132 — Error States

### Priority

Must Have where applicable

### Acceptance Criteria

- User receives understandable failure feedback.
- Technical stack traces are never displayed to the user.

---

## FEAT-133 — Empty States

### Priority

Must Have where applicable

### Acceptance Criteria

Examples:

If no upcoming courses exist, display an appropriate message rather than an empty container.

---

# 16. Performance Features

## FEAT-140 — Image Optimization

### Priority

Must Have

### Acceptance Criteria

- Large public images are appropriately optimized.
- Dimensions or layout behavior reduce layout shift.
- Course and instructor images use consistent rendering.

---

## FEAT-141 — Minimal Client JavaScript

### Priority

Should Have

### Requirements

Use Server Components where practical.

Avoid unnecessary client-side rendering for static content.

---

## FEAT-142 — Dependency Discipline

### Priority

Must Have

### Acceptance Criteria

- No library is introduced when the existing stack already provides a reasonable solution.
- Added dependencies have a clear technical purpose.

---

# 17. Analytics Features

## FEAT-150 — Basic Analytics

### Priority

Could Have

Potential metrics:

- Page views
- Course detail visits
- Track visits
- CTA clicks
- Lead submissions
- Contact submissions
- WhatsApp clicks

Analytics should not block Academy v1 launch.

---

# 18. Data Features

## FEAT-160 — Course Data

### Priority

Must Have

Each course should conceptually support:

```text
id
slug
title
shortDescription
description
track
level
duration
deliveryType
status
instructor
learningOutcomes
prerequisites
curriculum
featured
published
```

Exact schema belongs in:

```text
DATABASE.md
```

---

## FEAT-161 — Track Data

### Priority

Must Have

Potential data:

```text
id
slug
name
shortDescription
description
skills
published
```

---

## FEAT-162 — Instructor Data

### Priority

Must Have

Potential data:

```text
id
slug
name
title
bio
expertise
image
professionalLinks
published
```

---

## FEAT-163 — Lead Data

### Priority

Must Have

Potential data:

```text
id
fullName
email
phone
courseId
trackId
message
createdAt
```

---

# 19. Configuration Features

## FEAT-170 — Site Configuration

### Priority

Must Have

Central configuration should include values such as:

```text
academyName
academyDescription
websiteUrl
contactEmail
whatsappNumber
socialLinks
```

### Acceptance Criteria

- Shared site data is not unnecessarily duplicated.
- Brand name can be changed without editing many components.

This is especially important while the final Academy brand name is still undecided.

---

# 20. V1 Out of Scope Features

The following features must not be implemented unless explicitly moved into scope.

## Authentication

Out of Scope

Includes:

- Student login
- Instructor login
- Admin login

---

## Student Dashboard

Out of Scope

---

## Video Learning

Out of Scope

---

## Course Progress

Out of Scope

---

## Assignments

Out of Scope

---

## Quizzes and Exams

Out of Scope

---

## Certificates

Out of Scope

---

## Online Payments

Out of Scope

---

## Enrollment Management

Out of Scope for initial v1.

Lead generation is used instead.

---

## Instructor Dashboard

Out of Scope

---

## Admin Portal

Out of Scope for initial v1.

Planned for a later version.

---

## Community / Forum

Out of Scope

---

## Internal Messaging

Out of Scope

---

## Live Streaming Platform

Out of Scope

External live-session tools may be linked later if required.

---

# 21. V1 Feature Priority Summary

## Must Have

```text
FEAT-001 Global Navigation
FEAT-002 Homepage Hero
FEAT-003 Learning Tracks Preview
FEAT-004 Featured Courses
FEAT-011 Final Homepage CTA

FEAT-020 Courses Listing
FEAT-021 Course Detail

FEAT-030 Tracks Listing
FEAT-031 Track Detail

FEAT-040 Instructors Listing

FEAT-050 Register Interest Form
FEAT-051 Lead API

FEAT-060 Contact Page
FEAT-061 Contact Form
FEAT-062 Contact API

FEAT-070 About Page
FEAT-080 Footer

FEAT-100 Page Metadata
FEAT-103 Semantic URLs

FEAT-110 Mobile Support
FEAT-111 Tablet Support
FEAT-112 Desktop Support

FEAT-120 Keyboard Navigation
FEAT-121 Form Accessibility
FEAT-122 Semantic HTML

FEAT-130 Not Found
FEAT-131 Loading States
FEAT-132 Error States
FEAT-133 Empty States

FEAT-140 Image Optimization
FEAT-142 Dependency Discipline

FEAT-160 Course Data
FEAT-161 Track Data
FEAT-162 Instructor Data
FEAT-163 Lead Data

FEAT-170 Site Configuration
```

---

## Should Have

```text
FEAT-005 Why Academy
FEAT-006 Learning Journey
FEAT-007 Instructor Preview
FEAT-008 Testimonials
FEAT-009 Upcoming Courses
FEAT-010 FAQ Preview

FEAT-022 Course Level
FEAT-023 Delivery Type
FEAT-024 Availability Status

FEAT-090 WhatsApp CTA

FEAT-101 Sitemap
FEAT-102 Robots Configuration

FEAT-141 Minimal Client JavaScript
```

---

## Could Have

```text
FEAT-041 Instructor Detail
FEAT-150 Basic Analytics
```

---

# 22. Suggested Implementation Sequence

The recommended implementation sequence is:

```text
Phase 0
Project Setup

↓

Phase 1
Design System
Global Layout
Navbar
Footer

↓

Phase 2
Homepage

↓

Phase 3
Courses

↓

Phase 4
Tracks

↓

Phase 5
Instructors

↓

Phase 6
Lead Generation

↓

Phase 7
Contact

↓

Phase 8
SEO
Accessibility
Performance

↓

Phase 9
Testing
Polish
Production Readiness
```

Do not build every feature simultaneously.

---

# 23. Feature Development Rule

Each implementation task should reference one or more feature IDs.

Example:

```text
Implement FEAT-002 — Homepage Hero.
```

A task should include:

- Feature ID
- Requirements
- Acceptance criteria
- Relevant design rules
- Testing expectations

This allows Product, Engineering, QA, and Codex to discuss exactly the same scope.

---

# 24. Change Management

If a feature requirement changes:

1. Update this document.
2. Update related technical documentation if required.
3. Update implementation.
4. Update relevant tests.

Do not allow documentation and code behavior to intentionally diverge.

---

# 25. V1 Release Definition

Academy v1 can be considered ready for public release when:

- All Must Have features required for launch are implemented.
- Critical user journeys work.
- Lead generation works.
- Contact flow works.
- Core public pages are complete.
- Mobile and desktop layouts are usable.
- SEO fundamentals are implemented.
- Accessibility fundamentals are implemented.
- Production build succeeds.
- Critical tests pass.
- No known blocker or critical defects remain.

---

# 26. Primary User Journey

The primary v1 journey is:

```text
Visitor
↓
Homepage
↓
Discover Track or Course
↓
Open Details
↓
Understand Value
↓
Register Interest / Contact Academy
↓
Lead Captured
```

Every major product decision in v1 should support this journey.

---

# 27. Final Scope Principle

Academy v1 should prove the product and brand before building the full learning platform.

The first version succeeds when visitors can confidently understand the Academy, discover suitable technology education, and take a clear next step.
