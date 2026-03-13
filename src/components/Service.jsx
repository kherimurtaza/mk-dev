import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import webTemplate from '/img/website-template.jpg'
import socialMedia from '/img/social-media-template-2.png'
import businessTemplate from '/img/businss-template.jpg'
import logoTemplate from '/img/logo-template.png'
import portfolioTemplate from '/img/portfolio-template.png'
import emailTemplate from '/img/email-template-2.png'

// ─── Swiper CSS ───────────────────────────────────────────────────────────────
const SWIPER_STYLES = `
  .svc-progress-bar { height: 2px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; }
  .svc-progress-fill { height: 100%; border-radius: 999px; transition: width 0.1s linear; background: linear-gradient(to right,#06b6d4,#8b5cf6,#d946ef); }
  .svc-dot { width:6px; height:6px; border-radius:999px; background:rgba(255,255,255,0.2); transition:all 0.3s ease; cursor:pointer; flex-shrink: 0; }
  .svc-dot.active { width:28px; background:linear-gradient(to right,#8b5cf6,#d946ef); }
  .svc-dots-row { display:flex; align-items:center; gap:6px; overflow-x:auto; max-width:100%; padding:4px 8px; scrollbar-width:none; }
  .svc-dots-row::-webkit-scrollbar { display:none; }
`

