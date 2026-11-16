# Cápsulas del Cuidado - SST

Portal web interactivo de **Seguridad y Salud en el Trabajo (SST)** diseñado para centros asistenciales e instituciones de salud ("Salud y bienestar para todos"). Este proyecto transforma una infografía estática en una experiencia web moderna, educativa y dinámica para el personal médico, asistencial y administrativo.

---

## 🚀 Enlaces de Producción
- **Sitio Público (Netlify):** [https://idyllic-sunshine-18de7c.netlify.app/](https://idyllic-sunshine-18de7c.netlify.app/)
- **Repositorio GitHub:** [https://github.com/ximepepa12/capsulas-del-cuidado](https://github.com/ximepepa12/capsulas-del-cuidado)

---

## ✨ Características Principales e Interactividad

1. **Barra de Navegación y Cabecera Institucional**:
   - Cabecera institucional con eslogan de seguridad.
   - Navegación rápida entre secciones: Inicio, Riesgo Biológico, Elementos de Protección Personal (EPP), Bioseguridad, Plan Hospitalario, PVE (Vigilancia Epidemiológica), Pausas Activas y Encuestas.

2. **Tarjetas de Cápsulas con Modales Interactivos**:
   - Cada tarjeta informativa cuenta con un botón **"Ver más"** que despliega una ventana modal con protocolos detallados y recomendaciones de autocuidado.

3. **Módulo de Pausas Activas**:
   - Temporizador interactivo de cuenta regresiva (3 minutos) con botones de control (*Iniciar*, *Pausar*, *Reiniciar*) y guía de ejercicios de estiramiento y descanso visual.

4. **Evaluaciones y Cuestionarios**:
   - **Encuesta de Conocimientos SST**: Cuestionario interactivo de opción múltiple con calificación instantánea y retroalimentación en tiempo real.
   - **Encuesta de Satisfacción**: Sistema de calificación con estrellas interactivas y cuadro de comentarios.

5. **Checklist Diario de Autocuidado**:
   - Lista de verificación interactiva ("Tu Salud es lo más Importante") con persistencia de estado mediante `localStorage`.

---

## 🛠️ Stack Tecnológico
- **HTML5**: Estructura semántica moderna.
- **CSS3**: Diseño responsivo (Flexbox/Grid), variables CSS, animaciones suaves y paleta de colores institucional del sector salud.
- **JavaScript (ES6+)**: Gestión de estado, eventos modales, temporizadores y validación de formularios.

---

## 🤖 Contexto para Agentes de IA y Desarrolladores
Este repositorio está diseñado para ser autogestionado por asistentes de IA (como Gemini CLI) y desplegado de forma continua mediante Netlify. 

### Estructura del Proyecto:
```text
capsulas-del-cuidado/
├── index.html       # Estructura principal y secciones de contenido
├── styles.css       # Estilos CSS modernos y responsivos
├── app.js           # Lógica interactiva (Modales, temporizador, cuestionarios)
└── README.md        # Documentación del proyecto
```

### Flujo de Desarrollo:
1. Modificar los archivos (`index.html`, `styles.css`, `app.js`) según los requerimientos del usuario.
2. Hacer commit y push a la rama `main` de GitHub.
3. Netlify despliega automáticamente los cambios en segundos.
