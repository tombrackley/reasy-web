import { useMemo, useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { AnnouncementBar, Footer, Nav } from "@/components/new-home-page"
import { BrowseMap } from "@/components/browse-map"
import { FiltersOverlay } from "@/components/filters-overlay"
import {
  IconAdjustmentsHorizontal,
  IconArrowRight,
  IconBath,
  IconBed,
  IconCalendar,
  IconCar,
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
  SUBURBS,
  activeCount,
  filtersFromParams,
  filtersToParams,
  formatTimeOnMarket,
  matches,
  nextInspectionLabel,
  type BrowseFilters,
  type Listing,
} from "@/data/listings"

// --- Shared bits ---

type SearchState = BrowseFilters & { ai: boolean }

function readSearch(): SearchState {
  const p = new URLSearchParams(window.location.search)
  return { ...filtersFromParams(p), ai: p.get("ai") !== "0" }
}

function searchUrl(s: SearchState) {
  const p = filtersToParams(s)
  if (!s.ai) p.set("ai", "0")
  const qs = p.toString()
  return `/browse/results${qs ? `?${qs}` : ""}`
}

function FiltersButton({ count, onClick, className }: { count: number; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
        count ? "border-primary bg-secondary text-secondary-foreground" : "border-border bg-card text-foreground hover:bg-accent",
        className
      )}
    >
      <IconAdjustmentsHorizontal className="size-5" stroke={1.75} />
      Filters
      {count > 0 && (
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
          {count}
        </span>
      )}
    </button>
  )
}

// --- Search bar (one rounded bar: input, filters, search) ---

function SearchBox({ initial }: { initial: SearchState }) {
  const [state, setState] = useState(initial)
  const [showFilters, setShowFilters] = useState(false)
  const patch = (next: Partial<SearchState>) => setState((s) => ({ ...s, ...next }))
  const count = useMemo(() => LISTINGS.filter((l) => matches(l, state)).length, [state])
  const go = () => {
    window.location.href = searchUrl(state)
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    go()
  }

  return (
    <div className="mx-auto w-full max-w-4xl text-left">
      <form
        onSubmit={submit}
        className="flex flex-col gap-2 rounded-3xl bg-card p-2 shadow-2xl md:flex-row md:items-center md:rounded-full"
      >
        <label className="flex min-w-0 flex-1 items-center gap-3 pl-4">
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
          <FiltersButton count={activeCount(state)} onClick={() => setShowFilters(true)} className="h-12 flex-1 px-5 text-base md:flex-none" />
          <button
            type="submit"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary-strong focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px md:flex-none"
          >
            Search
          </button>
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

      {showFilters && (
        <FiltersOverlay
          filters={state}
          resultCount={count}
          onChange={patch}
          onClear={() => patch({ ...EMPTY_FILTERS, query: state.query })}
          onClose={() => setShowFilters(false)}
          onApply={go}
        />
      )}
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
              <SearchBox initial={{ ...EMPTY_FILTERS, ai: true }} />
            </div>
          </div>
        </section>

        <Reveal>
          <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-8 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-4xl leading-[1.1] text-brand-dark md:text-5xl dark:text-foreground">
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
  const [showFilters, setShowFilters] = useState(false)

  // Filters apply straight away and stay in the address bar
  const update = (next: Partial<SearchState>) => {
    setSearch((prev) => {
      const merged = { ...prev, ...next }
      window.history.replaceState(null, "", searchUrl(merged))
      return merged
    })
  }
  const clearAll = () => {
    setDraft("")
    update({ ...EMPTY_FILTERS })
  }

  const results = useMemo(() => LISTINGS.filter((l) => matches(l, search)), [search])
  const filterCount = activeCount(search)
  const toggleSave = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

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
            <FiltersButton count={filterCount} onClick={() => setShowFilters(true)} className="h-10 px-4 text-sm" />
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
            {(filterCount > 0 || search.query) && (
              <button type="button" onClick={clearAll} className="px-2 text-sm font-semibold text-primary hover:underline">
                Clear all
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="font-display text-4xl leading-tight text-brand-dark dark:text-foreground">Homes for sale</h1>
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

      {showFilters && (
        <FiltersOverlay
          filters={search}
          resultCount={results.length}
          onChange={update}
          onClear={() => update({ ...EMPTY_FILTERS, query: search.query })}
          onClose={() => setShowFilters(false)}
          onApply={() => setShowFilters(false)}
        />
      )}

      <Footer />
    </div>
  )
}
