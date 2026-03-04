import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Menu, X, Cpu, Zap, Shield, Lightbulb, 
  Microchip, Wifi, Factory, Battery, 
  Code, Cloud, Mail, Phone, MapPin,
  Linkedin, Github, ArrowRight, Activity,
  Globe, BarChart, Users, Award, ChevronRight, ChevronLeft
} from 'lucide-react'

// TikTok and Instagram icons (custom SVG components)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.25 1.12 1.16 2.67 1.79 4.25 1.94v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.89.01 5.77-.02 8.66-.03 1.68-.63 3.34-1.69 4.62-1.51 1.85-3.96 2.71-6.31 2.29-2.34-.41-4.39-2.03-5.31-4.22-.32-.78-.49-1.63-.49-2.48.01-1.7.01-3.39-.01-5.08 1.36.01 2.72-.02 4.08.01 1.03.03 2.05.44 2.68 1.26.83 1.04.96 2.58.33 3.78-.3.59-.78 1.05-1.31 1.37.01.79.02 1.57-.01 2.35-.05.96-.49 1.89-1.25 2.44-.76.55-1.78.71-2.71.47-.92-.24-1.73-.87-2.19-1.73-.46-.86-.53-1.92-.19-2.83.34-.91.98-1.62 1.84-2.05.86-.43 1.87-.51 2.79-.24.01-2.21-.01-4.42.02-6.63.03-1.18.56-2.34 1.44-3.06.89-.72 2.1-.98 3.23-.72.01.8.01 1.59-.01 2.38-.67-.13-1.43.02-1.88.57-.45.55-.52 1.35-.18 1.98.34.63.98.97 1.63.91.65-.06 1.23-.51 1.47-1.12.24-.61.15-1.35-.23-1.89-.38-.54-1.01-.84-1.63-.79-.01.79-.01 1.57.01 2.35-.05.96-.49 1.89-1.25 2.44-.76.55-1.78.71-2.71.47-.92-.24-1.73-.87-2.19-1.73-.46-.86-.53-1.92-.19-2.83.34-.91.98-1.62 1.84-2.05.86-.43 1.87-.51 2.79-.24.01-2.21-.01-4.42.02-6.63.03-1.18.56-2.34 1.44-3.06.89-.72 2.1-.98 3.23-.72z"/>
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
  </svg>
)

import projectMonitoring from './assets/project-monitoring.svg'
import projectEnergy from './assets/project-energy.svg'
import projectDashboard from './assets/project-dashboard.svg'
import deliveryModel from './assets/project3.jpeg'
import logo from './assets/logo.png'

