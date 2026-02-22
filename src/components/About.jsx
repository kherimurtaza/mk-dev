import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import aboutImg from "/img/img-1.jpg";

// ─── Skill categories with icons & colors ───────────────────────────────────
const skillCategories = [
  {
    label: "Frontend",
    color: "cyan",
    gradient: "from-cyan-500 to-blue-500",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/20",
    bg: "bg-cyan-500/8",
    textColor: "text-cyan-300",
    skills: [
      { name: "React.js", icon: "⚛️", level: 95 },
      { name: "Next.js", icon: "▲", level: 88 },
      { name: "Vite.js", icon: "⚡", level: 90 },
      { name: "TailwindCSS", icon: "🎨", level: 96 },
      { name: "MUI", icon: "🖼️", level: 85 },
      { name: "Framer Motion", icon: "🎬", level: 82 },
      { name: "Redux", icon: "🔄", level: 87 },
      { name: "HTML / CSS", icon: "🌐", level: 98 },
      { name: "JavaScript", icon: "🟡", level: 94 },
    ],
  },
  {
    label: "Backend",
    color: "violet",
    gradient: "from-violet-500 to-purple-500",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/20",
    bg: "bg-violet-500/8",
    textColor: "text-violet-300",
    skills: [
      { name: "Node.js", icon: "🟢", level: 92 },
      { name: "MongoDB", icon: "🍃", level: 88 },
      { name: "MySQL", icon: "🐬", level: 80 },
      { name: "Django", icon: "🐍", level: 78 },
      { name: "Python", icon: "🤖", level: 85 },
    ],
  },
  {
    label: "DevOps / Cloud",
    color: "fuchsia",
    gradient: "from-fuchsia-500 to-pink-500",
    border: "border-fuchsia-500/30",
    glow: "shadow-fuchsia-500/20",
    bg: "bg-fuchsia-500/8",
    textColor: "text-fuchsia-300",
    skills: [
      { name: "AWS", icon: "☁️", level: 75 },
      { name: "S3", icon: "🪣", level: 80 },
      { name: "CI/CD", icon: "🔁", level: 78 },
    ],
  },
];

// ─── Animated skill bar ──────────────────────────────────────────────────────
function SkillBar({ name, icon, level, delay, gradient }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
            {name}
          </span>
        </div>
        <span
          className={`text-xs font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {level}%
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{
            duration: 1.4,
            delay: delay + 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} relative`}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Skill category panel ────────────────────────────────────────────────────
function SkillPanel({ category, activeTab, setActiveTab }) {
  const isActive = activeTab === category.label;
  return (
    <button
      onClick={() => setActiveTab(category.label)}
      className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
        isActive
          ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg ${category.glow}`
          : "text-white/40 hover:text-white/70 bg-white/3 border border-white/8"
      }`}
    >
      {category.label}
      <span
        className={`text-xs px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/20" : "bg-white/5"}`}
      >
        {category.skills.length}
      </span>
    </button>
  );
}

// ─── Orbit ring (decorative) ─────────────────────────────────────────────────
function OrbitRing() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-6 right-6 w-48 h-48 opacity-10"
      >
        <div className="w-full h-full rounded-full border border-dashed border-cyan-400" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-32 h-32 opacity-10"
      >
        <div className="w-full h-full rounded-full border border-violet-400" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-violet-400" />
      </motion.div>
    </div>
  );
}

