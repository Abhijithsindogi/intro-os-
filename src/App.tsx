import { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { LandingHero } from './components/LandingHero.tsx';
import { ProjectQuestionPredictor } from './components/ProjectQuestionPredictor.tsx';
import { VoiceAuditionSection } from './components/VoiceAuditionSection.tsx';
import { RolesExplorerSection } from './components/RolesExplorerSection.tsx';
import { AdaptiveEngineSection } from './components/AdaptiveEngineSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { InterviewRoom } from './components/InterviewRoom.tsx';
import { MicTestModal } from './components/MicTestModal.tsx';
import { HowItWorksModal } from './components/HowItWorksModal.tsx';
import { SupportedRolesModal } from './components/SupportedRolesModal.tsx';
import { AboutModal } from './components/AboutModal.tsx';

export default function App() {
  const [isInInterview, setIsInInterview] = useState(false);
  const [voiceName, setVoiceName] = useState('Zephyr');
  const [projectContext, setProjectContext] = useState<string | undefined>(undefined);

  // Modals
  const [micTestOpen, setMicTestOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Orbit entrance animation trigger
  useEffect(() => {
    const handleIntro = () => {
      if (document.documentElement.classList.contains('intro')) {
        const start = () => {
          document.documentElement.classList.add('intro-play');
        };

        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(start);
            });
          });
        } else {
          setTimeout(start, 500);
        }

        const cleanupTimeout = setTimeout(() => {
          document.documentElement.classList.remove('intro');
          document.documentElement.classList.remove('intro-play');
        }, 3200);

        return () => clearTimeout(cleanupTimeout);
      }
    };

    handleIntro();
  }, []);

  const handleStartInterview = (context?: string) => {
    setProjectContext(context);
    setIsInInterview(true);
    // Scroll to top for the interview session
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const handleExitInterview = () => {
    setIsInInterview(false);
    setProjectContext(undefined);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#040407] text-white flex flex-col items-center">
      {/* 1. Header */}
      {!isInInterview && (
        <Header
          onStartInterview={() => handleStartInterview()}
          onOpenHowItWorks={() => setHowItWorksOpen(true)}
          onOpenRoles={() => setRolesOpen(true)}
          onOpenAbout={() => setAboutOpen(true)}
          onOpenMicTest={() => setMicTestOpen(true)}
          currentVoice={voiceName}
          onSelectVoice={(v) => setVoiceName(v)}
          isInterviewActive={isInInterview}
        />
      )}

      {/* 2. Scrollable Landing Page Sections */}
      {!isInInterview && (
        <main className="w-full flex flex-col items-center">
          {/* Hero Section */}
          <LandingHero
            onStartInterview={() => handleStartInterview()}
            onOpenHowItWorks={() => setHowItWorksOpen(true)}
            onOpenRoles={() => setRolesOpen(true)}
            onOpenMicTest={() => setMicTestOpen(true)}
            currentVoice={voiceName}
          />

          {/* Interactive Project Question Predictor Tool */}
          <ProjectQuestionPredictor
            onStartWithProjectContext={(summary) => handleStartInterview(summary)}
          />

          {/* Voice Audition Section */}
          <VoiceAuditionSection
            currentVoice={voiceName}
            onSelectVoice={(v) => setVoiceName(v)}
            onStartInterview={() => handleStartInterview()}
          />

          {/* 18+ Roles Explorer Section */}
          <RolesExplorerSection
            onStartRoleInterview={(roleName) =>
              handleStartInterview(`Target Role: ${roleName}`)
            }
          />

          {/* Adaptive Engine & Fresher Answer Playbook */}
          <AdaptiveEngineSection />

          {/* FAQ Section */}
          <FaqSection />

          {/* Footer */}
          <Footer
            onStartInterview={() => handleStartInterview()}
            onOpenHowItWorks={() => setHowItWorksOpen(true)}
            onOpenRoles={() => setRolesOpen(true)}
            onOpenMicTest={() => setMicTestOpen(true)}
          />
        </main>
      )}

      {/* 3. Full-Screen Live Interview Room */}
      {isInInterview && (
        <InterviewRoom
          voiceName={voiceName}
          onExit={handleExitInterview}
          initialProjectContext={projectContext}
        />
      )}

      {/* 4. Modals */}
      <MicTestModal
        isOpen={micTestOpen}
        onClose={() => setMicTestOpen(false)}
        onReadyToStart={() => handleStartInterview()}
      />

      <HowItWorksModal
        isOpen={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
        onStart={() => handleStartInterview()}
      />

      <SupportedRolesModal
        isOpen={rolesOpen}
        onClose={() => setRolesOpen(false)}
        onSelectRole={(role) => handleStartInterview(`Target Role: ${role}`)}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />
    </div>
  );
}
