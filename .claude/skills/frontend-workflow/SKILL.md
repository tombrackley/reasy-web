# Frontend Workflow Skill

This is your end-to-end build process. Follow these steps in order every time you receive a PRD from the product-manager agent. Do not skip steps. Do not reorder steps.

---

## Step 1: Receive Handoff

1. Confirm the PRD was produced by the product-manager agent.
2. Verify the PRD contains all of the following sections. Check each one — if any is missing, go to Step 2 immediately:
   - [ ] Problem statement
   - [ ] User stories (with "As a [user], I want to [action] so that [outcome]" format)
   - [ ] Acceptance criteria (testable conditions for each user story)
   - [ ] Scope (in-scope, out-of-scope, future considerations)
   - [ ] Handover notes (key behaviours, edge cases, constraints)
3. Note any open questions section. If it contains unresolved items, go to Step 2.
4. Read `.claude/rules/styling-rules.md` to load the styling and interaction conventions.

## Step 2: Flag Blockers

If any of the following are true, **stop immediately**. Do not write any code. Return the PRD to the product-manager agent with a specific description of what is missing or unclear.

- [ ] A required PRD section from Step 1 is missing entirely.
- [ ] Any user story lacks acceptance criteria.
- [ ] Acceptance criteria are ambiguous — they use words like "appropriate", "should work well", "looks good" without defining what that means concretely.
- [ ] The open questions section contains unresolved items that affect implementation (e.g., "TBD which flow to use", "waiting on legal input for this step").
- [ ] User-facing copy is missing for key interactions (button labels, error messages, confirmation dialogs) and the handover notes do not delegate copy decisions to you.
- [ ] The scope boundaries are unclear — you cannot tell whether a behaviour is in or out of scope.

Format your response as:

```
## Blockers — returning to product-manager

1. [Section] — [what is missing or ambiguous]
2. [Section] — [what is missing or ambiguous]

Cannot proceed until these are resolved.
```

If there are no blockers, proceed to Step 3.

## Step 3: Audit Existing Patterns

Before building anything, survey what already exists. This prevents duplicate components and ensures consistency.

1. **Scan `src/components/ui/`** — list every shadcn/ui component already installed. For the feature you are about to build, identify which of these you will use.
2. **Scan `src/components/`** — list any feature-level components that relate to the same domain area. Check for patterns you should follow (layout structure, prop conventions, state management approach).
3. **Scan `src/hooks/`** — check for existing custom hooks that handle relevant logic (data fetching, form state, etc.).
4. **Check if new shadcn components are needed.** If the PRD requires UI elements not yet in `src/components/ui/`, note them — they will need to be installed via `npx shadcn@latest add <component>` in Step 4.
5. **Produce a brief audit summary** before proceeding:
   - Components to reuse: [list]
   - Components to install: [list]
   - New components to create: [list]
   - Hooks to reuse: [list]
   - New hooks to create: [list]

## Step 4: Scaffold

Build the structure before the logic. Do not implement behaviour in this step — only create the skeleton.

1. **Install any missing shadcn components** identified in Step 3. Run `npx shadcn@latest add <component>` for each.
2. **Create new component files.** For each new component:
   - Create the file in the appropriate directory (`src/components/` for feature components, `src/components/ui/` only for reusable primitives).
   - Define the component function with typed props interface.
   - Return placeholder JSX that establishes the layout structure (containers, sections, grid/flex layout) — no logic, no data, no state.
   - Add `data-slot` attribute on the root element.
   - Accept and spread `...props` on the root element.
   - Export the component.
3. **Create new hook files** if needed. Define the hook signature and return type — stub the implementation.
4. **Wire up the component tree.** Import new components into their parent and render them in the correct position. Verify the overall page structure makes sense before adding behaviour.

## Step 5: Implement

Work through the PRD systematically. Do not jump between user stories — complete one before starting the next.

1. **Take the first user story** from the PRD.
2. **Read its acceptance criteria.** These are your definition of done for this story.
3. **Implement the happy path first.** Get the primary flow working with real component logic, state, and interactions.
4. **Then implement alternate paths** described in the acceptance criteria (validation states, conditional UI, role-specific behaviour).
5. **Handle all view states** for any data-driven section:
   - Loading: skeleton placeholders or spinner.
   - Empty: helpful guidance message suggesting a next action.
   - Error: graceful message with retry option.
6. **Handle all interactive states** for every interactive element:
   - Hover, focus, disabled, loading, active/pressed, error/invalid.
   - Keyboard accessibility.
7. **Verify each acceptance criterion** is met before moving to the next user story.
8. **Repeat for every user story** in the PRD, in the order they appear.

If during implementation you discover a behaviour the PRD does not cover:
- If it is blocking (you cannot continue without a decision), return to the product-manager agent per Step 2.
- If it is non-blocking (you can implement the rest without it), note it and continue. You will flag it in Step 8.

## Step 6: Handle Edge Cases

After all user stories are implemented, review the handover notes section of the PRD.

1. **Read every edge case listed in the handover notes.** Check each one against your implementation.
2. For each edge case:
   - [ ] If it is already handled by your implementation, confirm and move on.
   - [ ] If it is not handled, implement it now.
   - [ ] If it cannot be handled without a product decision, note it for Step 8.
3. **Check boundary conditions** not explicitly listed:
   - First-time/zero-data states (first listing, no enquiries yet, new user).
   - Maximum/overflow conditions (long text, many items, large numbers).
   - Permission boundaries (does this view behave differently for buyers vs sellers?).
4. **Check confirmation flows.** Any action with legal, financial, or irreversible implications must have a confirmation step with plain-language explanation. Verify this is present wherever required.

## Step 7: Style Check

Run the full style-check skill (`.claude/skills/style-check/SKILL.md`) against every file you created or modified.

1. Open the style-check skill and execute it section by section.
2. Fix any failures immediately.
3. Note which items required fixes — include these in your implementation notes.
4. Do not proceed to Step 8 until all style-check items pass.

## Step 8: Output

Produce the following as your final output:

### Implementation Summary
- List every file created or modified.
- For each file, one sentence describing what it does.

### Acceptance Criteria Status
- Reproduce every acceptance criterion from the PRD as a checkbox.
- Mark each as checked or unchecked. Every item must be checked to mark the task complete.
- If any item is unchecked, explain why and what is needed to resolve it.

### Non-Obvious Decisions
- List any implementation decisions you made that are not directly specified in the PRD (e.g., chose a specific shadcn component over another, structured state a certain way, split a component differently than expected).
- For each, explain your reasoning in one sentence.

### Deferred Scope & Uncovered Edge Cases
- List any behaviours or edge cases that were:
  - Explicitly out of scope per the PRD (for reference).
  - Discovered during implementation but not covered by the spec.
  - Flagged as needing a product decision.
- For each, describe the gap and recommend whether it needs a follow-up PRD or can be handled as a quick addition.

### Style Check Results
- Confirm the style-check skill passed.
- List any items that required fixes during the check.
