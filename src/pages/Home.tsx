import { motion } from 'framer-motion'
import { ArrowRight, Code, Database, Globe, Check, Zap, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface FeedEntry {
  id: string
  title: string
  summary: string
  impact: 'HIGH' | 'MEDIUM' | 'LOW'
  category: string
  affects: string[]
  date: string
}

const FALLBACK_PREVIEW: FeedEntry[] = [
  {
    id: '1',
    title: 'GPT-4.5 Turbo Weights Leaked',
    summary: 'Model weights for an unreleased openai model appeared briefly on HuggingFace before being removed.',
    impact: 'HIGH',
    category: 'Model Releases',
    affects: ['openai-api', 'research'],
    date: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Anthropic Introduces Prompt Caching',
    summary: 'New API feature allows caching of context window segments, reducing costs by up to 90% for repeated prompts.',
    impact: 'MEDIUM',
    category: 'API Changes',
    affects: ['anthropic-api', 'cost-optimization'],
    date: new Date(Date.now() - 3600000).toISOString()
  }
]

export function Home() {
  const [previewData, setPreviewData] = useState<FeedEntry[]>([])

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const url = import.meta.env.VITE_API_URL || 'http://localhost:4200'
        const response = await fetch(`${url}/api/latest?limit=2`)
        if (!response.ok) throw new Error('API Error')
        const data = await response.json()
        setPreviewData(data.slice(0, 2))
      } catch (err) {
        setPreviewData(FALLBACK_PREVIEW)
      }
    }
    fetchPreview()
  }, [])

  return (
    <div className="relative overflow-hidden bg-[#09090b]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
            <span className="flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">System Operational - 24/7 Intel</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            AI intelligence feed <br />
            <span className="text-zinc-500">for builders.</span>
          </h1>
          
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop polling Twitter and reading changelogs. Recon monitors the AI ecosystem, structures the updates, and pipes them directly into your agent's context.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/pricing"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-black bg-white rounded hover:bg-zinc-200 transition-colors"
            >
              Get API Key
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link 
              to="/feed"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-white bg-[#18181b] border border-white/10 rounded hover:bg-[#27272a] transition-colors"
            >
              View Live Feed
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Live Feed Preview */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-mono text-zinc-300">GET /api/latest</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">Sub-50ms latency</span>
          </div>
          <div className="p-6 space-y-4">
            {previewData.map((entry, i) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${
                    entry.impact === 'HIGH' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    entry.impact === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    {entry.impact} IMPACT
                  </span>
                  <span className="text-[10px] font-mono text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded border border-teal-400/20 uppercase tracking-wider">
                    {entry.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{entry.title}</h3>
                <p className="text-sm text-zinc-400 mb-3">{entry.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {entry.affects.map(target => (
                    <span key={target} className="text-[10px] font-mono text-zinc-500 bg-black px-2 py-1 rounded border border-white/5">
                      {target}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="relative border-t border-white/5 bg-[#09090b] pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Tactical Pricing</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Simple tiers for developers and autonomous systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Hobby Tier */}
            <div className="p-8 rounded-2xl border border-white/10 bg-[#18181b] relative">
              <h3 className="text-xl font-semibold text-white mb-2">Developer</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <p className="text-zinc-400 mb-8 text-sm">Perfect for testing and personal side projects.</p>
              
              <ul className="space-y-4 mb-8">
                {[
                  '100 API requests / day',
                  'Standard latency',
                  'Community support',
                  'Web feed access'
                ].map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors">
                Start Free
              </button>
            </div>

            {/* Pro Tier */}
            <div className="p-8 rounded-2xl border border-sky-500/30 bg-[#18181b] relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-sky-500/10 border-b border-l border-sky-500/20 rounded-bl-lg">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">Production</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Agent Fleet</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <p className="text-zinc-400 mb-8 text-sm">For autonomous systems operating at scale.</p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited API requests',
                  'Priority low-latency routing',
                  'Webhooks & WebSocket access',
                  'Enterprise support'
                ].map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-3 text-sm font-semibold text-black bg-white hover:bg-zinc-200 rounded transition-colors">
                Deploy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}