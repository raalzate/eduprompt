
# 📚 EduPrompt - PWA de Asistencia Escolar con LLM y Prompt Engineering

**EduPrompt** es una aplicación web progresiva (PWA) construida con **Next.js** que permite a estudiantes escolares interactuar con modelos de lenguaje (LLM) de manera más eficiente.  
A través de técnicas de *prompt engineering*, los estudiantes pueden obtener respuestas optimizadas para temas educativos como ciencias, matemáticas, historia, idiomas, redacción y más.

## 🚀 Características

- ✅ **Interfaz amigable para estudiantes**
- ✅ **Selección de prompts mediante etiquetas (tags lineales)**
- ✅ **Plantillas de prompts personalizadas para temas escolares**
- ✅ **Soporte para OpenAI API u otros LLMs**
- ✅ **Modo PWA para instalar en dispositivos móviles**
- ✅ **Diseño responsive y rápido**

## 📂 Estructura del Proyecto

```

├── components/
│   ├── PromptSelector.js     # Selector de prompts como tags
│   ├── ChatBox.js            # Interfaz para enviar y recibir mensajes
│   ├── PromptForm.js         # Formulario dinámico basado en la plantilla seleccionada
├── lib/
│   ├── llmClient.js          # Cliente para conectarse con el LLM
├── pages/
│   ├── index.js              # Página principal
│   ├── \_app.js               # Configuración global de estilos
│   ├── api/
│       ├── chat.js           # Endpoint para interactuar con el LLM
├── public/
│   ├── icons/                # Iconos para PWA
│   ├── manifest.json         # Configuración PWA
├── promptsCatalog.js         # Catálogo de plantillas educativas
├── package.json
└── README.md

````

## 🧠 Ejemplo de Catálogo de Prompts

```javascript
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
      "Resuelve paso a paso el siguiente problema: {problema}. Primero, identifica los datos, luego el procedimiento, y finalmente el resultado."
  },
  {
    id: "history-timeline",
    title: "Línea de tiempo histórica",
    template:
      "Crea una línea de tiempo resumida sobre {evento_o_periodo}. Incluye 5 hitos clave y su importancia."
  }
  // ... otros prompts educativos
];
````

## ⚙️ Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/raalzate/eduprompt.git
   cd eduprompt
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Configura tu **API Key** de OpenAI (o LLM alternativo) en un archivo `.env.local`:

   ```env
   OPENAI_API_KEY=tu_api_key
   ```

4. Ejecuta en desarrollo:

   ```bash
   npm run dev
   ```

5. Abre en tu navegador:

   ```
   http://localhost:3000
   ```

## 📦 Build y PWA

Para generar la versión optimizada y lista para producción:

```bash
npm run build
npm start
```

Si accedes desde un dispositivo móvil compatible, podrás **instalar la app** como si fuera nativa.

## 🎯 Tecnologías Usadas

* **Next.js** (Framework React)
* **TailwindCSS** (Estilos)
* **OpenAI API** (o cualquier otro LLM)
* **next-pwa** (Soporte para PWA)
* **JavaScript / JSX**

## 👨‍🏫 Enfoque Educativo

EduPrompt está diseñado para ayudar a estudiantes a:

* Comprender conceptos de forma más clara
* Desarrollar habilidades de redacción
* Aprender idiomas con ejemplos prácticos
* Practicar matemáticas con explicaciones paso a paso
* Explorar historia y ciencias de forma interactiva