// Animated Counter Component
function AnimatedCounter({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number
  suffix: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const durationMs = 1200
    const start = performance.now()

    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -2 }}
      className="rounded-2xl bg-white/5 border border-white/10 px-6 py-5 transition-colors hover:border-white/20"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
          <Icon className="h-5 w-5 text-blue-300" />
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {display.toLocaleString()}
            {suffix}
          </div>
          <div className="text-xs md:text-sm text-slate-400">{label}</div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectsCarousel({
  items,
}: {
  items: Array<{
    title: string
    desc: string
    tech: string[]
    icon: React.ComponentType<{ className?: string }>
    image: string
    features: string[]
    details: string
  }>
}) {
  const [active, setActive] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const scrollContainer = useRef<HTMLDivElement>(null)

  const scrollToItem = (index: number) => {
    if (scrollContainer.current) {
      const containerWidth = scrollContainer.current.clientWidth
      const itemWidth = containerWidth / 3 // Show 3 items at once
      const gap = 16 // gap between items
      const scrollPosition = index * (itemWidth + gap)
      scrollContainer.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setActive(index)
    }
  }

  const handleScroll = () => {
    if (scrollContainer.current) {
      const scrollLeft = scrollContainer.current.scrollLeft
      const containerWidth = scrollContainer.current.clientWidth
      const itemWidth = containerWidth / 3
      const gap = 16
      const newIndex = Math.round(scrollLeft / (itemWidth + gap))
      setActive(Math.min(Math.max(newIndex, 0), items.length - 1))
    }
  }

  const nextItem = () => {
    const nextIndex = (active + 1) % items.length
    scrollToItem(nextIndex)
  }

  const prevItem = () => {
    const prevIndex = active === 0 ? items.length - 1 : active - 1
    scrollToItem(prevIndex)
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-2 mb-4">
        <button
          type="button"
          onClick={prevItem}
          className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:border-white/20 transition"
          aria-label="Previous project"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={nextItem}
          className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:border-white/20 transition"
          aria-label="Next project"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="relative">
        <div
          ref={scrollContainer}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
          onScroll={handleScroll}
        >
          {items.map((project, index) => (
            <div
              key={project.title}
              className="flex-shrink-0"
              style={{ width: 'calc(33.333% - 11px)' }} // 3 items per row with gap
            >
              <div 
                className="card-premium rounded-3xl overflow-hidden h-full cursor-pointer hover:scale-105 transition-transform"
                onClick={() => index === active && setSelectedProject(index)}
              >
                <div className="h-48 border-b border-white/10 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={project.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/30 to-slate-950/70" />
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <project.icon className="h-6 w-6 text-blue-300" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300/80 mb-4 text-sm leading-relaxed">{project.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/5 text-slate-300 rounded-full text-xs border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center text-blue-300 hover:text-blue-200 transition-colors group text-sm">
                    View Case Study
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToItem(i)}
            className={
              i === active
                ? 'h-2.5 w-6 rounded-full bg-blue-400/80'
                : 'h-2.5 w-2.5 rounded-full bg-white/20 hover:bg-white/30 transition'
            }
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {items[selectedProject] && (
              <div className="relative">
                <div className="h-64 border-b border-white/10 relative overflow-hidden">
                  <img
                    src={items[selectedProject].image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/50 to-slate-950/90" />
                  <div className="p-8">
                  {(() => {
                    const Icon = items[selectedProject].icon
                    return (
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <Icon className="h-8 w-8 text-blue-300" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-white">{items[selectedProject].title}</h2>
                          <p className="text-gray-300">{items[selectedProject].desc}</p>
                        </div>
                      </div>
                    )
                  })()}
                </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-white">Project Overview</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">{items[selectedProject].details}</p>
                      
                      <div className="bg-slate-800/50 border-l-4 border-blue-500 p-6 rounded-r-xl my-6">
                        <p className="text-gray-300 italic">
                          "This solution represents our commitment to innovation and excellence in industrial IoT technology, 
                          delivering measurable value to our clients through cutting-edge engineering."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-white">Key Features & Capabilities</h3>
                    <div className="space-y-6">
                      {items[selectedProject].features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4 bg-slate-800/30 p-4 rounded-xl">
                          <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <h4 className="text-white font-semibold mb-2">{feature}</h4>
                            <p className="text-gray-400 text-sm">
                              Advanced implementation of this feature ensures optimal performance and reliability 
                              in demanding industrial environments.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-white">Technical Implementation</h3>
                    <div className="bg-slate-800/50 p-6 rounded-xl">
                      <p className="text-gray-300 mb-4">
                        Built using cutting-edge technologies and industry best practices, this solution 
                        demonstrates our technical expertise and commitment to quality.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {items[selectedProject].tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-white">Business Impact</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
                        <h4 className="text-blue-400 font-semibold mb-2">Efficiency</h4>
                        <p className="text-gray-300 text-sm">Up to 40% improvement in operational efficiency</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
                        <h4 className="text-green-400 font-semibold mb-2">Cost Savings</h4>
                        <p className="text-gray-300 text-sm">Significant reduction in operational costs</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
                        <h4 className="text-purple-400 font-semibold mb-2">ROI</h4>
                        <p className="text-gray-300 text-sm">Return on investment within 12 months</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
                      Get Started
                    </button>
                    <button 
                      className="px-8 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
                      onClick={() => setSelectedProject(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const whyUsCards = useMemo(
    () => [
      {
        icon: Cpu,
        title: 'Engineering Excellence',
        desc: 'Deep hardware and systems expertise with proven track record',
        iconClass: 'bg-blue-500/15 text-blue-300',
      },
      {
        icon: Zap,
        title: 'End-to-End Solutions',
        desc: 'From prototype to deployment, we handle it all',
        iconClass: 'bg-indigo-500/15 text-indigo-300',
      },
      {
        icon: Shield,
        title: 'Scalable & Secure',
        desc: 'Built for industrial reliability and maximum security',
        iconClass: 'bg-emerald-500/15 text-emerald-300',
      },
      {
        icon: Lightbulb,
        title: 'Innovation-Driven',
        desc: 'Research-focused, future-ready designs that lead the market',
        iconClass: 'bg-amber-500/15 text-amber-300',
      },
    ],
    [],
  )

  const services = useMemo(
    () => [
      {
        icon: Microchip,
        title: 'Embedded Systems Design',
        desc: 'Custom hardware solutions optimized for performance and reliability',
      },
      {
        icon: Wifi,
        title: 'IoT Device Development',
        desc: 'Connected smart devices with seamless cloud integration',
      },
      {
        icon: Factory,
        title: 'Industrial Automation',
        desc: 'Automation systems for measurable productivity gains',
      },
      {
        icon: Battery,
        title: 'Energy & Power Systems',
        desc: 'Efficient power electronics and energy management solutions',
      },
      {
        icon: Code,
        title: 'Firmware Development',
        desc: 'Robust embedded firmware built for long-term maintainability',
      },
      {
        icon: Cloud,
        title: 'Cloud Integration',
        desc: 'Secure telemetry, analytics, and integrations with your stack',
      },
    ],
    [],
  )

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full nav-blur z-50">
        <div className="container-max">
          <div className="flex justify-between items-center py-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Symbiotik Logo" className="w-full h-full object-contain scale-[2] filter drop-shadow-[0_0_18px_rgba(255,255,255,0.35)] brightness-125 contrast-150 saturate-150" />
              </div>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-10">
              {['Home', 'About', 'Why Us', 'Services', 'Projects', 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-gray-300 hover:text-white font-medium transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500/70 group-hover:w-full transition-all"></span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-6 pb-6 space-y-3 glass rounded-2xl p-6"
            >
              {['Home', 'About', 'Why Us', 'Services', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden tech-grid bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=2400&q=80"
            alt="Technology background"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 text-center lg:text-left">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Activity className="w-4 h-4 text-blue-300" />
                  <span className="text-slate-300">Embedded • IoT • Automation • Energy</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
                  Engineering <span className="text-white">Smart</span> Connected Systems
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed"
                >
                  We build reliable embedded hardware + software solutions—from rapid prototypes to production-grade deployments.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                >
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="btn-premium px-8 py-4 rounded-full text-white font-semibold text-base md:text-lg group"
                  >
                    <span className="relative z-10 flex items-center">
                      Request Consultation
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="btn-outline px-8 py-4 rounded-full font-semibold text-base md:text-lg"
                  >
                    View Projects
                  </button>
                </motion.div>

                <div className="mt-10">
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-slate-300/80">
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="card-premium rounded-3xl overflow-hidden relative h-full min-h-[500px]">
                  <img 
                    src={deliveryModel} 
                    alt="Delivery Model" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-20 max-w-6xl"
            >
              {[
                { value: 500, suffix: '+', label: 'Projects Delivered', icon: Zap },
                { value: 50, suffix: 'K+', label: 'Devices Deployed', icon: Cpu },
                { value: 99, suffix: '%', label: 'Client Satisfaction', icon: Shield }
              ].map((stat, index) => (
                <AnimatedCounter 
                  key={index} 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  label={stat.label} 
                  icon={stat.icon}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding relative bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Lightbulb className="w-4 h-4 text-blue-300" />
                <span className="text-slate-700">About Symbiotik Innovations</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                About <span className="gradient-text">Symbiotik Innovations</span>
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We develop reliable hardware, automation systems, and connected IoT solutions that improve efficiency, scalability, and sustainability. Our focus is on creating smart solutions that integrate embedded systems, cloud analytics, and industrial automation.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Globe, text: "Global Reach" },
                  { icon: Award, text: "Industry Certified" },
                  { icon: Users, text: "Expert Team" },
                  { icon: BarChart, text: "Proven Results" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <item.icon className="h-5 w-5 text-blue-300" />
                    </div>
                    <span className="text-slate-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <button className="btn-premium px-8 py-4 rounded-full text-white font-semibold group">
                <span className="relative z-10 flex items-center">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="card-premium rounded-3xl p-10">
                <div className="flex items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="text-sm text-slate-600">Core Capabilities</div>
                    <div className="text-2xl font-semibold text-slate-800 mt-1">Hardware + Software, engineered together</div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Cpu className="h-6 w-6 text-blue-300" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    'Embedded firmware and RTOS development',
                    'Secure device connectivity and provisioning',
                    'Industrial automation integration and testing',
                    'Energy monitoring and power electronics design',
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                      <div className="text-slate-700 leading-relaxed">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="section-padding bg-white/10 backdrop-blur-sm">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full glass mb-6 text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Award className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-gray-300">Why Choose Us</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine cutting-edge technology with industry expertise to deliver solutions that drive real business value.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUsCards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-premium p-8 rounded-3xl text-center group"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <item.icon className="h-7 w-7 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full glass mb-6 text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Code className="w-4 h-4 mr-2 text-green-400" />
              <span className="text-gray-300">Our Services</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions tailored to your specific needs and industry requirements.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-premium p-8 rounded-3xl group cursor-pointer"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <service.icon className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{service.desc}</p>
                <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group">
                  Learn More 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full glass mb-6 text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-4 h-4 mr-2 text-orange-400" />
              <span className="text-gray-300">Featured Projects</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our latest innovations and success stories across various industries.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto mt-16">
            {/* Single Projects Carousel with 3 Projects */}
            <ProjectsCarousel
              items={[
                {
                  title: 'IoT Solutions',
                  desc: 'End-to-end IoT development from device to cloud.',
                  tech: ['Embedded Systems', 'Cloud Architecture', 'Security'],
                  icon: Cpu,
                  image: projectMonitoring,
                  features: [
                    'Custom hardware design',
                    'Firmware development',
                    'Cloud integration',
                    'Real-time analytics'
                  ],
                  details: 'Our IoT Solutions service delivers comprehensive connected device systems that bridge physical and digital worlds.'
                },
                {
                  title: 'Web Applications',
                  desc: 'Modern web applications with cutting-edge technologies.',
                  tech: ['React', 'Node.js', 'TypeScript'],
                  icon: Code,
                  image: projectDashboard,
                  features: [
                    'Progressive Web Apps',
                    'Real-time collaboration',
                    'API development',
                    'Cloud deployment'
                  ],
                  details: 'We create powerful web applications that deliver exceptional user experiences and robust functionality.'
                },
                {
                  title: 'Cloud Infrastructure',
                  desc: 'Scalable cloud solutions for performance and reliability.',
                  tech: ['AWS', 'Azure', 'Kubernetes'],
                  icon: Cloud,
                  image: projectEnergy,
                  features: [
                    'Cloud migration',
                    'Auto-scaling systems',
                    'DevOps pipelines',
                    'Security hardening'
                  ],
                  details: 'Our Cloud Infrastructure services help businesses leverage the power of cloud computing effectively.'
                },
                {
                  title: 'Manufacturing Solutions',
                  desc: 'IoT solutions for smart manufacturing and Industry 4.0.',
                  tech: ['IIoT', 'Predictive Maintenance', 'Quality Control'],
                  icon: Factory,
                  image: projectMonitoring,
                  features: [
                    'Smart factories',
                    'Predictive maintenance',
                    'Quality automation',
                    'Supply chain optimization'
                  ],
                  details: 'We transform manufacturing operations with IoT and AI for enhanced efficiency and quality.'
                },
                {
                  title: 'Energy Management',
                  desc: 'Smart energy management and utility monitoring solutions.',
                  tech: ['Smart Grid', 'Energy Analytics', 'Renewable Integration'],
                  icon: Battery,
                  image: projectEnergy,
                  features: [
                    'Smart grid management',
                    'Energy optimization',
                    'Renewable integration',
                    'Demand response'
                  ],
                  details: 'Our energy solutions help utilities and consumers optimize energy usage and integrate renewable sources.'
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding relative bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full glass mb-6 text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Mail className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-gray-300">Get In Touch</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your ideas into reality? We're here to help you innovate and succeed.
            </p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="card-premium p-10 rounded-3xl">
                  <h3 className="text-2xl font-semibold mb-8">Let's Build Something Amazing</h3>
                  
                  <div className="space-y-6 mb-8">
                    {[
                      { icon: Mail, text: 'info@symbiotik.com', label: 'Email' },
                      { icon: Phone, text: '+2348169347203', label: 'Phone' },
                      { icon: MapPin, text: 'Kuje FCT', label: 'Location' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                          <item.icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">{item.label}</div>
                          <div className="text-white font-medium">{item.text}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    {[
                      { icon: Linkedin, label: 'LinkedIn' },
                      { icon: TikTokIcon, label: 'TikTok' },
                      { icon: InstagramIcon, label: 'Instagram' }
                    ].map((social, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center hover:from-blue-500/30 hover:to-purple-600/30 transition-all"
                      >
                        <social.icon className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="card-premium p-10 rounded-3xl">
                  <h3 className="text-2xl font-semibold mb-8">Send us a Message</h3>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="form-input w-full px-4 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="form-input w-full px-4 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="form-input w-full px-4 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <textarea
                        placeholder="Tell us about your project..."
                        rows={6}
                        className="form-input w-full px-4 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none resize-none"
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-premium w-full py-5 rounded-xl text-white font-semibold text-lg group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Send Message
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="relative container-max py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8 mt-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
                  <img src={logo} alt="Symbiotik Logo" className="w-full h-full object-contain scale-[2] filter drop-shadow-[0_0_18px_rgba(255,255,255,0.35)] brightness-125 contrast-150 saturate-150" />
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Engineering smart connected solutions for a better tomorrow.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Embedded Systems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">IoT Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Industrial Automation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Energy Solutions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <div className="flex space-x-3 mb-4">
                {[
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: TikTokIcon, label: 'TikTok' },
                  { icon: InstagramIcon, label: 'Instagram' }
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center hover:from-blue-500/30 hover:to-purple-600/30 transition-all"
                  >
                    <social.icon className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
                  </motion.button>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                <a href="mailto:info@symbiotik.com" className="hover:text-white transition-colors">
                  info@symbiotik.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800/50 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Symbiotik Innovations. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
