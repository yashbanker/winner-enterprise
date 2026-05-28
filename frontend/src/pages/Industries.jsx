import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Route, Gem, Factory, Zap, Building2, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

const INDUSTRIES = [
  { icon: Route, name: 'Road Marking', desc: 'High-refractive index reflective beads for thermoplastic, cold-applied and water-borne road paints. Compliant with international safety standards.', features: ['BS / AASHTO Compliant', 'High Retro-reflective Index', 'Premium Sphericity'] },
  { icon: Gem, name: 'Decorative Industry', desc: 'Vibrant colored beads designed for interior decor, jewelry, designer flooring, resin art, vase fillers and luxury décor projects.', features: ['Multiple Color Options', 'UV-Stable Pigments', 'Designer Grade'] },
  { icon: Factory, name: 'Industrial Applications', desc: 'Abrasive-grade beads for sandblasting, shot peening, surface cleaning, deburring, polishing and precision finishing of metal components.', features: ['High Hardness', 'Reusable', 'Consistent Particle Size'] },
  { icon: Zap, name: 'Reflective Solutions', desc: 'Engineered microspheres for retro-reflective safety products including signage, garments, traffic safety and visibility solutions.', features: ['Premium Refractive Index', 'High Roundness', 'Durable Coating'] },
  { icon: Building2, name: 'Construction Applications', desc: 'Premium decorative aggregates for architectural finishes, terrazzo, exposed concrete, designer flooring and façade applications.', features: ['Weather Resistant', 'Multiple Sizes', 'Bulk Supply'] },
];

export default function Industries() {
  return (
    <>
      <Helmet><title>Industries Served — WINNER ENTERPRISE</title></Helmet>
      <PageHero title="Industries We Serve" subtitle="Mission-critical glass beads supply across diverse B2B sectors."/>

      <section className="section">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeading eyebrow="Our Reach" title="Powering Multiple Industries" subtitle="From road safety to luxury décor — our glass beads deliver precise performance for every application."/>
          <div className="grid lg:grid-cols-2 gap-7">
            {INDUSTRIES.map((ind, i) => (
              <motion.div key={ind.name} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
                className="card-premium gold-border-glow p-8 group">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold shrink-0 group-hover:scale-110 transition-transform">
                    <ind.icon size={28} className="text-white"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-display text-2xl text-navy-900">{ind.name}</h3>
                    <p className="mt-3 text-navy-600 leading-relaxed">{ind.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ind.features.map((f) => (
                        <span key={f} className="text-xs px-3 py-1 rounded-full bg-gold-50 text-gold-700 border border-gold-200 font-medium">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
