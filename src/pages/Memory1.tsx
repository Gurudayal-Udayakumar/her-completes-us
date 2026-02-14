import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { StaggeredReveal } from '@/components/StaggeredReveal';
import { ContinueLink } from '@/components/ContinueLink';

const Memory1 = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [holding, setHolding] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const { completePage, isPageAccessible } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPageAccessible(1)) navigate('/', { replace: true });
  }, [isPageAccessible, navigate]);

  const startHold = useCallback(() => {
    setHolding(true);
    timerRef.current = setTimeout(() => {
      setUnlocked(true);
      setHolding(false);
    }, 2000);
  }, []);

  const endHold = useCallback(() => {
    setHolding(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const contentLines = [
    { text: 'May 30' },
    { text: 'That was the day we both sent a friend request to each other on Instagram.' },
    { text: 'It was simple and casual, but it quietly started everything between us.' },
    { text: '' },
    { text: 'October 10' },
    { text: 'That was the day we proposed.' },
    { text: 'You were the one who proposed first.' },
    { text: 'I remember that moment clearly, and I always will.' },
    { text: '' },
    { text: '"Always and forever, this is where nama irukom."', className: 'font-serif italic text-accent mt-8' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 max-w-2xl mx-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-16">Chapter One</p>
      
      <h2 className="font-serif text-2xl md:text-4xl text-center mb-12 opacity-80">
        "Some beginnings don't announce themselves. They simply{' '}
        <span
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          className={`cursor-pointer select-none transition-all duration-500 ${
            holding ? 'text-accent scale-110 inline-block' : ''
          } ${unlocked ? 'text-accent' : 'underline decoration-accent/30 decoration-1 underline-offset-4'}`}
        >
          stay
        </span>
        ."
      </h2>

      {!unlocked && (
        <p className="text-muted-foreground/40 text-sm animate-glow">
          Hold the word "stay"
        </p>
      )}

      {unlocked && (
        <div className="mt-8 text-center leading-relaxed">
          <StaggeredReveal
            lines={contentLines}
            onComplete={() => {
              completePage(1);
              setShowContinue(true);
            }}
          />
          <ContinueLink to="/memory/2" visible={showContinue} />
        </div>
      )}
    </div>
  );
};

export default Memory1;
