import { useMemo } from "react"
import { cn } from "@/lib/utils"

export type NodeShape = "sign" | "key" | null

// Pixel-art targets. "#" is a node, "." is empty. The For Sale sign (sellers)
// is drawn at full 30 x 30 so its lettering reads; the house key (buyers) is
// drawn at 18 x 18 and scaled up.
const SIGN = [
  "..............................",
  "...##########################.",
  "...##########################.",
  "...##.......#...........#.....",
  "...##.......#...........#.....",
  "...##...#####################.",
  "...##...#####################.",
  "...##...##.................##.",
  "...##...##...###.###.##....##.",
  "...##...##...#...#.#.#.#...##.",
  "...##...##...##..#.#.##....##.",
  "...##...##...#...#.#.#.#...##.",
  "...##...##...#...###.#.#...##.",
  "...##...##.................##.",
  "...##...##.###..#..#...###.##.",
  "...##...##.#...#.#.#...#...##.",
  "...##...##.###.###.#...##..##.",
  "...##...##...#.#.#.#...#...##.",
  "...##...##.###.#.#.###.###.##.",
  "...##...##.................##.",
  "...##...#####################.",
  "...##...#####################.",
  "...##.........................",
  "...##.........................",
  "...##.........................",
  "...##.........................",
  "...##.........................",
  "...##.........................",
  "#########.....................",
  "#########.....................",
]

const KEY = [
  "..................",
  "..................",
  "..................",
  "..................",
  "..................",
  "..#####...........",
  ".#######..........",
  "###...###.........",
  "##.....###########",
  "##.....###########",
  "###...###..##.#.##",
  ".#######...##.#.##",
  "..#####....##...##",
  "................##",
  "..................",
  "..................",
  "..................",
  "..................",
]

// Everything lands on a 30 x 30 grid of small squares
const GRID = 30
// Enough squares for the larger shape (the sign, 328 cells); spares fade out
const NODE_COUNT = 360
// Tiny, faint specks that always drift, so a formed shape never looks frozen
const SPECK_COUNT = 200

function cellsOf(art: string[]) {
  const cells: { x: number; y: number }[] = []
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      // Nearest-neighbour scale from the art's own size up to the grid
      const row = art[Math.floor((y * art.length) / GRID)]
      if (row[Math.floor((x * row.length) / GRID)] === "#") cells.push({ x, y })
    }
  }
  return cells
}

const SHAPES = { sign: cellsOf(SIGN), key: cellsOf(KEY) }

// Small deterministic PRNG so the scatter is the same on every load
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

/**
 * A field of small squares drifting on the right of the landing page. When a
 * buyer or seller card is hovered, the squares glide into place to draw a key
 * or a For Sale sign; any spare squares fade back. Decorative, desktop only.
 */
export function LandingNodes({ shape }: { shape: NodeShape }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => {
        // Idle spot: an irregular cloud rather than a box. Points are placed by
        // angle and distance from a centre; a wobble on the radius gives the
        // cloud a lumpy outline, density thins towards the edge, and a few
        // stragglers drift further out. It runs off the right of the page.
        // Anything that would land under the headline is re-rolled rather
        // than pushed back, so there's no hard edge on the left.
        let x = 0
        let y = 0
        let r = 0
        for (let t = 0; t < 6; t++) {
          const seed = i + t * 1000
          const angle = rand(seed + 1) * Math.PI * 2
          const wobble = 1 + 0.2 * Math.sin(3 * angle + 1.3) + 0.12 * Math.sin(5 * angle + 0.4)
          const straggler = rand(seed + 401) < 0.12 ? 1.35 : 1
          r = Math.pow(rand(seed + 101), 0.65) * wobble * straggler
          x = 62 + Math.cos(angle) * r * 62
          y = 50 + Math.sin(angle) * r * 72
          if (x >= 3) break
        }
        return {
          x: Math.max(3, Math.min(110, x)),
          y,
          // Brighter in the middle, fading towards the edge
          opacity: Math.max(0.1, 0.9 - 0.6 * r) * (0.7 + 0.3 * rand(i + 201)),
          // Desynchronise the gentle bob
          delay: -rand(i + 301) * 6,
        }
      }),
    []
  )
  const specks = useMemo(
    () =>
      Array.from({ length: SPECK_COUNT }, (_, i) => ({
        x: rand(i + 5001) * 105,
        y: -10 + rand(i + 5101) * 120,
        size: 0.8 + rand(i + 5201) * 1.1,
        opacity: 0.12 + rand(i + 5301) * 0.28,
        duration: 9 + rand(i + 5401) * 9,
        delay: -rand(i + 5501) * 18,
      })),
    []
  )
  const target = shape ? SHAPES[shape] : null
  const step = 100 / GRID

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] overflow-hidden lg:block">
      {/* Square stage, vertically centred, hugging the right side */}
      <div className="absolute right-[5%] top-1/2 aspect-square w-[min(34vw,72vh)] -translate-y-1/2">
        {/* Ambient specks: very faint at rest, a little brighter once a shape forms */}
        {specks.map((p, i) => (
          <span
            key={`speck-${i}`}
            className="absolute transition-opacity duration-700"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}%`,
              height: `${p.size}%`,
              opacity: target ? p.opacity : p.opacity * 0.4,
            }}
          >
            <span
              className="animate-speck-drift block size-full rounded-[30%] bg-white"
              style={{ animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}
            />
          </span>
        ))}

        {nodes.map((n, i) => {
          const cell = target?.[i]
          const formed = Boolean(cell)
          const hidden = Boolean(target) && !cell
          return (
            <span
              key={i}
              className="absolute size-[2.7%] transition-[left,top,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0"
              style={{
                left: `${cell ? cell.x * step : n.x}%`,
                top: `${cell ? cell.y * step : n.y}%`,
                // Spare squares dim right down but keep floating
                opacity: hidden ? n.opacity * 0.25 : formed ? 1 : n.opacity,
                transitionDelay: `${formed ? i * 2 : 0}ms`,
              }}
            >
              <span
                className={cn(
                  "block size-full rounded-[25%] bg-white",
                  !formed && "animate-node-float"
                )}
                style={{ animationDelay: `${n.delay}s` }}
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}
