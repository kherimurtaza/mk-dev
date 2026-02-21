import { useState } from 'react'
import { motion } from 'framer-motion'
import contactImg from '/img/contact-us.jpg'

const contactInfo = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'murtazakheri53@gmail.com',
    href: 'mailto:murtazakheri53@gmail.com',
  },
  {
    icon: '📸',
    label: 'Instagram',
    value: '@murtaza.kheri',
    href: 'https://www.instagram.com/murtaza.kheri/',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: '+965 65702474',
    href: 'https://wa.me/96565702474',
  },
]

export default function Contact() {
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClass = (name) =>
    `w-full rounded-2xl bg-white/5 border px-5 py-4 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 ${
      focused === name
        ? 'border-violet-500 bg-violet-500/5 shadow-lg shadow-violet-500/10'
        : 'border-white/10 hover:border-white/20'
    }`

  return (
    <section id="contact" className="relative py-32 bg-[#0a0a0f]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-700/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-4">Get In Touch</p>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white">
            Let's Create Something <br />
            <span className="text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text">Amazing Together</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: info + image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img src={contactImg} alt="Contact" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
            </div>

            <div className="space-y-4">
              {contactInfo.map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/8 hover:border-violet-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">{value}</p>
                  </div>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-violet-400 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="rounded-3xl bg-white/3 border border-white/10 p-8">
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputClass('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className={inputClass('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Service</label>
                  <select
                    className={inputClass('service') + ' cursor-pointer'}
                    onFocus={() => setFocused('service')}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="" className="bg-[#1a1a2e]">Select a service...</option>
                    <option className="bg-[#1a1a2e]">Web Design</option>
                    <option className="bg-[#1a1a2e]">Social Media Post</option>
                    <option className="bg-[#1a1a2e]">Business Template</option>
                    <option className="bg-[#1a1a2e]">Logo Design</option>
                    <option className="bg-[#1a1a2e]">Resume / Portfolio</option>
                    <option className="bg-[#1a1a2e]">Email Template</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project..."
                    className={inputClass('message') + ' resize-none'}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/50 transition-shadow"
                >
                  {submitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}