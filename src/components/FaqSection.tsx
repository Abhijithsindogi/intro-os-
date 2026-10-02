import React, { useState } from 'react';

const FAQS = [
  {
    q: 'Do I need a webcam or formal dress to practice?',
    a: 'No! Only a working microphone is required. The optional camera toggle lets you see your own posture and framing, but it is 100% optional. You can practice comfortably from your room anytime.',
  },
  {
    q: 'What happens if I get stuck or do not know the answer?',
    a: 'Unlike aggressive panel interviewers, INTERVIEW.OS never insults or lectures you. It will either simplify the concept, provide a gentle hint, or move naturally to another topic so you can regain confidence.',
  },
  {
    q: 'Can I really interrupt the AI interviewer mid-sentence?',
    a: 'Yes! Instant natural barge-in is built into the audio pipeline. As soon as you speak, the AI stops talking, the avatar lips close, and it begins listening to you immediately.',
  },
  {
    q: 'How does it tailor questions to my specific engineering branch?',
    a: 'During the opening voice discovery, the interviewer asks your branch and target role. Whether you are in Mechanical, Civil, ECE, Computer Science, or AI/ML, the questions automatically focus on your branch’s foundational principles and capstone projects.',
  },
  {
    q: 'Can I practice questions about my own college project?',
    a: 'Absolutely! You can paste your project details into the Optional Resume Context drawer, or use the College Project Question Predictor tool above to see likely questions before you start.',
  },
  {
    q: 'How does this compare to typing prompts into generic chatbots?',
    a: 'Typing allows you to edit and rehearse for minutes. Real recruitment happens out loud, where articulation, pace, and spontaneous technical recall are evaluated. INTERVIEW.OS trains your spoken voice muscle memory.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-16 text-left border-t border-white/10">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">
          Everything You Need to Know
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-white/60">
          Answers to common questions from final-year engineering students and campus placement candidates.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm font-semibold text-white">{faq.q}</span>
                <span className={`text-violet-400 text-lg transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-white/70 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
