#!/bin/bash
# Doble clic para quitar el fondo blanco de assets/logo-original.png
# y generar assets/logo.png transparente.
cd "$(dirname "$0")/.." || exit 1
if [ ! -x ".venv-tools/bin/python" ]; then
  echo "Creando entorno..."; python3 -m venv .venv-tools && ./.venv-tools/bin/pip install pillow
fi
./.venv-tools/bin/python tools/quitar-fondo.py "$@"
echo ""
read -p "Listo. Presiona ENTER para cerrar."
