import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

// ─── Project Data ────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: 'E-Commerce Web Application',
    category: 'Full Stack',
    description:
      'A fully-featured online store with product listings, cart management, secure Stripe payments, user authentication, order tracking, and an admin dashboard for inventory management.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Redux', 'Stripe API', 'TailwindCSS'],
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    softGlow: 'bg-cyan-500/10',
    border: 'border-cyan-500/25',
    textAccent: 'text-cyan-300',
    icon: '🛒',
    features: ['Auth & JWT', 'Payment Gateway', 'Admin Panel', 'REST API'],
    year: '2024',
    status: 'Live',
  },
  {
    id: 2,
    title: 'Blog Application',
    category: 'Full Stack',
    description:
      'A dynamic blogging platform with rich-text editing (Quill.js), category tagging, comment threads, author profiles, SEO-optimised slugs, and a content management dashboard.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Quill.js', 'AWS S3', 'TailwindCSS'],
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    softGlow: 'bg-violet-500/10',
    border: 'border-violet-500/25',
    textAccent: 'text-violet-300',
    icon: '✍️',
    features: ['Rich Text Editor', 'SEO Slugs', 'Comment System', 'AWS S3 Media'],
    year: '2024',
    status: 'Live',
  },
  {
    id: 3,
    title: 'Todo List App',
    category: 'Frontend',
    description:
      'A productivity-focused task manager with drag-and-drop reordering, priority levels, due-date reminders, label filtering, and real-time sync powered by a Node.js backend.',
    tags: ['React.js', 'Vite', 'Node.js', 'MongoDB', 'Framer Motion', 'MUI'],
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    softGlow: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    textAccent: 'text-emerald-300',
    icon: '✅',
    features: ['Drag & Drop', 'Priority Levels', 'Due Dates', 'Real-time Sync'],
    year: '2023',
    status: 'Live',
  },
  {
    id: 4,
    title: 'News Application',
    category: 'Full Stack',
    description:
      'A live news aggregator that pulls articles via multiple news APIs, supports category-based filtering, bookmarking, full-text search, and a personalised feed based on reading history.',
    tags: ['React.js', 'Node.js', 'NewsAPI', 'MongoDB', 'Redux', 'TailwindCSS'],
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    softGlow: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    textAccent: 'text-amber-300',
    icon: '📰',
    features: ['Live API Feed', 'Bookmarks', 'Full-text Search', 'Personalised Feed'],
    year: '2023',
    status: 'Live',
  },
  {
    id: 5,
    title: 'Stream Application',
    category: 'Full Stack',
    description:
      'A real-time video streaming platform featuring live-stream rooms, WebRTC peer connections, chat overlays, viewer counters, stream recording, and OBS integration support.',
    tags: ['React.js', 'Node.js', 'WebRTC', 'Socket.io', 'MongoDB', 'AWS'],
    color: 'rose',
    gradient: 'from-rose-500 to-red-600',
    softGlow: 'bg-rose-500/10',
    border: 'border-rose-500/25',
    textAccent: 'text-rose-300',
    icon: '🎥',
    features: ['WebRTC Streaming', 'Live Chat', 'Socket.io', 'AWS Hosting'],
    year: '2024',
    status: 'Beta',
  },
  {
    id: 6,
    title: 'Social Media Platform',
    category: 'Full Stack',
    description:
      'A full-fledged social network with user profiles, post feeds, like/comment interactions, follow system, real-time notifications via Socket.io, direct messaging, and media uploads to AWS S3.',
    tags: ['MERN Stack', 'Socket.io', 'AWS S3', 'Redux', 'JWT Auth', 'Cloudinary'],
    color: 'fuchsia',
    gradient: 'from-fuchsia-500 to-pink-600',
    softGlow: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/25',
    textAccent: 'text-fuchsia-300',
    icon: '🌐',
    features: ['Real-time DMs', 'Follow System', 'Notifications', 'Media Uploads'],
    year: '2024',
    status: 'Live',
  },
]

const categories = ['All', 'Full Stack', 'Frontend']

// ─── Animated background particles ──────────────────────────────────────────
function FloatingParticles() {
  const dots = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }))
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-violet-400/20"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -25, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Live: { dot: 'bg-green-400', text: 'text-green-300', bg: 'bg-green-500/10 border-green-500/30' },
    Beta: { dot: 'bg-amber-400', text: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/30' },
  }
  const s = map[status] || map.Live
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
      {status}
    </div>
  )
}

