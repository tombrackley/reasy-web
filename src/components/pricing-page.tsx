import { useState } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { AnnouncementBar, AudienceToggle, Footer, Nav, WAITLIST_HREF, type Audience } from "@/components/new-home-page"
import { IconChevronDown, IconCoin } from "@tabler/icons-react"

// Plans and prices come from reasy-app's src/data/plan.ts, which transcribes
// the pricing page in Notion. Keep the two in step if either changes.

type Tone = "navy" | "blue" | "seller" | "buyer"

type PlanCard = {
  name: string
  tagline: string
  price: string
  period?: string
  tone: Tone
  // One value per comparison row, with optional accent detail on the right
  rows: { value: string; extra?: string }[]
  summary: string
  cta: string
  href: string
  footnote: string
}

type Pricing = {
  heading: string
  rowLabels: string[]
  plans: PlanCard[]
}

const pricing: Record<Audience, Pricing> = {
  selling: {
    heading: "Sell for a flat fee, not commission",
    rowLabels: ["Paid today", "After that", "Listing fee", "Verification", "Commission"],
    plans: [
      {
        name: "Monthly",
        tagline: "Pay as you go until it sells",
        price: "$129",
        period: "then $29 / month",
        tone: "seller",
        rows: [
          { value: "$129 once-off", extra: "first month included" },
          { value: "$29 a month", extra: "from month two until sold" },
          { value: "Included" },
          { value: "KYC, ownership and title" },
          { value: "None, ever" },
        ],
        summary: "List for $129, then $29 a month from month two. Payments stop when your property sells.",
        cta: "List your property",
        href: WAITLIST_HREF,
        footnote: "Cancel when your property sells",
      },
      {
        name: "Annual",
        tagline: "Save $149 on a longer sale",
        price: "$299",
        period: "/ 12 months",
        tone: "navy",
        rows: [
          { value: "$299", extra: "paid once" },
          { value: "Nothing more", extra: "12 months access" },
          { value: "Included", extra: "$129 value" },
          { value: "KYC, ownership and title" },
          { value: "None, ever" },
        ],
        summary: "One payment covers your listing and 12 months of access, with nothing more to pay.",
        cta: "List your property",
        href: WAITLIST_HREF,
        footnote: "Save $149 against paying monthly for a year",
      },
    ],
  },
  buying: {
    heading: "Start browsing for free",
    rowLabels: ["New listings", "Messaging sellers", "Offers and inspections", "My purchase team", "Verification"],
    plans: [
      {
        name: "Free",
        tagline: "For getting a feel for it",
        price: "$0",
        period: "/ month",
        tone: "buyer",
        rows: [
          { value: "Seven days after posting" },
          { value: "One property", extra: "for 30 days" },
          { value: "Not included" },
          { value: "Not included" },
          { value: "Unverified profile" },
        ],
        summary: "Browse homes and message the seller of one property while you work out what you're after.",
        cta: "Join for free",
        href: WAITLIST_HREF,
        footnote: "No card required",
      },
      {
        name: "Monthly",
        tagline: "For buyers ready to act",
        price: "$29",
        period: "/ month",
        tone: "blue",
        rows: [
          { value: "Instantly" },
          { value: "Unlimited properties" },
          { value: "Included" },
          { value: "Included" },
          { value: "KYC included", extra: "verified badge" },
        ],
        summary: "Make offers, book inspections and bring your team in. No upfront fee, month to month.",
        cta: "Get Monthly",
        href: WAITLIST_HREF,
        footnote: "Renews automatically each month",
      },
      {
        name: "Annual",
        tagline: "For a longer search",
        price: "$299",
        period: "/ 12 months",
        tone: "navy",
        rows: [
          { value: "Instantly" },
          { value: "Unlimited properties" },
          { value: "Included" },
          { value: "Included" },
          { value: "KYC included", extra: "verified badge" },
        ],
        summary: "Everything in Monthly for 12 months, paid once.",
        cta: "Get Annual",
        href: WAITLIST_HREF,
        footnote: "Saves $49 versus the monthly plan",
      },
    ],
  },
}

