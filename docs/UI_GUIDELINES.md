# Academy Platform — UI Guidelines v1.0

## 1. Purpose

This document defines the visual and interaction standards for the Academy platform.

Its purpose is to ensure that all pages and components follow a consistent visual language.

The design should communicate:

- Modern technology
- Professional education
- Trust
- Simplicity
- Clarity
- Practical learning
- Premium but accessible experience

The platform should feel like a modern technology product, not a traditional training center website.

---

## 2. Design Personality

The Academy interface should feel:

- Modern
- Clean
- Professional
- Technical
- Friendly
- Confident
- Minimal
- Structured

Avoid visual styles that feel:

- Overly corporate
- Old-fashioned
- Generic education template
- Excessively colorful
- Childish
- Over-animated
- Visually noisy

---

## 3. Core Design Principle

Clarity is more important than decoration.

Every visual element should help the visitor:

- Understand the academy
- Discover a track
- Explore a course
- Trust the instructors
- Take an action

Do not add decorative elements that reduce readability or distract from the user journey.

---

## 4. Design System Strategy

The application should use reusable design tokens and shared components.

Avoid hardcoded styling decisions inside individual components.

The design system should define:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Containers
- Buttons
- Forms
- Cards
- Sections
- Responsive behavior

---

## 5. Color Palette

Initial brand palette:

### Primary

`#6366F1`

Indigo.

Use for:

- Primary actions
- Links
- Important highlights
- Active states
- Selected elements

---

### Secondary

`#8B5CF6`

Violet.

Use for:

- Secondary brand accents
- Gradients
- Decorative highlights
- Selected visual elements

Do not use secondary color as frequently as the primary.

---

### Accent

`#22D3EE`

Cyan.

Use carefully for:

- Small highlights
- Icons
- Technical accents
- Gradient details

Accent color should not dominate large areas.

---

### Dark

`#0F172A`

Use for:

- Dark hero backgrounds
- Footer
- Important dark surfaces
- Strong text sections

---

### Background

`#F8FAFC`

Primary light background.

Use for:

- Page background
- Large neutral areas

---

### Surface

Recommended:

`#FFFFFF`

Use for:

- Cards
- Forms
- Content surfaces
- Navigation

---

### Main Text

`#1E293B`

Use for primary readable text.

---

### Muted Text

`#64748B`

Use for:

- Secondary descriptions
- Metadata
- Supporting text

Do not use muted text where high readability is required.

---

### Border

Recommended:

`#E2E8F0`

Use for:

- Cards
- Inputs
- Dividers

Borders should remain subtle.

---

## 6. Semantic Colors

Use semantic design tokens.

### Success

Recommended:

`#16A34A`

Use for:

- Successful submission
- Confirmed status
- Positive feedback

---

### Warning

Recommended:

`#F59E0B`

Use for:

- Warnings
- Important attention messages

---

### Error / Destructive

Recommended:

`#DC2626`

Use for:

- Validation errors
- Failed actions
- Destructive operations

---

### Info

Primary or cyan-based styling may be used for informational states.

---

## 7. Design Token Principle

Components should use semantic tokens.

Prefer:

```text
bg-primary
text-primary
text-muted-foreground
bg-background
border-border
```

Avoid:

```text
bg-[#6366F1]
text-[#64748B]
```

throughout feature components.

Raw hexadecimal values should mainly exist in theme configuration.

---

## 8. Gradient Usage

The main brand gradient may use:

```text
Primary → Secondary
```

or:

```text
Primary → Secondary → Accent
```

Example:

```css
linear-gradient(
  135deg,
  #6366F1,
  #8B5CF6,
  #22D3EE
)
```

Use gradients sparingly.

Good use cases:

- Hero accents
- CTA background
- Icon background
- Badge highlights
- Decorative glows

Avoid:

- Gradient text everywhere
- Gradient backgrounds on every card
- Multiple competing gradients on the same screen

---

