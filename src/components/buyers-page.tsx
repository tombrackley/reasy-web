import { useState, useEffect, useRef, type ReactNode, type MouseEvent } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { IconArrowRight, IconCheck, IconX, IconBrandInstagram, IconCircleCheckFilled, IconFileTypePdf, IconStarFilled } from "@tabler/icons-react"
import logoWhiteImg from "@/assets/reasy-logo-white.svg"
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

// Continuous marquee driven by requestAnimationFrame so the speed can ease
// smoothly (no position jump). Hovering slows it right down; it doesn't stop.
const MARQUEE_NORMAL = 60 // px/sec
const MARQUEE_SLOW = 9 // px/sec on hover

function CommentMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const speedRef = useRef(MARQUEE_NORMAL)
  const targetRef = useRef(MARQUEE_NORMAL)
  const halfRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Cache the wrap point (half the track, since the content is duplicated
    // exactly once). Re-measure when images load and change the width.
    const measure = () => {
      halfRef.current = track.scrollWidth / 2
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)

    let raf = 0
    let last = 0
    const step = (t: number) => {
      if (!last) last = t
      const dt = Math.min((t - last) / 1000, 0.05) // clamp when tab regains focus
      last = t
      // ease current speed toward the target over ~0.25s
      speedRef.current += (targetRef.current - speedRef.current) * Math.min(dt * 4, 1)
      offsetRef.current -= speedRef.current * dt
      const half = halfRef.current
      if (half > 0 && offsetRef.current <= -half) offsetRef.current += half
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  const slow = () => {
    targetRef.current = MARQUEE_SLOW
  }
  const resume = () => {
    targetRef.current = MARQUEE_NORMAL
  }

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={slow}
      onMouseLeave={resume}
      onTouchStart={slow}
      onTouchEnd={resume}
      onTouchCancel={resume}
    >
      <div ref={trackRef} className="flex w-max gap-5 pb-4 will-change-transform">
        {[...COMMENT_IMAGES, ...COMMENT_IMAGES].map((src, i) => (
          <CommentCard key={i} src={src} />
        ))}
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
        We're giving you what you want:
      </p>

      {/* Continuous marquee — slows down (never stops) on hover / touch */}
      <CommentMarquee />

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

// --- Offer chat graphic ---

function OfferChatFeed() {
  const ref = useRef<HTMLDivElement>(null)
  // step advances 0 → 4, fading each bubble/offer card in sequence (no typing dots)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(4)
      return
    }
    let timers: number[] = []
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            ;[500, 1400, 2300].forEach((delay, i) => {
              timers.push(window.setTimeout(() => setStep(i + 1), delay))
            })
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  // All messages hold their place; each fades in when its step is reached.
  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col justify-center gap-3 p-5 md:p-7"
    >
      <div
        className={cn(
          "ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#2b7fff] px-4 py-3 text-[15px] leading-snug text-white shadow-sm",
          step >= 1 ? "animate-msg-in" : "opacity-0"
        )}
      >
        Thank you for showing us through your house. We're preparing our offer now.
      </div>

      <div
        className={cn(
          "mr-auto w-fit max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-[15px] leading-snug text-[#0a1628] shadow-sm",
          step >= 2 ? "animate-msg-in" : "opacity-0"
        )}
      >
        So lovely to meet you both. Looking forward to it 😊
      </div>

      <div
        className={cn(
          "ml-auto w-full max-w-[260px] overflow-hidden rounded-2xl rounded-br-md bg-white shadow-[0_12px_34px_rgba(10,22,40,0.2)]",
          step >= 3 ? "animate-msg-in" : "opacity-0"
        )}
      >
        <div className="flex items-center gap-1.5 bg-[#d1f5e6] px-4 py-2.5">
          <IconCircleCheckFilled className="size-4 text-[#0d9488]" />
          <span className="text-xs font-semibold tracking-wide text-[#0f766e]">
            Offer submitted
          </span>
        </div>
        <div className="px-4 py-4">
          <p className="font-serif text-[26px] leading-none text-[#0a1628]">$1,080,000</p>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-[#0a1628] transition-colors hover:bg-slate-50"
          >
            <IconFileTypePdf className="size-4 text-red-500" stroke={1.75} />
            View offer PDF
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Offer rows graphic (Transparent card) ---

const ROW_OFFERS = [
  { score: 97, amount: "$1,300,000", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { score: 80, amount: "$1,230,000", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { score: 77, amount: "$1,250,000", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { score: 71, amount: "$1,190,000", avatar: "https://randomuser.me/api/portraits/men/54.jpg" },
  { score: 69, amount: "$1,215,000", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
]

function OfferRowsGraphic() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  // checks appear after the rows have finished animating in
  const [showChecks, setShowChecks] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      setShowChecks(true)
      return
    }
    let checkTimer: number | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
            checkTimer = window.setTimeout(() => setShowChecks(true), 1300)
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (checkTimer) clearTimeout(checkTimer)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col justify-center gap-3 p-5 md:p-7"
    >
      {/* Individual offer rows — cascade in, then a green check appears beside each */}
      {ROW_OFFERS.map((o, i) => (
        <div
          key={i}
          className="mx-auto flex w-full max-w-[480px] items-center gap-3"
        >
          <div
            className={cn(
              "flex flex-1 items-center gap-4 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_10px_30px_rgba(10,22,40,0.12)]",
              inView ? "animate-msg-in" : "opacity-0"
            )}
            style={inView ? { animationDelay: `${i * 130}ms` } : undefined}
          >
            {/* Buyer — skeleton */}
            <div className="flex flex-1 items-center gap-3">
              <img
                src={o.avatar}
                alt=""
                className="size-8 shrink-0 rounded-full bg-slate-200/80 object-cover"
              />
              <div className="h-2.5 w-24 rounded-full bg-slate-200/80" />
            </div>
            {/* Match */}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold",
                o.score >= 80
                  ? "bg-teal-100 text-teal-600"
                  : "bg-slate-100 text-slate-500"
              )}
            >
              <IconStarFilled className="size-2.5" />
              {o.score}
            </span>
            {/* Amount */}
            <div className="w-[88px] text-right text-[15px] font-semibold text-emerald-600">
              {o.amount}
            </div>
          </div>

          {/* Green check outside the row */}
          <IconCircleCheckFilled
            className={cn(
              "size-7 shrink-0 text-[#0d9488]",
              showChecks ? "animate-msg-in" : "opacity-0"
            )}
            style={showChecks ? { animationDelay: `${i * 100}ms` } : undefined}
          />
        </div>
      ))}
    </div>
  )
}

// --- Commission comparison bars (Reasonable card) ---

// Bars = a fixed base (4) plus commission at 1 segment per 0.5%. Not to literal
// price scale (commission is a small % of price), but the relative steps are honest.
const COMMISSION_BARS = [
  { label: "2%", segments: 8, reasy: false, caption: "Agent A" },
  { label: "0% commission", segments: 4, reasy: true, caption: "With Reasy" },
  { label: "2.5%", segments: 9, reasy: false, caption: "Agent B" },
  { label: "3%", segments: 10, reasy: false, caption: "Agent C" },
]

function CommissionBars() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center bg-[#0a1628] px-3 py-8 md:px-6"
    >
      <div className="relative flex w-full max-w-[450px] items-end justify-center gap-2 pl-9 md:gap-5 md:pl-12">
        {/* "Asking price" axis on the left — arrow points up (price rises with commission) */}
        <div className="pointer-events-none absolute inset-y-1 left-0 flex w-9 gap-1.5 md:w-10">
          <span className="self-center whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 [writing-mode:vertical-rl] [transform:rotate(180deg)]">
            Asking price
          </span>
          <div className="relative w-2.5">
            {/* vertical line */}
            <div className="absolute bottom-0 left-1/2 top-2 w-px -translate-x-1/2 bg-white/30" />
            {/* upward arrowhead */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 border-x-4 border-b-[7px] border-x-transparent border-b-white/40" />
          </div>
        </div>

        {COMMISSION_BARS.map((col, ci) => (
          <div
            key={ci}
            className="relative flex max-w-[120px] flex-1 flex-col items-center justify-end gap-3"
          >
            {/* Label above the column */}
            <span
              className={cn(
                "text-center text-[13px] font-medium leading-tight md:text-sm",
                col.reasy ? "text-[#5eead4]" : "text-white/50"
              )}
            >
              {col.label}
            </span>

            {/* Stacked segments, growing from the bottom */}
            <div className="flex w-full flex-col-reverse gap-1.5">
              {Array.from({ length: col.segments }).map((_, si) => (
                <div
                  key={si}
                  className={cn(
                    "h-3 w-full rounded-[3px]",
                    col.reasy ? "bg-[#5eead4]" : "bg-white/[0.08]",
                    inView ? "animate-msg-in" : "opacity-0"
                  )}
                  style={
                    inView
                      ? { animationDelay: `${ci * 90 + si * 55}ms` }
                      : undefined
                  }
                />
              ))}
            </div>

            {/* Caption under each column */}
            <span
              className={cn(
                "absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-center leading-tight",
                col.reasy
                  ? "font-serif text-lg text-[#5eead4]"
                  : "text-[11px] font-medium text-white/50",
                inView ? "animate-msg-in" : "opacity-0"
              )}
              style={inView ? { animationDelay: `${600 + ci * 80}ms` } : undefined}
            >
              {col.caption}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}


// --- What is #agentless ---

const stackCards = [
  {
    eyebrow: "Direct",
    headingA: "Every offer goes",
    headingB: "straight to the seller",
    body: "No agent deciding if you're serious enough. No one deciding what you get to hear. You talk to the owner, directly.",
    accent: "#2f6bc4",
    chat: true,
    rows: false,
    calc: false,
  },
  {
    eyebrow: "Transparent",
    headingA: "Every offer is",
    headingB: "real and traceable",
    body: "A jaded real estate agent told us that fabricating competing offers to rush buyers is common. On Reasy, that simply can't happen.",
    accent: "#CA71DA",
    chat: false,
    rows: true,
    calc: false,
  },
  {
    eyebrow: "Reasonable",
    headingA: "No $40,000",
    headingB: "commission baked in",
    body: "Agents charge sellers 2.5% commission, and that cost gets baked into the price you pay. On Reasy, sellers keep it, so you don't pay it.",
    accent: "#0d9488",
    chat: false,
    rows: false,
    calc: true,
  },
]

// --- What is #agentless (floating, alternating variant) ---

// Lightened accents so the highlighted heading words read on the dark section.
const FLOAT_ACCENT = ["#8fb8e8", "#CA71DA", "#4fd1c5"]

function AgentlessFloat() {
  return (
    <section className="px-6 py-24 md:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <Badge>What is #agentless?</Badge>

          <h2 className="mt-6 font-serif text-4xl leading-[1.1] md:text-[52px]">
            It's where buyers
            <br />
            <span className="text-[#8fb8e8]">talk directly to sellers.</span>
          </h2>
        </div>

        <div className="mt-20 flex flex-col gap-24 md:mt-28 md:gap-32">
          {stackCards.map((c, i) => {
            const graphicLeft = i % 2 === 0
            return (
              <div
                key={i}
                className="grid items-center gap-12 md:grid-cols-2 md:gap-20"
              >
                {/* Graphic — floats freely, no container (below the text on mobile) */}
                <div
                  className={cn(
                    "relative order-2 h-[440px] md:h-[520px]",
                    graphicLeft ? "md:order-1" : "md:order-2"
                  )}
                >
                  {c.chat ? (
                    <OfferChatFeed />
                  ) : c.rows ? (
                    <OfferRowsGraphic />
                  ) : c.calc ? (
                    <CommissionBars />
                  ) : null}
                </div>

                {/* Text */}
                <div className={cn("order-1", graphicLeft ? "md:order-2" : "md:order-1")}>
                  <div className="inline-flex items-center">
                    <span
                      className="rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
                      style={{ backgroundColor: c.accent }}
                    >
                      {c.eyebrow}
                    </span>
                    <span
                      className="-ml-2 size-7 rounded-full"
                      style={{ backgroundColor: c.accent, opacity: 0.5 }}
                    />
                    <span
                      className="-ml-3.5 size-7 rounded-full"
                      style={{ backgroundColor: c.accent, opacity: 0.25 }}
                    />
                  </div>

                  <h3 className="mt-6 font-serif text-4xl leading-[1.05] text-white md:text-5xl">
                    {c.headingA}{" "}
                    <span style={{ color: FLOAT_ACCENT[i] }}>{c.headingB}</span>
                  </h3>

                  <p className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-white/70">
                    {c.body}
                  </p>

                  <button
                    type="button"
                    className="mt-8 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: c.accent }}
                  >
                    Get early access
                    <IconArrowRight className="size-4" stroke={2.25} />
                  </button>
                </div>
              </div>
            )
          })}
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
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 lg:grid-cols-2">
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

// --- Seller enquiry overlay (from the home page) ---

const dialogInput =
  "w-full rounded-xl border border-[#e6e6eb] bg-white px-4 py-3 text-[15px] text-[#020a0f] placeholder:text-[#9ca3af] transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
const dialogLabel = "mb-2 block text-sm font-medium text-[#020a0f]"

function SellerEnquiryDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
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

  // Portal to body so the fixed overlay isn't scoped by any transformed ancestor.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-3xl border border-[#e6e6eb] bg-white p-6 text-left shadow-[0_24px_64px_-12px_rgba(0,0,0,0.25)] md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-[#f6f6f8] text-[#47474f] transition-colors hover:bg-[#ececef]"
        >
          <IconX className="size-4" />
        </button>

        <h2 className="mb-3 font-serif text-3xl leading-[1.2] text-[#020a0f] md:text-[36px]">
          Sell with Reasy
        </h2>
        <p className="mb-8 text-[15px] leading-relaxed text-[#1e2124]">
          Register your interest in selling and we'll be in touch about listing
          your property, commission-free.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onClose()
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="seller-first" className={dialogLabel}>
                First name
              </label>
              <input
                id="seller-first"
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                className={dialogInput}
              />
            </div>
            <div>
              <label htmlFor="seller-last" className={dialogLabel}>
                Last name
              </label>
              <input
                id="seller-last"
                type="text"
                autoComplete="family-name"
                placeholder="Smith"
                className={dialogInput}
              />
            </div>
          </div>

          <div>
            <label htmlFor="seller-email" className={dialogLabel}>
              Email
            </label>
            <input
              id="seller-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={dialogInput}
            />
          </div>

          <div>
            <label htmlFor="seller-postcode" className={dialogLabel}>
              Postcode
            </label>
            <input
              id="seller-postcode"
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="e.g. 4573"
              className={dialogInput}
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-primary py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Register interest
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}

function JoinAgentless() {
  const [sellerOpen, setSellerOpen] = useState(false)

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
          <button
            type="button"
            onClick={() => setSellerOpen(true)}
            className="font-medium text-white/60 underline underline-offset-2 transition-colors hover:text-white/80"
          >
            Get in touch
          </button>
        </p>
      </div>

      <SellerEnquiryDialog open={sellerOpen} onClose={() => setSellerOpen(false)} />
    </section>
  )
}

// --- The person behind this ---

function PersonBehindThis() {
  return (
    <section className="px-6 pb-24 md:px-14">
      <div className="mx-auto max-w-[1280px]">
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
            <a
              href="https://www.instagram.com/agents_want_me_cancelled/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 text-white/70 transition-colors hover:text-white"
            >
              <IconBrandInstagram className="size-5" stroke={1.75} />
              <span className="text-[15px] font-medium">@agentswantmecancelled</span>
            </a>
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
    <div className="relative min-h-screen bg-[#0a1628] text-white">
      {/* Footer glow — flipped home-alt gradient, light blue at the very bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[1000px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,22,40,0) 0%, rgba(28,44,85,0.5) 40%, #24407e 66%, #3a5aa8 86%, #4f7ddd 100%)",
        }}
      />
      <div className="relative">
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
        <AgentlessFloat />
        <Reveal><OldWayVsAgentless /></Reveal>
        <Reveal><JoinAgentless /></Reveal>
      </main>
      </div>
    </div>
  )
}
