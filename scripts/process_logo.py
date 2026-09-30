"""Process the new Unifra logo into web assets.

Pipeline: strip black frame -> knock out gray background -> erase frame
anti-alias residue -> trim -> split mark/wordmark -> export:
  public/images/unifra-logo-stacked.png  (full stacked logo, 500px)
  public/images/unifra-emblem.png        (UF mark only, 320px wide)
  public/favicon.png                     (UF mark on 64x64 canvas)
"""
from PIL import Image

SRC = r"C:\Users\karth\Downloads\ChatGPT Image Sep 28, 2026, 12_38_59 PM.png"
OUT_STACKED = "public/images/unifra-logo-stacked.png"
OUT_EMBLEM = "public/images/unifra-emblem.png"
OUT_FAVICON = "public/favicon.png"

TOL = 30          # background color-match tolerance
EDGE = 3          # frame anti-alias residue thickness (px)
MIN_GAP = 10      # min empty rows separating mark from wordmark


def is_dark(c):
    return c[0] + c[1] + c[2] < 150


def main():
    img = Image.open(SRC).convert("RGBA")
    print("source:", img.size)

    # -- 1. Crop off the black border frame -------------------------------
    px = img.load()
    w, h = img.size

    def row_mostly_dark(y):
        return sum(1 for x in range(0, w, 4) if is_dark(px[x, y])) > (w // 4) * 0.9

    def col_mostly_dark(x):
        return sum(1 for y in range(0, h, 4) if is_dark(px[x, y])) > (h // 4) * 0.9

    top = 0
    while top < h // 2 and row_mostly_dark(top):
        top += 1
    bottom = h - 1
    while bottom > h // 2 and row_mostly_dark(bottom):
        bottom -= 1
    left = 0
    while left < w // 2 and col_mostly_dark(left):
        left += 1
    right = w - 1
    while right > w // 2 and col_mostly_dark(right):
        right -= 1
    img = img.crop((left, top, right + 1, bottom + 1))
    px = img.load()
    w, h = img.size
    print("frame-cropped:", img.size)

    # -- 2. Knock out the light-gray background ---------------------------
    corners = [px[2, 2], px[w - 3, 2], px[2, h - 3], px[w - 3, h - 3]]
    bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
    print("bg color:", bg)

    def is_bg(c):
        return (
            abs(c[0] - bg[0]) <= TOL
            and abs(c[1] - bg[1]) <= TOL
            and abs(c[2] - bg[2]) <= TOL
        )

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if is_bg((r, g, b)):
                px[x, y] = (r, g, b, 0)

    # -- 3. Erase frame anti-alias residue at the edges --------------------
    for y in range(h):
        for x in list(range(0, EDGE)) + list(range(w - EDGE, w)):
            r, g, b, a = px[x, y]
            px[x, y] = (r, g, b, 0)
    for y in list(range(0, EDGE)) + list(range(h - EDGE, h)):
        for x in range(w):
            r, g, b, a = px[x, y]
            px[x, y] = (r, g, b, 0)

    # -- 4. Trim -----------------------------------------------------------
    img = img.crop(img.getbbox())
    px = img.load()
    w, h = img.size
    print("trimmed full-res:", img.size)

    # -- 5. Find the mark/wordmark split ------------------------------------
    def row_ink(y):
        return sum(1 for x in range(w) if px[x, y][3] > 100)

    split_y = None
    run = 0
    for y in range(int(h * 0.4), h):
        if row_ink(y) == 0:
            run += 1
            if run >= MIN_GAP:
                split_y = y - run + 1
                break
        else:
            run = 0
    assert split_y, "no empty gap found between mark and wordmark"
    print("mark spans y = 0 ..", split_y - 1)

    # -- 6. Export stacked logo ---------------------------------------------
    stacked = img.copy()
    stacked.thumbnail((500, 500), Image.LANCZOS)
    stacked.save(OUT_STACKED, optimize=True)
    print("stacked ->", OUT_STACKED, stacked.size)

    # -- 7. Export emblem (mark only) ----------------------------------------
    emblem = img.crop((0, 0, w, split_y))
    emblem = emblem.crop(emblem.getbbox())
    emblem.thumbnail((320, 320), Image.LANCZOS)
    emblem.save(OUT_EMBLEM, optimize=True)
    print("emblem ->", OUT_EMBLEM, emblem.size, "ratio:",
          round(emblem.size[0] / emblem.size[1], 2))

    # -- 8. Favicon -----------------------------------------------------------
    side = max(emblem.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(emblem, ((side - emblem.size[0]) // 2,
                          (side - emblem.size[1]) // 2))
    canvas = canvas.resize((64, 64), Image.LANCZOS)
    canvas.save(OUT_FAVICON, optimize=True)
    print("favicon ->", OUT_FAVICON)


if __name__ == "__main__":
    main()
