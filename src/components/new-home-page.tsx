import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { WAITLIST_HREF } from "@/lib/waitlist"
import { Reveal } from "@/components/reveal"
import { CommentMarquee, MobileCommentCarousel, Stat } from "@/components/instagram-comments"
import {
  IconArrowRight,
  IconArrowLeft,
  IconChevronDown,
  IconHome,
  IconSearch,
  IconSparkles2Filled,
  IconRoute,
  IconBuildingBank,
  IconEyeOff,
  IconScale,
  IconHomeSearch,
  IconChartBar,
  IconMessageChatbot,
  IconLayoutDashboard,
  IconSpeakerphone,
  IconX,
  IconMenu2,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCircleCheck,
  IconCoin,
  IconBook,
  IconListCheck,
  IconMessageCircle,
  IconMail,
  IconClipboardCheck,
  IconPhoto,
  IconFileText,
  IconKey,
  IconWallet,
  IconCalendar,
  type IconProps,
} from "@tabler/icons-react"

import logoImg from "@/assets/reasy-logo.svg"
import logoWhiteImg from "@/assets/reasy-logo-white.svg"
// Screens captured from reasy-app (seller /dashboard, buyer /buyer-dashboard,
// Ask Reasy and the pricing analysis panel)
import sellerDashImg from "@/assets/app/seller-dashboard.webp"
import sellerDashMobileImg from "@/assets/app/seller-dashboard-mobile.webp"
import buyerDashImg from "@/assets/app/buyer-dashboard.webp"
import buyerDashMobileImg from "@/assets/app/buyer-dashboard-mobile.webp"
import aiPricingImg from "@/assets/app/ai-pricing-analysis.webp"
import aiSellerAskImg from "@/assets/app/ai-seller-ask.webp"
import aiSellerGlanceImg from "@/assets/app/ai-seller-glance.webp"
import aiBuyerAskImg from "@/assets/app/ai-buyer-ask.webp"
import aiBuyerNextImg from "@/assets/app/ai-buyer-next.webp"
import aiBuyerFinanceImg from "@/assets/app/ai-buyer-finance.webp"

type TablerIcon = ComponentType<IconProps>

// Where "join" style CTAs lead while the site is pre-launch.

export type Audience = "selling" | "buying"

// Reads ?for=buying|selling so a link can land on the right view.
function initialAudience(): Audience {
  const param = new URLSearchParams(window.location.search).get("for")
  return param === "buying" ? "buying" : "selling"
}

// Shared nav for both views. Items either switch the page to an audience and
// scroll to a section, or link off to another page.
type NavItem = {
  label: string
  description: string
  icon: TablerIcon
  audience: Audience
  section?: string
  href?: string
}

const navMenus: { label: string; items: NavItem[] }[] = [
  {
    label: "For sellers",
    items: [
      { label: "How selling works", description: "List, talk to buyers and settle, step by step", icon: IconListCheck, audience: "selling", section: "selling" },
      { label: "Reasy AI", description: "Pricing help and a selling assistant", icon: IconSparkles2Filled, audience: "selling", section: "reasy-ai" },
      { label: "Pricing", description: "A flat fee, never commission", icon: IconCoin, audience: "selling", href: "/pricing" },
      { label: "List your property", description: "Join the seller waitlist", icon: IconHome, audience: "selling", section: "get-started" },
    ],
  },
  {
    label: "For buyers",
    items: [
      { label: "How buying works", description: "Enquire, inspect, offer and settle", icon: IconListCheck, audience: "buying", section: "buying" },
      { label: "Reasy AI", description: "Answers and next steps, any time", icon: IconSparkles2Filled, audience: "buying", section: "reasy-ai-buying" },
      { label: "Talk to sellers directly", description: "No agent in the middle", icon: IconMessageCircle, audience: "buying", section: "buying" },
      { label: "Buyer guide", description: "What to expect when buying privately", icon: IconBook, audience: "buying", href: "/for-buyers" },
      { label: "Join the buyer waitlist", description: "Be first to see new listings", icon: IconMail, audience: "buying", section: "get-started" },
    ],
  },
]

const navLinks = [
  { label: "Browse properties", href: "/browse" },
  { label: "Pricing", href: "/pricing" },
]

export type NavigateTo = (audience: Audience, section?: string) => void

// Off the home page, menu items load the home page in the right view.
const goToHome: NavigateTo = (audience, section) => {
  window.location.href = `/new-home?for=${audience}${section ? `#${section}` : ""}`
}

const audienceOptions: { value: Audience; label: string; icon: TablerIcon }[] = [
  { value: "selling", label: "I'm selling", icon: IconHome },
  { value: "buying", label: "I'm buying", icon: IconSearch },
]

