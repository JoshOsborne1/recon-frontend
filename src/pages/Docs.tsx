import { useState } from 'react'
import { Check, Copy, Key, Terminal, Database, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const endpoints = [
  {
    method: 'GET',
    path: '/api/latest',
    desc: 'Retrieve the most recent intelligence updates across the ecosystem. Cached at edge for sub-50ms response.',
    params: [
      { name: 'limit', type: 'integer', req: false, desc: 'Max entries to return (default: 50, max: 100)' },
      { name: 'hours', type: 'integer', req: false, desc: 'Lookback window in hours (default: 24)' }
    ],
    res: `[
  {
    "id": "evt_01H4F",
    "title": "Anthropic 500k Context Preview",
    "summary": "Claude 3.5 Sonnet now supports...",
    "impact": "MEDIUM",
    "category": "Model Releases",
    "affects": ["anthropic-api", "claude-3-5"],
    "date": "2024-03-10T14:30:00Z"
  }
]`
  },
  {
    method: 'GET',
    path: '/api/search',
    desc: 'Query the historical intelligence database. Supports Lucene-style syntax for advanced filtering.',
    params: [
      { name: 'q', type: 'string', req: true, desc: 'Search query (e.g. "openai AND breaking")' },
      { name: 'impact', type: 'enum', req: false, desc: 'Filter by HIGH, MEDIUM, LOW' },
      { name: 'target', type: 'string', req: false, desc: 'Filter by affected system (e.g. "langchain")' }
    ],
    res: `// Returns array of Entry objects`
  }
]

export function Docs() {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('endpoints')

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const CodeBlock = ({ code, id, lang = 'bash' }: { code: string, id: string, lang?: string }) => (
    <div className="relative group bg-black border border-white/10 overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
          <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
          <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
          <span className="ml-2 text-xs text-zinc-500 lowercase">{lang}</span>
        </div>
        <button 
          onClick={() => copyToClipboard(code, id)}
          className="text-zinc-500 hover:text-[#0ff] transition-colors"
        >
          {copied === id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[#0ff]/80">
        <code>{code}</code>
      </pre>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-24 relative">
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 relative z-10">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10 text-[#0ff]">
              <Activity className="w-4 h-4" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest">SYS_DOCS</h3>
            </div>
            
            <nav className="space-y-2 font-mono text-sm">
              <button 
                onClick={() => setActiveTab('auth')}
                className={`w-full flex items-center gap-3 px-3 py-2 transition-all ${activeTab === 'auth' ? 'bg-[#0ff]/10 text-[#0ff] border-l-2 border-[#0ff]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border-l-2 border-transparent'}`}
              >
                <Key className="w-4 h-4" />
                AUTH
              </button>
              <button 
                onClick={() => setActiveTab('endpoints')}
                className={`w-full flex items-center gap-3 px-3 py-2 transition-all ${activeTab === 'endpoints' ? 'bg-[#0ff]/10 text-[#0ff] border-l-2 border-[#0ff]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border-l-2 border-transparent'}`}
              >
                <Terminal className="w-4 h-4" />
                ENDPOINTS
              </button>
              <button 
                onClick={() => setActiveTab('schema')}
                className={`w-full flex items-center gap-3 px-3 py-2 transition-all ${activeTab === 'schema' ? 'bg-[#0ff]/10 text-[#0ff] border-l-2 border-[#0ff]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border-l-2 border-transparent'}`}
              >
                <Database className="w-4 h-4" />
                SCHEMA
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-8 md:p-12">
          
          <AnimatePresence mode="wait">
            {activeTab === 'auth' && (
              <motion.section 
                key="auth"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">Authorization</h2>
                <p className="text-zinc-400 mb-8 font-mono text-sm leading-relaxed">
                  All requests to the Recon Core must be authenticated. Transmit your access token via the <code className="text-[#0ff] bg-[#0ff]/10 px-1 py-0.5">Authorization</code> header.
                </p>
                
                <div className="mb-10">
                  <CodeBlock 
                    id="curl-auth"
                    lang="bash"
                    code={`curl -X GET https://api.recon-core.ai/api/latest \\
  -H "Authorization: Bearer rec_live_****************"`} 
                  />
                </div>

                <div className="p-5 bg-red-500/5 border border-red-500/20 flex gap-4">
                  <div className="mt-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0" />
                  <div>
                    <h4 className="text-sm font-mono font-bold text-red-500 mb-2 uppercase">Rate Limits Enforced</h4>
                    <p className="text-sm text-red-200/70 font-mono">
                      Unauthenticated requests will drop immediately (401). Developer tiers are hard-capped at 100 req/day. Exceeding limits returns 429 Too Many Requests.
                    </p>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'endpoints' && (
              <motion.section 
                key="endpoints"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-16"
              >
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Core Endpoints</h2>
                  <p className="text-sm font-mono text-zinc-500">BASE_URL: https://api.recon-core.ai</p>
                </div>
                
                {endpoints.map((ep, i) => (
                  <div key={i} className="relative">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 text-xs font-mono font-bold bg-[#0ff] text-black">
                        {ep.method}
                      </span>
                      <h3 className="text-xl font-mono font-bold text-white tracking-tight">{ep.path}</h3>
                    </div>
                    
                    <p className="text-zinc-400 mb-8 font-mono text-sm leading-relaxed">{ep.desc}</p>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Parameters</h4>
                        <ul className="space-y-4 font-mono text-sm">
                          {ep.params.map(p => (
                            <li key={p.name} className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[#0ff] font-bold">{p.name}</span>
                                <span className="text-xs text-zinc-600">{p.type}</span>
                                {p.req && <span className="text-[10px] bg-red-500/20 text-red-400 px-1 py-0.5">REQ</span>}
                              </div>
                              <span className="text-zinc-500 text-xs">{p.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Response</h4>
                        <CodeBlock id={`res-${i}`} lang="json" code={ep.res} />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.section>
            )}

            {activeTab === 'schema' && (
              <motion.section 
                key="schema"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">Data Structure</h2>
                <p className="text-zinc-400 mb-8 font-mono text-sm leading-relaxed">
                  Strict typing enforced. Unrecognized fields are stripped at the edge. Designed for deterministic LLM parsing.
                </p>
                
                <div className="border border-white/10 bg-black overflow-x-auto">
                  <table className="w-full text-left font-mono text-sm">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-4 py-3 text-zinc-400 font-normal">Key</th>
                        <th className="px-4 py-3 text-zinc-400 font-normal">Type</th>
                        <th className="px-4 py-3 text-zinc-400 font-normal">Definition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { f: 'id', t: 'string', d: 'Unique prefix string (evt_)' },
                        { f: 'title', t: 'string', d: 'Primary descriptor' },
                        { f: 'summary', t: 'string', d: 'Detailed payload' },
                        { f: 'impact', t: '"HIGH" | "MEDIUM" | "LOW"', d: 'Severity classification' },
                        { f: 'category', t: 'string', d: 'Routing vector' },
                        { f: 'affects', t: 'string[]', d: 'Target system identifiers' },
                        { f: 'action_required', t: 'string | null', d: 'Mandatory mitigation steps' },
                        { f: 'date', t: 'ISO 8601', d: 'Chronological anchor' }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-4 py-4 text-[#0ff] group-hover:pl-6 transition-all">{row.f}</td>
                          <td className="px-4 py-4 text-zinc-500">{row.t}</td>
                          <td className="px-4 py-4 text-zinc-400">{row.d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}