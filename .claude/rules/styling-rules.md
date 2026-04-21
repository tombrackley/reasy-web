# Reasy - Styling & Design Rules

## Visual Identity

- **Clean, professional, and trustworthy.** The design should instil confidence -- users are making major financial decisions and need to feel the platform is credible and secure.
- **A dose of elegance.** Subtle refinement in spacing, typography, and interactions. Avoid anything that feels cheap, cluttered, or gimmicky.
- **Calm and composed.** Use whitespace generously. Let content breathe. Dense interfaces feel overwhelming for users navigating unfamiliar territory.

## Component Library

- **Use shadcn/ui (v4, base-maia style) for all UI components.** Don't build custom components when a shadcn equivalent exists. This ensures visual consistency and reduces maintenance.
- **Icon library: Tabler Icons** (`@tabler/icons-react`) as the primary icon set, with Lucide React available as a secondary option.
- **All components must respect the design token system** defined in `src/index.css`. Never use hardcoded colours -- always reference CSS variables (`--primary`, `--muted`, `--destructive`, etc.).

## Colour System

- Primary palette is a blue/indigo tone (oklch ~263 hue), conveying trust and professionalism.
- Use semantic colour variables throughout:
  - `primary` -- main actions, key UI elements
  - `secondary` -- supporting elements, secondary actions
  - `muted` -- subdued text, inactive states
  - `destructive` -- errors, warnings, irreversible actions
  - `accent` -- highlights, hover states
- Dark mode is supported via the `.dark` class. Ensure all new UI works in both themes.

## Typography

- **Primary font: DM Sans Variable** -- clean, modern, highly legible.
- **Secondary/mono font: Geist Variable** -- available for code-like or data-heavy contexts if needed.
- Use Tailwind's type scale. Prefer semantic sizing (`text-sm`, `text-base`, `text-lg`) over arbitrary values.
- Headings should feel confident but not aggressive. Favour medium/semibold weights over bold for most headings.

## Spacing & Layout

- **Base radius: `0.625rem`** -- use the `--radius` token and its derivatives (`radius-sm` through `radius-4xl`) for consistent rounding.
- Use Tailwind's spacing scale consistently. Avoid arbitrary pixel values.
- Responsive design is expected. Use Tailwind breakpoints (`md:`, `lg:`) and container queries (`@container`) where appropriate.
- Layouts should be simple and scannable. Avoid deep nesting or overly complex grid structures.

## Language & Copy

- **Clear, friendly, and credible.** Write as if explaining to a friend who's never sold a house before.
- **No technical jargon.** These are everyday people, not real estate agents or lawyers. Terms like "conveyancer" should be explained on first use.
- **Supportive and educational.** Users should feel guided, not lectured. Use plain language to explain legal obligations, consequences, and next steps.
- **Action-oriented labels.** Button and link text should tell users what will happen ("List your property", "Send enquiry") not be vague ("Submit", "Continue").
- **Australian English.** Use Australian spelling conventions (e.g., "organisation" not "organization", "licence" not "license" for the noun).

## Interaction Patterns

- **Flows should never feel complex or overwhelming.** Break multi-step processes into clear, manageable stages. Use progress indicators, step counts, or checklists.
- **Progressive disclosure.** Show only what's relevant at each stage. Additional detail can be expanded or revealed when needed.
- **Confirm before consequence.** Any action with legal, financial, or irreversible implications must have a clear confirmation step with plain-language explanation of what will happen.
- **Feedback on every action.** Use Sonner toasts for transient confirmations, inline messages for contextual feedback, and dialogs for decisions that need attention.
- **Loading and empty states.** Every view should handle loading (skeletons, spinners) and empty states (helpful guidance, not just "No results") gracefully.

## CSS & Tailwind Practices

- **Use Tailwind CSS v4 utility classes** for all styling. No separate CSS files for component styles.
- **Use `cn()` (clsx + tailwind-merge)** for conditional class composition in components.
- **Use CVA (class-variance-authority)** for component variants that need structured prop-based styling.
- **Never use inline styles.** Always use Tailwind classes or CSS variables.
- **Respect the `@theme inline` block** in `index.css` -- this is the source of truth for design tokens mapped to Tailwind.
