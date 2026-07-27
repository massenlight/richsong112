import React from 'react';
import { CORE_LEARNINGS } from '../data/courseData';
import { Eye, Share2, Users, Award, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

interface TargetAudienceProps {
  onOpenRegister: () => void;
}

export const TargetAudience: React.FC<TargetAudienceProps> = ({ onOpenRegister }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye': return <Eye className="w-5 h-5 text-red-500" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-red-500" />;
      case 'Users': return <Users className="w-5 h-5 text-red-500" />;
      case 'Award': return <Award className="w-5 h-5 text-red-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-red-500" />;
      default: return <Sparkles className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section id="target-audience" className="py-20 md:py-28 bg-[#050505] text-white relative border-b border-red-900/30 overflow-hidden">
      {/* Radial Lighting Accent */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Transcribed 5 Core Learnings List ("你都將知道：") */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
              完成《千萬流量脆煉計畫》後，你都將知道：
            </h3>
            <p className="text-neutral-400 text-sm">
              一套從流量吸引、社群擴散到最終變現的完整 Threads 行銷邏輯
            </p>
          </div>

          <div className="grid gap-4">
            {CORE_LEARNINGS.map((item, index) => (
              <div
                key={index}
                className="p-5 sm:p-6 rounded-sm bg-[#0f0f0f] border border-neutral-800 hover:border-red-800 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-sm bg-red-950/60 border border-red-800 flex items-center justify-center shrink-0 group-hover:bg-red-800 transition-all">
                  {getIcon(item.icon)}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-red-500">0{index + 1}</span>
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors font-display">
                      {item.question}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    {item.description}
                  </p>
                </div>

                <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all hidden sm:block" />
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={onOpenRegister}
              className="px-8 py-4 bg-red-800 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-widest shadow-2xl transition-all cursor-pointer rounded-sm"
            >
              掌握五大核心能力，立即報名
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
