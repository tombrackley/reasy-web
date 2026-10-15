// Demo marketplace listings for the public Browse pages. Ported from the
// reasy-app buyer Browse data (src/data/listings.ts there) so the website and
// the app show the same homes. Photos are Unsplash placeholders.

export type PropertyType = "house" | "apartment-unit" | "townhouse" | "land"

export const PROPERTY_TYPE_LABEL: Record<PropertyType, string> = {
  house: "House",
  "apartment-unit": "Apartment & Unit",
  townhouse: "Townhouse",
  land: "Land",
}

export type Listing = {
  id: string
  address: string
  suburb: string
  price: string
  priceValue: number
  propertyType: PropertyType
  beds: number
  baths: number
  cars: number
  imageUrl: string
  // Attribute ids (same vocabulary sellers tag their listing with), so a
  // search like "pool" or "walk to beach" finds something.
  attributes: string[]
  keywords?: string[]
  listedDaysAgo: number
  landSqm: number
}

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=60`

const BASE: Omit<Listing, "landSqm">[] = [
  { id: "sp1", address: "48 Marine Pde", suburb: "Burleigh Heads QLD", price: "$1.45m", priceValue: 1_450_000, propertyType: "house", beds: 4, baths: 2, cars: 2, imageUrl: img("photo-1600732143075-4ec4f7a4d8f3"), listedDaysAgo: 0, attributes: ["coastal", "recently-renovated", "single-storey", "water-views", "walk-to-beach", "outdoor-entertaining", "air-conditioning", "open-plan", "north-facing"], keywords: ["polished concrete"] },
  { id: "sp2", address: "12 Hawthorn Ave", suburb: "Surfers Paradise QLD", price: "$980k", priceValue: 980_000, propertyType: "house", beds: 3, baths: 2, cars: 1, imageUrl: img("photo-1587094313669-faf7668ed8a8"), listedDaysAgo: 1, attributes: ["queenslander", "original-condition", "double-storey", "floorboards", "high-ceilings", "fenced-yard", "garden", "deck-patio", "quiet-street"] },
  { id: "sp3", address: "7/210 Ferny Ave", suburb: "Surfers Paradise QLD", price: "$1.12m", priceValue: 1_120_000, propertyType: "apartment-unit", beds: 2, baths: 2, cars: 1, imageUrl: img("photo-1639817278561-6f44925cff25"), listedDaysAgo: 2, attributes: ["contemporary", "low-maintenance", "water-views", "balcony", "secure-parking", "air-conditioning", "near-transport", "walk-to-shops"] },
  { id: "sp4", address: "15 Hilltop Cres", suburb: "Nerang QLD", price: "$1.30m", priceValue: 1_300_000, propertyType: "house", beds: 5, baths: 3, cars: 2, imageUrl: img("photo-1666000346172-8e7e87547d2a"), listedDaysAgo: 3, attributes: ["contemporary", "double-storey", "pool", "outdoor-entertaining", "study", "double-garage", "solar-panels", "scenic-views", "fenced-yard", "ducted-climate"] },
  { id: "sp5", address: "88 Esplanade", suburb: "Mermaid Beach QLD", price: "$2.10m", priceValue: 2_100_000, propertyType: "house", beds: 4, baths: 3, cars: 2, imageUrl: img("photo-1600645174997-bea67efe2fd1"), listedDaysAgo: 5, attributes: ["hamptons", "recently-renovated", "water-views", "walk-to-beach", "pool", "open-plan", "walk-in-pantry", "high-ceilings", "north-facing", "outdoor-entertaining"], keywords: ["marble benchtops"] },
  { id: "sp6", address: "5 Banksia St", suburb: "Robina QLD", price: "$890k", priceValue: 890_000, propertyType: "townhouse", beds: 3, baths: 1, cars: 1, imageUrl: img("photo-1733630769178-47c3433371ee"), listedDaysAgo: 7, attributes: ["minimalist", "low-maintenance", "double-storey", "air-conditioning", "secure-parking", "walk-to-schools", "built-in-robes"] },
  { id: "sp7", address: "22 Pacific Ave", suburb: "Miami QLD", price: "$1.05m", priceValue: 1_050_000, propertyType: "house", beds: 3, baths: 2, cars: 2, imageUrl: img("photo-1733639516571-575618028339"), listedDaysAgo: 9, attributes: ["mid-century", "recently-renovated", "single-storey", "floorboards", "fireplace", "garden", "walk-to-beach", "quiet-street", "fenced-yard"] },
  { id: "sp8", address: "9 Ocean View Rd", suburb: "Palm Beach QLD", price: "$1.65m", priceValue: 1_650_000, propertyType: "house", beds: 4, baths: 2, cars: 2, imageUrl: img("photo-1733630769251-a8cb46e24c78"), listedDaysAgo: 12, attributes: ["coastal", "recently-renovated", "double-storey", "water-views", "walk-to-beach", "pool", "solar-panels", "battery", "outdoor-entertaining", "study"], keywords: ["ev ready"] },
  { id: "l1", address: "3 Coral Ave", suburb: "Broadbeach QLD", price: "$1.35m", priceValue: 1_350_000, propertyType: "house", beds: 3, baths: 2, cars: 2, imageUrl: img("photo-1598249467153-963a1ef910cf"), listedDaysAgo: 14, attributes: ["resort", "pool", "outdoor-entertaining", "air-conditioning", "walk-to-beach", "walk-to-shops", "double-garage", "low-maintenance"] },
  { id: "l2", address: "21 Sunset Blvd", suburb: "Broadbeach QLD", price: "$850k", priceValue: 850_000, propertyType: "apartment-unit", beds: 2, baths: 2, cars: 1, imageUrl: img("photo-1639781562869-10974b989721"), listedDaysAgo: 18, attributes: ["art-deco", "original-condition", "balcony", "near-transport", "walk-to-shops", "secure-parking", "floorboards"] },
  { id: "l3", address: "14 Seabreeze Ct", suburb: "Burleigh Heads QLD", price: "$1.05m", priceValue: 1_050_000, propertyType: "townhouse", beds: 3, baths: 2, cars: 2, imageUrl: img("photo-1579678929710-862f8e01c0b2"), listedDaysAgo: 21, attributes: ["coastal", "low-maintenance", "double-storey", "walk-to-beach", "deck-patio", "built-in-robes", "air-conditioning", "secure-parking"] },
  { id: "l4", address: "6/88 Garfield Tce", suburb: "Surfers Paradise QLD", price: "$650k", priceValue: 650_000, propertyType: "apartment-unit", beds: 2, baths: 1, cars: 1, imageUrl: img("photo-1737026891193-9d7620a6be80"), listedDaysAgo: 26, attributes: ["industrial", "high-ceilings", "balcony", "near-transport", "walk-to-shops", "air-conditioning"], keywords: ["loft"] },
  { id: "l5", address: "40 Ridgewood Dr", suburb: "Nerang QLD", price: "$980k", priceValue: 980_000, propertyType: "house", beds: 4, baths: 2, cars: 2, imageUrl: img("photo-1720175338668-2e96d090d780"), listedDaysAgo: 31, attributes: ["cottage", "single-storey", "garden", "fenced-yard", "shed-workshop", "solar-panels", "water-tank", "quiet-street", "fireplace"] },
  { id: "l6", address: "18 Palm Ct", suburb: "Mermaid Beach QLD", price: "$2.45m", priceValue: 2_450_000, propertyType: "house", beds: 5, baths: 4, cars: 3, imageUrl: img("photo-1733630769345-7d8db52ab95e"), listedDaysAgo: 38, attributes: ["hamptons", "double-storey", "pool", "water-views", "walk-to-beach", "open-plan", "walk-in-pantry", "high-ceilings", "double-garage", "ducted-climate", "outdoor-entertaining"], keywords: ["wine cellar"] },
  { id: "l7", address: "2 Hillcrest Rd", suburb: "Robina QLD", price: "$520k", priceValue: 520_000, propertyType: "land", beds: 0, baths: 0, cars: 0, imageUrl: img("photo-1591944130667-946ea5085dbc"), listedDaysAgo: 45, attributes: ["north-facing", "quiet-street", "walk-to-schools"], keywords: ["titled block"] },
  { id: "l8", address: "9 Coastal Way", suburb: "Miami QLD", price: "$1.18m", priceValue: 1_180_000, propertyType: "townhouse", beds: 3, baths: 2, cars: 2, imageUrl: img("photo-1733630769355-add8adcdd3c4"), listedDaysAgo: 52, attributes: ["mediterranean", "recently-renovated", "double-storey", "deck-patio", "secure-parking", "walk-to-beach", "air-conditioning", "built-in-robes"] },
  { id: "l9", address: "33 Bayview St", suburb: "Palm Beach QLD", price: "$790k", priceValue: 790_000, propertyType: "apartment-unit", beds: 2, baths: 2, cars: 1, imageUrl: img("photo-1685260396904-6ea36832f694"), listedDaysAgo: 61, attributes: ["federation", "original-condition", "floorboards", "high-ceilings", "balcony", "walk-to-shops", "near-transport"] },
  { id: "l10", address: "5 Lakeview Dr", suburb: "Broadbeach QLD", price: "$1.60m", priceValue: 1_600_000, propertyType: "house", beds: 4, baths: 3, cars: 2, imageUrl: img("photo-1720175328600-06f71cee36c4"), listedDaysAgo: 74, attributes: ["minimalist", "recently-renovated", "single-storey", "pool", "open-plan", "study", "solar-panels", "ev-charger", "double-glazing", "north-facing", "quiet-street"], keywords: ["smart home"] },
]

// Deterministic, so mock values (land size, pin position, open home) stay put
// between renders.
function hashString(value: string): number {
  let hash = 0
  for (const ch of value) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return hash
}

function landSizeFor(l: Omit<Listing, "landSqm">): number {
  const spread = hashString(`${l.id}:land`) % 100
  if (l.propertyType === "apartment-unit") return 0
  if (l.propertyType === "townhouse") return 200 + spread * 3
  return 400 + spread * 8
}

export const LISTINGS: Listing[] = BASE.map((l) => ({ ...l, landSqm: landSizeFor(l) }))

export const SUBURBS = Array.from(new Set(LISTINGS.map((l) => l.suburb))).sort()

// Stable, scattered pin placement on the drawn map, kept off the edges.
export function mapPinPosition(id: string): { top: string; left: string } {
  const top = 12 + (hashString(`${id}:top`) % 76)
  const left = 12 + (hashString(`${id}:left`) % 76)
  return { top: `${top}%`, left: `${left}%` }
}

export function formatTimeOnMarket(days: number): string {
  if (days <= 0) return "Added today"
  if (days === 1) return "Added yesterday"
  if (days < 14) return `Added ${days} days ago`
  return `${days} days on market`
}

const INSPECTION_TIMES = ["10:00am", "11:00am", "11:30am", "1:00pm", "2:00pm", "3:30pm"]

// A plausible upcoming open home for each listing: this or next Saturday,
// Sunday or Wednesday.
export function nextInspectionLabel(id: string): string {
  const hash = hashString(id)
  const today = new Date()
  const daysToSat = (6 - today.getDay() + 7) % 7 || 7
  const offsets = [daysToSat, daysToSat + 1, daysToSat + 4]
  const date = new Date(today)
  date.setDate(today.getDate() + offsets[hash % offsets.length])
  const day = date.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })
  return `${day}, ${INSPECTION_TIMES[hash % INSPECTION_TIMES.length]}`
}

export type BrowseFilters = {
  query: string
  type: PropertyType | ""
  beds: number
  priceMax: number
}

export const EMPTY_FILTERS: BrowseFilters = { query: "", type: "", beds: 0, priceMax: 0 }

// Loose keyword match: every word in the query has to appear somewhere in the
// listing's address, suburb, type, attributes or keywords. Numbers like
// "4 bed" also set a minimum bedroom count.
export function matches(l: Listing, f: BrowseFilters): boolean {
  if (f.type && l.propertyType !== f.type) return false
  if (f.beds && l.beds < f.beds) return false
  if (f.priceMax && l.priceValue > f.priceMax) return false

  const query = f.query.toLowerCase().trim()
  if (!query) return true

  const bedMatch = query.match(/(\d)\s*(bed|br|bedroom)/)
  if (bedMatch && l.beds < Number(bedMatch[1])) return false

  const haystack = [
    l.address,
    l.suburb,
    PROPERTY_TYPE_LABEL[l.propertyType],
    ...l.attributes.map((a) => a.replace(/-/g, " ")),
    ...(l.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase()

  const ignore = new Set(["a", "an", "the", "in", "near", "with", "and", "to", "for", "of", "qld", "bed", "beds", "bedroom", "bedrooms", "bath", "baths", "home", "homes", "property", "properties"])
  const words = query
    .replace(/(\d)\s*(bed|br|bedroom)s?/g, "")
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !ignore.has(w) && !/^\d+$/.test(w))

  // "houses" should still match "house"
  return words.every((w) => haystack.includes(w) || haystack.includes(w.replace(/s$/, "")))
}
