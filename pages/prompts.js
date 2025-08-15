// pages/prompts.js
export const promptsCatalog = [
  {
    id: "science-explain",
    title: "Explicar un concepto científico",
    template:
      "Explica el concepto de {tema} como para un estudiante de {grado} grado. Usa ejemplos cotidianos y una analogía."
  },
  {
    id: "math-step",
    title: "Resolver un problema de matemáticas paso a paso",
    template:
      "Resuelve paso a paso el siguiente problema: {problema}. Primero, identifica los datos, luego el procedimiento, y finalmente el resultado. Evita solo dar la respuesta final."
  },
  {
    id: "history-timeline",
    title: "Línea de tiempo histórica",
    template:
      "Crea una línea de tiempo resumida sobre {evento_o_periodo}. Incluye 5 hitos clave y su importancia."
  },
  {
    id: "writing-helper",
    title: "Apoyo para escribir un texto",
    template:
      "Ayúdame a escribir un texto de {tipo_texto} sobre {tema} con extensión aproximada de {cantidad_palabras} palabras. Da una estructura sugerida (introducción, desarrollo, conclusión)."
  },
  {
    id: "language-vocab",
    title: "Vocabulario y pronunciación (inglés)",
    template:
      "Enséñame 8 palabras sobre {tema} en inglés con significado en español y guía de pronunciación simple (españolizado). Luego, construye 3 frases de ejemplo."
  },
  {
    id: "geography-map",
    title: "Explicación de un país o región",
    template:
      "Describe la ubicación, cultura, economía y curiosidades de {pais_o_region} de forma simple y visual para un estudiante de {grado} grado."
  },
  {
    id: "chemistry-experiment",
    title: "Experimento de química seguro",
    template:
      "Explica cómo hacer un experimento seguro sobre {tema} usando materiales caseros. Incluye pasos, precauciones y qué aprenderemos."
  },
  {
    id: "literature-analysis",
    title: "Análisis de un cuento o poema",
    template:
      "Analiza la obra {titulo} de {autor}. Describe la trama, los personajes y el mensaje principal, adaptado a estudiantes de {grado} grado."
  },
  {
    id: "math-real-life",
    title: "Aplicación de matemáticas en la vida diaria",
    template:
      "Explica cómo se usa el concepto matemático de {concepto} en situaciones reales, usando ejemplos cotidianos."
  },
  {
    id: "science-quiz",
    title: "Crear un mini cuestionario de ciencias",
    template:
      "Genera 5 preguntas y respuestas sobre {tema_cientifico} para que un estudiante de {grado} pueda practicar."
  },
  {
    id: "art-project",
    title: "Proyecto de arte escolar",
    template:
      "Diseña una idea de proyecto artístico relacionado con {tema}, incluyendo materiales, pasos y objetivo final."
  },
  {
    id: "history-character",
    title: "Biografía de un personaje histórico",
    template:
      "Escribe un resumen de la vida de {personaje} resaltando 5 hechos clave, explicados para estudiantes de {grado} grado."
  },
  {
    id: "environment-tips",
    title: "Consejos para cuidar el medio ambiente",
    template:
      "Genera una lista de 8 consejos prácticos para cuidar el medio ambiente en la escuela y en casa."
  },
  {
    id: "technology-basic",
    title: "Explicación de un concepto tecnológico",
    template:
      "Explica qué es {tecnologia} y cómo se usa en la vida diaria, adaptado para estudiantes de {grado} grado."
  },
  {
    id: "study-plan",
    title: "Plan de estudio personalizado",
    template:
      "Crea un plan de estudio de 1 semana para aprender {tema} en {grado} grado, incluyendo actividades, recursos y objetivos."
  }
];


// Utilidad: extraer {placeholders}
export function extractPlaceholders(template) {
  const matches = template.match(/\{([^}]+)\}/g) || [];
  const names = matches.map((m) => m.slice(1, -1));
  return [...new Set(names)];
}

export function fillTemplate(template, values) {
  return template.replace(/\{([^}]+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}
