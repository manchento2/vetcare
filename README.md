# 🐾 VetCare – Centro Veterinario Integral

<div align="center">

![VetCare Banner](https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=80)

**Sitio web profesional para clínica veterinaria, construido con HTML5, CSS3 moderno y JavaScript vanilla.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Design-38bdf8?style=for-the-badge)](https://developer.mozilla.org/es/docs/Web/CSS/Media_Queries)

[🌐 Demo en Vivo](#) · [📋 Características](#-características) · [🚀 Instalación](#-instalación) · [📂 Estructura](#-estructura-del-proyecto)

</div>

---

## 📖 Descripción del Proyecto

**VetCare – Centro Veterinario Integral** es un sitio web profesional de una sola página (landing page) diseñado para una clínica veterinaria ficticia ubicada en San Luis, Argentina. El proyecto fue desarrollado como demostración de habilidades front-end: diseño responsivo, animaciones CSS modernas, integración de WhatsApp y validación de formularios con JavaScript vanilla.

---

## ✨ Características

### 🎨 Diseño
- Paleta de colores profesional: **verde/turquesa** (cuidado/salud) + azul médico + acentos naranja
- Tipografías modernas via **Google Fonts** (Inter + Poppins)
- **Glassmorphism** en header y elementos flotantes
- Gradientes suaves y micro-animaciones
- Modo oscuro en hero y footer

### 📱 Responsive
- Diseño **100% responsivo**: Desktop, Tablet y Mobile
- Menú hamburguesa animado en dispositivos móviles
- Grid adaptativo con **CSS Grid** y **Flexbox**
- Imágenes optimizadas con `loading="lazy"`

### ⚡ Funcionalidades JavaScript
- ✅ Validación completa del formulario de turnos
- 🔢 Contadores animados (hero stats) con easing
- 🎬 Animaciones de scroll con **Intersection Observer API**
- 📜 Scroll suave entre secciones con offset de header
- 🔝 Botón "Volver arriba" con aparición progresiva
- 💬 Integración de WhatsApp con mensaje pre-cargado
- 🌊 Efecto ripple en botones
- 🏷️ Link de navegación activo según sección visible

### 🏥 Secciones del Sitio
| # | Sección | Descripción |
|---|---------|-------------|
| 1 | **Header / Nav** | Logo, menú de navegación, botón CTA |
| 2 | **Hero** | Título, CTA principal, imagen destacada, estadísticas |
| 3 | **Sobre Nosotros** | Historia, valores, imágenes del equipo |
| 4 | **Servicios** | 6 tarjetas con iconos, descripción y CTA |
| 5 | **Beneficios** | 4 tarjetas + banner de urgencias |
| 6 | **Testimonios** | 3 reseñas de clientes con avatares |
| 7 | **Contacto** | Formulario de turno + info + mapa |
| 8 | **Footer** | Links, redes sociales, información |
| 9 | **WhatsApp Flotante** | Botón fijo + tooltip + pulse animation |

---

## 📂 Estructura del Proyecto

```
vetcare/
├── index.html      # Estructura HTML5 semántica
├── styles.css      # Estilos CSS3 modernos (1200+ líneas)
├── script.js       # JavaScript vanilla (~300 líneas)
└── README.md       # Documentación del proyecto
```

---

## 🚀 Instalación y Uso

### Opción 1 – Abrir directamente
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/vetcare.git

# Navegar al directorio
cd vetcare

# Abrir en el navegador
start index.html   # Windows
open index.html    # macOS
```

### Opción 2 – Servidor local
```bash
# Con Python (recomendado para el iframe del mapa)
python -m http.server 8080

# Con Node.js
npx serve .

# Con Live Server de VS Code
# Clic derecho > "Open with Live Server"
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| **HTML5 semántico** | `<header>`, `<section>`, `<article>`, `<footer>`, `<main>` |
| **CSS3 Variables** | Sistema de tokens de diseño (colores, espaciado, tipografía) |
| **CSS Grid + Flexbox** | Layouts complejos y responsivos |
| **CSS Animations** | `@keyframes`, `transition`, `animation` |
| **Intersection Observer API** | Animaciones activadas por scroll |
| **JavaScript ES6+** | Arrow functions, async/await, destructuring, template literals |
| **Font Awesome 6** | Iconografía via CDN |
| **Google Fonts** | Inter (cuerpo) + Poppins (títulos) |
| **Unsplash** | Imágenes de alta calidad vía API pública |

---

## 📸 Capturas de Pantalla

> Hero Section con imagen destacada y estadísticas animadas

> Catálogo de servicios en grid responsivo (3x2 → 2x3 → 1 columna)

> Formulario de contacto con validación en tiempo real

---

## 🔧 Personalización

### Cambiar número de WhatsApp
En `index.html` y `script.js`, reemplazá `5426642220000` con tu número:
```html
href="https://wa.me/TU_NUMERO?text=..."
```

### Cambiar colores principales
En `styles.css`, modificá las variables CSS en `:root`:
```css
:root {
  --clr-teal-500: hsl(174, 72%, 38%);  /* Color principal */
  --clr-blue-500: hsl(210, 78%, 44%);  /* Color secundario */
}
```

### Agregar servicios
Copiá el bloque `<article class="service-card">` en `index.html` y personalizá el contenido.

---

## 📋 TODO / Mejoras Futuras

- [ ] Conectar formulario a backend (PHP / EmailJS / Formspree)
- [ ] Agregar sistema de turnos online con calendario
- [ ] Implementar PWA (Service Worker + Manifest)
- [ ] Agregar sección de blog/consejos veterinarios
- [ ] Integrar Google Analytics
- [ ] Optimizar imágenes con WebP

---

## 👨‍💻 Autor

**Marcelo** – Desarrollador Front-End

> Proyecto desarrollado para demostrar habilidades en desarrollo web front-end moderno: HTML5, CSS3 y JavaScript vanilla. Disponible en GitHub Pages / Vercel.

---

## 📄 Licencia

Este proyecto es de código abierto, disponible bajo la licencia **MIT**. Podés usarlo, modificarlo y distribuirlo libremente.

---

<div align="center">

Hecho con ❤️ y ☕ | VetCare San Luis © 2024

</div>
