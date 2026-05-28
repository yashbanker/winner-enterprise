import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { COMPANY } from '../utils/constants';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20WINNER%20ENTERPRISE,%20I%20would%20like%20to%20inquire%20about%20your%20glass%20beads.`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40"/>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-[0_8px_30px_rgba(16,185,129,0.5)] hover:bg-emerald-600 transition-colors">
        <MessageCircle size={26} />
      </span>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-navy-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
