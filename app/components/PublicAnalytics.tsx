"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { startPublicAnalytics } from "@/lib/analytics/tracker"

export function PublicAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname?.startsWith("/dashboard")) return
    return startPublicAnalytics()
  }, [pathname])

  return null
}
