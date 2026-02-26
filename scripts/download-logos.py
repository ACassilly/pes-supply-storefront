import urllib.request
import os
import json

OUT = os.path.join(os.getcwd(), "public", "images", "brands")
os.makedirs(OUT, exist_ok=True)

brands = [
    ("eaton", "eaton.com"),
    ("siemens", "siemens.com"),
    ("schneider-electric", "se.com"),
    ("generac", "generac.com"),
    ("enphase", "enphase.com"),
    ("solaredge", "solaredge.com"),
    ("jinko-solar", "jinkosolar.com"),
    ("q-cells", "q-cells.com"),
    ("sol-ark", "sol-ark.com"),
    ("ironridge", "ironridge.com"),
    ("tesla", "tesla.com"),
    ("wallbox", "wallbox.com"),
    ("renogy", "renogy.com"),
    ("byd", "byd.com"),
    ("fortress-power", "fortresspower.com"),
    ("sungrow", "sungrowpower.com"),
    ("fronius", "fronius.com"),
    ("ge", "ge.com"),
    ("goodwe", "goodwe.com"),
    ("sma-solar", "sma.de"),
    ("panasonic", "panasonic.com"),
    ("canadian-solar", "csisolar.com"),
    ("trina-solar", "trinasolar.com"),
    ("longi", "longi.com"),
    ("victron", "victronenergy.com"),
    ("goodman", "goodmanmfg.com"),
    ("daikin", "daikin.com"),
    ("briggs-stratton", "briggsandstratton.com"),
    ("amana", "amana-hac.com"),
    ("lg-solar", "lg.com"),
    ("unirac", "unirac.com"),
    ("ecofasten", "ecofastensolar.com"),
    ("ap-systems", "apsystems.com"),
    ("hoymiles", "hoymiles.com"),
    ("leviton", "leviton.com"),
    ("hubbell", "hubbell.com"),
    ("southwire", "southwire.com"),
    ("lutron", "lutron.com"),
    ("milwaukee", "milwaukeetool.com"),
    ("dewalt", "dewalt.com"),
    ("klein-tools", "kleintools.com"),
    ("fluke", "fluke.com"),
    ("bosch", "bosch.com"),
    ("honeywell", "honeywell.com"),
    ("3m", "3m.com"),
    ("rheem", "rheem.com"),
    ("chargepoint", "chargepoint.com"),
    ("rab-lighting", "rablighting.com"),
    ("lithonia", "lithonia.com"),
    ("watts", "watts.com"),
    ("mrcool", "mrcool.com"),
    ("sharkbite", "sharkbite.com"),
]

def try_download(url):
    """Try to download from URL, return bytes and content-type or None."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=10)
        ct = resp.headers.get("Content-Type", "")
        data = resp.read()
        if len(data) < 200:
            return None
        if "image" in ct or url.endswith(".ico"):
            return (data, ct)
        return None
    except Exception:
        return None

def ext_from_ct(ct):
    if "svg" in ct: return ".svg"
    if "png" in ct: return ".png"
    if "webp" in ct: return ".webp"
    if "jpeg" in ct or "jpg" in ct: return ".jpg"
    return ".png"

ok_count = 0
fail_count = 0
results = {}

for slug, domain in brands:
    sources = [
        f"https://logo.clearbit.com/{domain}",
        f"https://img.logo.dev/{domain}?token=pk_anonymous&size=200&format=png",
        f"https://www.google.com/s2/favicons?domain={domain}&sz=128",
        f"https://icons.duckduckgo.com/ip3/{domain}.ico",
    ]
    
    saved = False
    for url in sources:
        result = try_download(url)
        if result:
            data, ct = result
            ext = ext_from_ct(ct)
            filename = f"{slug}{ext}"
            filepath = os.path.join(OUT, filename)
            with open(filepath, "wb") as f:
                f.write(data)
            source_name = url.split("/")[2]
            print(f"OK   {slug:25s} <- {source_name:30s} ({len(data):>6d} bytes)")
            results[slug] = f"/images/brands/{filename}"
            saved = True
            ok_count += 1
            break
    
    if not saved:
        print(f"FAIL {slug}")
        fail_count += 1

print(f"\n=== Done: {ok_count} downloaded, {fail_count} failed ===")
print(f"\nLogo path mapping (for data.ts):")
for slug, path in results.items():
    print(f'  "{slug}": "{path}",')
