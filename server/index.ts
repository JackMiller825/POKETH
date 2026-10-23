import { createServer } from "node:http"
import path from "node:path"
import { createApp } from "./createApp.ts"

const dataDir = process.env.POKEETH_DATA_DIR ?? path.join(process.cwd(), "data")
const port = Number(process.env.PORT ?? 4173)
const host = process.env.HOST ?? "127.0.0.1"
const trustedProxies = (process.env.TRUSTED_PROXIES ?? "127.0.0.1,::1")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean)
const trustProxy =
  process.env.TRUST_PROXY === "0"
    ? false
    : process.env.TRUST_PROXY === "1" || trustedProxies.length > 0
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "https://poketh.site,https://www.poketh.site")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean)

const app = createApp({
  dataDir,
  nodeEnv: process.env.NODE_ENV ?? "production",
  trustProxy,
  trustedProxies,
  trustedIpHeader: process.env.TRUSTED_IP_HEADER ?? "x-forwarded-for",
  allowedOrigins,
})

const server = createServer((req, res) => {
  void app.handle(req, res)
})

server.on("error", () => {
  console.error("The PokeETH analytics server could not listen. Choose another PORT if this one is already in use.")
  app.close()
  process.exit(1)
})

server.listen(port, host, () => {
  console.log(`PokeETH analytics API listening on http://${host}:${port}/`)
  console.log(`Allowed origins: ${allowedOrigins.join(", ") || "(none)"}`)
})

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close()
    app.close()
  })
}
