import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { IconArrowRight } from "@tabler/icons-react"
import logoWhiteImg from "@/assets/reasy-logo-white.svg"

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
        "fixed inset-0 z-[100] flex items-center justify-center px-6 transition-opacity duration-500",
        "bg-[#050e1c]/92 backdrop-blur-md",
        entered ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Soft radial glow behind the content */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(80,125,222,0.22),transparent_70%)]" />

      {/* Reasy logo — matches the home-alt header treatment */}
      <div className="absolute left-0 top-0 px-6 py-4 md:px-10">
        <img src={logoWhiteImg} alt="Reasy" className="h-6" />
      </div>

      {/* Campaign hashtag */}
      <div className="absolute right-0 top-0 flex h-6 items-center px-6 py-4 md:px-10 box-content">
        <span className="text-[15px] font-medium text-white/50">#agentless</span>
      </div>

      <div
        className={cn(
          "max-w-[720px] text-center transition-all duration-500",
          entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        <h2 className="font-serif text-[clamp(3rem,9vw,5rem)] leading-[1.05] text-white">
          Agents are <span className="text-primary">NOT</span>
          <br />
          welcome here.
        </h2>

        <p className="mx-auto mt-6 max-w-[520px] text-lg leading-relaxed text-white/70">
          If you enjoy dealing with Real Estate Agents you are in the wrong
          place… <span className="font-semibold text-primary">Stick with the old portals!</span>
        </p>

        <div className="mt-7 flex justify-center">
          <span className="inline-flex items-center text-base font-semibold tracking-wide text-white">
            Doors open 1 November 2026 · Australia
          </span>
        </div>

        <div className="mt-8">
          <a
            href="/for-buyers"
            className="shimmer-stroke inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(80,125,222,0.5)] transition-colors hover:bg-primary/90"
          >
            See what all the fuss is about
            <IconArrowRight className="size-4" />
          </a>
        </div>

        <p className="mt-5 text-sm text-white/40">
          Limited spots available.
        </p>
      </div>
    </div>
  )
}
