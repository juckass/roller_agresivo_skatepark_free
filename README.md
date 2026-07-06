# Cross Grind Chile — Landing Page

Landing page estática (HTML/CSS/JS puro) para la escuela de patinaje agresivo **Cross Grind Chile**.
Sin frameworks, súper liviana y optimizada para SEO.

---

## 📁 Estructura

```
web-escuela/
├── index.html          → Toda la página y el SEO
├── css/styles.css      → Estilos (negro + verde neón)
├── js/main.js          → Menú móvil + año del footer
├── assets/             → Logo, foto del profesor, imagen para redes
├── robots.txt          → SEO
├── sitemap.xml         → SEO
└── README.md           → Este archivo
```

---

## ✅ Qué tienes que reemplazar antes de publicar

Busca estos textos en los archivos y reemplázalos. Todos están marcados como *placeholder*.

### 1. Número de WhatsApp
En `index.html` aparece **2 veces** el número `56900000000` (el botón "Contáctanos" y el botón flotante).
Reemplázalo por el número real **con código de país y sin `+` ni espacios**:

- Chile: `569XXXXXXXX` (ej: `56912345678`)

Buscar y reemplazar: `56900000000` → tu número.

### 2. Dominio
Cuando tengas el dominio, reemplaza `www.TU-DOMINIO.cl` en:
- `index.html` (etiquetas SEO, Open Graph y datos estructurados)
- `robots.txt`
- `sitemap.xml`

### 3. Logo (IMPORTANTE) — tu logo real

El sitio ya está configurado para usar **`assets/logo.png`** en el header, el hero y el
footer. Mientras ese archivo no exista, se muestra un placeholder automáticamente.
Solo tienes que dejar tu logo real ahí. Como tu logo viene con **fondo blanco** y el
sitio es oscuro, hay que dejarlo **transparente**. Dos opciones:

**Opción A — Fácil (recomendada), sin instalar nada:**
1. Entra a https://www.remove.bg (o https://www.photopea.com), sube tu logo y descarga
   el PNG **sin fondo**.
2. Guárdalo en la carpeta como **`assets/logo.png`**.
3. Recarga la página. ¡Listo, aparece tu logo real!

**Opción B — Automática (ya la dejé lista en el proyecto):**
1. Guarda tu logo tal cual (con fondo blanco) como **`assets/logo-original.png`**.
2. Doble clic en **`tools/quitar-fondo.command`** (o en terminal:
   `./.venv-tools/bin/python tools/quitar-fondo.py`).
3. Se genera **`assets/logo.png`** transparente automáticamente. Recarga la página.
   - ¿Quedó algo de blanco? Abre `tools/quitar-fondo.py` y sube `THRESH` (ej. 60).

> El favicon también usa el logo. Si quieres un favicon nítido, guarda además
> `assets/favicon.png` (cuadrado, ~64x64) y cámbialo en `index.html` si lo deseas.

### 4. Foto del profesor + su biografía
- Foto: reemplaza `assets/profesor.svg` por la foto real (ideal vertical 4:5).
  Si es `.jpg`, súbela como `assets/profesor.jpg` y cambia `profesor.svg` → `profesor.jpg` en `index.html`.
- Texto: en la sección `#profesor` hay comentarios `TODO` con el texto base.
  Reemplaza los datos reales (años de experiencia, logros, filosofía).

### 5. Imagen para compartir en redes (opcional pero recomendado)
Crea una imagen `assets/og-image.jpg` de **1200x630 px** (una foto potente + logo).
Es la que se ve cuando compartes el link en WhatsApp / Instagram / Facebook.

---

## 📸 Instagram (la única parte dinámica)

Las publicaciones se muestran con **nuestro propio diseño de tarjetas** (las mismas de los
riders). Al hacer clic, **abre el post en Instagram** (y en el celular, la app). Hasta **10**.
Hay dos formas de cargarlas:

### MODO B — Manual (SIN acceso a la cuenta) ✅ recomendado si no eres dueño de la cuenta
El perfil es público, así que puedes armar las tarjetas a mano:
1. Elige los posts que quieras mostrar en el perfil.
2. Guarda/captura la imagen de cada uno en **`assets/instagram/`**
   (nómbralas `post-1.jpg`, `post-2.jpg`, …; ideal cuadradas ~1080×1080).
3. Copia el **link** de cada post (botón compartir → "Copiar enlace":
   `https://www.instagram.com/p/CODIGO/`).
4. En `js/main.js`, en `IG_POSTS`, agrega cada uno:
   ```js
   var IG_POSTS = [
     { img: 'assets/instagram/post-1.jpg', link: 'https://www.instagram.com/p/CODIGO1/' },
     { img: 'assets/instagram/post-2.jpg', link: 'https://www.instagram.com/p/CODIGO2/' },
     // ... hasta 10
   ];
   ```
5. Guarda y recarga. ¡Listo! (Lo actualizas tú cuando quieras.)

### MODO A — Automático (solo si tienes acceso a la cuenta)
1. En https://behold.so conecta **@roller_agresivo_skatepark_free** y crea un **JSON feed**.
2. En `js/main.js` pega la URL en `IG_FEED_URL = 'https://feeds.behold.so/TU-ID';`.
3. Se actualiza solo con tus últimas publicaciones.

> Si `IG_FEED_URL` e `IG_POSTS` están vacíos, se muestra un botón "Ver @…" de respaldo.
> Para mostrar más/menos posts, cambia `IG_COUNT` (por defecto 10).

---

## 🚀 Cómo publicar (hosting recomendado)

Todas estas opciones son **gratuitas** y perfectas para un sitio estático:

| Opción | Ideal para | Cómo |
|---|---|---|
| **Netlify** (recomendado) | Lo más fácil | Arrastra la carpeta a https://app.netlify.com/drop |
| **Cloudflare Pages** | Rápido y con dominio | Conecta un repo o sube la carpeta |
| **Vercel** | Alternativa a Netlify | https://vercel.com |
| **GitHub Pages** | Si usas GitHub | Sube el repo y activa Pages |

### Dominio propio
Compra el dominio (ej: `crossgrindchile.cl` en NIC Chile) y conéctalo desde
el panel del hosting (Netlify/Cloudflare tienen guías de 5 minutos).

---

## 👀 Ver la página en tu computador

Abre `index.html` con doble clic, o para verla como en el servidor real:

```bash
# dentro de la carpeta del proyecto
python3 -m http.server 8000
# luego abre http://localhost:8000
```

---

## 🔍 Después de publicar (SEO)

1. Da de alta el sitio en **Google Search Console** (https://search.google.com/search-console)
   y envía el `sitemap.xml`.
2. Crea/actualiza el **perfil de Google Business** de la escuela (aparece en Google Maps).
3. Asegúrate de que el link del sitio esté en la **bio de Instagram**.