// ─── Terminal-style stats card ───────────────────────────────────────────────
function TerminalCard() {
  const lines = [
    { label: "developer", value: '"Murtaza Kheri"', color: "text-cyan-300" },
    { label: "stack", value: '"MERN + Python"', color: "text-violet-300" },
    {
      label: "speciality",
      value: '"AI Automations"',
      color: "text-fuchsia-300",
    },
    { label: "location", value: '"Kuwait 🇰🇼"', color: "text-emerald-300" },
    { label: "experience", value: '"3+ Years"', color: "text-amber-300" },
    { label: "available", value: "true", color: "text-green-400" },
  ];
  return (
    <div className="rounded-2xl bg-[#0d1117] border border-white/10 p-3 sm:p-4 font-mono text-[11px] sm:text-xs shadow-xl">
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-white/20">murtaza.json</span>
      </div>
      <div className="space-y-1">
        <p className="text-white/30">{"{"}</p>
        {lines.map(({ label, value, color }, i) => (
          <motion.p
            key={label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            className="pl-4"
          >
            <span className="text-white/40">"{label}"</span>
            <span className="text-white/30">: </span>
            <span className={color}>{value}</span>
            <span className="text-white/20">,</span>
          </motion.p>
        ))}
        <p className="text-white/30">{"}"}</p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("Frontend");

  const activeCategory = skillCategories.find((c) => c.label === activeTab);

  return (
    <section
      id="about"
      className="relative py-14 sm:py-20 lg:py-32 bg-[#0a0a0f] overflow-x-hidden"
      ref={sectionRef}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-700/6 rounded-full blur-[80px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-violet-700/8 rounded-full blur-[70px] sm:blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(6,182,212,0.015)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-20"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-400 mb-4 font-mono">
            &lt; about me /&gt;
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Code, Craft &{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text">
              AI Magic
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto text-sm leading-relaxed px-2">
            Full Stack Developer with 3+ years building production-grade apps
            using the MERN stack, and crafting intelligent AI automations with
            Python.
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div
          className="grid gap-10 lg:gap-12
  grid-cols-1
  md:grid-cols-1
  lg:grid-cols-[380px_1fr]
  lg:items-start"
        >
          {/* ── LEFT COLUMN: Image + terminal ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            {/* Profile image card */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-violet-500/10 to-fuchsia-500/15 blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                <OrbitRing />
                <img
                  src={aboutImg}
                  alt="Murtaza Kheri"
                  className="w-full object-cover aspect-[3/4] sm:aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />

                {/* Overlay identity card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-['Playfair_Display'] text-base sm:text-lg font-bold text-white">
                          Murtaza Kheri
                        </p>
                        <p className="text-[11px] sm:text-xs text-cyan-300 mt-0.5">
                          Full Stack Developer · AI Engineer
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 rounded-full px-2 sm:px-2.5 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[11px] sm:text-xs text-green-300">
                          Open
                        </span>
                      </div>
                    </div>
                    {/* Mini tech pills */}
                    <div className="flex gap-1.5 mt-2 sm:mt-3 flex-wrap">
                      {["MERN", "Python", "AWS", "AI/ML"].map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/8 border border-white/12 text-white/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating 3+ badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 p-3 sm:p-4 shadow-2xl shadow-cyan-500/30 z-10"
              >
                <p className="text-xl sm:text-2xl font-black text-white font-['Playfair_Display']">
                  3+
                </p>
                <p className="text-[9px] sm:text-[10px] text-white/80 font-semibold">
                  Yrs Exp.
                </p>
              </motion.div>
            </div>

            {/* Terminal JSON card */}
            <TerminalCard />

            {/* Quick stat row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { n: "50+", l: "Projects", g: "from-cyan-500 to-blue-500" },
                { n: "30+", l: "Clients", g: "from-violet-500 to-purple-500" },
                { n: "18", l: "Skills", g: "from-fuchsia-500 to-pink-500" },
              ].map(({ n, l, g }) => (
                <div
                  key={l}
                  className="rounded-2xl bg-white/4 border border-white/8 p-2.5 sm:p-3 text-center"
                >
                  <p
                    className={`text-lg sm:text-xl font-black bg-gradient-to-r ${g} bg-clip-text text-transparent font-['Playfair_Display']`}
                  >
                    {n}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/35 mt-0.5 font-semibold uppercase tracking-wider">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Bio + Skills ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-7 sm:space-y-8"
          >
            {/* Bio */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 font-mono">
                // who i am
              </p>
              <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Building Full-Stack Products <br className="hidden sm:block" />
                <span className="text-transparent bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text">
                  Powered by AI
                </span>
              </h3>
              <p className="text-white/55 leading-relaxed text-sm">
                I'm a Full Stack Developer based in Kuwait, specialising in the{" "}
                <span className="text-cyan-300 font-semibold">MERN stack</span>{" "}
                — building scalable, performant web applications from database
                to UI. I also leverage{" "}
                <span className="text-violet-300 font-semibold">Python</span> to
                design intelligent AI automations, data pipelines, and
                LLM-powered workflows that save real hours for real businesses.
              </p>
              <p className="text-white/40 leading-relaxed text-sm">
                With 3+ years of shipping production code, I care deeply about
                clean architecture, responsive design, and developer experience
                — from a pixel-perfect frontend to a robust cloud-deployed
                backend on AWS.
              </p>
            </div>

            {/* What I do cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  icon: "⚛️",
                  title: "Frontend Dev",
                  desc: "React · Next.js · Vite · TailwindCSS · Redux",
                  g: "from-cyan-500 to-blue-500",
                  border: "border-cyan-500/20",
                  bg: "bg-cyan-500/5",
                },
                {
                  icon: "🔧",
                  title: "Backend Dev",
                  desc: "Node.js · MongoDB · Django · MySQL · REST APIs",
                  g: "from-violet-500 to-purple-500",
                  border: "border-violet-500/20",
                  bg: "bg-violet-500/5",
                },
                {
                  icon: "🤖",
                  title: "AI Automations",
                  desc: "Python · LangChain · OpenAI · AWS · CI/CD",
                  g: "from-fuchsia-500 to-pink-500",
                  border: "border-fuchsia-500/20",
                  bg: "bg-fuchsia-500/5",
                },
              ].map(({ icon, title, desc, g, border, bg }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`rounded-2xl ${bg} border ${border} p-4 group cursor-default`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${g} flex items-center justify-center text-lg mb-3 shadow-lg`}
                  >
                    {icon}
                  </div>
                  <p className="font-semibold text-white text-sm mb-1">
                    {title}
                  </p>
                  <p className="text-[11px] text-white/40 leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* ── SKILLS WITH TABS ── */}
            <div className="space-y-5">
              {/* Tab header — scrollable on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 font-mono">
                  // skill stack
                </p>
                <div
                  className="flex gap-2
overflow-x-auto
snap-x snap-mandatory
pb-2
scrollbar-none"
                >
                  {skillCategories.map((cat) => (
                    <SkillPanel
                      key={cat.label}
                      category={cat}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  ))}
                </div>
              </div>

              {/* Skill bars panel */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl ${activeCategory.bg} border ${activeCategory.border} p-4 sm:p-5 space-y-5 sm:space-y-4`}
              >
                {activeCategory.skills.map(({ name, icon, level }, i) => (
                  <SkillBar
                    key={name}
                    name={name}
                    icon={icon}
                    level={level}
                    delay={i * 0.06}
                    gradient={activeCategory.gradient}
                  />
                ))}
              </motion.div>

              {/* All skills pill cloud */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/25 font-mono mb-3">
                  All Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.flatMap((c) =>
                    c.skills.map(({ name, icon }) => (
                      <motion.span
                        key={name}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 ${c.textColor} hover:bg-white/10 hover:border-white/20 transition-all cursor-default`}
                      >
                        <span className="text-sm">{icon}</span>
                        {name}
                      </motion.span>
                    )),
                  )}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 sm:px-8 py-2.5 sm:py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="relative">Let's Build Together</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform relative"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-7 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/8 hover:border-white/25 transition-all"
              >
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
