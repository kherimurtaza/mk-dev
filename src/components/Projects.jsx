import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

// ─── Project Data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: 'Hamilton — SaaS eCommerce Builder',
    category: 'Full Stack',
    description:
      'A white-label eCommerce platform that lets any merchant launch a fully branded Shopify-style storefront in under 5 minutes. Pick a theme, connect your domain, and go live — no code required. Powered by a multi-tenant Django + Node.js backend with automated provisioning, AWS S3 media, and MySQL/MongoDB hybrid storage.',
    tags: ['TypeScript', 'Node.js', 'Python', 'Django', 'MySQL', 'MongoDB', 'AWS S3', 'Express'],
    color: 'sky',
    gradient: 'from-sky-400 to-indigo-500',
    softGlow: 'bg-sky-500/8',
    border: 'border-sky-500/20',
    textAccent: 'text-sky-300',
    accentRgb: '56,189,248',
    icon: '🏗️',
    features: ['Theme Marketplace', 'Auto Provisioning', 'Multi-tenant SaaS', 'Live in 5 Min'],
    year: '2024',
    status: 'Live',
    url: 'https://hamiltonkw.com',
    image: `${import.meta.env.BASE_URL}img/project-1.png`,
  },
  {
    id: 2,
    title: 'POS & Inventory Management',
    category: 'Full Stack',
    description:
      'A full-featured Point-of-Sale and inventory platform built from scratch. Handles sales transactions, real-time stock tracking, multi-location warehouses, supplier management, barcode scanning, receipt printing, and detailed analytics dashboards — all in one unified system.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express', 'AWS S3'],
    color: 'emerald',
    gradient: 'from-emerald-400 to-teal-500',
    softGlow: 'bg-emerald-500/8',
    border: 'border-emerald-500/20',
    textAccent: 'text-emerald-300',
    accentRgb: '52,211,153',
    icon: '🧾',
    features: ['Real-time Inventory', 'Barcode Scanner', 'Sales Analytics', 'Multi-location'],
    year: '2024',
    status: 'Live',
    url: 'https://webpos.hamilton-shop.online/pos',
    image: `${import.meta.env.BASE_URL}img/project-2.png`,
  },
  {
    id: 3,
    title: 'Masar24H — Transport Booking',
    category: 'Full Stack',
    description:
      'A sleek online platform for booking transportation services across Kuwait. Users can browse car and bus options, select trip type (one-way, round-trip, scheduled), choose their date and time slot, and receive instant confirmation — all through a modern, mobile-first interface.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express'],
    color: 'amber',
    gradient: 'from-amber-400 to-orange-500',
    softGlow: 'bg-amber-500/8',
    border: 'border-amber-500/20',
    textAccent: 'text-amber-300',
    accentRgb: '251,191,36',
    icon: '🚐',
    features: ['Live Booking', 'Fleet Selection', 'Schedule Picker', 'Instant Confirmation'],
    year: '2024',
    status: 'Live',
    url: 'https://www.masar24h.com/',
    image: `${import.meta.env.BASE_URL}img/project-3.png`,
  },
  {
    id: 4,
    title: 'Al-Sabah Lawyer Group',
    category: 'Full Stack',
    description:
      'A premium digital presence for one of Kuwait\'s leading legal firms. Features a full service showcase, attorney profiles, news & article publishing, client appointment booking, and a secure admin panel — all built with TypeScript for robustness and long-term maintainability.',
    tags: ['TypeScript', 'React.js', 'Node.js', 'MongoDB', 'Express'],
    color: 'violet',
    gradient: 'from-violet-400 to-purple-600',
    softGlow: 'bg-violet-500/8',
    border: 'border-violet-500/20',
    textAccent: 'text-violet-300',
    accentRgb: '167,139,250',
    icon: '⚖️',
    features: ['Service Showcase', 'Appointment Booking', 'News & Articles', 'Admin CMS'],
    year: '2024',
    status: 'Live',
    url: 'https://www.alsabahlg-kw.com/',
    image: `${import.meta.env.BASE_URL}img/project-4.png`,
  },
  {
    id: 5,
    title: 'Al-Dar Media — Agency Site',
    category: 'Frontend',
    description:
      'A striking corporate website for Al-Dar, a Kuwait-based media production company. Showcases the agency\'s full service portfolio, case-study projects, team culture, and a rich media gallery — crafted in TypeScript with silky animations and a premium editorial feel.',
    tags: ['TypeScript', 'React.js', 'Node.js', 'MongoDB', 'Express'],
    color: 'rose',
    gradient: 'from-rose-400 to-pink-600',
    softGlow: 'bg-rose-500/8',
    border: 'border-rose-500/20',
    textAccent: 'text-rose-300',
    accentRgb: '251,113,133',
    icon: '🎬',
    features: ['Portfolio Showcase', 'Media Gallery', 'Service Pages', 'Editorial Design'],
    year: '2024',
    status: 'Live',
    url: 'https://www.aldar-media.com/',
    image: `${import.meta.env.BASE_URL}img/project-5.png`,
  },
]

