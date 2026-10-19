import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type TouchEvent } from "react"
import { cn } from "@/lib/utils"
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

// Shared Instagram comment scroller, used on the For Buyers page and the new
// homepage. "dark" is for dark backgrounds (white dots and stats), "light" for
// the homepage's warm canvas.
type Tone = "dark" | "light"

// Real screenshots, each padded to a uniform aspect ratio so every card is the
// same size in the marquee (see COMMENT_IMAGES).

// Order matches the client's Notion "Instagram Screenshots here" page,
// top to bottom (username noted for each).
const COMMENT_IMAGES = [
  comment18, // disruptivepotato
  comment02, // appleuser57286718
  comment15, // 750ibm
  comment17, // griffin_dope
  comment14, // Jacq Therese Plunqui
  comment16, // elizabeth_hindmarsh1967
  comment13, // xxoo
  comment12, // Al
  comment11, // HPReka
  comment10, // andrea
  comment09, // Builder
  comment08, // s_t_a_x
  comment06, // clarekarensweeney
  comment04, // Joel Seemo
  comment07, // Kurt
  comment05, // michelecherry213
  comment03, // delilah
  comment01, // stefinternational
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
const MARQUEE_SPEED = 32 // px/sec

export function CommentMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const halfRef = useRef(0)
  const draggingRef = useRef(false)
  const lastXRef = useRef(0)

  // keep the offset within one copy's width so the loop stays seamless
  const wrapOffset = () => {
    const half = halfRef.current
    if (half <= 0) return
    while (offsetRef.current <= -half) offsetRef.current += half
    while (offsetRef.current > 0) offsetRef.current -= half
  }

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

// Instagram-style windowed dot indicator: keeps the active dot centred and
// shrinks the dots towards the edges of the window, so a long list of comments
// reads as "there are many more" without printing dozens of full-size dots.
function CarouselDots({ len, active, tone }: { len: number; active: number; tone: Tone }) {
  const PITCH = 14 // px between dot centres
  const VISIBLE = 7 // dots shown at full/near-full size before shrinking
  const viewport = VISIBLE * PITCH
  const shift = viewport / 2 - PITCH / 2 - active * PITCH

  return (
    <div className="mt-5 flex justify-center" aria-hidden>
      <div className="overflow-hidden" style={{ width: viewport }}>
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${shift}px)` }}
        >
          {Array.from({ length: len }, (_, i) => {
            const d = Math.abs(i - active)
            const scale = d === 0 ? 1 : d <= 2 ? 0.7 : d <= 3 ? 0.5 : 0.3
            return (
              <div
                key={i}
                className="flex shrink-0 items-center justify-center"
                style={{ width: PITCH, height: PITCH }}
              >
                <span
                  className={cn(
                    "block size-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none",
                    tone === "dark" ? (active === i ? "bg-white" : "bg-white/40") : active === i ? "bg-brand-dark" : "bg-brand-dark/30"
                  )}
                  style={{ transform: `scale(${scale})` }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Mobile-only carousel: one comment centred with a peek of the neighbours,
// auto-advances on a timer (like Instagram Stories). Swipe left/right to move
// between comments; the track follows the finger and snaps to the nearest
// comment on release. Driven purely by a translateX transform (no scroll
// container). Wraps around at both ends.
const AUTO_ADVANCE_MS = 6000
const SWIPE_THRESHOLD = 40 // px of travel needed to commit to a step

export function MobileCommentCarousel({ tone = "dark" }: { tone?: Tone } = {}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | undefined>(undefined)
  const [active, setActive] = useState(0)
  const [offset, setOffset] = useState(0)
  const [drag, setDrag] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const len = COMMENT_IMAGES.length

  // Centre the active card by translating the track. Using the offset delta
  // from the first card keeps it correct regardless of the offsetParent, and
  // active 0 → offset 0 is already centred thanks to the symmetric px-14.
  const measure = () => {
    const track = trackRef.current
    if (!track) return
    const first = track.children[0] as HTMLElement | undefined
    const cur = track.children[active] as HTMLElement | undefined
    if (first && cur) setOffset(-(cur.offsetLeft - first.offsetLeft))
  }

  useLayoutEffect(measure, [active])

  useEffect(() => {
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const startTimer = () => {
    window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(
      () => setActive((a) => (a + 1) % len),
      AUTO_ADVANCE_MS
    )
  }

  useEffect(() => {
    if (reduced) return
    startTimer()
    return () => window.clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    dragging.current = true
    startX.current = e.touches[0].clientX
    window.clearInterval(timerRef.current) // pause auto-advance while touching
  }

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    setDrag(e.touches[0].clientX - startX.current)
  }

  const onTouchEnd = () => {
    if (!dragging.current) return
    dragging.current = false
    const d = drag
    setDrag(0)
    if (Math.abs(d) > SWIPE_THRESHOLD) {
      // swipe right (positive) → previous, swipe left → next
      const dir = d < 0 ? 1 : -1
      setActive((a) => (a + dir + len) % len)
    }
    if (!reduced) startTimer() // resume the clock after the gesture
  }

  return (
    <div className="overflow-hidden pb-4 md:hidden">
      <div className="px-14">
        <div
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className={cn(
            "flex touch-pan-y gap-6 will-change-transform",
            dragging.current
              ? ""
              : "transition-transform duration-500 ease-out motion-reduce:transition-none"
          )}
          style={{ transform: `translateX(${offset + drag}px)` }}
        >
          {COMMENT_IMAGES.map((src, i) => (
            <div
              key={i}
              className={cn(
                "w-full shrink-0 transition-opacity duration-300 motion-reduce:transition-none",
                active === i ? "opacity-100" : "opacity-30"
              )}
            >
              <CommentCard src={src} className="w-full" />
            </div>
          ))}
        </div>
      </div>
      <CarouselDots len={len} active={active} tone={tone} />
    </div>
  )
}

export function Stat({ value, label, tone = "dark" }: { value: string; label: string; tone?: Tone }) {
  return (
    <div className="text-center">
      <div className={cn("font-serif text-2xl md:text-[28px]", tone === "dark" ? "text-white" : "text-brand-dark")}>{value}</div>
      <div className={cn("mt-1 text-xs tracking-wide", tone === "dark" ? "text-white/80" : "text-muted-foreground")}>{label}</div>
    </div>
  )
}

