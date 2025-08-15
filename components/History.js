// components/History.js
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Collapse } from "react-collapse";

const STORAGE_KEY = "edu_prompt_history_v1";

export default function History() {
  const [items, setItems] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const toggleCollapse = () => {
    setIsOpened(!isOpened);
  };
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const clear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
  };

  return (
    <div style={styles.box}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>🗂️ Historial</h2>
        <button onClick={clear} style={styles.clearBtn}>
          Limpiar
        </button>
      </div>
      {items.length === 0 && (
        <div style={{ color: "#6b7280" }}>Sin registros aún.</div>
      )}
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((it, idx) => (
          <div key={idx} >
            <button style={styles.item} onClick={toggleCollapse}>
               <div style={styles.date}>
                {new Date(it.date).toLocaleString()}
              </div>
               <div>
                <strong>#{idx+1} Prompt:</strong> {it.prompt}
              </div>
            </button>
            <Collapse isOpened={isOpened}>
              <div style={{ fontSize: 12, marginTop: 8, marginLeft: 10}}>
                <strong>Respuesta:</strong>
                <Markdown >
                  {it.answer}
                </Markdown>
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper para guardar desde fuera
export function appendHistory(record) {
  const STORAGE_KEY = "edu_prompt_history_v1";
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    current.unshift(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(0, 50)));
  } catch {}
}

const styles = {
  box: {
    padding: "1rem",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,.06)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  clearBtn: {
    border: 0,
    borderRadius: 8,
    padding: "6px 10px",
    background: "#fee2e2",
    color: "#991b1b",
    cursor: "pointer",
  },
  item: {
    border: "1px solid #eee",
    padding: 10,
    borderRadius: 8,
    background: "#fafafa",
    cursor: "pointer",
    textAlign: "left",
    
  },
  date: { fontSize: 12, color: "#6b7280", marginBottom: 6 },
};
