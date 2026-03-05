/**
 * Fetch products from Odoo 19 at id.pes.supply via JSON-RPC
 * Outputs a JSON file that we'll use to update lib/data.ts
 */

const ODOO_URL = "https://id.pes.supply";
const ODOO_USERNAME = "alex.cassilly@pes.supply";
const ODOO_PASSWORD = "PESAdmin2026@";

let SESSION_ID = null;

async function jsonRpc(url, method, params) {
  const body = {
    jsonrpc: "2.0",
    method: "call",
    id: Math.floor(Math.random() * 1000000),
    params: params,
  };

  const headers = {
    "Content-Type": "application/json",
  };
  if (SESSION_ID) {
    headers["Cookie"] = `session_id=${SESSION_ID}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  // Grab session cookie
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    const match = setCookie.match(/session_id=([^;]+)/);
    if (match) SESSION_ID = match[1];
  }

  const json = await res.json();
  if (json.error) {
    console.error("[v0] JSON-RPC Error:", JSON.stringify(json.error, null, 2));
    throw new Error(json.error.message || json.error.data?.message || "JSON-RPC error");
  }
  return json.result;
}

// Step 1: Get list of databases to find the right DB name
async function getDbList() {
  console.log("[v0] Fetching database list...");
  try {
    const result = await jsonRpc(`${ODOO_URL}/jsonrpc`, "call", {
      service: "db",
      method: "list",
      args: [],
    });
    console.log("[v0] Available databases:", result);
    return result;
  } catch (e) {
    console.log("[v0] Could not list databases (may be disabled):", e.message);
    return null;
  }
}

// Step 2: Authenticate
async function authenticate(db) {
  console.log(`[v0] Authenticating to ${ODOO_URL} with db=${db}...`);
  const result = await jsonRpc(`${ODOO_URL}/web/session/authenticate`, "call", {
    db: db,
    login: ODOO_USERNAME,
    password: ODOO_PASSWORD,
  });

  if (!result || !result.uid) {
    console.error("[v0] Auth failed. Result:", JSON.stringify(result, null, 2));
    throw new Error("Authentication failed");
  }

  console.log(`[v0] Authenticated! uid=${result.uid}, name=${result.name}`);
  return result;
}

// Step 3: Search and read products
async function fetchProducts(db, uid) {
  console.log("[v0] Fetching product.template list...");

  // First get the count
  const count = await jsonRpc(`${ODOO_URL}/jsonrpc`, "call", {
    service: "object",
    method: "execute_kw",
    args: [
      db,
      uid,
      ODOO_PASSWORD,
      "product.template",
      "search_count",
      [[["sale_ok", "=", true]]],
    ],
  });
  console.log(`[v0] Total saleable product templates: ${count}`);

  // Fetch products in batches of 100
  const allProducts = [];
  const batchSize = 100;
  const maxProducts = 500; // reasonable limit for demo

  for (let offset = 0; offset < Math.min(count, maxProducts); offset += batchSize) {
    console.log(`[v0] Fetching batch offset=${offset}, limit=${batchSize}...`);

    const products = await jsonRpc(`${ODOO_URL}/jsonrpc`, "call", {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        uid,
        ODOO_PASSWORD,
        "product.template",
        "search_read",
        [[["sale_ok", "=", true]]],
        {
          fields: [
            "id",
            "name",
            "default_code",
            "list_price",
            "standard_price",
            "categ_id",
            "description_sale",
            "description",
            "barcode",
            "weight",
            "volume",
            "type",
            "image_1920",
            "qty_available",
            "virtual_available",
            "uom_id",
            "attribute_line_ids",
          ],
          limit: batchSize,
          offset: offset,
          order: "name asc",
        },
      ],
    });

    console.log(`[v0] Got ${products.length} products in this batch`);
    allProducts.push(...products);
  }

  return allProducts;
}

// Step 4: Fetch product categories for mapping
async function fetchCategories(db, uid) {
  console.log("[v0] Fetching product categories...");
  const categories = await jsonRpc(`${ODOO_URL}/jsonrpc`, "call", {
    service: "object",
    method: "execute_kw",
    args: [
      db,
      uid,
      ODOO_PASSWORD,
      "product.category",
      "search_read",
      [[]],
      {
        fields: ["id", "name", "parent_id", "complete_name"],
        limit: 500,
      },
    ],
  });
  console.log(`[v0] Got ${categories.length} categories`);
  return categories;
}

// Step 5: Fetch product brands/manufacturers if available
async function fetchBrands(db, uid) {
  console.log("[v0] Attempting to fetch brands/manufacturers...");
  try {
    // Try product.brand first (common Odoo module)
    const brands = await jsonRpc(`${ODOO_URL}/jsonrpc`, "call", {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        uid,
        ODOO_PASSWORD,
        "product.brand",
        "search_read",
        [[]],
        { fields: ["id", "name"], limit: 500 },
      ],
    });
    console.log(`[v0] Got ${brands.length} brands from product.brand`);
    return brands;
  } catch (e) {
    console.log("[v0] product.brand model not found, trying alternatives...");
  }

  try {
    // Try x_brand or manufacturer fields on product.template
    const sample = await jsonRpc(`${ODOO_URL}/jsonrpc`, "call", {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        uid,
        ODOO_PASSWORD,
        "product.template",
        "fields_get",
        [],
        { attributes: ["string", "type"] },
      ],
    });
    const brandFields = Object.entries(sample).filter(([key, val]) =>
      key.includes("brand") || key.includes("manufacturer") || key.includes("x_brand")
    );
    console.log("[v0] Brand-related fields found:", brandFields.map(([k]) => k));
    return [];
  } catch (e) {
    console.log("[v0] Could not find brand fields:", e.message);
    return [];
  }
}

// Main execution
async function main() {
  try {
    // Try to list databases
    const dbs = await getDbList();
    let dbName;

    if (dbs && dbs.length > 0) {
      dbName = dbs[0];
      console.log(`[v0] Using database: ${dbName}`);
    } else {
      // Try common database names
      const candidates = ["id-pes-supply", "id_pes_supply", "pes", "pes-supply", "odoo", "main", "production"];
      for (const candidate of candidates) {
        try {
          console.log(`[v0] Trying database name: ${candidate}`);
          await authenticate(candidate);
          dbName = candidate;
          break;
        } catch (e) {
          console.log(`[v0] Failed with db=${candidate}: ${e.message}`);
        }
      }
    }

    if (!dbName) {
      throw new Error("Could not determine database name");
    }

    const session = await authenticate(dbName);
    const uid = session.uid;

    // Fetch data in parallel
    const [products, categories, brands] = await Promise.all([
      fetchProducts(dbName, uid),
      fetchCategories(dbName, uid),
      fetchBrands(dbName, uid),
    ]);

    // Build category map
    const catMap = {};
    for (const cat of categories) {
      catMap[cat.id] = cat;
    }

    // Build brand map
    const brandMap = {};
    for (const b of brands) {
      brandMap[b.id] = b.name;
    }

    // Output results
    const output = {
      fetchedAt: new Date().toISOString(),
      odooUrl: ODOO_URL,
      dbName,
      totalProducts: products.length,
      totalCategories: categories.length,
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        fullPath: c.complete_name,
      })),
      products: products.map((p) => ({
        odooId: p.id,
        name: p.name,
        sku: p.default_code || "",
        price: p.list_price,
        cost: p.standard_price,
        category: p.categ_id ? catMap[p.categ_id[0]]?.complete_name || p.categ_id[1] : "Uncategorized",
        categoryId: p.categ_id ? p.categ_id[0] : null,
        description: p.description_sale || p.description || "",
        barcode: p.barcode || "",
        weight: p.weight || 0,
        volume: p.volume || 0,
        type: p.type,
        qtyAvailable: p.qty_available || 0,
        virtualAvailable: p.virtual_available || 0,
        uom: p.uom_id ? p.uom_id[1] : "",
        hasImage: !!p.image_1920,
      })),
    };

    // Write to file
    const fs = await import("fs");
    const outPath = "/vercel/share/v0-project/scripts/odoo-products.json";
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
    console.log(`\n[v0] SUCCESS: Wrote ${products.length} products to ${outPath}`);
    console.log(`[v0] Categories: ${categories.length}`);
    console.log(`[v0] Brands: ${brands.length}`);

    // Print first 5 products as sample
    console.log("\n[v0] Sample products:");
    for (const p of output.products.slice(0, 10)) {
      console.log(`  - ${p.name} | SKU: ${p.sku} | $${p.price} | Cat: ${p.category} | Qty: ${p.qtyAvailable}`);
    }

  } catch (err) {
    console.error("[v0] FATAL:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

main();
