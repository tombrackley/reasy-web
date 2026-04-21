import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"
import { IconX, IconCheck, IconArrowRight, IconChevronRight, IconBrandFacebook, IconBrandInstagram, IconBrandX, IconBrandLinkedin, IconBrandYoutube, IconBrandTiktok, IconMenu2 } from "@tabler/icons-react"


import logoImg from "@/assets/reasy-logo.svg"
import logoWhiteImg from "@/assets/reasy-logo-white.svg"
import dashImg from "@/assets/reasy-dash.png"
import aerialImg from "@/assets/hero-aerial.jpg"
import property1Img from "@/assets/property-1.jpg"
import property2Img from "@/assets/property-2.jpg"
import property3Img from "@/assets/property-3.jpg"
import avatar1 from "@/assets/avatar-1.jpg"
import avatar2 from "@/assets/avatar-2.jpg"
import avatar3 from "@/assets/avatar-3.jpg"
import avatar4 from "@/assets/avatar-4.jpg"
import avatar5 from "@/assets/avatar-5.jpg"
import avatar6 from "@/assets/avatar-6.jpg"
import bentoImg1 from "@/assets/Container.png"
import bentoImg2 from "@/assets/Container-1.png"
import bentoImg3 from "@/assets/Container-2.png"
import bentoImg4 from "@/assets/Container-3.png"
import bentoImg5 from "@/assets/Container-4.png"
import browseIcon from "@/assets/browse-icon.svg"
import chatIcon from "@/assets/chat-icon.svg"
import processIcon from "@/assets/process-icon.svg"
import listQuietlyImg from "@/assets/list-quietly-test-waters.png"

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
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-white/90 max-w-[640px] mx-auto mb-10 leading-relaxed">
          Reasy connects real buyers and sellers and guides every step from first
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
        <div className="max-w-[1200px] mx-auto mt-16 bg-[#f8f8f8] rounded-2xl p-2.5">
          <img
            src={dashImg}
            alt="Reasy dashboard"
            className="w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}

// --- Property Carousel ---

const properties = [
  {
    image: property1Img,
    names: "Michelle",
    solo: true,
    location: "Paddington, NSW",
    price: "offers above $2.1m",
    savings: "$49k",
  },
  {
    image: property2Img,
    names: "Warren & Nolene",
    location: "Peregian Springs, QLD",
    price: "offers over $1.2m",
    savings: "$33k",
  },
  {
    image: property3Img,
    names: "David & Priya",
    location: "Brighton, VIC",
    price: "offers over $1.4m",
    savings: "$32k",
  },
]