// ─── Services Data ────────────────────────────────────────────────────────────
const services = [
  {
    id: 'dynamic-web', type: 'dev',
    title: 'Dynamic Web Application', subtitle: 'Full-stack · Real-time · Scalable',
    icon: '⚡', tag: 'Most Popular',
    tagStyle: 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300',
    gradient: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/25', bg: 'bg-cyan-500/5',
    textAccent: 'text-cyan-300', glowColor: 'rgba(6,182,212,0.35)',
    stack: ['React.js', 'Node.js', 'MongoDB', 'REST API'],
    points: [
      { label: 'Starter (SPA)', price: '80–150 KD' },
      { label: 'Auth + DB', price: '150–300 KD' },
      { label: 'Enterprise', price: '300–600+ KD' },
    ],
    description: 'Real-time, database-driven apps with authentication, REST APIs, and modern React frontends.',
    visual: 'code',
    codeLines: [
      { text: 'const app = express()', color: 'text-cyan-300' },
      { text: 'app.use(authMiddleware)', color: 'text-white/40' },
      { text: "app.get('/api/data',", color: 'text-violet-300' },
      { text: '  const data = await DB.find()', color: 'text-white/40' },
      { text: '  res.json({ data, ok: true })', color: 'text-emerald-300' },
    ],
  },
  {
    id: 'static-web', type: 'dev',
    title: 'Static Web Application', subtitle: 'Fast · SEO-optimised · Blazing',
    icon: '🚀', tag: 'Best for SEO',
    tagStyle: 'bg-violet-500/20 border-violet-400/50 text-violet-300',
    gradient: 'from-violet-500 to-indigo-600',
    border: 'border-violet-500/25', bg: 'bg-violet-500/5',
    textAccent: 'text-violet-300', glowColor: 'rgba(139,92,246,0.35)',
    stack: ['Next.js', 'Vite', 'TailwindCSS', 'Vercel'],
    points: [
      { label: 'Landing Page', price: '30–60 KD' },
      { label: 'Multi-page', price: '60–120 KD' },
      { label: 'Full Website', price: '120–250 KD' },
    ],
    description: 'Lightning-fast static sites with Next.js SSG/SSR, perfect for portfolios and landing pages.',
    visual: 'metrics',
  },
  {
    id: 'frontend-app', type: 'dev',
    title: 'Frontend Application', subtitle: 'Pixel-perfect · Animated · Responsive',
    icon: '🎨', tag: null,
    gradient: 'from-fuchsia-500 to-pink-600',
    border: 'border-fuchsia-500/25', bg: 'bg-fuchsia-500/5',
    textAccent: 'text-fuchsia-300', glowColor: 'rgba(217,70,239,0.35)',
    stack: ['React.js', 'Redux', 'Framer Motion', 'MUI'],
    points: [
      { label: 'Component Library', price: '40–80 KD' },
      { label: 'Dashboard UI', price: '80–160 KD' },
      { label: 'Full App', price: '150–300 KD' },
    ],
    description: 'Polished, responsive, animated UIs with Redux state management and buttery-smooth interactions.',
    visual: 'components',
  },
  {
    id: 'backend-integration', type: 'dev',
    title: 'Backend Integration', subtitle: 'APIs · Database · Cloud-ready',
    icon: '🔧', tag: null,
    gradient: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/25', bg: 'bg-emerald-500/5',
    textAccent: 'text-emerald-300', glowColor: 'rgba(16,185,129,0.35)',
    stack: ['Node.js', 'Express', 'MongoDB', 'AWS'],
    points: [
      { label: 'REST API Build', price: '50–100 KD' },
      { label: 'DB + Auth', price: '100–200 KD' },
      { label: 'Cloud + CI/CD', price: '150–300 KD' },
    ],
    description: 'Robust Node.js/Express APIs with MongoDB or MySQL, JWT auth, and AWS cloud deployment.',
    visual: 'server',
  },
  {
    id: 'payment-gateway', type: 'dev',
    title: 'Payment Gateway', subtitle: 'Secure · Seamless · Reliable',
    icon: '💳', tag: 'High Demand',
    tagStyle: 'bg-amber-500/20 border-amber-400/50 text-amber-300',
    gradient: 'from-amber-500 to-orange-500',
    border: 'border-amber-500/25', bg: 'bg-amber-500/5',
    textAccent: 'text-amber-300', glowColor: 'rgba(245,158,11,0.35)',
    stack: ['Stripe', 'PayPal', 'Node.js', 'Webhooks'],
    points: [
      { label: 'Stripe / PayPal', price: '40–80 KD' },
      { label: 'Subscriptions', price: '80–150 KD' },
      { label: 'Full E-commerce', price: '150–280 KD' },
    ],
    description: 'End-to-end payment flows with Stripe, PayPal, webhooks, refunds, and subscription billing.',
    visual: 'payment',
  },
  {
    id: 'ui-design', type: 'design',
    title: 'UI / UX Design', subtitle: 'Figma · Pixel-perfect · Interactive',
    icon: '✦', tag: null,
    gradient: 'from-rose-500 to-red-500',
    border: 'border-rose-500/25', bg: 'bg-rose-500/5',
    textAccent: 'text-rose-300', glowColor: 'rgba(244,63,94,0.35)',
    stack: ['Figma', 'TailwindCSS', 'Framer Motion', 'MUI'],
    points: [
      { label: 'Wireframe + Prototype', price: '30–60 KD' },
      { label: 'Full UI Kit', price: '60–120 KD' },
      { label: 'Dev Handoff', price: '120–250 KD' },
    ],
    description: 'Beautiful Figma designs translated into production-ready, responsive code with smooth animations.',
    visual: 'ui',
  },
  {
    id: 'web-design', type: 'design',
    title: 'Web Design Templates', subtitle: 'Modern · Responsive · Branded',
    icon: '🌐', tag: null,
    gradient: 'from-sky-500 to-blue-500',
    border: 'border-sky-500/25', bg: 'bg-sky-500/5',
    textAccent: 'text-sky-300', glowColor: 'rgba(14,165,233,0.35)',
    img: webTemplate, stack: ['HTML/CSS', 'TailwindCSS', 'React', 'Vite'],
    points: [
      { label: 'Basic Template', price: '20–40 KD' },
      { label: 'Custom Site', price: '50–120+ KD' },
    ],
    description: 'Clean, conversion-focused website templates built for speed, responsiveness, and brand identity.',
    visual: 'image',
  },
  {
    id: 'social-media', type: 'design',
    title: 'Social Media Posts', subtitle: 'Engaging · Branded · Consistent',
    icon: '📱', tag: 'Best Value',
    tagStyle: 'bg-pink-500/20 border-pink-400/50 text-pink-300',
    gradient: 'from-pink-500 to-rose-500',
    border: 'border-pink-500/25', bg: 'bg-pink-500/5',
    textAccent: 'text-pink-300', glowColor: 'rgba(236,72,153,0.35)',
    img: socialMedia, stack: [],
    points: [
      { label: 'Single Post', price: '3–5 KD' },
      { label: 'Bundle × 10', price: '20–40 KD' },
      { label: 'Monthly Pack', price: '50–100 KD' },
    ],
    description: 'Eye-catching social media graphics for Instagram, LinkedIn — branded and consistent.',
    visual: 'image',
  },
  {
    id: 'logo-design', type: 'design',
    title: 'Logo & Brand Identity', subtitle: 'Memorable · Versatile · Bold',
    icon: '✨', tag: 'Premium',
    tagStyle: 'bg-indigo-500/20 border-indigo-400/50 text-indigo-300',
    gradient: 'from-indigo-500 to-purple-500',
    border: 'border-indigo-500/25', bg: 'bg-indigo-500/5',
    textAccent: 'text-indigo-300', glowColor: 'rgba(99,102,241,0.35)',
    img: logoTemplate, stack: [],
    points: [
      { label: 'Basic Logo', price: '10–15 KD' },
      { label: 'Logo + Brand', price: '30–60 KD' },
    ],
    description: 'Distinctive logos and full brand identity systems that make your business instantly recognisable.',
    visual: 'image',
  },
  {
    id: 'business-template', type: 'design',
    title: 'Business Templates', subtitle: 'Print & Digital · Professional',
    icon: '📄', tag: null,
    gradient: 'from-orange-500 to-yellow-500',
    border: 'border-orange-500/25', bg: 'bg-orange-500/5',
    textAccent: 'text-orange-300', glowColor: 'rgba(249,115,22,0.35)',
    img: businessTemplate, stack: [],
    points: [
      { label: 'Simple Poster', price: '5–8 KD' },
      { label: 'Multi Brochures', price: '10–30 KD' },
    ],
    description: 'Professional print-ready and digital business materials — posters, brochures, and flyers.',
    visual: 'image',
  },
  {
    id: 'email-template', type: 'design',
    title: 'Email Template Design', subtitle: 'Responsive · Branded · Deliverable',
    icon: '📧', tag: null,
    gradient: 'from-teal-500 to-cyan-600',
    border: 'border-teal-500/25', bg: 'bg-teal-500/5',
    textAccent: 'text-teal-300', glowColor: 'rgba(20,184,166,0.35)',
    img: emailTemplate, stack: [],
    points: [
      { label: 'Simple Layout', price: '10–15 KD' },
      { label: 'Advanced + Branding', price: '30–50 KD' },
    ],
    description: 'Mobile-first HTML email templates that render perfectly across all clients and devices.',
    visual: 'image',
  },
  {
    id: 'resume', type: 'design',
    title: 'Resume / Portfolio', subtitle: 'Stand Out · Get Hired · Impress',
    icon: '🏆', tag: null,
    gradient: 'from-lime-500 to-green-500',
    border: 'border-lime-500/25', bg: 'bg-lime-500/5',
    textAccent: 'text-lime-300', glowColor: 'rgba(132,204,22,0.35)',
    img: portfolioTemplate, stack: [],
    points: [
      { label: 'Basic Layout', price: '3–5 KD' },
      { label: 'Custom + Branding', price: '10–20 KD' },
    ],
    description: 'Professionally designed resumes and portfolio pages that make a lasting first impression.',
    visual: 'image',
  },
]

