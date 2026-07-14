import { useState, useEffect } from "react"
import { BuyersPage } from "@/components/buyers-page"
import { PrivacyPage } from "@/components/privacy-page"
import { TermsPage } from "@/components/terms-page"
import { WelcomeOverlay } from "@/components/welcome-overlay"

// TEMPORARY GATE: while the site is pre-launch, the only routes are the
// "Agents are NOT welcome here" landing (every path except the one below) and
// the For Buyers page it links to. The full site still lives in the codebase
// (home-page, home-alt-page, privacy-page, terms-page) — restore their routes
// here to bring them back.
function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  if (path === "/for-buyers") return <BuyersPage />
  if (path === "/privacy") return <PrivacyPage />
  if (path === "/terms") return <TermsPage />

  // Everything else lands on the temporary home gate.
  return (
    <div className="min-h-screen bg-[#050e1c]">
      <WelcomeOverlay delay={0} />
    </div>
  )
}

export default App
