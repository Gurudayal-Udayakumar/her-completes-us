import { useNavigate } from 'react-router-dom';

interface ContinueLinkProps {
  to: string;
  visible: boolean;
}

export function ContinueLink({ to, visible }: ContinueLinkProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`mt-16 text-sm tracking-[0.3em] uppercase text-muted-foreground hover:text-accent transition-all duration-1000 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      Continue →
    </button>
  );
}
