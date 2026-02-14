import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';

const Landing = () => {
  const [name, setName] = useState('');
  const [activated, setActivated] = useState(false);
  const { completePage } = useProgress();
  const navigate = useNavigate();

  const handleInput = useCallback((value: string) => {
    setName(value);
    if (value.length >= 2 && !activated) {
      setActivated(true);
      completePage(0);
    }
  }, [activated, completePage]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-[2s] ${activated ? 'opacity-100' : ''}`}>
      <h1
        className={`font-serif text-3xl md:text-5xl text-center mb-12 transition-all duration-[2s] ${
          activated ? 'opacity-100' : 'opacity-[0.15]'
        }`}
      >
        She Completes the Website
      </h1>

      <p
        className={`text-muted-foreground text-lg mb-12 transition-all duration-[2s] ${
          activated ? 'opacity-0 h-0 mb-0' : 'opacity-60'
        }`}
      >
        This website is incomplete.
      </p>

      <div className="relative w-full max-w-xs">
        <input
          type="text"
          value={name}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Type her name to begin"
          className={`w-full bg-transparent border-b border-muted-foreground/30 pb-2 text-center text-foreground text-lg font-light outline-none placeholder:text-muted-foreground/40 focus:border-accent transition-colors duration-500 ${
            activated ? 'border-accent' : ''
          }`}
        />
        {!activated && (
          <span className="absolute right-0 bottom-2 w-0.5 h-5 bg-accent animate-glow" />
        )}
      </div>

      <button
        onClick={() => navigate('/memory/1')}
        className={`mt-16 text-sm tracking-[0.3em] uppercase text-muted-foreground hover:text-accent transition-all duration-1000 cursor-pointer ${
          activated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        Begin →
      </button>
    </div>
  );
};

export default Landing;