// ─── Card Visuals ─────────────────────────────────────────────────────────────
function CodeVisual({ service }) {
  return (
    <div className="w-full h-full bg-[#06060e] flex flex-col p-4 font-mono overflow-hidden">
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[10px] text-white/20">server.js</span>
      </div>
      <div className="space-y-1.5 flex-1">
        {service.codeLines.map((line, i) => (
          <div key={i} className="flex gap-2.5">
            <span className="text-white/15 text-[10px] w-3 text-right flex-shrink-0 select-none">{i + 1}</span>
            <span className={`text-[10px] leading-relaxed ${line.color}`}>{line.text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 pt-2 border-t border-white/5 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] text-green-300/40">Running on :3000</span>
      </div>
    </div>
  )
}

function MetricsVisual({ service }) {
  const bars = [85, 70, 96, 60, 80, 90, 65]
  return (
    <div className={`w-full h-full ${service.bg} flex flex-col items-center justify-center p-5 gap-3`}>
      <div className="flex items-end gap-2 h-16 w-full justify-center">
        {bars.map((h, i) => (
          <motion.div key={i}
            className={`w-4 rounded-t-lg bg-gradient-to-t ${service.gradient} opacity-80`}
            style={{ height: `${h}%`, originY: 1 }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: 'easeOut' }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        {[{ v: '99%', l: 'Uptime' }, { v: '<1s', l: 'Load' }, { v: '100', l: 'Score' }].map(({ v, l }) => (
          <div key={l} className="text-center rounded-xl bg-white/5 border border-white/8 py-1.5">
            <p className={`text-sm font-black bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>{v}</p>
            <p className="text-[9px] text-white/30 mt-0.5">{l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComponentsVisual({ service }) {
  return (
    <div className={`w-full h-full ${service.bg} p-4 flex flex-col gap-2`}>
      <div className="flex gap-2">
        <div className={`h-8 flex-1 rounded-xl bg-gradient-to-r ${service.gradient} opacity-70 flex items-center justify-center`}>
          <span className="text-[9px] text-white font-bold">Primary Button</span>
        </div>
        <div className="h-8 w-20 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center">
          <span className="text-[9px] text-white/40">Secondary</span>
        </div>
      </div>
      <div className="flex gap-2 flex-1">
        {['A', 'B', 'C'].map(n => (
          <div key={n} className="flex-1 rounded-xl bg-white/4 border border-white/8 p-2 flex flex-col gap-1">
            <div className="w-8 h-1.5 rounded bg-white/20" />
            <div className="w-full h-1 rounded bg-white/8" />
            <div className="w-3/4 h-1 rounded bg-white/8" />
            <div className={`mt-auto h-4 rounded-lg bg-gradient-to-r ${service.gradient} opacity-50`} />
          </div>
        ))}
      </div>
      <div className="h-6 rounded-xl bg-white/4 border border-white/8 flex items-center px-3 gap-2">
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
        <div className="flex-1 h-1 rounded bg-white/15" />
      </div>
    </div>
  )
}

function ServerVisual({ service }) {
  return (
    <div className={`w-full h-full ${service.bg} flex flex-col items-center justify-center p-4 gap-2`}>
      {['API Gateway', 'Auth Middleware', 'Controller', 'Database'].map((layer, i) => (
        <motion.div key={layer}
          initial={{ opacity: 0, scaleX: 0.7 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`w-full h-9 rounded-xl border ${service.border} bg-white/3 flex items-center px-4 gap-2.5`}
        >
          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`} />
          <span className="text-[10px] text-white/50">{layer}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 block ml-auto animate-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
        </motion.div>
      ))}
    </div>
  )
}

function PaymentVisual({ service }) {
  return (
    <div className={`w-full h-full ${service.bg} flex flex-col items-center justify-center p-4 gap-3`}>
      <div className={`w-44 h-24 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 shadow-2xl relative overflow-hidden flex-shrink-0`}>
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="w-8 h-5 rounded bg-yellow-300/80 mb-2" />
        <div className="flex gap-1.5">
          {[...Array(4)].map((_, i) => <span key={i} className="text-[9px] text-white/60 tracking-widest">••••</span>)}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {['Stripe', 'PayPal', 'Apple Pay'].map((p, i) => (
          <div key={p} className="flex items-center gap-1">
            {i > 0 && <div className="w-px h-3 bg-white/15" />}
            <span className="text-[10px] text-white/35 font-mono">{p}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/25 rounded-full px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] text-green-300 font-semibold">Secure Payment Flow</span>
      </div>
    </div>
  )
}

function UIDesignVisual({ service }) {
  return (
    <div className={`w-full h-full ${service.bg} p-4 flex flex-col gap-2`}>
      <div className="flex items-center gap-2 pb-2 border-b border-white/5">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[9px] text-white/20 font-mono ml-1">design.fig</span>
        <span className={`ml-auto text-[9px] font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>Prototype</span>
      </div>
      <div className={`w-full h-5 rounded-lg bg-gradient-to-r ${service.gradient} opacity-45`} />
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {['A', 'B', 'C'].map(c => (
          <div key={c} className={`rounded-xl ${service.bg} border ${service.border} p-2 flex flex-col items-center justify-center gap-1`}>
            <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${service.gradient} opacity-60`} />
            <div className="w-full h-1 rounded bg-white/10" />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        <div className="flex-1 h-5 rounded-lg bg-white/5 border border-white/8" />
        <div className={`w-10 h-5 rounded-lg bg-gradient-to-r ${service.gradient} opacity-60`} />
      </div>
    </div>
  )
}

// ─── Single Card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, isActive }) {
  const renderVisual = () => {
    if (service.visual === 'image' && service.img)
      return <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    if (service.visual === 'code')       return <CodeVisual service={service} />
    if (service.visual === 'metrics')    return <MetricsVisual service={service} />
    if (service.visual === 'components') return <ComponentsVisual service={service} />
    if (service.visual === 'server')     return <ServerVisual service={service} />
    if (service.visual === 'payment')    return <PaymentVisual service={service} />
    if (service.visual === 'ui')         return <UIDesignVisual service={service} />
    return <div className={`w-full h-full ${service.bg} flex items-center justify-center`}><span className="text-6xl opacity-15">{service.icon}</span></div>
  }

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden bg-[#0d0d18] border flex flex-col h-full transition-all duration-500 ${service.border}`}
      style={{
        boxShadow: isActive
          ? `0 32px 72px -12px ${service.glowColor}, 0 0 0 1px ${service.glowColor}, 0 8px 32px rgba(0,0,0,0.6)`
          : '0 6px 28px rgba(0,0,0,0.4)',
      }}
    >
      {/* Top accent line — always visible on active */}
      <div
        className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent z-20 ${service.textAccent}`}
        style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.4s' }}
      />

      {/* Visual */}
      <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
        {renderVisual()}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-[#0d0d18]/10 to-transparent" />

        {/* Icon badge */}
        <div className={`absolute top-3 left-3 sm:top-3.5 sm:left-3.5 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-base sm:text-lg shadow-xl z-10 group-hover:scale-110 transition-transform duration-300`}>
          {service.icon}
        </div>

        {/* Tag */}
        {service.tag && (
          <span className={`absolute top-3 right-3 sm:top-3.5 sm:right-3.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-xl border z-10 backdrop-blur-sm ${service.tagStyle}`}>
            {service.tag}
          </span>
        )}

        {/* Type label */}
        <div className="absolute bottom-3 left-3 sm:bottom-3.5 sm:left-3.5 z-10 flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg backdrop-blur-sm bg-black/30 border border-white/10">
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/50">
            {service.type === 'dev' ? '⚙ Dev' : '🎨 Design'}
          </span>
        </div>

        {service.type === 'dev' && (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-3 right-3 w-9 h-9 opacity-20 z-10">
            <div className={`w-full h-full rounded-full border border-dashed ${service.border}`} />
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
          </motion.div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">
        <div>
          <h3 className="font-['Playfair_Display'] text-base sm:text-lg font-bold text-white leading-tight">{service.title}</h3>
          <p className={`text-[11px] font-semibold font-mono mt-0.5 ${service.textAccent}`}>{service.subtitle}</p>
        </div>

        <p className="text-xs text-white/45 leading-relaxed line-clamp-2">{service.description}</p>

        {service.stack?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {service.stack.map(t => (
              <span key={t} className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-white/4 border border-white/8 ${service.textAccent}`}>{t}</span>
            ))}
          </div>
        )}

        <div className={`h-px bg-gradient-to-r ${service.gradient} opacity-20`} />

        <div className="space-y-2 flex-1">
          {service.points.map(({ label, price }) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`} />
                <span className="text-xs text-white/50 truncate">{label}</span>
              </div>
              <span className={`text-xs font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent whitespace-nowrap flex-shrink-0`}>{price}</span>
            </div>
          ))}
        </div>

        <a href="#contact" className={`mt-1 block w-full rounded-2xl bg-gradient-to-r ${service.gradient} p-px group/btn`}>
          <div className="rounded-[14px] bg-[#0d0d18] px-4 py-2.5 text-center transition-all duration-300 group-hover/btn:bg-transparent flex items-center justify-center gap-2">
            <span className={`text-xs font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover/btn:text-white transition-colors`}>Get Started</span>
            <svg className={`w-3 h-3 ${service.textAccent} group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  )
}

// ─── AI Background ────────────────────────────────────────────────────────────
function AIBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.055]">
        <defs>
          <linearGradient id="svcBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          [8,12,22,4],[22,4,42,18],[42,18,63,6],[63,6,78,16],[78,16,93,9],
          [8,12,14,42],[42,18,36,52],[63,6,58,40],[78,16,76,55],
          [14,42,36,52],[36,52,58,40],[58,40,76,55],
        ].map(([x1,y1,x2,y2],i) => (
          <motion.line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
            stroke="url(#svcBgGrad)" strokeWidth="1"
            animate={{ opacity: [0, 0.7, 0.1, 0.6, 0] }}
            transition={{ duration: 3.5, delay: i * 0.18, repeat: Infinity, repeatDelay: 4 }}
          />
        ))}
      </svg>
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-violet-400/20"
          style={{ left: `${(i * 7.1) % 100}%`, top: `${(i * 6.4) % 100}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 4 + (i % 3), delay: i * 0.28, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

// ─── Custom Carousel hook ─────────────────────────────────────────────────────
function useCarousel({ total, autoplayDelay = 2800 }) {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const progressRef = useRef(null)
  const startTimeRef = useRef(null)
  const elapsedRef = useRef(0)

  const goTo = (idx) => {
    setCurrent(((idx % total) + total) % total)
    elapsedRef.current = 0
    setProgress(0)
  }
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  useEffect(() => {
    if (paused) { clearInterval(progressRef.current); return }
    elapsedRef.current = 0
    startTimeRef.current = Date.now()
    clearInterval(progressRef.current)
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current + elapsedRef.current
      const pct = Math.min((elapsed / autoplayDelay) * 100, 100)
      setProgress(pct)
      if (pct >= 100) {
        setCurrent(c => (c + 1) % total)
        elapsedRef.current = 0
        startTimeRef.current = Date.now()
      }
    }, 50)
    return () => clearInterval(progressRef.current)
  }, [current, paused, total, autoplayDelay])

  return { current, progress, paused, setPaused, goTo, next, prev }
}

// ─── Stats Row ────────────────────────────────────────────────────────────────
function StatsRow({ inView }) {
  const stats = [
    { value: '12', label: 'Services', icon: '🛠️', g: 'from-cyan-500 to-blue-500' },
    { value: '50+', label: 'Projects', icon: '🚀', g: 'from-violet-500 to-purple-500' },
    { value: '30+', label: 'Clients', icon: '🤝', g: 'from-fuchsia-500 to-pink-500' },
    { value: '3+', label: 'Years', icon: '⭐', g: 'from-amber-500 to-orange-500' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14"
    >
      {stats.map(({ value, label, icon, g }, i) => (
        <motion.div key={label}
          initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.1 * i }}
          className="rounded-2xl bg-white/3 border border-white/8 p-3 sm:p-4 text-center hover:bg-white/5 transition-colors group"
        >
          <span className="text-lg sm:text-xl group-hover:scale-110 inline-block transition-transform">{icon}</span>
          <p className={`text-xl sm:text-2xl font-black bg-gradient-to-r ${g} bg-clip-text text-transparent font-['Playfair_Display'] mt-1`}>{value}</p>
          <p className="text-[9px] sm:text-[10px] text-white/35 font-semibold uppercase tracking-wider mt-0.5">{label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  // Responsive: how many FULL cards to show
  const [visibleCount, setVisibleCount] = useState(3)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const mobile = w < 640
      setIsMobile(mobile)
      setVisibleCount(mobile ? 1 : w < 1024 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { current, progress, paused, setPaused, goTo, next, prev } = useCarousel({
    total: services.length,
    autoplayDelay: 2800,
  })

  // ── Card sizing
  // Mobile: center card = 76% width, side cards peek ~12% each
  // Tablet: 3 cards visible (center + 2 full)
  // Desktop: 3 cards visible
  const CARD_GAP = 16 // px gap between cards

  return (
    <section id="services" className="relative py-20 sm:py-28 bg-[#0a0a0f] overflow-hidden" ref={sectionRef}>
      <style>{SWIPER_STYLES}</style>
      <AIBackground />

      <div className="absolute top-1/4 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-violet-700/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-700/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-fuchsia-700/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-400 mb-4 font-mono">&lt; what i offer /&gt;</p>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Services &{' '}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text">Solutions</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto text-sm leading-relaxed px-2">
            From full-stack web applications to stunning visual design — everything your digital presence needs, under one roof.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5">
            <div className="flex items-center gap-1.5 bg-white/4 border border-white/8 rounded-full px-3 sm:px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/50 font-mono">Auto-sliding</span>
            </div>
            <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-full px-3 sm:px-4 py-1.5">
              <span className={`text-xs font-bold bg-gradient-to-r ${services[current].gradient} bg-clip-text text-transparent font-mono`}>
                {String(current + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </motion.div>

        <StatsRow inView={inView} />

        {/* ── CAROUSEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* 
            CAROUSEL TRACK
            - overflow-hidden clips the cards
            - We render center-1, center, center+1 (and extra partials)
            - On mobile: cards are 76% wide so you see ~12% peeking on each side
            - Center card gets scale(1.05) + translateY(-10px) + full opacity + big glow
            - Side cards get scale(0.82) + translateY(18px) + dim opacity
          */}
          <div className="overflow-hidden py-10">
            {/* Inner flex container — always centered */}
            <div className="flex items-center justify-center" style={{ gap: `${CARD_GAP}px` }}>
              {[-2, -1, 0, 1, 2].map((offset) => {
                const idx = ((current + offset) % services.length + services.length) % services.length
                const isCenter = offset === 0
                const isNear = Math.abs(offset) === 1
                const isFar = Math.abs(offset) === 2

                // Scale, Y offset, opacity per position
                const scale = isCenter ? 1.06 : isNear ? 0.88 : 0.76
                const translateY = isCenter ? -10 : isNear ? 10 : 22
                const opacity = isCenter ? 1 : isNear ? 0.55 : 0.2
                const zIndex = isCenter ? 30 : isNear ? 20 : 10
                const pointerEvents = isCenter || isNear ? 'auto' : 'none'

                // Card width
                let cardWidth
                if (isMobile) {
                  // Mobile: center=76%, side=74% (peek visible from clip)
                  cardWidth = isCenter ? '76vw' : '74vw'
                } else if (visibleCount === 2) {
                  cardWidth = isCenter ? 'calc(46% - 8px)' : 'calc(44% - 8px)'
                } else {
                  // Desktop 3-up
                  cardWidth = isCenter ? 'calc(33% - 8px)' : 'calc(31% - 8px)'
                }

                // On mobile, hide far cards entirely (they're clipped but shouldn't shift layout)
                if (isMobile && isFar) return null

                return (
                  <motion.div
                    key={`${current}-${offset}`}
                    style={{
                      width: cardWidth,
                      flexShrink: 0,
                      zIndex,
                      pointerEvents,
                    }}
                    animate={{
                      scale,
                      y: translateY,
                      opacity,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onClick={() => { if (!isCenter) goTo(current + offset) }}
                  >
                    <ServiceCard service={services[idx]} isActive={isCenter} />
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* LEFT nav arrow */}
          <button
            onClick={prev}
            className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0d0d18]/95 backdrop-blur border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/35 hover:bg-white/12 active:scale-95 transition-all group shadow-2xl"
            aria-label="Previous"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* RIGHT nav arrow */}
          <button
            onClick={next}
            className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0d0d18]/95 backdrop-blur border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/35 hover:bg-white/12 active:scale-95 transition-all group shadow-2xl"
            aria-label="Next"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* ── Controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-2 flex flex-col items-center gap-4 sm:gap-5"
        >
          <div className="svc-progress-bar w-48 sm:w-64">
            <div className="svc-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="svc-dots-row">
            {services.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`svc-dot ${i === current ? 'active' : ''}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 w-full px-2 sm:px-0">
            <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white/4 border border-white/10 max-w-full">
              <span className="text-base sm:text-lg flex-shrink-0">{services[current].icon}</span>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-white leading-tight truncate">{services[current].title}</p>
                <p className={`text-[10px] font-mono ${services[current].textAccent} truncate`}>{services[current].subtitle}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/4 border border-white/8">
                <span className="text-[10px]">💻</span>
                <span className="text-xs font-semibold text-white/50">{services.filter(s => s.type === 'dev').length} Dev</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/4 border border-white/8">
                <span className="text-[10px]">🎨</span>
                <span className="text-xs font-semibold text-white/50">{services.filter(s => s.type === 'design').length} Design</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          className="mt-14 sm:mt-20 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-violet-500/8 to-fuchsia-500/5 border border-violet-500/20 p-7 sm:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.022)_1px,transparent_1px),linear-gradient(to_right,rgba(139,92,246,0.022)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full bg-violet-500/5 blur-3xl" />
          </div>
          <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-3 font-mono">// custom quote</p>
          <h3 className="relative font-['Playfair_Display'] text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">Not Sure Which Service?</h3>
          <p className="relative text-white/40 text-sm max-w-md mx-auto mb-7 sm:mb-8 leading-relaxed px-2">
            Tell me about your project and I'll recommend the best solution with a custom quote — no obligation.
          </p>
          <a
            href="#contact"
            className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 px-7 sm:px-10 py-3.5 sm:py-4 text-sm font-bold text-white shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/50 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative">Let's Discuss Your Project</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}