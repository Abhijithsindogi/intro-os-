import React from 'react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onStart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-2xl rounded-3xl bg-[#0f0f16] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">How Interview.OS Works</h2>
            <p className="text-xs text-white/50">
              Designed specifically for engineering students and fresh graduates.
            </p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-1 text-lg">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/30 text-violet-300 font-bold flex items-center justify-center shrink-0 text-sm">
              1
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">Zero Form Onboarding</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Click "Start Interview" and the AI interviewer immediately comes online and greets you verbally. You answer with your microphone — just like in a real interview.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/30 text-violet-300 font-bold flex items-center justify-center shrink-0 text-sm">
              2
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">Conversational Discovery</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                The interviewer naturally asks for your name, engineering branch (CSE, AIML, ECE, Mech, Civil, etc.), and target job role. If you answer both at once, it never asks redundant questions.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/30 text-violet-300 font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">Beginner-Appropriate & Adaptive</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Questions start with core fundamentals and college projects. As you answer, the difficulty gently scales: Basic → Intermediate → Challenging. If you hesitate, the AI clarifies without embarrassing you.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/30 text-violet-300 font-bold flex items-center justify-center shrink-0 text-sm">
              4
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">Instant Natural Barge-In</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                You never have to wait for the interviewer to finish a long sentence. As soon as you speak, the AI stops talking, the avatar lips close, and it listens to you immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-white/40">Requires microphone permission</span>
          <button
            onClick={() => {
              onClose();
              onStart();
            }}
            className="orbit-btn solid px-6 py-2.5 text-xs font-semibold"
          >
            START PRACTICE NOW
          </button>
        </div>
      </div>
    </div>
  );
};