// --- Buyer / seller splitter ---

export function AudienceToggle({
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
          value === "selling" ? "translate-x-0 bg-seller" : "translate-x-full bg-buyer"
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
              active
                ? option === "selling"
                  ? "text-seller-foreground"
                  : "text-buyer-foreground"
                : "text-muted-foreground hover:text-foreground"
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

export function AnnouncementBar() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div className="relative bg-sky text-sky-foreground">
      <div className="flex items-center justify-center gap-3 px-12 py-2.5 text-sm font-medium">
        <IconSpeakerphone className="hidden size-4 shrink-0 sm:block" stroke={1.75} />
        <p className="text-center">
          Reasy opens its doors on 1 November 2026.
          <a
            href={WAITLIST_HREF}
            className="ml-2 inline-flex items-center gap-1 rounded-full bg-card/70 px-2.5 py-0.5 text-xs font-semibold text-foreground transition-colors hover:bg-card/80 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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

const navLinkClass =
  "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50"

function NavMenuItem({ item, onNavigate, onDone }: { item: NavItem; onNavigate: NavigateTo; onDone: () => void }) {
  const { icon: Icon } = item
  const body = (
    <>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          item.audience === "selling" ? "bg-seller text-seller-foreground" : "bg-buyer text-buyer-foreground"
        )}
      >
        <Icon className="size-4.5" stroke={1.75} />
      </span>
      <span>
        <span className="block text-sm font-semibold text-foreground">{item.label}</span>
        <span className="block text-sm text-muted-foreground">{item.description}</span>
      </span>
    </>
  )
  const className =
    "flex w-full items-start gap-3 rounded-xl p-3 text-left outline-none transition-colors hover:bg-accent focus-visible:bg-accent"

  if (item.href) {
    return (
      <a href={item.href} className={className} onClick={onDone}>
        {body}
      </a>
    )
  }
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onNavigate(item.audience, item.section)
        onDone()
      }}
    >
      {body}
    </button>
  )
}

