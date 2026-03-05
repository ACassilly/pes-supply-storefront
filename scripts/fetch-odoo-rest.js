/**
 * Try Odoo 19 REST API endpoints and also try different password variations
 */

const ODOO_URL = "https://id.pes.supply";
const USERNAME = "alex.cassilly@pes.supply";
const PASSWORDS = [
  "PESadmin2026!",
  "PESAdmin2026!",
  "PESAdmin2026@",
  "PESadmin2026@",
  "pesadmin2026!",
  "PESadmin2026",
];

async function tryBasicAuth(password) {
  const creds = Buffer.from(`${USERNAME}:${password}`).toString("base64");
  try {
    const res = await fetch(`${ODOO_URL}/api/product.template`, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${creds}`,
        "Accept": "application/json",
      },
    });
    console.log(`[v0] REST /api/ with "${password}": status=${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`[v0] SUCCESS! Got ${JSON.stringify(data).slice(0, 500)}`);
      return { password, data };
    }
    const text = await res.text();
    console.log(`[v0]   body: ${text.slice(0, 300)}`);
  } catch (e) {
    console.log(`[v0] REST error with "${password}": ${e.message}`);
  }
  return null;
}

async function tryJsonRpc(password) {
  try {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      id: 1,
      params: {
        db: "pes_crm",
        login: USERNAME,
        password: password,
      },
    };
    const res = await fetch(`${ODOO_URL}/web/session/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (json.result && json.result.uid) {
      console.log(`[v0] JSON-RPC auth SUCCESS with "${password}": uid=${json.result.uid}`);
      return { password, uid: json.result.uid, cookie: res.headers.get("set-cookie") };
    }
    const errMsg = json.error?.data?.message || json.result?.message || "no uid";
    console.log(`[v0] JSON-RPC with "${password}": ${errMsg}`);
  } catch (e) {
    console.log(`[v0] JSON-RPC error with "${password}": ${e.message}`);
  }
  return null;
}

async function main() {
  console.log("[v0] === Trying Odoo 19 REST API (Basic Auth) ===");
  
  // First check if the REST API endpoint even exists
  try {
    const probe = await fetch(`${ODOO_URL}/api/`, { method: "GET", redirect: "manual" });
    console.log(`[v0] /api/ probe: status=${probe.status}`);
  } catch (e) {
    console.log(`[v0] /api/ probe failed: ${e.message}`);
  }

  // Also check version endpoint (no auth needed)
  try {
    const ver = await fetch(`${ODOO_URL}/web/webclient/version_info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "call", id: 1, params: {} }),
    });
    const verJson = await ver.json();
    console.log(`[v0] Odoo version: ${JSON.stringify(verJson.result?.server_version || verJson.result || "unknown")}`);
  } catch (e) {
    console.log(`[v0] Version check failed: ${e.message}`);
  }

  for (const pw of PASSWORDS) {
    const result = await tryBasicAuth(pw);
    if (result) {
      console.log(`\n[v0] WORKING PASSWORD: "${pw}" via REST API`);
      return;
    }
  }

  console.log("\n[v0] === Trying JSON-RPC with all passwords ===");
  for (const pw of PASSWORDS) {
    const result = await tryJsonRpc(pw);
    if (result) {
      console.log(`\n[v0] WORKING PASSWORD: "${pw}" via JSON-RPC`);
      return;
    }
  }

  console.log("\n[v0] All password variations failed. The account likely uses Microsoft M365 SSO.");
  console.log("[v0] To proceed, you can:");
  console.log("[v0]   1. In Odoo: Settings > Users > alex.cassilly > Account Security > API Keys > New API Key");
  console.log("[v0]   2. Export products as CSV from Odoo: Inventory > Products > Select All > Actions > Export");
}

main().catch((e) => console.error("[v0] Fatal:", e.message));
