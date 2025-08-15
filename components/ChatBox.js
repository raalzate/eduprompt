// components/ChatBox.js
import { useEffect, useMemo, useState } from "react";
import Markdown from 'react-markdown'

import { extractPlaceholders, fillTemplate } from "../pages/prompts";

export default function ChatBox({ template, onSaveHistory }) {
  const [fields, setFields] = useState({});
  const [finalPrompt, setFinalPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(true);

  const placeholders = useMemo(
    () => (template ? extractPlaceholders(template) : []),
    [template]
  );

  useEffect(() => {
    setFields({});
    setFinalPrompt("");
    setAnswer("");
  }, [template]);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    setOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const buildPrompt = () => {
    if (!template) return "";
    const fp = fillTemplate(template, fields);
    setFinalPrompt(fp);
    return fp;
  };

  const sendPrompt = async () => {
    const prompt = buildPrompt();
    if (!prompt) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (res.ok) {
        setAnswer(data.answer || "");
        onSaveHistory?.({
          date: new Date().toISOString(),
          prompt,
          answer: data.answer || ""
        });
      } else {
        setAnswer(data.error || "No se pudo obtener respuesta.");
      }
    } catch {
      setAnswer("Parece que estás sin conexión o hubo un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>🎯 Construye tu prompt</h2>
        <span
          title={online ? "En línea" : "Sin conexión"}
          style={{
            ...styles.badge,
            background: online ? "#d1fae5" : "#fee2e2",
            color: online ? "#065f46" : "#991b1b"
          }}
        >
          {online ? "En línea" : "Offline"}
        </span>
      </div>

      {!template && (
        <div style={styles.hint}>Elige una plantilla para comenzar</div>
      )}

      {template && (
        <>
          <div style={styles.templateBox}>
            <div style={styles.label}>Plantilla</div>
            <div style={styles.templateText}>{template}</div>
          </div>

          {placeholders.length > 0 && (
            <div style={styles.form}>
              {placeholders.map((name) => (
                <div key={name} style={styles.field}>
                  <label style={styles.label}>{name}</label>
                  <input
                    style={styles.input}
                    value={fields[name] || ""}
                    onChange={(e) =>
                      setFields((prev) => ({ ...prev, [name]: e.target.value }))
                    }
                    placeholder={`Escribe ${name}...`}
                  />
                </div>
              ))}
            </div>
          )}

          <div style={styles.buttons}>
            <button onClick={buildPrompt} style={styles.secondary}>
              Previsualizar prompt
            </button>
            <button onClick={sendPrompt} style={styles.primary} disabled={loading}>
              {loading ? "Consultando..." : "Enviar al LLM"}
            </button>
          </div>

          {finalPrompt && (
            <div style={styles.preview}>
              <div style={styles.label}>Prompt final</div>
              <pre style={styles.pre}>{finalPrompt}</pre>
            </div>
          )}

          {answer && (
            <div style={styles.answerBox}>
              <div style={styles.label}>Respuesta</div>
              <Markdown style={styles.answer}>{answer}</Markdown>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  wrap: { padding: "1rem", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,.06)" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  badge: { padding: "4px 8px", borderRadius: 8, fontSize: 12, fontWeight: 600 },
  hint: { padding: "0.5rem 0", color: "#6b7280" },
  templateBox: { marginTop: 12, padding: 12, background: "#f9fafb", border: "1px solid #eee", borderRadius: 8 },
  templateText: { whiteSpace: "pre-wrap", fontSize: 14 },
  form: { display: "grid", gap: 12, marginTop: 12 },
  field: { display: "grid", gap: 6 },
  label: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#6b7280" },
  input: { padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd" },
  buttons: { display: "flex", gap: 10, marginTop: 12 },
  primary: { background: "#111827", color: "#fff", padding: "8px 14px", borderRadius: 8, border: 0, cursor: "pointer" },
  secondary: { background: "#e5e7eb", color: "#111827", padding: "8px 14px", borderRadius: 8, border: 0, cursor: "pointer" },
  preview: { marginTop: 12, padding: 12, background: "#fefce8", border: "1px solid #fde68a", borderRadius: 8 },
  pre: { whiteSpace: "pre-wrap", margin: 0, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", fontSize: 13 },
  answerBox: { marginTop: 12, padding: 12, background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 8 },
  answer: { whiteSpace: "pre-wrap" }
};
