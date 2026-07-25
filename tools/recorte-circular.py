#!/usr/bin/env python3
"""Detecta una insignia circular sobre fondo cuadriculado y la recorta en
círculo, dejando el exterior transparente. Uso: recorte-circular.py entrada salida"""
import sys, math
from PIL import Image, ImageDraw, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
scale = float(sys.argv[3]) if len(sys.argv) > 3 else 0.995   # ajuste fino del radio
im = Image.open(src).convert("RGB")
w, h = im.size
px = im.load()

# 1) Colores del cuadriculado: muestrear a lo largo de TODOS los bordes
#    (así se capturan los dos colores del patrón, aunque los cuadros sean grandes)
refs = set()
for x in range(0, w, 5):
    refs.add(px[x, 2]); refs.add(px[x, h-3])
for y in range(0, h, 5):
    refs.add(px[2, y]); refs.add(px[w-3, y])
refs = list(refs)

def is_bg(c, tol=40):
    for r in refs:
        if abs(c[0]-r[0]) <= tol and abs(c[1]-r[1]) <= tol and abs(c[2]-r[2]) <= tol:
            return True
    return False

# 2) Detectar bordes de la insignia escaneando fila y columna centrales
cyc, cxc = h // 2, w // 2
def first_non_bg(rng, fixed, horizontal):
    for i in rng:
        c = px[i, fixed] if horizontal else px[fixed, i]
        if not is_bg(c):
            return i
    return None

left   = first_non_bg(range(w), cyc, True)
right  = first_non_bg(range(w-1, -1, -1), cyc, True)
top    = first_non_bg(range(h), cxc, False)
bottom = first_non_bg(range(h-1, -1, -1), cxc, False)

cx = (left + right) / 2
cy = (top + bottom) / 2
# radio = promedio de los semiejes, un pelín hacia adentro para no dejar borde
r = ((right - left) + (bottom - top)) / 4
r = r * 0.995
print("círculo detectado -> centro(%.0f,%.0f) radio %.0f" % (cx, cy, r))

# 3) Máscara circular con borde suave
mask = Image.new("L", (w, h), 0)
ImageDraw.Draw(mask).ellipse([cx-r, cy-r, cx+r, cy+r], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(1.2))

out = im.convert("RGBA")
out.putalpha(mask)
out = out.crop((int(cx-r-2), int(cy-r-2), int(cx+r+2), int(cy+r+2)))
out.save(dst)
print("OK ->", dst, out.size)