// ─── Project Card ────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative rounded-3xl bg-[#0f0f18] border ${project.border} overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60 cursor-default`}
    >
      {/* Top glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${project.textAccent.replace('text-', 'via-')} to-transparent`}
      />

      {/* Card header with big icon */}
      <div className={`relative px-6 pt-6 pb-4 ${project.softGlow} border-b ${project.border}`}>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Icon box */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl shadow-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              {project.icon}
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${project.textAccent} font-mono mb-1`}>
                {project.category}
              </p>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-white leading-tight">
                {project.title}
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <StatusBadge status={project.status} />
            <span className="text-xs text-white/25 font-mono">{project.year}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Features row */}
        <div className="grid grid-cols-2 gap-2">
          {project.features.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
              <span className="text-xs text-white/40 font-medium">{f}</span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg bg-white/4 border border-white/8 ${project.textAccent} hover:bg-white/8 transition-colors`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-3 pt-1 border-t border-white/5">
          <a
            href="#contact"
            className={`flex-1 text-center rounded-xl bg-gradient-to-r ${project.gradient} p-px group/btn`}
          >
            <div className="rounded-[11px] bg-[#0f0f18] px-4 py-2 transition-all group-hover/btn:bg-transparent">
              <span className={`text-xs font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent group-hover/btn:text-white transition-colors`}>
                View Details
              </span>
            </div>
          </a>
          <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
            {/* GitHub icon */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Featured large card (first project) ─────────────────────────────────────
function FeaturedCard({ project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-3xl bg-[#0f0f18] border ${project.border} overflow-hidden group hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl hover:shadow-black/60`}
    >
      {/* Wide gradient header */}
      <div className={`relative h-36 ${project.softGlow} border-b ${project.border} flex items-center px-8`}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
        {/* Big decorative icon */}
        <div className={`absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}>
          {project.icon}
        </div>
        <div className="relative flex items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
            {project.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${project.textAccent} font-mono`}>{project.category}</p>
              <StatusBadge status={project.status} />
              <span className="text-xs text-white/25 font-mono">{project.year}</span>
            </div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">{project.title}</h3>
          </div>
        </div>
      </div>

      <div className="p-8 grid sm:grid-cols-[1fr_auto] gap-8 items-start">
        <div className="space-y-5">
          <p className="text-sm text-white/55 leading-relaxed">{project.description}</p>
          <div className="grid grid-cols-2 gap-2">
            {project.features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient}`} />
                <span className="text-xs text-white/50 font-medium">{f}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span key={tag} className={`text-[10px] font-bold font-mono px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 ${project.textAccent}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[130px]">
          <a href="#contact" className={`rounded-2xl bg-gradient-to-r ${project.gradient} px-5 py-3 text-sm font-bold text-white text-center shadow-lg hover:scale-105 transition-transform`}>
            View Project
          </a>
          <button className="rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
            GitHub
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Projects Component ─────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const [featured, ...rest] = filtered

  return (
    <section id="projects" className="relative py-32 bg-[#0d0d14] overflow-hidden" ref={sectionRef}>
      {/* ── Background atmosphere ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-700/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-700/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.018)_1px,transparent_1px),linear-gradient(to_right,rgba(139,92,246,0.018)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <FloatingParticles />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-violet-400 mb-4 font-mono">&lt; my work /&gt;</p>
          <h2 className="font-['Playfair_Display'] text-5xl sm:text-6xl font-bold text-white leading-tight">
            Projects I've{' '}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text">
              Shipped
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Real-world applications built with the MERN stack, Python, and modern cloud infrastructure — 
            from idea to production.
          </p>

          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/8'
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Project count */}
          <p className="mt-4 text-xs text-white/25 font-mono">
            Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* ── Featured card (first in filtered) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`featured-${activeFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {featured && <FeaturedCard project={featured} />}
          </motion.div>
        </AnimatePresence>

        {/* ── Grid of remaining cards ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`grid-${activeFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 rounded-3xl bg-gradient-to-br from-violet-500/8 via-fuchsia-500/5 to-cyan-500/8 border border-violet-500/20 p-10 text-center relative overflow-hidden"
        >
          {/* Decorative glow circle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-violet-500/5 blur-3xl" />
          </div>
          <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-3 font-mono">
            // open for collaboration
          </p>
          <h3 className="relative font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-white mb-3">
            Have a Project in Mind?
          </h3>
          <p className="relative text-white/45 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Whether it's a startup MVP, an AI automation pipeline, or a full-stack rebuild — 
            let's talk and make it real.
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-violet-500/25 hover:shadow-violet-500/50 hover:scale-105 transition-all"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <span className="relative flex items-center gap-2">
                Start a Project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-8 py-4 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              View GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}