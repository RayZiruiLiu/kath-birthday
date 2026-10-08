"""Create small display copies for the floating prints; originals are never changed."""

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "PIC"
TARGET = ROOT / "public" / "print-thumbs"
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp"}

TARGET.mkdir(parents=True, exist_ok=True)
count = 0
for source in sorted(SOURCE.iterdir()):
    if not source.is_file() or source.suffix.lower() not in SUPPORTED:
        continue
    target = TARGET / f"{source.name}.webp"
    if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
        continue
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image.thumbnail((240, 300), Image.Resampling.LANCZOS)
        image.convert("RGB").save(target, "WEBP", quality=76, method=6)
    count += 1
print(f"Updated {count} floating-print thumbnail(s).")
