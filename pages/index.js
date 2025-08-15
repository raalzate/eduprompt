// pages/index.js
import { useEffect, useState } from "react";
import PromptSelector from "../components/PromptSelector";
import ChatBox from "../components/ChatBox";
import History, { appendHistory } from "../components/History";

export default function Home() {
  const [picked, setPicked] = useState(null);

  const saveToHistory = (record) => {
    appendHistory(record);
  };

  useEffect(() => {
    // Sugerir instalación como PWA (ligero)
    let deferredPrompt = null;
    const handler = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Podrías mostrar un botón que llame: deferredPrompt.prompt()
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.h1}>EduPrompt ✨</h1>
        <div style={styles.subtitle}>
          Usa plantillas de <em>prompt engineering</em> para aprender mejor.
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.col}>
          <PromptSelector
            picked={picked}
            onPick={setPicked}
          />
          <div style={{ height: 12 }} />
          <ChatBox template={picked?.template} onSaveHistory={saveToHistory} />
        </div>
        <div style={styles.col}>
          <History />
        </div>
      </main>

      <footer style={styles.footer}>
        <small>
          PWA lista: instala desde tu navegador • Solo uso educativo • No envíes
          información sensible.
        </small>
      </footer>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f3f4f6" },
  header: { padding: "1.25rem", textAlign: "center" },
  h1: { margin: 0, fontSize: 28 },
  subtitle: { color: "#6b7280", marginTop: 8 },
  main: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "1fr",
    padding: "1rem",
    maxWidth: 1100,
    margin: "0 auto",
  },
  col: { display: "grid", gap: 12 },
  footer: { textAlign: "center", padding: "1rem", color: "#6b7280" },
};
