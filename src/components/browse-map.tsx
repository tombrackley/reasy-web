import { useState } from "react"
import { cn } from "@/lib/utils"
import { IconBath, IconBed, IconCar, IconMinus, IconPlus, IconVectorTriangle, IconX } from "@tabler/icons-react"
import { mapPinPosition, type Listing } from "@/data/listings"

// A drawn, north-up coastline suggesting the Gold Coast strip: ocean to the
// east, land to the west, a river inlet and a faint street grid. Ported from
// reasy-app's BrowseMap. It's illustration rather than UI, so the map's own
// land and water colours live here instead of in the theme tokens.
function CoastlineArt() {
  const landPath =
    "M0,0 L165,0 C150,55 180,95 158,150 C130,190 172,225 150,280 C120,320 182,360 158,415 C132,455 178,495 155,555 C125,595 180,635 160,690 C138,730 168,760 150,800 L0,800 Z"

  return (
    <svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <linearGradient id="browse-map-ocean" x1="20%" y1="0%" x2="100%" y2="10%">
          <stop offset="0%" stopColor="#d6ecf6" />
          <stop offset="100%" stopColor="#9dccdf" />
        </linearGradient>
        <clipPath id="browse-map-land-clip">
          <path d={landPath} />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="400" height="800" fill="url(#browse-map-ocean)" />
      <g clipPath="url(#browse-map-land-clip)">
        <rect x="0" y="0" width="400" height="800" fill="#eee7d6" />
        <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5">
          {[90, 230, 370, 510, 650].map((y) => (
            <line key={y} x1="0" y1={y} x2="170" y2={y} />
          ))}
          <line x1="60" y1="0" x2="60" y2="800" />
          <line x1="120" y1="0" x2="120" y2="800" />
        </g>
        <path d="M0,330 C40,340 70,360 60,400 C50,440 90,455 110,420" fill="none" stroke="#a9d3e6" strokeWidth="10" strokeLinecap="round" />
      </g>
      <path d={landPath} fill="none" stroke="#f6efd9" strokeWidth="5" />
    </svg>
  )
}

function Spec({ icon: Icon, value }: { icon: typeof IconBed; value: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="size-3.5" stroke={1.75} />
      {value}
    </span>
  )
}

/**
 * Drawn map with price pins. Zoom and Map/Satellite controls are decorative.
 * `highlightId` lets the results list light up a pin while a card is hovered.
 */
export function BrowseMap({
  listings,
  total,
  highlightId,
}: {
  listings: Listing[]
  total: number
  highlightId?: string | null
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [liveUpdate, setLiveUpdate] = useState(true)
  // A pin that's been filtered out can't stay selected
  const selected = listings.find((l) => l.id === selectedId) ?? null

  return (
    <div className="relative size-full overflow-hidden bg-sky">
      <CoastlineArt />

      {listings.map((l) => {
        const pos = mapPinPosition(l.id)
        const on = l.id === selected?.id || l.id === highlightId
        return (
          <button
            key={l.id}
            type="button"
            onClick={() => setSelectedId(l.id === selectedId ? null : l.id)}
            aria-label={`${l.price}, ${l.address}`}
            aria-pressed={l.id === selectedId}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-full rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-md outline-none transition-transform hover:z-20 hover:scale-105 focus-visible:ring-3 focus-visible:ring-white/70",
              on ? "z-20 scale-110 bg-brand-dark" : "z-10 bg-primary"
            )}
            style={{ top: pos.top, left: pos.left }}
          >
            {l.price}
          </button>
        )
      })}

      <div className="absolute left-4 top-4 rounded-full bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-md">
        Showing {listings.length} of {total} homes
      </div>

      <label className="absolute right-4 top-4 z-20 hidden cursor-pointer items-center gap-2.5 rounded-full bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-md xl:flex">
        <input type="checkbox" className="sr-only" checked={liveUpdate} onChange={(e) => setLiveUpdate(e.target.checked)} />
        Update as map moves
        <span aria-hidden className={cn("inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors", liveUpdate ? "bg-primary" : "bg-border")}>
          <span className={cn("size-4 rounded-full bg-white transition-transform", liveUpdate && "translate-x-4")} />
        </span>
      </label>

      {selected && (
        <div className="absolute bottom-4 left-4 z-30 w-72 overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="relative">
            <img src={selected.imageUrl} alt="" className="h-32 w-full object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
              For sale
            </span>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex size-7 items-center justify-center rounded-full bg-card/90 text-foreground hover:bg-card"
            >
              <IconX className="size-3.5" stroke={2.5} />
            </button>
          </div>
          <div className="flex flex-col gap-1.5 p-4">
            <span className="font-display text-2xl leading-none text-foreground">{selected.price}</span>
            <span className="text-sm font-medium text-foreground">{selected.address}</span>
            <span className="text-sm text-muted-foreground">{selected.suburb}</span>
            <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {selected.beds > 0 && <Spec icon={IconBed} value={`${selected.beds} bed`} />}
              {selected.baths > 0 && <Spec icon={IconBath} value={`${selected.baths} bath`} />}
              {selected.cars > 0 && <Spec icon={IconCar} value={`${selected.cars} car`} />}
              {selected.landSqm > 0 && <Spec icon={IconVectorTriangle} value={`${selected.landSqm}sqm`} />}
            </span>
          </div>
        </div>
      )}

      <div className="absolute bottom-16 right-4 flex flex-col overflow-hidden rounded-xl bg-card shadow-md">
        <button type="button" aria-label="Zoom in" className="flex size-9 items-center justify-center border-b border-border text-foreground hover:bg-accent">
          <IconPlus className="size-4" />
        </button>
        <button type="button" aria-label="Zoom out" className="flex size-9 items-center justify-center text-foreground hover:bg-accent">
          <IconMinus className="size-4" />
        </button>
      </div>
      <div className="absolute bottom-4 right-4 inline-flex overflow-hidden rounded-full bg-card text-sm font-medium shadow-md">
        <button type="button" className="bg-accent px-3.5 py-2 text-foreground">
          Map
        </button>
        <button type="button" className="px-3.5 py-2 text-muted-foreground hover:bg-accent">
          Satellite
        </button>
      </div>
    </div>
  )
}
