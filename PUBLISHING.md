# Publishing / listing this server

Distribution order of leverage. The GitHub repo is the source; registries ingest from it.

## 1. Official MCP Registry (registry.modelcontextprotocol.io)

The canonical registry. Uses `server.json` (in this repo) + the `mcp-publisher` CLI.

```bash
# install the publisher (Go) -- see https://github.com/modelcontextprotocol/registry
brew install mcp-publisher        # or: go install .../cmd/mcp-publisher@latest

cd singapore-proxy-mcp
mcp-publisher login github         # OAuth as the GitHub owner of io.github.Xavierfok/*
mcp-publisher publish              # validates + publishes server.json
```

Namespace `io.github.Xavierfok/singapore-proxy-mcp` is verified by GitHub login (you must
own the `Xavierfok` account). Alternative branded namespace: `com.singaporemobileproxy/...`
verified via a DNS TXT record - use `mcp-publisher login dns` if you prefer that.

### Version numbers

Two different numbers live in `server.json`:

- `packages[0].version` is the **npm** release the registry entry points at. It must equal
  `package.json`, `package-lock.json` and `plugin.json`.
- the top-level `version` is the **registry entry** itself. The registry never lets a version be
  reused, and it already holds 1.0.0, 1.0.1 and 1.0.2 (1.0.2 points at npm 1.0.1), so this one
  can run ahead of npm but never behind it.

`node scripts/check-versions.js` checks both rules and runs in CI. For the next launcher change,
bump npm and the registry entry together to the same new number (1.0.3): `package.json`,
`package-lock.json`, `plugin.json`, both `server.json` fields, then tag `v1.0.3` and push the tag
(`publish.yml`), and only after npm has the version run `mcp-publisher publish`.

## 2. Aggregator directories (where people browse)

- **Glama** - https://glama.ai/mcp/servers - auto-indexes public GitHub MCP repos; usually just needs the repo to exist (it crawls). Submit at glama.ai if not picked up.
- **mcp.so** - https://mcp.so/submit - largest catalog, submit the GitHub URL.
- **PulseMCP** - https://www.pulsemcp.com/submit - submit the repo / endpoint.
- **Smithery** - https://smithery.ai - supports remote servers; add via their dashboard/CLI.
- **GitHub MCP Registry** - listed automatically once in the official registry above.

For all of these, list it as a **remote** server with:
- endpoint: `https://mcp.singaporemobileproxy.com/mcp`
- transport: streamable-http
- auth: `x-api-key` header (free key at singaporemobileproxy.com/client/mcp)

## 3. Optional: npm shim (for people who search npm)

Publish a tiny package whose `bin` just runs `mcp-remote <endpoint>`, so
`npx singapore-proxy-mcp` works. Not required - `mcp-remote` already covers it - but it
adds an npm discovery surface.

## 4. Communities (drive the first installs)

Show HN, r/mcp, r/ClaudeAI, r/cursor, r/webscraping, dev.to, X/Threads. Lead with the
Singapore-specialist angle, not "another proxy".
