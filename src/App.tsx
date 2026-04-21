import { useState, useEffect } from "react"
import { HomePageV2 } from "@/components/home-page-v2"
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

  if (path === "/privacy") return <PrivacyPage />
  if (path === "/terms") return <TermsPage />
  return <HomePageV2 />
}

export default App
