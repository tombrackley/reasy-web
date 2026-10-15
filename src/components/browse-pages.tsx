import { useMemo, useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { AnnouncementBar, Footer, Nav } from "@/components/new-home-page"
import { BrowseMap } from "@/components/browse-map"
import {
  IconAdjustmentsHorizontal,
  IconArrowRight,
  IconBath,
  IconBed,
  IconCalendar,
  IconCar,
  IconChevronDown,
  IconHeart,
  IconHomeSearch,
  IconList,
  IconMap,
  IconSearch,
  IconSparkles2Filled,
  IconVectorTriangle,
} from "@tabler/icons-react"
import {
  EMPTY_FILTERS,
  LISTINGS,
  PROPERTY_TYPE_LABEL,
  SUBURBS,
  formatTimeOnMarket,
  matches,
  nextInspectionLabel,
  type BrowseFilters,
  type Listing,
  type PropertyType,
} from "@/data/listings"

// --- Shared bits ---

type Tab = "buy" | "private" | "sold"

const tabs: { value: Tab; label: string; short: string }[] = [
  { value: "buy", label: "Buy", short: "Buy" },
  { value: "private", label: "Private listings", short: "Private" },
  { value: "sold", label: "Recently sold", short: "Sold" },
]

const priceOptions = [
  { value: 0, label: "Any price" },
  { value: 750_000, label: "Up to $750k" },
  { value: 1_000_000, label: "Up to $1m" },
  { value: 1_500_000, label: "Up to $1.5m" },
  { value: 2_000_000, label: "Up to $2m" },
]

const bedOptions = [
  { value: 0, label: "Any beds" },
  { value: 1, label: "1+ beds" },
  { value: 2, label: "2+ beds" },
  { value: 3, label: "3+ beds" },
  { value: 4, label: "4+ beds" },
]

type SearchState = BrowseFilters & { tab: Tab; ai: boolean }

function readSearch(): SearchState {
  const p = new URLSearchParams(window.location.search)
  const type = p.get("type") ?? ""
  return {
    query: p.get("q") ?? "",
    type: type in PROPERTY_TYPE_LABEL ? (type as PropertyType) : "",
    beds: Number(p.get("beds")) || 0,
    priceMax: Number(p.get("price")) || 0,
    tab: (["buy", "private", "sold"].includes(p.get("tab") ?? "") ? p.get("tab") : "buy") as Tab,
    ai: p.get("ai") !== "0",
  }
}

function searchUrl(s: SearchState) {
  const p = new URLSearchParams()
  if (s.query) p.set("q", s.query)
  if (s.type) p.set("type", s.type)
  if (s.beds) p.set("beds", String(s.beds))
  if (s.priceMax) p.set("price", String(s.priceMax))
  if (s.tab !== "buy") p.set("tab", s.tab)
  if (!s.ai) p.set("ai", "0")
  const qs = p.toString()
  return `/browse/results${qs ? `?${qs}` : ""}`
}

function PillSelect<T extends string | number>({
  label,
  value,
  options,
  onChange,
  active,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  active?: boolean
}) {
  return (
    <label className="relative inline-flex">
      <span className="sr-only">{label}</span>
      <select
        value={String(value)}
        onChange={(e) => {
          const match = options.find((o) => String(o.value) === e.target.value)
          if (match) onChange(match.value)
        }}
        className={cn(
          "h-10 cursor-pointer appearance-none rounded-full border py-0 pl-4 pr-9 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
          active ? "border-primary bg-secondary text-secondary-foreground" : "border-border bg-card text-foreground hover:bg-accent"
        )}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </label>
  )
}

const typeOptions: { value: PropertyType | ""; label: string }[] = [
  { value: "", label: "All types" },
  ...(Object.keys(PROPERTY_TYPE_LABEL) as PropertyType[]).map((t) => ({ value: t, label: PROPERTY_TYPE_LABEL[t] })),
]

// --- Search box (realestate.com.au-style: tabs, input, filters, search) ---

function SearchBox({ initial }: { initial: SearchState }) {
  const [state, setState] = useState(initial)
  const [showFilters, setShowFilters] = useState(false)
  const patch = (next: Partial<SearchState>) => setState((s) => ({ ...s, ...next }))
  const filterCount = (state.type ? 1 : 0) + (state.beds ? 1 : 0) + (state.priceMax ? 1 : 0)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    window.location.href = searchUrl(state)
  }

  return (
    <div className="mx-auto w-full max-w-4xl text-left">
      <form onSubmit={submit} className="overflow-hidden rounded-3xl bg-card shadow-2xl">
        {/* Tabs */}
        <div role="tablist" aria-label="What are you looking for?" className="flex border-b border-border px-2 md:px-4">
          {tabs.map((t) => {
            const on = state.tab === t.value
            return (
              <button
                key={t.value}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => patch({ tab: t.value })}
                className={cn(
                  "relative flex-1 px-2 py-4 text-sm font-semibold outline-none transition-colors focus-visible:bg-accent md:text-base",
                  on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="md:hidden">{t.short}</span>
                <span className="hidden md:inline">{t.label}</span>
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-0.5 rounded-full transition-colors",
                    on ? "bg-primary" : "bg-transparent"
                  )}
                />
              </button>
            )
          })}
        </div>

        {/* Input row */}
        <div className="flex flex-col gap-3 p-3 md:flex-row md:items-center md:p-4">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-full px-3 focus-within:bg-accent/40">
            <IconSearch className="size-5 shrink-0 text-muted-foreground" />
            <span className="sr-only">Search by suburb, address or what you're after</span>
            <input
              type="search"
              value={state.query}
              onChange={(e) => patch({ query: e.target.value })}
              list="browse-suburbs"
              placeholder="Try “4 bed house with a pool in Burleigh Heads”"
              className="h-12 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            <datalist id="browse-suburbs">
              {SUBURBS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowFilters((o) => !o)}
              aria-expanded={showFilters}
              className={cn(
                "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border px-5 text-base font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 md:flex-none",
                showFilters || filterCount ? "border-primary bg-secondary text-secondary-foreground" : "border-border text-foreground hover:bg-accent"
              )}
            >
              <IconAdjustmentsHorizontal className="size-5" stroke={1.75} />
              Filters
              {filterCount > 0 && (
                <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                  {filterCount}
                </span>
              )}
            </button>
            <button
              type="submit"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary-strong focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px md:flex-none"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters, revealed on demand */}
        <div className={cn("grid transition-all duration-300", showFilters ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          <div className="min-h-0 overflow-hidden" inert={!showFilters}>
            <div className="flex flex-wrap gap-2 border-t border-border px-4 py-4 md:px-6">
              <PillSelect label="Property type" value={state.type} options={typeOptions} onChange={(type) => patch({ type })} active={!!state.type} />
              <PillSelect label="Price" value={state.priceMax} options={priceOptions} onChange={(priceMax) => patch({ priceMax })} active={!!state.priceMax} />
              <PillSelect label="Bedrooms" value={state.beds} options={bedOptions} onChange={(beds) => patch({ beds })} active={!!state.beds} />
            </div>
          </div>
        </div>
      </form>

      {/* AI search toggle */}
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => patch({ ai: !state.ai })}
          aria-pressed={state.ai}
          className="inline-flex items-center gap-2.5 rounded-full bg-card py-1.5 pl-1.5 pr-4 text-sm font-semibold text-foreground shadow-lg outline-none transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-white/60"
        >
          <span className="rounded-full bg-ai/15 px-2.5 py-1 text-xs font-semibold text-ai-foreground">Beta</span>
          <IconSparkles2Filled className="size-4 text-ai" />
          AI search: {state.ai ? "On" : "Off"}
        </button>
      </div>
    </div>
  )
}

