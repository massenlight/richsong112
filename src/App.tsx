import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PainPoints } from './components/PainPoints';
import { CurriculumModules } from './components/CurriculumModules';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { DEFAULT_IMAGE_SLOTS } from './data/courseData';
import { Sparkles, Flame } from 'lucide-react';
import { ensureDirectLandingVisit } from './lib/directLandingTracking';
import { trackedLineEntryUrl } from './lib/lineEntry';

export default function App() {
  const [entryVisit, setEntryVisit] = useState('');

  useEffect(() => {
    void ensureDirectLandingVisit().then(setEntryVisit);
  }, []);

  const handleOpenRegister = () => {
    window.location.assign(trackedLineEntryUrl(entryVisit));
  };

  const heroImage = DEFAULT_IMAGE_SLOTS.find((slot) => slot.id === 'hero_banner')?.currentUrl || DEFAULT_IMAGE_SLOTS[0].currentUrl;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-900 selection:text-white antialiased">
      
      {/* Public LINE purpose notice */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-black border-b border-red-800 text-[11px] sm:text-xs py-1.5 px-4 text-center text-red-200 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <span className="flex items-center gap-1 font-bold">
          <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>加入世豐老師官方 LINE・取得課程與說明會資訊</span>
        </span>
      </div>

      {/* Sticky Header */}
      <Header
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          heroImageUrl={heroImage}
          onOpenRegister={handleOpenRegister}
        />

        <PainPoints />

        <CurriculumModules />

        <Faq />

        <Pricing
          onOpenRegister={handleOpenRegister}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Floating Bottom Bar for Mobile & Desktop */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg p-3 rounded-2xl bg-black/90 backdrop-blur-xl border border-red-800/80 shadow-2xl shadow-red-950 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
            <Flame className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">首波特惠 8.1 折</span>
          </div>
        </div>

        <button
          onClick={handleOpenRegister}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 font-bold text-xs text-white shadow-lg shadow-red-900/60 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>加入官方 LINE</span>
        </button>
      </div>

    </div>
  );
}
