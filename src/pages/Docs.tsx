import { useState } from 'react'
import { Check, Copy, ChevronRight, BookOpen, Key, Terminal } from 'lucide-react'

const endpoints = [
  {
    method: 'GET',
    path: '/api/latest',
    desc: 'Retrieve the most recent intelligence updates across the ecosystem.',
    params: [
      { name: 'limit', type: 'number', desc: 'Max entries to return (default: 50, max: 100)' },
      { name: 'hours', type: 'number', desc: 'Lookback window in hours (default: 24)' }
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
    desc: 'Search the historical intelligence database.',
    params: [
      { name: 'q', type: 'string', desc: 'Search query (required)' },
      { name: 'impact', type: 'string', desc: 'Filter by HIGH, MEDIUM, LOW' },
      { name: 'target', type: 'string', desc: 'Filter by affected system (e.g. "openai-api")' }
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
    <div className="relative group rounded-lg bg-[#18181b] border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#09090b]">
        <span className="text-xs text-zinc-500 font-mono lowercase">{lang}</span>
        <button 
          onClick={() => copyToClipboard(code, id)}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          {copied === id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#09090b] pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-4">Documentation</h3>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('auth')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-colors ${activeTab === 'auth' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Authentication
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('endpoints')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-colors ${activeTab === 'endpoints' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  API Endpoints
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('schema')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-colors ${activeTab === 'schema' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Data Schema
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">API Reference</h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Programmatic access to the Recon intelligence feed. Build agents that know about API changes before they break.
            </p>
          </div>

          {activeTab === 'auth' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-semibold text-white mb-6">Authentication</h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                All requests to the Recon API require an API key. Pass your key in the <code className="text-xs font-mono bg-white/10 px-1.5 py-0.5 rounded text-zinc-300">X-API-Key</code> HTTP header.
              </p>
              
              <div className="mb-8">
                <CodeBlock 
                  id="curl-auth"
                  lang="bash"
                  code={`curl -X GET https://api.recon.ai/api/latest \\
  -H "X-API-Key: rec_live_your_key_here"`} 
                />
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h4 className="text-sm font-semibold text-amber-500 mb-1">Rate Limiting</h4>
                <p className="text-sm text-amber-400/90">
                  Developer tier is limited to 100 requests per day. The Agent Fleet tier offers unlimited requests with burst tolerance.
                </p>
              </div>
            </section>
          )}

          {activeTab === 'endpoints' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
              <h2 className="text-2xl font-semibold text-white mb-6">Endpoints</h2>
              
              {endpoints.map((ep, i) => (
                <div key={i} className="scroll-mt-24" id={ep.path.replace('/', '')}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 rounded text-xs font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {ep.method}
                    </span>
                    <h3 className="text-xl font-mono font-semibold text-white">{ep.path}</h3>
                  </div>
                  
                  <p className="text-zinc-400 mb-6">{ep.desc}</p>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-100 mb-4 border-b border-white/10 pb-2">Query Parameters</h4>
                      <ul className="space-y-4">
                        {ep.params.map(p => (
                          <li key={p.name} className="text-sm">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="font-mono text-teal-400">{p.name}</span>
                              <span className="font-mono text-xs text-zinc-500">{p.type}</span>
                            </div>
                            <span className="text-zinc-400">{p.desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-100 mb-4 border-b border-white/10 pb-2">Response Example</h4>
                      <CodeBlock id={`res-${i}`} lang="json" code={ep.res} />
                    </div>
                  </div>
                  
                  {i < endpoints.length - 1 && <hr className="mt-12 border-white/10" />}
                </div>
              ))}
            </section>
          )}

          {activeTab === 'schema' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-semibold text-white mb-6">Entry Object</h2>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Every intelligence update returned by the API follows a strict JSON schema designed for easy parsing by LLMs and autonomous agents.
              </p>
              
              <div className="bg-[#18181b] rounded-lg border border-white/10 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#09090b] border-b border-white/10">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-zinc-300">Field</th>
                      <th className="px-6 py-3 font-semibold text-zinc-300">Type</th>
                      <th className="px-6 py-3 font-semibold text-zinc-300">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { f: 'id', t: 'string', d: 'Unique identifier for the entry, prefixed with evt_' },
                      { f: 'title', t: 'string', d: 'Concise headline of the update' },
                      { f: 'summary', t: 'string', d: 'Detailed explanation of what changed' },
                      { f: 'impact', t: 'enum', d: '"HIGH" | "MEDIUM" | "LOW"' },
                      { f: 'category', t: 'string', d: 'e.g., "Model Releases", "API Changes", "Security"' },
                      { f: 'affects', t: 'string[]', d: 'Array of target systems (e.g., ["openai-api", "python"])' },
                      { f: 'action_required', t: 'string | null', d: 'Specific migration steps if breaking change' },
                      { f: 'date', t: 'string (ISO 8601)', d: 'When the event occurred' },
                      { f: 'source', t: 'string', d: 'Display name of the origin (e.g., "github.com")' },
                      { f: 'sourceUrl', t: 'string', d: 'Direct link to the origin announcement or commit' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-mono text-teal-400 whitespace-nowrap">{row.f}</td>
                        <td className="px-6 py-4 font-mono text-zinc-500 whitespace-nowrap">{row.t}</td>
                        <td className="px-6 py-4 text-zinc-400">{row.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  )
}