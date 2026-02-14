import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { StaggeredReveal } from '@/components/StaggeredReveal';
import { ContinueLink } from '@/components/ContinueLink';

const Memory4 = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const { completePage, isPageAccessible } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPageAccessible(4)) navigate('/', { replace: true });
  }, [isPageAccessible, navigate]);

  const contentLines = [
    { text: 'We visited the Vinayagar temple and the Perumal temple many times.' },
    { text: '' },
    { text: 'We would come together,' },
    { text: 'but stand separately like strangers,' },
    { text: 'and pray at the same time.' },
    { text: '' },
    { text: 'Once, in the Vinayagar temple,' },
    { text: 'an aunty insisted that I do sangu pooja.' },
    { text: 'It was completely unexpected.' },
    { text: '' },
    { text: 'I had come only to pray with you,' },
    { text: 'but that pooja happened that day.' },
    { text: '' },
    { text: 'You were very happy because of it.' },
    { text: 'We both believed that God made it happen for a reason.' },
    { text: '' },
    { text: '"Some moments feel guided. Nama irukom, always."', className: 'font-serif italic text-accent mt-8' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 max-w-2xl mx-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-16">Chapter Four</p>

      <h2 className="font-serif text-2xl md:text-4xl text-center mb-12 opacity-80">
        "Faith sometimes works quietly, just like love."
      </h2>

      {!unlocked && (
        <div className="flex flex-col items-center mb-8">
          <p className="text-muted-foreground/40 text-sm text-center mb-8 animate-glow">
            Press your palms together
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setUnlocked(true)}
              className="text-4xl cursor-pointer hover:scale-110 transition-transform select-none"
            >
              🙏
            </button>
          </div>
        </div>
      )}

      {unlocked && (
        <div className="mt-8 text-center leading-relaxed">
          <StaggeredReveal
            lines={contentLines}
            onComplete={() => {
              completePage(4);
              setShowContinue(true);
            }}
          />
          <ContinueLink to="/memory/5" visible={showContinue} />
        </div>
      )}
    </div>
  );
};

export default Memory4;
