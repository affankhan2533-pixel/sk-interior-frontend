import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const t = localStorage.getItem('sk_token');
    if (!t) { router.push('/admin/login'); return; }
    setToken(t);
  }, []);
  return token;
}

function authH(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function imgSrc(url) {
  if (!url) return '/images/placeholder.svg';
  return url.startsWith('/uploads') ? `${BACKEND}${url}` : url;
}

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = {
  dashboard: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/></svg>,
  projects: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 10h16M4 14h10"/></svg>,
  beforeafter: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" d="M8 3H5a2 2 0 00-2 2v14a2 2 0 002 2h3M16 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3M12 3v18"/></svg>,
  testimonials: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  bookings: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  logout: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/></svg>,
  plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" d="M12 4v16m8-8H4"/></svg>,
  edit: () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>,
  trash: () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>,
  close: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>,
  bell: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>,
  sun: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" strokeWidth="2"/><path strokeWidth="2" strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>,
  eye: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  visits: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  up: () => <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>,
};

// ── Mini Donut Chart ───────────────────────────────────────────────────────
function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (!total) return (
    <div className="flex items-center justify-center h-48">
      <div className="w-32 h-32 rounded-full border-[12px] border-gray-100 flex items-center justify-center">
        <span className="text-xs text-gray-400">No data</span>
      </div>
    </div>
  );
  let offset = 0;
  const r = 54, cx = 64, cy = 64, circ = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6">
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="16"/>
        {data.map((d, i) => {
          const pct = d.value / total;
          const dash = pct * circ;
          const gap = circ - dash;
          const el = (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={d.color} strokeWidth="16"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset * circ}
              transform="rotate(-90 64 64)"
              strokeLinecap="round"/>
          );
          offset += pct;
          return el;
        })}
        <text x="64" y="68" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#121212">{total}</text>
      </svg>
      <div className="space-y-2">
        {data.map(d => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background: d.color}}></span>
            <span className="text-xs text-gray-500">{d.label}</span>
            <span className="text-xs font-semibold ml-auto pl-4">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bar Chart ─────────────────────────────────────────────────────────────
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-40 pt-4">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-[10px] text-gray-400">{d.value || ''}</span>
          <div className="w-full rounded-t-md transition-all duration-500" style={{height: `${(d.value / max) * 100}%`, minHeight: d.value ? 4 : 0, background: '#C8A96A'}}></div>
          <span className="text-[10px] text-gray-400 truncate w-full text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, trend }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">{icon}</div>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
          <Icon.up /> {trend}
        </span>
      </div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1" style={{fontFamily:"'Playfair Display',serif"}}>{value}</p>
    </div>
  );
}

// ── Modal Wrapper ─────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><Icon.close /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ── Form Field ────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inp = "w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/10 transition-all";

