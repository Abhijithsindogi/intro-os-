import React from 'react';
import { InterviewerAvatar } from './InterviewerAvatar.tsx';

interface LandingHeroProps {
  onStartInterview: () => void;
  onOpenHowItWorks: () => void;
  onOpenRoles: () => void;
  onOpenMicTest: () => void;
  currentVoice: string;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartInterview,
  onOpenHowItWorks,
  onOpenRoles,
  onOpenMicTest,
  currentVoice,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-start overflow-hidden pt-12">
      {/* Cinematic Animated Background Lighting & Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft violet / cyan / deep blue studio glow */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-indigo-900/25 via-violet-950/20 to-transparent rounded-full filter blur-[110px]" />
        <div className="absolute top-[5%] left-[10%] w-[400px] h-[400px] bg-violet-600/15 rounded-full filter blur-[90px]" />
        <div className="absolute top-[5%] right-[10%] w-[420px] h-[420px] bg-cyan-600/10 rounded-full filter blur-[100px]" />

        {/* Ambient Grid lines with low opacity */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main Rigid Hero Container aligned to Orbit scaling */}
      <div
        className="hero relative z-10 w-full max-w-[1563px] mx-auto flex flex-col items-center text-center px-4"
        style={{
          paddingTop: 'calc(75 * var(--u))',
        }}
      >
        {/* 1. Eyebrow Pill */}
        <div
          onClick={onOpenRoles}
          className="anim-pill inline-flex items-center cursor-pointer transition-all duration-200 hover:bg-white/18"
          style={{
            height: 'calc(24 * var(--u))',
            paddingLeft: 'calc(4 * var(--u))',
            paddingRight: 'calc(10 * var(--u))',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: 'calc(1 * var(--u)) solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(calc(10 * var(--u)))',
            WebkitBackdropFilter: 'blur(calc(10 * var(--u)))',
            marginBottom: 'calc(16 * var(--u))',
          }}
        >
          {/* Chip */}
          <span
            className="inline-flex items-center justify-center font-bold tracking-tight"
            style={{
              width: 'calc(44 * var(--u))',
              height: 'calc(16 * var(--u))',
              borderRadius: '999px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontSize: 'calc(9.5 * var(--u))',
              fontWeight: 700,
              paddingTop: 'calc(1.5 * var(--u))',
              lineHeight: 1,
            }}
          >
            LIVE AI
          </span>

          {/* Pill label */}
          <span
            className="tracking-tight text-white/90 whitespace-nowrap"
            style={{
              marginLeft: 'calc(6 * var(--u))',
              fontSize: 'calc(12 * var(--u))',
              fontWeight: 500,
              letterSpacing: 'calc(-0.35 * var(--u))',
            }}
          >
            FOR ENGINEERING STUDENTS & FRESHERS
          </span>

          {/* Arrow SVG */}
          <svg
            viewBox="0 0 9.5 8"
            className="text-white/95"
            style={{
              width: 'calc(9.5 * var(--u))',
              height: 'calc(8 * var(--u))',
              marginLeft: 'calc(8 * var(--u))',
            }}
            fill="none"
          >
            <path
              d="M0.7 4H8.8M5.6 0.75 8.85 4 5.6 7.25"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 2. Headline with 2 Mask Reveal Lines */}
        <h1
          className="m-0 font-normal tracking-tight text-white"
          style={{
            fontSize: 'calc(48 * var(--u))',
            fontWeight: 550,
            lineHeight: 'calc(52 * var(--u))',
            letterSpacing: 'calc(-0.76 * var(--u))',
            maxWidth: 'calc(1000 * var(--u))',
          }}
        >
          <span className="ln anim-line-1">
            <span className="ln-i">YOUR FIRST REAL INTERVIEW</span>
          </span>
          <span className="ln anim-line-2">
            <span className="ln-i">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-violet-300">
                BEFORE THE REAL ONE.
              </span>
            </span>
          </span>
        </h1>

