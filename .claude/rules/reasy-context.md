# Reasy - Project Context

## What is Reasy?

Reasy is a modern, intuitive real estate platform that enables people to sell their own properties through a simple, trustworthy online experience. It removes traditional real estate agent commissions by offering a flat fee model, saving sellers significant money in exchange for some self-managed steps throughout the process.

## Target Market

- **Launch market:** Australian property sales only
- **Sellers:** Homeowners who want to sell privately without an agent
- **Buyers:** Anyone browsing for properties, including those looking for private-sale opportunities

## Core Value Proposition

- **Flat fee, not commission.** Reasy replaces percentage-based real estate commissions with a transparent flat fee. The savings are substantial and are the primary incentive for sellers to handle some of the process themselves.
- **Guided self-service.** The platform doesn't leave users on their own -- it actively guides both buyers and sellers through the process with clear explanations, prompts, and next-step suggestions.
- **Trust and transparency.** Every flow must feel secure. Decisions are explained clearly, users are kept informed of the process, what things mean, and what their legal obligations and consequences are at each stage.

## User Roles

### Sellers
- Can list one or more properties
- Can list with varying levels of intent -- from actively selling to passively gauging interest ("if the right offer came along")
- Are guided through the sale process step-by-step
- Need to be connected with legal third parties (conveyancers, solicitors) at the appropriate stage

### Buyers
- Can browse property listings
- Can enquire on properties they're interested in
- Are guided through the buying process (inspections, building & pest obligations, finance, etc.)
- Need to be connected with their own legal representation when required

## How the System Works

1. **Listing:** A seller signs up and lists their property with relevant details
2. **Discovery:** Buyers browse listings and find properties of interest
3. **Enquiry:** A buyer enquires on a property, which initiates a confidential guided conversation between the parties
4. **Guided process:** The platform provides contextual guidance to each party:
   - For sellers: prompts around organising inspections, responding to offers, understanding legal steps
   - For buyers: prompts around building & pest inspections, finance pre-approval, legal obligations
5. **Third-party connection:** When the transaction progresses to the point where legal representation is needed, the platform facilitates connecting both parties with their respective conveyancers/solicitors

## UX Principles

When building any feature or flow, always apply these principles:

- **Clarity over brevity.** Users are often navigating unfamiliar legal and financial territory. Explain what things mean, what happens next, and what the consequences of decisions are. Never assume knowledge.
- **Security and trust.** Every interaction should feel secure. Use clear confirmation steps, explain why information is needed, and ensure sensitive data (financial, personal, legal) is handled with visible care.
- **Progressive disclosure.** Don't overwhelm users with everything upfront. Reveal information and steps as they become relevant in the process.
- **Confidence through guidance.** The platform should make users feel confident they're doing things correctly. Use contextual tips, checklists, and status indicators to reinforce progress.
- **Neutrality.** Reasy facilitates the connection between buyer and seller -- it doesn't advocate for either side. Guidance should be balanced and factual.

## Tech Stack

- **Framework:** React 19 + TypeScript (Vite)
- **Styling:** Tailwind CSS v4 with shadcn/ui components
- **Icons:** Lucide React, Tabler Icons
- **Font:** DM Sans, Geist (variable)
- **Charts:** Recharts
- **Forms/Validation:** Zod
- **UI Primitives:** Base UI, cmdk, Vaul (drawers), Sonner (toasts)
