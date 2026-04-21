import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  IconHome,
  IconEye,
  IconMessageCircle,
  IconMapPin,
  IconArrowRight,
  IconBed,
  IconBath,
  IconCar,
  IconRuler,
  IconCamera,
  IconFileDescription,
  IconGavel,
  IconCheck,
  IconCircleDot,
  IconUserCheck,
  IconInbox,
  IconSparkles,
  IconPencil,
} from "@tabler/icons-react"

// ─── Mock Data ────────────────────────────────────────────────────────────────

const activeListing = {
  id: "1",
  address: "123 Main Dr",
  suburb: "Peregian Beach",
  state: "QLD",
  postcode: "4573",
  status: "Active" as const,
  daysOnMarket: 14,
  enquiries: 7,
  views: 1248,
  lastActivity: "2 hours ago",
  bedrooms: 4,
  bathrooms: 2,
  parking: 2,
  landSize: "650m²",
  imageUrl:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
}

const journeyStages = [
  { id: "list", label: "Create listing", done: true },
  { id: "photos", label: "Add photos", done: true },
  { id: "live", label: "Go live", done: true },
  { id: "enquiries", label: "Receive enquiries", active: true },
  { id: "offers", label: "Review offers", done: false },
  { id: "legal", label: "Legal & contracts", done: false },
  { id: "sold", label: "Sold", done: false },
]

const suggestedActions = [
  {
    id: "1",
    icon: <IconMessageCircle className="size-5" />,
    title: "Respond to Buyer #14",
    description:
      "They enquired about 123 Main Dr 35 minutes ago. A quick response keeps buyers engaged.",
    action: "Reply now",
    urgent: true,
  },
  {
    id: "2",
    icon: <IconUserCheck className="size-5" />,
    title: "Connect with a conveyancer",
    description:
      "You'll need legal representation before accepting any offers. We can help you find one.",
    action: "Find a conveyancer",
    urgent: false,
  },
  {
    id: "3",
    icon: <IconCamera className="size-5" />,
    title: "Add more photos to your listing",
    description:
      "Listings with 10+ photos get 3x more enquiries. You currently have 4.",
    action: "Upload photos",
    urgent: false,
  },
]

const recentMessages = [
  {
    id: "e1",
    buyer: "Buyer #14",
    preview: "Hi, is the property available for an inspection this weekend?",
    time: "35 min ago",
    unread: true,
  },
  {
    id: "e2",
    buyer: "Buyer #12",
    preview: "Thanks for the info. We're very interested and would like to...",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: "e3",
    buyer: "Buyer #9",
    preview: "Could you let us know the council rates for the property?",
    time: "1 day ago",
    unread: false,
  },
]

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const now = new Date()
  const hour = now.getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="relative bg-primary px-6 pb-44 pt-14 text-primary-foreground lg:px-24">
      <h1 className="font-serif text-5xl tracking-tight lg:text-6xl">
        {greeting}, Tom
      </h1>
      <div className="mt-6">
        <p className="text-base text-primary-foreground/70">
          Here's an overview of your listing at
        </p>
        <p className="mt-1 text-lg font-medium text-primary-foreground">
          {activeListing.address}, {activeListing.suburb} {activeListing.state},{" "}
          {activeListing.postcode}
        </p>
      </div>
    </div>
  )
}

// ─── Property Card with Inline Metrics ───────────────────────────────────────