// --- Property card (from reasy-app's Browse grid card) ---

function PropertyCard({
  listing: l,
  saved,
  onToggleSave,
  onHover,
}: {
  listing: Listing
  saved: boolean
  onToggleSave: () => void
  onHover?: (id: string | null) => void
}) {
  const fresh = l.listedDaysAgo <= 2
  return (
    <article
      onMouseEnter={() => onHover?.(l.id)}
      onMouseLeave={() => onHover?.(null)}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-shadow hover:shadow-lg"
    >
      <div className="relative h-52 shrink-0 bg-muted">
        <img src={l.imageUrl} alt={`${l.address}, ${l.suburb}`} loading="lazy" className="absolute inset-0 size-full object-cover" />
        <button
          type="button"
          onClick={onToggleSave}
          aria-label={saved ? `Remove ${l.address} from saved` : `Save ${l.address}`}
          aria-pressed={saved}
          className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-card/90 shadow-sm outline-none transition-colors hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <IconHeart className={cn("size-4", saved ? "fill-current text-primary" : "text-muted-foreground")} stroke={2} />
        </button>
        {l.propertyType !== "land" && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
            <IconCalendar className="size-3.5" stroke={2} />
            Open {nextInspectionLabel(l.id)}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-2xl leading-tight text-foreground">{l.address}</h3>
            <p className="truncate text-sm text-muted-foreground">{l.suburb}</p>
          </div>
          <p className="shrink-0 font-display text-2xl leading-tight text-green-foreground">{l.price}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {l.beds > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <IconBed className="size-4" stroke={1.75} />
              {l.beds} beds
            </span>
          )}
          {l.baths > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <IconBath className="size-4" stroke={1.75} />
              {l.baths} baths
            </span>
          )}
          {l.cars > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <IconCar className="size-4" stroke={1.75} />
              {l.cars} cars
            </span>
          )}
          {l.landSqm > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <IconVectorTriangle className="size-4" stroke={1.75} />
              {l.landSqm}sqm
            </span>
          )}
        </div>

        <span
          className={cn(
            "mt-auto self-start text-xs font-semibold",
            fresh ? "rounded-full bg-lime px-2.5 py-1 text-lime-foreground" : "text-muted-foreground"
          )}
        >
          {formatTimeOnMarket(l.listedDaysAgo)}
        </span>
      </div>
    </article>
  )
}

