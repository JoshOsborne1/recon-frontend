import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertTriangle, RefreshCw, Filter, ExternalLink, Activity } from 'lucide-react'

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
    title: 'OpenAI Drops GPT-5 API Pricing',
    summary: 'Input token cost reduced by 50% across all GPT-5 endpoints. Output remains unchanged. Bulk batch processing discounts increased to 60%.',
    impact: 'HIGH',
    category: 'Pricing',
    affects: ['openai-api', 'gpt-5'],
    action_required: 'No code changes required. Billing will reflect automatically.',
    date: new Date().toISOString(),
    source: 'openai.com/blog',
    sourceUrl: 'https://openai.com'
  },
  {
    id: '2',
    title: 'Anthropic Context Window Update',
    summary: 'Claude 3.5 Sonnet now supports up to 500k context window in early preview. Requires specific header flag during API calls.',
    impact: 'MEDIUM',
    category: 'Model Releases',
    affects: ['anthropic-api', 'claude-3-5'],
    date: new Date(Date.now() - 3600000).toISOString(),
    source: 'anthropic.com/news',
    sourceUrl: 'https://anthropic.com'
  },
  {
    id: '3',
    title: 'LangChain v0.2.0 Breaking Changes',
    summary: 'Major structural changes to callback handlers and agent executor paths. Legacy chains are now officially deprecated.',
    impact: 'HIGH',
    category: 'Framework Updates',
    affects: ['langchain', 'python'],
    action_required: 'Migration guide: v0.1 to v0.2 requires updating callback imports and rewriting custom executor loops.',
    date: new Date(Date.now() - 7200000).toISOString(),
    source: 'github.com/langchain-ai',
    sourceUrl: 'https://github.com'
  },
  {
    id: '4',
    title: 'New Prompt Injection Technique Disclosed',
    summary: 'Researchers published a paper detailing "Context Overflow" attacks that bypass standard system prompt constraints in leading OSS models.',
    impact: 'HIGH',
    category: 'Security',
    affects: ['llama-3', 'mistral', 'oss-models'],
    date: new Date(Date.now() - 86400000).toISOString(),
    source: 'arxiv.org',
    sourceUrl: 'https://arxiv.org'
  },
  {
    id: '5',
    title: 'Vercel AI SDK v3.1 Released',
    summary: 'Adds native support for streaming tool calls and improves React Server Components integration.',
    impact: 'LOW',
    category: 'Framework Updates',
    affects: ['vercel-ai-sdk', 'react'],
    date: new Date(Date.now() - 172800000).toISOString(),
    source: 'vercel.com/changelog',
    sourceUrl: 'https://vercel.com'
  }
]

