import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, light = false, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-14`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 text-xs tracking-[0.3em] font-semibold uppercase mb-4 ${light ? 'text-gold-300' : 'text-gold-600'}`}>
          <span className="w-8 h-px bg-current"/>
          {eyebrow}
          <span className="w-8 h-px bg-current"/>
        </div>
      )}
      <h2 className={`heading-display text-3xl sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-navy-900'} leading-tight`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base sm:text-lg ${light ? 'text-white/75' : 'text-navy-600'} leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
