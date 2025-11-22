import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FullStory } from "../types";

// Define the response schema to ensure structured JSON output
const storySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "El título final de la historia." },
    setting_description: { type: Type.STRING, description: "Una breve descripción de la región rural/aislada elegida y los elementos culturales." },
    hook: { type: Type.STRING, description: "El gancho de la historia (aprox 200 palabras)." },
    introduction: { type: Type.STRING, description: "La introducción (aprox 300 palabras)." },
    chapters: {
      type: Type.ARRAY,
      description: "Los 6 capítulos de la historia.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Título del capítulo." },
          content: { type: Type.STRING, description: "Contenido del capítulo (aprox 600 palabras)." },
        },
        required: ["title", "content"],
      },
    },
  },
  required: ["title", "hook", "introduction", "chapters", "setting_description"],
};

export const generateStory = async (theme: string, style: string): Promise<FullStory> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key no encontrada. Por favor configura tu clave de API.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Constructing the prompt based on the Persona rules
  const prompt = `
    Actúa como un Creador de Historias Avanzado.
    
    TEMA PROPORCIONADO: "${theme}"
    ESTILO DESEADO: "${style}"
    
    INSTRUCCIONES OBLIGATORIAS:
    1. Escribe la historia EXCLUSIVAMENTE EN ESPAÑOL.
    2. Estructura y longitud:
       - Hook: ~200 palabras.
       - Introducción: ~300 palabras.
       - 6 Capítulos: ~600 palabras CADA UNO.
    3. Localización: Elige una región rural, interior, periférica o aislada coherente. Usa elementos culturales y ambientales de esa zona.
    4. Tono: Usa el estilo "${style}" para crear una atmósfera fuerte.
    5. Lenguaje: Simple, directo, fluido y emocional. Evita lenguaje académico.
    6. NO menciones el conteo de palabras ni el proceso de escritura en el texto.
    7. Si usas animales, que sean coherentes con la región.
    
    Genera toda la historia en formato JSON estructurado.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Using 2.5 Flash for speed and long context
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: storySchema,
        temperature: 0.7, // Creative but controlled
        // Using a thinking budget to ensure adherence to word counts and structure logic
        thinkingConfig: { thinkingBudget: 2048 } 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No se recibió texto de la API.");
    }

    const storyData = JSON.parse(text) as FullStory;
    return storyData;

  } catch (error) {
    console.error("Error generando historia:", error);
    throw error;
  }
};
