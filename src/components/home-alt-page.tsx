import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  IconStarFilled,
  IconBell,
  IconSearch,
  IconFilter,
  IconStar,
  IconArrowsSort,
  IconMenu2,
} from "@tabler/icons-react"
import { WelcomeOverlay } from "@/components/welcome-overlay"
import logoImg from "@/assets/reasy-logo.svg"
import logoWhiteImg from "@/assets/reasy-logo-white.svg"

// --- Offer rows (only amount / match / status are shown in detail) ---

type Offer = { score: number; amount: string }

const OFFERS: Offer[] = [
  { score: 97, amount: "$1,300,000" },
  { score: 80, amount: "$1,230,000" },
  { score: 77, amount: "$1,250,000" },
  { score: 71, amount: "$1,190,000" },
  { score: 70, amount: "$1,255,000" },
  { score: 69, amount: "$1,215,000" },
  { score: 67, amount: "$1,265,000" },
  { score: 64, amount: "$1,180,000" },
]

// Staggered "impact" delays — offset so the cascade begins after the page fade-in.
// (arbitrary Tailwind classes — kept static so they compile)
const ROW_DELAYS = [
  "[animation-delay:700ms]",
  "[animation-delay:910ms]",
  "[animation-delay:1120ms]",
  "[animation-delay:1330ms]",
  "[animation-delay:1540ms]",
  "[animation-delay:1750ms]",
  "[animation-delay:1960ms]",
  "[animation-delay:2170ms]",
]

const COLS =
  "grid-cols-[1.4fr_0.7fr_1fr] md:grid-cols-[1.7fr_0.8fr_1.1fr_0.9fr_1.1fr_0.9fr_0.9fr_0.8fr]"

function Bar({ className }: { className?: string }) {
  return <div className={cn("h-3 rounded-full bg-slate-200/80", className)} />
}

function MatchBadge({ score }: { score: number }) {
  const good = score >= 80
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold",
        good ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-500"
      )}
    >
      <IconStarFilled className="size-3" />
      {score}
    </span>
  )
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="rounded-xl border border-black/[0.06] bg-white px-5 py-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p
        className={cn(
          "mt-1 text-xl font-semibold",
          accent ? "text-emerald-600" : "text-[#0f1524]"
        )}
      >
        {value}
      </p>
    </div>
  )
}

