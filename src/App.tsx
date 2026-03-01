import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Menu, X, Cpu, Zap, Shield, Lightbulb, 
  Microchip, Wifi, Factory, Battery, 
  Code, Cloud, Mail, Phone, MapPin,
  Linkedin, Github, ArrowRight, Activity,
  Globe, BarChart, Users, Award, ChevronRight
} from 'lucide-react'

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
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold gradient-text">Symbiotik</div>
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
                  className="text-gray-300 hover:text-white font-medium transition-all hover:scale-105 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all"></span>
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
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden tech-grid">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=2400&q=80"
            alt="Technology background"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Activity className="w-4 h-4 text-blue-300" />
              <span className="text-slate-300">Embedded • IoT • Automation • Energy</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-shadow">
              Engineering <span className="gradient-text">Smart</span>{' '}
              <br className="hidden lg:block" />
              Connected Solutions
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg md:text-xl text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed"
            >
              Delivering embedded systems, IoT, automation, and energy technologies for industries, innovators, and developers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-16 md:mt-20 max-w-4xl mx-auto"
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
      <section id="about" className="section-padding relative">
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
                <span className="text-slate-300">About Symbiotik Innovations</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                About <span className="gradient-text">Symbiotik Innovations</span>
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
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
                    <span className="text-slate-300">{item.text}</span>
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
                    <div className="text-sm text-slate-400">Core Capabilities</div>
                    <div className="text-2xl font-semibold text-white mt-1">Hardware + Software, engineered together</div>
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
                      <div className="text-slate-300 leading-relaxed">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="section-padding bg-gradient-to-b from-transparent to-slate-900/50">
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
      <section id="services" className="section-padding">
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
      <section id="projects" className="section-padding bg-gradient-to-b from-transparent to-slate-900/50">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Remote Monitoring System', 
                desc: 'Real-time industrial equipment monitoring with predictive analytics and AI-powered insights',
                tech: ['IoT', 'AI/ML', 'Cloud'],
                icon: Zap,
              },
              { 
                title: 'Smart Energy Controller', 
                desc: 'AI-powered energy management system for commercial buildings with 40% efficiency improvement',
                tech: ['Energy', 'AI', 'IoT'],
                icon: Battery,
              },
              { 
                title: 'Industrial IoT Dashboard', 
                desc: 'Comprehensive data visualization platform for manufacturing with real-time analytics',
                tech: ['Dashboard', 'Analytics', 'IoT'],
                icon: BarChart,
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-premium rounded-3xl overflow-hidden group cursor-pointer"
              >
                <div className="h-44 bg-white/5 border-b border-white/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-slate-950/40" />
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <project.icon className="h-7 w-7 text-blue-300" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-white/5 text-slate-300 rounded-full text-sm border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <button className="flex items-center text-blue-300 hover:text-blue-200 transition-colors group">
                    View Case Study 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding relative">
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
                      { icon: Phone, text: '+1 (555) 123-4567', label: 'Phone' },
                      { icon: MapPin, text: 'San Francisco, CA', label: 'Location' }
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
                      { icon: Github, label: 'GitHub' }
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text">Symbiotik</div>
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
                  { icon: Github, label: 'GitHub' }
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
