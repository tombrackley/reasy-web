import { IconArrowLeft } from "@tabler/icons-react"
import logoImg from "@/assets/reasy-logo.svg"

type LegalLayoutProps = {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="border-b border-[#e6e6eb]">
        <div className="max-w-[880px] mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[14px] font-medium text-[#47474f] hover:text-foreground transition-colors">
            <IconArrowLeft className="size-4" />
            Back to home
          </a>
          <a href="/" aria-label="Reasy home">
            <img src={logoImg} alt="Reasy" className="h-6" />
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-16">
        <article className="max-w-[720px] mx-auto">
          <p className="font-['Roboto_Mono_Variable'] text-[13px] font-semibold uppercase leading-[15.6px] text-primary mb-3">
            Legal
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#020a0f] mb-4 leading-[1.15]">
            {title}
          </h1>
          <p className="text-[14px] text-[#7a7a7a] mb-12">
            Last updated: {lastUpdated}
          </p>
          <div className="prose-reasy">
            {children}
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e6e6eb] py-8 px-6">
        <div className="max-w-[880px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#7a7a7a]">
          <p>&copy; 2026 Reasy Pty Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
