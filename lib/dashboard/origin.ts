const HOSTED_API = process.env.NEXT_PUBLIC_ANALYTICS_API ?? "https://pokeeth.103.161.35.238.sslip.io"

export function apiOrigin(): string {
  if (typeof location === "undefined") return ""
  const host = location.hostname.toLowerCase()
  if (host === "poketh.site" || host === "www.poketh.site") return HOSTED_API
  if (host === "localhost" || host === "127.0.0.1") {
    return process.env.NEXT_PUBLIC_ANALYTICS_DEV ?? "http://127.0.0.1:4173"
  }
  return HOSTED_API
}

export function apiUrl(path: string): string {
  return `${apiOrigin()}${path}`
}