// Dark cards carry white text. The seller (lime green) and buyer (light
// turquoise) cards are light, so they flip to the app's dark ink for each.
const toneClass: Record<Tone, { card: string; extra: string; muted: string; line: string; cta: string }> = {
  navy: { card: "bg-brand-dark text-white", extra: "text-lime", muted: "text-white/60", line: "border-white/20", cta: "bg-white text-brand-dark hover:bg-white/90" },
  blue: { card: "bg-primary-strong text-white", extra: "text-white", muted: "text-white/70", line: "border-white/20", cta: "bg-white text-brand-dark hover:bg-white/90" },
  seller: { card: "bg-seller text-seller-foreground", extra: "text-seller-foreground", muted: "text-seller-foreground/70", line: "border-seller-foreground/15", cta: "bg-seller-foreground text-white hover:bg-seller-foreground/90" },
  buyer: { card: "bg-buyer text-buyer-foreground", extra: "text-buyer-ink", muted: "text-buyer-foreground/70", line: "border-buyer-foreground/15", cta: "bg-buyer-foreground text-white hover:bg-buyer-foreground/90" },
}

// Fixed heights keep each card's rows level with the labels column on desktop.
const headerHeight = "lg:h-52"
const rowClass = "flex min-h-14 items-center justify-between gap-3 border-t py-3"

function PlanColumn({ plan, labels }: { plan: PlanCard; labels: string[] }) {
  const tone = toneClass[plan.tone]
  return (
    <article className={cn("flex flex-col rounded-3xl p-7 md:p-9", tone.card)}>
      <div className={cn("flex flex-col", headerHeight)}>
        <h3 className="text-2xl font-semibold">{plan.name}</h3>
        <p className={cn("mt-1 text-lg", tone.muted)}>{plan.tagline}</p>
        <p className="mt-6 flex flex-wrap items-baseline gap-x-2 lg:mt-auto lg:pb-6">
          <span className="font-display text-6xl leading-none">{plan.price}</span>
          {plan.period && <span className="text-lg">{plan.period}</span>}
        </p>
      </div>

      <dl className="mt-6 lg:mt-0">
        {plan.rows.map((row, i) => (
          <div key={labels[i]} className={cn(rowClass, tone.line)}>
            <div>
              <dt className={cn("text-xs font-medium uppercase tracking-wider lg:sr-only", tone.muted)}>{labels[i]}</dt>
              <dd className="text-base">{row.value}</dd>
            </div>
            {row.extra && <span className={cn("shrink-0 text-right text-sm font-semibold", tone.extra)}>{row.extra}</span>}
          </div>
        ))}
      </dl>

      <p className={cn("border-t pt-4 text-lg leading-snug", tone.line)}>{plan.summary}</p>

      <div className="mt-auto pt-10">
        <a
          href={plan.href}
          className={cn("inline-flex rounded-full px-6 py-3 text-base font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px", tone.cta)}
        >
          {plan.cta}
        </a>
        <p className={cn("mt-4 text-sm", tone.muted)}>{plan.footnote}</p>
      </div>
    </article>
  )
}

const faqs: Record<Audience, { q: string; a: string }[]> = {
  selling: [
    {
      q: "Does Reasy take a commission?",
      a: "No. You pay a flat fee for the platform and keep the full sale price. Reasy never takes a percentage, whatever your home sells for.",
    },
    {
      q: "What does the $129 cover?",
      a: "Your listing, seller identity checks (KYC), proof you own the property, a title check and your first month on Reasy. From month two it's $29 a month on the Monthly plan.",
    },
    {
      q: "What happens when my home sells?",
      a: "On Monthly, payments stop when your property sells. On Annual you've already paid for twelve months, so there's nothing more to cancel.",
    },
    {
      q: "Do I still need a conveyancer?",
      a: "Yes, we recommend one. A conveyancer is the licensed professional who handles the legal transfer of your property. Their fees are separate and paid to them directly.",
    },
  ],
  buying: [
    {
      q: "Can I really browse for free?",
      a: "Yes. On Free you can see homes seven days after they're posted and message the seller of one property for 30 days, with no card needed. Offers, inspections and My Team aren't included.",
    },
    {
      q: "Why upgrade to a paid plan?",
      a: "Paid plans show you new listings instantly, let you message the sellers of as many properties as you like, and unlock offer management, inspections and My Team.",
    },
    {
      q: "How does billing work?",
      a: "Monthly is $29 a month, month to month, and renews automatically. Annual is a single $299 payment for 12 months, which saves $49 against paying monthly.",
    },
    {
      q: "Why verify my identity?",
      a: "Sellers can see you're a real buyer before they share details or accept an offer. Identity verification (KYC) and a verified badge are included in both paid plans.",
    },
  ],
}

