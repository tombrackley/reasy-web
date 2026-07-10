import { useState, useEffect, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/lib/utils"
import { IconArrowRight, IconHeartFilled, IconCheck, IconX, IconClock } from "@tabler/icons-react"
import logoWhiteImg from "@/assets/reasy-logo-white.svg"

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

type Comment = {
  initial: string
  color: string
  name: string
  text: string
  date: string
  likes: number
}

const COMMENTS: Comment[] = [
  { initial: "H", color: "bg-indigo-500", name: "HPReka", text: "Following for sure. Uber has done good to the taxi monopoly so I think it's time", date: "1d", likes: 1 },
  { initial: "G", color: "bg-sky-500", name: "GoGreens1234", text: "Lead the way bud. Let's see how supportive the Real Estate industry of au actually are????????", date: "3d", likes: 0 },
  { initial: "I", color: "bg-emerald-500", name: "Isabel", text: "I'm so here for this. I'd be interested already 😄", date: "1w", likes: 25 },
  { initial: "I", color: "bg-amber-500", name: "I_am_joann_love", text: "The real estate industry is desperate for disruption!", date: "1w", likes: 11 },
  { initial: "J", color: "bg-red-500", name: "Jordie", text: "Go off King 🙌🤙", date: "2 Jul", likes: 0 },
  { initial: "J", color: "bg-violet-500", name: "Joel Seeman", text: "All we need is an app and agents will be forced to do something actually useful with their lives.", date: "2 Jul", likes: 3 },
  { initial: "M", color: "bg-pink-500", name: "MattD_87", text: "Commission fees are daylight robbery. Bring it on.", date: "28 Jun", likes: 8 },
  { initial: "K", color: "bg-teal-500", name: "Kirra.Lee", text: "Finally someone said it. Counting down the days.", date: "27 Jun", likes: 14 },
]

function CommentCard({ initial, color, name, text, date, likes }: Comment) {
  return (
    <div className="flex w-[280px] shrink-0 snap-start flex-col rounded-xl bg-white p-5 text-[#0a1628]">
      <div className="mb-3 flex items-center gap-2.5">
        <div className={cn("flex size-7 items-center justify-center rounded-full text-xs font-semibold text-white", color)}>
          {initial}
        </div>
        <span className="text-sm font-semibold">{name}</span>
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-[#0a1628]/75">{text}</p>
      <div className="flex items-center justify-between text-xs text-[#0a1628]/45">
        <div className="flex items-center gap-3">
          <span>{date}</span>
          <span className="font-medium">Reply</span>
        </div>
        <span className="flex items-center gap-1">
          <IconHeartFilled className="size-4 text-red-500" />
          {likes}
        </span>
      </div>
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
        What people are saying about the agent system
      </p>

      {/* Continuous, slowly scrolling marquee (pauses on hover) */}
      <div className="group overflow-hidden">
        <div className="flex w-max gap-5 pb-4 animate-marquee group-hover:[animation-play-state:paused]">
          {[...COMMENTS, ...COMMENTS].map((c, i) => (
            <CommentCard key={i} {...c} />
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
      <IconClock className="size-3.5" stroke={2} />
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

        {/* Full-width image placeholder (desktop ratio) */}
        <div className="mt-6 flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white">
          <span className="text-sm font-medium text-[#0a1628]/30">Image placeholder</span>
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
        <Badge>Join #agentless</Badge>

        <h2 className="mt-6 font-serif text-4xl leading-[1.15] md:text-[44px]">
          Be <span className="text-[#8fb8e8]">first in line</span> when the doors
          open.
        </h2>

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
        <a href="/" className="inline-flex items-center" aria-label="Back to home">
          <img src={logoWhiteImg} alt="Reasy" className="h-6" />
        </a>
        <a
          href="/"
          className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          For Sellers
        </a>
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
              href="/#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-[#a9cef0] px-8 py-4 text-[15px] font-semibold text-[#0a1628] transition-colors hover:bg-[#bcd9f4]"
            >
              Get Early Access <IconArrowRight className="size-4" />
            </a>
          </div>

          <p className="mt-5 text-xs text-white/80">
            Doors open 1 October. Limited spots available.
          </p>
        </section>

        <WhatPeopleAreSaying />
        <WhatIsAgentless />
        <OldWayVsAgentless />
        <JoinAgentless />
      </main>
    </div>
  )
}