// --- /browse ---

export function BrowsePage() {
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const toggleSave = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const latest = LISTINGS.slice(0, 3)

  return (
    <div data-slot="browse-page" className="min-h-screen bg-canvas text-foreground">
      <AnnouncementBar />
      <Nav />
      <main>
        <section className="px-3 md:px-6">
          <div className="browse-wash rounded-4xl px-4 pb-20 pt-16 text-center md:pb-28 md:pt-24">
            <span className="inline-flex items-center gap-2 text-lg font-semibold text-white">
              <span className="flex size-8 items-center justify-center rounded-lg bg-white/20">
                <IconHomeSearch className="size-5" stroke={1.75} />
              </span>
              Browse properties
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em] text-white md:text-7xl lg:text-8xl">
              Find a home, straight from the owner.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
              Every home on Reasy is listed by the person who owns it. Search, save and
              message sellers directly, with no agent in the middle.
            </p>

            <div className="mt-12">
              <SearchBox initial={{ ...EMPTY_FILTERS, tab: "buy", ai: true }} />
            </div>
          </div>
        </section>

        <Reveal>
          <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-8 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">New this week</p>
                <h2 className="mt-3 font-serif text-4xl leading-[1.1] text-brand-dark md:text-5xl dark:text-foreground">
                  Just listed on Reasy
                </h2>
              </div>
              <a
                href="/browse/results"
                className="inline-flex items-center gap-2 text-base font-semibold text-primary outline-none transition-colors hover:text-primary-strong focus-visible:underline"
              >
                See all homes for sale
                <IconArrowRight className="size-4" />
              </a>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((l) => (
                <PropertyCard key={l.id} listing={l} saved={saved.has(l.id)} onToggleSave={() => toggleSave(l.id)} />
              ))}
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}

// --- /browse/results ---

