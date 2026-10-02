import React, { useState } from 'react';

interface SupportedRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: string) => void;
}

export const SUPPORTED_ROLES = [
  { name: 'Software Developer', branch: 'CSE / IT', desc: 'Core programming, basic OOP, logic & simple algorithms' },
  { name: 'AI / ML Engineer', branch: 'AIML / Data Science', desc: 'Supervised vs unsupervised, Python ML libraries, model evaluation' },
  { name: 'Data Analyst', branch: 'Any Branch / IT', desc: 'SQL queries, Excel/Sheets, data cleaning, dashboards' },
  { name: 'Data Scientist', branch: 'CSE / Math / Stats', desc: 'Statistical fundamentals, regression, classification, feature engineering' },
  { name: 'Python Developer', branch: 'CSE / ECE / Any', desc: 'Python data structures, decorators, generators, scripting' },
  { name: 'Java Developer', branch: 'CSE / IT / IS', desc: 'Core Java, Collections, OOP principles, simple Spring concepts' },
  { name: 'Full-Stack Developer', branch: 'CSE / IT', desc: 'HTML/CSS/JS, REST APIs, database connectivity, client-server flow' },
  { name: 'Frontend Developer', branch: 'CSE / IT', desc: 'React basics, DOM manipulation, responsive layouts, state handling' },
  { name: 'Backend Developer', branch: 'CSE / IT', desc: 'API endpoints, relational vs NoSQL databases, authentication basics' },
  { name: 'Cloud / DevOps Fresher', branch: 'CSE / IT / ECE', desc: 'Linux CLI commands, Docker basics, CI/CD concept, cloud fundamentals' },
  { name: 'Cybersecurity Fresher', branch: 'CSE / IT', desc: 'Network protocols, encryption basics, common vulnerabilities, OWASP' },
  { name: 'Embedded Systems Engineer', branch: 'ECE / EEE', desc: 'Microcontrollers, C programming, UART/SPI/I2C, sensors' },
  { name: 'Electronics Engineer', branch: 'ECE / EEE', desc: 'Digital logic, analog circuits, signal fundamentals, PCB overview' },
  { name: 'Mechanical Engineer', branch: 'Mechanical', desc: 'Thermodynamics, mechanics of materials, manufacturing processes' },
  { name: 'Mechanical Design Engineer', branch: 'Mechanical / Auto', desc: 'CAD fundamentals, GD&T basics, tolerance analysis, prototyping' },
  { name: 'Electrical Engineer', branch: 'EEE / EE', desc: 'Circuit analysis, transformers, power systems, control basics' },
  { name: 'Civil Engineer', branch: 'Civil', desc: 'Structural fundamentals, concrete technology, surveying, project estimating' },
  { name: 'General Graduate Engineer', branch: 'All Engineering', desc: 'Analytical aptitude, engineering methodology, team projects' },
];

export const SupportedRolesModal: React.FC<SupportedRolesModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
}) => {
  const [filter, setFilter] = useState('');

  if (!isOpen) return null;

  const filtered = SUPPORTED_ROLES.filter(
    (r) =>
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      r.branch.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-3xl rounded-3xl bg-[#0f0f16] border border-white/15 p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Supported Engineering Roles</h2>
            <p className="text-xs text-white/50">
              The AI interviewer automatically adapts to these engineering branches and beginner job roles.
            </p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-1 text-lg">
            ✕
          </button>
        </div>

        {/* Filter input */}
        <div>
          <input
            type="text"
            placeholder="Search role or engineering branch..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Roles Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 pr-1">
          {filtered.map((role) => (
            <div
              key={role.name}
              onClick={() => {
                onSelectRole(role.name);
                onClose();
              }}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors">
                    {role.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 font-mono">
                    {role.branch}
                  </span>
                </div>
                <p className="text-[11px] text-white/50 mt-1 leading-relaxed">{role.desc}</p>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-violet-400 font-medium">
                <span>Start practice for this role</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/10 text-center text-xs text-white/40">
          Remember: You don't need to fill forms! The AI interviewer naturally discovers your target role during conversation.
        </div>
      </div>
    </div>
  );
};
