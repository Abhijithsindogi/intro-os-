import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-xl rounded-3xl bg-[#0f0f16] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-violet-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">About INTERVIEW.OS</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-1 text-lg">
            ✕
          </button>
        </div>

        <div className="space-y-3 text-xs text-white/70 leading-relaxed">
          <p>
            <strong className="text-white">INTERVIEW.OS</strong> is an audio-first, real-time interview practice platform built exclusively for engineering students, final-year undergraduates, and fresh college graduates preparing for their first technical jobs.
          </p>
          <p>
            Unlike scripted chatbots or generic text quizzes, INTERVIEW.OS uses the Google Gemini Live API (<code className="text-violet-300">gemini-3.8-live</code>) to maintain a continuous, low-latency spoken conversation session with real microphone audio input and spoken voice playback.
          </p>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              Core Principles
            </span>
            <ul className="space-y-1 text-[11px] text-white/60">
              <li>• Beginner-friendly: Focuses on fundamentals, projects, and thought processes.</li>
              <li>• Zero simulated states: Actual Web Audio and Gemini session state drives the UI.</li>
              <li>• Real barge-in: Interrupt and speak naturally anytime.</li>
              <li>• Dynamic 60fps lip-sync driven by audio frequency analysis.</li>
            </ul>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="orbit-btn ghost px-5 py-2 text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
