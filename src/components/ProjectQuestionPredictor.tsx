import React, { useState } from 'react';

interface QuestionItem {
  q: string;
  intent: string;
  tip: string;
}

interface PredictionResult {
  questions: QuestionItem[];
  commonFresherTrap: string;
  recommendedPitchOutline: string;
}

interface ProjectQuestionPredictorProps {
  onStartWithProjectContext: (projectSummary: string) => void;
}

const SAMPLE_PROJECTS = [
  {
    title: 'Automated Solar Panel Dust Cleaner using Arduino & LDR Sensors',
    stack: 'Embedded C, Arduino, Servo Motors, LDR Sensors',
    branch: 'ECE / EEE',
  },
  {
    title: 'Brain-Computer EEG Signal Classifier for Wheelchair Navigation',
    stack: 'Python, NumPy, Scikit-learn, Neurosky EEG Headset, Flask',
    branch: 'AI / ML',
  },
  {
    title: 'Decentralized Academic Credential Verifier on Ethereum',
    stack: 'Solidity, Hardhat, React, Node.js, Web3.js',
    branch: 'CSE / IT',
  },
  {
    title: 'High-Speed Autonomous Line-Follower with PID Tuning',
    stack: 'STM32, C++, IR Array Sensors, Motor Drivers',
    branch: 'Mechanical / Mechatronics',
  },
];

export const ProjectQuestionPredictor: React.FC<ProjectQuestionPredictorProps> = ({
  onStartWithProjectContext,
}) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [techStack, setTechStack] = useState('');
  const [branch, setBranch] = useState('Computer Science / IT');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handlePredict = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!projectTitle.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/predict-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle,
          techStack,
          branch,
        }),
      });

      if (!res.ok) throw new Error('Prediction failed');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.warn('Prediction fallback:', err);
      // Smart fallback
      setResult({
        questions: [
          {
            q: `Can you walk me through the system architecture of ${projectTitle} and why you chose these technologies?`,
            intent: 'Evaluates architectural judgment and foundational understanding.',
            tip: 'State the problem in one clean sentence, followed by data flow: Input → Processing → Output.',
          },
          {
            q: `In a college group project, what exact module or code did you personally write?`,
            intent: 'Validates individual contribution vs teammates.',
            tip: 'Use "I designed" and "I coded", specifying the exact components or files you implemented.',
          },
          {
            q: `What was the most challenging technical bug you encountered, and how did you debug it?`,
            intent: 'Measures your troubleshooting methodology under uncertainty.',
            tip: 'Describe the symptom, hypothesis tested, tools used, and the actual resolution.',
          },
          {
            q: `How did you test your system to verify boundary conditions or unexpected user inputs?`,
            intent: 'Tests engineering discipline beyond the "happy path".',
            tip: 'Mention edge cases, null input handling, or hardware noise filtering.',
          },
          {
            q: `If you were rebuilding this project from scratch for production scale, what would you change?`,
            intent: 'Assesses engineering growth, reflection, and technical maturity.',
            tip: 'Suggest caching, asynchronous processing, or automated test pipelines.',
          },
        ],
        commonFresherTrap:
          'Reciting buzzwords and library names without explaining the actual engineering problem the project solves.',
        recommendedPitchOutline:
          '1) "The problem this project solves is..." 2) "My specific role was implementing..." 3) "The biggest technical hurdle I overcame was..."',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySample = (sample: typeof SAMPLE_PROJECTS[0]) => {
    setProjectTitle(sample.title);
    setTechStack(sample.stack);
    setBranch(sample.branch);
  };

  return (
    <section id="predictor-section" className="relative w-full max-w-5xl mx-auto px-4 py-16 text-left">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">
          Interactive Fresher Preparation Tool
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          College Project Question Predictor
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Recruiters spend 40% of fresher interviews grilling your college projects. Enter your project details to see the exact 5 questions the AI interviewer will ask.
        </p>
      </div>

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-5">
          {/* Quick Samples */}
          <div>
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block mb-2">
              Try a Popular Engineering Project:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PROJECTS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySample(sample)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-white/70 transition-colors border border-white/5"
                >
                  {sample.branch}: {sample.title.split(' ')[0]}...
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handlePredict} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-white/80 block mb-1">
                Project Title / Capstone Name *
              </label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g. Brain-Controlled Wheelchair using Arduino & EEG"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-white/80 block mb-1">
                Technologies / Libraries / Hardware Used
              </label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g. Python, Arduino, Scikit-learn, OpenCV"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-white/80 block mb-1">
                Engineering Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#12121a] border border-white/10 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="CSE / IT">Computer Science & IT</option>
                <option value="AI / ML">Artificial Intelligence & Data Science</option>
                <option value="ECE / EEE">Electronics & Communication (ECE)</option>
                <option value="Electrical">Electrical & Electronics (EEE)</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Civil">Civil Engineering</option>
                <option value="General Engineering">Other Engineering Branch</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading || !projectTitle.trim()}
              className="orbit-btn solid w-full py-3 text-xs font-semibold flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>Analyzing Project Scope...</span>
                </>
              ) : (
                <>
                  <span>Predict Interview Questions</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Results or Placeholder */}
        <div className="lg:col-span-7 space-y-4">
          {!result && !isLoading && (
            <div className="h-full min-h-[340px] rounded-3xl border border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-xl text-white/40">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white/90">
                  Ready to Predict Your Questions
                </h3>
                <p className="text-xs text-white/50 max-w-sm">
                  Enter your college project title on the left or select a sample to preview the recruiter follow-ups.
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="h-full min-h-[340px] rounded-3xl bg-white/[0.02] border border-white/10 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Generating Recruiter Questions...</p>
                <p className="text-xs text-white/50">Formulating questions based on engineering fundamentals & architecture.</p>
              </div>
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Pitch Framework Card */}
              <div className="p-4 rounded-2xl bg-violet-950/25 border border-violet-500/25 space-y-1.5">
                <span className="text-[11px] font-bold text-violet-300 uppercase tracking-wider">
                  Recommended 45-Second Pitch Outline:
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-mono">
                  {result.recommendedPitchOutline}
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider block">
                  Top 5 Questions the AI Interviewer Will Ask:
                </span>
                {result.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 transition-all hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-violet-600/30 text-violet-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs font-semibold text-white">{q.q}</p>
                    </div>
                    <div className="pl-7 space-y-0.5 text-[11px]">
                      <p className="text-white/50">
                        <strong className="text-white/70">Interviewer Intent:</strong> {q.intent}
                      </p>
                      <p className="text-emerald-400/90">
                        <strong className="text-emerald-300">Fresher Tip:</strong> {q.tip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Common Pitfall Alert */}
              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">⚠️</span>
                <div>
                  <strong className="text-amber-300 block mb-0.5">Fresher Pitfall to Avoid:</strong>
                  <span>{result.commonFresherTrap}</span>
                </div>
              </div>

              {/* Direct Practice Button */}
              <button
                onClick={() => {
                  const summary = `Project: ${projectTitle}\nStack: ${techStack}\nBranch: ${branch}`;
                  onStartWithProjectContext(summary);
                }}
                className="orbit-btn solid w-full py-3 text-xs font-bold justify-center gap-2"
              >
                <span>Practice This Project Live with AI Interviewer</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
