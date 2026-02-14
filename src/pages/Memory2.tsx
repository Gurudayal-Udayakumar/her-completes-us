import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { StaggeredReveal } from '@/components/StaggeredReveal';
import { ContinueLink } from '@/components/ContinueLink';

const Memory2 = () => {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { completePage, isPageAccessible } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPageAccessible(2)) navigate('/', { replace: true });
  }, [isPageAccessible, navigate]);

  const handleMove = useCallback((clientX: number) => {
    if (!dragging.current || !containerRef.current || unlocked) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setProgress(pct);
    if (pct >= 95) {
      setUnlocked(true);
      dragging.current = false;
    }
  }, [unlocked]);

  const contentLines = [
    { text: 'That day, I borrowed a blue R15 bike from my senior.' },
    { text: '' },
    { text: 'We had planned our dress code —' },
    { text: 'dark grey shirts and blue jeans, both of us.' },
    { text: '' },
    { text: 'I picked you up near your college,' },
    { text: 'and we rode together to my room near my college.' },
    { text: '' },
    { text: '"The road was ordinary. Being with you was not."', className: 'font-serif italic text-accent mt-8' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 max-w-2xl mx-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-16">Chapter Two</p>

      <h2 className="font-serif text-2xl md:text-4xl text-center mb-12 opacity-80">
        "Some days feel different even before they end."
      </h2>

      {!unlocked && (
        <div className="w-full max-w-md mb-8">
          <p className="text-muted-foreground/40 text-sm text-center mb-6 animate-glow">
            Drag across the road
          </p>
          <div
            ref={containerRef}
            className="relative h-0.5 bg-muted-foreground/20 rounded-full cursor-pointer"
            onMouseDown={() => { dragging.current = true; }}
            onMouseUp={() => { dragging.current = false; }}
            onMouseLeave={() => { dragging.current = false; }}
            onMouseMove={(e) => handleMove(e.clientX)}
            onTouchStart={() => { dragging.current = true; }}
            onTouchEnd={() => { dragging.current = false; }}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            <div
              className="absolute top-0 left-0 h-full bg-accent/60 rounded-full transition-none"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-lg transition-none"
              style={{ left: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {unlocked && (
        <div className="mt-8 text-center leading-relaxed">
          <StaggeredReveal
            lines={contentLines}
            onComplete={() => {
              completePage(2);
              setShowContinue(true);
            }}
          />
          <ContinueLink to="/memory/3" visible={showContinue} />
        </div>
      )}
    </div>
  );
};

export default Memory2;
