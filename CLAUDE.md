<!-- clief-layer-1:start (generated; this block is refreshed by /clief-layer-1) -->
# singapore-proxy-mcp

## what this project is
npm launcher + registry listing for the hosted Singapore proxy MCP server (lets Claude/Cursor/Cline browse the web through real SG mobile carrier IPs). the actual server code is NOT here: it lives in the SMP controller (`app/mcp/` in `~/proxysmart-controller`, served at https://mcp.singaporemobileproxy.com/mcp from .46). this repo is distribution only: launcher, registry manifest, docs, launch assets. published to the official MCP registry as io.github.Xavierfok/singapore-proxy-mcp.

## folder structure
```
singapore-proxy-mcp/
├── cli.js          # the npm launcher
├── package.json    # npm package singapore-proxy-mcp
├── server.json     # MCP registry manifest
├── PUBLISHING.md   # publish runbook (registry JWT expires in minutes; login right before publish)
├── README.md       # the public listing copy
├── examples/       # client config examples
└── launch/         # launch/listing assets
```

## naming conventions
- flat root files; UPPERCASE.md for docs, lowercase js/json for code + manifests

## where things go
- launcher changes → cli.js (+ bump version in package.json)
- registry metadata → server.json
- listing/marketing copy → README.md + launch/
- client setup snippets → examples/

## task routing table
| task | read first | skip | skills / agents |
|------|------------|------|-----------------|
| publish a new version | PUBLISHING.md, package.json, server.json | launch/ | github |
| change launcher behavior | cli.js, examples/ | launch/ | code-review |
| listing / marketing copy | README.md, launch/ | cli.js | humanizer |
| change MCP tools or server behavior | NOT here: ~/proxysmart-controller app/mcp/ | this whole repo | - |

## rooms (layer 2)
examples/ and launch/ each carry a context.md room guide. read it before working in that folder; if you change files in a room, refresh its context.md (or run /clief-layer-2 on it) before ending the session.
<!-- clief-layer-1:end -->