function PropertyCard() {
  return (
    <div className="relative z-10 -mt-32 px-6 lg:px-24">
      <div className="overflow-hidden rounded-2xl bg-card shadow-lg">
        <div className="flex flex-col gap-6 p-6 md:flex-row">
          {/* Property image */}
          <div className="h-52 w-full shrink-0 overflow-hidden rounded-lg md:h-auto md:w-80">
            {activeListing.imageUrl ? (
              <img
                src={activeListing.imageUrl}
                alt={`${activeListing.address}, ${activeListing.suburb}`}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-muted">
                <IconHome className="size-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Property details + metrics */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">
                    {activeListing.address}
                  </h2>
                  <Badge variant="default">Active</Badge>
                </div>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <IconMapPin className="size-3.5" />
                  {activeListing.suburb}, {activeListing.state}{" "}
                  {activeListing.postcode}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                <IconPencil className="size-4" />
                Edit
              </Button>
            </div>

            {/* Property features */}
            <div className="flex items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <IconBed className="size-4" />
                {activeListing.bedrooms}
              </span>
              <span className="flex items-center gap-1.5">
                <IconBath className="size-4" />
                {activeListing.bathrooms}
              </span>
              <span className="flex items-center gap-1.5">
                <IconCar className="size-4" />
                {activeListing.parking}
              </span>
              <span className="flex items-center gap-1.5">
                <IconRuler className="size-4" />
                {activeListing.landSize}
              </span>
            </div>

            {/* Inline metrics strip */}
            <div className="flex items-center divide-x divide-border rounded-lg bg-muted/50 px-1 py-3">
              <div className="flex flex-1 flex-col items-center px-4">
                <span className="text-xs text-muted-foreground">Views</span>
                <span className="text-lg font-semibold tabular-nums">
                  {activeListing.views.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center px-4">
                <span className="text-xs text-muted-foreground">Enquiries</span>
                <span className="text-lg font-semibold tabular-nums">
                  {activeListing.enquiries}
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center px-4">
                <span className="text-xs text-muted-foreground">
                  Days listed
                </span>
                <span className="text-lg font-semibold tabular-nums">
                  {activeListing.daysOnMarket}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Selling Journey Timeline ────────────────────────────────────────────────

function SellingTimeline() {
  return (
    <div>
      <h3 className="text-base font-semibold">Your selling journey</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        You're currently receiving enquiries from interested buyers.
      </p>
      <div className="mt-6 flex items-center gap-0">
        {journeyStages.map((stage, i) => {
          const isLast = i === journeyStages.length - 1
          return (
            <div key={stage.id} className="flex items-center">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full text-sm font-medium",
                    stage.done &&
                      "bg-primary text-primary-foreground",
                    stage.active &&
                      "border-2 border-primary bg-card text-primary",
                    !stage.done &&
                      !stage.active &&
                      "border border-border bg-card text-muted-foreground"
                  )}
                >
                  {stage.done ? (
                    <IconCheck className="size-4" />
                  ) : stage.active ? (
                    <IconCircleDot className="size-4" />
                  ) : (
                    <span className="text-xs">{i + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 whitespace-nowrap text-xs",
                    stage.done && "font-medium text-foreground",
                    stage.active && "font-medium text-primary",
                    !stage.done && !stage.active && "text-muted-foreground"
                  )}
                >
                  {stage.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "mb-5 h-0.5 w-6 shrink-0 lg:w-10",
                    stage.done ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Suggested Actions ───────────────────────────────────────────────────────

function SuggestedActions() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <IconSparkles className="size-4 text-primary" />
        <h3 className="text-base font-semibold">Suggested for you</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Things you can do to keep your sale moving forward.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        {suggestedActions.map((action) => (
          <div
            key={action.id}
            className="flex items-start gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/30"
          >
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                action.urgent
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {action.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{action.title}</p>
                {action.urgent && (
                  <Badge variant="destructive" className="text-xs">
                    Urgent
                  </Badge>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              {action.action}
              <IconArrowRight className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Inbox Preview ───────────────────────────────────────────────────────────

function InboxPreview() {
  const unreadCount = recentMessages.filter((m) => m.unread).length

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconInbox className="size-4 text-muted-foreground" />
          <h3 className="text-base font-semibold">Inbox</h3>
          {unreadCount > 0 && (
            <Badge variant="default" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm">
          View all messages
          <IconArrowRight className="size-3.5" />
        </Button>
      </div>
      <div className="mt-4 flex flex-col divide-y divide-border overflow-hidden rounded-xl border bg-card">
        {recentMessages.map((msg) => (
          <a
            key={msg.id}
            href="#"
            className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/30"
          >
            {msg.unread && (
              <span className="size-2 shrink-0 rounded-full bg-primary" />
            )}
            {!msg.unread && <span className="size-2 shrink-0" />}
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-sm",
                  msg.unread ? "font-medium" : "text-muted-foreground"
                )}
              >
                {msg.buyer}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {msg.preview}
              </p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {msg.time}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Quick Links ─────────────────────────────────────────────────────────────

function QuickLinks() {
  const links = [
    {
      icon: <IconEye className="size-5" />,
      label: "View your listing",
      description: "See how buyers see your property",
    },
    {
      icon: <IconFileDescription className="size-5" />,
      label: "Documents & disclosures",
      description: "Manage contracts and required paperwork",
    },
    {
      icon: <IconGavel className="size-5" />,
      label: "Legal resources",
      description: "Understand your obligations as a seller",
    },
  ]

  return (
    <div>
      <h3 className="text-base font-semibold">Quick links</h3>
      <div className="mt-4 flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href="#"
            className="flex items-center gap-4 rounded-xl border bg-card px-4 py-3.5 transition-colors hover:bg-muted/30"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              {link.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{link.label}</p>
              <p className="text-sm text-muted-foreground">
                {link.description}
              </p>
            </div>
            <IconArrowRight className="size-4 shrink-0 text-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function SellerDashboard({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="seller-dashboard" {...props}>
      <HeroSection />
      <PropertyCard />

      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-10 lg:px-0">
        <SellingTimeline />
        <Separator />
        <SuggestedActions />
        <Separator />
        <InboxPreview />
        <Separator />
        <QuickLinks />
      </div>
    </div>
  )
}
