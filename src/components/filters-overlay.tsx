import { useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  IconBuildingSkyscraper,
  IconChevronDown,
  IconHome,
  IconHomeStats,
  IconLayoutGrid,
  IconMap,
  IconX,
  type IconProps,
} from "@tabler/icons-react"
import type { ComponentType } from "react"
import {
  FEATURE_OPTIONS,
  LAND_STEPS,
  PRICE_STEPS,
  PROPERTY_TYPE_LABEL,
  attributeLabel,
  type BrowseFilters,
  type PropertyType,
} from "@/data/listings"

// Ported from reasy-app's src/components/browse/FiltersSheet.tsx so the
// website and the app filter the same way.

const TYPE_TILES: { id: PropertyType | "all"; icon: ComponentType<IconProps> }[] = [
  { id: "all", icon: IconLayoutGrid },
  { id: "house", icon: IconHome },
  { id: "apartment-unit", icon: IconBuildingSkyscraper },
  { id: "townhouse", icon: IconHomeStats },
  { id: "land", icon: IconMap },
]

const COUNTS = [0, 1, 2, 3]

const formatAud = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(v % 1_000_000 ? 2 : 0).replace(/\.?0+$/, "")}m` : `$${Math.round(v / 1000)}k`

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {children}
    </div>
  )
}

// Any / 1 / 2 / 3+, where anything but Any means "this many or more"
function Segmented({ value, onChange, label }: { value: number; onChange: (value: number) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-1.5">
      {COUNTS.map((n) => {
        const on = value === n
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-pressed={on}
            className={cn(
              "inline-flex h-10 min-w-12 items-center justify-center rounded-full px-4 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-accent"
            )}
          >
            {n === 0 ? "Any" : n === 3 ? "3+" : n}
          </button>
        )
      })}
    </div>
  )
}

function StepSelect({
  label,
  value,
  options,
  format,
  onChange,
}: {
  label: string
  value: number | null
  options: number[]
  format: (v: number) => string
  onChange: (v: number | null) => void
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        className="h-11 w-full cursor-pointer appearance-none rounded-full border border-border bg-card pl-4 pr-9 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {format(o)}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </label>
  )
}

/**
 * Full filters overlay: a centred dialog on desktop, a bottom sheet on phones.
 * The footer count is live, so you can see a filter empty the list before
 * committing to it.
 */
export function FiltersOverlay({
  filters,
  resultCount,
  onChange,
  onClear,
  onClose,
  onApply,
}: {
  filters: BrowseFilters
  resultCount: number
  onChange: (patch: Partial<BrowseFilters>) => void
  onClear: () => void
  onClose: () => void
  onApply: () => void
}) {
  const [featuresOpen, setFeaturesOpen] = useState(filters.attributes.length > 0)

  // Lock the page behind and close on Escape
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  const toggleType = (id: PropertyType | "all") => {
    if (id === "all") return onChange({ types: [] })
    onChange({ types: filters.types.includes(id) ? filters.types.filter((t) => t !== id) : [...filters.types, id] })
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex animate-in fade-in items-end justify-center bg-brand-dark/40 backdrop-blur-sm duration-200 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92dvh] w-full animate-in slide-in-from-bottom-4 flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl duration-300 sm:max-w-2xl sm:rounded-3xl"
      >
        <header className="flex shrink-0 items-center gap-3 px-6 pb-4 pt-6 md:px-8">
          <h2 className="font-display text-3xl leading-tight text-foreground">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="ml-auto inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <IconX className="size-5" />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-6 pb-4 md:px-8">
          <Field label="Property type">
            <div className="flex flex-wrap gap-2">
              {TYPE_TILES.map(({ id, icon: Icon }) => {
                const on = id === "all" ? filters.types.length === 0 : filters.types.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleType(id)}
                    aria-pressed={on}
                    className={cn(
                      "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                      on ? "border-primary bg-secondary text-secondary-foreground" : "border-transparent bg-muted text-muted-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="size-4" stroke={1.75} />
                    {id === "all" ? "Any" : PROPERTY_TYPE_LABEL[id]}
                  </button>
                )
              })}
            </div>
          </Field>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <Field label="Price">
              <div className="grid grid-cols-2 gap-2">
                <StepSelect label="Min price" value={filters.priceMin} options={PRICE_STEPS} format={formatAud} onChange={(priceMin) => onChange({ priceMin })} />
                <StepSelect label="Max price" value={filters.priceMax} options={PRICE_STEPS} format={formatAud} onChange={(priceMax) => onChange({ priceMax })} />
              </div>
            </Field>
            <Field label="Land size">
              <div className="grid grid-cols-2 gap-2">
                <StepSelect label="Min size" value={filters.landMin} options={LAND_STEPS} format={(v) => `${v}sqm`} onChange={(landMin) => onChange({ landMin })} />
                <StepSelect label="Max size" value={filters.landMax} options={LAND_STEPS} format={(v) => `${v}sqm`} onChange={(landMax) => onChange({ landMax })} />
              </div>
            </Field>
            <Field label="Bedrooms">
              <Segmented label="Bedrooms" value={filters.beds} onChange={(beds) => onChange({ beds })} />
            </Field>
            <Field label="Bathrooms">
              <Segmented label="Bathrooms" value={filters.baths} onChange={(baths) => onChange({ baths })} />
            </Field>
            <Field label="Car spaces">
              <Segmented label="Car spaces" value={filters.cars} onChange={(cars) => onChange({ cars })} />
            </Field>
            <Field label="Features">
              <button
                type="button"
                onClick={() => setFeaturesOpen((v) => !v)}
                aria-expanded={featuresOpen}
                className="flex h-11 w-full items-center justify-between rounded-full border border-border bg-card px-4 text-left text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className={filters.attributes.length ? "font-semibold text-foreground" : "text-muted-foreground"}>
                  {filters.attributes.length ? `${filters.attributes.length} selected` : "Any features"}
                </span>
                <span className="text-muted-foreground">{featuresOpen ? "Hide" : "Choose"}</span>
              </button>
            </Field>
          </div>

          {featuresOpen && (
            <div className="flex flex-wrap gap-2 rounded-2xl bg-muted/60 p-4">
              {FEATURE_OPTIONS.map((id) => {
                const on = filters.attributes.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onChange({ attributes: on ? filters.attributes.filter((x) => x !== id) : [...filters.attributes, id] })}
                    aria-pressed={on}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                      on ? "border-primary bg-secondary text-secondary-foreground" : "border-transparent bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {attributeLabel(id)}
                  </button>
                )
              })}
            </div>
          )}

          <Field label="Keywords">
            <input
              value={filters.keywords}
              onChange={(e) => onChange({ keywords: e.target.value })}
              placeholder="e.g. pool, ocean views, renovated"
              className="h-11 w-full rounded-full border border-border bg-card px-4 text-base outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            />
          </Field>
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-6 py-4 md:px-8">
          <button
            type="button"
            onClick={onClear}
            className="h-11 rounded-full bg-muted px-5 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={onApply}
            className="h-12 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary-strong focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
          >
            Show {resultCount} {resultCount === 1 ? "home" : "homes"}
          </button>
        </footer>
      </div>
    </div>
  )
}
