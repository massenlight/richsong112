import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/courseData';
import { RegistrationFormData } from '../types';
import { X, CheckCircle2, Sparkles, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('early_bird');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    threadsHandle: '',
    role: '創作者',
    planId: 'early_bird',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#050505] border border-red-900/60 rounded-sm shadow-2xl overflow-hidden flex flex-col text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-red-900/40 flex items-center justify-between bg-[#0f0f0f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black border border-red-800 flex items-center justify-center text-red-500 rounded-sm">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">搶先加入《千萬流量脆煉計畫》</h3>
              <p className="text-xs font-mono text-red-400">
                限時早鳥名額開放中 · 即刻解鎖 Threads 演算法爆文邏輯
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="p-2 bg-black hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {submitted ? (
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-red-950 border border-red-600 flex items-center justify-center mx-auto text-red-500 rounded-sm shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-black text-white font-display">準備加入官方 Line 報名</h4>
                <p className="text-sm text-neutral-300">
                  您已選擇【<span className="text-red-400 font-bold">{selectedPlan.name}{selectedPlan.price ? ` (${selectedPlan.price})` : ''}</span>】！請點擊下方按鈕加入 Line 官方帳號進行報名與諮詢。
                </p>
              </div>

              <div className="p-4 rounded-sm bg-[#0f0f0f] border border-neutral-800 text-xs font-mono text-neutral-400 space-y-2 max-w-md mx-auto text-left">
                <div className="flex justify-between">
                  <span>預約方案：</span>
                  <span className="text-white font-bold">{selectedPlan.name}{selectedPlan.price ? ` (${selectedPlan.price})` : ''}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://lin.ee/U7dShjrb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  前往官方 Line 帳號報名
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs uppercase tracking-widest rounded-sm transition-all cursor-pointer"
                >
                  返回首頁
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Plan Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold font-mono text-red-400 uppercase tracking-widest block">
                  上課即可解鎖
                </label>

                <div className={`grid ${PRICING_PLANS.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'} gap-4`}>
                  {PRICING_PLANS.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-4 rounded-sm border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#0f0f0f] border-red-600 shadow-lg'
                            : 'bg-[#0f0f0f] border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 bg-red-950 text-red-400 border border-red-900 rounded-sm">
                            {plan.badge}
                          </span>
                        </div>

                        <h5 className="font-bold text-white text-base font-display mb-2">{plan.name}</h5>
                        {plan.price && (
                          <div className="flex items-baseline gap-2 my-1">
                            <span className="text-xl font-black text-red-500 font-mono">{plan.price}</span>
                            {plan.originalPrice && <span className="text-xs font-mono text-neutral-500 line-through">{plan.originalPrice}</span>}
                          </div>
                        )}
                        <ul className="mt-3 space-y-1.5 text-xs text-neutral-300">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-extrabold uppercase tracking-widest text-sm transition-all duration-200 cursor-pointer rounded-sm flex items-center justify-center gap-2 shadow-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>立即加Line報名</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
