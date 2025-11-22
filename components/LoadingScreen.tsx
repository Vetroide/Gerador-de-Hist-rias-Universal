import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const LOADING_TEXTS = [
  "Seleccionando una región adecuada...",
  "Definiendo el gancho narrativo...",
  "Escribiendo la introducción...",
  "Desarrollando los personajes...",
  "Escribiendo Capítulo 1...",
  "Añadiendo conflicto en Capítulo 3...",
  "Preparando el clímax...",
  "Revisando la extensión de las palabras...",
  "Finalizando detalles..."
];

export const LoadingScreen: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 3500); // Change text every 3.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-paper z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
        <div className="absolute inset-0 border-t-4 border-accent rounded-full animate-spin"></div>
        <Loader2 className="text-accent w-10 h-10 animate-pulse" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-4 text-center">
        Creando tu historia
      </h2>
      
      <div className="h-8 overflow-hidden relative w-full max-w-md text-center">
          <p className="text-gray-500 animate-pulse transition-all duration-500 text-lg">
            {LOADING_TEXTS[textIndex]}
          </p>
      </div>
      
      <p className="mt-12 text-sm text-gray-400 max-w-xs text-center">
        Esto puede tomar unos momentos. Estoy asegurándome de cumplir con la estructura exacta y el tono perfecto.
      </p>
    </div>
  );
};
