import React, { useState } from 'react';
import { Feather, Sparkles } from 'lucide-react';

interface StyleSelectorProps {
  theme: string;
  onBack: () => void;
  onGenerate: (style: string) => void;
}

const PRESET_STYLES = [
  "Misterio Rural",
  "Realismo Mágico",
  "Terror Folclórico",
  "Drama Emotivo",
  "Aventura de Supervivencia",
  "Fábula Oscura",
  "Suspenso Psicológico",
  "Melancólico y Poético"
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({ theme, onBack, onGenerate }) => {
  const [customStyle, setCustomStyle] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handleGenerate = () => {
    const finalStyle = customStyle.trim() || selectedPreset;
    if (finalStyle) {
      onGenerate(finalStyle);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-3xl mx-auto px-6 animate-fade-in">
      
      <div className="w-full bg-white p-6 rounded-2xl border border-stone-200 shadow-sm mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Tu idea</h3>
        <p className="text-ink font-serif italic text-lg line-clamp-3">"{theme}"</p>
      </div>

      <div className="text-center mb-8">
         <div className="inline-flex items-center justify-center p-3 bg-stone-100 rounded-full mb-4">
             <Feather className="text-accent w-6 h-6" />
         </div>
        <h2 className="text-3xl font-display font-bold text-ink">
          ¿Qué estilo quieres que use?
        </h2>
        <p className="text-gray-500 mt-2">
          Esto definirá la atmósfera, el tono y las emociones de la narración.
        </p>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {PRESET_STYLES.map((style) => (
          <button
            key={style}
            onClick={() => {
              setSelectedPreset(style);
              setCustomStyle('');
            }}
            className={`p-3 rounded-xl text-sm font-medium transition-all border-2 ${
              selectedPreset === style
                ? 'border-accent bg-accent/5 text-accent'
                : 'border-transparent bg-white hover:bg-stone-50 text-gray-600 shadow-sm'
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      <div className="w-full relative mb-8">
        <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">O describe tu propio estilo</div>
        <input
          type="text"
          value={customStyle}
          onChange={(e) => {
            setCustomStyle(e.target.value);
            setSelectedPreset(null);
          }}
          placeholder="Ej: Cyberpunk noir en los Andes..."
          className="w-full p-4 bg-white border-2 border-stone-200 rounded-xl focus:border-accent outline-none transition-all text-lg"
        />
      </div>

      <div className="flex gap-4 w-full md:w-auto">
        <button
          onClick={onBack}
          className="flex-1 md:flex-none px-6 py-3 text-gray-500 font-medium hover:text-ink transition-colors"
        >
          Volver
        </button>
        <button
          onClick={handleGenerate}
          disabled={!selectedPreset && !customStyle.trim()}
          className="flex-1 md:flex-none bg-accent text-white px-8 py-3 rounded-xl hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium shadow-lg shadow-accent/20"
        >
          <Sparkles size={18} />
          Escribir Historia
        </button>
      </div>
    </div>
  );
};
