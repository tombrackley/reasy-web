import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { LandingNodes, type NodeShape } from "@/components/landing-nodes"
import { IconSparkles2Filled } from "@tabler/icons-react"
import logoImg from "@/assets/reasy-logo-gate.svg"
import sellerIcon from "@/assets/icon-land-sale.svg"
import buyerIcon from "@/assets/icon-keys.svg"
import waterfrontImg from "@/assets/gold-coast-reasy-launch-platform.png"
import buyerAvatar from "@/assets/avatar-2.jpg"
import sellerAvatar from "@/assets/avatar-5.jpg"

const paths: { label: string; href: string; icon: string; shape: NodeShape }[] = [
  { label: "I’m a Seller", href: "/new-home?for=selling", icon: sellerIcon, shape: "sign" },
  { label: "I’m a Buyer", href: "/new-home?for=buying", icon: buyerIcon, shape: "key" },
]

/**
 * Full-screen "Agents are NOT welcome here" overlay. Appears `delay` ms after
 * mount and cannot be dismissed — the only way forward is the CTA.
 */
export function WelcomeOverlay({
  delay = 1200,
  visual = "photo",
}: {
  delay?: number
  // "photo": waterfront photo with chat and offer cards. "nodes": floating
  // squares that form a For Sale sign or key when a card is hovered.
  visual?: "photo" | "nodes"
}) {
  const [visible, setVisible] = useState(false)
  const [shape, setShape] = useState<NodeShape>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    // Shows on every load (for stakeholder demos)
    const timer = setTimeout(() => {
      setVisible(true)
      requestAnimationFrame(() => setEntered(true))
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!visible) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Reasy"
      className={cn(
        "fixed inset-0 z-[100] overflow-y-auto bg-gate transition-opacity duration-500",
        entered ? "opacity-100" : "opacity-0"
      )}
    >
      {visual === "nodes" ? <LandingNodes shape={shape} /> : <LandingVisual />}

      <div
        className={cn(
          "relative flex min-h-full flex-col px-6 pb-12 pt-8 transition-all duration-500 md:px-16 md:pb-16 md:pt-9",
          entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        <img src={logoImg} alt="Reasy" className="self-start" />

        <h2 className="mt-10 font-display text-[clamp(3.25rem,10vw,9rem)] uppercase leading-[0.9] tracking-[-0.02em] text-gate-foreground md:mt-7">
          Agents are
          <br />
          not welcome
          <br />
          here!
        </h2>

        <p className="mt-7 max-w-sm text-xl font-semibold leading-[1.4] tracking-[-0.02em] text-gate-foreground md:max-w-[22rem] md:text-2xl">
          Buy and sell properties without real estate agents. Easy.
        </p>

        {/* Buyer / seller splitter: each card opens the matching home page view */}
        <div className="mt-16 flex gap-4.5 pb-4 md:mt-22">
          {paths.map(({ label, href, icon, shape: cardShape }) => (
            <a
              key={label}
              href={href}
              onMouseEnter={() => setShape(cardShape)}
              onMouseLeave={() => setShape(null)}
              onFocus={() => setShape(cardShape)}
              onBlur={() => setShape(null)}
              className="flex h-41.5 w-43 flex-col items-center justify-center gap-6 rounded-xl border-2 border-gate-foreground bg-white px-6 py-5.5 text-center outline-none transition-transform hover:-translate-y-1 focus-visible:ring-3 focus-visible:ring-white/60 active:translate-y-0"
            >
              <img src={icon} alt="" />
              <span className="text-lg font-bold leading-[1.4] text-gate-accent">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// Waterfront photo melting into the blue on the right, with a buyer/seller
// conversation and offer floating over it. Decorative, desktop only.
function LandingVisual() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] lg:block">
      <img
        src={waterfrontImg}
        alt=""
        className="landing-photo-mask absolute inset-0 size-full object-cover object-[70%_center]"
      />

      <div className="absolute bottom-[10%] right-[10%] flex w-80 flex-col gap-4 xl:right-[16%]">
        {/* Buyer message */}
        <div className="flex items-end gap-2.5 self-start">
          <img src={buyerAvatar} alt="" className="size-9 rounded-full ring-2 ring-white" />
          <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-snug text-foreground shadow-xl">
            Hi! Is the pool heated?
            <span className="mt-1 block text-xs text-muted-foreground">Sam, buyer</span>
          </div>
        </div>

        {/* Seller reply */}
        <div className="flex items-end gap-2.5 self-end">
          <div className="rounded-2xl rounded-br-md bg-brand-dark px-4 py-3 text-sm leading-snug text-white shadow-xl">
            It is, solar heated all year.
            <span className="mt-1 block text-xs text-white/70">Jess, owner</span>
          </div>
          <img src={sellerAvatar} alt="" className="size-9 rounded-full ring-2 ring-white" />
        </div>

        {/* Offer card */}
        <div className="mt-2 rounded-2xl bg-white p-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-lime px-2.5 py-1 text-xs font-medium text-lime-foreground">
              New offer
            </span>
            <span className="text-xs text-muted-foreground">Just now</span>
          </div>
          <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">$1,450,000</p>
          <p className="mt-1 text-sm text-muted-foreground">Subject to finance • 30 day settlement</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <span className="rounded-full bg-primary py-2 text-center text-sm font-semibold text-primary-foreground">
              Accept
            </span>
            <span className="rounded-full border border-border py-2 text-center text-sm font-semibold text-foreground">
              Counter
            </span>
          </div>
          <span className="mt-2 flex items-center justify-center gap-1.5 rounded-full border border-border py-2 text-sm font-semibold text-foreground">
            <IconSparkles2Filled className="size-4 text-ai" />
            Ask Reasy
          </span>
        </div>
      </div>
    </div>
  )
}
