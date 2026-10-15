import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import {
  IconArrowRight,
  IconArrowLeft,
  IconChevronDown,
  IconHome,
  IconSearch,
  IconSparkles,
  IconSpeakerphone,
  IconX,
  IconMenu2,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCircleCheck,
  type IconProps,
} from "@tabler/icons-react"

import logoImg from "@/assets/reasy-logo.svg"
import logoWhiteImg from "@/assets/reasy-logo-white.svg"
import dashImg from "@/assets/reasy-dashboard.png"
import mobileDashImg from "@/assets/Mobile-Dash-Reasy.png"
import buyerDashImg from "@/assets/reasy-buyer-dashboard.png"
import buyerDashMobileImg from "@/assets/reasy-buyer-dashboard-mobile.png"
import keepTrackImg from "@/assets/keep-track-sale.png"
import talkDirectlyImg from "@/assets/tak-directly-with-buyers.png"
import conveyancerImg from "@/assets/Container-3.png"
import summaryImg from "@/assets/everything in one place-1.png"
import listQuietlyImg from "@/assets/private-listing-with-reasy.png"
import browsePrivatelyImg from "@/assets/browse-privatley.png"
import enquireDirectlyImg from "@/assets/enquire-directly.png"
import buyingChecklistImg from "@/assets/reasy-buyers-card-3.png"
import sellingAssistantImg from "@/assets/selling-assistant.png"
import aiPricingImg from "@/assets/reasy-ai-pricing-tools.jpg"
import dailyMailLogo from "@/assets/daily-mail-logo.png"
import yahooFinanceLogo from "@/assets/yahoo-finance-logo.png"

type TablerIcon = ComponentType<IconProps>

// Where "join" style CTAs lead while the site is pre-launch.
const WAITLIST_HREF = "/for-buyers#join"

type Audience = "selling" | "buying"

// Reads ?for=buying|selling so a link can land on the right view.
function initialAudience(): Audience {
  const param = new URLSearchParams(window.location.search).get("for")
  return param === "buying" ? "buying" : "selling"
}

const navLinks: Record<Audience, { label: string; href: string }[]> = {
  selling: [
    { label: "How selling works", href: "#selling" },
    { label: "Reasy AI", href: "#reasy-ai" },
    { label: "Savings", href: "#savings" },
  ],
  buying: [
    { label: "How buying works", href: "#buying" },
    { label: "Buyer guide", href: "/for-buyers" },
  ],
}

const audienceOptions: { value: Audience; label: string; icon: TablerIcon }[] = [
  { value: "selling", label: "I'm selling", icon: IconHome },
  { value: "buying", label: "I'm buying", icon: IconSearch },
]

// --- Buyer / seller splitter ---