export function Feed() {
  const [entries, setEntries] = useState<FeedEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [impact, setImpact] = useState<'ALL' | ImpactLevel>('ALL')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchFeed = async () => {
    setIsRefreshing(true)
    setError(null)
    try {
      const url = import.meta.env.VITE_API_URL || 'http://localhost:4200'
      const response = await fetch(`${url}/api/latest?hours=168`)
      
      if (!response.ok) throw new Error('API Error')
      
      const data = await response.json()
      setEntries(data)
    } catch (err) {
      // Silently fall back to cached data
      setEntries(FALLBACK_DATA)
      if (entries.length === 0) {
        setError('Live API unreachable. Showing cached data.')
      }
    } finally {
      setLoading(false)
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  useEffect(() => {
    fetchFeed()
    const interval = setInterval(fetchFeed, 60000) // 1 min auto-refresh
    return () => clearInterval(interval)
  }, [])

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(search.toLowerCase()) || 
                          entry.summary.toLowerCase().includes(search.toLowerCase()) ||
                          entry.affects.some(a => a.toLowerCase().includes(search.toLowerCase()))
    const matchesCat = category === 'All' || entry.category === category
    const matchesImpact = impact === 'ALL' || entry.impact === impact
    return matchesSearch && matchesCat && matchesImpact
  })

  // Group by date
  const groupedEntries = filteredEntries.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
    if (!acc[date]) acc[date] = []
    acc[date].push(entry)
    return acc
  }, {} as Record<string, FeedEntry[]>)

  return (
    <div className="min-h-screen bg-[#09090b] pt-8 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">Intelligence Feed</h1>
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-medium text-emerald-400 uppercase tracking-wider">Live</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400">Real-time updates across the AI ecosystem.</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Activity className="w-3.5 h-3.5" />
            <span>Updated: {new Date().toLocaleTimeString()}</span>
            <button 
              onClick={fetchFeed}
              className="ml-2 p-1.5 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
              title="Force refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 mb-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500/90 text-sm"
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 p-1 rounded-lg bg-[#18181b] border border-white/5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text"
              placeholder="Search by keyword or affected system..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
            />
          </div>
          
          <div className="h-px sm:h-auto sm:w-px bg-white/5 mx-2 my-1 sm:my-2" />
          
          <div className="flex gap-2 p-1">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="bg-transparent border-none px-3 py-1.5 text-sm text-zinc-300 focus:outline-none hover:bg-white/5 rounded cursor-pointer appearance-none"
            >
              <option value="All">All Categories</option>
              <option value="Model Releases">Models</option>
              <option value="API Changes">APIs</option>
              <option value="Framework Updates">Frameworks</option>
              <option value="Research">Research</option>
              <option value="Security">Security</option>
              <option value="Pricing">Pricing</option>
            </select>

            <select 
              value={impact}
              onChange={(e) => setImpact(e.target.value as any)}
              className="bg-transparent border-none px-3 py-1.5 text-sm text-zinc-300 focus:outline-none hover:bg-white/5 rounded cursor-pointer appearance-none"
            >
              <option value="ALL">All Impacts</option>
              <option value="HIGH">High Impact</option>
              <option value="MEDIUM">Medium Impact</option>
              <option value="LOW">Low Impact</option>
            </select>
          </div>
        </div>

        {/* Feed List */}
        <div className="space-y-12">
          {Object.entries(groupedEntries).map(([date, dayEntries]) => (
            <div key={date} className="relative">
              {/* Date Header */}
              <div className="sticky top-16 z-10 py-2 bg-[#09090b]/90 backdrop-blur-md mb-4 -mx-2 px-2 flex items-center gap-4">
                <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">{date}</h2>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="space-y-4">
                {dayEntries.map((entry, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={entry.id}
                    className="group p-5 sm:p-6 rounded-xl bg-[#18181b] border border-white/5 hover:border-white/10 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${
                          entry.impact === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          entry.impact === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}>
                          {entry.impact}
                        </span>
                        <span className="text-[10px] font-mono font-medium text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded border border-teal-400/20 uppercase tracking-wider">
                          {entry.category}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-zinc-500">
                        {new Date(entry.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-100 mb-2 leading-tight">
                      {entry.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-zinc-400 mb-4 leading-relaxed">
                      {entry.summary}
                    </p>

                    {entry.action_required && (
                      <div className="mb-4 p-3 rounded bg-amber-500/5 border border-amber-500/10 text-sm">
                        <div className="flex gap-2 text-amber-400/90">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <p><span className="font-semibold text-amber-400">Action Required:</span> {entry.action_required}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 mt-2 border-t border-white/5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {entry.affects.map(target => (
                          <span key={target} className="text-[10px] text-zinc-400 bg-black px-2 py-1 rounded border border-white/5 font-mono">
                            {target}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={entry.sourceUrl || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-white transition-colors group/link"
                      >
                        {entry.source}
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover/link:opacity-100" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {filteredEntries.length === 0 && !loading && (
            <div className="text-center py-24 px-4 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
              <Filter className="w-8 h-8 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-zinc-300 mb-1">No intelligence found</h3>
              <p className="text-sm text-zinc-500">Adjust your filters to see more updates.</p>
              <button 
                onClick={() => { setSearch(''); setCategory('All'); setImpact('ALL'); }}
                className="mt-4 text-sm text-teal-400 hover:text-teal-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}