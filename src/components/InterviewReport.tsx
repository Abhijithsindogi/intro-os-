import React from 'react';

export interface InterviewFeedback {
  overallScore: number;
  branchAndRole?: string;
  summary: string;
  strengths: string[];
  areasForImprovement: string[];
  technicalEvaluation: string;
  communicationEvaluation: string;
  projectDepthEvaluation: string;
  actionPlanForFreshers: string[];
}

interface InterviewReportProps {
  feedback: InterviewFeedback | null;
  isLoading: boolean;
  durationSeconds: number;
  transcriptCount: number;
  onRestart: () => void;
  onClose: () => void;
}

export const InterviewReport: React.FC<InterviewReportProps> = ({
  feedback,
  isLoading,
  durationSeconds,
  transcriptCount,
  onRestart,
  onClose,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}m ${rem < 10 ? '0' : ''}${rem}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#0e0e14] border border-white/15 p-6 sm:p-8 shadow-2xl text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 font-bold text-lg">
              ✓
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Interview Performance Evaluation
              </h2>
              <p className="text-xs sm:text-sm text-white/50">
                Tailored for Engineering Students & Freshers • Session Duration: {formatTime(durationSeconds)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-2 text-xl"
            aria-label="Close report"
          >
            ✕
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
            <div className="space-y-1">
              <p className="text-base font-medium text-white">Analyzing Your Spoken Responses...</p>
              <p className="text-xs text-white/50 max-w-sm">
                Gemini is assessing your communication, technical fundamentals, and project answers.
              </p>
            </div>
          </div>
        )}

        {/* Report Content */}
        {!isLoading && feedback && (
          <div className="py-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
            {/* Top Score Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-violet-600/10 border border-violet-500/20 text-center">
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-200">
                  {feedback.overallScore}/100
                </span>
                <span className="text-[11px] font-semibold text-violet-300 uppercase tracking-wider mt-1">
                  Fresher Readiness
                </span>
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Target Role & Assessment
                </span>
                <p className="text-sm font-medium text-white/90 mt-1">{feedback.branchAndRole || 'Engineering Graduate'}</p>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">{feedback.summary}</p>
              </div>
            </div>

            {/* Strengths & Areas to Improve */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <span>✦</span>
                  <span>What You Did Well</span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/80">
                  {feedback.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <span>✦</span>
                  <span>Areas to Refine</span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/80">
                  {feedback.areasForImprovement.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Deep Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">
                Category Evaluations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-violet-300">Technical Core</span>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    {feedback.technicalEvaluation}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-blue-300">Communication & Clarity</span>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    {feedback.communicationEvaluation}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-cyan-300">Project Ownership</span>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    {feedback.projectDepthEvaluation}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Plan for Freshers */}
            <div className="p-4 rounded-2xl bg-violet-950/20 border border-violet-500/20 space-y-2">
              <div className="text-xs font-bold text-violet-300 uppercase tracking-wider">
                Recommended Action Plan Before Your Real Interview
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                {feedback.actionPlanForFreshers.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]">
                    <span className="w-4 h-4 rounded-full bg-violet-600/50 flex items-center justify-center text-[10px] text-white font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-white/40">
            {transcriptCount} dialogue turns captured in session
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (feedback) {
                  navigator.clipboard.writeText(JSON.stringify(feedback, null, 2));
                  alert('Feedback copied to clipboard!');
                }
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-colors"
            >
              Copy Report
            </button>
            <button
              onClick={onRestart}
              className="orbit-btn solid px-5 py-2 text-xs font-semibold"
            >
              Practice Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
