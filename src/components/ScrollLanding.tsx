import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Realistic3DAvatar } from './Realistic3DAvatar.tsx';
import { Header } from './Header.tsx';

gsap.registerPlugin(ScrollTrigger);

interface ScrollLandingProps {
  onStartInterview: () => void;
  onOpenDashboard: () => void;
  onOpenHowItWorks: () => void;
  onOpenRoles: () => void;
  onOpenAbout: () => void;
  currentVoice: string;
  onSelectVoice: (voice: string) => void;
}

export const ScrollLanding: React.FC<ScrollLandingProps> = ({
  onStartInterview,
  onOpenDashboard,
  onOpenHowItWorks,
  onOpenRoles,
  onOpenAbout,
  currentVoice,
  onSelectVoice,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const dashboardPreviewRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'all' | 'cs' | 'core'>('all');

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 2. Section 01 Hero Scroll Animations
    if (heroRef.current && heroContentRef.current) {
      gsap.to(heroContentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
        y: -90,
        opacity: 0,
        ease: 'power3.out',
      });

      if (heroVideoRef.current) {
        gsap.to(heroVideoRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
          scale: 1.09,
          ease: 'power2.out',
        });
      }
    }

    // 3. Section 08 Dashboard 3D Perspective Reveal
    if (dashboardPreviewRef.current) {
      gsap.fromTo(
        dashboardPreviewRef.current,
        {
          rotateX: 14,
          scale: 0.91,
          opacity: 0.4,
        },
        {
          scrollTrigger: {
            trigger: dashboardPreviewRef.current,
            start: 'top 85%',
            end: 'center center',
            scrub: 0.8,
          },
          rotateX: 0,
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
        }
      );
    }

    // 4. Reveal Animations for Major Editorial Headings
    const reveals = document.querySelectorAll('.editorial-reveal');
    reveals.forEach((elem) => {
      gsap.fromTo(
        elem,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
        }
      );
    });

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#040407] text-white selection:bg-violet-600/30">
      {/* Persistent Floating Header */}
      <Header
        onStartInterview={onStartInterview}
        onOpenHowItWorks={onOpenHowItWorks}
        onOpenRoles={onOpenRoles}
        onOpenAbout={onOpenAbout}
        currentVoice={currentVoice}
        onSelectVoice={onSelectVoice}
        isInterviewActive={false}
      />

      {/* =========================================================================
          SECTION 01 — HERO (Retaining original luxury design with scroll link)
          ========================================================================= */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden pt-28 pb-12"
      >
        {/* Background Visual Studio Texture */}
        <div ref={heroVideoRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[900px] h-[580px] bg-gradient-to-b from-indigo-950/30 via-violet-950/20 to-transparent rounded-full filter blur-[120px]" />
          <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-violet-600/10 rounded-full filter blur-[110px]" />
          <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-cyan-600/10 rounded-full filter blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* Scroll-Linked Hero Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center px-6"
        >
          {/* Eyebrow Pill */}
          <div
            onClick={onOpenRoles}
            className="inline-flex items-center cursor-pointer transition-all duration-200 hover:bg-white/18 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-xl mb-6 shadow-xl"
          >
            <span className="px-2.5 py-0.5 rounded-full bg-white text-black text-[10px] font-bold tracking-tight">
              LIVE AI
            </span>
            <span className="ml-2.5 text-xs font-medium text-white/90 tracking-tight">
              FOR ENGINEERING STUDENTS & FRESHERS
            </span>
            <svg viewBox="0 0 9.5 8" className="w-2.5 h-2.5 ml-2 text-white/80 fill-none stroke-currentColor stroke-[1.4]">
              <path d="M0.7 4H8.8M5.6 0.75 8.85 4 5.6 7.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Headline in Instrument Serif */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-normal font-serif-luxury tracking-tight text-white max-w-4xl leading-[1.05]">
            YOUR FIRST REAL INTERVIEW <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-violet-300">
              BEFORE THE REAL ONE.
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed font-sans">
            Practice by actually talking to an AI interviewer that listens, responds, and adapts to your engineering branch, college projects, and answers.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartInterview}
              className="orbit-btn solid px-8 py-3.5 text-sm font-semibold tracking-wide flex items-center gap-2 group shadow-2xl"
            >
              <span>START INTERVIEW</span>
              <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 fill-none stroke-currentColor stroke-2">
                <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={onOpenDashboard}
              className="orbit-btn ghost px-6 py-3.5 text-sm font-medium text-white/90"
            >
              STUDENT DASHBOARD
            </button>
          </div>

          {/* 3D Avatar Centerpiece */}
          <div className="mt-6 relative w-full flex items-center justify-center">
            <Realistic3DAvatar
              state="READY"
              getLipSyncData={() => ({ amplitude: 0, vowelFormant: 0, isSpeaking: false })}
              voiceName={currentVoice}
            />
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="relative z-10 flex flex-col items-center gap-2 text-xs text-white/40 uppercase tracking-widest pt-4">
          <span>Scroll to explore</span>
          <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02 — MEET THE INTERVIEWER
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-24 border-t border-white/5 bg-[#030305]">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div className="space-y-6 editorial-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-xs text-violet-300 font-mono">
              02 • HUMAN-LIKE INTERVIEWER
            </div>
            <h2 className="text-4xl sm:text-6xl font-normal font-serif-luxury tracking-tight text-white leading-tight">
              MEET THE PERSON <br />
              <span className="italic text-violet-300">WHO NEVER STOPS</span> <br />
              LISTENING.
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-md font-sans">
              A real-time AI interviewer built specifically for engineering students and freshers. No pre-recorded scripts, no robotic pauses, and no synthetic chatbots.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Continuous spoken conversation powered by Gemini Live</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Natural blinks, micro-saccades, and attentive head nodding</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Layered viseme lip-sync matching actual spoken frequency</span>
              </div>
            </div>
          </div>

          {/* Right Realistic 3D Avatar View */}
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl relative">
            <div className="absolute top-4 left-4 text-[10px] font-mono text-white/40 uppercase">
              Live Humanoid Rig • PBR Materials
            </div>
            <Realistic3DAvatar
              state="LISTENING"
              getLipSyncData={() => ({ amplitude: 0, vowelFormant: 0, isSpeaking: false })}
              voiceName={currentVoice}
            />
            <div className="mt-4 text-xs text-white/40 text-center font-mono">
              Interviewer State: Attentive Listening
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03 — REAL CONVERSATION
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-24 bg-[#050508] border-t border-white/5">
        <div className="max-w-4xl w-full mx-auto space-y-12 text-center">
          <div className="space-y-4 editorial-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-mono">
              03 • REAL SPOKEN CONVERSATION
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal font-serif-luxury tracking-tight text-white leading-tight">
              YOU SPEAK. <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                IT ACTUALLY LISTENS.
              </span>
            </h2>
            <p className="text-base text-white/60 max-w-lg mx-auto">
              No multiple-choice buttons. No typing into a chatbot box. Speak into your microphone and hear natural spoken audio in return.
            </p>
          </div>

          {/* Floating Editorial Dialogue Cards */}
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <div className="p-6 rounded-3xl bg-violet-950/20 border border-violet-500/25 space-y-2 backdrop-blur-xl transition-transform hover:-translate-y-1 duration-300">
              <span className="text-[11px] font-bold text-violet-400 font-mono uppercase tracking-wider">
                INTERVIEWER
              </span>
              <p className="text-lg sm:text-xl font-normal font-serif-luxury text-white">
                “Hi! Welcome to Interview.OS. Before we start, what's your name?”
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2 backdrop-blur-xl ml-8 transition-transform hover:-translate-y-1 duration-300">
              <span className="text-[11px] font-bold text-emerald-400 font-mono uppercase tracking-wider">
                CANDIDATE (YOU)
              </span>
              <p className="text-lg sm:text-xl font-normal font-serif-luxury text-white/90">
                “My name is Abhijith. I'm a third-year AIML student.”
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-violet-950/20 border border-violet-500/25 space-y-2 backdrop-blur-xl transition-transform hover:-translate-y-1 duration-300">
              <span className="text-[11px] font-bold text-violet-400 font-mono uppercase tracking-wider">
                INTERVIEWER
              </span>
              <p className="text-lg sm:text-xl font-normal font-serif-luxury text-white">
                “Nice to meet you, Abhijith. What programming language are you most comfortable with?”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04 — ADAPTIVE INTERVIEW
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-24 bg-[#030305] border-t border-white/5">
        <div className="max-w-5xl w-full mx-auto space-y-12">
          <div className="text-center space-y-4 editorial-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-mono">
              04 • ADAPTIVE DIFFICULTY
            </div>
            <h2 className="text-4xl sm:text-6xl font-normal font-serif-luxury tracking-tight text-white leading-tight">
              NO TWO INTERVIEWS <br />
              <span className="italic text-violet-300">ARE EVER THE SAME.</span>
            </h2>
            <p className="text-base text-white/60 max-w-lg mx-auto">
              The interviewer listens to your specific answers and probes deeper into your actual college projects rather than following a rigid questionnaire.
            </p>
          </div>

          {/* Adaptive Branching Visualization */}
          <div className="relative max-w-xl mx-auto space-y-3 font-sans">
            <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-violet-500 via-indigo-500 to-emerald-400 opacity-30" />

            {[
              { speaker: 'Candidate', text: '“I am comfortable with Python.”', role: 'user' },
              { speaker: 'AI Interviewer', text: '“Okay. What have you built with Python?”', role: 'ai' },
              { speaker: 'Candidate', text: '“I worked on a few machine learning projects with my classmates.”', role: 'user' },
              { speaker: 'AI Interviewer', text: '“Tell me about one of those projects. What was the goal?”', role: 'ai' },
              { speaker: 'Candidate', text: '“I developed a brain-controlled wheelchair using EEG signals.”', role: 'user' },
              { speaker: 'AI Interviewer', text: '“What was your personal contribution in that project?”', role: 'ai' },
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-5 pl-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-2 z-10 ${
                  step.role === 'ai' ? 'bg-violet-600 text-white' : 'bg-emerald-500 text-black'
                }`}>
                  {idx + 1}
                </div>
                <div className={`flex-1 p-4 rounded-2xl border backdrop-blur-md ${
                  step.role === 'ai'
                    ? 'bg-violet-950/25 border-violet-500/20 text-white'
                    : 'bg-white/[0.03] border-white/10 text-white/90'
                }`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    step.role === 'ai' ? 'text-violet-400' : 'text-emerald-400'
                  }`}>
                    {step.speaker}
                  </span>
                  <p className="text-sm font-medium mt-1">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05 — ENGINEERING ROLES
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 py-24 bg-[#050508] border-t border-white/5">
        <div className="max-w-6xl w-full mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 editorial-reveal">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-mono mb-3">
                05 • SUPPORTED ROLES
              </div>
              <h2 className="text-4xl sm:text-6xl font-normal font-serif-luxury tracking-tight text-white">
                BUILT FOR EVERY <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                  ENGINEERING BRANCH.
                </span>
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === 'all' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                All Roles
              </button>
              <button
                onClick={() => setActiveTab('cs')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === 'cs' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                Software & AI
              </button>
              <button
                onClick={() => setActiveTab('core')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === 'core' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                Core Engineering
              </button>
            </div>
          </div>

          {/* Large Editorial Role Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'AI / ML Engineer', branch: 'AIML / Data Science', desc: 'Supervised & unsupervised learning, Python ML packages, model metrics', category: 'cs' },
              { title: 'Software Developer', branch: 'CSE / IT / IS', desc: 'Core programming, OOP principles, data structures, complexity', category: 'cs' },
              { title: 'Data Analyst', branch: 'All Branches', desc: 'SQL joins, aggregation, data cleaning, dashboard insights', category: 'cs' },
              { title: 'Full-Stack Developer', branch: 'CSE / IT', desc: 'Client-server architecture, REST endpoints, database schemas', category: 'cs' },
              { title: 'Electronics Engineer', branch: 'ECE / EEE', desc: 'Digital logic, microcontrollers, communication protocols, analog circuits', category: 'core' },
              { title: 'Mechanical Engineer', branch: 'Mechanical', desc: 'Thermodynamics, mechanics of materials, CAD & manufacturing concepts', category: 'core' },
              { title: 'Electrical Engineer', branch: 'EEE / EE', desc: 'Power distribution, circuit analysis, transformer basics, control loops', category: 'core' },
              { title: 'Civil Engineer', branch: 'Civil', desc: 'Structural analysis, concrete technology, surveying, project execution', category: 'core' },
            ]
              .filter((r) => activeTab === 'all' || r.category === activeTab)
              .map((role, idx) => (
                <div
                  key={idx}
                  onClick={onStartInterview}
                  className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-violet-500/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300">
                      {role.branch}
                    </span>
                    <h3 className="text-xl font-normal font-serif-luxury text-white group-hover:text-violet-300 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed font-sans">{role.desc}</p>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs text-violet-400 font-medium">
                    <span>Practice Role</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06 — LIVE PRODUCT DEMO
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-24 bg-[#030305] border-t border-white/5">
        <div className="max-w-5xl w-full mx-auto space-y-10 text-center">
          <div className="space-y-3 editorial-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-mono">
              06 • LIVE INTERACTION
            </div>
            <h2 className="text-4xl sm:text-6xl font-normal font-serif-luxury tracking-tight text-white leading-tight">
              THIS ISN'T QUESTION → ANSWER. <br />
              <span className="italic text-violet-300">IT'S A REAL CONVERSATION.</span>
            </h2>
            <p className="text-base text-white/60 max-w-lg mx-auto">
              Natural speech cadence with real-time barge-in. Interrupt anytime you want to clarify or redirect your answer.
            </p>
          </div>

          {/* Interactive Mockup Container */}
          <div className="relative w-full rounded-3xl bg-[#090910] border border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-white">Live Practice Session</span>
              </div>
              <span className="font-mono">Role: AI / ML Engineer</span>
            </div>

            <div className="my-8 relative flex items-center justify-center">
              <Realistic3DAvatar
                state="AI_SPEAKING"
                getLipSyncData={() => ({ amplitude: 0.06, vowelFormant: 0.6, isSpeaking: true })}
                voiceName={currentVoice}
              />
            </div>

            <div className="w-full max-w-md p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-xs text-white/90">Interviewer Speaking (Voice: {currentVoice})</span>
              </div>
              <button
                onClick={onStartInterview}
                className="orbit-btn solid px-4 py-1.5 text-xs font-semibold"
              >
                TRY LIVE NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 07 — RESULTS / FEEDBACK
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-24 bg-[#050508] border-t border-white/5">
        <div className="max-w-5xl w-full mx-auto space-y-12">
          <div className="text-center space-y-4 editorial-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-mono">
              07 • EVIDENCE-BASED FEEDBACK
            </div>
            <h2 className="text-4xl sm:text-6xl font-normal font-serif-luxury tracking-tight text-white leading-tight">
              EVERY INTERVIEW <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                TEACHES YOU SOMETHING.
              </span>
            </h2>
            <p className="text-base text-white/60 max-w-lg mx-auto">
              Constructive, actionable evaluation based only on the words and projects you spoke about. No fake confidence metrics.
            </p>
          </div>

          {/* Editorial Feedback Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-white/40 uppercase">Technical Core</span>
              <div className="text-2xl font-normal font-serif-luxury text-emerald-400">Strong</div>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Solid fundamentals on data structures and memory allocation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-white/40 uppercase">Project Ownership</span>
              <div className="text-2xl font-normal font-serif-luxury text-amber-300">Needs Clarity</div>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Highlight your individual module contributions more explicitly.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-white/40 uppercase">Communication</span>
              <div className="text-2xl font-normal font-serif-luxury text-cyan-300">Improving</div>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Clear articulation without filler pauses during complex follow-ups.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-white/40 uppercase">Practice Streak</span>
              <div className="text-2xl font-normal font-serif-luxury text-violet-300">4 Sessions</div>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Continuous improvement across multi-round technical rehearsals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 08 — STUDENT DASHBOARD PREVIEW (3D Perspective Scroll Reveal)
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 py-24 bg-[#030305] border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl w-full mx-auto space-y-12">
          <div className="text-center space-y-3 editorial-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-mono">
              08 • STUDENT DASHBOARD
            </div>
            <h2 className="text-4xl sm:text-6xl font-normal font-serif-luxury tracking-tight text-white leading-tight">
              TRACK YOUR PRACTICE <br />
              <span className="italic text-violet-300">BEFORE PLACEMENT DAY.</span>
            </h2>
            <p className="text-base text-white/60 max-w-lg mx-auto">
              Review transcripts, inspect interviewer advice, and track confidence across all your practice interviews.
            </p>
          </div>

          {/* 3D Tilted Perspective Preview */}
          <div
            ref={dashboardPreviewRef}
            onClick={onOpenDashboard}
            className="cursor-pointer relative w-full rounded-3xl bg-[#0d0d16] border border-white/20 p-6 sm:p-10 shadow-2xl transition-all duration-300 hover:border-violet-500/50 group"
            style={{ perspective: 1200 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-violet-500" />
                <span className="text-sm font-bold text-white tracking-tight">Student Dashboard Preview</span>
              </div>
              <span className="text-xs text-violet-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                <span>Open Full Dashboard</span>
                <span>→</span>
              </span>
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono">Current Candidate</span>
                <p className="text-base font-bold text-white">Abhijith • AIML</p>
                <p className="text-xs text-emerald-400">Campus Drive Candidate</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono">Last Completed Session</span>
                <p className="text-base font-bold text-white">AI / ML Engineer (22 min)</p>
                <p className="text-xs text-violet-300">Score: 84/100</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono">Strongest Topic</span>
                <p className="text-base font-bold text-white">EEG Project Architecture</p>
                <p className="text-xs text-cyan-300">Consistent Explanation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 09 — PROGRESS STORY
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-24 bg-[#050508] border-t border-white/5">
        <div className="max-w-4xl w-full mx-auto space-y-12">
          <div className="text-center space-y-4 editorial-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-mono">
              09 • PROGRESS STORY
            </div>
            <h2 className="text-4xl sm:text-6xl font-normal font-serif-luxury tracking-tight text-white leading-tight">
              PRACTICE. IMPROVE. <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                TRY AGAIN.
              </span>
            </h2>
            <p className="text-base text-white/60 max-w-lg mx-auto">
              Real interview confidence isn't born from memorizing cheat sheets. It comes from speaking out loud repeatedly.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-white/40">INTERVIEW #1</span>
                <p className="text-sm font-medium text-white/80 mt-1">
                  Struggled with technical definitions & paused during follow-ups
                </p>
              </div>
              <span className="text-xs font-bold text-amber-400 font-mono">Foundational</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-white/40">INTERVIEW #3</span>
                <p className="text-sm font-medium text-white/80 mt-1">
                  Articulated individual contribution in EEG hardware project with confidence
                </p>
              </div>
              <span className="text-xs font-bold text-violet-300 font-mono">Developing</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-white/40">INTERVIEW #6</span>
                <p className="text-sm font-medium text-white mt-1">
                  Answered rapid system questions and handled counter-inquiries smoothly
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 font-mono">Recruitment Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — FINAL CTA
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 py-24 bg-[#030305] border-t border-white/5 text-center">
        <div className="max-w-4xl w-full mx-auto space-y-8 editorial-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-xs text-violet-300 font-mono">
            10 • READY TO PRACTICE
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-normal font-serif-luxury tracking-tight text-white leading-[1.05]">
            YOUR REAL INTERVIEW <br />
            SHOULDN'T BE <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-violet-300">
              YOUR FIRST ONE.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto font-sans leading-relaxed">
            No signup barrier. No endless forms. Put on your headphones, enable your microphone, and practice speaking like a real engineer.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartInterview}
              className="orbit-btn accent px-10 py-4 text-base font-semibold tracking-wide flex items-center gap-3 shadow-2xl"
            >
              <span>START INTERVIEW NOW</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — MINIMAL FOOTER
          ========================================================================= */}
      <footer className="w-full px-6 sm:px-12 py-12 border-t border-white/10 bg-black text-white/60 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="font-bold tracking-tight text-white text-sm">
              INTERVIEW<span className="text-violet-400">.OS</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>Real-time voice interview platform for engineering students & freshers</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onStartInterview} className="hover:text-white transition-colors">
              Interview
            </button>
            <button onClick={onOpenDashboard} className="hover:text-white transition-colors">
              Dashboard
            </button>
            <button onClick={onOpenRoles} className="hover:text-white transition-colors">
              Supported Roles
            </button>
            <button onClick={onOpenAbout} className="hover:text-white transition-colors">
              About
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/40">
          <span>© 2026 INTERVIEW.OS • Powered by Google Gemini Live API</span>
          <span>Zero simulated AI • Real microphone conversation</span>
        </div>
      </footer>
    </div>
  );
};