export function BrowseResultsPage() {
  const [search, setSearch] = useState(readSearch)
  const [draft, setDraft] = useState(search.query)
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [mobileView, setMobileView] = useState<"list" | "map">("list")

  // Filters apply straight away and stay in the address bar, so a search can
  // be shared or refreshed.
  const update = (next: Partial<SearchState>) => {
    const merged = { ...search, ...next }
    setSearch(merged)
    window.history.replaceState(null, "", searchUrl(merged))
  }
  const clearAll = () => {
    setDraft("")
    update({ ...EMPTY_FILTERS })
  }

  const results = useMemo(() => LISTINGS.filter((l) => matches(l, search)), [search])
  const filterCount = (search.type ? 1 : 0) + (search.beds ? 1 : 0) + (search.priceMax ? 1 : 0) + (search.query ? 1 : 0)
  const toggleSave = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const heading = search.tab === "private" ? "Private listings" : search.tab === "sold" ? "Recently sold" : "Homes for sale"

  return (
    <div data-slot="browse-results-page" className="min-h-screen bg-canvas text-foreground">
      <Nav />
      <main className="grid gap-8 px-4 pb-20 pt-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:px-14">
        {/* Left: search, filters, results */}
        <div className="min-w-0">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              update({ query: draft.trim() })
            }}
            className="flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5 shadow-xs focus-within:border-primary"
          >
            <IconSearch className="size-5 shrink-0 text-muted-foreground" />
            <label className="sr-only" htmlFor="results-search">
              Search by suburb, address or what you're after
            </label>
            <input
              id="results-search"
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              list="results-suburbs"
              placeholder="Suburb, address or what you're after"
              className="h-10 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            <datalist id="results-suburbs">
              {SUBURBS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary-strong focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <PillSelect label="Property type" value={search.type} options={typeOptions} onChange={(type) => update({ type })} active={!!search.type} />
            <PillSelect label="Price" value={search.priceMax} options={priceOptions} onChange={(priceMax) => update({ priceMax })} active={!!search.priceMax} />
            <PillSelect label="Bedrooms" value={search.beds} options={bedOptions} onChange={(beds) => update({ beds })} active={!!search.beds} />
            <button
              type="button"
              onClick={() => update({ ai: !search.ai })}
              aria-pressed={search.ai}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                search.ai ? "border-ai/40 bg-ai/10 text-ai-foreground" : "border-border bg-card text-muted-foreground hover:bg-accent"
              )}
            >
              <IconSparkles2Filled className="size-4 text-ai" />
              AI search {search.ai ? "on" : "off"}
            </button>
            {filterCount > 0 && (
              <button type="button" onClick={clearAll} className="px-2 text-sm font-semibold text-primary hover:underline">
                Clear all
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="font-display text-4xl leading-tight text-brand-dark dark:text-foreground">{heading}</h1>
            <p className="text-sm text-muted-foreground">
              {results.length} of {LISTINGS.length} homes
              {search.query && (
                <>
                  {" "}
                  matching <span className="font-semibold text-foreground">“{search.query}”</span>
                </>
              )}
            </p>
          </div>

          {search.tab !== "buy" && (
            <p className="mt-3 rounded-2xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
              This is a preview. {heading} open up when Reasy launches on 1 November 2026, so for now
              you're seeing homes for sale.
            </p>
          )}

          {results.length === 0 ? (
            <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <IconHomeSearch className="size-6" stroke={1.75} />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-foreground">No homes match that search yet</h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Try a nearby suburb, a wider price range or fewer filters. New homes are added by owners every week.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-strong"
              >
                Clear filters and see all homes
              </button>
            </div>
          ) : (
            <>
              <div className={cn("mt-6 grid gap-5 sm:grid-cols-2", mobileView === "map" && "hidden lg:grid")}>
                {results.map((l) => (
                  <PropertyCard key={l.id} listing={l} saved={saved.has(l.id)} onToggleSave={() => toggleSave(l.id)} onHover={setHoverId} />
                ))}
              </div>
              {mobileView === "map" && (
                <div className="mt-6 h-[70dvh] overflow-hidden rounded-3xl ring-1 ring-border lg:hidden">
                  <BrowseMap listings={results} total={LISTINGS.length} />
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: map, pinned while the list scrolls */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 h-[calc(100dvh-7.5rem)] overflow-hidden rounded-3xl ring-1 ring-border">
            <BrowseMap listings={results} total={LISTINGS.length} highlightId={hoverId} />
          </div>
        </aside>
      </main>

      {/* Mobile list / map switch */}
      <button
        type="button"
        onClick={() => setMobileView((v) => (v === "list" ? "map" : "list"))}
        className="fixed bottom-6 left-1/2 z-40 inline-flex h-11 -translate-x-1/2 items-center gap-2 rounded-full bg-brand-dark px-5 text-sm font-semibold text-white shadow-xl lg:hidden"
      >
        {mobileView === "list" ? <IconMap className="size-4" /> : <IconList className="size-4" />}
        {mobileView === "list" ? "Map" : "List"}
      </button>

      <Footer />
    </div>
  )
}
