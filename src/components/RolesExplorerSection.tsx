import React, { useState } from 'react';

interface RolesExplorerSectionProps {
  onStartRoleInterview: (roleName: string) => void;
}

export interface DetailedRole {
  title: string;
  category: 'cs' | 'ai' | 'ece' | 'mech' | 'civil' | 'eee';
  branchLabel: string;
  fundamentals: string[];
  sampleProject: string;
  openingSampleQ: string;
}

const ROLES_DATA: DetailedRole[] = [
  {
    title: 'AI / Machine Learning Engineer',
    category: 'ai',
    branchLabel: 'AIML / Data Science',
    fundamentals: ['Supervised vs Unsupervised algorithms', 'Overfitting vs Underfitting mitigation', 'Loss functions & gradient descent basics', 'Model metrics: Precision, Recall, F1'],
    sampleProject: 'Image classification, Sentiment analysis, or Tabular fraud detection',
    openingSampleQ: 'What loss function did you optimize during training and how did you prevent overfitting?',
  },
  {
    title: 'Software Developer (Campus Fresher)',
    category: 'cs',
    branchLabel: 'CSE / IT / IS',
    fundamentals: ['Time & Space Big-O complexity', 'Arrays, Linked Lists, HashMaps, Trees', 'Core OOP: Encapsulation, Polymorphism', 'Memory management basics'],
    sampleProject: 'CRUD web app, student management system, algorithmic visualizer',
    openingSampleQ: 'Why would you choose a HashMap over a sorted Array for searching records?',
  },
  {
    title: 'Full-Stack Web Developer',
    category: 'cs',
    branchLabel: 'CSE / IT',
    fundamentals: ['Client-server HTTP lifecycle', 'REST API status codes (200, 400, 404, 500)', 'Relational database normalization vs NoSQL', 'JWT authentication basics'],
    sampleProject: 'E-commerce store, real-time chat with WebSockets, social blog platform',
    openingSampleQ: 'How do you handle asynchronous operations in JavaScript without blocking the event loop?',
  },
  {
    title: 'Data Analyst / BI Fresher',
    category: 'ai',
    branchLabel: 'Any Branch / IT',
    fundamentals: ['SQL joins: Inner, Left, Outer, Cross', 'GROUP BY, HAVING, and Aggregations', 'Data cleaning & outlier imputation', 'KPI metric tracking'],
    sampleProject: 'Sales trend dashboard in PowerBI/Tableau, customer churn analysis in Python',
    openingSampleQ: 'What is the exact operational difference between WHERE and HAVING in SQL?',
  },
  {
    title: 'Data Scientist Fresher',
    category: 'ai',
    branchLabel: 'CSE / Math / Stats',
    fundamentals: ['Hypothesis testing & p-values', 'Feature selection & dimensionality reduction', 'Cross-validation strategies (K-Fold)', 'Data leakage pitfalls'],
    sampleProject: 'House price regression model, medical diagnosis classifier',
    openingSampleQ: 'What steps do you take when your training dataset has severe class imbalance?',
  },
  {
    title: 'Python Backend Developer',
    category: 'cs',
    branchLabel: 'CSE / ECE / IT',
    fundamentals: ['Python memory & GIL (Global Interpreter Lock)', 'Decorators, Generators, List comprehensions', 'FastAPI or Django ORM models', 'Handling database connections'],
    sampleProject: 'RESTful microservice, web scraper with BeautifulSoup, automated alerting bot',
    openingSampleQ: 'Can you explain when you would yield values with a generator instead of returning a list?',
  },
  {
    title: 'Java Developer Fresher',
    category: 'cs',
    branchLabel: 'CSE / IT',
    fundamentals: ['JVM, JRE, JDK architecture', 'Java Collections: ArrayList vs LinkedList vs HashSet', 'Abstract classes vs Interfaces', 'Exception handling best practices'],
    sampleProject: 'Banking transaction simulator in Spring Boot, employee management system',
    openingSampleQ: 'Why are String objects immutable in Java, and what benefits does that provide?',
  },
  {
    title: 'Embedded Systems Engineer',
    category: 'ece',
    branchLabel: 'ECE / EEE',
    fundamentals: ['Microcontroller registers & GPIO', 'Protocols: I2C, SPI, UART differences', 'Interrupt Service Routines (ISRs)', 'Timer counters & PWM modulation'],
    sampleProject: 'Weather monitoring station with ESP32/STM32, obstacle-avoiding robot',
    openingSampleQ: 'Why should you never write blocking delays inside an Interrupt Service Routine?',
  },
  {
    title: 'Electronics & Hardware Engineer',
    category: 'ece',
    branchLabel: 'ECE / EEE',
    fundamentals: ['Ohm’s law, Kirchhoff’s laws (KVL/KCL)', 'Op-Amp configurations (Inverting/Non-inverting)', 'Filter design (Low-pass, High-pass)', 'PCB trace impedance basics'],
    sampleProject: 'Audio amplifier circuit, DC power supply with voltage regulation',
    openingSampleQ: 'What is the role of a bypass capacitor across the power rails of an IC?',
  },
  {
    title: 'Mechanical Design Engineer',
    category: 'mech',
    branchLabel: 'Mechanical Engineering',
    fundamentals: ['Stress-strain curves & Young’s modulus', 'GD&T (Geometric Dimensioning and Tolerancing)', 'Factor of Safety (FOS) calculation', 'Thermodynamic cycles (Otto, Diesel, Rankine)'],
    sampleProject: 'CAD model of robotic gripper, chassis structural FEA simulation',
    openingSampleQ: 'How do you select the Factor of Safety when designing a mechanical component under fatigue load?',
  },
  {
    title: 'Electrical & Power Engineer',
    category: 'eee',
    branchLabel: 'EEE / EE',
    fundamentals: ['Three-phase power calculations', 'Transformer working principle & losses', 'Induction motors vs Synchronous motors', 'Circuit breaker & protection relays'],
    sampleProject: 'Solar inverter grid sync circuit, motor speed control drive',
    openingSampleQ: 'Why do distribution transformers use delta-star connection instead of star-star?',
  },
  {
    title: 'Civil & Structural Engineer',
    category: 'civil',
    branchLabel: 'Civil Engineering',
    fundamentals: ['Bending moment & shear force diagrams', 'Concrete grades & water-cement ratio', 'Soil bearing capacity & foundation types', 'Surveying & leveling fundamentals'],
    sampleProject: 'Multi-story frame analysis in STAAD.Pro, green building stormwater plan',
    openingSampleQ: 'What causes shear cracking in a reinforced concrete beam and how is it prevented?',
  },
];