const categories = ['All', 'Full Stack', 'Frontend']

// ─── Animated grid lines background ─────────────────────────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(139,92,246,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
      {/* Corner radial glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-fuchsia-600/4 rounded-full blur-[80px]" />
    </div>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Live: { dot: 'bg-green-400', text: 'text-green-300', bg: 'bg-green-500/10 border-green-500/25' },
    Beta: { dot: 'bg-amber-400', text: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/25' },
  }
  const s = map[status] || map.Live
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wide uppercase ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
      {status}
    </span>
  )
}

// ─── Number Counter decoration ────────────────────────────────────────────────
function IndexNumber({ n }) {
  return (
    <span className="font-mono text-[10px] font-bold text-white/15 tracking-[0.15em]">
      {String(n).padStart(2, '0')}
    </span>
  )
}

// ─── Project Image with overlay fallback ─────────────────────────────────────
function ProjectImage({ project }) {
  const [imgErr, setImgErr] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0c0c14]">
      {!imgErr && (
        <img
          src={project.image}
          alt={project.title}
          onError={() => setImgErr(true)}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {(imgErr || !loaded) && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${project.gradient}`} style={{ opacity: 0.15 }}>
          <span className="text-7xl mb-2">{project.icon}</span>
        </div>
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-[#0c0c14]/30 to-transparent pointer-events-none" />
    </div>
  )
}

// ─── FEATURED Hero Card ───────────────────────────────────────────────────────
function FeaturedCard({ project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-[2rem] border ${project.border} bg-[#0c0c14] overflow-hidden hover:shadow-2xl hover:shadow-black/70 transition-all duration-500`}
      style={{ boxShadow: `0 0 0 0px rgba(${project.accentRgb},0)` }}
    >
      <div className="grid lg:grid-cols-[1fr_420px] min-h-[420px]">
        {/* LEFT: Content */}
        <div className="relative z-10 p-10 flex flex-col justify-between">
          {/* Header meta */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <IndexNumber n={1} />
              <div className={`h-px flex-1 bg-gradient-to-r ${project.gradient} opacity-30`} />
              <StatusBadge status={project.status} />
              <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">{project.year}</span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                {project.icon}
              </div>
              <div>
                <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${project.textAccent} font-mono mb-0.5`}>{project.category} · Featured</p>
                <h3 className="text-2xl font-black text-white leading-tight tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {project.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-white/50 leading-relaxed max-w-lg mb-6">{project.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-md bg-gradient-to-br ${project.gradient} flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-white/55 font-medium">{f}</span>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg border border-white/8 bg-white/3 ${project.textAccent}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/6">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={`group/btn relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${project.gradient} px-6 py-3 text-sm font-black text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all`}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Live Site
            </a>
            <span className={`text-xs font-mono ${project.textAccent} opacity-70`}>{project.url.replace('https://', '')}</span>
          </div>
        </div>

        {/* RIGHT: Screenshot */}
        <div className="relative hidden lg:block">
          <ProjectImage project={project} />
          {/* Left fade into content */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0c0c14] to-transparent z-10" />
          {/* Decorative accent line at top of image */}
          <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${project.textAccent.replace('text-', 'via-')} to-transparent`} />
        </div>
      </div>
    </motion.article>
  )
}

