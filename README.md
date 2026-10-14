# 🚀 RutaFullStack — Plataforma Educativa Interactiva

Plataforma educativa web diseñada para enseñar desarrollo de software desde cero absoluto hasta nivel profesional Full Stack (Web, Móvil, Escritorio y DevOps).

---

## 🌟 Características Principales

1. **Pedagogía Intuitiva:** Cada concepto técnico se explica con una analogía del mundo real (servicio postal, restaurantes, recetas de cocina, cajas de juguetes).
2. **Laboratorio Interactivo:**
   - Editor de código en vivo con **CodeMirror 6** y ejecución con consola segura.
   - Simulador de terminal Bash y Git para practicar sin instalar nada.
3. **Gimnasio de Ejercicios:** 3 ejercicios progresivos por lección (Nivel 1: Calentamiento, Nivel 2: Entrenamiento, Nivel 3: Reto) con pistas escalonadas y solución oficial explicada.
4. **Mini Quizzes con Retroalimentación:** Preguntas con explicación pedagógica inmediata de aciertos y errores.
5. **Gamificación y Motivación:** Puntos de experiencia (XP), racha diaria con llama de actividad, niveles de desarrollador e insignias desbloqueables.
6. **Capa de Datos Desacoplada (Fase 1 ➔ Fase 2):**
   - **Fase 1 (Actual):** Almacenamiento local mediante `localStorage`, exportación e importación de copias de seguridad en formato `.json`.
   - **Fase 2 (Preparada):** Interfaz `IProgressRepository` lista para inyectar Supabase o Firebase sin alterar ningún componente.
7. **Herramientas de Apoyo:**
   - Test diagnóstico de nivel inicial (recomienda por qué módulo empezar).
   - Glosario de términos con analogías y ejemplos de código.
   - Directorio de recursos oficiales y cheatsheets recomendadas.
   - Soporte completo para Modo Oscuro y Modo Claro.

---

## 💻 Ejecución Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (despliegue en Vercel, Netlify o GitHub Pages)
npm run build
```

El servidor estará disponible en `http://localhost:5173/`.
