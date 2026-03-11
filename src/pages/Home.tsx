import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Cpu, Activity, Database, Radar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  // Matrix text effect
  const [matrixText, setMatrixText] = useState('INITIALIZING_RECON_CORE...')
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*>'
    let iteration = 0
    const finalStr = 'SECURE_INTEL_UPLINK_ESTABLISHED'
    
    const interval = setInterval(() => {
      setMatrixText(prev => {
        const next = prev.split('').map((_, i) => {
          if (i < iteration) return finalStr[i] || ''
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
        
        if (iteration >= finalStr.length) clearInterval(interval)
        iteration += 1/3
        return next
      })
    }, 30)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050505] overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ff_1px,transparent_1px),linear-gradient(to_bottom,#0ff_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.02]" />
        
        <motion.div 
          style={{ y }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-cyan-900/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute top-[40%] right-[10%] w-[30rem] h-[30rem] bg-fuchsia-900/10 rounded-full blur-[100px] mix-blend-screen" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 min-h-[90vh] flex flex-col justify-center">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            {/* System Status Banner */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#0ff]/5 border border-[#0ff]/20 rounded-sm">
              <Radar className="w-4 h-4 text-[#0ff] animate-[spin_3s_linear_infinite]" />
              <span className="text-xs font-mono text-[#0ff] tracking-widest uppercase">{matrixText}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                <span className="block opacity-90">GLOBAL</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">AI INTEL</span>
                <span className="block text-[#0ff] glitch-hover cursor-default">SYNDICATE.</span>
              </h1>
              
              <div className="h-px w-full max-w-md bg-gradient-to-r from-[#0ff]/50 to-transparent my-6" />
              
              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-mono leading-relaxed">
                Raw, unstructured AI ecosystem chaos converted into high-signal telemetry. 
                Piped directly into your agent's nervous system via single API endpoint.
                Zero noise. Total awareness.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 pt-4">
              <Link 
                to="/feed"
                className="group relative px-8 py-4 bg-[#0ff] text-black font-mono font-bold text-sm uppercase tracking-widest overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative flex items-center gap-2">
                  ACCESS_TERMINAL
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Cyberpunk corner cuts */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black"></div>
              </Link>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Database className="w-3.5 h-3.5 text-zinc-400" />
                  <span>DATA_INGEST: ACTIVE</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SYS_LATENCY: 42MS</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Data Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Holographic display frame */}
            <div className="relative aspect-square max-w-md mx-auto w-full">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-[#0ff]/10 rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]"></div>
              
              {/* Core Display */}
              <div className="absolute inset-8 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0ff]/50 to-transparent"></div>
                
                <Cpu className="w-16 h-16 text-[#0ff]/80 mb-6" />
                
                <div className="text-center font-mono space-y-2">
                  <div className="text-xs text-zinc-500 uppercase tracking-widest">Global Threat Level</div>
                  <div className="text-4xl font-bold text-white tracking-tighter">DEFCON_4</div>
                  <div className="text-xs text-[#0ff] mt-4 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0ff] rounded-full animate-ping"></span>
                    MONITORING_124_VECTORS
                  </div>
                </div>

                {/* Animated data lines */}
                <div className="absolute bottom-0 w-full h-32 flex items-end justify-around px-4 opacity-20">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="w-1 bg-[#0ff]"
                      animate={{ height: ['10%', '100%', '30%'] }}
                      transition={{ 
                        duration: 1.5 + Math.random(), 
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Corner brackets */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#0ff]/50"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#0ff]/50"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#0ff]/50"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#0ff]/50"></div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Tech Specs Marquee */}
      <div className="relative z-10 border-y border-white/5 bg-[#0a0a0a] overflow-hidden py-4">
        <div className="flex gap-8 whitespace-nowrap opacity-50 font-mono text-xs uppercase tracking-widest text-zinc-400">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="flex gap-16"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span>[ PROTOCOL: HTTPS/WSS ]</span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>[ LATENCY: &lt;50MS ]</span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>[ UPTIME: 99.99% ]</span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>[ FORMAT: JSON_STRICT ]</span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>[ AUTH: BEARER_TOKEN ]</span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </div>
  )
}