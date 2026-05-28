import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import { COMPANY } from '../utils/constants';
import api from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', message:'' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', { ...form, type: 'general' });
      toast.success('Message sent! We will reply shortly.');
      setForm({ name:'', email:'', phone:'', company:'', message:'' });
    } catch (err) {
      toast.error('Failed to send message');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Helmet><title>Contact — WINNER ENTERPRISE</title></Helmet>
      <PageHero title="Contact Us" subtitle="Let's discuss your requirements — we respond within 24 business hours."/>

      <section className="section">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="lg:col-span-2 space-y-6">
            <div>
              <div className="text-xs tracking-[0.3em] font-semibold uppercase text-gold-600 mb-2">Reach Us</div>
              <h2 className="heading-display text-3xl text-navy-900">Get in <span className="gold-text">Touch</span></h2>
              <p className="mt-3 text-navy-600">Premium glass beads. Trusted partners. One inquiry away.</p>
            </div>

            <div className="card-premium p-5 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0"><MapPin size={20}/></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-navy-500 font-semibold">Address</div>
                <div className="text-navy-800 mt-1">{COMPANY.address}</div>
              </div>
            </div>

            {COMPANY.contacts.map((c) => (
              <div key={c.phone} className="card-premium p-5 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0"><Phone size={20}/></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-navy-500 font-semibold">{c.name}</div>
                  <a href={`tel:${c.phoneRaw}`} className="text-navy-800 mt-1 block hover:text-gold-600">{c.phone}</a>
                </div>
              </div>
            ))}

            <div className="card-premium p-5 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0"><Mail size={20}/></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-navy-500 font-semibold">Email</div>
                <a href={`mailto:${COMPANY.email}`} className="text-navy-800 mt-1 block hover:text-gold-600">{COMPANY.email}</a>
              </div>
            </div>

            <div className="card-premium p-5 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0"><Clock size={20}/></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-navy-500 font-semibold">Business Hours</div>
                <div className="text-navy-800 mt-1">{COMPANY.hours}</div>
              </div>
            </div>

            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" className="btn-gold w-full">
              <MessageCircle size={18}/> Chat on WhatsApp
            </a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="lg:col-span-3">
            <form onSubmit={submit} className="card-premium p-8 lg:p-10 gold-border-glow always">
              <h3 className="heading-display text-2xl text-navy-900">Send Us a Message</h3>
              <p className="text-navy-600 mt-2 text-sm">Fill in your details — we'll get back within 24 hours.</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div><label className="label-field">Full Name *</label><input required className="input-field" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></div>
                <div><label className="label-field">Email *</label><input required type="email" className="input-field" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/></div>
                <div><label className="label-field">Phone *</label><input required className="input-field" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})}/></div>
                <div><label className="label-field">Company</label><input className="input-field" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})}/></div>
                <div className="sm:col-span-2">
                  <label className="label-field">Message *</label>
                  <textarea required rows={5} className="input-field" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} placeholder="Tell us your requirements, quantity, application..."/>
                </div>
              </div>

              <button disabled={loading} className="btn-gold mt-6"><Send size={16}/> {loading ? 'Sending...' : 'Send Message'}</button>
            </form>
          </motion.div>
        </div>

        {/* Map */}
        <div className="container-px max-w-7xl mx-auto mt-16">
          <div className="card-premium overflow-hidden">
            <iframe
              title="Winner Enterprise Location"
              src="https://maps.google.com/maps?q=Kosad%20Ring%20Road%2C%20Surat%20394107&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              className="block w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
