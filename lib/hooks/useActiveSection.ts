import { useEffect, useState } from "react"

export type SectionId = "top" | "trainer" | "journey" | "badges" | "gallery" | "community"

const sectionIds: SectionId[] = ["top", "trainer", "journey", "badges", "gallery", "community"]

function sectionFromHash(): SectionId {
  const hash = window.location.hash.replace("#", "")
  const match = sectionIds.find((id) => id === hash)
  return match ?? "top"
}

export function useActiveSection(): SectionId {
  const [activeId, setActiveId] = useState<SectionId>(() => (typeof window === "undefined" ? "top" : sectionFromHash()))

  useEffect(() => {
    const onHashChange = () => setActiveId(sectionFromHash())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const id = visible?.target.id
        if (id && sectionIds.includes(id as SectionId)) {
          setActiveId(id as SectionId)
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("pokeeth-section", { detail: activeId }))
  }, [activeId])

  return activeId
}
