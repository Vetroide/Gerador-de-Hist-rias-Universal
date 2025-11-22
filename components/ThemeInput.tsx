import React, { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

interface ThemeInputProps {
  onSubmit: (theme: string) => void;
}

export const ThemeInput: React.FC<ThemeInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto px-6 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
          <BookOpen size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4 tracking-tight">
          Narrador AI
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Dame un título, una idea o un pequeño resumen. Yo crearé una historia completa para ti.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full relative group">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ej: Un relojero que vive en un faro y descubre que el tiempo se ha detenido..."
            className="w-full min-h-[160px] p-6 text-lg md:text-xl bg-white border-2 border-stone-200 rounded-2xl shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none transition-all placeholder:text-gray-300 font-serif text-ink"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute bottom-4 right-4 bg-accent text-white p-3 rounded-xl hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-md"
          >
            Continuar <ArrowRight size={20} />
          </button>
        </div>
        <div className="absolute -z-10 inset-0 bg-stone-100 rounded-2xl transform rotate-1 scale-[1.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </form>
    </div>
  );
};