        {/* 3. Sub-headline */}
        <p
          className="anim-sub m-0 text-white/60 mx-auto"
          style={{
            marginTop: 'calc(16 * var(--u))',
            fontSize: 'calc(14.8 * var(--u))',
            fontWeight: 400,
            lineHeight: 'calc(23 * var(--u))',
            letterSpacing: 'calc(-0.05 * var(--u))',
            maxWidth: 'calc(650 * var(--u))',
          }}
        >
          Practice by actually talking out loud to an AI interviewer that listens, evaluates your technical thought process, and adapts to your engineering branch.
        </p>

        {/* 4. CTA Row */}
        <div
          className="cta flex flex-wrap items-center justify-center"
          style={{
            gap: 'calc(10 * var(--u))',
            marginTop: 'calc(24 * var(--u))',
          }}
        >
          <button
            onClick={onStartInterview}
            className="orbit-btn solid anim-btn-1 flex items-center gap-2 group shadow-xl shadow-violet-950/30"
            style={{
              height: 'calc(40 * var(--u))',
              paddingLeft: 'calc(24 * var(--u))',
              paddingRight: 'calc(24 * var(--u))',
              fontSize: 'calc(13.5 * var(--u))',
              fontWeight: 550,
              letterSpacing: 'calc(-0.35 * var(--u))',
            }}
          >
            <span>START INTERVIEW</span>
            <svg
              viewBox="0 0 12 12"
              className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={onOpenMicTest}
            className="orbit-btn ghost anim-btn-2 flex items-center gap-1.5"
            style={{
              height: 'calc(40 * var(--u))',
              paddingLeft: 'calc(18 * var(--u))',
              paddingRight: 'calc(18 * var(--u))',
              fontSize: 'calc(13 * var(--u))',
              fontWeight: 480,
              letterSpacing: 'calc(-0.34 * var(--u))',
            }}
          >
            <span>🎙️</span>
            <span>Test Mic</span>
          </button>

          <button
            onClick={() => scrollTo('how-it-works-section')}
            className="orbit-btn ghost anim-btn-2"
            style={{
              height: 'calc(40 * var(--u))',
              paddingLeft: 'calc(18 * var(--u))',
              paddingRight: 'calc(18 * var(--u))',
              fontSize: 'calc(13 * var(--u))',
              fontWeight: 480,
              letterSpacing: 'calc(-0.34 * var(--u))',
            }}
          >
            How It Works
          </button>
        </div>

        {/* 5. Centerpiece: The Animated Interviewer Character & Studio Atmosphere */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{
            marginTop: 'calc(10 * var(--u))',
            height: 'calc(350 * var(--u))',
            maxHeight: '44vh',
          }}
        >
          {/* Subtle reflection floor disk */}
          <div className="absolute bottom-2 w-72 h-14 rounded-full bg-violet-500/10 blur-xl pointer-events-none" />

          <InterviewerAvatar
            state="READY"
            getLipSyncData={() => ({ amplitude: 0, vowelFormant: 0, isSpeaking: false })}
            voiceName={currentVoice}
          />
        </div>

        {/* 6. Feature Indicators under Centerpiece */}
        <div
          className="w-full max-w-[850px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 pb-8"
          style={{ marginTop: 'calc(-10 * var(--u))' }}
        >
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-white/90">Real-Time Voice</span>
            <span className="text-[10px] text-white/50">Talk naturally via mic</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-white/90">Zero Form Onboarding</span>
            <span className="text-[10px] text-white/50">Discovers you by talking</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-white/90">Adaptive Difficulty</span>
            <span className="text-[10px] text-white/50">Starts simple & fundamentals</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-white/90">Natural Interruption</span>
            <span className="text-[10px] text-white/50">Barge-in anytime while AI speaks</span>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <div
          onClick={() => scrollTo('predictor-section')}
          className="cursor-pointer py-3 flex flex-col items-center text-white/30 hover:text-white/70 transition-colors animate-bounce"
        >
          <span className="text-[10px] uppercase font-semibold tracking-wider mb-1">
            Scroll to Explore Features
          </span>
          <svg viewBox="0 0 10 6" className="w-2.5 h-1.5 fill-current">
            <path d="M0 0 L5 5 L10 0 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
