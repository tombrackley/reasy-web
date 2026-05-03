import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"
import { IconX, IconCheck, IconArrowRight, IconChevronRight, IconBrandInstagram, IconBrandYoutube, IconBrandTiktok, IconMenu2, IconChartBar, IconSparkles, IconInbox, IconFileText } from "@tabler/icons-react"


import logoImg from "@/assets/reasy-logo.svg"
import logoWhiteImg from "@/assets/reasy-logo-white.svg"
import dashImg from "@/assets/reasy-dashboard.png"
import mobileDashImg from "@/assets/Mobile-Dash-Reasy.png"
import aerialImg from "@/assets/gold-coast-reasy-launch-platform.png"
import avatar1 from "@/assets/avatar-1.jpg"
import avatar2 from "@/assets/avatar-2.jpg"
import avatar3 from "@/assets/avatar-3.jpg"
import avatar4 from "@/assets/avatar-4.jpg"
import avatar5 from "@/assets/avatar-5.jpg"
import bentoImg1 from "@/assets/keep-track-sale.png"
import bentoImg2 from "@/assets/selling-assistant.png"
import bentoImg3 from "@/assets/tak-directly-with-buyers.png"
import bentoImg4 from "@/assets/Container-3.png"
import bentoImg5 from "@/assets/everything in one place-1.png"
import browsePrivatelyImg from "@/assets/browse-privatley.png"
import enquireDirectlyImg from "@/assets/enquire-directly.png"
import buyersCard3 from "@/assets/reasy-buyers-card-3.png"
import listQuietlyImg from "@/assets/private-listing-with-reasy.png"
import dailyMailLogo from "@/assets/daily-mail-logo.png"
import yahooFinanceLogo from "@/assets/yahoo-finance-logo.png"
import buyerAvatar from "@/assets/buyer-avatar.png"
import aiPricingImg from "@/assets/reasy-ai-pricing-tools.jpg"

// --- Nav ---

