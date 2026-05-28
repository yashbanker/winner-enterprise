import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Truck, Users, Target, Eye, Heart, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import GoldenWave from '../components/GoldenWave';

export default function About() {
  return (
    <>
      <Helmet><title>About — WINNER ENTERPRISE</title></Helmet>
      <PageHero title="About Our Company" subtitle="A legacy of premium quality, trusted service, and uncompromised B2B excellence."/>

      <section className="section">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.img initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} viewport={{once:true}} src="/assets/warehouse.png" className="rounded-3xl shadow-navy"/>
          <div>
            <div className="text-xs tracking-[0.3em] font-semibold uppercase text-gold-600 mb-3">Who We Are</div>
            <h2 className="heading-display text-3xl lg:text-4xl text-navy-900 leading-tight">
              Trusted partner for <span className="gold-text">premium glass beads</span> supply
            </h2>
            <div className="mt-6 space-y-4 text-navy-700 leading-relaxed">
              <p>WINNER ENTERPRISE is a Surat-based B2B supplier specializing in premium-grade glass beads for industrial, decorative, reflective and construction applications.</p>
              <p>With over a decade of expertise in sourcing, processing and bulk supply, we have built a trusted network of clients spanning road marking contractors, designers, manufacturers and construction firms across India.</p>
              <p>Our commitment to <b>quality, reliability and partnership</b> defines every shipment we deliver.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section bg-gradient-to-b from-gold-50/30 to-white relative">
        <GoldenWave className="top-0"/>
        <div className="container-px max-w-7xl mx-auto relative">
          <SectionHeading eyebrow="Our Foundation" title="Mission, Vision & Values"/>
          <div className="grid lg:grid-cols-3 gap-7">
            {[
              { icon: Target, t: 'Our Mission', d: 'To supply world-class glass beads that empower industries with consistent quality and reliable service.' },
              { icon: Eye, t: 'Our Vision', d: 'To be India\'s most trusted B2B glass beads supplier — recognized for excellence, integrity and innovation.' },
              { icon: Heart, t: 'Our Values', d: 'Quality. Trust. Partnership. Speed. We live these every day to earn our clients\' confidence.' },
            ].map((v, i) => (
              <motion.div key={v.t} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                className="card-premium p-8">
                <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold-soft mb-5">
                  <v.icon size={24} className="text-white"/>
                </div>
                <h3 className="heading-display text-xl text-navy-900">{v.t}</h3>
                <p className="mt-3 text-navy-600 leading-relaxed">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-navy-gradient text-white relative overflow-hidden">
        <div className="container-px max-w-7xl mx-auto relative">
          <SectionHeading light eyebrow="Our Numbers" title="A Decade of Trusted Service"/>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: '15+', l: 'Years of Experience', icon: Award },
              { v: '500+', l: 'B2B Clients', icon: Users },
              { v: '25+', l: 'States Served', icon: Truck },
              { v: '99.8%', l: 'On-time Delivery', icon: ShieldCheck },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-6 text-center">
                <s.icon size={26} className="text-gold-400 mx-auto"/>
                <div className="heading-display text-4xl gold-text mt-3">{s.v}</div>
                <div className="text-xs tracking-widest text-white/70 mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px max-w-5xl mx-auto text-center">
          <Sparkles size={28} className="text-gold-500 mx-auto"/>
          <h2 className="heading-display text-3xl lg:text-4xl mt-4 text-navy-900">Built for B2B Excellence</h2>
          <p className="mt-5 text-navy-600 text-lg leading-relaxed">
            From large-scale road marking contracts to designer décor projects, WINNER ENTERPRISE delivers the
            precise grade, packaging and timeline your business demands. Partner with us and experience why
            India's leading buyers trust our supply chain.
          </p>
        </div>
      </section>
    </>
  );
}
