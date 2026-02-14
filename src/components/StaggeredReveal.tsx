import { useState, useEffect } from 'react';

interface StaggeredRevealProps {
  lines: { text: string; className?: string }[];
  onComplete?: () => void;
  delayBetween?: number;
  initialDelay?: number;
}

export function StaggeredReveal({ lines, onComplete, delayBetween = 600, initialDelay = 300 }: StaggeredRevealProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= lines.length) {
      onComplete?.();
      return;
    }

    const delay = visibleCount === 0 ? initialDelay : delayBetween;
    const timer = setTimeout(() => setVisibleCount(prev => prev + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount, lines.length, delayBetween, initialDelay, onComplete]);

  return (
    <div className="space-y-4">
      {lines.map((line, i) => (
        <p
          key={i}
          className={`transition-all duration-1000 ${line.className || ''} ${
            i < visibleCount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}