function initialAudience(): Audience {
  return new URLSearchParams(window.location.search).get("for") === "buying" ? "buying" : "selling"
}

export function PricingPage() {
  const [audience, setAudience] = useState<Audience>(initialAudience)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const data = pricing[audience]
  const cols = data.plans.length === 3 ? "lg:grid-cols-[minmax(0,0.8fr)_repeat(3,minmax(0,1fr))]" : "lg:grid-cols-[minmax(0,0.8fr)_repeat(2,minmax(0,1fr))]"

  const changeAudience = (value: Audience) => {
    setAudience(value)
    setOpenFaq(0)
    const url = new URL(window.location.href)
    url.searchParams.set("for", value)
    window.history.replaceState(null, "", url)
  }

  return (
    <div data-slot="pricing-page" className="min-h-screen bg-canvas text-foreground">
      <AnnouncementBar />
      <Nav />
      <main>
        <section className="px-3 md:px-6">
          <div className="hero-wash rounded-4xl px-4 pb-16 pt-16 text-center md:pb-20 md:pt-24">
            <span className="inline-flex items-center gap-2 text-base font-semibold text-foreground">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <IconCoin className="size-5" stroke={1.75} />
              </span>
              Pricing
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em] text-brand-dark md:text-7xl dark:text-foreground">
              Simple, flat pricing. No commission.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Pick the plan that suits how you're buying or selling. Reasy never takes a cut of
              your sale.
            </p>
            <div className="mt-10">
              <AudienceToggle value={audience} onChange={changeAudience} />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24 lg:px-14">
          <div key={audience} className={cn("mx-auto grid max-w-[1400px] animate-in fade-in gap-4 duration-500", cols)}>
            {/* Labels column, desktop only */}
            <div className="hidden lg:flex lg:flex-col lg:pr-6 lg:pt-9">
              <div className={cn("flex items-end pb-6", headerHeight)}>
                <h2 className="text-2xl font-semibold text-foreground">{data.heading}</h2>
              </div>
              {data.rowLabels.map((label) => (
                <div key={label} className={cn(rowClass, "border-border text-lg text-muted-foreground")}>
                  {label}
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-foreground lg:hidden">{data.heading}</h2>
            {data.plans.map((plan) => (
              <PlanColumn key={plan.name} plan={plan} labels={data.rowLabels} />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[1400px] text-sm text-muted-foreground">
            Prices are in Australian dollars. Conveyancing and other professional fees are separate.
          </p>
        </section>

        <Reveal>
          <section className="mx-auto grid max-w-[1280px] gap-10 px-4 pb-24 md:px-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Questions</p>
              <h2 className="mt-3 font-serif text-4xl leading-[1.1] text-brand-dark md:text-5xl dark:text-foreground">
                {audience === "selling" ? "Pricing for sellers, explained" : "Pricing for buyers, explained"}
              </h2>
            </div>
            <ul className="border-t border-border">
              {faqs[audience].map((f, i) => {
                const open = openFaq === i
                return (
                  <li key={f.q} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 rounded-lg py-5 text-left text-lg font-medium text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {f.q}
                      <IconChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform duration-300", open && "rotate-180")} />
                    </button>
                    <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <div className="min-h-0 overflow-hidden">
                        <p className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">{f.a}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
