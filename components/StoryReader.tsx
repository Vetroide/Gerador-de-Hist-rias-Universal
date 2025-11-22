import React, { useState, useRef, useEffect } from 'react';
import { FullStory } from '../types';
import { ChevronLeft, Menu, Share2, BookOpen, X } from 'lucide-react';

interface StoryReaderProps {
  story: FullStory;
  onReset: () => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({ story, onReset }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to top when section changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'intro':
        return (
          <div className="animate-fade-in">
             <div className="mb-12 text-center space-y-4 border-b-2 border-stone-100 pb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase">
                Historia Generada
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-ink leading-tight">
                {story.title}
              </h1>
              {story.setting_description && (
                <p className="text-gray-500 italic text-sm md:text-base max-w-2xl mx-auto mt-4">
                  Ambientación: {story.setting_description}
                </p>
              )}
            </div>

            <div className="prose prose-lg prose-stone mx-auto font-serif">
              <h3 className="font-sans text-accent text-sm uppercase tracking-wider font-bold mb-4">El Gancho</h3>
              <div className="text-xl leading-relaxed text-ink first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                {story.hook.split('\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
              </div>

              <div className="my-12 flex items-center justify-center">
                 <div className="w-12 h-1 bg-stone-200 rounded-full"></div>
              </div>

              <h3 className="font-sans text-accent text-sm uppercase tracking-wider font-bold mb-4">Introducción</h3>
              <div className="text-lg leading-relaxed text-gray-800">
                 {story.introduction.split('\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <button 
                onClick={() => setActiveSection('0')}
                className="bg-ink text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Leer Capítulo 1
              </button>
            </div>
          </div>
        );
      default:
        const chapterIndex = parseInt(activeSection);
        const chapter = story.chapters[chapterIndex];
        
        return (
          <div className="animate-fade-in">
             <div className="mb-10 pt-4">
               <span className="block text-center text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                 Capítulo {chapterIndex + 1}
               </span>
               <h2 className="text-3xl md:text-4xl font-display font-bold text-ink text-center">
                 {chapter.title}
               </h2>
             </div>

             <div className="prose prose-lg prose-stone mx-auto font-serif text-lg leading-loose text-gray-800">
                {chapter.content.split('\n').map((p, i) => (
                  <p key={i} className="mb-6 indent-6">{p}</p>
                ))}
             </div>

             <div className="mt-16 flex justify-between items-center pt-8 border-t border-stone-100">
                <button 
                  onClick={() => {
                    if (chapterIndex === 0) setActiveSection('intro');
                    else setActiveSection((chapterIndex - 1).toString());
                  }}
                  className="text-gray-500 hover:text-accent flex items-center gap-2 font-medium"
                >
                  <ChevronLeft size={20} /> Anterior
                </button>

                {chapterIndex < story.chapters.length - 1 ? (
                  <button 
                    onClick={() => setActiveSection((chapterIndex + 1).toString())}
                    className="bg-ink text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    Siguiente Capítulo
                  </button>
                ) : (
                   <span className="text-accent font-display font-bold">Fin de la historia</span>
                )}
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-paper text-ink overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-stone-200 z-20 sticky top-0">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <BookOpen className="text-accent" size={24} />
          <span className="font-display font-bold text-lg hidden md:block">Narrador AI</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-stone-100 rounded-full transition-colors text-gray-600 hidden md:block">
             <span className="text-xs font-medium uppercase tracking-wider">{story.chapters.length} Capítulos</span>
          </button>
          <button 
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <Menu className="text-ink" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Navigation (Desktop) */}
        <nav className="hidden md:block w-72 bg-stone-50 border-r border-stone-200 overflow-y-auto p-6 shrink-0">
          <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">Índice</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection('intro')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'intro' 
                    ? 'bg-white text-accent shadow-sm border border-stone-100' 
                    : 'text-gray-600 hover:bg-stone-100'
                }`}
              >
                Introducción
              </button>
            </li>
            {story.chapters.map((chapter, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setActiveSection(idx.toString())}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === idx.toString() 
                      ? 'bg-white text-accent shadow-sm border border-stone-100' 
                      : 'text-gray-600 hover:bg-stone-100'
                  }`}
                >
                  <span className="opacity-50 mr-2">{idx + 1}.</span>
                  {chapter.title}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-8 border-t border-stone-200">
            <button 
              onClick={onReset}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors w-full text-left uppercase tracking-wider font-bold"
            >
              Crear nueva historia
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-2xl p-6 animate-fade-in-right">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display font-bold text-lg">Índice</h3>
                <button onClick={() => setMenuOpen(false)}><X /></button>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setActiveSection('intro')}
                    className={`block w-full text-left text-sm font-medium ${activeSection === 'intro' ? 'text-accent' : 'text-gray-600'}`}
                  >
                    Introducción
                  </button>
                </li>
                {story.chapters.map((chapter, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setActiveSection(idx.toString())}
                      className={`block w-full text-left text-sm font-medium ${activeSection === idx.toString() ? 'text-accent' : 'text-gray-600'}`}
                    >
                       Capítulo {idx + 1}: {chapter.title}
                    </button>
                  </li>
                ))}
              </ul>
               <button 
                onClick={onReset}
                className="mt-8 text-sm text-red-500 w-full text-left"
              >
                Empezar de nuevo
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main ref={contentRef} className="flex-1 overflow-y-auto relative bg-paper px-4 md:px-12 py-12 scroll-smooth">
          <div className="max-w-3xl mx-auto pb-24">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
