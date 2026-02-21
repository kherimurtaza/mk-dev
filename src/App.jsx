import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Project from './components/Projects'
import Services from './components/Service'
import Contact from './components/Contact'
import Feedback from './components/Feedback'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Project />
      <Services />
      <Contact />
      <Feedback />
      <Footer />
    </div>
  )
}