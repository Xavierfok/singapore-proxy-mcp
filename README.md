# Singapore Proxy MCP

**Browse the web as if you were on a Singapore mobile network.** Give Claude, Cursor,
Cline, or any MCP agent a real Singapore mobile IP (SingTel / StarHub / M1 carrier
ASNs) to fetch pages, run Singapore-localized Google searches, and check geo-locked
content - something the agent cannot do on its own because it can't set a proxy.

> The Singapore web, as your AI sees it.

This is a **hosted (remote) MCP server**. You don't install or run any code - you point
your client at the endpoint with a free API key and it works.

## Quick start (30 seconds)

1. Get a free key (includes 10GB): **https://singaporemobileproxy.com/client/mcp**
2. Add the server to your client:

**Claude Desktop / Cursor / Cline / Windsurf** (`claude_desktop_config.json`, `~/.cursor/mcp.json`, etc.):

```json
{
  "mcpServers": {
    "singapore-proxy": {
      "command": "npx",
      "args": ["-y", "singapore-proxy-mcp"],
      "env": { "SMP_API_KEY": "sk_your_key_here" }
    }
  }
}
```

(`singapore-proxy-mcp` is a thin launcher around [`mcp-remote`](https://www.npmjs.com/package/mcp-remote)
pointed at the hosted endpoint. If you prefer, you can call `mcp-remote` directly:
`npx -y mcp-remote https://mcp.singaporemobileproxy.com/mcp --header "x-api-key:${SMP_API_KEY}"`.)

**Claude.ai / clients with native remote MCP:** add a custom connector for
`https://mcp.singaporemobileproxy.com/mcp` with header `x-api-key: <your key>`.

3. Ask your agent: *"use my_proxy_status"* - it should report a Singapore mobile exit IP.

## Tools

| Tool | What it does |
|------|--------------|
| `fetch_url(url, format)` | Fetch a page through a SG mobile IP (markdown / text / html) |
| `search_google(query, num)` | Singapore-localized Google organic results (`gl=sg`) |
| `rotate_ip()` | Get a fresh Singapore mobile IP |
| `my_proxy_status()` | Current exit IP, carrier, remaining quota |

## Why a specialist

Global proxy MCP servers (Bright Data, Oxylabs, Apify) are generalists. This one does
**only Singapore**, on real mobile-carrier ASNs that are hard to source and high-trust.

Use cases: SERP / SEO / ad verification from a real SG IP, e-commerce and app-store
availability + pricing checks in Singapore, scraping SG geo-gated sites for agents,
PDPA / localization QA.

## Pricing

Free 10GB to start at [singaporemobileproxy.com/client/mcp](https://singaporemobileproxy.com/client/mcp).
Heavy use upgrades to a dedicated Singapore mobile proxy subscription - the same proxy
works over HTTP/SOCKS outside MCP too.

## Endpoint

`https://mcp.singaporemobileproxy.com/mcp` - Streamable HTTP, auth via `x-api-key` header.

---

Built on the SingaporeMobileProxy farm. Not affiliated with Anthropic, Google, or any carrier.
See [PUBLISHING.md](./PUBLISHING.md) for how this server is listed in MCP registries.
