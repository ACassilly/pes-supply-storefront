const { writeFileSync, mkdirSync, existsSync } = require("fs");
const { join } = require("path");

const OUT = join(process.cwd(), "public", "images", "brands");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// Every brand with its domain for logo lookup
const brands = [
  { slug: "eaton", domain: "eaton.com" },
  { slug: "siemens", domain: "siemens.com" },
  { slug: "schneider-electric", domain: "se.com" },
  { slug: "generac", domain: "generac.com" },
  { slug: "enphase", domain: "enphase.com" },
  { slug: "solaredge", domain: "solaredge.com" },
  { slug: "jinko-solar", domain: "jinkosolar.com" },
  { slug: "q-cells", domain: "q-cells.com" },
  { slug: "sol-ark", domain: "sol-ark.com" },
  { slug: "ironridge", domain: "ironridge.com" },
  { slug: "tesla", domain: "tesla.com" },
  { slug: "wallbox", domain: "wallbox.com" },
  { slug: "renogy", domain: "renogy.com" },
  { slug: "byd", domain: "byd.com" },
  { slug: "fortress-power", domain: "fortresspower.com" },
  { slug: "sungrow", domain: "sungrowpower.com" },
  { slug: "fronius", domain: "fronius.com" },
  { slug: "ge", domain: "ge.com" },
  { slug: "goodwe", domain: "goodwe.com" },
  { slug: "sma-solar", domain: "sma.de" },
  { slug: "panasonic", domain: "panasonic.com" },
  { slug: "canadian-solar", domain: "csisolar.com" },
  { slug: "trina-solar", domain: "trinasolar.com" },
  { slug: "longi", domain: "longi.com" },
  { slug: "victron", domain: "victronenergy.com" },
  { slug: "goodman", domain: "goodmanmfg.com" },
  { slug: "daikin", domain: "daikin.com" },
  { slug: "briggs-stratton", domain: "briggsandstratton.com" },
  { slug: "amana", domain: "amana-hac.com" },
  { slug: "lg-solar", domain: "lg.com" },
  { slug: "unirac", domain: "unirac.com" },
  { slug: "ecofasten", domain: "ecofastensolar.com" },
  { slug: "ap-systems", domain: "apsystems.com" },
  { slug: "hoymiles", domain: "hoymiles.com" },
  { slug: "leviton", domain: "leviton.com" },
  { slug: "hubbell", domain: "hubbell.com" },
  { slug: "southwire", domain: "southwire.com" },
  { slug: "lutron", domain: "lutron.com" },
  { slug: "milwaukee", domain: "milwaukeetool.com" },
  { slug: "dewalt", domain: "dewalt.com" },
  { slug: "klein-tools", domain: "kleintools.com" },
  { slug: "fluke", domain: "fluke.com" },
  { slug: "bosch", domain: "bosch.com" },
  { slug: "honeywell", domain: "honeywell.com" },
  { slug: "3m", domain: "3m.com" },
  { slug: "rheem", domain: "rheem.com" },
  { slug: "chargepoint", domain: "chargepoint.com" },
  { slug: "rab-lighting", domain: "rablighting.com" },
  { slug: "lithonia", domain: "lithonia.com" },
  { slug: "watts", domain: "watts.com" },
  { slug: "mrcool", domain: "mrcool.com" },
  { slug: "sharkbite", domain: "sharkbite.com" },
];

async function trySource(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (!ct.startsWith("image/")) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 200) return null; // too small / empty
    return { buf, ct };
  } catch {
    return null;
  }
}

function extFromCt(ct) {
  if (ct.includes("svg")) return ".svg";
  if (ct.includes("png")) return ".png";
  if (ct.includes("webp")) return ".webp";
  if (ct.includes("jpeg") || ct.includes("jpg")) return ".jpg";
  if (ct.includes("x-icon") || ct.includes("vnd.microsoft.icon")) return ".png";
  return ".png";
}

let ok = 0;
let fail = 0;

for (const b of brands) {
  // Try sources in priority order
  const sources = [
    // Clearbit logo API (high quality, 128px+)
    `https://logo.clearbit.com/${b.domain}`,
    // Brandfetch CDN
    `https://cdn.brandfetch.io/${b.domain}/w/512/h/512/logo`,
    // Google Favicon at max size 
    `https://www.google.com/s2/favicons?domain=${b.domain}&sz=128`,
    // DuckDuckGo icons (usually higher quality than Google favicons)
    `https://icons.duckduckgo.com/ip3/${b.domain}.ico`,
  ];

  let saved = false;
  for (const url of sources) {
    const result = await trySource(url);
    if (result) {
      const ext = extFromCt(result.ct);
      const filename = `${b.slug}${ext}`;
      writeFileSync(join(OUT, filename), result.buf);
      console.log(`OK  ${b.slug} <- ${url.split("/")[2]} (${result.buf.length} bytes, ${result.ct})`);
      saved = true;
      ok++;
      break;
    }
  }
  if (!saved) {
    console.log(`FAIL ${b.slug} - no source returned a valid image`);
    fail++;
  }
}

console.log(`\n=== Done: ${ok} downloaded, ${fail} failed ===`);
