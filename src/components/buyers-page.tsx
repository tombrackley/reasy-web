import { useState, useEffect, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/lib/utils"
import { IconArrowRight, IconCheck, IconX, IconBrandInstagram } from "@tabler/icons-react"
import logoWhiteImg from "@/assets/reasy-logo-white.svg"
import buyerDashImg from "@/assets/reasy-buyer-dashboard.png"
import buyerDashMobileImg from "@/assets/reasy-buyer-dashboard-mobile.png"
import { Reveal } from "@/components/reveal"
import dailyMailLogo from "@/assets/daily-mail-logo.png"
import yahooFinanceLogo from "@/assets/yahoo-finance-logo.png"
import founderPhoto from "@/assets/founder-warren.jpeg"
import founderAvatar from "@/assets/founder-avatar.png"
import comment01 from "@/assets/comment-01.png"
import comment02 from "@/assets/comment-02.png"
import comment03 from "@/assets/comment-03.png"
import comment04 from "@/assets/comment-04.png"
import comment05 from "@/assets/comment-05.png"
import comment06 from "@/assets/comment-06.png"
import comment07 from "@/assets/comment-07.png"
import comment08 from "@/assets/comment-08.png"
import comment09 from "@/assets/comment-09.png"
import comment10 from "@/assets/comment-10.png"
import comment11 from "@/assets/comment-11.png"
import comment12 from "@/assets/comment-12.png"
import comment13 from "@/assets/comment-13.png"
import comment14 from "@/assets/comment-14.png"
import comment15 from "@/assets/comment-15.png"
import comment16 from "@/assets/comment-16.png"
import comment17 from "@/assets/comment-17.png"
import comment18 from "@/assets/comment-18.png"

// Doors open 1 October 2026, Australian eastern time
const LAUNCH = new Date("2026-10-01T00:00:00+10:00")

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target.getTime() - now.getTime())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  }
}

// --- Top banner ---

function EarlyAccessBanner() {
  const scrollToForm = (e: MouseEvent) => {
    e.preventDefault()
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <a
      href="#join"
      onClick={scrollToForm}
      className="fixed inset-x-0 top-0 z-50 flex h-11 items-center justify-center bg-[#4E82C1] text-[15px] font-semibold text-white transition-colors hover:bg-[#5a8fce]"
    >
      Get Early Access →
    </a>
  )
}

// --- Flip-clock countdown ---

