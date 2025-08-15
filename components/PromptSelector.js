// components/PromptSelector.js
import { promptsCatalog } from "../pages/prompts";

export default function PromptSelector({ onPick, picked }) {
  return (
    <>
      <h2>📚 Elige una plantilla</h2>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {promptsCatalog.map((prompt) => {
          const isSelected = picked?.id === prompt.id;
          return (
            <button
              key={prompt.id}
              onClick={() => onPick(prompt)}
              style={{
                padding: "6px 12px",
                borderRadius: "16px",
                border: isSelected ? "2px solid #0070f3" : "1px solid #ccc",
                backgroundColor: isSelected ? "#e6f0ff" : "#f7f7f7",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {prompt.title}
            </button>
          );
        })}
      </div>
    </>
  );
}
