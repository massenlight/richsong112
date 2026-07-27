import React from 'react';
import { CORE_PHILOSOPHY_QUOTE_1, CORE_PHILOSOPHY_QUOTE_2 } from '../data/courseData';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';

interface CorePhilosophyProps {
  onOpenRegister: () => void;
}

export const CorePhilosophy: React.FC<CorePhilosophyProps> = ({ onOpenRegister }) => {
  return (
    <section className="py-24 md:py-32 bg-[#050505] text-white relative border-b border-red-900/30 overflow-hidden">
      {/* Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-950/20 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
        
        {/* Flame Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0f0f0f] border border-red-900/40 text-xs font-mono font-extrabold text-red-400 uppercase tracking-[0.2em] rounded-sm">
          <Flame className="w-4 h-4 text-red-600 animate-pulse" />
          <span>社群勝負的分水嶺</span>
        </div>

        {/* Core Quotes Transcribed from Image */}
        <div className="space-y-8 max-w-4xl mx-auto">
          
          {/* Quote 1 */}
          <blockquote className="p-8 sm:p-12 rounded-sm bg-[#0f0f0f] border border-red-900/60 shadow-2xl relative">
            <p className="font-display text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
              真正的贏家，
              <br />
              不是最勤勞發最多篇文的人，
              <br />
              而是最懂得建立
              <span className="text-red-500 underline decoration-red-800 underline-offset-8 px-2 italic">
                「流量加速器」
              </span>
              的人。
            </p>
          </blockquote>

          {/* Quote 2 */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#0f0f0f] border border-red-900/40 text-xl sm:text-3xl font-bold text-neutral-100 tracking-wide font-display">
            {CORE_PHILOSOPHY_QUOTE_2}
          </div>

          {/* Ending Callout: 未來，由你掌控 */}
          <div className="pt-4 space-y-4">
            <p className="text-2xl sm:text-4xl font-black text-red-500 font-mono tracking-widest uppercase">
              未來，屬於懂得駕馭流量的你。
            </p>

            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
              不要再讓不穩定的演算法綁架你的時間。加入《千萬流量脆煉計畫》，建立屬於你的高轉換社群資產！
            </p>
          </div>

        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <button
            onClick={onOpenRegister}
            className="px-10 py-5 bg-white text-black hover:bg-red-800 hover:text-white font-extrabold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-sm shadow-2xl inline-flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4" />
            <span>開啟屬於你的流量新時代</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
