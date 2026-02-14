import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';

const chapters = [
  'Where It Began',
  'The Ride That Stayed',
  'Keerthi Cafe',
  'Where Faith Watched Us',
  'The Room, The Waiting, The Birthday',
  'Distance, Flaws, and Staying',
];

const FinalPage = () => {
  const [stage, setStage] = useState(0);
  const { isPageAccessible } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPageAccessible(7)) navigate('/', { replace: true });
  }, [isPageAccessible, navigate]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 5500),
      setTimeout(() => setStage(4), 8000),
      setTimeout(() => setStage(5), 10000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 py-20 transition-all duration-[3s] ${stage >= 5 ? 'bg-[hsl(30,10%,12%)]' : ''}`}>
      {/* Chapter markers */}
      <div className={`flex flex-wrap justify-center gap-3 mb-20 transition-all duration-1000 ${stage >= 1 ? 'opacity-60' : 'opacity-0'}`}>
        {chapters.map((ch, i) => (
          <span key={i} className="text-xs tracking-[0.2em] uppercase text-muted-foreground border border-muted-foreground/20 px-3 py-1">
            {ch}
          </span>
        ))}
      </div>

      <h2 className={`font-serif text-2xl md:text-4xl text-center mb-12 transition-all duration-[2s] ${stage >= 2 ? 'opacity-80' : 'opacity-0'}`}>
        "Some things are never complete on their own."
      </h2>

      <p className={`text-center text-lg leading-relaxed max-w-md transition-all duration-[2s] ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        Just like this website,<br />
        my life never works without you.
      </p>

      <div className={`mt-16 text-center transition-all duration-[2s] ${stage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
        <p className="font-serif text-xl text-accent mb-3">Nama irukom.</p>
        <p className="font-serif text-xl text-accent mb-2">Love you.</p>
        <p className="font-serif text-xl text-accent">Happy Valentine's Day ❤️</p>
      </div>

      {stage >= 5 && (
        <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-accent/5 to-transparent opacity-0 animate-[fade-in_3s_ease-out_forwards]" />
      )}
    </div>
  );
};

export default FinalPage;
