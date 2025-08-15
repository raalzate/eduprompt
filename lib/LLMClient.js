// lib/LLMClient.js
export class LLMClient {
  constructor(apiKey, model = "gpt-4o-mini") {
    if (!apiKey) throw new Error("API Key requerida");
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = "https://api.openai.com/v1/chat/completions";
  }

  async sendMessage(prompt, options = {}) {
    const body = {
      model: this.model,
      messages: [
        {
          role: "system",
          content:
            "Eres un tutor escolar. Responde con claridad, sin contenido inapropiado. Explica paso a paso cuando sea útil."
        },
        { role: "user", content: prompt }
      ],
      temperature: options.temperature ?? 0.5,
      max_tokens: options.maxTokens ?? 400
    };

    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "Error en la API del LLM");
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() ?? "";
  }
}
