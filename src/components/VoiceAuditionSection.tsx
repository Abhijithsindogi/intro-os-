import React, { useState } from 'react';

interface VoiceAuditionSectionProps {
  currentVoice: string;
  onSelectVoice: (voice: string) => void;
  onStartInterview: () => void;
}

const VOICES = [
  {
    name: 'Zephyr',
    persona: 'Young Professional & Encouraging',
    tone: 'Natural, warm, calm, clear — ideal for engineering freshers & campus drives.',
    isDefault: true,
  },
  {
    name: 'Kore',
    persona: 'Thoughtful & Analytical',
    tone: 'Smooth cadence, attentive, deep-dive technical questioner.',
    isDefault: false,
  },
  {
    name: 'Puck',
    persona: 'Energetic & Direct',
    tone: 'Brisk pacing, highly conversational, simulates fast-paced startup interviews.',
    isDefault: false,
  },
  {
    name: 'Fenrir',
    persona: 'Steady & Methodical',
    tone: 'Measured, structured, focuses on step-by-step logic and fundamentals.',
    isDefault: false,
  },
  {
    name: 'Charon',
    persona: 'Clear & Senior Executive',
    tone: 'Crisp articulation, concise follow-ups, corporate recruitment style.',
    isDefault: false,
  },
];

export const VoiceAuditionSection: React.FC<VoiceAuditionSectionProps> = ({
  currentVoice,
  onSelectVoice,
  onStartInterview,
}) => {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  // Play sample sound snippet using SpeechSynthesis or subtle audio frequency cue
  const handleAudition = (voiceName: string) => {
    setPlayingVoice(voiceName);
    onSelectVoice(voiceName);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Hi! Welcome to Interview.OS. I'm ${voiceName}, your AI interviewer. Before we start, what's your name?`
      );
      utterance.rate = 1.0;
      utterance.pitch = voiceName === 'Fenrir' ? 0.8 : voiceName === 'Puck' ? 1.15 : 1.0;
      utterance.onend = () => setPlayingVoice(null);
      utterance.onerror = () => setPlayingVoice(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingVoice(null), 2500);
    }
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 text-left border-t border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">
            Audio Persona Selection
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Choose Your AI Interviewer's Voice
          </h2>
          <p className="text-xs text-white/50 mt-1 max-w-xl">
            Powered by Gemini Live low-latency speech synthesis. Choose the voice personality that helps you practice with maximum comfort.
          </p>
        </div>

        <button
          onClick={onStartInterview}
          className="orbit-btn solid px-5 py-2.5 text-xs font-semibold shrink-0"
        >
          Start with {currentVoice} →
        </button>
      </div>

      {/* Voice Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {VOICES.map((v) => {
          const isSelected = currentVoice === v.name;
          const isPlaying = playingVoice === v.name;

          return (
            <div
              key={v.name}
              onClick={() => onSelectVoice(v.name)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-violet-950/40 border-violet-500/50 shadow-lg shadow-violet-950/50 ring-1 ring-violet-500/40'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    {v.name}
                    {v.isDefault && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                        Default
                      </span>
                    )}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  )}
                </div>

                <span className="text-[11px] font-medium text-violet-300 block mb-1">
                  {v.persona}
                </span>

                <p className="text-[11px] text-white/50 leading-relaxed mb-4">
                  {v.tone}
                </p>
              </div>

              {/* Audition Trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAudition(v.name);
                }}
                className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  isPlaying
                    ? 'bg-violet-600 text-white animate-pulse'
                    : 'bg-white/10 hover:bg-white/15 text-white/80'
                }`}
              >
                <span>{isPlaying ? '🔊 Playing...' : '▶ Sample Preview'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
