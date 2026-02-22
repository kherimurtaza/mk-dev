import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = ['Home', 'About', 'Projects', 'Services', 'Contact', 'Feedback']

const navIcons = {
  Home: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  About: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Projects: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Services: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Contact: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Feedback: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('Home')

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── lock body when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── auto-highlight active section ── */
  useEffect(() => {
    const onScroll = () => {
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.toLowerCase())
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(item)
          return
        }
      }
      setActive('Home')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (item) => {
    setActive(item)
    setMenuOpen(false)
    const el = document.getElementById(item.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ════════════════════════════════════════
          NAV BAR
      ════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-[999] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0f]/95 backdrop-blur-2xl border-b border-white/8 shadow-2xl shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-16 sm:h-[4.25rem]">

          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('Home') }}
            className="group flex items-center gap-2.5 flex-shrink-0 z-10"
          >
            <div className="relative h-8 w-8 sm:h-9 sm:w-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg">
                <span className="text-xs font-black text-white tracking-tight">MK</span>
              </div>
            </div>
            <span className="font-['Playfair_Display'] text-base sm:text-lg font-bold text-white tracking-wide">
              Murtaza<span className="text-violet-400">Kheri</span>
            </span>
          </a>

          {/* ── Desktop nav (≥768 px) ── */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item) }}
                className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors rounded-full select-none ${
                  active === item ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {active === item && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{item}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('Contact') }}
              className="ml-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/50 hover:scale-105 transition-all whitespace-nowrap"
            >
              Hire Me
            </a>
          </div>

          {/* ── Mobile hamburger (< 768 px) ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden relative z-10 flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-white/6 border border-white/12 gap-[5px] transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45,  y: 7  } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block h-[2px] w-5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-[2px] w-3.5 bg-white/70 rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block h-[2px] w-5 bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════
          MOBILE MENU  — rendered OUTSIDE nav so
          z-index / stacking context is clean
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[997] bg-black/65 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-16 sm:top-[4.25rem] z-[998] md:hidden"
            >
              {/* Glass panel */}
              <div className="mx-3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
                   style={{ background: 'rgba(10,10,18,0.97)', backdropFilter: 'blur(28px)' }}>

                {/* Nav list */}
                <div className="p-3 space-y-1">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, duration: 0.22 }}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item) }}
                      className={`flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-sm font-medium transition-all cursor-pointer select-none ${
                        active === item
                          ? 'bg-violet-500/15 border border-violet-500/30 text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/6 border border-transparent'
                      }`}
                    >
                      {/* Left: icon + label */}
                      <div className="flex items-center gap-3">
                        <span className={`flex-shrink-0 transition-colors ${
                          active === item ? 'text-violet-400' : 'text-white/30'
                        }`}>
                          {navIcons[item]}
                        </span>
                        <span className="text-[15px]">{item}</span>
                      </div>

                      {/* Right: active badge or arrow */}
                      {active === item ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Active
                        </span>
                      ) : (
                        <svg className="w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>

                {/* Divider */}
                <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.045 + 0.06 }}
                  className="p-3"
                >
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); handleNavClick('Contact') }}
                    className="group relative overflow-hidden flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 active:scale-[0.98] transition-all"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <svg className="w-4 h-4 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="relative">Hire Me — Let's Work Together</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </motion.div>

                {/* Bottom note */}
                <div className="pb-4 text-center">
                  <p className="text-[11px] text-white/20 font-mono">Available for freelance · Kuwait 🇰🇼</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}