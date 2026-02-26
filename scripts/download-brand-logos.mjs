import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const LOGO_DIR = path.resolve("public/images/brands");

// All brand logos from the live PES Shopify brands page
// Extracted from https://www.portlandiaelectric.supply/pages/brands
const logos = [
  { slug: "generac", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Generac.webp?v=1714417975" },
  { slug: "amana", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Amana_PTAC.webp?v=1714417975" },
  { slug: "goodman", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Goodman.webp?v=1714417975" },
  { slug: "briggs-stratton", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Briggs_and_Stratton.webp?v=1714417975" },
  { slug: "renogy", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Renogy.webp?v=1714417976" },
  { slug: "byd", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/BYD.webp?v=1714417975" },
  { slug: "fortress-power", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Fortress_Power.webp?v=1714417975" },
  { slug: "sol-ark", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Sol-Ark.webp?v=1714417976" },
  { slug: "sungrow", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Sungrow.webp?v=1714417976" },
  { slug: "fronius", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Fronius.webp?v=1714417975" },
  { slug: "ap-systems", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/AP_Systems.webp?v=1714417975" },
  { slug: "ecofasten", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/EcoFasten.webp?v=1714417975" },
  { slug: "enphase", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Enphase.webp?v=1714417975" },
  { slug: "general-electric", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/General_Electric.webp?v=1714417975" },
  { slug: "goodwe", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/GoodWe.webp?v=1714417975" },
  { slug: "hoymiles", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Hoymiles.webp?v=1714417975" },
  { slug: "sma-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/SMA_Solar.webp?v=1714417976" },
  { slug: "solaredge", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/SolarEdge.webp?v=1714417976" },
  { slug: "eaton", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Eaton_Image_2.png?v=1731948032" },
  { slug: "schneider-electric", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Schneider_Electric_Image_3.png?v=1731948032" },
  { slug: "siemens", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Siemens.png?v=1731277082" },
  { slug: "jinko", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Jinko_Solar_image_2.png?v=1731948031" },
  { slug: "q-cells", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Qcells.png?v=1731277082" },
  { slug: "ironridge", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/IronRidge.png?v=1731277082" },
  { slug: "tesla", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Tesla_Powerwall.png?v=1731277082" },
  { slug: "wallbox", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Wallbox.png?v=1731277082" },
  { slug: "panasonic", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Panasonic_Image_2.png?v=1731948032" },
  { slug: "longi", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/LONGi_Solar_Image_3.png?v=1731948032" },
  { slug: "victron", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Victron_Energy.png?v=1731277082" },
  { slug: "daikin", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Daikin.png?v=1731277081" },
  { slug: "lg-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/LG.png?v=1731277082" },
  { slug: "unirac", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Unirac.png?v=1731277082" },
  { slug: "canadian-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/canadian-solar.png?v=1735576361" },
  { slug: "trina-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/trina-solar.png?v=1735576362" },
  // Additional brands from the page
  { slug: "c-d-emerging", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/C_D_Emerging_Energy.webp?v=1714417975" },
  { slug: "solax-power", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Solax_Power.webp?v=1714417976" },
  { slug: "k2-systems", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/K2_Systems.webp?v=1714417975" },
  { slug: "tigo-energy", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Tigo_Energy.webp?v=1714417976" },
  { slug: "yotta-energy", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Yotta_Energy.webp?v=1714417976" },
  { slug: "allied-tube", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Allied_Tube_and_Conduit.webp?v=1714417975" },
  { slug: "arlington", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Arlington.webp?v=1714417975" },
  { slug: "bluesun", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Bluesun_Solar.webp?v=1714417975" },
  { slug: "boviet-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Boviet_Solar.webp?v=1714417975" },
  { slug: "cantex", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Cantex_Inc.webp?v=1714417975" },
  { slug: "cerro-wire", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Cerro_Wire.webp?v=1714417975" },
  { slug: "chemlink", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/ChemLink.webp?v=1714417975" },
  { slug: "chint-power", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Chint_Power.webp?v=1714417975" },
  { slug: "cobra-wire", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Cobra_BLACK_BATTERY_CABLE.webp?v=1714417975" },
  { slug: "delta-electronics", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Delta_Electronics_Americas_Ltd_image_3.png?v=1731948031" },
  { slug: "discover-energy", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Discover_Energy_image_2.png?v=1731948031" },
  { slug: "dpw-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/DPW_Solar_image_2.png?v=1731948031" },
  { slug: "ecolibrium", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Ecolibrium_Solar_image_2.png?v=1731948031" },
  { slug: "ejot", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Ejot_image_2.png?v=1731948031" },
  { slug: "emmvee", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Emmvee_image_2.png?v=1731948031" },
  { slug: "endurenergy", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/ENDURENERGY_image_2.png?v=1731948031" },
  { slug: "epever", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/EPEVER_Image_2.png?v=1731948031" },
  { slug: "franklinwh", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/FranklinWH_Energy_Storage_Inc_image_2.png?v=1731948031" },
  { slug: "halex", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Halex_image_4.png?v=1731948031" },
  { slug: "hellermanntyton", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/HellermannTyton_image_2.png?v=1731948031" },
  { slug: "heyco", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Heyco_image_2.png?v=1731948031" },
  { slug: "homegrid", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/HomeGrid_image_2.png?v=1731948031" },
  { slug: "hyundai", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Hyundai_Energy_Solutions_image_3.png?v=1731948031" },
  { slug: "kraloy", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/KRALOY_Image_2.png?v=1731948031" },
  { slug: "littelfuse", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Littelfuse_Image_2.png?v=1731948032" },
  { slug: "midnite-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/MidNite_Solar_Image_2.png?v=1731948032" },
  { slug: "mission-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Mission_Solar_Image_2.png?v=1731948032" },
  { slug: "morningstar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Morningstar_Corporation_Image_2.png?v=1731948032" },
  { slug: "nsi-tork", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/NSI_TORK_Image_2.png?v=1731948032" },
  { slug: "oatey", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Oatey_Image_2.png?v=1731948032" },
  { slug: "omni-cable", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Omni_Cable_Image_2.png?v=1731948032" },
  { slug: "outback-power", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Outback_Power_Image_2.png?v=1731948032" },
  { slug: "prosolar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/ProSolar_Image_2.png?v=1731948032" },
  { slug: "pv-labels", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/PV_Labels_Image_2.png?v=1731948032" },
  { slug: "pytes", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Pytes.png?v=1731277082" },
  { slug: "quick-mount", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Quick_Mount.png?v=1731277082" },
  { slug: "rennsteig", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Rennsteig_Tools_Image_2.png?v=1731948032" },
  { slug: "s5", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/S-5.png?v=1731277082" },
  { slug: "samlex", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Samlex_Image_2.png?v=1731948032" },
  { slug: "savant", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/SAVANT_Image_3.png?v=1731948032" },
  { slug: "soladeck", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Soladeck.png?v=1731277082" },
  { slug: "solaria", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Solaria.png?v=1731277082" },
  { slug: "solectria", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Solectria.png?v=1731277082" },
  { slug: "sonnen", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Sonnen.png?v=1731277082" },
  { slug: "staubli", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/STAUBLI.png?v=1731277082" },
  { slug: "te-connectivity", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/TE_Connectivity.png?v=1731277082" },
  { slug: "trojan", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/TROJAN_Battery.png?v=1731277082" },
  { slug: "aptos", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Aptos.png?v=1731277081" },
  { slug: "axitec", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Axitec.png?v=1731277081" },
  { slug: "chilicon-power", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Chilicon_Power.png?v=1731277081" },
  { slug: "crossroads-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Crossroads_Solar.png?v=1731277081" },
  { slug: "mango-power", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Mango_Power.png?v=1731277082" },
  { slug: "quickbolt", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/QuickBolt.png?v=1731277082" },
  { slug: "rec-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/REC_Solar.png?v=1731277082" },
  { slug: "roof-tech", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Roof_Tech.png?v=1731277082" },
  { slug: "seg-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/SEG_Solar.png?v=1731277082" },
  { slug: "solis", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Solis.png?v=1731277082" },
  { slug: "cable-services", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Cable_Services_Group.webp?v=1714417975" },
  { slug: "falcon-fine-wire", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Falcon_Fine_Wire_image_2.png?v=1731948031" },
  { slug: "magnum-energy", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Magnum_Energy_image_2.png?v=1731948032" },
  { slug: "mitrex", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Mitrex_Image_2.png?v=1731948032" },
  { slug: "mk-battery", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/MK_Battery_Image_2.png?v=1731948032" },
  { slug: "nine-fasteners", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Nine_Fasteners_Image_2.png?v=1731948032" },
  { slug: "northern-electric", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Northern_Electric_Power_Image_2.png?v=1731948032" },
  { slug: "preformed-line", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Performed_Line_Products_Image_2.png?v=1731948032" },
  { slug: "staticshield", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/SaticShield.png?v=1731277082" },
  { slug: "storz-power", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Storz_Power.png?v=1731277082" },
  { slug: "sun-xtender", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Sun_Xtender.png?v=1731277082" },
  { slug: "titan-wire", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Titan_Wire___Cable.png?v=1731277082" },
  { slug: "topaz", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Topaz_Solar.png?v=1731277082" },
  { slug: "hyperion-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Hyperion_Solar_image_2.png?v=1731948031" },
  { slug: "hollaender", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Hollaender_image_2.png?v=1731948031" },
  { slug: "rcp-block", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/RCP_Block_Brick_Inc.png?v=1731277082" },
  { slug: "renon", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Renon_image_2.png?v=1731948032" },
  { slug: "solar4america", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Solar4America.png?v=1731277082" },
  { slug: "solarever", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Solarever_USA.png?v=1731277082" },
  { slug: "solatrim", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/SolaTrim.png?v=1731277082" },
  { slug: "soluna", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Soluna.png?v=1731277082" },
  { slug: "sonali-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Sonali_Solar.png?v=1731277082" },
  { slug: "sunmac", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/SUNMAC_Solar.png?v=1731277082" },
  { slug: "vsun", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/VSUN.png?v=1731277082" },
  { slug: "znshine", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/ZnshineSolar.png?v=1731277082" },
  { slug: "philadelphia-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Philadelphia_Solar.png?v=1731277082" },
  { slug: "phono-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Phono_Solar.png?v=1731277082" },
  { slug: "ez-solar", url: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/EZ_Solar.png?v=1731277082" },
];

async function downloadLogos() {
  if (!existsSync(LOGO_DIR)) {
    await mkdir(LOGO_DIR, { recursive: true });
  }

  let success = 0;
  let failed = 0;

  for (const { slug, url } of logos) {
    const ext = url.includes(".webp") ? "webp" : "png";
    const dest = path.join(LOGO_DIR, `${slug}.${ext}`);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`[FAIL] ${slug}: HTTP ${res.status}`);
        failed++;
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      await writeFile(dest, buffer);
      console.log(`[OK] ${slug}.${ext} (${(buffer.length / 1024).toFixed(1)} KB)`);
      success++;
    } catch (err) {
      console.log(`[FAIL] ${slug}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed out of ${logos.length} total`);
}

downloadLogos();