function OffersDashboard() {
  return (
    <div className="w-full bg-[#fbfbfc] md:min-w-[1000px]">
      {/* App top bar */}
      <div className="flex items-center justify-between border-b border-black/[0.06] bg-white px-4 py-4 md:px-6">
        <img src={logoImg} alt="Reasy" className="h-5" />
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-500 md:flex">
          <span>Overview</span>
          <span>Enquiries</span>
          <span className="rounded-lg bg-black/[0.04] px-3 py-1.5 text-[#0f1524]">
            Offers
          </span>
          <span>Documents</span>
          <span>Tools</span>
          <span>Help</span>
        </nav>
        <div className="flex items-center gap-3 md:gap-4">
          <IconBell className="size-5 text-slate-400" />
          <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#7aa0e8] text-xs font-semibold text-white">
            T
          </div>
          <IconMenu2 className="size-6 text-slate-600 md:hidden" />
        </div>
      </div>

      {/* Page body */}
      <div className="px-4 py-5 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-[#1e2a55]">Offers</h2>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-emerald-400 px-4 py-2 text-sm font-medium text-emerald-700">
            <IconStar className="size-4" />
            Preferences
          </button>
        </div>

        {/* Metrics — concise inline strip on mobile */}
        <div className="mt-5 flex items-stretch divide-x divide-black/[0.08] overflow-hidden rounded-xl border border-black/[0.06] bg-white md:hidden">
          {[
            { label: "Offers", value: "24" },
            { label: "Live", value: "16" },
            { label: "Highest", value: "$1.3M", accent: true },
            { label: "Cash", value: "6" },
          ].map((m) => (
            <div key={m.label} className="flex-1 px-2 py-3 text-center">
              <p
                className={cn(
                  "text-lg font-semibold",
                  m.accent ? "text-emerald-600" : "text-[#0f1524]"
                )}
              >
                {m.value}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Stat cards — desktop */}
        <div className="mt-6 hidden grid-cols-4 gap-4 md:grid">
          <StatCard label="Offers received" value="24" />
          <StatCard label="Live offers" value="16" />
          <StatCard label="Highest offer" value="$1,300,000" accent />
          <StatCard label="Cash offers" value="6" />
        </div>

        {/* Filter row */}
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/40 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
              All
            </span>
            {["Cash", "Finance", "Subject to sale"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/[0.08] px-4 py-1.5 text-sm text-slate-500"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-black/[0.08] px-3 py-2 text-sm text-slate-400 md:flex-none">
              <IconSearch className="size-4" />
              Search offers
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-black/[0.08] px-3 py-2 text-sm text-slate-600">
              <IconFilter className="size-4" />
              Filters
            </div>
          </div>
        </div>

        {/* Table header */}
        <div
          className={cn(
            "mt-4 grid items-center gap-4 px-2 pb-2 text-xs font-medium text-slate-400",
            COLS
          )}
        >
          <span>Buyer</span>
          <span className="flex items-center gap-1">
            Match <IconArrowsSort className="size-3" />
          </span>
          <span className="flex items-center gap-1">
            Amount <IconArrowsSort className="size-3" />
          </span>
          <span className="hidden md:block">Type</span>
          <span className="hidden md:block">Subject to</span>
          <span className="hidden md:block">Settlement</span>
          <span className="hidden md:block">Submitted</span>
          <span className="hidden md:block">Status</span>
        </div>

        {/* Rows */}
        <div>
          {OFFERS.map((o, i) => (
            <div
              key={i}
              className={cn(
                "row-impact grid items-center gap-4 border-t border-black/[0.05] px-2 py-3.5",
                COLS,
                ROW_DELAYS[i]
              )}
            >
              {/* Buyer — skeleton */}
              <div className="flex items-center gap-3">
                <div className="size-8 shrink-0 rounded-full bg-slate-200/80" />
                <Bar className="w-28" />
              </div>
              {/* Match — detailed */}
              <div>
                <MatchBadge score={o.score} />
              </div>
              {/* Amount — detailed */}
              <div className="text-[15px] font-semibold text-emerald-600">
                {o.amount}
              </div>
              {/* Type — skeleton */}
              <div className="hidden h-6 w-20 rounded-md bg-slate-200/70 md:block" />
              {/* Subject to — skeleton */}
              <Bar className="hidden w-24 bg-slate-200/70 md:block" />
              {/* Settlement — skeleton */}
              <Bar className="hidden w-16 bg-slate-200/70 md:block" />
              {/* Submitted — skeleton */}
              <Bar className="hidden w-14 bg-slate-200/70 md:block" />
              {/* Status — detailed */}
              <div className="hidden md:block">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Page ---

export function HomeAltPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="relative flex h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#4E82C1_0%,#3f6fb0_100%)]">
      {/* Buyer overlay — appears after the fade-in and row cascade have played */}
      <WelcomeOverlay delay={2900} />

      {/* Everything fades in on load, then the offer rows cascade in */}
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Logo top-left */}
        <header className="px-6 py-4 md:px-10">
          <a href="/" aria-label="Reasy home">
            <img src={logoWhiteImg} alt="Reasy" className="h-6" />
          </a>
        </header>

        {/* Dashboard frame — fills the screen and peeks from the bottom */}
        <div className="mt-2 flex min-h-0 flex-1 justify-center px-4">
          <div className="flex w-[min(1400px,96vw)] min-h-0 flex-col">
            <div className="min-h-0 flex-1 rounded-t-2xl bg-[#f8f8f8] p-2 shadow-[0_-12px_60px_rgba(0,0,0,0.25)]">
              <div className="h-full overflow-hidden rounded-t-xl bg-white">
                <OffersDashboard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
