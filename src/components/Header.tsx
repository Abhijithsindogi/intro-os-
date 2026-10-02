import React, { useState } from 'react';

interface HeaderProps {
  onStartInterview: () => void;
  onOpenHowItWorks: () => void;
  onOpenRoles: () => void;
  onOpenAbout: () => void;
  onOpenMicTest: () => void;
  currentVoice: string;
  onSelectVoice: (voice: string) => void;
  isInterviewActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onStartInterview,
  onOpenHowItWorks,
  onOpenRoles,
  onOpenAbout,
  onOpenMicTest,
  currentVoice,
  onSelectVoice,
  isInterviewActive,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [voiceDropdownOpen, setVoiceDropdownOpen] = useState(false);

  const voices = ['Zephyr', 'Kore', 'Puck', 'Fenrir', 'Charon'];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-5xl transition-all duration-200">
      <div className="relative px-4 sm:px-6 py-2.5 rounded-full bg-[#0a0a10]/85 backdrop-blur-2xl border border-white/15 shadow-2xl flex items-center justify-between">
        {/* Brand logo & title */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-white no-underline cursor-pointer group"
          aria-label="INTERVIEW.OS — Home"
        >
          <svg
            viewBox="0 0 28 18"
            className="w-6 h-4 overflow-visible"
            fill="none"
          >
            <rect x="1" y="2" width="26" height="14" rx="7" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" />
            <circle cx="8" cy="9" r="2.2" fill="#7c3aed" />
            <line x1="13" y1="5.5" x2="13" y2="12.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="17" y1="4" x2="17" y2="14" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="22" cy="9" r="1.4" fill="#a78bfa" />
          </svg>
          <span className="font-bold tracking-tight text-white text-sm sm:text-base whitespace-nowrap">
            INTERVIEW<span className="text-violet-400">.OS</span>
          </span>
        </a>

        {/* Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          <button
            onClick={() => scrollTo('roles-section')}
            className="text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Supported Roles
          </button>
          <button
            onClick={() => scrollTo('predictor-section')}
            className="text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Project Predictor
          </button>
          <button
            onClick={() => scrollTo('how-it-works-section')}
            className="text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={onOpenMicTest}
            className="text-xs font-medium text-violet-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>🎙️</span>
            <span>Mic Test</span>
          </button>
        </nav>

        {/* Actions (Right) */}
        <div className="flex items-center gap-2">
          {/* Voice Selector Picker */}
          <div className="relative">
            <button
              onClick={() => setVoiceDropdownOpen(!voiceDropdownOpen)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white/90 transition-colors"
              title="Configure Gemini voice"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Voice: {currentVoice}</span>
              <svg viewBox="0 0 10 6" className="w-2 h-2 fill-current opacity-70">
                <path d="M0 0 L5 5 L10 0 Z" />
              </svg>
            </button>

            {voiceDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 py-1.5 px-1 rounded-2xl bg-[#121217]/95 backdrop-blur-xl border border-white/15 shadow-2xl z-50 min-w-[140px]">
                <div className="px-2.5 py-1 text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                  Gemini Voices
                </div>
                {voices.map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      onSelectVoice(v);
                      setVoiceDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      currentVoice === v ? 'bg-violet-600/30 text-white font-medium' : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span>{v}</span>
                    {currentVoice === v && <span className="text-violet-400 text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Start Interview CTA button */}
          {!isInterviewActive ? (
            <button
              onClick={onStartInterview}
              className="orbit-btn solid px-4 py-2 text-xs font-bold tracking-tight shadow-md shadow-violet-950/40"
            >
              START INTERVIEW
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE</span>
            </span>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white"
            aria-label={menuOpen ? 'Close menu' : 'Menu'}
          >
            <svg viewBox="0 0 20 14" className="w-4 h-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="2" y1="2" x2="18" y2="12" />
                  <line x1="18" y1="2" x2="2" y2="12" />
                </>
              ) : (
                <path d="M0 1h20M0 7h20M0 13h20" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Sheet */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-3xl bg-[#0e0e16]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMenuOpen(false);
                scrollTo('roles-section');
              }}
              className="text-left px-3 py-2 rounded-xl text-sm text-white/90 hover:bg-white/10"
            >
              Supported Roles
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                scrollTo('predictor-section');
              }}
              className="text-left px-3 py-2 rounded-xl text-sm text-white/90 hover:bg-white/10"
            >
              Project Question Predictor
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                scrollTo('how-it-works-section');
              }}
              className="text-left px-3 py-2 rounded-xl text-sm text-white/90 hover:bg-white/10"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenMicTest();
              }}
              className="text-left px-3 py-2 rounded-xl text-sm text-violet-300 hover:bg-white/10 flex items-center gap-2"
            >
              <span>🎙️</span>
              <span>Audio & Mic Diagnostic</span>
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenAbout();
              }}
              className="text-left px-3 py-2 rounded-xl text-sm text-white/90 hover:bg-white/10"
            >
              About Platform
            </button>

            {/* Voices */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] text-white/40 uppercase font-semibold block mb-1.5">
                Gemini Voices:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {voices.map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      onSelectVoice(v);
                      setMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs ${
                      currentVoice === v ? 'bg-violet-600 text-white font-bold' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {!isInterviewActive && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onStartInterview();
                }}
                className="orbit-btn solid w-full mt-2 py-2.5 text-xs font-bold justify-center"
              >
                START INTERVIEW NOW
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
