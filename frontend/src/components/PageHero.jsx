import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHero({ title, subtitle, crumb }) {
  return (
    <section className="relative pt-32 pb-20 bg-navy-gradient text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, #c9a227 0%, transparent 40%), radial-gradient(circle at 80% 70%, #c9a227 0%, transparent 40%)'
      }}/>
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,40 C320,100 720,0 1440,60 L1440,100 L0,100 Z" fill="#fff"/>
      </svg>

      <div className="container-px relative max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 text-xs text-gold-300 tracking-widest mb-5">
          <Link to="/" className="hover:text-white">HOME</Link><ChevronRight size={14}/><span>{crumb || title.toUpperCase()}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-display text-4xl sm:text-5xl lg:text-6xl">
          {title.split(' ').map((w, i, arr) => i === arr.length - 1 ? <span key={i} className="gold-text"> {w}</span> : <span key={i}>{i ? ' ' : ''}{w}</span>)}
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5 text-white/80 max-w-2xl mx-auto text-lg">
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
