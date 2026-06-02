#!/usr/bin/env node
// singapore-proxy-mcp: launcher that bridges your MCP client to the hosted
// Singapore Proxy MCP server (https://mcp.singaporemobileproxy.com/mcp) via
// mcp-remote, injecting your API key.
//
// Client config:
//   { "command": "npx", "args": ["-y","singapore-proxy-mcp"], "env": { "SMP_API_KEY": "sk_..." } }
// Free 10GB key: https://singaporemobileproxy.com/client/mcp

const path = require("path");
const { spawn } = require("child_process");

const ENDPOINT = process.env.SMP_MCP_ENDPOINT || "https://mcp.singaporemobileproxy.com/mcp";
const KEY = process.env.SMP_API_KEY || process.env.X_API_KEY || "";

if (!KEY) {
  process.stderr.write(
    "[singapore-proxy-mcp] no API key set. export SMP_API_KEY=sk_... " +
    "(get a free 10GB key at https://singaporemobileproxy.com/client/mcp)\n"
  );
}

// Resolve the installed mcp-remote CLI entry (robust to package "exports").
const pkgJsonPath = require.resolve("mcp-remote/package.json");
const pkg = require(pkgJsonPath);
const binField = pkg.bin;
const rel = typeof binField === "string" ? binField : (binField["mcp-remote"] || Object.values(binField)[0]);
const mcpRemote = path.join(path.dirname(pkgJsonPath), rel);

const args = [mcpRemote, ENDPOINT];
if (KEY) args.push("--header", `x-api-key:${KEY}`);
args.push(...process.argv.slice(2)); // pass through extra flags

const child = spawn(process.execPath, args, { stdio: "inherit" });
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code == null ? 0 : code);
});
process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