## 9. Light and Dark Usage

Academy v1 should primarily use a light interface.

Recommended structure:

```text
Dark / visually strong Hero

Light content sections

Dark Footer
```

Do not make the entire website dark by default in v1.

Dark mode can be considered later.

---

## 10. Typography

Typography should prioritize readability and modern product aesthetics.

Recommended font category:

- Modern sans-serif
- Strong Arabic support if Arabic content is introduced

Potential choices include fonts that support both English and Arabic consistently.

Typography should use a limited number of weights.

Recommended:

- Regular
- Medium
- Semibold
- Bold

Avoid excessive font-weight variation.

---

## 11. Typography Scale

Recommended hierarchy.

### Display / Hero

Desktop:

```text
48px – 64px
```

Mobile:

```text
36px – 44px
```

Use for the primary hero statement only.

---

### H1

Desktop:

```text
40px – 48px
```

Mobile:

```text
32px – 40px
```

---

### H2

Desktop:

```text
32px – 40px
```

Mobile:

```text
28px – 32px
```

---

### H3

```text
24px – 28px
```

---

### H4

```text
20px – 24px
```

---

### Body Large

```text
18px – 20px
```

---

### Body

```text
16px
```

---

### Small / Metadata

```text
14px
```

Avoid body text smaller than 14px.

---

## 12. Line Height

Recommended:

Headings:

```text
1.1 – 1.25
```

Body:

```text
1.5 – 1.7
```

Readable text should never feel compressed.

---

## 13. Content Width

Readable text should not span the full screen width.

Long paragraphs should generally use a maximum readable width around:

```text
600px – 760px
```

Marketing sections may use wider layout containers.

---

## 14. Container System

Use consistent page containers.

Recommended maximum width:

```text
1200px – 1280px
```

Example:

```text
max-w-7xl
```

Use horizontal padding consistently.

Recommended:

Mobile:

```text
16px – 20px
```

Tablet:

```text
24px
```

Desktop:

```text
32px
```

---

## 15. Spacing System

Use a consistent spacing scale.

Prefer Tailwind spacing values.

Common values:

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

Do not invent arbitrary values such as:

```text
margin-top: 37px
padding: 53px
```

without a real design need.

---

## 16. Section Spacing

Major homepage sections should have generous vertical spacing.

Recommended desktop section spacing:

```text
80px – 120px
```

Mobile:

```text
56px – 80px
```

Do not make sections visually cramped.

---

## 17. Border Radius

Academy should feel modern but not excessively rounded.

Recommended:

Buttons:

```text
8px – 12px
```

Cards:

```text
12px – 16px
```

Large visual containers:

```text
16px – 24px
```

Avoid using fully pill-shaped containers everywhere.

Pills are suitable for:

- Tags
- Badges
- Small filters

---

## 18. Shadows

Use subtle shadows.

Cards should generally rely on:

- Border
- Background
- Small shadow

Avoid heavy floating shadows.

Recommended visual style:

```text
border + subtle shadow
```

rather than:

```text
large blurred shadow
```

---

## 19. Buttons

Define clear button hierarchy.

### Primary Button

Use for the main action.

Examples:

- Explore Courses
- Register Interest
- Join Course

Style:

- Primary background
- High contrast text
- Strong hover state
- Visible focus state

---

### Secondary Button

Use for lower-priority actions.

Examples:

- View Track
- Learn More

Style:

- Neutral or outlined
- Clear border
- Strong readable label

---

### Ghost Button

Use primarily inside:

- Navigation
- Menus
- Secondary controls

Do not use ghost buttons for primary CTAs.

---

## 20. Button Rules

Buttons must have:

- Clear label
- Minimum comfortable height
- Hover state
- Focus state
- Disabled state
- Loading state if asynchronous

Recommended height:

```text
40px – 48px
```

Primary CTA may use:

```text
48px – 52px
```

Avoid ambiguous labels such as:

```text
Click Here
Submit
More
```

