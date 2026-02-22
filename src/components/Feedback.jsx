import { motion } from 'framer-motion'
import feedbackImg from '/img/feedback.jpg'

const testimonials = [
  {
    name: 'Ahmed Al-Rashidi',
    role: 'Business Owner',
    text: "Murtaza built a fully dynamic website for our company with an admin dashboard and smooth performance. Everything works flawlessly and loads very fast.",
    rating: 5,
    avatar: 'AR',
    color: 'from-violet-500 to-indigo-500',
  },
  {
    name: 'Fatima Hassan',
    role: 'Marketing Manager',
    text: "Our single-page website looks modern, responsive, and extremely smooth. The animations and UI design made our brand feel premium online.",
    rating: 5,
    avatar: 'FH',
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    name: 'Ali Khalid',
    role: 'Startup Founder',
    text: "Murtaza created a fast static website optimized for SEO and performance. The frontend UI is clean, professional, and works perfectly on all devices.",
    rating: 5,
    avatar: 'AK',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Sara Abdullah',
    role: 'E-commerce Manager',
    text: "The frontend UI he developed is beautiful and user-friendly. Our customers now navigate the website much easier and conversions improved.",
    rating: 5,
    avatar: 'SA',
    color: 'from-emerald-500 to-teal-500',
  },
]

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Feedback() {
  return (
    <section id="feedback" className="relative py-32 bg-[#0d0d14]">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-4">Testimonials</p>
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white leading-tight">
                What Clients <br />
                <span className="text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text">Say About Me</span>
              </h2>
              <p className="mt-4 text-white/50 leading-relaxed">
                Trusted by businesses across Kuwait. Here's what some of my clients have to say about working with me.
              </p>
            </div>

            {/* Image with overlay */}
            <div className="relative rounded-3xl overflow-hidden">
              <img src={feedbackImg} alt="Feedback" className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="flex -space-x-2 mb-2">
                  {['AR', 'FH', 'OK'].map((initials, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-2 border-[#0d0d14] flex items-center justify-center text-xs font-bold text-white">
                      {initials}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white font-semibold">30+ Happy Clients</p>
                <StarRating />
              </div>
            </div>
          </motion.div>

          {/* Right testimonials */}
          <div className="space-y-4">
            {testimonials.map(({ name, role, text, rating, avatar, color }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-sm font-black text-white flex-shrink-0`}>
                    {avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <p className="font-semibold text-white text-sm">{name}</p>
                        <p className="text-xs text-white/40">{role}</p>
                      </div>
                      <StarRating count={rating} />
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed mt-2">"{text}"</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-3xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 p-6 text-center"
            >
              <p className="font-['Playfair_Display'] text-2xl font-bold text-white">Ready to Start?</p>
              <p className="text-sm text-white/50 mt-2 mb-4">Let's bring your vision to life today.</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white hover:scale-105 transition-transform shadow-lg shadow-violet-500/25"
              >
                Start a Project
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}