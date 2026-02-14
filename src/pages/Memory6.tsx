import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { StaggeredReveal } from '@/components/StaggeredReveal';
import { ContinueLink } from '@/components/ContinueLink';

const Memory6 = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const { completePage, isPageAccessible } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPageAccessible(6)) navigate('/', { replace: true });
  }, [isPageAccessible, navigate]);

  const contentLines = [
    { text: 'It has been a long time since we met physically.' },
    { text: 'Things are strict at your house.' },
    { text: '' },
    { text: 'Still, we both believe —' },
    { text: 'we will get married soon.' },
    { text: '' },
    { text: 'Right now, we are in a fight.' },
    { text: 'Many times, I fall asleep while talking to you on the phone.' },
    { text: '' },
    { text: 'It has been a problem for years.' },
    { text: 'I am trying to overcome it,' },
    { text: 'even when it feels difficult.' },
    { text: '' },
    { text: 'It hurts you.' },
    { text: 'I know that.' },
    { text: '' },
    { text: 'And still, you stay.' },
    { text: 'You have always been there for me,' },
    { text: 'even with my flaws.' },
    { text: '' },
    { text: 'That kind of love is rare.' },
    { text: '"That kind of love is you. Always and forever."', className: 'font-serif italic text-accent mt-8' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 max-w-2xl mx-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-16">Distance, Flaws, and Staying</p>

      <h2 className="font-serif text-2xl md:text-4xl text-center mb-12 opacity-80">
        "Love is not made of perfect moments. It is made of staying."
      </h2>

      {!unlocked && (
        <div className="flex flex-col items-center mb-8">
          <p className="text-muted-foreground/40 text-sm text-center mb-8 animate-glow">
            Stay?
          </p>
          <button
            onClick={() => setUnlocked(true)}
            className="px-8 py-3 border border-accent/40 text-accent font-serif text-lg tracking-wider hover:bg-accent/10 transition-all duration-500 cursor-pointer"
          >
            Stay
          </button>
        </div>
      )}

      {unlocked && (
        <div className="mt-8 text-center leading-relaxed">
          <StaggeredReveal
            lines={contentLines}
            onComplete={() => {
              completePage(6);
              setShowContinue(true);
            }}
          />
          <ContinueLink to="/final" visible={showContinue} />
        </div>
      )}
    </div>
  );
};

export default Memory6;