Prefer:

```text
Explore Courses
Register Interest
Send Message
View Course
```

---

## 21. Navigation

The main navigation should remain simple.

Initial navigation may include:

- Home
- Courses
- Tracks
- Instructors
- About
- Contact

Primary CTA may appear separately.

Example:

```text
Browse Courses
```

Do not overload navigation with every feature.

---

## 22. Header

The header should:

- Be clean
- Maintain strong spacing
- Keep the logo visible
- Support mobile navigation
- Keep important CTA accessible

Sticky navigation may be used if it improves usability.

If sticky, it should not consume excessive vertical space.

---

## 23. Mobile Navigation

Mobile navigation should use:

- Accessible menu button
- Clear open/close behavior
- Comfortable touch targets
- Visible navigation links
- Clear CTA

The mobile menu must support keyboard navigation where relevant.

---

## 24. Hero Section

The hero is the most important visual section.

It should clearly answer:

```text
What is this?
Who is it for?
Why should I care?
What should I do next?
```

Recommended structure:

```text
Eyebrow / Badge

Main Headline

Supporting Paragraph

Primary CTA
Secondary CTA

Visual / Technical Illustration
```

Avoid generic marketing headlines that communicate nothing.

---

## 25. Hero Visual Direction

Preferred visual language:

- Code snippets
- Browser-like UI
- Dashboards
- API concepts
- Terminal-inspired elements
- Learning path visualization
- Project screens
- Abstract technology graphics

Avoid generic stock photography as the primary visual identity.

Avoid cliché images such as:

- People pointing at laptops
- Random office teams
- Generic classroom images

Real instructor or student photography may be used later when authentic content is available.

---

## 26. Section Headers

Major sections should generally include:

```text
Optional Eyebrow

Heading

Short Description
```

Descriptions should remain concise.

Avoid overly long introductory text before actual content.

---

## 27. Cards

Cards should use consistent structure.

Possible course card structure:

```text
Track / Category

Course Title

Short Description

Metadata

Instructor

CTA
```

Cards should not contain excessive text.

Use clear hierarchy.

---

## 28. Course Cards

Course cards may display:

- Title
- Track
- Level
- Duration
- Delivery type
- Instructor
- Availability
- Short description

Do not attempt to display the entire course curriculum inside the card.

Optional facts such as delivery type, start date, and price should render only when approved data is
present. Never fill an empty fact with a guessed delivery format. When a start date is intentionally
unannounced, use the explicit wording `Start date: To be announced`.

---

## 29. Track Cards

Track cards should communicate career direction.

Potential content:

- Icon
- Track name
- Short description
- Number of courses
- Skills
- CTA

The cards should feel distinct from standard course cards.

---

## 30. Instructor Cards

Instructor cards should emphasize credibility.

Potential content:

- Professional photo
- Name
- Role
- Primary expertise
- Courses
- Professional links

Do not overload instructor cards with full biographies.

Full information belongs on instructor detail views if introduced.

---

## 31. Icons

Use one consistent icon library.

Do not mix multiple icon styles.

Icons should support content, not replace essential labels.

Avoid excessive decorative icons.

---

## 32. Badges

Badges may represent:

- Beginner
- Intermediate
- Advanced
- Live
- Online
- Upcoming
- Popular
- New

Use consistent styles for each type.

Do not create a unique badge style for every use case.

---

## 33. Forms

Forms should be simple and readable.

Labels should remain visible.

Do not rely only on placeholders as field labels.

Each form field should support:

- Default state
- Focus
- Error
- Disabled
- Filled

---

## 34. Form Layout

On mobile:

```text
One column
```

Desktop may use multiple columns where fields naturally belong together.

Avoid unnecessarily complex forms.

Lead-generation forms should request only information needed for the next action.

---

## 35. Form Validation

Validation messages should:

- Appear near the affected field
- Clearly describe the issue
- Avoid technical language
- Remain concise

Bad:

