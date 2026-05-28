import { Link } from 'react-router-dom';

export default function Logo({ variant = 'dark', className = '' }) {
  const navyText = variant === 'light' ? 'text-white' : 'text-navy-900';
  const subText = variant === 'light' ? 'text-white/70' : 'text-navy-600';

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Emblem */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-soft">
          <svg viewBox="0 0 32 32" className="w-7 h-7 text-white" fill="currentColor">
            <circle cx="11" cy="11" r="5" opacity="0.95" />
            <circle cx="22" cy="14" r="4" opacity="0.7" />
            <circle cx="15" cy="22" r="4.5" opacity="0.85" />
            <circle cx="9" cy="9" r="1.4" fill="#fff" opacity="0.9" />
            <circle cx="20" cy="12" r="1.1" fill="#fff" opacity="0.9" />
            <circle cx="13" cy="20" r="1.2" fill="#fff" opacity="0.9" />
          </svg>
        </div>
        <div className="absolute -inset-1 rounded-full bg-gold-gradient opacity-0 group-hover:opacity-30 blur-md transition-opacity" />
      </div>
      <div className="leading-tight">
        <div className={`heading-display text-base sm:text-lg ${navyText} tracking-wider`}>
          WINNER <span className="gold-text">ENTERPRISE</span>
        </div>
        <div className={`text-[10px] sm:text-[11px] tracking-[0.25em] uppercase ${subText}`}>
          Glass Beads · Supplier
        </div>
      </div>
    </Link>
  );
}
