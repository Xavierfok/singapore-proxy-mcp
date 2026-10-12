#!/usr/bin/env node
// Fails if the version numbers that must agree have drifted apart.
//
// package.json, package-lock.json, plugin.json and server.json's npm package entry all name
// the npm release. server.json's top-level "version" is the MCP registry entry, which can only
// go up (the registry already holds 1.0.0, 1.0.1 and 1.0.2), so it just has to be >= the npm one.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));

const pkg = read("package.json");
const lock = read("package-lock.json");
const plugin = read("plugin.json");
const server = read("server.json");
const npmEntry = (server.packages || []).find((p) => p.registryType === "npm");

const cmp = (a, b) => {
  const pa = a.split(".").map(Number), pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
};

const want = pkg.version;
const problems = [];
const same = (label, got) => { if (got !== want) problems.push(`${label} is ${got}, package.json is ${want}`); };
same("package-lock.json version", lock.version);
same('package-lock.json packages[""].version', lock.packages[""].version);
same("plugin.json version", plugin.version);
if (!npmEntry) problems.push("server.json has no npm package entry");
else {
  same("server.json packages[npm].version", npmEntry.version);
  if (npmEntry.identifier !== pkg.name) problems.push(`server.json npm identifier ${npmEntry.identifier} != ${pkg.name}`);
}
if (server.name !== pkg.mcpName) problems.push(`server.json name ${server.name} != package.json mcpName ${pkg.mcpName}`);
if (cmp(server.version, want) < 0) problems.push(`server.json version ${server.version} is behind the npm release ${want}`);

if (problems.length) {
  for (const p of problems) console.error(`version drift: ${p}`);
  process.exit(1);
}
console.log(`versions agree: npm ${want}, MCP registry entry ${server.version}`);
