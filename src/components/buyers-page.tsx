import { useState, useEffect, useRef, type ReactNode, type MouseEvent, type PointerEvent } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { IconArrowRight, IconCheck, IconX, IconBrandInstagram, IconCircleCheckFilled, IconFileTypePdf, IconBulb, IconPlus, IconScale, IconPointerFilled, IconLock, IconMapPin, IconBed, IconBath, IconCar, IconArrowsDiagonal, IconMessage, IconSend } from "@tabler/icons-react"
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

function CommentCard({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn("w-[340px] shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]", className)}>
      {/* pointer-events-none + no callout so a long-press doesn't trigger the
          iOS "copy/save image" menu while slowing the marquee */}
      <img
        src={src}
        alt="Instagram comment"
        draggable={false}
        className="pointer-events-none block w-full select-none [-webkit-touch-callout:none]"
      />
    </div>
  )
}

// Continuous marquee driven by requestAnimationFrame. It auto-scrolls at a
// steady pace, but the user can grab and drag it left/right (mouse or touch) to
// scrub through; it resumes auto-scrolling on release.
const MARQUEE_SPEED = 50 // px/sec

function CommentMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const halfRef = useRef(0)
  const draggingRef = useRef(false)
  const lastXRef = useRef(0)

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
      // advance automatically unless the user is dragging
      if (!draggingRef.current) {
        offsetRef.current -= MARQUEE_SPEED * dt
        wrapOffset()
      }
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  // keep the offset within one copy's width so the loop stays seamless
  const wrapOffset = () => {
    const half = halfRef.current
    if (half <= 0) return
    while (offsetRef.current <= -half) offsetRef.current += half
    while (offsetRef.current > 0) offsetRef.current -= half
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    lastXRef.current = e.clientX
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    offsetRef.current += e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    wrapOffset()
  }
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  return (
    <div
      className="cursor-grab touch-pan-y select-none overflow-hidden [-webkit-touch-callout:none] active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <div ref={trackRef} className="flex w-max gap-5 pb-4 will-change-transform">
        {[...COMMENT_IMAGES, ...COMMENT_IMAGES].map((src, i) => (
          <CommentCard key={i} src={src} />
        ))}
      </div>
    </div>
  )
}

// Mobile-only carousel: one comment centred with a peek of the neighbours,
// auto-advances on a timer (like Instagram Stories) but a tap on the left half
// steps back and the right half steps forward. Native scroll-snap keeps swiping
// working too. Wrapping at the ends jumps instantly so there's no long rewind.
const AUTO_ADVANCE_MS = 3500

function MobileCommentCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | undefined>(undefined)
  const syncRef = useRef<number | undefined>(undefined)
  const snapTimerRef = useRef<number | undefined>(undefined)
  const [active, setActive] = useState(0)
  const len = COMMENT_IMAGES.length

  const nearestIndex = () => {
    const el = scrollerRef.current
    if (!el) return 0
    const mid = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement
      const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    return best
  }

  const scrollToIndex = (i: number, smooth = true) => {
    const el = scrollerRef.current
    if (!el) return
    const child = el.children[i] as HTMLElement | undefined
    if (!child) return
    setActive(i)
    const left = child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2
    if (smooth) {
      // scroll-snap-type: mandatory cancels programmatic smooth scrolls (it
      // re-snaps to the current point mid-animation), so lift snapping for the
      // duration and restore it after. We land on a snap point, so there's no
      // visible jump when it comes back.
      el.style.scrollSnapType = "none"
      window.clearTimeout(snapTimerRef.current)
      snapTimerRef.current = window.setTimeout(() => {
        el.style.scrollSnapType = ""
      }, 500)
    }
    el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" })
  }

  // Keep the highlighted (opaque) card in sync while the user swipes.
  const onScroll = () => {
    if (syncRef.current) return
    syncRef.current = requestAnimationFrame(() => {
      syncRef.current = undefined
      setActive(nearestIndex())
    })
  }

  const step = (dir: 1 | -1) => {
    const next = nearestIndex() + dir
    if (next >= len) scrollToIndex(0, false)
    else if (next < 0) scrollToIndex(len - 1, false)
    else scrollToIndex(next, true)
  }

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const startTimer = () => {
    window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => step(1), AUTO_ADVANCE_MS)
  }

  useEffect(() => {
    if (reduced) return
    startTimer()
    return () => {
      window.clearInterval(timerRef.current)
      window.clearTimeout(snapTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTap = (e: MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    step(e.clientX >= rect.left + rect.width / 2 ? 1 : -1)
    if (!reduced) startTimer() // reset the clock after a manual skip
  }

  return (
    <div
      ref={scrollerRef}
      onClick={onTap}
      onScroll={onScroll}
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-14 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {COMMENT_IMAGES.map((src, i) => (
        <div
          key={i}
          className={cn(
            "w-full shrink-0 snap-center transition-opacity duration-300",
            active === i ? "opacity-100" : "opacity-30"
          )}
        >
          <CommentCard src={src} className="w-full" />
        </div>
      ))}
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-2xl text-white md:text-[28px]">{value}</div>
      <div className="mt-1 text-xs tracking-wide text-white/80">{label}</div>
    </div>
  )
}

function WhatPeopleAreSaying() {
  return (
    <section className="pb-24 pt-8">
      <p className="mb-10 text-center text-sm font-medium tracking-wide text-white/80">
        The people have spoken (and this is what they want)
      </p>

      {/* Desktop: continuous drag-scrub marquee. Mobile: tap left/right to
          step (auto-advances like Instagram Stories), swipe also works. */}
      <div className="hidden md:block">
        <CommentMarquee />
      </div>
      <MobileCommentCarousel />

      <div className="mt-12 flex items-start justify-center gap-10 md:gap-16">
        <Stat value="18K+" label="Followers" />
        <Stat value="1.5M+" label="Views" />
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
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder:text-white/45 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
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
      setStep(3)
      return
    }
    let timers: number[] = []
    let running = false
    const cycle = () => {
      timers.forEach(clearTimeout)
      timers = []
      setStep(0)
      ;[500, 1400, 2300].forEach((delay, i) => {
        timers.push(window.setTimeout(() => setStep(i + 1), delay))
      })
      // last bubble lands (~2650ms), hold the finished state 3s, then loop
      timers.push(window.setTimeout(() => running && cycle(), 2650 + 3000))
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !running) {
            running = true
            observer.unobserve(entry.target)
            cycle()
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      running = false
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

// --- Guided buying checklist graphic (Guided card) ---

const GUIDE_STEPS: { label: string; state: "done" | "current" | "upcoming" }[] = [
  { label: "Finance pre-approval", state: "done" },
  { label: "Building & pest inspection", state: "done" },
  { label: "Negotiating your offer", state: "current" },
  { label: "Contract review", state: "upcoming" },
  { label: "Settlement", state: "upcoming" },
]

function GuidanceGraphic() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  // the negotiation hint appears once the checklist has settled in
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      setShowHint(true)
      return
    }
    let timers: number[] = []
    let running = false
    const cycle = () => {
      timers.forEach(clearTimeout)
      timers = []
      // reset so the entrance animations can replay
      setInView(false)
      setShowHint(false)
      timers.push(window.setTimeout(() => setInView(true), 60))
      timers.push(window.setTimeout(() => setShowHint(true), 60 + 1400))
      // hint settles (~1810ms), hold the finished state 3s, then loop
      timers.push(window.setTimeout(() => running && cycle(), 60 + 1810 + 3000))
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !running) {
            running = true
            observer.unobserve(entry.target)
            cycle()
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      running = false
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center p-5 md:p-7">
      {/* Checklist card */}
      <div
        className={cn(
          "w-full max-w-[360px] rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(10,22,40,0.28)]",
          inView ? "animate-msg-in" : "opacity-0"
        )}
      >
        <p className="font-['Inter_Variable'] text-[18px] font-medium text-[#0a1628]">
          Your buying checklist
        </p>

        <div className="mt-5">
          {GUIDE_STEPS.map((s, i) => (
            <div
              key={i}
              className={cn(
                "relative flex items-center gap-3 pb-6 last:pb-0",
                inView ? "animate-msg-in" : "opacity-0"
              )}
              style={inView ? { animationDelay: `${300 + i * 130}ms` } : undefined}
            >
              {/* connector line to the next step */}
              {i < GUIDE_STEPS.length - 1 && (
                <span className="absolute left-[13.5px] top-7 h-6 border-l border-dashed border-slate-200" />
              )}
              {/* status circle */}
              {s.state === "done" ? (
                <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#c9f2dd]">
                  <IconCheck className="size-4 text-[#0d7a52]" stroke={3} />
                </span>
              ) : s.state === "current" ? (
                <span className="z-10 size-7 shrink-0 rounded-full border-2 border-[#2b7fff] bg-white" />
              ) : (
                <span className="z-10 size-7 shrink-0 rounded-full border-2 border-slate-200 bg-white" />
              )}
              <span
                className={cn(
                  "text-[14px]",
                  s.state === "current"
                    ? "font-semibold text-[#2b7fff]"
                    : "text-slate-400"
                )}
              >
                {s.label}
              </span>
              {/* Reasy tracks the deadline on the active step */}
              {s.state === "current" && (
                <span className="ml-auto rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  Due today
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating "intelligence" prompt — flags the next action for you */}
      <div
        className={cn(
          "absolute bottom-6 right-2 w-[290px] rounded-2xl border border-white/10 bg-[#22314f] p-5 text-white shadow-[0_18px_44px_rgba(10,22,40,0.5)] md:right-0",
          showHint ? "animate-msg-in" : "opacity-0"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-white/70">
            <IconBulb className="size-4" stroke={2.25} />
            Reasy
          </span>
          <span className="rounded-full bg-[#B47CFF] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            Action needed
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-snug text-white/85">
          The seller replied to your offer. Counter close to your best number to keep things moving.
        </p>
      </div>
    </div>
  )
}

// --- Conveyancer workspace graphic (Connected card) ---

const WORKSPACE_DOCS = ["Building and pest report", "Finance pre-approval", "Offer"]

function WorkspaceGraphic() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  // pressed = the cursor is pushing the button; clicked = button swapped for card
  const [pressed, setPressed] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      setClicked(true)
      return
    }
    const timers: number[] = []
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
            // synced with the fake cursor's press moment
            timers.push(window.setTimeout(() => setPressed(true), 2500))
            timers.push(
              window.setTimeout(() => {
                setClicked(true)
                setPressed(false)
              }, 2700)
            )
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

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center p-5 md:p-7">
      <div className="relative w-full max-w-[360px]">
        {/* Main workspace card */}
        <div
          className={cn(
            "rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(10,22,40,0.28)]",
            inView ? "animate-msg-in" : "opacity-0"
          )}
        >
          <p className="font-['Inter_Variable'] text-[18px] font-medium text-[#0a1628]">
            Your Reasy workspace
          </p>

          {/* Shared documents the conveyancer can access */}
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Shared documents
          </p>
          <div className="mt-3 space-y-2">
            {WORKSPACE_DOCS.map((doc, i) => {
              const rowDelay = 260 + i * 180
              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5",
                    inView ? "animate-msg-in" : "opacity-0"
                  )}
                  style={inView ? { animationDelay: `${rowDelay}ms` } : undefined}
                >
                  <IconFileTypePdf className="size-5 shrink-0 text-red-500" stroke={1.75} />
                  <span className="text-[13px] font-medium text-[#0a1628]">{doc}.pdf</span>
                  {/* the tick pops in just after its row lands */}
                  <IconCircleCheckFilled
                    className={cn(
                      "ml-auto size-4 shrink-0 text-[#0d9488]",
                      inView ? "animate-pop-in" : "opacity-0"
                    )}
                    style={inView ? { animationDelay: `${rowDelay + 260}ms` } : undefined}
                  />
                </div>
              )
            })}
          </div>

          {/* Add-conveyancer button — a cursor glides in, clicks it, and it
              swaps in place for the pending-invite card */}
          <div
            className={cn("relative mt-4 min-h-[136px]", inView ? "animate-msg-in" : "opacity-0")}
            style={
              inView
                ? { animationDelay: `${260 + WORKSPACE_DOCS.length * 180 + 240}ms` }
                : undefined
            }
          >
            {/* the button */}
            <button
              type="button"
              className={cn(
                "flex h-full w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300/50 bg-slate-50 text-[13px] font-semibold text-slate-500 transition-all duration-200",
                pressed && "scale-[0.97] border-slate-400/50 bg-slate-100",
                clicked && "scale-95 opacity-0"
              )}
            >
              <IconPlus className="size-4" stroke={2.25} />
              Add conveyancer
            </button>

            {/* the pending-invite card that replaces the button in place */}
            <div
              className={cn(
                "absolute inset-0 flex items-center gap-3 rounded-xl border-2 border-dashed border-[#0d9488]/45 bg-white px-3",
                clicked ? "animate-soft-pop" : "pointer-events-none opacity-0"
              )}
            >
              {/* avatar with a law-firm badge on its corner, like an online dot */}
              <div className="relative size-9 shrink-0">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Sarah Nguyen"
                  className="size-9 rounded-full object-cover"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[#1e293b] text-white ring-2 ring-white">
                  <IconScale className="size-2.5" stroke={2.25} />
                </span>
              </div>
              <div className="min-w-0 leading-tight">
                <p className="text-[13px] font-semibold text-[#0a1628]">Sarah Nguyen</p>
                <p className="text-[11px] text-slate-500">Acme Legal</p>
              </div>
              <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                Invited
              </span>
            </div>

            {/* fake mouse cursor that glides in and presses the button */}
            {!clicked && (
              <span
                className={cn(
                  "pointer-events-none absolute left-[54%] top-1/2 text-[#0a1628] drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]",
                  inView ? "animate-cursor-click" : "opacity-0"
                )}
                style={inView ? { animationDelay: "1300ms" } : undefined}
              >
                <IconPointerFilled className="size-5" />
              </span>
            )}
          </div>
        </div>
      </div>
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

// --- Gatekept listings graphic (Access card) ---

const ACCESS_LISTINGS = [
  {
    tag: "Off-market",
    price: "$1.24M",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=180&h=180&fit=crop&q=60",
  },
  {
    tag: "Private sale",
    price: "$980K",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=180&h=180&fit=crop&q=60",
  },
  {
    tag: "Pre-market",
    price: "$1.6M",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=180&h=180&fit=crop&q=60",
  },
]

function AccessGraphic() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  // the gatekept listings "unlock" once the card has settled in
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      setUnlocked(true)
      return
    }
    let unlockTimer: number | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
            unlockTimer = window.setTimeout(() => setUnlocked(true), 1500)
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (unlockTimer) clearTimeout(unlockTimer)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col justify-center gap-3 p-5 md:p-7"
    >
      {/* Individual listing rows float freely on the section (no container),
          gatekept (blurred/locked) then unlocking to "on Reasy first" */}
      {ACCESS_LISTINGS.map((l, i) => (
        <div
          key={i}
          className={cn(
            "mx-auto flex w-full max-w-[420px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_10px_30px_rgba(10,22,40,0.12)]",
            inView ? "animate-msg-in" : "opacity-0"
          )}
          style={inView ? { animationDelay: `${i * 130}ms` } : undefined}
        >
          {/* property photo */}
          <img
            src={l.img}
            alt="Property for sale"
            className="size-12 shrink-0 rounded-xl bg-slate-100 object-cover"
          />
          {/* address — blurred (redacted) while gatekept */}
          <div
            className={cn(
              "flex-1 space-y-1.5 transition-all duration-500",
              unlocked ? "blur-0" : "blur-[3px]"
            )}
          >
            <div className="h-2.5 w-28 rounded-full bg-slate-200" />
            <div className="h-2 w-20 rounded-full bg-slate-200/70" />
          </div>
          {/* price + lock state */}
          <div className="flex flex-col items-end gap-1">
            <span
              className={cn(
                "text-[14px] font-semibold transition-colors duration-500",
                unlocked
                  ? "text-[#0a1628]"
                  : "text-transparent [text-shadow:0_0_7px_rgba(10,22,40,0.55)]"
              )}
            >
              {l.price}
            </span>
            <span
              className={cn(
                "flex items-center gap-1 whitespace-nowrap text-[10px] font-medium text-slate-400 transition-opacity duration-500",
                unlocked ? "opacity-0" : "opacity-100"
              )}
            >
              <IconLock className="size-3" stroke={2.25} />
              {l.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// --- Message the seller directly graphic (Access card) ---
// A real listing card with a "Message Seller" button. On scroll-in: a cursor
// taps the button, a composer slides up, a message types itself out and sends —
// the button then flips to a green "Enquired" state ("you're in the inbox").
const SELLER_MESSAGE =
  "Hi! Is 42 Wallaby Way still available? I'd love to book an inspection."

function MessageSellerGraphic() {
  const ref = useRef<HTMLDivElement>(null)
  // 0 idle · 1 button pressed · 2 composer open · 3 typing · 4 sent
  const [phase, setPhase] = useState(0)
  const [typed, setTyped] = useState("")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(4)
      setTyped(SELLER_MESSAGE)
      return
    }
    let timers: number[] = []
    let typeInt: number | undefined
    let running = false
    const cycle = () => {
      timers.forEach(clearTimeout)
      timers = []
      if (typeInt) window.clearInterval(typeInt)
      setPhase(0)
      setTyped("")
      timers.push(window.setTimeout(() => setPhase(1), 900)) // cursor taps button
      timers.push(window.setTimeout(() => setPhase(2), 1900)) // composer appears
      timers.push(
        window.setTimeout(() => {
          setPhase(3)
          let i = 0
          typeInt = window.setInterval(() => {
            i += 1
            setTyped(SELLER_MESSAGE.slice(0, i))
            if (i >= SELLER_MESSAGE.length) {
              window.clearInterval(typeInt)
              timers.push(window.setTimeout(() => setPhase(4), 650)) // send
              // bubble lands (~1000ms), hold the finished state 3s, then loop
              timers.push(window.setTimeout(() => running && cycle(), 1000 + 3000))
            }
          }, 42)
        }, 2300)
      )
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !running) {
            running = true
            observer.unobserve(entry.target)
            cycle()
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      running = false
      observer.disconnect()
      timers.forEach(clearTimeout)
      if (typeInt) clearInterval(typeInt)
    }
  }, [])

  const stat = "flex items-center gap-1.5"
  const statIcon = "size-[18px] text-[#94a3b8]"

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col justify-center gap-3 p-5 md:p-7"
    >
      {/* Listing card — shrink-0 so it never compresses when the composer shows */}
      <div className="mx-auto w-full max-w-[360px] shrink-0 overflow-hidden rounded-3xl bg-white shadow-[0_22px_55px_rgba(10,22,40,0.3)]">
        <div className="relative p-2.5">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=720&h=420&fit=crop&q=70"
            alt="42 Wallaby Way, Sydney"
            className="h-[150px] w-full rounded-2xl object-cover md:h-[168px]"
          />
          <span className="absolute left-5 top-5 rounded-full bg-[#d1f5e6] px-3 py-1 text-xs font-semibold text-[#0f766e]">
            House
          </span>
        </div>

        <div className="px-4 pb-6 pt-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-serif text-[26px] leading-none text-[#0a1628]">
              $1,720,000
            </p>
            <span className="shrink-0 rounded-full bg-[#d1f5e6] px-3 py-1 text-xs font-semibold text-[#0f766e]">
              Open to Offers
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 text-sm text-[#47474f]">
            <IconMapPin className="size-4 shrink-0 text-[#94a3b8]" stroke={2} />
            42 Wallaby Way Sydney, NSW, 2000
          </div>

          <div className="mt-3 flex items-center gap-4 text-sm text-[#47474f]">
            <span className={stat}>
              <IconBed className={statIcon} stroke={1.75} />4
            </span>
            <span className={stat}>
              <IconBath className={statIcon} stroke={1.75} />3
            </span>
            <span className={stat}>
              <IconCar className={statIcon} stroke={1.75} />2
            </span>
            <span className={cn(stat, "ml-auto")}>
              <IconArrowsDiagonal className={statIcon} stroke={1.75} />
              1,890m²
            </span>
          </div>

          {/* Message Seller button — flips to "Enquired" once the message sends */}
          <div className="relative mt-4">
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-300",
                phase >= 4
                  ? "bg-[#d1f5e6] text-[#0f766e]"
                  : "bg-primary text-white",
                phase === 1 && "scale-[0.97] brightness-95"
              )}
            >
              {phase >= 4 ? (
                <>
                  <IconCheck className="size-[18px]" stroke={2.5} />
                  Enquired
                </>
              ) : (
                <>
                  <IconMessage className="size-[18px]" stroke={2} />
                  Message Seller
                </>
              )}
            </button>
            {phase === 1 && (
              <span className="pointer-events-none absolute right-10 top-1/2 animate-cursor-click">
                <IconPointerFilled className="size-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reserved slot — always occupies the composer's height so the card
          neither moves nor resizes when the input appears/disappears. The
          composer itself is a fixed-height rounded rectangle. */}
      <div className="h-[66px] shrink-0">
        {(phase === 2 || phase === 3) && (
          <div className="mx-auto flex w-full max-w-[360px] animate-msg-in items-end gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_14px_36px_rgba(10,22,40,0.2)]">
            <span className="min-h-[2.5rem] flex-1 text-[14px] leading-snug text-[#0a1628]">
              {typed || (
                <span className="text-[#94a3b8]">Message the seller…</span>
              )}
              <span className="ml-px inline-block h-4 w-px translate-y-[3px] animate-pulse bg-primary" />
            </span>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <IconSend className="size-4" stroke={2} />
            </span>
          </div>
        )}
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
    guide: false,
    workspace: false,
    calc: false,
    access: false,
    inbox: false,
  },
  {
    eyebrow: "Software Intelligence",
    headingA: "Built to",
    headingB: "replace the agent",
    body: "Reasy's smart intelligence prioritises every message for you, flags what needs action, guides you through every step and tracks deadlines automatically. It's built to do the job of a real estate agent, so you never have to deal with one again.",
    accent: "#B47CFF",
    chat: false,
    guide: true,
    workspace: false,
    calc: false,
    access: false,
    inbox: false,
  },
  // The conveyancer (workspace: true) and commission (calc: true) cards are kept
  // as options — flip a flag here to swap the graphic back in for AccessGraphic.
  {
    eyebrow: "Access",
    headingA: "Homes you won't find",
    headingB: "on the portals",
    body: "Owners sell direct on Reasy. Their homes skip the agent, skip the portal and land straight in front of buyers who actually want to buy. That's you. While everyone else is getting outbid at auction or messed around by agents, you're already in the seller's inbox.",
    accent: "#4fd1c5",
    chat: false,
    guide: false,
    workspace: false,
    calc: false,
    access: false,
    inbox: true,
  },
]

// --- What is #agentless (floating, alternating variant) ---

// Lightened accents so the highlighted heading words read on the dark section.
const FLOAT_ACCENT = ["#507dde", "#B47CFF", "#4fd1c5"]

function AgentlessFloat() {
  return (
    <section className="px-6 py-16 md:px-14 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <Badge>What is #agentless?</Badge>

          <h2 className="mt-6 font-serif text-4xl leading-[1.1] md:text-[52px]">
            It's where buyers
            <br />
            <span className="text-primary">talk directly to sellers.</span>
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
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
                  ) : c.guide ? (
                    <GuidanceGraphic />
                  ) : c.inbox ? (
                    <MessageSellerGraphic />
                  ) : c.workspace ? (
                    <WorkspaceGraphic />
                  ) : c.access ? (
                    <AccessGraphic />
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
                    className="shimmer-stroke mt-8 inline-flex items-center gap-1.5 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
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
    "Communication filtered through an agent's agenda",
  ]
  const agentless = [
    "Every offer goes directly to the seller",
    "Full transparency. You see everything.",
    "Buyers and sellers identity-verified for transparency",
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
          <p className="font-['Roboto_Mono_Variable'] text-[12px] font-semibold uppercase tracking-[0.1em] text-primary">
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
            Be <span className="text-primary">first in line</span>
            <br />
            when we open the doors.
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
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-[15px] font-semibold text-white transition-colors hover:bg-primary/90"
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
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-16">
          {/* Left — photo + Instagram card */}
          <div>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10">
              <img
                src={founderPhoto}
                alt="Warren, founder of Reasy"
                className="size-full object-cover"
              />
            </div>

            <div className="relative mt-5 rounded-2xl bg-white p-4 text-[#0a1628] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
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
                18K+ in weeks. +1.5 million views. Hundreds of comments from
                people saying the exact same thing:{" "}
                <span className="italic text-primary">
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
        <a href="/" className="inline-flex items-center" aria-label="Reasy home">
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
            <span className="relative isolate inline-block text-primary">
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
                  stroke="#507dde"
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
              className="shimmer-stroke inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(80,125,222,0.5)] transition-colors hover:bg-primary/90"
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

      <footer className="relative z-10 border-t border-white/10 px-6 py-10 md:px-14">
        <div className="relative mx-auto flex max-w-[1280px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <img src={logoWhiteImg} alt="Reasy" className="h-6" />
          <nav className="flex items-center gap-8 text-sm text-white/60 md:absolute md:left-1/2 md:-translate-x-1/2">
            <a href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </nav>
          <p className="text-xs text-white/40">
            &copy; 2026 Reasy Pty Ltd. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  )
}
