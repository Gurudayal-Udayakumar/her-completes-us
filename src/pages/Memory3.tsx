import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { StaggeredReveal } from '@/components/StaggeredReveal';
import { ContinueLink } from '@/components/ContinueLink';

const Memory3 = () => {
  const [filling, setFilling] = useState(false);
  const [fillLevel, setFillLevel] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const { completePage, isPageAccessible } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPageAccessible(3)) navigate('/', { replace: true });
  }, [isPageAccessible, navigate]);

  useEffect(() => {
    if (filling && !unlocked) {
      intervalRef.current = setInterval(() => {
        setFillLevel(prev => {
          if (prev >= 100) {
            setUnlocked(true);
            setFilling(false);
            clearInterval(intervalRef.current);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [filling, unlocked]);

  const contentLines = [
    { text: 'Keerthi Cafe —' },
    { text: 'the small bakery near your house.' },
    { text: '' },
    { text: 'We met there again and again.' },
    { text: 'Snacks on the table.' },
    { text: 'Time slowing down without effort.' },
    { text: '' },
    { text: 'Almost every visit ended the same way —' },
    { text: 'badam paal in our hands,' },
    { text: 'a video recording us taking the first sip.' },
    { text: '' },
    { text: 'The taste was always good.' },
    { text: 'And every single time,' },
    { text: 'both our eyebrows lifted together —' },
    { text: 'surprised, amused, in sync.' },
    { text: '' },
    { text: '"Small moments like these don\'t fade. They repeat themselves, until they feel like home."', className: 'font-serif italic text-accent mt-8' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 max-w-2xl mx-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-16">Keerthi Cafe</p>

      <h2 className="font-serif text-2xl md:text-4xl text-center mb-12 opacity-80">
        "There are places that slowly become ours."
      </h2>

      {!unlocked && (
        <div className="flex flex-col items-center mb-8">
          <p className="text-muted-foreground/40 text-sm text-center mb-8 animate-glow">
            Click the cup
          </p>
          <button
            onClick={() => setFilling(true)}
            className="relative w-16 h-20 border-2 border-muted-foreground/30 rounded-b-lg cursor-pointer hover:border-accent/50 transition-colors"
          >
            {/* Cup handle */}
            <div className="absolute -right-3 top-3 w-3 h-8 border-2 border-muted-foreground/30 rounded-r-full border-l-0" />
            {/* Fill */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-accent/40 rounded-b-md transition-all duration-100"
              style={{ height: `${fillLevel}%` }}
            />
          </button>
        </div>
      )}

      {unlocked && (
        <div className="mt-8 text-center leading-relaxed">
          <StaggeredReveal
            lines={contentLines}
            onComplete={() => {
              completePage(3);
              setShowContinue(true);
            }}
          />
          <ContinueLink to="/memory/4" visible={showContinue} />
        </div>
      )}
    </div>
  );
};

export default Memory3;
