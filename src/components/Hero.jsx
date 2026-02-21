import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

// --- Animated typewriter for tech roles ---
const roles = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'AI Automation Builder',
  'Python & React Dev',
]

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef(null)

  useEffect(() => {
    const current = roles[roleIndex]
    if (!deleting && displayed.length < current.length) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65)
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout.current)
  }, [displayed, deleting, roleIndex])

  return (
    <span className="text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text">
      {displayed}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  )
}

// --- Floating tech badge ---
function TechBadge({ icon, label, style, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      style={style}
      className="absolute hidden lg:flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md px-3 py-2 shadow-xl"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-bold text-white/70">{label}</span>
    </motion.div>
  )
}

// --- Animated particle dots (AI neural network feel) ---
function NeuralParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Connecting lines SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="15%" y1="20%" x2="40%" y2="45%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="40%" y1="45%" x2="75%" y2="25%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="75%" y1="25%" x2="85%" y2="70%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="20%" y1="70%" x2="55%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="55%" y1="80%" x2="85%" y2="70%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="20%" y1="70%" x2="40%" y2="45%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="10%" y1="50%" x2="40%" y2="45%" stroke="url(#lineGrad)" strokeWidth="0.8" />
        <line x1="60%" y1="60%" x2="75%" y2="25%" stroke="url(#lineGrad)" strokeWidth="0.8" />
      </svg>
    </div>
  )
}

// --- Code snippet that cycles ---
const codeSnippets = [
  `const app = express()
app.get('/ai', async (req, res) => {
  const result = await openai.chat(req.body)
  res.json({ result })
})`,
  `model = AutoModelForSeq2SeqLM
  .from_pretrained("gpt2")
pipeline = pipeline("text-generation",
  model=model)`,
  `const [data, setData] = useState([])
useEffect(() => {
  fetch('/api/users')
    .then(r => r.json())
    .then(setData)
}, [])`,
]

function CodeWindow() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % codeSnippets.length)
        setVisible(true)
      }, 400)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
      className="relative hidden lg:block"
      style={{ perspective: '800px' }}
    >
      {/* Glow behind the window */}
      <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/15 via-violet-500/10 to-fuchsia-500/15 rounded-3xl blur-2xl" />

      <div className="relative rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden w-[420px]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 bg-white/3 border-b border-white/8">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-white/30 font-mono">murtaza.dev ~ portfolio</span>
          <div className="ml-auto flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400/70">live</span>
          </div>
        </div>

        {/* Code content */}
        <div className="p-5 font-mono text-sm leading-relaxed min-h-[120px]">
          <motion.pre
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-left whitespace-pre-wrap"
          >
            {codeSnippets[idx].split('\n').map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-white/15 select-none w-4 text-right flex-shrink-0">{i + 1}</span>
                <span>
                  {line
                    .replace(/(const|let|var|async|await|import|export|from|return|def|model|pipeline)/g, '§$1§')
                    .split('§')
                    .map((chunk, j) =>
                      ['const','let','var','async','await','import','export','from','return','def','model','pipeline'].includes(chunk)
                        ? <span key={j} className="text-violet-400">{chunk}</span>
                        : chunk.match(/['"`]/)
                        ? <span key={j} className="text-emerald-400">{chunk}</span>
                        : <span key={j} className="text-white/70">{chunk}</span>
                    )}
                </span>
              </div>
            ))}
          </motion.pre>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-5 py-2 bg-violet-500/10 border-t border-white/5">
          <span className="text-xs text-violet-300/60 font-mono">JavaScript · Node.js · Python</span>
          <span className="text-xs text-cyan-400/60 font-mono">●  Running</span>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
export default function Hero() {
  const techBadges = [
    { icon: '⚛️', label: 'React.js', style: { top: '8%', left: '5%' }, delay: 1.2 },
    { icon: '🟢', label: 'Node.js', style: { top: '18%', right: '3%' }, delay: 1.4 },
    { icon: '🐍', label: 'Python', style: { bottom: '30%', left: '2%' }, delay: 1.6 },
    { icon: '🤖', label: 'AI / LLM', style: { bottom: '22%', right: '2%' }, delay: 1.8 },
    { icon: '🍃', label: 'MongoDB', style: { top: '45%', left: '-1%' }, delay: 2.0 },
  ]

  return (
    <header
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-[#0a0a0f] flex items-center"
    >
      {/* ── Background layers ── */}
      {/* Deep grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.025)_1px,transparent_1px),linear-gradient(to_right,rgba(6,182,212,0.025)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Glowing orbs — AI palette: cyan + violet + fuchsia */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Neural particles */}
      <NeuralParticles />

      {/* Floating tech badges */}
      {techBadges.map((b) => (
        <TechBadge key={b.label} {...b} />
      ))}

      {/* ── Main content ── */}
      <div className="relative mx-auto max-w-6xl px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Text */}
          <div className="text-left space-y-6">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/8 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Open to Work · Kuwait 🇰🇼
              </span>
            </motion.div>

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm font-semibold text-white/40 tracking-widest uppercase font-mono"
            >
              &lt; Murtaza Kheri /&gt;
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-['Playfair_Display'] text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Building
              <br />
              <TypewriterRole />
            </motion.h1>

            {/* Sub-description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base text-white/50 leading-relaxed max-w-lg"
            >
              I craft scalable web applications using the <span className="text-cyan-300 font-semibold">MERN Stack</span> and 
              build intelligent <span className="text-violet-300 font-semibold">AI automations with Python</span>. 
              Turning complex ideas into clean, fast, real-world products.
            </motion.p>

            {/* Tech stack row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex flex-wrap gap-2"
            >
              {['MongoDB', 'Express', 'React', 'Node.js', 'Python', 'OpenAI API'].map((tech, i) => (
                <span
                  key={tech}
                  className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-cyan-500/5 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/50"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative flex items-center gap-2">
                  View My Work
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white/80 backdrop-blur hover:bg-white/10 hover:text-white hover:border-white/30 transition-all"
              >
                Hire Me
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="flex gap-8 pt-2"
            >
              {[
                { value: '3+', label: 'Years Exp.' },
                { value: '50+', label: 'Projects' },
                { value: '30+', label: 'Clients' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white font-['Playfair_Display']">{value}</div>
                  <div className="text-xs text-white/35 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Code window */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <CodeWindow />

              {/* AI badge below code window */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="hidden lg:flex mt-5 items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/25 p-4 w-[420px]"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg flex-shrink-0">
                  🤖
                </div>
                <div>
                  <p className="text-xs font-bold text-white">AI Automation Specialist</p>
                  <p className="text-xs text-white/40 mt-0.5">LangChain · OpenAI API · Python Pipelines</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                  <span className="text-xs text-fuchsia-400/70 font-mono">active</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/25 tracking-widest uppercase font-mono">scroll</span>
        <div className="h-10 w-5 rounded-full border border-white/15 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-cyan-400"
          />
        </div>
      </motion.div>
    </header>
  )
}