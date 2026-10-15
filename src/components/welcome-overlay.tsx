import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import logoImg from "@/assets/reasy-logo-gate.svg"
import sellerIcon from "@/assets/icon-land-sale.svg"
import buyerIcon from "@/assets/icon-keys.svg"

const paths = [
  { label: "I’m a Seller", href: "/new-home?for=selling", icon: sellerIcon },
  { label: "I’m a Buyer", href: "/new-home?for=buying", icon: buyerIcon },
]

/**
 * Full-screen "Agents are NOT welcome here" overlay. Appears `delay` ms after
 * mount and cannot be dismissed — the only way forward is the CTA.
 */
export function WelcomeOverlay({ delay = 1200 }: { delay?: number }) {
  const [visible, setVisible] = useState(false)
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
      <div
        className={cn(
          "flex min-h-full flex-col px-6 pb-12 pt-8 transition-all duration-500 md:px-16 md:pb-16 md:pt-9",
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
          {paths.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
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
