// Test which logo API sources actually return valid images
const brands = [
  { name: "Eaton", domain: "eaton.com", shopifyUrl: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Eaton_Image_2.png?v=1731948032" },
  { name: "Siemens", domain: "siemens.com", shopifyUrl: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Siemens.png?v=1731277082" },
  { name: "Milwaukee", domain: "milwaukeetool.com" },
  { name: "Klein Tools", domain: "kleintools.com" },
  { name: "Generac", domain: "generac.com", shopifyUrl: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Generac.webp?v=1714417975" },
  { name: "Leviton", domain: "leviton.com" },
  { name: "Fluke", domain: "fluke.com" },
  { name: "DeWalt", domain: "dewalt.com" },
  { name: "Honeywell", domain: "honeywell.com" },
  { name: "Lutron", domain: "lutron.com" },
];

async function testUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return { status: res.status, ok: res.ok, type: res.headers.get("content-type") };
  } catch (e) {
    return { status: 0, ok: false, error: e.message };
  }
}

async function main() {
  console.log("=== Testing Logo Sources ===\n");
  
  for (const brand of brands) {
    console.log(`--- ${brand.name} (${brand.domain}) ---`);
    
    // Test Clearbit
    const clearbit = await testUrl(`https://logo.clearbit.com/${brand.domain}`);
    console.log(`  Clearbit: ${clearbit.ok ? "OK" : "FAIL"} (${clearbit.status}) ${clearbit.type || clearbit.error || ""}`);
    
    // Test Brandfetch
    const brandfetch = await testUrl(`https://cdn.brandfetch.io/id/${brand.domain}/w/256/h/256`);
    console.log(`  Brandfetch: ${brandfetch.ok ? "OK" : "FAIL"} (${brandfetch.status}) ${brandfetch.type || brandfetch.error || ""}`);
    
    // Test Shopify if available
    if (brand.shopifyUrl) {
      const shopify = await testUrl(brand.shopifyUrl);
      console.log(`  Shopify CDN: ${shopify.ok ? "OK" : "FAIL"} (${shopify.status}) ${shopify.type || shopify.error || ""}`);
    }
    
    // Test Google favicon fallback
    const favicon = await testUrl(`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`);
    console.log(`  Google Favicon: ${favicon.ok ? "OK" : "FAIL"} (${favicon.status}) ${favicon.type || favicon.error || ""}`);
    
    console.log("");
  }
}

main();