```text
Invalid input.
```

Better:

```text
Enter a valid email address.
```

---

## 36. Form Submission States

Forms should support:

```text
Idle
Submitting
Success
Error
```

During submission:

- Disable duplicate submission
- Show clear progress
- Preserve user input if submission fails where practical

---

## 37. Empty States

Empty states should remain useful.

Example:

Instead of:

```text
No Data
```

Prefer:

```text
No upcoming courses are available right now.
Explore our existing courses or check back soon.
```

---

## 38. Loading States

Loading should use subtle skeletons or appropriate progress indicators.

Avoid large intrusive spinners for full pages where skeleton content makes more sense.

---

## 39. Error States

Errors should explain:

- What happened
- What the user can do next

Example:

```text
We couldn't load the courses right now.

Try again in a moment.
```

Avoid exposing internal errors.

---

## 40. CTA Strategy

Every major page should have a clear next action.

Examples:

Homepage:

```text
Explore Courses
```

Course page:

```text
Register Interest
```

Track page:

```text
View Courses
```

Contact:

```text
Send Message
```

Do not place multiple competing primary CTAs in the same section.

---

## 41. Homepage Visual Flow

Recommended initial homepage flow:

```text
Navbar

Hero

Trusted / Key Metrics

Learning Tracks

Featured Courses

Why Academy

Learning Experience

Instructors

Projects / Practical Learning

Testimonials

Upcoming Courses

FAQ

Final CTA

Footer
```

Sections may evolve based on actual content.

Do not implement empty sections purely because they exist in this list.

---

## 42. Visual Rhythm

Alternate section backgrounds where helpful.

Example:

```text
Light Background

White

Very Light Tinted Section

White

Dark CTA

Footer
```

Avoid changing background color on every single section.

---

## 43. Testimonials

Testimonials should prioritize authenticity.

Preferred information:

- Learner name
- Short statement
- Course / track
- Optional photo

Avoid oversized quotation marks and overly decorative testimonial designs.

---

## 44. FAQ

Use an accordion-style component if appropriate.

FAQ questions should be easy to scan.

Do not collapse critical information that should be visible elsewhere.

---

## 45. Footer

Footer may include:

- Brand
- Short description
- Navigation
- Courses / Tracks
- Contact
- Social links
- Legal links
- Copyright

The footer should remain organized and not become a sitemap containing every page.

---

## 46. Imagery

Preferred imagery:

- Authentic instructors
- Authentic learners
- Real projects
- Product interfaces
- Technology visuals
- Custom illustrations

Avoid low-quality or generic stock imagery.

---

## 47. Image Treatment

Use consistent image treatment.

Possible approach:

- Slight radius
- Clean crop
- Strong image quality
- Consistent aspect ratio

Do not apply random filters across images.

---

## 48. Motion and Animation

Motion should support usability.

Good uses:

- Hover feedback
- Accordion transitions
- Menu transitions
- Small entrance animations
- Interactive feedback

Avoid:

- Excessive parallax
- Constant movement
- Large page entrance animations
- Animations that delay interaction

Animations should generally remain short and subtle.

---

## 49. Hover Behavior

Interactive cards may use subtle:

- Border change
- Shadow change
- Small translate
- Background adjustment

Avoid dramatic scaling.

---

## 50. Accessibility

Accessibility is part of the design system.

Required principles:

- Sufficient contrast
- Visible keyboard focus
- Semantic structure
- Comfortable touch targets
- Form labels
- Alt text
- Keyboard-accessible menus
- Reduced-motion awareness

Do not remove focus outlines without providing an accessible replacement.

---

## 51. Touch Targets

Interactive controls should generally provide at least approximately:

```text
44px
```

of touch-friendly area where practical.

Important for:

- Mobile menus
- Buttons
- Form controls
- Navigation actions

---

## 52. Responsive Strategy

Design mobile-first.

Every feature should be reviewed at:

```text
Mobile
Tablet
Desktop
```

