# Singapore Proxy MCP

**Browse the web as if you were on a Singapore mobile network.** Give Claude, Cursor,
Cline, or any MCP agent a real Singapore mobile IP (Singtel and M1 carrier networks)
to fetch pages, run Singapore-localized Google searches, and check geo-locked
content - something the agent cannot do on its own because it can't set a proxy.

> The Singapore web, as your AI sees it.

This is a **hosted (remote) MCP server**. You don't install or run any code - you point
your client at the endpoint with an API key and it works.

## Quick start (30 seconds)

1. Get a key with a free 24-hour trial (10GB): **https://singaporemobileproxy.com/client/mcp?utm_source=github&utm_medium=repo&utm_campaign=singapore_proxy_mcp**
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
**only Singapore**, on dedicated 4G lines on the Singtel and M1 networks. Sites treat those
IPs like any other phone on the network, because that's what they are.

Use cases: SERP / SEO / ad verification from a real SG IP, e-commerce and app-store
availability + pricing checks in Singapore, scraping SG geo-gated sites for agents,
PDPA / localization QA.

## Pricing

The key comes with a free 24-hour trial, capped at 10GB, one per email. After that the same key
keeps working on a dedicated Singapore mobile proxy: **$4 for a day or $13 for a week**, or
monthly from $40 (see
[plans](https://singaporemobileproxy.com/client/plans?days=1&utm_source=github&utm_medium=repo&utm_campaign=singapore_proxy_mcp)).
The same proxy works over plain HTTP/SOCKS outside MCP too.

## Endpoint

`https://mcp.singaporemobileproxy.com/mcp` - Streamable HTTP, auth via `x-api-key` header.

---

Built on the SingaporeMobileProxy farm. Not affiliated with Anthropic, Google, or any carrier.
See [PUBLISHING.md](./PUBLISHING.md) for how this server is listed in MCP registries.