// ── Dashboard Overview ────────────────────────────────────────────────────
function DashboardSection({ token, onNav }) {
  const [counts, setCounts] = useState({ gallery: 0, ba: 0, testimonials: 0, bookings: 0, visitors: 0 });
  const [categories, setCategories] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      axios.get(`${API}/gallery`),
      axios.get(`${API}/before-after`),
      axios.get(`${API}/testimonials`),
      axios.get(`${API}/bookings`, authH(token)),
      axios.get(`${API}/visits`, authH(token)),
    ]).then(([g, ba, t, b, v]) => {
      setCounts({
        gallery: g.data.length,
        ba: ba.data.length,
        testimonials: t.data.length,
        bookings: b.data.length,
        visitors: v.data.count
      });
      setBookings(b.data.slice(0, 5));
      const cats = {};
      g.data.forEach(item => { cats[item.category] = (cats[item.category] || 0) + 1; });
      setCategories(Object.entries(cats).map(([k, v]) => ({ label: k, value: v })));
    }).catch(() => {});
  }, [token]);

  const COLORS = ['#C8A96A','#D4BC8A','#121212','#6b7280','#a78bfa','#34d399'];
  const donutData = categories.map((c, i) => ({ label: c.label, value: c.value, color: COLORS[i % COLORS.length] }));
  const barData = categories.length ? categories : [{ label: 'No data', value: 0 }];
  const statusColor = { new: '#3b82f6', contacted: '#f59e0b', closed: '#10b981' };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview,</h1>
        <p className="text-gray-400 text-sm mt-0.5">{new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard icon={<Icon.projects />} label="Total Projects" value={counts.gallery} trend="+12%" />
        <StatCard icon={<Icon.bookings />} label="Total Bookings" value={counts.bookings} trend="+12%" />
        <StatCard icon={<Icon.eye />} label="Before & After" value={counts.ba} trend="+12%" />
        <StatCard icon={<Icon.testimonials />} label="Testimonials" value={counts.testimonials} trend="+15%" />
        <StatCard icon={<Icon.visits />} label="Total Visitors" value={counts.visitors} trend="+18%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-4 rounded-full bg-[#C8A96A]"></div>
            <span className="font-semibold text-sm text-gray-700">Projects by Category</span>
          </div>
          <DonutChart data={donutData} />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-4 rounded-full bg-[#C8A96A]"></div>
            <span className="font-semibold text-sm text-gray-700">Images per Category</span>
          </div>
          <BarChart data={barData} />
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-full bg-[#C8A96A]"></div>
            <span className="font-semibold text-sm text-gray-700">Recent Bookings</span>
          </div>
          <button onClick={() => onNav('bookings')} className="text-xs text-[#C8A96A] hover:underline">View all</button>
        </div>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">No bookings yet</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {bookings.map(b => (
              <div key={b._id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-gray-800">{b.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{b.phone} · {b.city}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString('en-IN')}</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{background: statusColor[b.status] + '18', color: statusColor[b.status]}}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Projects / Gallery (all categories, admin creates custom ones) ─────────
function ProjectsSection({ token }) {
  const [items, setItems] = useState([]);
  const [filterCat, setFilterCat] = useState('all');
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', newCategory: '', description: '', order: 0 });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);

  const load = async () => {
    const { data } = await axios.get(`${API}/gallery`);
    setItems(data);
    const cats = [...new Set(data.map(d => d.category))];
    setCategories(cats);
  };
  useEffect(() => { if (token) load(); }, [token]);

  const openCreate = () => {
    setEditItem(null);
    setForm({ title: '', category: categories[0] || '', newCategory: '', description: '', order: 0 });
    setFile(null); setPreview(null); setShowModal(true);
  };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ title: item.title, category: item.category, newCategory: '', description: item.description || '', order: item.order || 0 });
    setFile(null); setPreview(imgSrc(item.imageUrl)); setShowModal(true);
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const finalCat = form.newCategory.trim() || form.category;
    if (!finalCat) return alert('Please select or enter a category');
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('category', finalCat.toLowerCase());
    fd.append('description', form.description);
    fd.append('order', form.order);
    if (file) fd.append('image', file);
    try {
      if (editItem) {
        await axios.put(`${API}/gallery/${editItem._id}`, fd, authH(token));
      } else {
        if (!file) { alert('Please select an image'); setSaving(false); return; }
        await axios.post(`${API}/gallery`, fd, authH(token));
      }
      setShowModal(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    await axios.delete(`${API}/gallery/${id}`, authH(token));
    load();
  };

  const filtered = filterCat === 'all' ? items : items.filter(i => i.category === filterCat);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-400 text-sm mt-0.5">{items.length} images across {categories.length} categories</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#C8A96A] hover:bg-[#b8945a] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <Icon.plus /> Add Project
        </button>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', ...categories].map(c => (
          <button key={c} onClick={() => setFilterCat(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${filterCat === c ? 'bg-[#121212] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#C8A96A] hover:text-[#C8A96A]'}`}>
            {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
          <p className="text-sm">No projects yet. Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <div className="relative overflow-hidden h-44">
                <img src={imgSrc(item.imageUrl)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => openEdit(item)} className="bg-white text-gray-700 hover:bg-[#C8A96A] hover:text-white p-2 rounded-lg transition-colors"><Icon.edit /></button>
                  <button onClick={() => handleDelete(item._id)} className="bg-white text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-colors"><Icon.trash /></button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm text-gray-800 truncate">{item.title}</p>
                <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#C8A96A]/10 text-[#C8A96A] capitalize">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editItem ? 'Edit Project' : 'Add New Project'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Title *">
              <input className={inp} required value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. Modern Master Bedroom" />
            </Field>
            <Field label="Category">
              <select className={inp} value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}>
                <option value="">-- Select existing --</option>
                {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Or create new category">
              <input className={inp} value={form.newCategory} onChange={e => setForm(p => ({...p, newCategory: e.target.value}))} placeholder="e.g. Terrace, Pooja Room, Kids Room..." />
              <p className="text-[11px] text-gray-400 mt-1">If filled, this overrides the selection above</p>
            </Field>
            <Field label="Description">
              <textarea className={inp + ' resize-none'} rows={2} value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="Optional" />
            </Field>
            <Field label="Display Order">
              <input type="number" className={inp} value={form.order} onChange={e => setForm(p => ({...p, order: +e.target.value}))} />
            </Field>
            <Field label={editItem ? 'Replace Image' : 'Image *'}>
              <input type="file" accept="image/*" onChange={handleFile} className={inp} />
              {preview && <img src={preview} className="mt-2 h-32 w-full object-cover rounded-xl" />}
            </Field>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-[#C8A96A] hover:bg-[#b8945a] text-white font-medium py-2.5 rounded-xl transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : editItem ? 'Update' : 'Add Project'}
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ── Before & After ────────────────────────────────────────────────────────
function BeforeAfterSection({ token }) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', location: '', order: 0 });
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => { const { data } = await axios.get(`${API}/before-after`); setItems(data); };
  useEffect(() => { if (token) load(); }, [token]);

  const openCreate = () => { setEditItem(null); setForm({ title: '', location: '', order: 0 }); setBeforeFile(null); setAfterFile(null); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ title: item.title, location: item.location || '', order: item.order || 0 }); setBeforeFile(null); setAfterFile(null); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('location', form.location);
    fd.append('order', form.order);
    if (beforeFile) fd.append('before', beforeFile);
    if (afterFile) fd.append('after', afterFile);
    try {
      if (editItem) {
        await axios.put(`${API}/before-after/${editItem._id}`, fd, authH(token));
      } else {
        if (!beforeFile || !afterFile) { alert('Please select both images'); setSaving(false); return; }
        await axios.post(`${API}/before-after`, fd, authH(token));
      }
      setShowModal(false); load();
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await axios.delete(`${API}/before-after/${id}`, authH(token));
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Before & After</h2>
          <p className="text-gray-400 text-sm mt-0.5">{items.length} transformation pairs</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#C8A96A] hover:bg-[#b8945a] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <Icon.plus /> Add Pair
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 3v18" />
            <path d="m8 8-4 4 4 4" />
            <path d="m16 8 4 4-4 4" />
          </svg>
          <p className="text-sm">No transformations yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 gap-0">
                <div className="relative">
                  <img src={imgSrc(item.beforeImage)} alt="Before" className="w-full h-40 object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">Before</span>
                </div>
                <div className="relative">
                  <img src={imgSrc(item.afterImage)} alt="After" className="w-full h-40 object-cover" />
                  <span className="absolute bottom-2 right-2 bg-[#C8A96A] text-white text-[10px] px-2 py-0.5 rounded-full">After</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-sm text-gray-800">{item.title}</p>
                  {item.location && <p className="text-xs text-gray-400 mt-0.5">{item.location}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="p-2 bg-gray-50 hover:bg-[#C8A96A]/10 text-gray-500 hover:text-[#C8A96A] rounded-lg transition-colors"><Icon.edit /></button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-lg transition-colors"><Icon.trash /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editItem ? 'Edit Transformation' : 'Add Transformation'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Title *"><input className={inp} required value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. Living Room Renovation" /></Field>
            <Field label="Location"><input className={inp} value={form.location} onChange={e => setForm(p => ({...p, location: e.target.value}))} placeholder="e.g. Bandra, Mumbai" /></Field>
            <Field label="Order"><input type="number" className={inp} value={form.order} onChange={e => setForm(p => ({...p, order: +e.target.value}))} /></Field>
            <Field label={editItem ? 'Before Image (optional replace)' : 'Before Image *'}>
              <input type="file" accept="image/*" onChange={e => setBeforeFile(e.target.files[0])} className={inp} />
              {editItem?.beforeImage && !beforeFile && <img src={imgSrc(editItem.beforeImage)} className="mt-2 h-20 w-full object-cover rounded-xl" />}
            </Field>
            <Field label={editItem ? 'After Image (optional replace)' : 'After Image *'}>
              <input type="file" accept="image/*" onChange={e => setAfterFile(e.target.files[0])} className={inp} />
              {editItem?.afterImage && !afterFile && <img src={imgSrc(editItem.afterImage)} className="mt-2 h-20 w-full object-cover rounded-xl" />}
            </Field>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-[#C8A96A] hover:bg-[#b8945a] text-white font-medium py-2.5 rounded-xl transition-colors disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────
function TestimonialsSection({ token }) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', loc: '', rating: 5, text: '', order: 0 });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await axios.get(`${API}/testimonials`);
    setItems(data);
  };
  useEffect(() => { if (token) load(); }, [token]);

  const openCreate = () => {
    setEditItem(null);
    setForm({ name: '', loc: '', rating: 5, text: '', order: 0 });
    setShowModal(true);
  };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ name: item.name, loc: item.loc, rating: item.rating, text: item.text, order: item.order || 0 });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        await axios.put(`${API}/testimonials/${editItem._id}`, form, authH(token));
      } else {
        await axios.post(`${API}/testimonials`, form, authH(token));
      }
      setShowModal(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete testimonial?')) return;
    await axios.delete(`${API}/testimonials/${id}`, authH(token));
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Testimonials</h2>
          <p className="text-gray-400 text-sm mt-0.5">Manage customer reviews shown on the homepage</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#C8A96A] hover:bg-[#b8945a] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <Icon.plus /> Add Testimonial
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <p className="text-sm">No testimonials yet. Click "Add Testimonial" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between group relative">
              <div>
                <div className="flex text-[#C8A96A] text-sm mb-3">{'★'.repeat(item.rating)}</div>
                <p className="text-gray-600 text-sm italic leading-relaxed">&ldquo;{item.text}&rdquo;</p>
              </div>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                <div>
                  <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.loc}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="p-2 bg-gray-50 hover:bg-[#C8A96A]/10 text-gray-500 hover:text-[#C8A96A] rounded-lg transition-colors"><Icon.edit /></button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-lg transition-colors"><Icon.trash /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editItem ? 'Edit Testimonial' : 'Add Testimonial'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Client Name *">
              <input className={inp} required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="e.g. Priya Sharma" />
            </Field>
            <Field label="Location / Subtitle *">
              <input className={inp} required value={form.loc} onChange={e => setForm(p => ({...p, loc: e.target.value}))} placeholder="e.g. Bandra, Mumbai" />
            </Field>
            <Field label="Rating *">
              <select className={inp} required value={form.rating} onChange={e => setForm(p => ({...p, rating: +e.target.value}))}>
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </Field>
            <Field label="Review Text *">
              <textarea className={inp + ' resize-none'} required rows={4} value={form.text} onChange={e => setForm(p => ({...p, text: e.target.value}))} placeholder="Write review text here..." />
            </Field>
            <Field label="Display Order">
              <input type="number" className={inp} value={form.order} onChange={e => setForm(p => ({...p, order: +e.target.value}))} />
            </Field>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-[#C8A96A] hover:bg-[#b8945a] text-white font-medium py-2.5 rounded-xl transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ── Bookings ──────────────────────────────────────────────────────────────
function BookingsSection({ token }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    const { data } = await axios.get(`${API}/bookings`, authH(token));
    setBookings(data);
    setLoading(false);
  };
  useEffect(() => { if (token) load(); }, [token]);

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/bookings/${id}`, { status }, authH(token));
    load();
  };

  const statusStyle = {
    new: 'bg-blue-50 text-blue-600',
    contacted: 'bg-amber-50 text-amber-600',
    closed: 'bg-emerald-50 text-emerald-600'
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Bookings</h2>
          <p className="text-gray-400 text-sm mt-0.5">{bookings.length} total consultation requests</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {['all','new','contacted','closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${filter === f ? 'bg-[#121212] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#C8A96A]'}`}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin"></div></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="18" x="4" y="4" rx="2" />
            <path d="M9 22h6" />
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <path d="M8 11h8" />
            <path d="M8 16h5" />
          </svg>
          <p className="text-sm">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(b => (
            <div key={b._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C8A96A]/15 flex items-center justify-center text-[#C8A96A] font-bold text-sm flex-shrink-0">
                    {b.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{b.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.email} · {b.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] px-3 py-1 rounded-full font-medium ${statusStyle[b.status]}`}>{b.status}</span>
                  <select value={b.status} onChange={e => updateStatus(b._id, e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#C8A96A] cursor-pointer">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-50">
                <div><p className="text-[10px] text-gray-400 uppercase">City</p><p className="text-sm mt-0.5">{b.city || '—'}</p></div>
                <div><p className="text-[10px] text-gray-400 uppercase">Property</p><p className="text-sm mt-0.5 capitalize">{b.property || '—'}</p></div>
                <div><p className="text-[10px] text-gray-400 uppercase">Budget</p><p className="text-sm mt-0.5">{b.budget || '—'}</p></div>
                <div><p className="text-[10px] text-gray-400 uppercase">Date</p><p className="text-sm mt-0.5">{new Date(b.createdAt).toLocaleDateString('en-IN')}</p></div>
              </div>
              {b.message && <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-50 italic">&ldquo;{b.message}&rdquo;</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, onLogout }) {
  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: <Icon.dashboard /> },
    { id: 'projects', label: 'Projects', icon: <Icon.projects /> },
    { id: 'before-after', label: 'Before & After', icon: <Icon.beforeafter /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Icon.testimonials /> },
    { id: 'bookings', label: 'Bookings', icon: <Icon.bookings /> },
  ];

  return (
    <aside className="w-[200px] h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#C8A96A] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">SK</span>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 leading-none">Admin Panel</p>
            <p className="text-[10px] text-gray-400 mt-0.5">SK Interior</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 py-4 px-3 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-300 uppercase tracking-widest px-2 mb-3">Menu</p>
        {nav.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${active === n.id ? 'bg-[#C8A96A] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
            {n.icon}
            {n.label}
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-50">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
          <Icon.logout /> Logout
        </button>
      </div>
    </aside>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const token = useAuth();
  const router = useRouter();
  const [active, setActive] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('sk_token');
    router.push('/admin/login');
  };

  if (!token) return null;

  const sectionTitles = { dashboard: 'Dashboard', projects: 'Projects', 'before-after': 'Before & After', testimonials: 'Testimonials', bookings: 'Bookings' };

  const renderSection = () => {
    switch (active) {
      case 'dashboard': return <DashboardSection token={token} onNav={setActive} />;
      case 'projects': return <ProjectsSection token={token} />;
      case 'before-after': return <BeforeAfterSection token={token} />;
      case 'testimonials': return <TestimonialsSection token={token} />;
      case 'bookings': return <BookingsSection token={token} />;
      default: return null;
    }
  };

  return (
    <>
      <Head><title>Admin — SK Interior</title></Head>
      <div className="flex min-h-screen bg-[#f7f7f8]" style={{fontFamily:"'Poppins',sans-serif"}}>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex sticky top-0 h-screen">
          <Sidebar active={active} setActive={setActive} onLogout={handleLogout} />
        </div>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="relative z-10"><Sidebar active={active} setActive={(s) => { setActive(s); setMobileOpen(false); }} onLogout={handleLogout} /></div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"><Icon.sun /></button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors relative">
                <Icon.bell />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C8A96A] rounded-full"></span>
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#C8A96A] flex items-center justify-center text-white text-xs font-bold">A</div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800 leading-none">Admin Account</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">SK Interior</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            {renderSection()}
          </main>
        </div>
      </div>
    </>
  );
}