export function PropertyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % properties.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  // Build display order: [prev, active, next]
  const prevIndex =
    (activeIndex - 1 + properties.length) % properties.length
  const nextIndex = (activeIndex + 1) % properties.length
  const displayOrder = [prevIndex, activeIndex, nextIndex]

  return (
    <section className="relative py-8 overflow-hidden">
      <div className="flex items-center justify-center gap-7">
        {displayOrder.map((propertyIndex, position) => {
          const property = properties[propertyIndex]
          const isActive = position === 1
          return (
            <div
              key={propertyIndex}
              onClick={() => !isActive && setActiveIndex(propertyIndex)}
              className={cn(
                "relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-700",
                isActive
                  ? "w-[min(1148px,80vw)] h-[585px] opacity-100 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]"
                  : "w-[min(1148px,80vw)] h-[585px] opacity-20 hidden lg:block cursor-pointer"
              )}
            >
              {/* Property image */}
              <img
                src={property.image}
                alt={`Property by ${property.names}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[rgba(32,38,83,0.1)]" />

              {/* Info card */}
              <div className="absolute left-[23px] bottom-[23px] bg-white rounded-xl p-4 shadow-[0px_6px_20px_0px_rgba(0,0,0,0.15)] w-[391px] max-w-[calc(100%-46px)] overflow-hidden">
                <div className="flex flex-col gap-4">
                  {property.solo ? (
                    <img src={avatar4} alt="" className="size-9 rounded-full object-cover" />
                  ) : (
                    <div className="flex -space-x-2">
                      <img src={avatar4} alt="" className="size-9 rounded-full ring-2 ring-white object-cover" />
                      <img src={avatar5} alt="" className="size-9 rounded-full ring-2 ring-white object-cover" />
                    </div>
                  )}
                  <p className="text-[18px] font-medium text-[#1e2124] leading-[25.2px] tracking-[-0.36px]">
                    {property.solo
                      ? <>{property.names} is looking to sell her home in {property.location}{" "}</>
                      : <>{property.names} are selling their home in {property.location}{" "}</>
                    }
                    <span className="text-[rgba(30,33,36,0.5)]">
                      looking for {property.price}
                    </span>
                  </p>
                  {isActive && (
                    <div className="inline-flex self-start items-center justify-center h-[30px] px-3 rounded-full bg-[rgba(91,243,217,0.12)]">
                      <span className="text-[14px] font-medium text-[#008261] tracking-[-0.28px]">
                        est. savings{" "}
                        <span className="font-semibold">
                          {property.savings}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
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
        <img src={avatar6} alt="" className="size-6 rounded-full object-cover" />
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
        "We connect you with qualified conveyancers to handle the legal side while you stay in control.",
    },
  ]

  return (
    <section id="how-it-works" className="py-32 px-4">
      <h2 className="font-serif text-4xl md:text-5xl text-center text-[#020a0f] mb-16">
        How does it work?
      </h2>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col">
            {step.illustration}
            <div className="mt-4">
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
                Reasy keeps your listing moving, tracking enquiries, nudging activity between you and interested buyers, and telling you exactly what to do next at every stage.
              </p>
            </div>
          </div>

          {/* Card 2 — Large right */}
          <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
            <img src={bentoImg2} alt="" className="h-[280px] w-full object-cover rounded-t-2xl" />
            <div className="p-8">
              <h3 className="text-lg font-medium text-[#020a0f] mb-2">
                Flat fee, not commission
              </h3>
              <p className="text-[15px] text-[#1e2124] leading-relaxed">
                Traditional agents take ~2.5% of your sale price. Reasy charges a flat fee of just $3,077 — no matter how much your home sells for.
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
                When it's time for contracts, we connect you with qualified conveyancers who handle the legal formalities.
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
                Track enquiries, manage offers, and store documents in your dashboard. No scattered emails or phone calls.
              </p>
            </div>
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
    "Clear communication and documentation in one place",
    "Transparent guidance through entire process",
    "Legal and formalities still handled by the experts",
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
            We believe selling your home shouldn't cost you tens of thousands in
            commission. Reasy gives you the tools, guidance, and connections to
            do it yourself -- properly.
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
              A flat fee model that saves you thousands while guiding you
              through every step.
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
  const [homeValue, setHomeValue] = useState([1000000])
  const GATE_1 = 79      // Go Live
  const GATE_2 = 999     // Accept EOI
  const GATE_3 = 1999    // Settlement
  const REASY_TOTAL = GATE_1 + GATE_2 + GATE_3 // $3,077
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

  return (
    <section id="savings" className="bg-[#202653] py-20 px-8 text-center">
        {/* Headline */}
        <h2 className="font-serif text-3xl md:text-[40px] leading-[1.3] mb-12">
          <span className="text-white">Sellers using Reasy</span>
          <br />
          <span className="text-[#6ef5df]">save an average of $20k - $50k</span>
          <br />
          <span className="text-white">compared to traditional fees</span>
        </h2>

        {/* Slider section */}
        <div className="max-w-[476px] mx-auto mb-12">
          <p className="text-[15px] font-medium text-white/40 mb-3">
            What is your home value?
          </p>
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-baseline">
              <span className="text-[26px] font-medium text-white">$</span>
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
                style={{ width: `${homeValue[0].toLocaleString("en-AU").length * 0.65}em` }}
                className="text-[26px] font-medium text-white bg-transparent border-none outline-none appearance-none min-w-[80px]"
              />
            </div>
          </div>
          <div className="relative w-full">
            {/* Track background */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px] rounded-full bg-white/20" />
            {/* Track fill */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-[3px] rounded-full bg-white/60"
              style={{ width: `${((homeValue[0] - 200000) / (5000000 - 200000)) * 100}%` }}
            />
            <input
              type="range"
              min={200000}
              max={5000000}
              step={50000}
              value={homeValue[0]}
              onChange={(e) => setHomeValue([Number(e.target.value)])}
              className="relative w-full h-6 appearance-none bg-transparent cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-[15px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:border-0
                [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-[3px]
                [&::-moz-range-track]:appearance-none [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:h-[3px]"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium text-white/30">$200K</span>
            <span className="text-xs font-medium text-white/30">$5M</span>
          </div>
        </div>

        {/* Savings card */}
        <div className="max-w-[480px] mx-auto bg-white/5 rounded-2xl p-12">
          <div className="text-center mb-12">
            <p className="font-serif text-5xl text-[#77ffdc] mb-1">
              {formatCurrency(savings)}
            </p>
            <p className="text-[15px] font-medium text-white/40">
              Estimated savings
            </p>
          </div>

          <div className="space-y-3 max-w-[300px] mx-auto text-sm font-medium text-white">
            <div className="flex items-center justify-between">
              <span className="opacity-30">Traditional agent ~2.5%</span>
              <span className="opacity-30 line-through">
                {formatCurrency(traditionalFee)}
              </span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between text-white/50">
              <span className="inline-flex items-center gap-1.5">
                Publish listing
                <span className="relative group">
                  <span className="inline-flex items-center justify-center size-[13px] -translate-y-[1px] rounded-full border border-white/30 text-[9px] text-white/50 cursor-help" style={{ lineHeight: 0 }}>i</span>
                  <span className="absolute top-1/2 -translate-y-1/2 left-full ml-2 w-[220px] p-3 rounded-lg bg-white text-[#1e2124] text-[14px] text-left leading-[1.5] shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-10">
                    Pay once to publish your listing. Covers KYC verification, title search, and listing setup.
                  </span>
                </span>
              </span>
              <span>{formatCurrency(GATE_1)}</span>
            </div>
            <div className="flex items-center justify-between text-white/50">
              <span className="inline-flex items-center gap-1.5">
                Accept first EOI
                <span className="relative group">
                  <span className="inline-flex items-center justify-center size-[13px] -translate-y-[1px] rounded-full border border-white/30 text-[9px] text-white/50 cursor-help" style={{ lineHeight: 0 }}>i</span>
                  <span className="absolute top-1/2 -translate-y-1/2 left-full ml-2 w-[220px] p-3 rounded-lg bg-white text-[#1e2124] text-[14px] text-left leading-[1.5] shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-10">
                    One-time fee when you accept your first expression of interest. Unlocks all buyer EOIs and AI-assisted tools.
                  </span>
                </span>
              </span>
              <span>{formatCurrency(GATE_2)}</span>
            </div>
            <div className="flex items-center justify-between text-white/50">
              <span className="inline-flex items-center gap-1.5">
                Settlement
                <span className="relative group">
                  <span className="inline-flex items-center justify-center size-[13px] -translate-y-[1px] rounded-full border border-white/30 text-[9px] text-white/50 cursor-help" style={{ lineHeight: 0 }}>i</span>
                  <span className="absolute top-1/2 -translate-y-1/2 left-full ml-2 w-[220px] p-3 rounded-lg bg-white text-[#1e2124] text-[14px] text-left leading-[1.5] shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-10">
                    Facilitation fee charged when your conveyancer confirms settlement. Only pay when the sale completes.
                  </span>
                </span>
              </span>
              <span>{formatCurrency(GATE_3)}</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <span>Reasy total</span>
              <span>{formatCurrency(REASY_TOTAL)}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-[15px] font-semibold text-brand-dark bg-white border border-[#e6e6eb] hover:bg-gray-50 transition-colors"
          >
            Join the waitlist to save
            <IconArrowRight className="size-4" />
          </a>
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
        "Discover properties listed directly by sellers, often before they hit mainstream portals. Get early access to homes you won't find anywhere else.",
      color: "bg-[#dceeff]",
      titleColor: "text-[#2b7de9]",
      icon: browseIcon,
    },
    {
      title: "Enquire directly",
      description:
        "Skip the agent and communicate directly with the seller. Ask questions, arrange inspections, and negotiate on your own terms.",
      color: "bg-[#e8ffe0]",
      titleColor: "text-[#3ba526]",
      icon: chatIcon,
    },
    {
      title: "Guided process",
      description:
        "From building inspections to finance pre-approval, Reasy guides you through every step so nothing gets missed.",
      color: "bg-[#ece5ff]",
      titleColor: "text-[#7c5cdb]",
      icon: processIcon,
    },
  ]

  return (
    <section id="buyers" className="py-32 px-4">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-['Roboto_Mono_Variable'] text-[13px] font-semibold uppercase leading-[15.6px] text-primary mb-3">
          For Buyers
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#020a0f] max-w-[600px] mb-16">
          Buying a home shouldn't require an agent either
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
              <div className={cn("rounded-2xl h-[200px] mt-auto flex items-center justify-center", card.color)}>
                <img src={card.icon} alt="" className="size-[60px]" />
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
        "Reasy uses a simple gated pricing model. You pay $79 to publish your listing, $999 when you accept your first expression of interest, and $1,999 at settlement. That's a total of $3,077 — compared to tens of thousands in traditional agent commissions.",
    },
    {
      question: "Do I need a real estate agent?",
      answer:
        "No. Reasy is designed for people who want to sell their home without a traditional agent. The platform guides you through the entire process, and when you need legal support, we connect you with a qualified conveyancer.",
    },
    {
      question: "Is it legal to sell my own home without an agent?",
      answer:
        "Yes, absolutely. In Australia, there is no legal requirement to use a real estate agent to sell your property. You do need a conveyancer or solicitor to handle the legal transfer, and Reasy helps you connect with one at the right time.",
    },
    {
      question: "How do buyers find my listing?",
      answer:
        "Your property is listed on the Reasy platform where buyers can browse and enquire. We're also working on syndication to major property portals to maximise your reach.",
    },
    {
      question: "What happens if I change my mind?",
      answer:
        "You're in control at every step. You can take your listing down at any time. You only pay the next gate fee when you actively choose to progress to that stage.",
    },
    {
      question: "When is Reasy launching?",
      answer:
        "We're currently in pre-launch. Join the waitlist to be one of the first to use Reasy when we go live. Early members will get priority access and special pricing.",
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

          {/* Email & Postcode */}
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

// --- Footer ---

function Footer() {
  const [copied, setCopied] = useState(false)
  const links = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Benefits", href: "#benefits" },
    { label: "Savings Calculator", href: "#savings" },
    { label: "For Buyers", href: "#buyers" },
  ]
  const socials = [
    { icon: IconBrandFacebook, label: "Facebook" },
    { icon: IconBrandInstagram, label: "Instagram" },
    { icon: IconBrandX, label: "X" },
    { icon: IconBrandLinkedin, label: "LinkedIn" },
    { icon: IconBrandYoutube, label: "YouTube" },
    { icon: IconBrandTiktok, label: "TikTok" },
  ]

  return (
    <footer className="pt-24 pb-16 px-4 bg-[#fefcf8]">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8">
        <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-[#47474f] hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              navigator.clipboard.writeText("info@reasy.com.au")
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="text-[15px] font-medium text-[#47474f] hover:text-foreground transition-colors"
          >
            {copied ? "Email copied!" : "Contact Us"}
          </button>
        </nav>

        <div className="flex items-center gap-8">
          {socials.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-[#47474f] hover:text-foreground transition-colors"
            >
              <Icon className="size-5" stroke={1.5} />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 text-sm text-[#7a7a7a]">
          <p>&copy; 2026 Reasy Pty Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Large masked tagline */}
      <div className="mt-8 overflow-hidden pb-4 -mx-4">
        <p
          className="font-serif text-[clamp(80px,18vw,280px)] leading-[0.9] text-center tracking-tight bg-gradient-to-b from-primary/30 to-primary/5 bg-clip-text text-transparent select-none whitespace-nowrap"
        >
          real estate. easy.
        </p>
      </div>
    </footer>
  )
}

// --- Main Home Page ---

export function HomePageV2() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <HeroSection />
        <HowItWorks />
        <BentoGrid />
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
