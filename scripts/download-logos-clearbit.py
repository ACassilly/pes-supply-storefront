import urllib.request
import os
import json

OUT = "/vercel/share/v0-project/public/images/brands"
os.makedirs(OUT, exist_ok=True)

# brand-slug -> clearbit domain
brands = {
    "eaton": "eaton.com",
    "siemens": "siemens.com",
    "schneider-electric": "se.com",
    "generac": "generac.com",
    "enphase": "enphase.com",
    "solaredge": "solaredge.com",
    "jinko-solar": "jinkosolar.com",
    "q-cells": "q-cells.com",
    "sol-ark": "sol-ark.com",
    "ironridge": "ironridge.com",
    "tesla": "tesla.com",
    "wallbox": "wallbox.com",
    "renogy": "renogy.com",
    "byd": "byd.com",
    "fortress-power": "fortresspower.com",
    "sungrow": "sungrowpower.com",
    "fronius": "fronius.com",
    "ge": "ge.com",
    "goodwe": "goodwe.com",
    "sma-solar": "sma.de",
    "panasonic": "panasonic.com",
    "canadian-solar": "canadiansolar.com",
    "trina-solar": "trinasolar.com",
    "longi": "longi.com",
    "victron": "victronenergy.com",
    "goodman": "goodmanmfg.com",
    "daikin": "daikin.com",
    "briggs-stratton": "briggsandstratton.com",
    "amana": "amana-hac.com",
    "lg-solar": "lg.com",
    "unirac": "unirac.com",
    "ecofasten": "ecofastensolar.com",
    "ap-systems": "apsystems.com",
    "hoymiles": "hoymiles.com",
    "leviton": "leviton.com",
    "hubbell": "hubbell.com",
    "southwire": "southwire.com",
    "lutron": "lutron.com",
    "milwaukee": "milwaukeetool.com",
    "dewalt": "dewalt.com",
    "klein-tools": "kleintools.com",
    "fluke": "fluke.com",
    "bosch": "bosch.com",
    "honeywell": "honeywell.com",
    "3m": "3m.com",
    "rheem": "rheem.com",
    "chargepoint": "chargepoint.com",
    "rab-lighting": "rablighting.com",
    "lithonia": "acuitybrands.com",
    "watts": "watts.com",
    "mrcool": "mrcool.com",
    "sharkbite": "sharkbite.com",
}

ok = 0
fail = 0
mapping = {}

for slug, domain in brands.items():
    url = f"https://logo.clearbit.com/{domain}?size=256"
    dest = os.path.join(OUT, f"{slug}.png")
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            "Accept": "image/png,image/*",
        })
        resp = urllib.request.urlopen(req, timeout=8)
        data = resp.read()
        ct = resp.headers.get("Content-Type", "")
        if len(data) > 500 and ("image" in ct or len(data) > 2000):
            with open(dest, "wb") as f:
                f.write(data)
            print(f"OK   {slug:25s} <- clearbit ({len(data):>6d} bytes, {ct})")
            mapping[slug] = f"/images/brands/{slug}.png"
            ok += 1
        else:
            print(f"SKIP {slug:25s} <- too small ({len(data)} bytes) or not image ({ct})")
            fail += 1
    except Exception as e:
        print(f"FAIL {slug:25s} <- {e}")
        fail += 1

print(f"\n=== Clearbit: {ok} downloaded, {fail} failed ===")
if mapping:
    print(f"\nFirst 5 file sizes:")
    for i, (slug, path) in enumerate(list(mapping.items())[:5]):
        fpath = os.path.join(OUT, f"{slug}.png")
        sz = os.path.getsize(fpath)
        print(f"  {slug}: {sz:,} bytes")
