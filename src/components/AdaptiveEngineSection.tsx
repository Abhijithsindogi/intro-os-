import React, { useState } from 'react';

const COMPARISON_EXAMPLES = [
  {
    topic: 'Explaining a College Team Project',
    question: 'Tell me about your capstone project and what you personally contributed.',
    badAnswer:
      'We made an e-commerce website using MERN stack. We worked on all features together and integrated Stripe payments and it worked really well.',
    badReason:
      'Uses vague "we", does not pinpoint candidate’s actual code contributions, and sounds like a cloned YouTube tutorial.',
    goodAnswer:
      'Our team built an online book rental platform. I personally implemented the inventory synchronization service and Stripe webhooks in Node.js. My biggest hurdle was handling race conditions during simultaneous rentals, which I resolved using Redis mutex locks.',
    goodReason:
      'Clear individual ownership ("I personally implemented"), specific technical terminology, and shows troubleshooting grit.',
  },
  {
    topic: 'Handling a Question You Don’t Know',
    question: 'How does indexing work internally in a B-Tree structure in relational databases?',
    badAnswer:
      'Um... I think it makes queries faster by sorting everything in memory... or maybe hash tables? I’m not really sure, I just use auto-increment keys.',
    badReason:
      'Guesses wildly, trails off uncertainly, and guesses random buzzwords without logical reasoning.',
    goodAnswer:
      'I haven’t studied the internal B-Tree pointer balancing in depth yet, but I understand that indexes organize column keys in hierarchical search trees so lookups run in logarithmic O(log N) time rather than full table scans.',
    goodReason:
      'Admits knowledge boundary politely, then articulates foundational understanding (logarithmic search vs full scan) with confidence.',
  },
  {
    topic: 'Discussing Technical Trade-Offs',
    question: 'Why did you choose MongoDB instead of PostgreSQL for your college project?',
    badAnswer:
      'Because MongoDB is NoSQL and modern, and everyone in our batch uses it because it is faster than SQL.',
    badReason:
      'Superficial dogma. Claiming "NoSQL is always better/faster" signals beginner lack of nuance.',
    goodAnswer:
      'We chose MongoDB primarily because our user survey schemas were rapidly evolving with dynamic question attributes, where document flexibility saved migration overhead. However, if transactions or strict relational integrity were required, PostgreSQL would have been the safer choice.',
    goodReason:
      'Understands technical trade-offs: justifies the schema flexibility while acknowledging where relational databases excel.',
  },
];

export const AdaptiveEngineSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="how-it-works-section" className="relative w-full max-w-5xl mx-auto px-4 py-16 text-left border-t border-white/10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">
          Engineered for Students & Freshers
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          How the Adaptive Interview Engine Works
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          The AI interviewer does not recite from a fixed script. It listens, evaluates your confidence, and dynamically adjusts the conversation.
        </p>
      </div>

      {/* 4 Steps Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-xs font-mono font-bold text-violet-400">STAGE 01</span>
          <h3 className="text-sm font-bold text-white">Natural Discovery</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Greets you verbally. Learns your name, engineering branch, graduation year, and desired role through spoken dialogue.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-xs font-mono font-bold text-violet-400">STAGE 02</span>
          <h3 className="text-sm font-bold text-white">Fundamentals First</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Starts with approachable core concepts. Tests whether you grasp the "why" and "how", not just textbook definitions.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-xs font-mono font-bold text-violet-400">STAGE 03</span>
          <h3 className="text-sm font-bold text-white">Project Contribution</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Probes your personal contributions, debugging challenges, tool decisions, and edge-case testing in college projects.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-xs font-mono font-bold text-violet-400">STAGE 04</span>
          <h3 className="text-sm font-bold text-white">Actionable Feedback</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Generates a comprehensive diagnostic report highlighting communication clarity, technical depth, and actionable prep steps.
          </p>
        </div>
      </div>

      {/* Interactive Answer Coaching Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Fresher Spoken Answer Playbook
            </h3>
            <p className="text-xs text-white/50">
              See how subtle phrasing changes transform an answer from "weak" to "hire".
            </p>
          </div>

          {/* Selector buttons */}
          <div className="flex gap-1.5 flex-wrap">
            {COMPARISON_EXAMPLES.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === idx
                    ? 'bg-violet-600 text-white'
                    : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                Case {idx + 1}: {ex.topic.split(' ')[0]}...
              </button>
            ))}
          </div>
        </div>

        {/* Current Question */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block mb-1">
            Interviewer Spoken Question:
          </span>
          <p className="text-sm font-semibold text-white">
            "{COMPARISON_EXAMPLES[activeTab].question}"
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weak / Typical Answer */}
          <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400">
              <span>✕</span>
              <span>Typical Fresher Mistake:</span>
            </div>
            <p className="text-xs text-white/80 italic leading-relaxed">
              "{COMPARISON_EXAMPLES[activeTab].badAnswer}"
            </p>
            <div className="text-[11px] text-red-300/80 pt-2 border-t border-red-500/20">
              <strong>Why it falls flat:</strong> {COMPARISON_EXAMPLES[activeTab].badReason}
            </div>
          </div>

          {/* Strong / Recommended Answer */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span>✓</span>
              <span>Recommended Approach:</span>
            </div>
            <p className="text-xs text-white/90 italic leading-relaxed">
              "{COMPARISON_EXAMPLES[activeTab].goodAnswer}"
            </p>
            <div className="text-[11px] text-emerald-300/80 pt-2 border-t border-emerald-500/20">
              <strong>Why recruiters love this:</strong> {COMPARISON_EXAMPLES[activeTab].goodReason}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
