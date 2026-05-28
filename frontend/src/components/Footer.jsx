import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { COMPANY } from '../utils/constants';

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 text-white overflow-hidden">
      {/* Decorative gold wave */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C320,80 720,0 1440,40 L1440,0 L0,0 Z" fill="url(#fg)" opacity="0.18"/>
        <defs>
          <linearGradient id="fg" x1="0" x2="1">
            <stop offset="0%" stopColor="#c9a227"/><stop offset="100%" stopColor="#f4df8e"/>
          </linearGradient>
        </defs>
      </svg>

      <div className="container-px max-w-7xl mx-auto pt-20 pb-10 relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          {/* About */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 text-white/70 text-sm leading-relaxed">
              Trusted B2B supplier of premium glass beads serving road-marking,
              decorative, construction and industrial sectors across India and worldwide.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="heading-display text-lg mb-5 gold-text">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              {[
                ['Home','/'],['About Us','/about'],['Products','/products'],
                ['Industries','/industries'],['Gallery','/gallery'],
                ['Catalogue','/catalogue'],['Contact','/contact'],
              ].map(([t,p]) => (
                <li key={p}><Link to={p} className="hover:text-gold-400 transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="heading-display text-lg mb-5 gold-text">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex gap-3"><MapPin size={16} className="text-gold-400 shrink-0 mt-0.5"/><span>{COMPANY.address}</span></li>
              {COMPANY.contacts.map(c => (
                <li key={c.phone} className="flex gap-3"><Phone size={16} className="text-gold-400 shrink-0 mt-0.5"/>
                  <a href={`tel:${c.phoneRaw}`} className="hover:text-gold-400">{c.name} · {c.phone}</a>
                </li>
              ))}
              <li className="flex gap-3"><Mail size={16} className="text-gold-400 shrink-0 mt-0.5"/><a href={`mailto:${COMPANY.email}`} className="hover:text-gold-400">{COMPANY.email}</a></li>
              <li className="flex gap-3"><Clock size={16} className="text-gold-400 shrink-0 mt-0.5"/>{COMPANY.hours}</li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="heading-display text-lg mb-5 gold-text">Instant Inquiry</h4>
            <p className="text-sm text-white/70 mb-5">Chat with us instantly on WhatsApp for fast quotations and bulk orders.</p>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" className="btn-gold w-full">
              <MessageCircle size={18}/> WhatsApp Us
            </a>
          </div>
        </div>

        <div className="gold-divider mt-12"/>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 text-xs text-white/60">
          <div>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</div>
          <div className="tracking-wider">DESIGNED FOR PREMIUM B2B INDUSTRIAL EXCELLENCE</div>
        </div>
      </div>
    </footer>
  );
}
