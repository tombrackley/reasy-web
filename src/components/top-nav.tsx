import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { IconKey } from "@tabler/icons-react"
import logo from "@/assets/logo.png"

const navItems = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Listings", href: "#", active: false },
  { label: "Offers", href: "#", active: false },
  { label: "More", href: "#", active: false },
]

export function TopNav({ ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="top-nav"
      className="relative flex w-full items-center bg-card px-6 py-4"
      {...props}
    >
      {/* Logo */}
      <a href="#" className="shrink-0">
        <img src={logo} alt="Reasy" className="h-6" />
      </a>

      {/* Center nav */}
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors",
              item.active
                ? "text-brand-dark"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-3.5">
        <Button variant="outline" size="sm" className="rounded-full">
          <IconKey className="size-3.5" />
          Switch to buying
        </Button>
        <Avatar className="size-10 bg-brand-dark">
          <AvatarFallback className="bg-brand-dark text-sm font-medium text-primary-foreground">
            TB
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
