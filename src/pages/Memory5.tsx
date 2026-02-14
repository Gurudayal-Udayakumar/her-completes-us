import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { StaggeredReveal } from '@/components/StaggeredReveal';
import { ContinueLink } from '@/components/ContinueLink';

const Memory5 = () => {
  const [note, setNote] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const { completePage, isPageAccessible } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPageAccessible(5)) navigate('/', { replace: true });
  }, [isPageAccessible, navigate]);

  useEffect(() => {
    if (note.length >= 3 && !unlocked) {
      setUnlocked(true);
    }
  }, [note, unlocked]);

  const contentLines = [
    { text: 'Once, you came to my room.' },
    { text: 'I locked it and left for college because of some work.' },
    { text: '' },
    { text: 'You stayed inside —' },
    { text: 'without fear, without doubt.' },
    { text: '' },
    { text: 'When I returned,' },
    { text: 'you were wearing my T-shirt.' },
    { text: '' },
    { text: 'The room was cleaner.' },
    { text: 'Sticky notes were on the wall.' },
    { text: 'A quiet celebration waiting for me.' },
    { text: '' },
    { text: 'It was my birthday week.' },
    { text: 'You planned it while I was away,' },
    { text: 'turning a normal day into something I will always carry.' },
    { text: '' },
    { text: '"I left for college that day. You stayed — and made the space feel like it belonged to us."', className: 'font-serif italic text-accent mt-8' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 max-w-2xl mx-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-16">The Room, The Waiting, The Birthday</p>

      <h2 className="font-serif text-2xl md:text-4xl text-center mb-12 opacity-80">
        "Trust reveals itself when no one is watching."
      </h2>

      {!unlocked && (
        <div className="flex flex-col items-center mb-8">
          <p className="text-muted-foreground/40 text-sm text-center mb-6 animate-glow">
            Write something on the sticky note
          </p>
          <div className="w-48 h-48 bg-accent/10 border border-accent/20 rounded-sm p-4 rotate-1 shadow-lg">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="..."
              className="w-full h-full bg-transparent resize-none outline-none text-foreground/80 font-serif text-sm placeholder:text-muted-foreground/30"
            />
          </div>
        </div>
      )}

      {unlocked && (
        <div className="mt-8 text-center leading-relaxed">
          <StaggeredReveal
            lines={contentLines}
            onComplete={() => {
              completePage(5);
              setShowContinue(true);
            }}
          />
          <ContinueLink to="/memory/6" visible={showContinue} />
        </div>
      )}
    </div>
  );
};

export default Memory5;
