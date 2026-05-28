import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@winnerenterprise.com');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 30%, #c9a227 0%, transparent 40%), radial-gradient(circle at 80% 70%, #c9a227 0%, transparent 40%)'}}/>
      <motion.div initial={{opacity:0,y:30,scale:0.95}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.5}}
        className="relative w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-block bg-white rounded-2xl px-6 py-4 shadow-gold">
            <Logo/>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-8 gold-border-glow always">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold">
              <ShieldCheck size={26} className="text-white"/>
            </div>
            <h1 className="heading-display text-2xl mt-4 text-navy-900">Admin Login</h1>
            <p className="text-sm text-navy-600 mt-1">Secure access to your dashboard</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="label-field">Email</label>
              <input type="email" required className="input-field" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
              <label className="label-field">Password</label>
              <div className="relative">
                <input type={show?'text':'password'} required className="input-field pr-12" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500">
                  {show ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>
            <button disabled={loading} className="btn-gold w-full !py-3.5">
              {loading ? 'Signing in...' : 'Sign In Securely'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-navy-500">
            Default seed credentials are set via .env (ADMIN_EMAIL / ADMIN_PASSWORD)
          </div>
        </div>
      </motion.div>
    </div>
  );
}