function FlipCell({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0")
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[68px] overflow-hidden rounded-xl bg-gradient-to-b from-[#13233f] to-[#0b1526] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_30px_rgba(0,0,0,0.45)] md:w-[104px]">
        <div className="py-3.5 text-center font-serif text-5xl leading-none text-white [text-shadow:0_0_22px_rgba(255,255,255,0.28)] md:py-6 md:text-7xl">
          {v}
        </div>
        {/* flip split line */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/50" />
      </div>
      <span className="text-xs tracking-wide text-white/80 md:text-sm">
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <div className="pt-3 font-serif text-4xl text-white/25 md:pt-6 md:text-6xl">:</div>
  )
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH)
  return (
    <div className="mx-auto flex max-w-fit items-start justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:gap-4 md:p-9">
      <FlipCell value={days} label="Days" />
      <Colon />
      <FlipCell value={hours} label="Hours" />
      <Colon />
      <FlipCell value={minutes} label="Minutes" />
      <Colon />
      <FlipCell value={seconds} label="Seconds" />
    </div>
  )
}

// --- Instagram-style comments ---
// Real screenshots, each padded to a uniform aspect ratio so every card is the
// same size in the marquee (see COMMENT_IMAGES).

const COMMENT_IMAGES = [
  comment01, comment02, comment03, comment04, comment05, comment06,
  comment07, comment08, comment09, comment10, comment11, comment12,
  comment13, comment14, comment15, comment16, comment17, comment18,
]

function CommentCard({ src }: { src: string }) {
  return (
    <div className="w-[340px] shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
      <img src={src} alt="Instagram comment" className="block w-full" />
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-semibold text-[#8fb8e8] md:text-[28px]">{value}</div>
      <div className="mt-1 text-xs tracking-wide text-white/80">{label}</div>
    </div>
  )
}

function WhatPeopleAreSaying() {
  return (
    <section className="pb-24 pt-8">
      <p className="mb-10 text-center text-sm font-medium tracking-wide text-white/80">
        We're giving you what you want:
      </p>

      {/* Continuous, slowly scrolling marquee (pauses on hover) */}
      <div className="group overflow-hidden">
        <div className="flex w-max gap-5 pb-4 animate-marquee group-hover:[animation-play-state:paused]">
          {[...COMMENT_IMAGES, ...COMMENT_IMAGES].map((src, i) => (
            <CommentCard key={i} src={src} />
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-start justify-center gap-10 md:gap-16">
        <Stat value="15K+" label="Followers" />
        <Stat value="1.5M+" label="Views (60 days)" />
        <Stat value="500+" label="Comments" />
      </div>
    </section>
  )
}

// --- Shared bits ---

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-['Roboto_Mono_Variable'] text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80">
      {children}
    </span>
  )
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder:text-white/45 transition-colors focus:border-[#8fb8e8] focus:outline-none focus:ring-2 focus:ring-[#8fb8e8]/30"
const labelClass = "mb-2 block text-sm font-medium text-white"

// --- What is #agentless ---

function WhatIsAgentless() {
  const points = [
    {
      title: "Direct to seller.",
      desc: "Every offer you make goes directly to the seller. No agent deciding if you're serious enough. No one deciding what you get to hear.",
    },
    {
      title: "No fabricated offers.",
      desc: "A jaded real estate agent told us: fabricating competing offers to rush buyers is common. On Reasy, every offer is real and traceable.",
    },
    {
      title: "No $40,000 commission.",
      desc: "Agents charge sellers 2.5% commission. That cost gets baked into the price you pay. On Reasy, sellers keep it. Which means you don't pay it.",
    },
  ]

  return (
    <section className="px-6 py-24 md:px-14">
      <div className="mx-auto max-w-[1100px]">
        <Badge>What is #agentless?</Badge>

        <h2 className="mt-6 font-serif text-4xl leading-[1.1] md:text-[52px]">
          It's where buyers
          <br />
          <span className="text-[#8fb8e8]">talk directly to sellers.</span>
        </h2>

        <p className="mt-6 max-w-[760px] text-[17px] leading-relaxed text-white/80">
          Reasy is a verified real estate vault where every home that's for sale
          comes straight from the owner. No agent filtering your communication
          and offers. You get direct access to the seller to communicate without
          agents standing in your way. No $40,000+ commission baked into the
          asking price. Every buyer is identity-verified.
        </p>

        {/* Numbered feature grid */}
        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 md:grid-cols-3">
          {points.map((p, i) => (
            <div
              key={i}
              className="border-white/10 p-8 [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r"
            >
              <div className="mb-6 font-serif text-4xl text-white/20">
                0{i + 1}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">{p.title}</h3>
              <p className="text-sm leading-relaxed text-white/80">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Full-width product screenshot */}
        <div className="mt-6 w-full overflow-hidden rounded-2xl border-2 border-white">
          <img
            src={buyerDashMobileImg}
            alt="Reasy buyer dashboard showing a listing summary and direct chat with the seller"
            className="block w-full md:hidden"
          />
          <img
            src={buyerDashImg}
            alt="Reasy buyer dashboard showing a listing summary and direct chat with the seller"
            className="hidden w-full md:block"
          />
        </div>
      </div>
    </section>
  )
}

// --- The old way vs #agentless ---

function OldWayVsAgentless() {
  const oldWay = [
    "Agent filters your offers",
    "You don't know if your offer was submitted",
    "Fabricated competing offers are common",
    "You pay the agent's fee indirectly",
    "Open homes with 40 strangers",
  ]
  const agentless = [
    "Every offer goes directly to the seller",
    "Full transparency. You see everything.",
    "Identity-verified buyers only",
    "Sellers keep the commission (lower prices)",
    "Direct conversations with the owner",
  ]

  return (
    <section className="px-6 pb-24 md:px-14">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Old way */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <p className="font-['Roboto_Mono_Variable'] text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80">
            The old way
          </p>
          <div className="mt-4 divide-y divide-white/[0.07]">
            {oldWay.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-4">
                <IconX className="size-4 shrink-0 text-red-400" stroke={2.5} />
                <span className="text-[15px] text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* #agentless */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <p className="font-['Roboto_Mono_Variable'] text-[12px] font-semibold uppercase tracking-[0.1em] text-[#8fb8e8]">
            #Agentless
          </p>
          <div className="mt-4 divide-y divide-white/[0.07]">
            {agentless.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-4">
                <IconCheck className="size-4 shrink-0 text-emerald-400" stroke={2.5} />
                <span className="text-[15px] text-white/85">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Join #agentless waitlist ---

function JoinAgentless() {
  return (
    <section id="join" className="px-6 pb-28 md:px-14">
      <div className="mx-auto max-w-[640px]">
        <div className="text-center">
          <Badge>Join #agentless</Badge>

          <h2 className="mt-6 font-serif text-4xl leading-[1.15] md:text-[44px]">
            Be <span className="text-[#8fb8e8]">first in line</span>
            <br />
            when the doors open.
          </h2>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-10 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="buyer-first" className={labelClass}>First name</label>
              <input id="buyer-first" type="text" autoComplete="given-name" placeholder="Jane" className={inputClass} />
            </div>
            <div>
              <label htmlFor="buyer-last" className={labelClass}>Last name</label>
              <input id="buyer-last" type="text" autoComplete="family-name" placeholder="Smith" className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="buyer-email" className={labelClass}>Email</label>
            <input id="buyer-email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} />
          </div>

          <div>
            <label htmlFor="buyer-mobile" className={labelClass}>Mobile number</label>
            <input id="buyer-mobile" type="tel" autoComplete="tel" inputMode="tel" placeholder="0412 345 678" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Top cities you'd like to buy in</label>
            <p className="-mt-1 mb-3 text-[13px] text-white/80">
              Tell us where you're searching so we can let you know when matching
              listings go live.
            </p>
            <div className="space-y-2.5">
              {[1, 2, 3].map((n) => (
                <input
                  key={n}
                  id={`buyer-city-${n}`}
                  type="text"
                  autoComplete="off"
                  placeholder={`City ${n}${n === 1 ? " (e.g. Brisbane)" : ""}`}
                  className={inputClass}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#a9cef0] py-4 text-[15px] font-semibold text-[#0a1628] transition-colors hover:bg-[#bcd9f4]"
          >
            Get Early Access <IconArrowRight className="size-4" />
          </button>

          <p className="text-center text-xs text-white/80">
            Free to join. We respect your privacy.
          </p>
        </form>

        <p className="mt-12 text-center text-sm text-white/35">
          Interested in selling with Reasy?{" "}
          <a
            href="/home#waitlist"
            className="font-medium text-white/60 underline underline-offset-2 transition-colors hover:text-white/80"
          >
            Get in touch
          </a>
        </p>
      </div>
    </section>
  )
}

// --- The person behind this ---

function PersonBehindThis() {
  return (
    <section className="px-6 pb-24 md:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — photo + Instagram card */}
          <div>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10">
              <img
                src={founderPhoto}
                alt="Warren, founder of Reasy"
                className="size-full object-cover"
              />
            </div>

            <div className="relative -mt-16 rounded-2xl bg-white p-4 text-[#0a1628] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="flex gap-4">
                <img
                  src={founderAvatar}
                  alt="agents_want_me_cancelled"
                  className="size-14 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] font-semibold">agents_want_me_cancelled</p>
                  <div className="mt-2 flex gap-6">
                    {[
                      ["42", "posts"],
                      ["12.1K", "followers"],
                      ["461", "following"],
                    ].map(([value, label]) => (
                      <div key={label}>
                        <p className="text-sm font-semibold leading-none">{value}</p>
                        <p className="mt-1 text-xs text-[#0a1628]/50">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-0.5 text-[13px] leading-relaxed">
                <p>agentswantmecancelled@gmail.com</p>
                <p>Exposing 🇦🇺 real estate dirty secrets 🤫</p>
                <p>Follow before I'm cancelled 👇</p>
              </div>
            </div>
          </div>

          {/* Right — story */}
          <div>
            <div className="flex items-center gap-2 text-white/70">
              <IconBrandInstagram className="size-5" stroke={1.75} />
              <span className="text-[15px] font-medium">@agentswantmecancelled</span>
            </div>
            <h2 className="mt-5 font-serif text-4xl leading-[1.1] text-white md:text-5xl">
              Hey. I'm Warren.
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-white/70">
              <p>
                <span className="font-semibold text-white">Here's what happened:</span>{" "}
                I'm an entrepreneur. I build things. Buying my first home in
                Australia was an absolute nightmare. When I couldn't find a
                platform that let buyers and sellers talk directly without an
                agent sitting in the middle, filtering offers, fabricating
                competing bids and charging $40,000 for the privilege… I decided
                to build it myself. I tried to sell my home without an agent to
                fund the launch of Reasy.
              </p>
              <p>
                <span className="font-semibold text-white">I started posting about it.</span>{" "}
                Agents lost their minds. My follower count went from nothing to
                15K+ in weeks. +1.5 million views. Hundreds of comments from
                people saying the exact same thing:{" "}
                <span className="italic text-[#7ba4dd]">
                  "why doesn't a platform exist already?"
                </span>
              </p>
              <p>
                That's why I'm building Reasy. Not as a side project. As the thing
                I'm betting everything on. The industry doesn't want this to exist
                and that's exactly why it has to.
              </p>
              <p className="text-white/50">Doors open 1 October. Get in early.</p>
            </div>

            {/* As featured in */}
            <div className="mt-10 flex flex-col items-start gap-4">
              <p className="text-sm font-medium text-white/50">As featured in</p>
              <div className="flex items-center gap-8">
                <img
                  src={dailyMailLogo}
                  alt="Daily Mail"
                  className="h-6 w-auto object-contain opacity-70 brightness-0 invert"
                />
                <img
                  src={yahooFinanceLogo}
                  alt="Yahoo Finance"
                  className="h-6 w-auto object-contain opacity-70 brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Page ---

export function BuyersPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <EarlyAccessBanner />
      {/* Spacer for the fixed banner */}
      <div className="h-11" />

      <header className="flex items-center justify-between px-6 py-6 md:px-14">
        <a href="/home-alt" className="inline-flex items-center" aria-label="Reasy home">
          <img src={logoWhiteImg} alt="Reasy" className="h-6" />
        </a>
        <span className="text-[15px] font-medium text-white/50">#agentless</span>
      </header>

      <main>
        {/* Hero */}
        <section className="px-6 pb-16 pt-10 text-center md:pt-16">
          <h1 className="mx-auto max-w-[900px] font-serif text-5xl leading-[1.1] md:text-7xl lg:text-[80px]">
            You can keep
            <br />
            dealing with agents,
            <br className="hidden md:block" />{" "}
            <span className="relative isolate inline-block text-[#8fb8e8]">
              or you can stop.
              <svg
                className="absolute bottom-1 left-0 w-full -z-10 opacity-60"
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

          <p className="mt-12 mb-8 text-sm font-medium tracking-wide text-white/80">
            #Agentless opens in:
          </p>

          <Countdown />

          <div className="mt-12">
            <a
              href="/home#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-[#a9cef0] px-8 py-4 text-[15px] font-semibold text-[#0a1628] transition-colors hover:bg-[#bcd9f4]"
            >
              Get Early Access <IconArrowRight className="size-4" />
            </a>
          </div>

          <p className="mt-5 text-xs text-white/80">
            Doors open 1 October. Limited spots available.
          </p>
        </section>

        <Reveal><WhatPeopleAreSaying /></Reveal>
        <Reveal><PersonBehindThis /></Reveal>
        <Reveal><WhatIsAgentless /></Reveal>
        <Reveal><OldWayVsAgentless /></Reveal>
        <Reveal><JoinAgentless /></Reveal>
      </main>
    </div>
  )
}