function NavLinks({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <>
      <a href="#how-it-works" className={className} onClick={onClick}>How it works</a>
      <a href="#benefits" className={className} onClick={onClick}>Benefits</a>
      <a href="#savings" className={className} onClick={onClick}>Savings Calculator</a>
      <a href="#buyers" className={className} onClick={onClick}>For Buyers</a>
    </>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Full-width nav — white text on blue hero, fades out on scroll */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-14 py-5 transition-opacity duration-500",
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center cursor-pointer"
          aria-label="Back to top"
        >
          <img src={logoWhiteImg} alt="Reasy" className="h-6 translate-y-[2px]" />
        </button>

        <div className="hidden md:flex items-center gap-5 text-[15px] font-medium text-white absolute left-1/2 -translate-x-1/2">
          <NavLinks className="hover:opacity-70 transition-opacity" />
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-[15px] font-semibold text-primary bg-white hover:bg-white/90 transition-colors"
          >
            Get Early Access
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center size-10 rounded-full bg-white/20 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown — hero nav */}
      <div
        className={cn(
          "fixed top-[72px] left-4 right-4 z-50 bg-white rounded-2xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)] p-6 flex flex-col gap-4 transition-all duration-300 md:hidden",
          mobileOpen && !scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <NavLinks
          className="text-[15px] font-medium text-[#020a0f] py-2 hover:text-primary transition-colors"
          onClick={() => setMobileOpen(false)}
        />
      </div>

      {/* Compact floating nav — fades in on scroll */}
      <nav
        className={cn(
          "fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[min(820px,92vw)] px-5 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center cursor-pointer"
          aria-label="Back to top"
        >
          <img src={logoImg} alt="Reasy" className="h-6 translate-y-[2px]" />
        </button>

        <div className="hidden md:flex items-center gap-4 text-[13px] font-medium text-brand-dark whitespace-nowrap">
          <NavLinks className="hover:opacity-70 transition-opacity" />
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#waitlist"
            className="inline-flex items-center px-4 py-2 rounded-full text-[13px] font-semibold text-white bg-primary hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Get early access
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center size-8 rounded-full bg-muted text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX className="size-4" /> : <IconMenu2 className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown — compact nav */}
      <div
        className={cn(
          "fixed top-[60px] left-4 right-4 z-50 bg-white rounded-2xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)] p-6 flex flex-col gap-4 transition-all duration-300 md:hidden",
          mobileOpen && scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <NavLinks
          className="text-[15px] font-medium text-[#020a0f] py-2 hover:text-primary transition-colors"
          onClick={() => setMobileOpen(false)}
        />
      </div>
    </>
  )
}

// --- Hero ---

function HeroSection() {
  return (
    <section className="relative">
      {/* Blue gradient background */}
      <div className="bg-[linear-gradient(180deg,#4E82C1_30%,#FFF_75%)] pt-32 pb-0 text-center px-4">
        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-[64px] leading-[1.2] text-white mb-6">
          {/* Mobile: 3 lines, underline under "Commission" */}
          <span className="md:hidden">
            Buy or Sell Your
            <br />
            Home, Keep the
            <br />
            <span className="relative isolate inline-block">
              Commission
              <svg
                className="absolute bottom-0 left-0 w-full -z-10"
                viewBox="0 0 473 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6C80 2 200 2 471 6"
                  stroke="#A5C2FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
          {/* Desktop: 2 lines, underline under "Keep the Commission." */}
          <span className="hidden md:inline">
            Buy or Sell Your Home,
            <br />
            <span className="relative isolate inline-block">
              Keep the Commission.
              <svg
                className="absolute bottom-0 left-0 w-full -z-10"
                viewBox="0 0 473 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6C80 2 200 2 471 6"
                  stroke="#A5C2FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-white/90 max-w-[640px] mx-auto mb-10 leading-relaxed">
          Reasy connects verified buyers and sellers and guides every step from first
          enquiry to signed contract, without an agent.
        </p>

        {/* CTA */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-semibold text-primary bg-white hover:bg-white/90 transition-colors"
        >
          Get Early Access
        </a>

        {/* Dashboard screenshot */}
        <div className="max-w-[1200px] mx-auto mt-16 bg-[#f8f8f8] rounded-[2rem] md:rounded-2xl p-2.5">
          <img
            src={mobileDashImg}
            alt="Reasy dashboard"
            className="w-full rounded-[1.625rem] md:hidden"
          />
          <img
            src={dashImg}
            alt="Reasy dashboard"
            className="w-full rounded-xl hidden md:block"
          />
        </div>
      </div>
    </section>
  )
}

// --- Featured In ---

function FeaturedIn() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8">
        <p className="text-[12px] font-medium text-[#7a7a7a]">As featured in</p>
        <div className="flex items-center justify-center gap-8">
          <img src={dailyMailLogo} alt="Daily Mail" className="h-6 w-auto object-contain" />
          <img src={yahooFinanceLogo} alt="Yahoo Finance" className="h-6 w-auto object-contain" />
        </div>
        <a
          href="https://www.instagram.com/agents_want_me_cancelled"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[#7a7a7a]/60 hover:text-foreground transition-colors"
        >
          @agents_want_me_cancelled
        </a>
      </div>
    </section>
  )
}

// --- How It Works ---

function HowItWorksIllustration1() {
  return (
    <div className="w-full aspect-square rounded-3xl bg-[#f6f6f8] relative overflow-hidden flex items-center justify-center">
      <img src={listQuietlyImg} alt="" className="max-w-[80%] max-h-[80%] object-contain" />
    </div>
  )
}

function HowItWorksIllustration2() {
  return (
    <div className="w-full aspect-square rounded-3xl bg-[#f6f6f8] relative overflow-hidden flex flex-col items-center justify-center px-10">
      <p className="text-xs text-[#020a0f]">Recent Enquiries</p>
      <div className="w-px h-10 border-l border-dashed border-foreground/20" />
      {/* Stacked contact cards */}
      <div className="relative w-full h-[80px]">
        {/* Card 3 (back) — smallest, most inset */}
        <div className="absolute inset-x-[12px] top-0 h-[44px] bg-white rounded-xl shadow-[0px_1px_1px_-1px_rgba(28,26,23,0.46),0px_0px_0px_1px_#e6e6e5] flex items-center gap-2.5 px-3">
          <img src={avatar2} alt="" className="size-[30px] rounded-md flex-shrink-0 object-cover" />
          <div>
            <p className="text-[11px] leading-[11px] text-[#7a7a7a]">Lee Chen</p>
            <p className="text-[13px] leading-[13px] text-[#3d3d3d] mt-1">Chen Law</p>
          </div>
        </div>

        {/* Card 2 (middle) */}
        <div className="absolute inset-x-[6px] top-[15px] h-[46px] bg-white rounded-xl shadow-[0px_1px_1px_-1px_rgba(28,26,23,0.46),0px_2px_2px_-1px_rgba(28,26,23,0.01),0px_0px_0px_1px_#e6e6e5] flex items-center gap-2.5 px-3">
          <img src={avatar3} alt="" className="size-[31px] rounded-md flex-shrink-0 object-cover" />
          <div>
            <p className="text-[11px] leading-[11px] text-[#7a7a7a]">Sandra Fuller</p>
            <p className="text-[13px] leading-[13px] text-[#3d3d3d] mt-1">Fuller &amp; Associates IP</p>
          </div>
        </div>

        {/* Card 1 (front) — largest, full width */}
        <div className="absolute inset-x-0 top-[30px] h-[49px] bg-white rounded-xl shadow-[0px_1px_1px_-1px_rgba(28,26,23,0.46),0px_2px_2px_-1px_rgba(28,26,23,0.01),0px_4px_4px_-2px_rgba(28,26,23,0.03),0px_0px_0px_1px_#e6e6e5] flex items-center gap-3 px-3">
          <img src={avatar1} alt="" className="size-[32px] rounded-md flex-shrink-0 object-cover" />
          <div>
            <p className="text-xs leading-[12px] text-[#7a7a7a]">Rachel Lawrence</p>
            <p className="text-sm leading-[14px] text-[#3d3d3d] mt-1">Enquired about your property</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HowItWorksIllustration3() {
  return (
    <div className="w-full aspect-square rounded-3xl bg-[#f6f6f8] relative overflow-hidden">
      {/* You — top left */}
      <div className="absolute left-[11%] top-[7%] bg-white border border-[#e6e6e5] rounded-xl p-3 flex flex-col items-center gap-2.5 w-[32%]">
        <img src={avatar4} alt="" className="size-6 rounded-full object-cover" />
        <p className="text-xs text-[#7a7a7a]">Seller</p>
      </div>

      {/* Buyer — bottom left */}
      <div className="absolute left-[11%] top-[72%] bg-white border border-[#e6e6e5] rounded-xl p-3 flex flex-col items-center gap-2.5 w-[32%]">
        <img src={buyerAvatar} alt="" className="size-6 rounded-full object-cover" />
        <p className="text-xs text-[#7a7a7a]">Buyer</p>
      </div>

      {/* Conveyancer — middle right */}
      <div className="absolute left-[55%] top-[38%] bg-white border border-[#e6e6e5] rounded-xl p-3 flex flex-col items-center gap-2.5 w-[32%]">
        <img src={avatar5} alt="" className="size-6 rounded-full object-cover" />
        <p className="text-xs text-[#7a7a7a]">Conveyancer</p>
      </div>

      {/* Vertical dashed line: You → Buyer */}
      <div className="absolute left-[27%] top-[26%] h-[46%] w-px border-l border-dashed border-foreground/20" />

      {/* Horizontal green dashed line: plus → Conveyancer */}
      <div className="absolute left-[27%] top-[47%] w-[28%] h-px border-t border-dashed border-[#1a7a5e]" />

      {/* Green plus icon at intersection */}
      <div className="absolute left-[27%] top-[47%] -translate-x-1/2 -translate-y-1/2 size-8 rounded-full bg-[#d4fef3] flex items-center justify-center">
        <span className="text-[#1a7a5e] text-lg font-medium leading-none">+</span>
      </div>
    </div>
  )
}

function HowItWorks() {
  const steps = [
    {
      illustration: <HowItWorksIllustration1 />,
      title: "List quietly to test the waters",
      description:
        "Create a private listing to gauge interest before going public. Control who sees your property and when.",
    },
    {
      illustration: <HowItWorksIllustration2 />,
      title: "Engage & Negotiate",
      description:
        "Receive enquiries directly and negotiate with interested buyers through our guided process.",
    },
    {
      illustration: <HowItWorksIllustration3 />,
      title: "Contract & Settlement",
      description:
        "Invite your own conveyancer to your Reasy workspace to handle the legal side while you stay in control.",
    },
  ]

  return (
    <section id="how-it-works" className="py-32 px-4">
      <h2 className="font-serif text-4xl md:text-5xl text-center text-[#020a0f] mb-16">
        How does it work?
      </h2>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col-reverse md:flex-col">
            {step.illustration}
            <div className="mb-4 md:mb-0 md:mt-4">
              <h3 className="text-base font-medium text-[#020a0f] mb-2">
                {step.title}
              </h3>
              <p className="text-[15px] text-[#1e2124] leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// --- Process Timeline ---

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "01",
      title: "Create your listing",
      description:
        "Sign up, verify your identity, and create your property listing with photos, details, and your asking price. It takes about 15 minutes.",
    },
    {
      number: "02",
      title: "Go live",
      description:
        "Publish your listing when you're ready. Buyers can browse your property and submit expressions of interest directly through the platform.",
    },
    {
      number: "03",
      title: "Receive & manage enquiries",
      description:
        "Enquiries come directly to you. Chat with interested buyers, arrange inspections, and manage everything from your dashboard.",
    },
    {
      number: "04",
      title: "Negotiate & accept an offer",
      description:
        "Review offers, negotiate terms, and accept when you're happy. Reasy guides you through what to look for and what to watch out for.",
    },
    {
      number: "05",
      title: "Contract & settlement",
      description:
        "We connect you with a qualified conveyancer to handle contracts and settlement. You stay informed at every step until the keys are handed over.",
    },
  ]

  return (
    <section className="pb-32 px-4">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-['Roboto_Mono_Variable'] text-[13px] font-semibold uppercase leading-[15.6px] text-primary mb-3 text-center">
          The process
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-center text-[#020a0f] mb-16">
          Your journey from listing to sold
        </h2>

        {/* Timeline bar */}
        <div className="relative mb-12">
          {/* Background track */}
          <div className="absolute top-[14px] left-0 right-0 h-[2px] bg-[#e6e6eb]" />
          {/* Active track */}
          <div
            className="absolute top-[14px] left-0 h-[2px] bg-primary transition-all duration-500"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />

          {/* Step dots and titles */}
          <div className="relative flex justify-between">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className="flex flex-col items-center gap-3 group"
                style={{ width: `${100 / steps.length}%` }}
              >
                <div
                  className={cn(
                    "size-[30px] rounded-full flex items-center justify-center text-[11px] font-semibold transition-all duration-300 relative z-10",
                    i <= activeStep
                      ? "bg-primary text-white"
                      : "bg-white text-[#7a7a7a] border-2 border-[#e6e6eb] group-hover:border-primary/30"
                  )}
                >
                  {step.number}
                </div>
                <span
                  className={cn(
                    "text-[13px] font-medium text-center transition-colors duration-300 hidden md:block",
                    i === activeStep ? "text-[#020a0f]" : "text-[#7a7a7a]"
                  )}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active step content */}
        <div className="max-w-[600px] mx-auto text-center">
          <h3 className="text-xl font-medium text-[#020a0f] mb-3">
            {steps[activeStep].title}
          </h3>
          <p className="text-[16px] text-[#1e2124]/70 leading-relaxed">
            {steps[activeStep].description}
          </p>
        </div>
      </div>
    </section>
  )
}

// --- Bento Grid ---

function BentoGrid() {
  return (
    <section id="features" className="pb-32 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="font-['Roboto_Mono_Variable'] text-[13px] font-semibold uppercase leading-[15.6px] text-primary mb-3">
            Platform features
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#020a0f] max-w-[500px]">
            Everything you need to sell your home
          </h2>
        </div>

        {/* Row 1 — 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Card 1 — Large left */}
          <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
            <img src={bentoImg1} alt="" className="h-[280px] w-full object-cover rounded-t-2xl" />
            <div className="p-8">
              <h3 className="text-lg font-medium text-[#020a0f] mb-2">
                Keep track and progress your sale
              </h3>
              <p className="text-[15px] text-[#1e2124] leading-relaxed">
                Reasy keeps your listing moving, tracking enquiries, nudging activity between you and interested buyers and telling you exactly what to do next at every stage.
              </p>
            </div>
          </div>

          {/* Card 2 — Large right */}
          <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
            <img src={bentoImg2} alt="" className="h-[280px] w-full object-cover rounded-t-2xl" />
            <div className="p-8">
              <h3 className="text-lg font-medium text-[#020a0f] mb-2">
                Step-by-step guidance through the entire sale
              </h3>
              <p className="text-[15px] text-[#1e2124] leading-relaxed">
                From listing to settlement, Reasy walks you through each stage with clear explanations, checklists and prompts so you always know what to do next.
              </p>
            </div>
          </div>
        </div>

        {/* Row 2 — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 3 */}
          <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
            <img src={bentoImg3} alt="" className="h-[200px] w-full object-cover rounded-t-2xl" />
            <div className="p-8">
              <h3 className="text-lg font-medium text-[#020a0f] mb-2">
                Talk directly with buyers
              </h3>
              <p className="text-[15px] text-[#1e2124] leading-relaxed">
                No middleman filtering your conversations. Communicate directly with interested buyers through our secure messaging.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
            <img src={bentoImg4} alt="" className="h-[200px] w-full object-cover rounded-t-2xl" />
            <div className="p-8">
              <h3 className="text-lg font-medium text-[#020a0f] mb-2">
                Connected to conveyancers
              </h3>
              <p className="text-[15px] text-[#1e2124] leading-relaxed">
                Invite your conveyancer to the Reasy workspace, they will have access to all documents and communication to handle legal formalities on your behalf.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
            <img src={bentoImg5} alt="" className="h-[200px] w-full object-cover rounded-t-2xl" />
            <div className="p-8">
              <h3 className="text-lg font-medium text-[#020a0f] mb-2">
                Everything in one place
              </h3>
              <p className="text-[15px] text-[#1e2124] leading-relaxed">
                Track enquiries, manage offers and store documents in your dashboard. No scattered emails or phone calls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- AI Assistance ---

function AIAssistance() {
  const features = [
    {
      icon: IconChartBar,
      title: "Smart pricing",
      description:
        "Comparable sales analysis, demand signals and price-strategy suggestions so you know what to list at and where you're likely to land.",
    },
    {
      icon: IconSparkles,
      title: "Listing & marketing",
      description:
        "Drafts your listing copy, recommends photos and gets your property in front of the right buyers across the channels that matter.",
    },
    {
      icon: IconInbox,
      title: "Enquiry triage",
      description:
        "Sorts buyer enquiries by intent, drafts reply suggestions and reminds you to follow up so warm leads never go cold.",
    },
    {
      icon: IconFileText,
      title: "Documents & deadlines",
      description:
        "Tracks contracts, disclosures, signatures and key dates from listing through to settlement so nothing slips.",
    },
  ]

  return (
    <section id="ai" className="py-32 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: pricing tool image */}
        <div>
          <img
            src={aiPricingImg}
            alt="Reasy AI pricing tool on iPhone"
            className="w-full h-auto"
          />
        </div>

        {/* Right: info */}
        <div>
          <p className="font-['Roboto_Mono_Variable'] text-[13px] font-semibold uppercase leading-[15.6px] text-primary mb-1">
            Reasy AI
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#020a0f] mb-5 leading-[1.1]">
            Reasy AI does the heavy lifting
          </h2>
          <p className="text-[17px] text-[#1e2124] leading-relaxed mb-10">
            From pricing to settlement, Reasy keeps you on top of every detail
            so you never feel out of your depth.
          </p>

          <div className="space-y-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="size-5" stroke={1.75} />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#020a0f] mb-1">
                    {title}
                  </h3>
                  <p className="text-[14px] text-[#1e2124]/70 leading-[1.6]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Why Choose Reasy ---

function WhyChooseReasy() {
  const oldWayItems = [
    "High fees & commission",
    "Limited access and control",
    "Scattered communication",
    "Confusing contracts",
    "Lack of transparency",
  ]

  const reasyItems = [
    "Keep more of the money from your sale",
    "Full control of the sale",
    "Direct communication between buyers and sellers - no gatekeeping",
    "Clear communication and documentation in one place",
    "Transparent guidance through entire process",
    "Legal and formalities handled by your conveyancer",
  ]

  return (
    <section id="benefits" className="py-32 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-['Roboto_Mono_Variable'] text-[13px] font-semibold uppercase leading-[15.6px] text-primary mb-4">
            Why choose Reasy?
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#020a0f] mb-6">
            A modern approach to selling your property
          </h2>
          <p className="text-[17px] text-[#1e2124] max-w-[600px] mx-auto leading-relaxed">
            Zero agent commission. Reasy guides you through every step.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Old way — smaller, pushed down */}
          <div className="bg-white rounded-2xl p-10 shadow-[0px_0px_0px_1px_rgba(103,103,103,0.08),0px_2px_4px_0px_rgba(103,103,103,0.08)] lg:mt-5">
            <h3 className="text-[28px] font-medium text-[#020a0f] mb-3 leading-[39.2px]">
              The old way
            </h3>
            <p className="text-[15px] text-[#1e2124] leading-[21px] mb-8">
              Traditional agents take a percentage of your sale price, eating
              into your profits.
            </p>
            <div className="h-px bg-[#e6e6eb] mb-8" />
            <div className="space-y-[16px]">
              {oldWayItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 opacity-50">
                  <div className="flex items-center justify-center size-6 rounded p-1">
                    <IconX className="size-4 text-foreground/50" />
                  </div>
                  <span className="text-[15px] text-[#020a0f] leading-[21px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* With Reasy — larger, more prominent */}
          <div className="bg-white rounded-2xl p-10 border-2 border-[rgba(79,125,221,0.28)] shadow-[0px_0px_0px_1px_rgba(103,103,103,0.08),0px_2px_4px_0px_rgba(103,103,103,0.08)]">
            <h3 className="text-[28px] font-medium text-primary mb-3 leading-[39.2px]">
              With Reasy
            </h3>
            <p className="text-[15px] text-[#1e2124] leading-[21px] mb-8">
              Zero agent commission. Reasy guides you through every step.
            </p>
            <div className="h-px bg-[#e6e6eb] mb-8" />
            <div className="space-y-[20px]">
              {reasyItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-[17px]">
                    <IconCheck className="size-[17px] text-primary" />
                  </div>
                  <span className="text-[15px] text-[#020a0f] leading-[21px]">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-[15px] font-semibold text-brand-dark border border-[#e6e6eb] bg-white hover:bg-gray-50 transition-colors"
              >
                Get early access
                <IconArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Savings Calculator ---

function SavingsCalculator() {
  const [homeValue, setHomeValue] = useState([1650000])
  const PUBLISH_LISTING = 99
  const PLATFORM_FEE = 999
  const SETTLEMENT = 1099
  const REASY_TOTAL = PUBLISH_LISTING + PLATFORM_FEE + SETTLEMENT
  const AGENT_RATE = 0.025

  const { traditionalFee, savings } = useMemo(() => {
    const val = homeValue[0]
    const traditional = Math.round(val * AGENT_RATE)
    return {
      traditionalFee: traditional,
      savings: traditional - REASY_TOTAL,
    }
  }, [homeValue])

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(val)

  const bullets = [
    "No commissions. Ever.",
    "No hidden fees.",
    "A fraction of traditional agent fees.",
  ]

  return (
    <section id="savings" className="bg-[#202653] py-32 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left column — Copy */}
        <div>
          <p className="font-['Roboto_Mono_Variable'] text-[13px] font-semibold uppercase leading-[15.6px] text-[#6ef5df] mb-6 tracking-[0.08em]">
            Savings with Reasy
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-white mb-8">
            See how much you could{" "}
            <span className="text-[#6ef5df]">save.</span>
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-6">
            Traditional agents charge{" "}
            <span className="text-white">~2.5% of your home sale price.</span>{" "}
            With Reasy, you pay only for what you use.
          </p>
          <p className="text-[17px] text-[#6ef5df] leading-relaxed mb-8">
            Sellers using Reasy save an average of $20k - $50k compared to
            traditional fees.
          </p>
          <ul className="space-y-2 mb-12">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[15px] text-white"
              >
                <span className="size-1.5 rounded-full bg-[#6ef5df] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-white/40 leading-relaxed">
            We're building this with our founding users, slashing costs for
            buyers and sellers for good.
          </p>
        </div>

        {/* Right column — Calculator card */}
        <div className="bg-white/[0.04] rounded-3xl p-8 lg:p-10 border border-white/10">
          {/* Big savings number + label */}
          <div className="flex items-baseline gap-4 mb-8">
            <p className="font-serif text-[#77ffdc] text-[48px] md:text-[64px] leading-none tracking-[-0.02em]">
              {formatCurrency(savings)}
            </p>
            <div className="text-white/50 text-[13px] leading-[1.4]">
              <p>Estimated savings</p>
              <p>vs traditional agent</p>
            </div>
          </div>

          {/* Home value slider */}
          <div className="border-t border-white/10 pt-6 mb-6">
            <p className="text-white/50 text-[13px] mb-1">Your home value</p>
            <div className="inline-flex items-baseline mb-4">
              <span className="text-[24px] font-medium text-white">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={homeValue[0].toLocaleString("en-AU")}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "")
                  const num = Number(raw)
                  if (!isNaN(num)) {
                    setHomeValue([Math.min(Math.max(num, 0), 10000000)])
                  }
                }}
                style={{
                  width: `${homeValue[0].toLocaleString("en-AU").length * 0.65}em`,
                }}
                className="text-[24px] font-medium text-white bg-transparent border-none outline-none appearance-none min-w-[80px]"
              />
            </div>
            <div className="relative w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px] rounded-full bg-white/20" />
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 h-[3px] rounded-full bg-white/60"
                style={{
                  width: `${((homeValue[0] - 200000) / (10000000 - 200000)) * 100}%`,
                }}
              />
              <input
                type="range"
                min={200000}
                max={10000000}
                step={5000}
                value={homeValue[0]}
                onChange={(e) => setHomeValue([Number(e.target.value)])}
                className="relative w-full h-6 appearance-none bg-transparent cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:mt-[-6px]
                  [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-[15px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0
                  [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-[3px]
                  [&::-moz-range-track]:appearance-none [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:h-[3px]"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs font-medium text-white/30">$200K</span>
              <span className="text-xs font-medium text-white/30">$10M</span>
            </div>
          </div>

          {/* Traditional agent line */}
          <div className="border-t border-white/10 pt-5 pb-6 flex items-center justify-between">
            <span className="text-white/50 text-[14px]">
              Traditional agent ~2.5%
            </span>
            <span className="text-white/50 text-[14px] line-through">
              {formatCurrency(traditionalFee)}
            </span>
          </div>

          {/* Sellers / Buyers split card */}
          <div className="grid grid-cols-2 border border-white/10 rounded-2xl mb-6 overflow-hidden">
            {/* Sellers */}
            <div className="p-5 border-r border-white/10 flex flex-col">
              <span className="inline-flex items-center self-start px-2.5 py-1 bg-[#6ef5df] rounded-full font-['Roboto_Mono_Variable'] text-[10px] font-semibold tracking-[0.04em] text-[#202653] mb-4">
                SELLERS
              </span>
              <div className="flex justify-between text-[14px] text-white mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  Publish listing
                  <span className="relative group">
                    <span
                      className="inline-flex items-center justify-center size-[14px] -translate-y-[1px] rounded-full border border-white/30 text-[9px] text-white/50 cursor-help"
                      style={{ lineHeight: 0 }}
                    >
                      i
                    </span>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[220px] p-3 rounded-lg bg-white text-[#1e2124] text-[13px] text-left leading-[1.5] shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-10">
                      $99 compliance (KYC + title search)
                    </span>
                  </span>
                </span>
                <span>{formatCurrency(PUBLISH_LISTING)}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-white/70">Platform fee</span>
                <span className="text-[#6ef5df]">waived</span>
              </div>
              <p className="text-[13px] text-white/50 leading-[1.4] mt-2">
                Exclusive to founding members, we are waiving our platform fees.
              </p>
            </div>

            {/* Buyers */}
            <div className="p-5 flex flex-col">
              <span className="inline-flex items-center self-start px-2.5 py-1 bg-[#a5c2ff] rounded-full font-['Roboto_Mono_Variable'] text-[10px] font-semibold tracking-[0.04em] text-[#202653] mb-4">
                BUYERS
              </span>
              <p className="text-[14px] text-white font-medium mb-0.5">
                Completely free
              </p>
              <p className="text-[13px] text-white/50 leading-[1.4]">
                to browse, search, and make offers.
              </p>
              <p className="text-[12px] text-white/35 mt-auto pt-3">
                No account fees.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#waitlist"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-white text-brand-dark text-[15px] font-semibold hover:bg-white/90 transition-colors"
          >
            Become a Founding User
            <IconArrowRight className="size-4" />
          </a>

          {/* Beta disclaimer */}
          <p className="text-[12px] text-white/40 leading-[1.5] mt-6 text-center">
            * We are currently launching our Beta. All pricing, processes and
            functionality are under review as we build the platform and develop
            towards public launch.
          </p>
        </div>
      </div>
    </section>
  )
}

// --- For Buyers ---

function ForBuyers() {
  const cards = [
    {
      title: "Browse privately",
      description:
        "Discover properties listed directly by sellers, off-market before they hit mainstream portals. Get early access to homes you won't find anywhere else.",
      color: "bg-[#dceeff]",
      titleColor: "text-[#2b7de9]",
      image: browsePrivatelyImg,
    },
    {
      title: "Enquire directly",
      description:
        "Skip the agent and communicate directly with the seller. Ask questions, arrange inspections submit offers and negotiate on your own terms.",
      color: "bg-[#e8ffe0]",
      titleColor: "text-[#3ba526]",
      image: enquireDirectlyImg,
    },
    {
      title: "Guided process",
      description:
        "Reasy guides you through the entire process with checklists and next steps, from discovery all the way through to settlement.",
      color: "bg-[#ece5ff]",
      titleColor: "text-[#7c5cdb]",
      image: buyersCard3,
    },
  ]

  return (
    <section id="buyers" className="py-32 px-4">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-['Roboto_Mono_Variable'] text-[13px] font-semibold uppercase leading-[15.6px] text-primary mb-3">
          For Buyers
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#020a0f] max-w-[600px] mb-16">
          Buying a home shouldn't require dealing with an agent either
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="flex flex-col">
              <h3 className={cn("text-base font-semibold mb-2", card.titleColor)}>
                {card.title}
              </h3>
              <p className="text-[15px] text-[#1e2124] leading-relaxed mb-6">
                {card.description}
              </p>
              <div className={cn("rounded-2xl h-[240px] mt-auto flex items-center justify-center overflow-hidden", card.color)}>
                <img src={card.image} alt="" className="h-full w-auto max-w-full object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- FAQs ---

function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How much does Reasy cost?",
      answer:
        "Sellers only pay $99 to publish their listing on Reasy. This covers KYC, title check and verification. We're still finalising our full pricing structure as we build the platform together with our founding users during Beta. What will never change: Reasy charges no commission and never will.",
    },
    {
      question: "Do I need a real estate agent?",
      answer:
        "No. Reasy is designed for people who want to sell their home without a traditional agent, to avoid paying thousands of dollars in agent fees. The platform guides you through the entire process, and when you need legal support, we allow you to add your conveyancer to the Reasy workspace, so all communication and negotiation happens in one place not scattered across multiple lines of communication in different places.",
    },
    {
      question: "Is it legal to sell my own home without an agent?",
      answer:
        "Yes, absolutely. In Australia, there is no legal requirement to use a real estate agent to sell your property. It's advised to use a conveyancer to handle the legal aspects. Reasy allows you to invite your conveyancer to the Reasy workspace so all communication and document sharing happens in one place not spread across multiple platforms like Email, Text, Whatsapp etc.",
    },
    {
      question: "How do buyers find my listing?",
      answer:
        "Your property is listed on the Reasy platform where buyers can browse and enquire directly with you, no gate keeping or middlemen to hide offers or communication. You stay in control throughout the entire process. Reasy does not list in the major portals saving you Heaps of Dollars while serving your property listing to Thousands of buyers who want access to properties that aren't gate kept by Real Estate agents and Middlemen.",
    },
    {
      question: "What happens if I change my mind?",
      answer:
        "You're in control at every step. You can take your listing down at any time. You only pay the next gate fee when you actively choose to progress to that stage.",
    },
    {
      question: "When is Reasy launching?",
      answer:
        "We're finalising our Beta Launch. Join the waitlist to be one of the first to use Reasy when we go live. Founding members will get priority access and special pricing, limited spots. First in, best dressed.",
    },
  ]

  return (
    <section className="py-32 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#020a0f] mb-4">
            Frequently asked questions.
          </h2>
          <p className="text-[17px] text-[#1e2124]/60">
            Answers to your questions, every step of the way.
          </p>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#f0f0f2]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-7 text-left group"
              >
                <span className="text-[20px] md:text-[22px] font-medium text-[#020a0f] pr-8 tracking-[-0.03em]">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 size-10 rounded-full bg-[#f0f0f2] flex items-center justify-center">
                  <IconChevronRight
                    className={cn(
                      "size-[18px] text-[#47474f] transition-transform duration-300",
                      openIndex === i ? "-rotate-90" : "rotate-90"
                    )}
                    stroke={2}
                  />
                </span>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === i ? "max-h-[400px] pb-7" : "max-h-0"
                )}
              >
                <p className="text-[16px] text-[#1e2124]/70 leading-[1.7] max-w-[680px]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Waitlist CTA ---

function WaitlistCTA() {
  const [interest, setInterest] = useState<"selling" | "buying">("selling")

  return (
    <section id="waitlist" className="pt-32 pb-0 px-4 bg-[linear-gradient(180deg,#FFF_0%,#FEFCF8_30%)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[544px] border border-[#e6e6eb]">
          {/* Left — Form */}
          <div className="p-5 lg:p-14 flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-[40px] leading-[1.3] text-[#020a0f] mb-3">
              Join the waitlist
            </h2>
            <p className="text-[15px] text-[#1e2124] leading-relaxed mb-8">
              Be one of the first to use Reasy when we launch. Register your interest and we'll keep you updated.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="space-y-4"
            >
          {/* Interest toggle */}
          <div>
            <label className="text-sm font-medium text-[#020a0f] mb-2 block">
              I'm interested in
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setInterest("selling")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl transition-colors",
                  interest === "selling"
                    ? "bg-primary/[0.08] border-2 border-primary"
                    : "bg-white border border-[#e5e7eb] hover:bg-[#f6f6f8]"
                )}
              >
                <svg className="size-6" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 2C23.3555 2 22 3.35547 22 5V6H5C4.96875 6 4.9375 6 4.90625 6C4.39062 6.04688 3.99609 6.48047 4 7V26C4 26.5508 4.44922 27 5 27H22V42.0312L22.4063 42.3125C22.4063 42.3125 22.7227 42.5312 23.1563 42.6875C23.5898 42.8438 24.2031 43 25 43C25.7969 43 26.4102 42.8438 26.8438 42.6875C27.2773 42.5312 27.5938 42.3125 27.5938 42.3125L28 42.0312V27H45C45.5508 27 46 26.5508 46 26V7C46 6.44922 45.5508 6 45 6H28V5C28 3.35547 26.6445 2 25 2ZM25 4C25.5664 4 26 4.43359 26 5V6H24V5C24 4.43359 24.4336 4 25 4ZM6 8H44V25H6V8ZM12.2813 11.7812C10.2188 11.7812 8.875 12.9102 8.875 14.5938C8.875 15.957 9.68359 16.7852 11.3125 17.125L12.4688 17.375C13.5664 17.6094 14 17.9609 14 18.5312C14 19.207 13.3164 19.6562 12.3438 19.6562C11.2891 19.6562 10.5547 19.1914 10.4688 18.4688H8.65625C8.72656 20.1328 10.1211 21.1875 12.25 21.1875C14.4922 21.1875 15.875 20.082 15.875 18.2812C15.875 16.8945 15.1094 16.1289 13.3125 15.75L12.2188 15.5C11.1719 15.2773 10.75 14.9883 10.75 14.4375C10.75 13.7578 11.3789 13.3125 12.3125 13.3125C13.2148 13.3125 13.8516 13.793 13.9375 14.5H15.7188C15.6641 12.9062 14.25 11.7812 12.2813 11.7812ZM20.4063 12.0312L17.3125 20.9688H19.1875L19.875 18.8125H23L23.6875 20.9688H25.7188L22.625 12.0312H20.4063ZM27.5625 12.0312V20.9688H33.4063V19.3125H29.4375V12.0312H27.5625ZM35.4062 12.0312V20.9688H41.3437V19.3438H37.2812V17.1875H41.0937V15.7188H37.2812V13.625H41.3437V12.0312H35.4062ZM21.4063 13.875H21.5L22.625 17.375H20.2813L21.4063 13.875ZM24 27H26V40.8438C25.7695 40.918 25.4883 41 25 41C24.5117 41 24.2344 40.918 24 40.8438V27ZM8.8125 32C8.48828 32.0664 8.22266 32.2891 8.09375 32.5938L2.09375 46.5938C1.95703 46.9023 1.98437 47.2578 2.16797 47.543C2.35156 47.8242 2.66406 47.9961 3 48H47C47.3359 47.9961 47.6484 47.8242 47.832 47.543C48.0156 47.2578 48.043 46.9023 47.9062 46.5938L41.9062 32.5938C41.7461 32.2344 41.3906 32.0039 41 32H30V34H40.3437L45.5 46H4.5L9.65625 34H20V32H9C8.96875 32 8.9375 32 8.90625 32C8.875 32 8.84375 32 8.8125 32Z" fill={interest === "selling" ? "#1d4bab" : "#747891"} />
                </svg>
                <span className={cn(
                  "text-[15px] font-medium",
                  interest === "selling" ? "text-[#1d4bab]" : "text-[#747891]"
                )}>
                  Selling
                </span>
              </button>
              <button
                type="button"
                onClick={() => setInterest("buying")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl transition-colors",
                  interest === "buying"
                    ? "bg-primary/[0.08] border-2 border-primary"
                    : "bg-white border border-[#e5e7eb] hover:bg-[#f6f6f8]"
                )}
              >
                <svg className="size-6" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity={interest === "buying" ? 1 : 0.7}>
                    <path d="M11 0C9.897 0 9 0.897 9 2V19C9 20.103 9.897 21 11 21H13.5469C13.3419 20.357 13.1974 19.687 13.1074 19H11V2H38L38.002 18.8652C38.5 19.3542 38.946 19.8945 39.334 20.4785C39.74 20.1115 40 19.588 40 19V2C40 0.897 39.103 0 38 0H11ZM24.5 6C23.0833 6 21.8936 6.56726 21.127 7.42969C20.3603 8.29212 20 9.40278 20 10.5C20 11.5972 20.3603 12.7079 21.127 13.5703C21.8936 14.4327 23.0833 15 24.5 15C25.9167 15 27.1064 14.4327 27.873 13.5703C28.6397 12.7079 29 11.5972 29 10.5C29 9.40278 28.6397 8.29212 27.873 7.42969C27.1064 6.56726 25.9167 6 24.5 6ZM24.5 8C25.4167 8 25.9769 8.30774 26.377 8.75781C26.777 9.20788 27 9.84722 27 10.5C27 11.1528 26.777 11.7921 26.377 12.2422C25.9769 12.6923 25.4167 13 24.5 13C23.5833 13 23.0231 12.6923 22.623 12.2422C22.223 11.7921 22 11.1528 22 10.5C22 9.84722 22.223 9.20788 22.623 8.75781C23.0231 8.30774 23.5833 8 24.5 8ZM18.0059 10.5879C16.1609 12.3219 15 14.775 15 17.5C15 19.2686 15.4919 20.9203 16.3379 22.3379C14.8916 23.7842 14 25.785 14 28C14 30.9695 15.6079 33.5473 18 34.9277V47C18.0001 47.2652 18.1054 47.5195 18.293 47.707L20.293 49.707C20.4805 49.8946 20.7348 49.9999 21 50H23C23.2652 49.9999 23.5195 49.8946 23.707 49.707L25.707 47.707C25.8946 47.5195 25.9999 47.2652 26 47V45C25.9999 44.7348 25.8946 44.4805 25.707 44.293L24.9141 43.5L25.707 42.707C25.8946 42.5195 25.9999 42.2652 26 42V40C26 39.8026 25.9415 39.6096 25.832 39.4453L25.2012 38.5L25.832 37.5547C25.9415 37.3904 26 37.1974 26 37V34.9277C26.7228 34.5106 27.3713 33.9833 27.9277 33.3691C29.6226 34.0826 31.5056 34.1819 33.252 33.666L41.293 41.707C41.4805 41.8946 41.7348 41.9999 42 42H45C45.2652 41.9999 45.5195 41.8946 45.707 41.707L46.707 40.707C46.8946 40.5195 46.9999 40.2652 47 40V37C46.9999 36.7348 46.8946 36.4805 46.707 36.293L45.707 35.293C45.5195 35.1054 45.2652 35.0001 45 35H44V34C43.9999 33.7348 43.8946 33.4805 43.707 33.293L41.707 31.293C41.5195 31.1054 41.2652 31.0001 41 31H40V30C39.9999 29.7348 39.8946 29.4805 39.707 29.293L38.6641 28.25C39.46 25.5416 38.7877 22.4987 36.6445 20.3555C35.8443 19.5552 34.9185 18.9626 33.9316 18.5723C33.9726 18.2199 34 17.8634 34 17.5C34 14.775 32.8401 12.3219 30.9961 10.5879C30.9851 11.4469 30.8101 12.2657 30.4961 13.0137C31.4361 14.2667 32 15.816 32 17.5C32 17.6954 31.9897 17.8885 31.9746 18.0801C31.6506 18.0402 31.3259 18.0117 31 18.0117C28.9593 18.0117 26.9183 18.7927 25.3555 20.3555C25.2677 20.4432 25.1916 20.5335 25.1113 20.623C24.1558 20.2213 23.1044 20 22 20C20.5163 20 19.1343 20.4083 17.9453 21.1074C17.351 20.0355 17 18.8114 17 17.5C17 15.816 17.5649 14.2667 18.5059 13.0137C18.1919 12.2657 18.0169 11.4469 18.0059 10.5879ZM31 19.9883C31.1869 19.9883 31.3743 19.9977 31.5605 20.0156C31.5592 20.0195 31.558 20.0235 31.5566 20.0273C31.809 20.0478 32.0595 20.0945 32.3086 20.1426C33.3705 20.3864 34.3855 20.9246 35.2305 21.7695C37.6069 24.1459 37.6069 27.8541 35.2305 30.2305C33.5459 31.915 31.2099 32.3128 29.1367 31.6094C29.6845 30.5249 30 29.3017 30 28C30 27.6939 29.9805 27.3927 29.9473 27.0957C29.9433 27.0617 29.938 27.028 29.9336 26.9941C29.9562 26.9949 29.9772 27 30 27C31.105 27 32 26.105 32 25C32 23.895 31.105 23 30 23C29.4756 23 29.0031 23.2071 28.6465 23.5371C28.1681 22.8245 27.5735 22.2001 26.8965 21.6758C28.0664 20.5635 29.5288 19.9883 31 19.9883ZM22 22C22.9867 22 23.9064 22.2313 24.7188 22.6348L24.9062 22.7363C25.8323 23.2426 26.6065 23.9815 27.1484 24.8828C27.1507 24.8866 27.1521 24.8908 27.1543 24.8945C27.4141 25.3288 27.618 25.8019 27.7617 26.3027C27.7748 26.3489 27.7848 26.3967 27.7969 26.4434C27.8472 26.6363 27.8865 26.8344 27.918 27.0352C27.9288 27.1048 27.9407 27.1736 27.9492 27.2441C27.9793 27.4919 28 27.7425 28 28C28 28.3082 27.9711 28.6069 27.9277 28.9004C27.9212 28.9455 27.9157 28.9905 27.9082 29.0352C27.7488 29.967 27.382 30.8183 26.8516 31.5469L26.5957 31.8984C25.5043 33.191 23.8667 34 22 34C18.6299 34 16 31.3701 16 28C16 26.4208 16.5824 25.0089 17.543 23.9492C18.2536 24.7131 19.0892 25.3572 20.0156 25.8555C20.0121 25.9042 20 25.9504 20 26C20 27.105 20.895 28 22 28C23.105 28 24 27.105 24 26C24 24.895 23.105 24 22 24C21.6991 24 21.4161 24.0706 21.1602 24.1895C20.3999 23.8087 19.7077 23.3146 19.1211 22.7109C19.9708 22.2568 20.9491 22 22 22ZM37.7832 30.1973L38 30.4141V32C38 32.2652 38.1054 32.5195 38.2929 32.7071C38.4805 32.8946 38.7348 33 39 33H40.5859L42 34.4141V36C42 36.2652 42.1054 36.5195 42.2929 36.7071C42.4805 36.8946 42.7348 37 43 37H44.5859L45 37.4141V39.5859L44.5859 40H42.4141L35.2012 32.7871C35.7131 32.4681 36.1989 32.0902 36.6445 31.6445C37.0905 31.1985 37.4645 30.71 37.7832 30.1973ZM20 35.7383C20.6402 35.9025 21.3074 36 22 36C22.6926 36 23.3598 35.9025 24 35.7383V36.6973L23.168 37.9453C23.0585 38.1096 23 38.3026 23 38.5C23 38.6974 23.0585 38.8904 23.168 39.0547L24 40.3027V41.5859L22.793 42.793C22.6055 42.9805 22.5002 43.2348 22.5002 43.5C22.5002 43.7652 22.6055 44.0195 22.793 44.207L24 45.4141V46.5859L22.5859 48H21.4141L20 46.5859V35.7383Z" fill={interest === "buying" ? "#1d4bab" : "#747891"} />
                  </g>
                </svg>
                <span className={cn(
                  "text-[15px] font-medium",
                  interest === "buying" ? "text-[#1d4bab]" : "text-[#747891]"
                )}>
                  Buying
                </span>
              </button>
            </div>
          </div>

          {/* Email & location */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-[#020a0f] mb-2 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[#e6e6eb] bg-white text-[15px] text-[#020a0f] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            {interest === "selling" ? (
              <div>
                <label htmlFor="postcode" className="text-sm font-medium text-[#020a0f] mb-2 block">
                  Postcode
                </label>
                <input
                  id="postcode"
                  type="text"
                  placeholder="e.g. 4573"
                  inputMode="numeric"
                  maxLength={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#e6e6eb] bg-white text-[15px] text-[#020a0f] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium text-[#020a0f] mb-2 block">
                  Top cities you'd like to buy in
                </label>
                <p className="text-[13px] text-[#7a7a7a] mb-3">
                  Tell us where you're searching so we can let you know when matching listings go live.
                </p>
                <div className="space-y-2.5">
                  {[1, 2, 3].map((n) => (
                    <input
                      key={n}
                      id={`buy-city-${n}`}
                      type="text"
                      placeholder={`City ${n}${n === 1 ? " (e.g. Brisbane)" : ""}`}
                      autoComplete="off"
                      className="w-full px-4 py-3 rounded-xl border border-[#e6e6eb] bg-white text-[15px] text-[#020a0f] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-primary text-white text-[15px] font-semibold hover:bg-primary/90 transition-colors mt-2"
          >
            Join the waitlist
          </button>
            </form>
          </div>

          {/* Right — Aerial image */}
          <div className="relative hidden lg:block">
            <img
              src={aerialImg}
              alt="Australian waterfront properties"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Contact Dialog ---

function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[520px] bg-white rounded-3xl border border-[#e6e6eb] shadow-[0px_24px_64px_-12px_rgba(0,0,0,0.18)] p-6 md:p-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 size-9 rounded-full bg-[#f6f6f8] hover:bg-[#ececef] flex items-center justify-center text-[#47474f] transition-colors"
        >
          <IconX className="size-4" />
        </button>

        <h2 className="font-serif text-3xl md:text-[36px] leading-[1.2] text-[#020a0f] mb-3">
          Get in touch
        </h2>
        <p className="text-[15px] text-[#1e2124] leading-relaxed mb-8">
          Have a question or want to chat? Send us a message and we'll get
          back to you.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onClose()
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium text-[#020a0f] mb-2 block">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border border-[#e6e6eb] bg-white text-[15px] text-[#020a0f] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="text-sm font-medium text-[#020a0f] mb-2 block">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[#e6e6eb] bg-white text-[15px] text-[#020a0f] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="contact-postcode" className="text-sm font-medium text-[#020a0f] mb-2 block">
              Postcode
            </label>
            <input
              id="contact-postcode"
              type="text"
              placeholder="e.g. 4573"
              inputMode="numeric"
              maxLength={4}
              className="w-full px-4 py-3 rounded-xl border border-[#e6e6eb] bg-white text-[15px] text-[#020a0f] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="text-sm font-medium text-[#020a0f] mb-2 block">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-xl border border-[#e6e6eb] bg-white text-[15px] text-[#020a0f] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-primary text-white text-[15px] font-semibold hover:bg-primary/90 transition-colors mt-2"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  )
}

// --- Footer ---

function Footer() {
  const [contactOpen, setContactOpen] = useState(false)
  const links = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Benefits", href: "#benefits" },
    { label: "Savings Calculator", href: "#savings" },
    { label: "For Buyers", href: "#buyers" },
  ]
  const socials = [
    { icon: IconBrandInstagram, label: "Instagram", href: "https://www.instagram.com/agents_want_me_cancelled?igsh=aTBud3F5cHQzb2Iz&utm_source=qr" },
    { icon: IconBrandTiktok, label: "TikTok", href: "https://www.tiktok.com/@agentswantmecancelled?_r=1&_t=ZS-95xMn4ARczX" },
    { icon: IconBrandYoutube, label: "YouTube", href: "https://www.youtube.com/@heyreasy" },
  ]

  const eyebrow =
    "font-['Roboto_Mono_Variable'] text-[13px] font-semibold uppercase tracking-[0.04em] text-[#47474f]/60 mb-5"
  const linkClass =
    "text-[15px] font-medium text-[#47474f] hover:text-foreground transition-colors"

  return (
    <>
    <footer className="pt-24 pb-16 px-4 bg-[#fefcf8]">
      <div className="max-w-[1200px] mx-auto">
        {/* Top: 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 lg:gap-10 pb-12">
          {/* Brand */}
          <div>
            <img src={logoImg} alt="Reasy" className="h-7 w-auto mb-6" />
            <p className="text-[15px] text-[#47474f] leading-[1.5] mb-6">
              Real estate, made easy.
              <br />
              Sell your home without an agent.
            </p>
            <div className="flex items-center gap-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#47474f] hover:text-foreground transition-colors"
                >
                  <Icon className="size-5" stroke={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <p className={eyebrow}>Platform</p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className={eyebrow}>Company</p>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setContactOpen(true)}
                  className={cn(linkClass, "text-left")}
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a href="/privacy" className={linkClass}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className={linkClass}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className={eyebrow}>Connect</p>
            <ul className="space-y-3">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-[#e6e6eb] pt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <p className="text-[12px] text-[#7a7a7a] leading-[1.7] md:w-1/2">
            Reasy operates as a digital platform and does not act as a real
            estate agent or conveyancer. Any services that require licensing
            are carried out by external, qualified professionals. Results can
            differ and are influenced by market conditions and the choices
            made by users.
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 text-[14px] text-[#7a7a7a]">
            <p>&copy; 2026 Reasy Pty Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large masked tagline */}
      <div className="mt-8 overflow-hidden pb-4 -mx-4">
        <p
          className="font-serif text-[clamp(2rem,11.5vw,280px)] leading-[0.9] text-center tracking-[-0.04em] bg-gradient-to-b from-primary/30 to-primary/5 bg-clip-text text-transparent select-none whitespace-nowrap"
        >
          real estate. easy.
        </p>
      </div>
    </footer>
    <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}

// --- Main Home Page ---

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <HeroSection />
        <FeaturedIn />
        <HowItWorks />
        <BentoGrid />
        <AIAssistance />
        <WhyChooseReasy />
        <SavingsCalculator />
        <ForBuyers />
        <FAQs />
        <WaitlistCTA />
      </main>
      <Footer />
    </div>
  )
}
