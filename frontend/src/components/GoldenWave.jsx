export default function GoldenWave({ className = '', flip = false }) {
  return (
    <svg
      className={`absolute left-0 right-0 w-full pointer-events-none ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
    >
      <defs>
        <linearGradient id="gw1" x1="0" x2="1">
          <stop offset="0%" stopColor="#f4df8e" stopOpacity="0"/>
          <stop offset="50%" stopColor="#c9a227" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#f4df8e" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gw2" x1="0" x2="1">
          <stop offset="0%" stopColor="#c9a227" stopOpacity="0"/>
          <stop offset="50%" stopColor="#e6b633" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0,60 C360,120 720,0 1440,80" stroke="url(#gw1)" strokeWidth="2.5" fill="none"/>
      <path d="M0,80 C360,30 720,110 1440,40" stroke="url(#gw2)" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
