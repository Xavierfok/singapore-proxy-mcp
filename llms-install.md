# Installing Singapore Proxy MCP (for AI agents)

This is a hosted MCP server. There is nothing to clone or build.

1. Ask the user for their API key. If they don't have one, send them to
   https://singaporemobileproxy.com/client/mcp to get a free 24-hour trial key (10GB).
   Keys look like `sk_...`.
2. Add this entry to the MCP settings file (for Cline: `cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "singapore-proxy": {
      "command": "npx",
      "args": ["-y", "singapore-proxy-mcp"],
      "env": { "SMP_API_KEY": "<the user's key>" }
    }
  }
}
```

   Requires Node.js 18 or newer. The launcher connects to
   `https://mcp.singaporemobileproxy.com/mcp` (Streamable HTTP) and sends the key as the
   `x-api-key` header.

3. Verify: call the `my_proxy_status` tool. It should return a Singapore mobile exit IP and
   the carrier (Singtel or M1). If it says "API key is invalid.", the key is wrong or expired.

Tools: `fetch_url`, `search_google`, `rotate_ip`, `my_proxy_status`.