function NavDropdown({ label, items, onNavigate }: { label: string; items: NavItem[]; onNavigate: NavigateTo }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  // When hover has just opened the menu, the click that follows shouldn't close it.
  const hoverOpened = useRef(false)
  const menuId = `nav-menu-${label.toLowerCase().replace(/\s+/g, "-")}`

  // Close on outside click and Escape
  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        hoverOpened.current = true
        setOpen(true)
      }}
      onMouseLeave={() => {
        hoverOpened.current = false
        setOpen(false)
      }}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          if (hoverOpened.current) {
            hoverOpened.current = false
            setOpen(true)
          } else {
            setOpen((o) => !o)
          }
        }}
        className={cn(navLinkClass, open && "bg-accent text-accent-foreground")}
      >
        {label}
        <IconChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        // pt-2 bridges the gap so the menu stays open while the pointer moves into it
        <div id={menuId} className="absolute left-0 top-full z-50 pt-2">
          <div className="w-80 animate-in fade-in slide-in-from-top-1 rounded-2xl bg-card p-2 shadow-xl ring-1 ring-border duration-150">
            {items.map((item) => (
              <NavMenuItem key={item.label} item={item} onNavigate={onNavigate} onDone={() => setOpen(false)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Nav({ onNavigate = goToHome }: { onNavigate?: NavigateTo }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    // Fixed-height header so the page never jumps; the bar inside animates from
    // full width into a floating rounded container once you scroll (Calendly-style).
    <header className="sticky top-0 z-50 h-16 md:h-20">
      <div
        className={cn(
          "absolute flex flex-col transition-all duration-300 ease-out",
          scrolled
            ? "inset-x-3 top-3 rounded-2xl bg-card/95 shadow-lg ring-1 ring-border backdrop-blur-md md:inset-x-6 md:top-4"
            : "inset-x-0 top-0 rounded-none bg-canvas"
        )}
      >
      <nav
        className={cn(
          "flex items-center justify-between gap-6 transition-all duration-300",
          scrolled ? "h-16 px-4 md:px-5" : "h-16 px-4 md:h-20 md:px-8 lg:px-14"
        )}
      >
        <div className="flex items-center gap-8">
          {/* Flex removes the inline baseline gap; the small nudge optically
              centres the wordmark, whose "y" descender makes it sit high. */}
          <a href="/new-home" aria-label="Reasy home" className="flex items-center">
            <img src={logoImg} alt="Reasy" className="block h-6 translate-y-0.5 dark:hidden" />
            <img src={logoWhiteImg} alt="Reasy" className="hidden h-6 translate-y-0.5 dark:block" />
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {navMenus.map((menu) => (
              <NavDropdown key={menu.label} label={menu.label} items={menu.items} onNavigate={onNavigate} />
            ))}
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WAITLIST_HREF}
            className="hidden rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:inline-flex outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Log in
          </a>
          <button
            type="button"
            onClick={() => setWaitlistOpen(true)}
            aria-haspopup="dialog"
            className="inline-flex rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong active:translate-y-px outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Get early access
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent lg:hidden outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: same structure, grouped */}
      <div
        inert={!menuOpen}
        className={cn(
          "grid overflow-hidden rounded-b-2xl border-border transition-all duration-300 lg:hidden",
          menuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <div className="max-h-[calc(100dvh-7rem)] space-y-6 overflow-y-auto px-4 py-5">
            {navMenus.map((menu) => (
              <div key={menu.label}>
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{menu.label}</p>
                {menu.items.map((item) => (
                  <NavMenuItem key={item.label} item={item} onNavigate={onNavigate} onDone={() => setMenuOpen(false)} />
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-1 border-t border-border pt-4">
              <a href="/browse" className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-accent">
                Browse properties
              </a>
              <a href="/pricing" className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-accent">
                Pricing
              </a>
              <a
                href={WAITLIST_HREF}
                className="mt-2 rounded-full border border-border bg-card px-3 py-3 text-center text-base font-medium text-foreground sm:hidden"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
      {waitlistOpen && <WaitlistDialog onClose={() => setWaitlistOpen(false)} />}
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
  }
> = {
  selling: {
    title: "Sell without an agent. Easy.",
    body: "Keep the commission. We'll show you how, step by step.",
    primary: { label: "List your property", href: WAITLIST_HREF, icon: IconHome },
    secondary: { label: "See pricing", href: "/pricing" },
    note: { highlight: "From $129 to list", rest: "No commission, ever" },
  },
  buying: {
    title: "Buy without the middleman.",
    body: "Deal straight with the owner. No agent deciding who gets a look in, and no phantom offers pushing the price up.",
    primary: { label: "Get early access to listings", href: WAITLIST_HREF, icon: IconSearch },
    secondary: { label: "See how buying works", href: "#buying" },
    note: { highlight: "Every seller is verified", rest: "Message owners directly" },
  },
}

function Hero({ audience, onAudienceChange }: { audience: Audience; onAudienceChange: (value: Audience) => void }) {
  const content = heroContent[audience]
  const PrimaryIcon = content.primary.icon

  return (
    <section className="px-3 md:px-6">
      {/* Rounded hero container with a pink / lilac wash, after Calendly */}
      <div className="hero-wash relative overflow-hidden rounded-4xl px-4 pt-12 text-center md:pt-24">
        <AudienceToggle value={audience} onChange={onAudienceChange} />

        <div key={audience} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h1 className="mx-auto mt-10 max-w-[900px] text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em] text-brand-dark md:text-7xl lg:text-8xl dark:text-foreground">
            {content.title}
          </h1>
          <p className="mx-auto mt-7 max-w-[600px] text-lg leading-relaxed text-muted-foreground md:text-xl">
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
            <span className="font-semibold text-foreground underline underline-offset-2">{content.note.highlight}</span>
            <span className="mx-2">•</span>
            {content.note.rest}
          </p>
        </div>

        <HeroPreview audience={audience} />
      </div>
    </section>
  )
}

// Grey bar used by the wireframe placeholders that still lack real screens
function SkeletonBar({ className }: { className?: string }) {
  return <span className={cn("block h-3 rounded-full bg-muted", className)} />
}

const heroScreens: Record<Audience, { desktop: string; mobile: string; alt: string }> = {
  selling: {
    desktop: sellerDashImg,
    mobile: sellerDashMobileImg,
    alt: "The Reasy seller dashboard showing your listing, offers, inspections and Ask Reasy",
  },
  buying: {
    desktop: buyerDashImg,
    mobile: buyerDashMobileImg,
    alt: "The Reasy buyer dashboard with property search, saved searches and Ask Reasy",
  },
}

function HeroPreview({ audience }: { audience: Audience }) {
  const screen = heroScreens[audience]
  return (
    <div className="relative mt-16 md:mt-24">
      {/* The real app, cropped by the bottom of the hero like Calendly's */}
      <div
        key={audience}
        className="relative mx-auto max-w-[340px] animate-in fade-in overflow-hidden rounded-t-3xl border border-b-0 border-border bg-card p-1.5 pb-0 shadow-2xl duration-500 md:max-w-[1040px] md:p-2 md:pb-0"
      >
        <img src={screen.mobile} alt={screen.alt} className="block max-h-[520px] w-full rounded-t-[1.25rem] object-cover object-top md:hidden" />
        <img src={screen.desktop} alt={screen.alt} className="hidden max-h-[560px] w-full rounded-t-2xl object-cover object-top md:block" />
      </div>
    </div>
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

// --- Steps (horizontal carousel) ---

// Five stages per side, from the journey both reasy-app dashboards are built
// around (src/data/journey.ts there).
type Step = { title: string; body: string; icon: TablerIcon; chip: string }

const stepsContent: Record<
  Audience,
  { title: string; intro: string; cta: { label: string; href: string }; steps: Step[] }
> = {
  selling: {
    title: "Steps to sell your home with Reasy",
    intro: "Five clear stages from getting ready to handing over the keys, with a checklist for each one.",
    cta: { label: "List your property", href: WAITLIST_HREF },
    steps: [
      {
        title: "Prepare",
        body: "Get ready before you go to market, from smoke alarm and pool safety certificates to a market appraisal showing what similar homes sold for.",
        icon: IconClipboardCheck,
        chip: "Certificates ready",
      },
      {
        title: "List",
        body: "Add photos, set your asking price, complete your seller disclosure and publish to verified buyers. Then set your open home times.",
        icon: IconPhoto,
        chip: "Listing published",
      },
      {
        title: "Offers",
        body: "Reply to buyers, run inspections and compare offers on more than price, including conditions and settlement timing.",
        icon: IconMessageCircle,
        chip: "3 offers to review",
      },
      {
        title: "Contract",
        body: "Your conveyancer manages the contract while Reasy tracks the finance and building and pest deadlines, so nothing slips.",
        icon: IconFileText,
        chip: "Finance approved",
      },
      {
        title: "Settlement",
        body: "Your conveyancer handles the final checks and transfer. You hand over the keys and keep the commission.",
        icon: IconKey,
        chip: "Settled",
      },
    ],
  },
  buying: {
    title: "Steps to buy your home with Reasy",
    intro: "Five clear stages from working out your budget to getting the keys, with guidance at every step.",
    cta: { label: "Join the buyer waitlist", href: WAITLIST_HREF },
    steps: [
      {
        title: "Get ready",
        body: "Set your budget, sort your finance pre-approval and get verified, so sellers know you're ready to buy.",
        icon: IconWallet,
        chip: "Pre-approved",
      },
      {
        title: "Search",
        body: "Explore homes listed by their owners, matched to the suburbs, budget and must-haves in your brief.",
        icon: IconSearch,
        chip: "12 homes saved",
      },
      {
        title: "Inspect",
        body: "Book open homes or private inspections with the owner, and order your building and pest check before you commit.",
        icon: IconCalendar,
        chip: "Inspection booked",
      },
      {
        title: "Make an offer",
        body: "Understand your position, then send your price, conditions and settlement timing straight to the seller.",
        icon: IconCoin,
        chip: "Offer accepted",
      },
      {
        title: "Contract and settle",
        body: "Track your finance and building dates with your conveyancer, then pick up the keys to your new home.",
        icon: IconKey,
        chip: "Keys collected",
      },
    ],
  },
}

function StepsSection({ audience }: { audience: Audience }) {
  const content = stepsContent[audience]
  const scroller = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState({ start: 0, size: 100, atStart: true, atEnd: false })

  // Track how far through the steps we've scrolled, for the progress bar
  // and to disable the arrows at either end.
  const measure = () => {
    const el = scroller.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const size = (el.clientWidth / el.scrollWidth) * 100
    const ratio = max > 0 ? el.scrollLeft / max : 0
    setProgress({ start: ratio * (100 - size), size, atStart: el.scrollLeft <= 4, atEnd: el.scrollLeft >= max - 4 })
  }

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    el.scrollLeft = 0
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [audience])

  const scrollByCard = (dir: 1 | -1) => {
    const el = scroller.current
    const card = el?.querySelector("article")
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.clientWidth + 20), behavior: "smooth" })
  }

  const glow = audience === "selling" ? "feature-glow-seller" : "feature-glow-buyer"
  const chipTone = audience === "selling" ? "bg-seller text-seller-foreground" : "bg-buyer text-buyer-foreground"

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 md:px-8 lg:flex-row lg:items-start lg:justify-between">
        <h2 className="max-w-xl text-balance font-serif text-4xl leading-[1.1] text-brand-dark md:text-5xl dark:text-foreground">
          {content.title}
        </h2>
        <div className="max-w-sm">
          <p className="text-lg leading-relaxed text-muted-foreground">{content.intro}</p>
          <a
            href={content.cta.href}
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary-strong focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
          >
            {content.cta.label}
          </a>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={measure}
        className="mt-12 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:scroll-px-[max(2rem,calc((100vw-1280px)/2+2rem))] md:px-[max(2rem,calc((100vw-1280px)/2+2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {content.steps.map((step, i) => {
          const Icon = step.icon
          return (
            <article
              key={step.title}
              className="flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-card sm:w-[380px] lg:w-[400px]"
            >
              <div className="p-7 md:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
              {/* Placeholder visual until the illustrations are ready */}
              <div className={cn("relative mt-auto flex h-56 items-center justify-center", glow)} aria-hidden="true">
                <div className="flex items-center gap-3 rounded-2xl bg-card px-5 py-4 shadow-xl">
                  <span className={cn("flex size-11 items-center justify-center rounded-full", chipTone)}>
                    <Icon className="size-5" stroke={1.75} />
                  </span>
                  <span className="text-base font-semibold text-foreground">{step.chip}</span>
                  <IconCircleCheck className="size-5 text-green-foreground" stroke={2} />
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mx-auto mt-8 flex max-w-[1280px] items-center justify-between gap-6 px-4 md:px-8">
        <div className="relative h-1.5 w-40 overflow-hidden rounded-full bg-border" aria-hidden="true">
          <span
            className="absolute inset-y-0 rounded-full bg-brand-dark transition-[left] duration-150"
            style={{ left: `${progress.start}%`, width: `${progress.size}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={progress.atStart}
            aria-label="Previous step"
            className="flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40"
          >
            <IconArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={progress.atEnd}
            aria-label="Next step"
            className="flex size-12 items-center justify-center rounded-full bg-brand-dark text-white outline-none transition-colors hover:bg-brand-dark/90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40"
          >
            <IconArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

// --- Feature showcase (accordion + visual) ---

// Each showcase picks up one of the Reasy brand colours.
const tones = {
  seller: { chip: "bg-seller text-seller-foreground", glow: "feature-glow-seller", icon: "text-seller-foreground" },
  buyer: { chip: "bg-buyer text-buyer-foreground", glow: "feature-glow-buyer", icon: "text-buyer-ink" },
  ai: { chip: "bg-ai/15 text-ai", glow: "feature-glow-ai", icon: "text-ai" },
}

type FeatureItem = {
  icon: TablerIcon
  title: string
  // Real app screen; items without one show a wireframe placeholder
  image?: { src: string; alt: string }
  description: string
}

function FeatureShowcase({
  id,
  icon: Icon,
  eyebrow,
  badge,
  title,
  items,
  cta,
  tone = "seller",
  reverse = false,
}: {
  id: string
  icon: TablerIcon
  eyebrow: string
  badge?: string
  title: string
  items: FeatureItem[]
  cta?: { label: string; href: string }
  tone?: keyof typeof tones
  // Visual on the left, copy on the right (desktop only)
  reverse?: boolean
}) {
  const [active, setActive] = useState(0)
  const current = items[active]

  return (
    <section id={id} className="scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-20 gap-y-10 lg:grid-cols-2">
        {/* Heading */}
        <div className={reverse ? "lg:col-start-2" : "lg:col-start-1"}>
          <div className="flex items-center gap-2">
            <span className={cn("flex size-7 items-center justify-center rounded-full", tones[tone].chip)}>
              <Icon className="size-4" stroke={2} />
            </span>
            <span className="text-sm font-semibold text-foreground">{eyebrow}</span>
            {badge && (
              <span className="rounded-full bg-ai/15 px-2 py-0.5 text-xs font-semibold text-ai-foreground">
                {badge}
              </span>
            )}
          </div>
          <h2 className="mt-5 max-w-[520px] font-serif text-4xl leading-[1.1] text-brand-dark md:text-5xl dark:text-foreground">
            {title}
          </h2>
        </div>

        {/* Visual */}
        <div className={cn("lg:sticky lg:top-28 lg:row-span-2 lg:row-start-1 lg:self-start", reverse ? "lg:col-start-1" : "lg:col-start-2")}>
          <div className={cn("flex aspect-[5/4] items-center justify-center overflow-hidden rounded-3xl p-6 md:p-12", tones[tone].glow)}>
            {current.image ? (
              <img
                key={current.title}
                src={current.image.src}
                alt={current.image.alt}
                className="max-h-full max-w-full animate-in rounded-2xl bg-card object-contain shadow-xl fade-in zoom-in-95 duration-500"
              />
            ) : (
            <div
              key={current.title}
              className="w-full max-w-[420px] animate-in fade-in zoom-in-95 duration-500"
              aria-hidden="true"
            >
              <div className="space-y-5 rounded-2xl bg-card p-7 text-left shadow-xl">
                <div className="flex items-center gap-3">
                  <span className={cn("flex size-10 items-center justify-center rounded-full", tones[tone].chip)}>
                    <current.icon className="size-5" stroke={1.75} />
                  </span>
                  <p className="font-semibold text-foreground">{current.title}</p>
                </div>
                <div className="space-y-3">
                  <SkeletonBar className="w-full" />
                  <SkeletonBar className="w-5/6" />
                  <SkeletonBar className="w-2/3" />
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <span className="size-9 shrink-0 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <SkeletonBar className="w-1/2" />
                    <SkeletonBar className="h-2.5 w-1/3" />
                  </div>
                </div>
                <span className="block h-9 w-32 rounded-full bg-primary/20" />
              </div>
            </div>
            )}
          </div>
        </div>

        {/* Accordion */}
        <div className={reverse ? "lg:col-start-2" : "lg:col-start-1"}>
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
                        "flex items-center gap-3 text-lg font-medium transition-colors",
                        isOpen ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      <item.icon
                        className={cn("size-5 shrink-0 transition-colors", isOpen && tones[tone].icon)}
                        stroke={1.75}
                      />
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
                      <p className="max-w-[520px] pb-6 pl-8 pr-12 leading-relaxed text-muted-foreground">
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
    icon: IconEyeOff,
    title: "List publicly or quietly",
    description:
      "Go live to every buyer on Reasy, or keep your listing private so only buyers you invite can see it. Handy if you're just testing the waters.",
  },
  {
    icon: IconMessageCircle,
    title: "Talk directly with buyers",
    description:
      "Answer questions, arrange inspections and negotiate in one secure chat. No middleman deciding which messages or offers you get to see.",
  },
  {
    icon: IconListCheck,
    title: "Always know what's next",
    description:
      "A simple step-by-step checklist shows what's done, what's next and what each step means, from verifying ownership to settlement.",
  },
  {
    icon: IconScale,
    title: "Legal help in the same place",
    description:
      "Invite your conveyancer (the licensed professional who handles the legal transfer of your property) into your Reasy workspace, so titles, contracts and settlement all live in one place.",
  },
]

const buyingItems: FeatureItem[] = [
  {
    icon: IconHomeSearch,
    title: "Browse homes privately",
    description:
      "Explore homes listed directly by their owners, including private listings you won't find on the big portals.",
  },
  {
    icon: IconMessageCircle,
    title: "Enquire with the owner",
    description:
      "Message the seller straight away and get answers from the person who knows the home best.",
  },
  {
    icon: IconListCheck,
    title: "A checklist that keeps you on track",
    description:
      "Your buying checklist walks you through finance pre-approval, building and pest inspections, contract review and settlement, with a plain-English explanation of each one.",
  },
  {
    icon: IconScale,
    title: "Bring your conveyancer along",
    description:
      "Invite your conveyancer (the licensed professional who handles the legal side of buying a home) into your Reasy workspace, so contracts, titles and settlement all live in one place.",
  },
]

const buyerAiItems: FeatureItem[] = [
  {
    icon: IconMessageChatbot,
    title: "Ask anything, any time",
    image: { src: aiBuyerAskImg, alt: "Ask Reasy explaining why a buyer needs a conveyancer" },
    description:
      "Why do I need a conveyancer? How do open homes work? Ask Reasy and get a plain-English answer straight away, day or night.",
  },
  {
    icon: IconRoute,
    title: "Know what to do next",
    image: { src: aiBuyerNextImg, alt: "Ask Reasy suggesting a buyer get verified and sort finance next" },
    description:
      "Reasy looks at where you're up to and suggests your next step, from booking an inspection to what happens after you make an offer.",
  },
  {
    icon: IconBuildingBank,
    title: "Get your finance straight",
    image: { src: aiBuyerFinanceImg, alt: "Ask Reasy explaining finance pre-approval" },
    description:
      "Understand pre-approval, deposits and settlement before you need them, so you can move quickly when the right home comes up.",
  },
]

const aiItems: FeatureItem[] = [
  {
    icon: IconChartBar,
    title: "Price it with confidence",
    image: { src: aiPricingImg, alt: "Reasy pricing analysis with a suggested price range and comparable sales" },
    description:
      "Comparable sales, local demand and pricing suggestions, so you know what to list at and where you're likely to land.",
  },
  {
    icon: IconMessageChatbot,
    title: "Your selling assistant",
    image: { src: aiSellerAskImg, alt: "Ask Reasy answering how to price a property" },
    description:
      "Sorts enquiries by how serious each buyer is, suggests replies and reminds you to follow up so warm leads never go cold.",
  },
  {
    icon: IconLayoutDashboard,
    title: "Everything at a glance",
    image: { src: aiSellerGlanceImg, alt: "Seller dashboard metrics: offers, unread messages, upcoming inspections and highest offer" },
    description:
      "Offers, enquiries and views in one summary, with suggestions on how to improve your listing when interest slows.",
  },
]

// --- What people are saying (Instagram comments) ---

function PeopleHaveSpoken() {
  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 text-center md:px-8">
        <h2 className="text-balance font-serif text-4xl leading-[1.1] text-brand-dark md:text-5xl dark:text-foreground">
          The people have spoken
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">(and this is what they want)</p>
      </div>

      {/* Same scroller as the For Buyers page: a drag-to-scrub marquee on
          desktop, a swipeable one-at-a-time carousel on phones */}
      <div className="mt-6 hidden md:block">
        <CommentMarquee />
      </div>
      <div className="mt-4 md:hidden">
        <MobileCommentCarousel tone="light" />
      </div>

      <div className="mt-6 flex items-start justify-center gap-10 md:gap-16">
        <Stat tone="light" value="18K+" label="Followers" />
        <Stat tone="light" value="1.5M+" label="Views" />
        <Stat tone="light" value="500+" label="Comments" />
      </div>
    </section>
  )
}

// --- Final CTA with status marquee ---

const getStartedContent: Record<Audience, { title: string; body: string; cta: string }> = {
  selling: {
    title: "Join the seller waitlist",
    body: "Founding members get priority access to list when Reasy opens on 1 November 2026. Tell us a little about you and we'll be in touch.",
    cta: "Join the seller waitlist",
  },
  buying: {
    title: "Join the buyer waitlist",
    body: "Be first to see homes listed by their owners when Reasy opens on 1 November 2026. Tell us where you're looking and we'll let you know when matching homes go live.",
    cta: "Get early access",
  },
}

const fieldLabel = "mb-2 block text-sm font-semibold text-foreground"
const fieldInput =
  "h-12 w-full rounded-xl border border-border bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50"

// Prototype only: like the live waitlist on the For Buyers page, nothing is
// sent anywhere yet. Submitting shows the confirmation state.
function WaitlistForm({ audience, idPrefix = "" }: { audience: Audience; idPrefix?: string }) {
  const [done, setDone] = useState(false)
  const content = getStartedContent[audience]
  const id = (name: string) => `${idPrefix}${audience}-${name}`

  if (done) {
    return (
      <div role="status" className="flex flex-col items-center px-6 py-12 text-center">
        <span className={cn("flex size-14 items-center justify-center rounded-full", audience === "selling" ? "bg-seller text-seller-foreground" : "bg-buyer text-buyer-foreground")}>
          <IconCircleCheck className="size-7" stroke={1.75} />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-foreground">You're on the list</h3>
        <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
          We'll email you before Reasy opens on 1 November 2026
          {audience === "selling" ? " with everything you need to list your home." : " so you can be first to see new homes."}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
      className="space-y-5 text-left"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("first")} className={fieldLabel}>First name</label>
          <input id={id("first")} required type="text" autoComplete="given-name" placeholder="Jane" className={fieldInput} />
        </div>
        <div>
          <label htmlFor={id("last")} className={fieldLabel}>Last name</label>
          <input id={id("last")} type="text" autoComplete="family-name" placeholder="Smith" className={fieldInput} />
        </div>
      </div>
      <div>
        <label htmlFor={id("email")} className={fieldLabel}>Email</label>
        <input id={id("email")} required type="email" autoComplete="email" placeholder="you@example.com" className={fieldInput} />
      </div>
      <div>
        <label htmlFor={id("mobile")} className={fieldLabel}>Mobile number</label>
        <input id={id("mobile")} type="tel" autoComplete="tel" inputMode="tel" placeholder="0412 345 678" className={fieldInput} />
      </div>

      {audience === "selling" ? (
        <div>
          <label htmlFor={id("postcode")} className={fieldLabel}>Postcode of the property you're selling</label>
          <input id={id("postcode")} type="text" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} placeholder="e.g. 4573" className={fieldInput} />
        </div>
      ) : (
        <div>
          <p className={fieldLabel}>Top cities you'd like to buy in</p>
          <p className="-mt-1 mb-3 text-sm text-muted-foreground">
            We'll let you know when matching homes go live.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <input
                key={n}
                id={id(`city-${n}`)}
                aria-label={`City ${n}`}
                type="text"
                autoComplete="off"
                placeholder={n === 1 ? "e.g. Brisbane" : `City ${n}`}
                className={fieldInput}
              />
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary-strong focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
      >
        {content.cta}
        <IconArrowRight className="size-4" />
      </button>
      <p className="text-center text-sm text-muted-foreground">Free to join. We respect your privacy.</p>
    </form>
  )
}

function GetStarted({ audience }: { audience: Audience }) {
  // Starts on the page's view, but the toggle here only switches the form,
  // so the page doesn't jump around underneath it.
  const [formAudience, setFormAudience] = useState(audience)
  const content = getStartedContent[formAudience]
  return (
    <section id="get-started" className="scroll-mt-24 px-4 pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Get started</p>
        <h2 className="mt-3 text-balance font-serif text-4xl leading-[1.1] text-brand-dark md:text-6xl dark:text-foreground">
          {content.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{content.body}</p>
        <div className="mt-8">
          <AudienceToggle value={formAudience} onChange={setFormAudience} />
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-2xl rounded-3xl bg-card p-6 shadow-xs ring-1 ring-border md:p-10">
        {/* key resets the form (and its confirmation) when switching */}
        <WaitlistForm key={formAudience} audience={formAudience} />
      </div>
    </section>
  )
}

// Overlay version of the waitlist, opened from "Get early access" in the nav
// on any page. Starts on the current view (from ?for=) and has its own toggle.
export function WaitlistDialog({ onClose }: { onClose: () => void }) {
  const [formAudience, setFormAudience] = useState<Audience>(initialAudience)
  const content = getStartedContent[formAudience]

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  // Portalled to body: the nav's backdrop blur would otherwise trap a fixed overlay
  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex animate-in fade-in items-end justify-center bg-brand-dark/40 backdrop-blur-sm duration-200 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-dialog-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92dvh] w-full animate-in slide-in-from-bottom-4 overflow-y-auto rounded-t-3xl bg-card p-6 shadow-2xl duration-300 sm:max-w-xl sm:rounded-3xl md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <IconX className="size-5" />
        </button>
        <div className="pr-10">
          <h2 id="waitlist-dialog-title" className="font-display text-3xl leading-tight text-foreground md:text-4xl">
            Get early access
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">{content.body}</p>
        </div>
        <div className="mt-6">
          <AudienceToggle value={formAudience} onChange={setFormAudience} size="sm" />
        </div>
        <div className="mt-6">
          <WaitlistForm key={formAudience} audience={formAudience} idPrefix="dialog-" />
        </div>
      </div>
    </div>,
    document.body
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

export function Footer() {
  const socials = [
    { icon: IconBrandInstagram, label: "Instagram", href: "https://www.instagram.com/agents_want_me_cancelled?igsh=aTBud3F5cHQzb2Iz&utm_source=qr" },
    { icon: IconBrandTiktok, label: "TikTok", href: "https://www.tiktok.com/@agentswantmecancelled?_r=1&_t=ZS-95xMn4ARczX" },
    { icon: IconBrandYoutube, label: "YouTube", href: "https://www.youtube.com/@heyreasy" },
  ]

  return (
    <footer className="px-3 pb-3 md:px-6 md:pb-6">
      {/* Full-width rounded panel, matching the hero container's gutters */}
      <div className="rounded-4xl bg-brand-dark px-8 py-14 text-white md:px-14 md:py-20 lg:px-20 lg:py-24">
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
            <FooterLink href="/pricing">Pricing</FooterLink>
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

  // Menu items switch view (if needed) then scroll to their section once it renders.
  const navigateTo: NavigateTo = (value, section) => {
    if (value !== audience) changeAudience(value)
    if (!section) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    window.setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 60)
  }

  return (
    <div data-slot="new-home-page" className="min-h-screen bg-canvas text-foreground">
      <AnnouncementBar />
      <Nav onNavigate={navigateTo} />
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
                icon={IconSparkles2Filled}
                eyebrow="Reasy AI"
                badge="Beta"
                title="Meet your AI selling assistant"
                items={aiItems}
                tone="ai"
                reverse
              />
            </Reveal>
          </>
        ) : (
          <Reveal key="buying">
            <FeatureShowcase
              id="buying"
              icon={IconSearch}
              eyebrow="Buying"
              title="Buy direct from the owner, with guidance"
              items={buyingItems}
              tone="buyer"
              cta={{ label: "Explore Reasy for buyers", href: "/for-buyers" }}
            />
          </Reveal>
        )}
        {audience === "buying" && (
          <Reveal key="reasy-ai-buying">
            <FeatureShowcase
              id="reasy-ai-buying"
              icon={IconSparkles2Filled}
              eyebrow="Reasy AI"
              badge="Beta"
              title="Meet your AI buying assistant"
              items={buyerAiItems}
              tone="ai"
              reverse
            />
          </Reveal>
        )}
        <Reveal><PeopleHaveSpoken /></Reveal>
        <Reveal key={`steps-${audience}`}><StepsSection audience={audience} /></Reveal>
        <Reveal key={`get-started-${audience}`}><GetStarted audience={audience} /></Reveal>
      </main>
      <Footer />
    </div>
  )
}
