import React, { useState } from 'react';
import { InterviewReport, InterviewFeedback } from './InterviewReport.tsx';

interface StudentDashboardProps {
  onStartInterview: () => void;
  onNavigateHome: () => void;
}

interface PastSession {
  id: string;
  role: string;
  date: string;
  durationMins: number;
  score: number;
  topics: string[];
  feedback: InterviewFeedback;
}

const MOCK_PAST_SESSIONS: PastSession[] = [
  {
    id: 'sess-1',
    role: 'AI / ML Engineer Fresher',
    date: 'Today, 4:20 PM',
    durationMins: 22,
    score: 84,
    topics: ['Supervised vs Unsupervised', 'Python Tuples vs Lists', 'EEG Wheelchair Project'],
    feedback: {
      overallScore: 84,
      branchAndRole: 'Artificial Intelligence & Machine Learning',
      summary:
        'Strong communication on project ownership. The candidate explained their hardware-software integration clearly and articulated the role of signal preprocessing.',
      strengths: [
        'Described EEG signal processing pipeline with personal ownership',
        'Concise distinction between lists and tuples in Python',
        'Natural speech cadence and attentive listening during follow-ups',
      ],
      areasForImprovement: [
        'Clarify the exact loss function and evaluation metrics used in your model',
        'Structure technical definitions with the fundamental concept first, then use case',
      ],
      technicalEvaluation:
        'Good fundamental grasp of ML concepts and Python memory paradigms. Ready for campus placement technical rounds.',
      communicationEvaluation:
        'Engaged, professional, and composed. Did not panic during probing questions.',
      projectDepthEvaluation:
        'High depth on project contribution. Clearly distinguished individual work from teammates.',
      actionPlanForFreshers: [
        'Review confusion matrix metrics (precision vs recall tradeoff)',
        'Prepare 1-minute explanation of your project architecture diagram',
      ],
    },
  },
  {
    id: 'sess-2',
    role: 'Software Developer',
    date: 'Yesterday, 6:15 PM',
    durationMins: 18,
    score: 79,
    topics: ['OOP Principles', 'Time Complexity', 'REST API Design'],
    feedback: {
      overallScore: 79,
      branchAndRole: 'Computer Science & Engineering',
      summary:
        'Solid understanding of polymorphism and inheritance. Could improve precision when explaining O(n log n) divide-and-conquer mechanisms.',
      strengths: [
        'Accurate real-world analogy for OOP encapsulation',
        'Honest and direct answers without pretending to know unfamiliar terms',
      ],
      areasForImprovement: [
        'Practice analyzing worst-case vs average-case time complexities out loud',
        'Include error handling status codes when discussing REST APIs',
      ],
      technicalEvaluation:
        'Firm baseline for junior software developer roles. Solid syntax familiarity.',
      communicationEvaluation:
        'Good clarity. Avoid trailing off at the end of answers.',
      projectDepthEvaluation:
        'Clearly described the database schema and endpoints created.',
      actionPlanForFreshers: [
        'Practice Big-O analysis on Merge Sort and Quick Sort',
        'Review standard HTTP status codes (200, 201, 400, 401, 403, 500)',
      ],
    },
  },
];

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onStartInterview,
  onNavigateHome,
}) => {
  const [selectedSession, setSelectedSession] = useState<PastSession | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#050508] text-white selection:bg-violet-600/30 font-sans pb-24">
      {/* Top Floating Glass Navigation */}
      <header className="sticky top-0 z-40 w-full px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 group-hover:scale-125 transition-transform" />
            <span className="font-bold tracking-tight text-white text-base">
              INTERVIEW<span className="text-violet-400">.OS</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/60 font-mono">
              STUDENT OS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-xs text-white/60">
            <span className="text-white font-medium">Dashboard</span>
            <button
              onClick={onNavigateHome}
              className="hover:text-white transition-colors"
            >
              Interactive Experience
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartInterview}
            className="orbit-btn solid px-4 py-2 text-xs font-semibold flex items-center gap-2"
          >
            <span>START PRACTICE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Campus Recruitment Track • Batch 2026/2027</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-normal tracking-tight font-serif-luxury text-white">
              GOOD EVENING, <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-violet-300">
                ABHIJITH.
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-lg">
              Ready for your next spoken interview? Your interviewer is standing by with beginner-friendly questions tailored to your branch.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onStartInterview}
              className="orbit-btn accent px-6 py-3.5 text-sm font-semibold tracking-wide flex items-center gap-2.5 shadow-2xl"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-currentColor stroke-2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              <span>ENTER INTERVIEW STUDIO</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
              Practice Streak
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">4</span>
              <span className="text-xs text-violet-300 font-medium">consecutive sessions</span>
            </div>
            <p className="text-[11px] text-white/50 pt-1">
              Consistency builds spoken fluency before campus drives.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
              Target Engineering Role
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">AI / ML Engineer</span>
            </div>
            <p className="text-[11px] text-white/50 pt-1">
              Branch: Artificial Intelligence & Machine Learning
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1">
            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
              Spoken Practice Time
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">76</span>
              <span className="text-xs text-white/60 font-medium">total minutes</span>
            </div>
            <p className="text-[11px] text-emerald-400 pt-1 flex items-center gap-1">
              <span>✦</span> Real microphone conversation
            </p>
          </div>
        </div>

        {/* Progress & Skills Matrix */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-normal font-serif-luxury tracking-tight text-white">
                Skills & Fundamentals Progress
              </h2>
              <p className="text-xs text-white/50">
                Grounded strictly in your past spoken responses and project explanations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { name: 'Python Fundamentals', level: 'Consistent', score: 85, color: 'text-emerald-400' },
              { name: 'Machine Learning Core', level: 'Developing', score: 78, color: 'text-violet-300' },
              { name: 'Project Ownership', level: 'Strong', score: 92, color: 'text-cyan-300' },
              { name: 'Communication Clarity', level: 'Consistent', score: 82, color: 'text-emerald-400' },
              { name: 'Problem Solving Flow', level: 'Developing', score: 75, color: 'text-amber-300' },
            ].map((skill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-white/90">{skill.name}</span>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-white/40">Status:</span>
                    <span className={`font-semibold ${skill.color}`}>{skill.level}</span>
                  </div>
                </div>
                <div className="mt-3 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wide Editorial Recent Interviews Table */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-normal font-serif-luxury tracking-tight text-white">
                Recent Practice Interviews
              </h2>
              <p className="text-xs text-white/50">
                Click any session to view complete recruiter feedback and question breakdown.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_PAST_SESSIONS.map((sess) => (
              <div
                key={sess.id}
                onClick={() => setSelectedSession(sess)}
                className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-violet-500/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold text-base shrink-0 group-hover:scale-105 transition-transform">
                    {sess.score}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                        {sess.role}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                        Completed
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
                      <span>{sess.date}</span>
                      <span>•</span>
                      <span>{sess.durationMins} minutes</span>
                      <span>•</span>
                      <span className="text-white/70">
                        Topics: {sess.topics.slice(0, 2).join(', ')}...
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-semibold text-violet-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Inspect Evaluation</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student College Projects Discussed */}
        <div className="mt-12 space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-normal font-serif-luxury tracking-tight text-white">
              Projects In Your Profile
            </h2>
            <p className="text-xs text-white/50">
              The AI interviewer automatically references these projects when asking deep technical follow-ups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-violet-300 uppercase font-mono">Project 01</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">Final Year</span>
              </div>
              <h4 className="text-sm font-semibold text-white">
                Brain-Controlled Wheelchair using Arduino & EEG Signal Processing
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                EEG headset signal acquisition via Bluetooth, noise filtering, and motor control via Python microservices.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-white/50">
                <span className="px-2 py-0.5 rounded bg-white/5">Python</span>
                <span className="px-2 py-0.5 rounded bg-white/5">Signal Processing</span>
                <span className="px-2 py-0.5 rounded bg-white/5">Arduino</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 uppercase font-mono">Project 02</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">Hackathon</span>
              </div>
              <h4 className="text-sm font-semibold text-white">
                Automated Traffic Congestion Detection using YOLO & OpenCV
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Computer vision pipeline for real-time intersection vehicle counting and adaptive signal timing estimation.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-white/50">
                <span className="px-2 py-0.5 rounded bg-white/5">Computer Vision</span>
                <span className="px-2 py-0.5 rounded bg-white/5">YOLO</span>
                <span className="px-2 py-0.5 rounded bg-white/5">PyTorch</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Session Modal */}
      {selectedSession && (
        <InterviewReport
          feedback={selectedSession.feedback}
          isLoading={false}
          durationSeconds={selectedSession.durationMins * 60}
          transcriptCount={14}
          onRestart={() => {
            setSelectedSession(null);
            onStartInterview();
          }}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
};
