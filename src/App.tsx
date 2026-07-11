import { useState, useEffect } from "react"
import { HomePage } from "@/components/home-page"
import { HomeAltPage } from "@/components/home-alt-page"
import { BuyersPage } from "@/components/buyers-page"
import { PrivacyPage } from "@/components/privacy-page"
import { TermsPage } from "@/components/terms-page"

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

  if (path === "/home") return <HomePage />
  if (path === "/for-buyers") return <BuyersPage />
  if (path === "/privacy") return <PrivacyPage />
  if (path === "/terms") return <TermsPage />
  if (path === "/home-alt") return <HomeAltPage />
  return <HomeAltPage />
}

export default App
