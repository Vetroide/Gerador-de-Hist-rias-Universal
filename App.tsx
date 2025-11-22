import React, { useState } from 'react';
import { AppState, StoryRequest, FullStory } from './types';
import { ThemeInput } from './components/ThemeInput';
import { StyleSelector } from './components/StyleSelector';
import { LoadingScreen } from './components/LoadingScreen';
import { StoryReader } from './components/StoryReader';
import { generateStory } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [requestData, setRequestData] = useState<StoryRequest>({ theme: '', style: '' });
  const [story, setStory] = useState<FullStory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleThemeSubmit = (theme: string) => {
    setRequestData((prev) => ({ ...prev, theme }));
    setAppState(AppState.ASKING_STYLE);
  };

  const handleStyleSubmit = async (style: string) => {
    setRequestData((prev) => ({ ...prev, style }));
    setAppState(AppState.GENERATING);
    setError(null);

    try {
      const generatedStory = await generateStory(requestData.theme, style);
      setStory(generatedStory);
      setAppState(AppState.READING);
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al conectar con la musa creativa (API Error). Por favor intenta de nuevo.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setRequestData({ theme: '', style: '' });
    setStory(null);
    setError(null);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.IDLE:
        return <ThemeInput onSubmit={handleThemeSubmit} />;
      
      case AppState.ASKING_STYLE:
        return (
          <StyleSelector 
            theme={requestData.theme} 
            onBack={() => setAppState(AppState.IDLE)}
            onGenerate={handleStyleSubmit} 
          />
        );
      
      case AppState.GENERATING:
        return <LoadingScreen />;
      
      case AppState.READING:
        return story ? <StoryReader story={story} onReset={handleReset} /> : null;
      
      case AppState.ERROR:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <div className="bg-red-50 text-red-800 p-8 rounded-2xl max-w-md border border-red-100">
              <h2 className="text-2xl font-bold mb-4">Error</h2>
              <p className="mb-6">{error || "Algo salió mal."}</p>
              <button 
                onClick={() => setAppState(AppState.ASKING_STYLE)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-paper text-ink font-sans selection:bg-accent/20">
      {renderContent()}
    </div>
  );
};

export default App;
