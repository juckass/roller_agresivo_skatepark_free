#!/usr/bin/env python3
"""
Quita el fondo blanco de un logo y lo deja transparente (PNG).

Uso:
    ./.venv-tools/bin/python tools/quitar-fondo.py [entrada] [salida]

Por defecto:
    entrada = assets/logo-original.png   (tu logo con fondo blanco)
    salida  = assets/logo.png            (resultado transparente)

Método: relleno (flood-fill) desde los 4 bordes. Borra el blanco EXTERIOR
conectado a los bordes, respetando las letras claras del interior (CROSS)
porque están encerradas por los contornos oscuros.
"""
import sys, os
from PIL import Image, ImageDraw, ImageFilter

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(BASE, "assets", "logo-original.png")
dst = sys.argv[2] if len(sys.argv) > 2 else os.path.join(BASE, "assets", "logo.png")

if not os.path.exists(src):
    print("ERROR: no encuentro el archivo de entrada:", src)
    print("Guarda tu logo (con fondo blanco) como: assets/logo-original.png")
    sys.exit(1)

FILL = (255, 0, 255)   # color centinela para marcar el fondo
THRESH = 40            # tolerancia (sube si queda blanco; baja si come el logo)

img = Image.open(src).convert("RGB")
w, h = img.size

# Rellenar desde muchos puntos del borde para cubrir todo el fondo exterior
seeds = []
step = max(1, w // 40)
for x in range(0, w, step):
    seeds += [(x, 0), (x, h - 1)]
step = max(1, h // 40)
for y in range(0, h, step):
    seeds += [(0, y), (w - 1, y)]

for s in seeds:
    px = img.getpixel(s)
    if px[0] > 210 and px[1] > 210 and px[2] > 210:   # solo si el borde es claro
        ImageDraw.floodfill(img, s, FILL, thresh=THRESH)

# Construir el canal alfa: transparente donde quedó el color centinela
rgba = img.convert("RGBA")
datas = rgba.getdata()
out = []
for r, g, b, a in datas:
    if (r, g, b) == FILL:
        out.append((0, 0, 0, 0))
    else:
        out.append((r, g, b, 255))
rgba.putdata(out)

# Suavizar levemente el borde del alfa (anti-aliasing)
alpha = rgba.getchannel("A").filter(ImageFilter.GaussianBlur(0.6))
rgba.putalpha(alpha)

# Recortar el sobrante transparente
bbox = rgba.getbbox()
if bbox:
    rgba = rgba.crop(bbox)

rgba.save(dst)
print("OK ->", dst, rgba.size)
print("Si quedaron restos de blanco, sube THRESH (ej. 60). Si comió el logo, bájalo (ej. 25).")
