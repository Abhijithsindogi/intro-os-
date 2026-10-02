import React from 'react';

interface FooterProps {
  onStartInterview: () => void;
  onOpenHowItWorks: () => void;
  onOpenRoles: () => void;
  onOpenMicTest: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onStartInterview,
  onOpenHowItWorks,
  onOpenRoles,
  onOpenMicTest,
}) => {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#020204] py-12 px-4 text-left">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-white/10">
        {/* Brand Column */}
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
            <span className="font-bold tracking-tight text-white text-base">
              INTERVIEW<span className="text-violet-400">.OS</span>
            </span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            The real-time, audio-first interview practice platform engineered for engineering students, final-year undergraduates, and fresh graduates preparing for technical placements.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onStartInterview}
              className="orbit-btn solid px-4 py-2 text-xs font-semibold"
            >
              Start Live Interview
            </button>
            <button
              onClick={onOpenMicTest}
              className="orbit-btn ghost px-4 py-2 text-xs font-medium"
            >
              Test Microphone
            </button>
          </div>
        </div>

        {/* Links Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
          <div className="space-y-2.5">
            <span className="font-semibold text-white/40 uppercase tracking-wider block">
              Platform
            </span>
            <ul className="space-y-2 text-white/70">
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={onOpenRoles} className="hover:text-white transition-colors">
                  Supported Roles
                </button>
              </li>
              <li>
                <button onClick={onOpenMicTest} className="hover:text-white transition-colors">
                  Audio & Mic Test
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <span className="font-semibold text-white/40 uppercase tracking-wider block">
              Core Branches
            </span>
            <ul className="space-y-2 text-white/70">
              <li>CSE / Information Tech</li>
              <li>AI / Machine Learning</li>
              <li>ECE / Embedded Systems</li>
              <li>Mechanical & Mechatronics</li>
              <li>Civil Engineering</li>
            </ul>
          </div>

          <div className="space-y-2.5 col-span-2 sm:col-span-1">
            <span className="font-semibold text-white/40 uppercase tracking-wider block">
              Technology
            </span>
            <ul className="space-y-2 text-white/50 text-[11px]">
              <li>Model: gemini-3.8-live</li>
              <li>Latency: Low-latency streaming</li>
              <li>Input: 16kHz PCM Little-Endian</li>
              <li>Output: 24kHz Web Audio Synth</li>
              <li>Lip-Sync: 60 FPS Formant Tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="max-w-5xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-2">
        <span>© {new Date().getFullYear()} INTERVIEW.OS. Built for engineering candidates worldwide.</span>
        <span>Zero simulated states · Real microphone input & spoken audio response</span>
      </div>
    </footer>
  );
};