Do not simply shrink desktop layouts.

Some layouts should restructure entirely on mobile.

Example:

```text
Desktop:
Text | Illustration

Mobile:
Text
Illustration
```

---

## 53. Grid Usage

Use simple predictable grids.

Examples:

Courses:

```text
Mobile: 1 column
Tablet: 2 columns
Desktop: 3 columns
```

Tracks may use:

```text
Mobile: 1
Tablet: 2
Desktop: 3 or 4
```

based on content density.

---

## 54. Content Hierarchy

Every screen should make the most important information visually obvious.

Use hierarchy through:

- Size
- Weight
- Spacing
- Color
- Position

Do not use bold text for everything.

---

## 55. Copy Style

UI copy should be:

- Clear
- Short
- Human
- Professional
- Action-oriented

Avoid unnecessary jargon in marketing copy.

Technical terminology is appropriate when describing actual technical courses.

---

## 56. Language Strategy

Academy may eventually support Arabic and English.

Initial implementation should avoid decisions that make RTL support unnecessarily difficult.

Avoid:

- Direction-specific hardcoded spacing where logical CSS alternatives exist
- Images containing essential text
- Layout assumptions that only work LTR

RTL support is not required unless included in current product scope.

---

## 57. Course Detail Page Layout

Recommended structure:

```text
Breadcrumb

Course Hero

Course Summary / Metadata

Primary CTA

What You Will Learn

Who This Course Is For

Prerequisites

Curriculum

Instructor

Course Details

FAQ

Final CTA
```

Do not include sections when no meaningful data exists.

---

## 58. Course Hero

Course hero should communicate:

- Course name
- Track
- Short value proposition
- Level
- Duration
- Delivery method
- Instructor
- Registration CTA

Important information should appear above the fold where practical.

---

## 59. Track Detail Page

Recommended structure:

```text
Track Hero

Career Outcome

Skills

Learning Journey

Courses

Tools / Technologies

CTA
```

The learning path should visually communicate progression.

---

## 60. About Page

Avoid turning the About page into a long corporate essay.

Prefer clear sections:

- Mission
- Why Academy
- Teaching Philosophy
- Practical Learning
- Instructors
- Vision

---

## 61. Contact Page

The page should provide direct communication options.

Potential structure:

```text
Intro

Contact Form

Email

WhatsApp

Social Links
```

Avoid asking users to complete long forms for simple contact.

---

## 62. Design Review Checklist

Before considering UI work complete, verify:

- Visual hierarchy is clear
- Spacing is consistent
- Colors use design tokens
- Typography is consistent
- Mobile layout works
- Tablet layout works
- Desktop layout works
- Hover states exist where relevant
- Focus states are visible
- Loading state exists when needed
- Error state exists when needed
- Empty state exists when needed
- CTA hierarchy is clear
- Content is readable
- Components are reusable where appropriate

---

## 63. Things to Avoid

Avoid:

- Excessive gradients
- Excessive glassmorphism
- Huge shadows
- Tiny text
- Too many colors
- Too many fonts
- Excessive rounded pills
- Decorative UI without purpose
- Generic stock images
- Repeating identical card layouts everywhere
- Overloaded navigation
- Long unstructured paragraphs
- Excessive animation
- Low contrast
- Placeholder-only form labels
- Desktop-only design

---

## 64. Current Visual Direction

Academy v1 design direction:

```text
Style:
Modern Technology Education

Primary Mode:
Light

Hero:
May use dark technology-focused treatment

Brand:
Indigo + Violet + Cyan

Layout:
Spacious and structured

Cards:
Clean borders and subtle depth

Typography:
Strong modern hierarchy

Imagery:
Authentic / technical / product-oriented

Animation:
Minimal and purposeful

Overall Feel:
Professional technology product
```

---

## 65. Final Design Principle

Academy should look like a technology company that happens to teach technology.

It should not look like a generic course marketplace or traditional training center.
