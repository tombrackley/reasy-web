# Style Check Skill

Run this checklist against every file you created or modified before marking a task complete. Check each item literally — do not skip items or assume compliance. If any check fails, fix it before proceeding.

---

## 1. Naming Conventions

- [ ] Component files use PascalCase (`SectionCards.tsx`, not `section-cards.tsx` — match whichever convention already exists in the directory).
- [ ] Component functions use PascalCase (`function PropertyCard()`, not `function propertyCard()`).
- [ ] Props interfaces are named `{ComponentName}Props`.
- [ ] CSS variable references use the semantic token name (`primary`, `muted`, `destructive`), never raw colour values.
- [ ] Exported variant configs are named `{componentName}Variants` (e.g., `buttonVariants`).
- [ ] Boolean props use `is`/`has`/`should` prefixes only when the bare name would be ambiguous. Prefer `disabled` over `isDisabled`.

## 2. Colour Tokens

- [ ] **Zero hardcoded colours.** Search the file for hex (`#`), `rgb(`, `rgba(`, `hsl(`, `oklch(`. If any are found outside of `src/index.css`, replace them with the appropriate semantic token (`text-primary`, `bg-muted`, `border-destructive`, etc.).
- [ ] Colours are used semantically — `primary` for main actions, `secondary` for supporting actions, `muted` for subdued content, `destructive` for errors/warnings, `accent` for highlights.
- [ ] No colour is used for a purpose that contradicts its semantic meaning (e.g., `destructive` for a success state).
- [ ] Foreground colours are paired correctly (`text-primary-foreground` on `bg-primary`, `text-muted-foreground` on `bg-muted`, etc.).

## 3. Typography

- [ ] All font sizes use Tailwind's type scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.). No arbitrary values like `text-[13px]`.
- [ ] Font weights use Tailwind classes (`font-medium`, `font-semibold`). Headings favour `font-medium` or `font-semibold` — not `font-bold` unless there is a strong reason.
- [ ] No `font-family` overrides. The `--font-sans` (DM Sans) is set globally. Only use `font-mono` or Geist for data-heavy/code contexts.

## 4. Spacing

- [ ] All spacing uses Tailwind's spacing scale (`p-4`, `gap-2`, `mt-6`, etc.). No arbitrary values like `p-[13px]` or `mt-[7px]`.
- [ ] Border radius uses the token-based classes (`rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-4xl`). No arbitrary values like `rounded-[10px]`.
- [ ] Whitespace is generous — layouts should breathe. If content feels cramped, increase padding/gap.

## 5. Component Library Usage

- [ ] If a shadcn/ui component exists for the UI element, it is used. Do not rebuild buttons, dialogs, inputs, cards, tooltips, dropdowns, etc.
- [ ] Icons are from `@tabler/icons-react` (primary) or `lucide-react` (secondary). No other icon libraries.
- [ ] Icons inside buttons use `data-icon="inline-start"` or `data-icon="inline-end"` attributes.
- [ ] Class composition uses `cn()` — no manual string concatenation or template literals for className.
- [ ] Component variants use CVA (`class-variance-authority`) with `VariantProps` typing.
- [ ] Component root elements include `data-slot` attribute following shadcn convention.

## 6. Interactive States

Check every interactive element (buttons, links, inputs, selects, checkboxes, cards with onClick, etc.):

- [ ] **Hover:** Has a visible hover state (colour change, background shift, underline, etc.).
- [ ] **Focus:** Has a visible focus ring. Use `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50` or the equivalent from the shadcn base styles.
- [ ] **Disabled:** Has `disabled:pointer-events-none disabled:opacity-50` or equivalent. Disabled elements are visually distinct and non-interactive.
- [ ] **Loading:** If the element triggers an async action, it has a loading state (spinner, disabled with indicator, skeleton). The element is non-interactive during loading.
- [ ] **Error/Invalid:** Form inputs have `aria-invalid` styling. Error messages appear inline, not only as toasts.
- [ ] **Active/Pressed:** Buttons include `active:translate-y-px` or equivalent press feedback.
- [ ] **Keyboard accessible:** All interactive elements can be reached and activated via keyboard. No `onClick` on non-interactive elements (`div`, `span`) without `role`, `tabIndex`, and `onKeyDown`.

## 7. View States

Check every view, page, or section that displays data:

- [ ] **Loading state:** Skeleton placeholders or spinner while data is loading. Not a blank screen.
- [ ] **Empty state:** Helpful, guiding message when there is no data — not just "No results". Should suggest a next action where appropriate.
- [ ] **Error state:** Graceful error message if data fails to load. Offer a retry or fallback.

## 8. Responsive & Dark Mode

- [ ] Layout works at mobile (`< 640px`), tablet (`md`), and desktop (`lg`) breakpoints. Resize the viewport mentally or check for responsive classes.
- [ ] No fixed widths that break on small screens. Prefer `max-w-*` and `w-full` over `w-[500px]`.
- [ ] All colour usage works in dark mode. Verify that foreground/background pairs remain readable with `.dark` class. Check for any hardcoded `white`/`black` that should be `background`/`foreground`.

## 9. CSS Practices

- [ ] **No inline styles.** Search for `style=` or `style:{`. If found, replace with Tailwind classes.
- [ ] **No separate CSS files** for component styling. All styles are Tailwind utilities.
- [ ] **No `!important`** unless overriding a third-party library with no other option.
- [ ] Props are spread onto the root element (`...props`) so consumers can extend behaviour.

## 10. Copy & Language

- [ ] All user-facing text uses Australian English spelling ("colour", "organisation", "behaviour", "licence" for nouns).
- [ ] Button and link labels are action-oriented and specific ("List your property", "Send enquiry") — not vague ("Submit", "Click here", "Continue").
- [ ] No technical jargon in user-facing text. Domain terms (e.g., "conveyancer") are explained or contextualised.

---

## How to Run This Check

1. For each file you created or modified, go through sections 1–10 in order.
2. If a check fails, fix it immediately before moving to the next item.
3. After all checks pass, note any items that were fixed in your implementation notes.
4. Only then mark the task as complete.