function AudienceToggle({
  value,
  onChange,
  size = "lg",
  className,
}: {
  value: Audience
  onChange: (value: Audience) => void
  size?: "sm" | "lg"
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label="Show Reasy for"
      className={cn(
        "relative inline-grid grid-cols-2 rounded-full border border-border bg-card p-1 shadow-xs",
        className
      )}
    >
      {/* Sliding highlight behind the active option */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full transition-all duration-300 ease-out",
          value === "selling" ? "translate-x-0 bg-primary" : "translate-x-full bg-green-foreground"
        )}
      />
      {audienceOptions.map(({ value: option, label, icon: Icon }) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              "relative z-10 inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              size === "lg" ? "px-5 py-2.5 text-base" : "px-3.5 py-1.5 text-sm",
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={size === "lg" ? "size-5" : "size-4"} stroke={1.75} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

// --- Announcement bar ---

function AnnouncementBar() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div className="relative bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-3 px-12 py-2.5 text-sm">
        <IconSpeakerphone className="hidden size-4 shrink-0 sm:block" stroke={1.75} />
        <p className="text-center">
          Reasy opens its doors on 1 November 2026.
          <a
            href={WAITLIST_HREF}
            className="ml-2 inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-0.5 text-xs font-semibold text-foreground transition-colors hover:bg-card/80 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Join the waitlist
            <IconArrowRight className="size-3" />
          </a>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-card/60 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Dismiss announcement"
      >
        <IconX className="size-4" />
      </button>
    </div>
  )
}

// --- Nav ---

function Nav({ audience, onAudienceChange }: { audience: Audience; onAudienceChange: (value: Audience) => void }) {
  const [scrolled, setScrolled] = useState(false)
  // The hero has its own toggle; the nav copy only appears once that's out of view.
  const [pastHero, setPastHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      setPastHero(window.scrollY > 280)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/90 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-sm"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-4 md:h-20 md:px-8">
        <div className="flex items-center gap-10">
          <a href="/new-home" aria-label="Reasy home">
            <img src={logoImg} alt="Reasy" className="h-6 dark:hidden" />
            <img src={logoWhiteImg} alt="Reasy" className="hidden h-6 dark:block" />
          </a>
          <div className="hidden items-center gap-1 xl:flex">
            {navLinks[audience].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          inert={!pastHero}
          className={cn(
            "hidden transition-opacity duration-300 lg:block",
            pastHero ? "opacity-100" : "opacity-0"
          )}
        >
          <AudienceToggle value={audience} onChange={onAudienceChange} size="sm" />
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WAITLIST_HREF}
            className="hidden rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:inline-flex outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Log in
          </a>
          <a
            href={WAITLIST_HREF}
            className="inline-flex rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong active:translate-y-px outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Get early access
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent xl:hidden outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "grid overflow-hidden border-border transition-all duration-300 xl:hidden",
          menuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 px-4 py-4">
            <AudienceToggle
              value={audience}
              onChange={(value) => {
                onAudienceChange(value)
                setMenuOpen(false)
              }}
              size="sm"
              className="mb-3 self-start"
            />
            {navLinks[audience].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WAITLIST_HREF}
              className="mt-2 rounded-full border border-border bg-card px-3 py-3 text-center text-base font-medium text-foreground sm:hidden"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

// --- Hero ---

const heroContent: Record<
  Audience,
  {
    title: string
    body: string
    primary: { label: string; href: string; icon: TablerIcon }
    secondary: { label: string; href: string }
    note: { highlight: string; rest: string }
    image: { desktop: string; mobile: string; alt: string }
  }
> = {
  selling: {
    title: "Selling your home, made easy.",
    body: "Reasy guides you from first enquiry to signed contract, for a flat fee instead of thousands in agent commission.",
    primary: { label: "List your property", href: WAITLIST_HREF, icon: IconHome },
    secondary: { label: "See what you could save", href: "#savings" },
    note: { highlight: "$99 to list", rest: "No commission, ever" },
    image: {
      desktop: dashImg,
      mobile: mobileDashImg,
      alt: "The Reasy seller dashboard showing enquiries, offers and next steps",
    },
  },
  buying: {
    title: "Buying your next home, made easy.",
    body: "Find homes listed by their owners, talk to sellers directly and follow a checklist that explains every step, from finance to settlement.",
    primary: { label: "Get early access to listings", href: WAITLIST_HREF, icon: IconSearch },
    secondary: { label: "See how buying works", href: "#buying" },
    note: { highlight: "Every seller is verified", rest: "No agent in the middle" },
    image: {
      desktop: buyerDashImg,
      mobile: buyerDashMobileImg,
      alt: "The Reasy buyer dashboard showing saved homes and next steps",
    },
  },
}

function Hero({ audience, onAudienceChange }: { audience: Audience; onAudienceChange: (value: Audience) => void }) {
  const content = heroContent[audience]
  const PrimaryIcon = content.primary.icon

  return (
    <section className="relative overflow-hidden px-4 pt-12 text-center md:pt-20">
      <AudienceToggle value={audience} onChange={onAudienceChange} />

      <div key={audience} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h1 className="mx-auto mt-10 max-w-[900px] text-balance font-serif text-5xl leading-[1.05] tracking-tight text-brand-dark md:text-7xl lg:text-8xl dark:text-foreground">
          {content.title}
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed text-muted-foreground">
          {content.body}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={content.primary.href}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-strong active:translate-y-px sm:w-auto outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <PrimaryIcon className="size-5" stroke={1.75} />
            {content.primary.label}
          </a>
          <a
            href={content.secondary.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground shadow-xs transition-colors hover:bg-accent sm:w-auto outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {content.secondary.label}
            <IconArrowRight className="size-4" />
          </a>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-green-foreground">{content.note.highlight}</span>
          <span className="mx-2">•</span>
          {content.note.rest}
        </p>

        {/* Product preview on a soft gradient stage */}
        <div className="relative mx-auto mt-14 max-w-[1200px] md:mt-20">
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 top-[18%] rounded-3xl md:top-1/4",
              audience === "selling" ? "feature-glow" : "feature-glow-green"
            )}
          />
          <div className="relative mx-auto max-w-[420px] px-4 pb-0 md:max-w-[1040px] md:px-10">
            <div className="rounded-t-3xl border border-b-0 border-border bg-card p-2 shadow-2xl md:rounded-t-2xl md:p-2.5">
              <img
                src={content.image.mobile}
                alt={content.image.alt}
                className="max-h-[560px] w-full rounded-t-2xl object-cover object-top md:hidden"
              />
              <img
                src={content.image.desktop}
                alt={content.image.alt}
                className="hidden w-full rounded-t-xl md:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Intro ---

const introContent: Record<Audience, { title: string; body: string }> = {
  selling: {
    title: "There's more to selling than finding a buyer.",
    body: "Price it, list it, show it, negotiate and settle. Reasy gives you the tools and plain-English guidance for every step, before, during and after the sale.",
  },
  buying: {
    title: "There's more to buying than finding the one.",
    body: "Finance, inspections, offers, contracts and settlement. Reasy explains what each step means and when to do it, so nothing catches you off guard.",
  },
}

function Intro({ audience }: { audience: Audience }) {
  const content = introContent[audience]
  return (
    <section className="px-4 pb-8 pt-24 text-center md:pt-36">
      <h2 className="mx-auto max-w-[760px] text-balance font-serif text-4xl leading-[1.1] text-brand-dark md:text-6xl dark:text-foreground">
        {content.title}
      </h2>
      <p className="mx-auto mt-6 max-w-[620px] text-lg leading-relaxed text-muted-foreground">
        {content.body}
      </p>
    </section>
  )
}

// --- Feature showcase (accordion + visual) ---

// Each showcase picks up one of the Reasy brand colours.
const tones = {
  blue: { chip: "bg-primary text-primary-foreground", glow: "feature-glow" },
  green: { chip: "bg-green text-green-foreground", glow: "feature-glow-green" },
  pink: { chip: "bg-pink text-pink-foreground", glow: "feature-glow-pink" },
}

type FeatureItem = {
  title: string
  description: string
  image: string
  alt: string
}

function FeatureShowcase({
  id,
  icon: Icon,
  eyebrow,
  badge,
  title,
  items,
  cta,
  tone = "blue",
}: {
  id: string
  icon: TablerIcon
  eyebrow: string
  badge?: string
  title: string
  items: FeatureItem[]
  cta?: { label: string; href: string }
  tone?: keyof typeof tones
}) {
  const [active, setActive] = useState(0)
  const current = items[active]

  return (
    <section id={id} className="scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-20 gap-y-10 lg:grid-cols-2">
        {/* Heading */}
        <div className="lg:col-start-1">
          <div className="flex items-center gap-2">
            <span className={cn("flex size-7 items-center justify-center rounded-full", tones[tone].chip)}>
              <Icon className="size-4" stroke={2} />
            </span>
            <span className="text-sm font-medium text-foreground">{eyebrow}</span>
            {badge && (
              <span className="rounded-full bg-pink px-2 py-0.5 text-xs font-semibold text-pink-foreground">
                {badge}
              </span>
            )}
          </div>
          <h2 className="mt-5 max-w-[520px] font-serif text-4xl leading-[1.1] text-brand-dark md:text-5xl dark:text-foreground">
            {title}
          </h2>
        </div>

        {/* Visual */}
        <div className="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <div className={cn("flex aspect-[5/4] items-center justify-center overflow-hidden rounded-3xl p-6 md:p-12", tones[tone].glow)}>
            <div
              key={current.image}
              className="w-full max-w-[460px] animate-in fade-in zoom-in-95 duration-500"
            >
              <img
                src={current.image}
                alt={current.alt}
                className="max-h-[420px] w-full rounded-2xl bg-card object-contain shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="lg:col-start-1">
          <ul className="border-t border-border">
            {items.map((item, i) => {
              const isOpen = i === active
              return (
                <li key={item.title} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-4 rounded-lg py-5 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span
                      className={cn(
                        "text-lg font-medium transition-colors",
                        isOpen ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                        isOpen ? "bg-secondary text-secondary-foreground" : "text-muted-foreground group-hover:bg-accent"
                      )}
                    >
                      <IconChevronDown
                        className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")}
                      />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-[520px] pb-6 pr-12 leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          {cta && (
            <a
              href={cta.href}
              className="mt-8 inline-flex items-center gap-2 text-base font-medium text-primary transition-colors hover:text-primary/80 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {cta.label}
              <IconArrowRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

const sellingItems: FeatureItem[] = [
  {
    title: "List publicly or quietly",
    description:
      "Go live to every buyer on Reasy, or keep your listing private so only buyers you invite can see it. Handy if you're just testing the waters.",
    image: listQuietlyImg,
    alt: "A listing card with the private listing switch turned on",
  },
  {
    title: "Talk directly with buyers",
    description:
      "Answer questions, arrange inspections and negotiate in one secure chat. No middleman deciding which messages or offers you get to see.",
    image: talkDirectlyImg,
    alt: "A buyer asking to arrange an inspection and the seller replying",
  },
  {
    title: "Always know what's next",
    description:
      "A simple step-by-step checklist shows what's done, what's next and what each step means, from verifying ownership to settlement.",
    image: keepTrackImg,
    alt: "The seller checklist with ownership verified and enquiries waiting",
  },
  {
    title: "Legal help in the same place",
    description:
      "Invite your conveyancer (the licensed professional who handles the legal transfer of your property) into your Reasy workspace, so titles, contracts and settlement all live in one place.",
    image: conveyancerImg,
    alt: "A conveyancer connected to titles, contracts and settlement documents",
  },
]

const buyingItems: FeatureItem[] = [
  {
    title: "Browse homes privately",
    description:
      "Explore homes listed directly by their owners, including private listings you won't find on the big portals.",
    image: browsePrivatelyImg,
    alt: "Browsing private listings on Reasy",
  },
  {
    title: "Enquire with the owner",
    description:
      "Message the seller straight away and get answers from the person who knows the home best.",
    image: enquireDirectlyImg,
    alt: "Sending an enquiry directly to a home owner",
  },
  {
    title: "A checklist that keeps you on track",
    description:
      "Your buying checklist walks you through finance pre-approval, building and pest inspections, contract review and settlement, with a plain-English explanation of each one.",
    image: buyingChecklistImg,
    alt: "A buying checklist with finance and building and pest inspection ticked off",
  },
  {
    title: "Bring your conveyancer along",
    description:
      "Invite your conveyancer (the licensed professional who handles the legal side of buying a home) into your Reasy workspace, so contracts, titles and settlement all live in one place.",
    image: conveyancerImg,
    alt: "A conveyancer connected to titles, contracts and settlement documents",
  },
]

const aiItems: FeatureItem[] = [
  {
    title: "Price it with confidence",
    description:
      "Comparable sales, local demand and pricing suggestions, so you know what to list at and where you're likely to land.",
    image: aiPricingImg,
    alt: "The Reasy AI pricing tool on a phone",
  },
  {
    title: "Your selling assistant",
    description:
      "Sorts enquiries by how serious each buyer is, suggests replies and reminds you to follow up so warm leads never go cold.",
    image: sellingAssistantImg,
    alt: "The selling assistant checklist for qualifying a buyer",
  },
  {
    title: "Everything at a glance",
    description:
      "Offers, enquiries and views in one summary, with suggestions on how to improve your listing when interest slows.",
    image: summaryImg,
    alt: "A summary of offers, enquiries and listing views",
  },
]

// --- Savings (stat cards carousel) ---

const AGENT_RATE = 0.025
const savingsExamples = [
  { price: 650_000, place: "A unit in Brisbane" },
  { price: 950_000, place: "A family home in Geelong" },
  { price: 1_450_000, place: "A house in Sydney's west" },
  { price: 2_100_000, place: "A beachside home on the Gold Coast" },
]

const formatAud = (val: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(val)

function Savings() {
  const scroller = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <section id="savings" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">What you could keep</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[560px] font-serif text-4xl leading-[1.1] text-brand-dark md:text-5xl dark:text-foreground">
            Real homes. Real savings.
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label="Previous example"
            >
              <IconArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label="Next example"
            >
              <IconArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:px-[max(2rem,calc((100vw-1280px)/2+2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {savingsExamples.map(({ price, place }) => {
          const commission = price * AGENT_RATE
          return (
            <article
              key={price}
              className="flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-3xl border border-border bg-card p-8 sm:w-[420px] md:p-10"
            >
              <div>
                <p className="font-serif text-5xl leading-none tracking-tight text-primary md:text-6xl">
                  {formatAud(commission)}
                </p>
                <p className="mt-3 text-base text-muted-foreground">in agent commission you could keep*</p>
              </div>
              <div className="mt-16 border-t border-border pt-6">
                <p className="text-lg font-medium text-foreground">{place}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Selling for {formatAud(price)}. On Reasy, it's $99 to list.
                </p>
              </div>
            </article>
          )
        })}
      </div>

      <p className="mx-auto mt-6 max-w-[1280px] px-4 text-xs text-muted-foreground md:px-8">
        *Illustrative examples based on a typical agent commission of 2.5%. Actual
        commission rates vary by agent and location.
      </p>
    </section>
  )
}

// --- Both sides of the sale (Calendly's integrations block) ---

function BothSides({ audience, onAudienceChange }: { audience: Audience; onAudienceChange: (value: Audience) => void }) {
  const cards = [
    {
      icon: IconHome,
      value: "selling" as Audience,
      title: "For sellers",
      body: "List your home, talk to buyers, review offers and bring in your conveyancer, all from one dashboard.",
      cta: "Switch to selling",
    },
    {
      icon: IconSearch,
      value: "buying" as Audience,
      title: "For buyers",
      body: "Find homes listed by their owners, enquire directly and follow a checklist that explains every step.",
      cta: "Switch to buying",
    },
  ]

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1280px] rounded-3xl bg-card p-8 shadow-xs ring-1 ring-border md:p-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Buyers and sellers</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.1] text-brand-dark md:text-5xl dark:text-foreground">
              Built for both sides of the sale
            </h2>
            <p className="mt-5 max-w-[420px] leading-relaxed text-muted-foreground">
              Reasy doesn't take sides. It connects buyers and sellers directly and
              gives each of them clear, balanced guidance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map(({ value, icon: Icon, title, body, cta }) => {
              const current = value === audience
              return (
                <button
                  key={title}
                  type="button"
                  disabled={current}
                  onClick={() => onAudienceChange(value)}
                  className={cn(
                    "group flex flex-col rounded-2xl p-7 text-left outline-none transition-shadow focus-visible:ring-3 focus-visible:ring-ring/50",
                    current
                      ? "bg-secondary ring-2 ring-primary"
                      : "bg-background ring-1 ring-border hover:shadow-md"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-full",
                      value === "selling" ? "bg-primary text-primary-foreground" : "bg-green text-green-foreground"
                    )}
                  >
                    <Icon className="size-5" stroke={1.75} />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{body}</p>
                  {current ? (
                    <span className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-primary">
                      <IconCircleCheck className="size-4" />
                      You're viewing this
                    </span>
                  ) : (
                    <span className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-primary">
                      {cta}
                      <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-border pt-10 sm:flex-row sm:justify-center sm:gap-12">
          <p className="text-sm text-muted-foreground">As featured in</p>
          <div className="flex items-center gap-10 opacity-70 grayscale dark:invert">
            <img src={dailyMailLogo} alt="Daily Mail" className="h-6 w-auto" />
            <img src={yahooFinanceLogo} alt="Yahoo Finance" className="h-5 w-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Final CTA with status marquee ---

const milestones = [
  { stage: "Enquiry", status: "Received" },
  { stage: "Inspection", status: "Booked" },
  { stage: "Offer", status: "Accepted" },
  { stage: "Conveyancer", status: "Connected" },
  { stage: "Contract", status: "Signed" },
  { stage: "Settlement", status: "Complete" },
]

function MilestoneCard({ stage, status }: { stage: string; status: string }) {
  return (
    <div className="feature-glow flex h-44 w-64 shrink-0 items-end rounded-2xl p-4 md:h-52 md:w-72">
      <div className="flex w-full items-center gap-3 rounded-xl bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
        <IconCircleCheck className="size-6 shrink-0 text-green-foreground" stroke={1.75} />
        <div className="leading-tight">
          <p className="text-base font-semibold text-foreground">{stage}</p>
          <p className="text-sm text-muted-foreground">{status}</p>
        </div>
      </div>
    </div>
  )
}

const getStartedContent: Record<Audience, { body: string; cta: string }> = {
  selling: {
    body: "Everything around selling your home, handled in one place. Founding members get priority access when Reasy opens on 1 November 2026.",
    cta: "Join the seller waitlist",
  },
  buying: {
    body: "Everything around buying your next home, handled in one place. Join the waitlist to be first to see homes when Reasy opens on 1 November 2026.",
    cta: "Join the buyer waitlist",
  },
}

function GetStarted({ audience }: { audience: Audience }) {
  const content = getStartedContent[audience]
  return (
    <section id="get-started" className="overflow-hidden pb-24 pt-16 text-center md:pb-32 md:pt-24">
      <div className="px-4">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Get started</p>
        <h2 className="mx-auto mt-3 max-w-[720px] text-balance font-serif text-4xl leading-[1.1] text-brand-dark md:text-6xl dark:text-foreground">
          From first enquiry to signed contract
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed text-muted-foreground">
          {content.body}
        </p>
        <a
          href={WAITLIST_HREF}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-strong active:translate-y-px outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {content.cta}
          <IconArrowRight className="size-4" />
        </a>
      </div>

      <div className="relative mt-16 md:mt-20" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {[...milestones, ...milestones].map((m, i) => (
            <MilestoneCard key={i} {...m} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background md:w-40" />
      </div>
    </section>
  )
}

// --- Footer ---

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-white">{title}</p>
      <ul className="space-y-3 text-base text-white/60">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <li>
      <a
        href={href}
        className="transition-colors hover:text-white outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    </li>
  )
}

function Footer() {
  const socials = [
    { icon: IconBrandInstagram, label: "Instagram", href: "https://www.instagram.com/agents_want_me_cancelled?igsh=aTBud3F5cHQzb2Iz&utm_source=qr" },
    { icon: IconBrandTiktok, label: "TikTok", href: "https://www.tiktok.com/@agentswantmecancelled?_r=1&_t=ZS-95xMn4ARczX" },
    { icon: IconBrandYoutube, label: "YouTube", href: "https://www.youtube.com/@heyreasy" },
  ]

  return (
    <footer className="px-4 pb-4 md:px-6 md:pb-6">
      <div className="mx-auto max-w-[1400px] rounded-3xl bg-brand-dark px-8 py-14 text-white md:px-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img src={logoWhiteImg} alt="Reasy" className="h-7" />
            <p className="mt-8 max-w-[320px] font-serif text-4xl leading-[1.1] md:text-5xl">
              Keep what's yours.
            </p>
            <div className="mt-8 flex items-center gap-5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/60 transition-colors hover:text-white outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Icon className="size-5" stroke={1.5} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Platform">
            <FooterLink href="/new-home?for=selling">For sellers</FooterLink>
            <FooterLink href="/new-home?for=buying">For buyers</FooterLink>
            <FooterLink href="/new-home?for=selling#reasy-ai">Reasy AI</FooterLink>
            <FooterLink href="/new-home?for=selling#savings">Savings</FooterLink>
          </FooterColumn>

          <FooterColumn title="Get started">
            <FooterLink href={WAITLIST_HREF}>Join the waitlist</FooterLink>
            <FooterLink href="/for-buyers">Buyer guide</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/50 md:flex-row md:justify-between">
          <p className="max-w-[640px]">
            Reasy operates as a digital platform and does not act as a real estate
            agent or conveyancer. Any services that require licensing are carried
            out by external, qualified professionals. Results can differ and are
            influenced by market conditions and the choices made by users.
          </p>
          <p className="shrink-0">&copy; 2026 Reasy Pty Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// --- Page ---

export function NewHomePage() {
  const [audience, setAudience] = useState<Audience>(initialAudience)

  const changeAudience = (value: Audience) => {
    setAudience(value)
    const url = new URL(window.location.href)
    url.searchParams.set("for", value)
    url.hash = ""
    window.history.replaceState(null, "", url)
  }

  // Switching from further down the page brings you back to the top of the new view.
  const switchAndScroll = (value: Audience) => {
    changeAudience(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div data-slot="new-home-page" className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Nav audience={audience} onAudienceChange={changeAudience} />
      <main>
        <Hero audience={audience} onAudienceChange={changeAudience} />
        <Reveal key={`intro-${audience}`}><Intro audience={audience} /></Reveal>
        {audience === "selling" ? (
          <>
            <Reveal key="selling">
              <FeatureShowcase
                id="selling"
                icon={IconHome}
                eyebrow="Selling"
                title="A better way to sell your home"
                items={sellingItems}
              />
            </Reveal>
            <Reveal key="reasy-ai">
              <FeatureShowcase
                id="reasy-ai"
                icon={IconSparkles}
                eyebrow="Reasy AI"
                badge="Beta"
                title="Meet your AI selling assistant"
                items={aiItems}
                tone="pink"
              />
            </Reveal>
            <Reveal key="savings"><Savings /></Reveal>
          </>
        ) : (
          <Reveal key="buying">
            <FeatureShowcase
              id="buying"
              icon={IconSearch}
              eyebrow="Buying"
              title="Buy direct from the owner, with guidance"
              items={buyingItems}
              tone="green"
              cta={{ label: "Explore Reasy for buyers", href: "/for-buyers" }}
            />
          </Reveal>
        )}
        <Reveal><BothSides audience={audience} onAudienceChange={switchAndScroll} /></Reveal>
        <Reveal><GetStarted audience={audience} /></Reveal>
      </main>
      <Footer />
    </div>
  )
}
