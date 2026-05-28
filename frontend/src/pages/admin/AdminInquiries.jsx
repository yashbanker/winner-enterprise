import { useEffect, useState } from 'react';
import { Download, Mail, Phone, X, Trash2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const STATUS = ['new', 'in_progress', 'contacted', 'closed'];

export default function AdminInquiries() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);

  const load = async () => {
    const { data } = await api.get('/inquiries?limit=200');
    setItems(data.items);
  };
  useEffect(()=>{ load(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/inquiries/${id}`, { status });
    toast.success('Status updated');
    load();
    if (active && active._id === id) setActive({...active, status});
  };
  const del = async (i) => {
    if (!confirm('Delete this inquiry?')) return;
    await api.delete(`/inquiries/${i._id}`);
    toast.success('Deleted'); load(); setActive(null);
  };
  const exportCsv = async () => {
    const token = localStorage.getItem('we_token');
    const res = await fetch('/api/inquiries/export', { headers: { Authorization: `Bearer ${token}` } });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'inquiries.csv'; a.click();
  };

  const filtered = filter === 'all' ? items : items.filter((i) => i.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div><h1 className="heading-display text-3xl text-navy-900">Inquiries</h1><p className="text-slate-600 text-sm">{items.length} total inquiries</p></div>
        <div className="flex gap-2">
          <button onClick={load} className="btn border border-slate-200 text-slate-700"><RefreshCw size={14}/> Refresh</button>
          <button onClick={exportCsv} className="btn-gold"><Download size={14}/> Export CSV</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', ...STATUS].map((s) => (
          <button key={s} onClick={()=>setFilter(s)} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${filter===s?'bg-navy-900 text-white':'bg-white border border-slate-200 text-slate-600'}`}>
            {s.replace('_',' ').toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-600">
            <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i._id} className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer" onClick={()=>setActive(i)}>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{new Date(i.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-semibold text-navy-900">{i.name}<div className="text-xs text-slate-500 font-normal">{i.company || ''}</div></td>
                <td className="px-4 py-3 text-slate-600 text-xs">{i.email}<br/>{i.phone}</td>
                <td className="px-4 py-3"><span className="badge bg-slate-100 text-slate-600 border-slate-200">{i.type}</span></td>
                <td className="px-4 py-3 text-slate-600">{i.productName || i.product?.name || '-'}</td>
                <td className="px-4 py-3"><span className={`badge ${i.status==='new'?'badge-stock':'bg-slate-100 text-slate-600 border-slate-200'}`}>{i.status.replace('_',' ')}</span></td>
                <td className="px-4 py-3 text-right"><button onClick={(e)=>{e.stopPropagation();del(i);}} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={14}/></button></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-slate-400">No inquiries</td></tr>}
          </tbody>
        </table>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setActive(null)}>
          <div className="bg-white rounded-3xl w-full max-w-lg" onClick={(e)=>e.stopPropagation()}>
            <div className="p-5 border-b flex justify-between items-center">
              <div>
                <div className="text-xs uppercase tracking-widest text-gold-600 font-semibold">{active.type} inquiry</div>
                <h2 className="heading-display text-xl text-navy-900">{active.name}</h2>
              </div>
              <button onClick={()=>setActive(null)}><X size={20}/></button>
            </div>
            <div className="p-5 space-y-3 text-sm max-h-[60vh] overflow-y-auto scroll-thin">
              <div className="flex gap-3"><Mail size={16} className="text-gold-500 mt-0.5"/><a href={`mailto:${active.email}`} className="text-navy-700 hover:text-gold-600">{active.email}</a></div>
              <div className="flex gap-3"><Phone size={16} className="text-gold-500 mt-0.5"/><a href={`tel:${active.phone}`} className="text-navy-700 hover:text-gold-600">{active.phone}</a></div>
              {active.company && <div className="text-navy-700"><b>Company:</b> {active.company}</div>}
              {active.country && <div className="text-navy-700"><b>Country:</b> {active.country}</div>}
              {active.productName && <div className="text-navy-700"><b>Product:</b> {active.productName}</div>}
              {active.quantity && <div className="text-navy-700"><b>Quantity:</b> {active.quantity}</div>}
              <div className="bg-slate-50 p-4 rounded-xl text-navy-700 whitespace-pre-line">{active.message}</div>
              <div className="pt-3 border-t border-slate-100">
                <label className="label-field">Status</label>
                <select className="input-field" value={active.status} onChange={(e)=>updateStatus(active._id, e.target.value)}>
                  {STATUS.map((s)=><option key={s} value={s}>{s.replace('_',' ')}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
