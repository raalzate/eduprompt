// pages/api/chat.js
import { LLMClient } from "../../lib/LLMClient";

const DISALLOWED = [
  // Palabras/temas prohibidos (ejemplo básico, ajusta a tu contexto)
  "violencia extrema",
  "armas",
  "drogas",
  "contenido sexual",
  "odio",
  "autolesión"
];

function isEducationalPrompt(text = "") {
  const t = text.toLowerCase();
  // Prohíbe temas de la lista
  if (DISALLOWED.some((w) => t.includes(w))) return false;
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt requerido" });
  }

  if (!isEducationalPrompt(prompt)) {
    return res.status(400).json({
      error:
        "El prompt no cumple con las políticas educativas. Reformúlalo con fines académicos."
    });
  }

  try {
    const client = new LLMClient(process.env.OPENAI_API_KEY);
    const answer = await client.sendMessage(
      // Refuerzo educativo y de honestidad académica
      `${prompt}\n\nImportante: Explica con claridad para un estudiante escolar y fomenta el aprendizaje, no hagas la tarea completa sin explicar.`
    );
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error de servidor" });
  }
}