export const RolesExplorerSection: React.FC<RolesExplorerSectionProps> = ({
  onStartRoleInterview,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All 18+ Roles' },
    { id: 'cs', label: 'Computer Science & IT' },
    { id: 'ai', label: 'AI, ML & Data' },
    { id: 'ece', label: 'ECE & Embedded' },
    { id: 'mech', label: 'Mechanical' },
    { id: 'eee', label: 'Electrical (EEE)' },
    { id: 'civil', label: 'Civil Engineering' },
  ];

  const filteredRoles = ROLES_DATA.filter((role) => {
    const matchesCat = selectedCategory === 'all' || role.category === selectedCategory;
    const matchesSearch =
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.branchLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.fundamentals.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="roles-section" className="relative w-full max-w-5xl mx-auto px-4 py-16 text-left border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">
            Curriculum & Role Alignment
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Explore Supported Engineering Roles
          </h2>
          <p className="text-xs text-white/50 mt-1 max-w-xl">
            Click any engineering specialization to review core fresher fundamentals, expected project themes, and practice directly with Gemini Live.
          </p>
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic or branch..."
            className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Category Filter Pills (Functional Buttons) */}
      <div className="flex flex-wrap gap-1.5 mb-8 p-1 rounded-2xl bg-white/[0.02] border border-white/5">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === c.id
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoles.map((role) => (
          <div
            key={role.title}
            className="p-5 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all flex flex-col justify-between group space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                  {role.title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/70 font-mono shrink-0">
                  {role.branchLabel}
                </span>
              </div>

              {/* Core Fundamentals Checklist */}
              <div className="space-y-1.5 my-3">
                <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider block">
                  Core Fundamentals Tested:
                </span>
                <ul className="space-y-1 text-xs text-white/70">
                  {role.fundamentals.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px]">
                      <span className="text-violet-400 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Recruiter Opening Question */}
              <div className="p-2.5 rounded-xl bg-violet-950/20 border border-violet-500/20 text-[11px] text-white/80 space-y-0.5">
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">
                  Sample Interview Question:
                </span>
                <p className="italic text-white/90">"{role.openingSampleQ}"</p>
              </div>
            </div>

            {/* Launch Practice for this role */}
            <button
              onClick={() => onStartRoleInterview(role.title)}
              className="orbit-btn ghost w-full py-2 text-xs font-semibold group-hover:bg-white group-hover:text-black transition-all"
            >
              Practice {role.title.split(' ')[0]} Interview →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
