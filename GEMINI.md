# Singapore Mobile Proxy

The `singapore-proxy` MCP server sends requests out through a real Singapore 4G/5G mobile
connection (Singapore carrier SIMs, modems run in Singapore).

- `fetch_url`: fetch a page as markdown, text or HTML, seen from Singapore. Use it to check
  local prices, currency, region-locked content, or sites that block datacenter IPs.
- `search_web`: search the web with Singapore-localised results (titles, links, snippets).
- `rotate_ip`: switch to a fresh Singapore mobile IP. Only when the user asks, or a site has
  blocked the current IP.
- `my_proxy_status`: current exit IP, carrier and data remaining.

The first tool call opens a browser sign-in for the user's Singapore Mobile Proxy account
(https://singaporemobileproxy.com). An account with an active proxy is required.
