import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Terminal, Zap } from 'lucide-react'

type ImpactLevel = 'HIGH' | 'MEDIUM' | 'LOW'
type Category = 'Model Releases' | 'API Changes' | 'Framework Updates' | 'Research' | 'Pricing' | 'Security' | 'All'

interface FeedEntry {
  id: string
  title: string
  summary: string
  impact: ImpactLevel
  category: Category
  affects: string[]
  action_required?: string
  date: string
  source: string
  sourceUrl?: string
}

const FALLBACK_DATA: FeedEntry[] = [
  {
    id: '1',
    title: 'GPT-4.5 API Deprecation Warning',
    summary: 'Legacy endpoint retirement scheduled. All traffic must migrate to v2 structure within 30 days. Failure to migrate will result in hard 404s.',
    impact: 'HIGH',
    category: 'API Changes',
    affects: ['openai-api', 'production-systems'],
    action_required: 'Migrate to /v2/chat/completions and update auth header format.',
    date: new Date().toISOString(),
    source: 'SYS.INTERNAL',
  },
  {
    id: '2',
    title: 'Local Context Window Expansion',
    summary: 'New quantization technique allows 128k context on consumer hardware. Memory footprint reduced by 40% via adaptive offloading.',
    impact: 'MEDIUM',
    category: 'Research',
    affects: ['local-models', 'llama.cpp'],
    date: new Date(Date.now() - 3600000).toISOString(),
    source: 'ARXIV.UPLINK',
  },
  {
    id: '3',
    title: 'Agent Tool-Use Vulnerability Discovered',
    summary: 'Critical exploit path found in auto-executing JSON schemas allowing recursive prompt injection to bypass sandbox constraints.',
    impact: 'HIGH',
    category: 'Security',
    affects: ['langchain', 'autogen', 'openclaw'],
    action_required: 'Implement strict schema validation and manual confirmation gates for destructive actions.',
    date: new Date(Date.now() - 7200000).toISOString(),
    source: 'SEC.FEED',
  }
]

export function Feed() {
  const [entries, setEntries] = useState<FeedEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<ImpactLevel | 'ALL'>('ALL')
  
  useEffect(() => {
    // Simulating initial load sweep
    const load = setTimeout(() => {
      setEntries(FALLBACK_DATA)
      setLoading(false)
    }, 1500)
    return () => clearTimeout(load)
  }, [])

  const getImpactColor = (impact: ImpactLevel) => {
    switch(impact) {
      case 'HIGH': return 'text-red-500 border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
      case 'MEDIUM': return 'text-amber-500 border-amber-500/50 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
      case 'LOW': return 'text-[#0ff] border-[#0ff]/50 bg-[#0ff]/10 shadow-[0_0_15px_rgba(0,255,255,0.2)]'
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-24 relative">
      
      {/* Background elements */}
      <div className="fixed right-0 top-1/4 w-[800px] h-[800px] bg-[#0ff]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="fixed left-0 bottom-1/4 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Terminal Header */}
        <div className="border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md mb-8">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Terminal className="w-4 h-4 text-[#0ff]" />
              <span>TERMINAL // LIVE_INTEL_FEED</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-[#0ff] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0ff] rounded-sm animate-pulse"></span>
                LINK_ACTIVE
              </span>
              <span className="text-zinc-600">ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
            </div>
          </div>
          
          <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
                Recon<span className="text-[#0ff]">_Core</span>
              </h1>
              <p className="text-sm font-mono text-zinc-400">
                &gt; Monitoring 1,204 data sources. Awaiting structural changes...
              </p>
            </div>
            
            {/* Tactical Filters */}
            <div className="flex gap-2 w-full md:w-auto">
              {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`flex-1 md:flex-none px-4 py-2 text-xs font-mono font-bold uppercase transition-all duration-300 border
                    ${activeFilter === filter 
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                      : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feed Content */}
        <div className="space-y-6">
          <AnimatePresence>
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <div className="w-12 h-12 border-4 border-white/10 border-t-[#0ff] rounded-full animate-spin" />
                <span className="text-sm font-mono text-[#0ff] tracking-widest animate-pulse">DECRYPTING_SIGNAL...</span>
              </motion.div>
            ) : (
              entries
                .filter(e => activeFilter === 'ALL' || e.impact === activeFilter)
                .map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20, rotateX: -5 }}
                  animate={{ opacity: 1, x: 0, rotateX: 0 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  className="group relative bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 p-6 sm:p-8 overflow-hidden hover:bg-[#111] transition-colors"
                >
                  {/* Decorative corner markers */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20"></div>
                  
                  {/* Animated highlight line */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#0ff]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>

                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                    
                    {/* Meta Sidebar */}
                    <div className="w-full lg:w-48 shrink-0 space-y-4">
                      <div className={`inline-flex px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase border ${getImpactColor(entry.impact)}`}>
                        {entry.impact}_PRIORITY
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-zinc-600 uppercase">Timestamp</div>
                        <div className="text-sm font-mono text-zinc-300">
                          {new Date(entry.date).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          <span className="text-zinc-600 ml-1">UTC</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-zinc-600 uppercase">Vector</div>
                        <div className="text-sm font-mono text-[#0ff]">{entry.category}</div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-[#0ff] transition-colors">
                        {entry.title}
                      </h2>
                      
                      <p className="text-zinc-400 text-lg leading-relaxed font-sans">
                        {entry.summary}
                      </p>

                      {entry.action_required && (
                        <div className="mt-6 p-4 bg-red-500/5 border-l-2 border-red-500 text-red-200 text-sm font-mono flex gap-3 items-start">
                          <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                          <div>
                            <div className="font-bold uppercase tracking-wider mb-1 text-red-500">Action Required</div>
                            {entry.action_required}
                          </div>
                        </div>
                      )}

                      {/* Footer tags */}
                      <div className="pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {entry.affects.map(tag => (
                            <span key={tag} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/5 text-zinc-400 border border-white/10 hover:border-white/30 transition-colors cursor-default">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
                          <Zap className="w-3 h-3" />
                          SRC: {entry.source}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}