// ─── Regular Project Card ─────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col rounded-[1.75rem] border ${project.border} bg-[#0c0c14] overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/70 transition-all duration-500 cursor-default`}
    >
      {/* Accent top line on hover */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${project.textAccent.replace('text-', 'via-')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20`} />

      {/* Screenshot */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <ProjectImage project={project} />
        {/* Floating category chip */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full ${project.softGlow} border ${project.border} ${project.textAccent} font-mono backdrop-blur-sm`}>
            {project.category}
          </span>
        </div>
        {/* Top-right: status + year */}
        <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5">
          <StatusBadge status={project.status} />
          <span className="text-[9px] font-mono text-white/30">{project.year}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Title row */}
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            {project.icon}
          </div>
          <h3 className="font-black text-white leading-snug text-base mt-0.5 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs text-white/45 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Features mini-list */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {project.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <span className={`w-1 h-1 rounded-full flex-shrink-0 bg-gradient-to-r ${project.gradient}`} />
              <span className="text-[10px] text-white/40 font-medium truncate">{f}</span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-md bg-white/3 border border-white/6 ${project.textAccent}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-3 border-t border-white/5">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className={`group/btn w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${project.gradient} p-px overflow-hidden`}
          >
            <div className="w-full rounded-[15px] bg-[#0c0c14] px-4 py-2.5 flex items-center justify-center gap-2 transition-all group-hover/btn:bg-transparent">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className={`text-xs font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent group-hover/btn:text-white transition-colors`}>
                View Live Site
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom index number */}
      <div className="absolute bottom-4 right-5 opacity-10 group-hover:opacity-25 transition-opacity">
        <IndexNumber n={index + 2} />
      </div>
    </motion.article>
  )
}

// ─── Main Projects Section ────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)

  const [featured, ...rest] = filtered

  return (
    <>
      {/* Inject Sora font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');`}</style>

      <section
        id="projects"
        className="relative py-32 bg-[#0c0c14] overflow-hidden"
        ref={sectionRef}
      >
        <GridBackground />

        <div className="relative mx-auto max-w-6xl px-6">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            {/* Top label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-400 font-mono">Portfolio</span>
              </div>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-violet-400/50 to-transparent" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h2
                  className="text-5xl sm:text-6xl font-black text-white leading-[0.95] tracking-tight"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Work I've
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text">
                    Shipped.
                  </span>
                </h2>
                <p className="mt-4 text-white/40 max-w-md text-sm leading-relaxed">
                  Real-world products — SaaS platforms, POS systems, booking apps, and
                  corporate websites — delivered end-to-end across Kuwait and beyond.
                </p>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-2 self-start sm:self-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`relative px-4 py-2 rounded-full text-xs font-black transition-all duration-300 tracking-wide ${
                      activeFilter === cat
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30'
                        : 'bg-white/5 border border-white/8 text-white/45 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/30 via-white/5 to-transparent" />
              <span className="text-[10px] font-mono text-white/20 tabular-nums">
                {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>

          {/* ── Featured Card ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`featured-${activeFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-8"
            >
              {featured && <FeaturedCard project={featured} />}
            </motion.div>
          </AnimatePresence>

          {/* ── Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`grid-${activeFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom CTA Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-16 relative rounded-[2rem] border border-violet-500/15 bg-gradient-to-br from-violet-500/6 via-[#0c0c14] to-cyan-500/6 p-10 text-center overflow-hidden"
          >
            {/* Decorative mesh */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-violet-600/5 blur-3xl" />
            </div>

            <div className="relative">
              <p className="text-[9px] font-black uppercase tracking-[0.45em] text-violet-400 font-mono mb-3">
                // Open for new projects
              </p>
              <h3
                className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Got an Idea?<br />
                <span className="text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text">Let's Build It.</span>
              </h3>
              <p className="text-white/40 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                From startup MVPs to enterprise platforms — I deliver full-stack solutions 
                that go live and scale.
              </p>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-violet-500/25 hover:shadow-violet-500/50 hover:scale-105 transition-all"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="relative">Start a Project</span>
                <svg className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}