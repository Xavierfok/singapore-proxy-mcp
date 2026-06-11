---
target: r/mcp
type: forum-draft
status: draft (human sends, do not auto-post)
date: 2026-06-03
notes: lead with the singapore-specialist angle, not "another proxy". drop the link in the first comment, not the body, so it reads less like an ad. vary the opening if reposting to r/ClaudeAI or r/cursor.
---

# Title options (pick one)

1. I built an MCP server that gives your agent a real Singapore mobile IP
2. MCP server for fetching the web through a real SG mobile carrier IP (free 10GB to try)
3. Anyone else doing geo-specific fetch through MCP? I made one for Singapore

---

# Body

quick context on why this exists: Claude, Cursor and Cline can't set their own HTTP proxy, so the moment you need a page the way it actually resolves from a specific country, the agent is stuck. i run a small Singapore mobile proxy farm (real SingTel/StarHub/M1 SIMs, not datacenter ranges), so i wrapped it in an MCP server. the agent calls a tool, the request goes out through an actual phone on a SG network, the content comes back.

four tools so far:

- `fetch_url` - pull a page through a SG mobile IP, returns markdown / text / html
- `search_google` - singapore-localized google results (`gl=sg`), useful for SERP and ad-placement checks
- `rotate_ip` - fresh mobile IP
- `my_proxy_status` - current exit IP + carrier, so you can actually prove the geo

it's a hosted (remote) server, so there's nothing to run or compile locally. free 10GB to try it, and if you end up leaning on it heavily it just rolls into a normal proxy subscription. install is the usual `npx` block in your client config, or a remote connector if your client supports those natively.

on the "why only singapore" question i'll get: mobile carrier IPs are genuinely hard to source and they're high trust, so i'd rather do one country properly than ship a thinner version of Bright Data. the use cases people have hit me with so far are SG SERP / SEO checks, app-store and pricing availability inside Singapore, and scraping SG geo-gated sites for agents.

honestly more interested in feedback than installs right now: are these four the right tools, and is anyone else building geo-specific fetch on top of MCP? happy to get into how it's wired (FastMCP, streamable-http, keyed off the same bandwidth meter the proxy uses).

---

# First comment (drop the link here, not in the body)

repo + install: https://github.com/Xavierfok/singapore-proxy-mcp
free key (10GB): https://singaporemobileproxy.com/client/mcp
