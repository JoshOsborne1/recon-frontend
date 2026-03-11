import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Activity, Terminal } from 'lucide-react'
import { Home } from './pages/Home'
import { Feed } from './pages/Feed'
import { Docs } from './pages/Docs'
import { Pricing } from './pages/Pricing'
import { Skill } from './pages/Skill'

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans">
      <div className="scanlines"></div>
      <div className="crt-noise"></div>
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-md">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ff]/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#0ff]/20 blur-md rounded-full group-hover:bg-[#0ff]/40 transition-all duration-500"></div>
                <Activity className="w-5 h-5 text-[#0ff] relative z-10" />
              </div>
              <span className="font-mono font-bold tracking-widest text-white text-sm uppercase">RECON_OS</span>
              <div className="hidden sm:flex items-center gap-2 ml-4 px-2 py-0.5 bg-white/[0.03] border border-white/[0.05] rounded text-[10px] font-mono text-[#0ff]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0ff] animate-pulse"></div>
                SYS.ONLINE
              </div>
            </Link>
            
            <div className="hidden md:flex space-x-1 font-mono text-xs uppercase tracking-wider">
              {[
                { path: '/', label: 'SYS_INIT' },
                { path: '/feed', label: 'LIVE_FEED' },
                { path: '/docs', label: 'API_DOCS' },
                { path: '/skill', label: 'MOD_SKILL' },
                { path: '/pricing', label: 'ACCESS' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 transition-all duration-300 ${
                    location.pathname === path 
                      ? 'text-[#0ff] bg-white/[0.03] border-b border-[#0ff]' 
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
                  }`}
                >
                  [{label}]
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-[10px] font-mono text-zinc-600 hidden lg:block">
                {new Date().toISOString().split('T')[0]} // {new Date().toLocaleTimeString('en-US', {hour12:false})}
              </div>
              <Link 
                to="/pricing"
                className="group relative px-4 py-1.5 bg-[#0ff]/10 border border-[#0ff]/30 text-[#0ff] font-mono text-xs uppercase tracking-wider hover:bg-[#0ff]/20 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 w-0 bg-[#0ff]/10 group-hover:w-full transition-all duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  INIT_KEY
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Frame decoration */}
      <div className="fixed top-0 left-0 w-2 h-full border-r border-white/[0.05] z-30 hidden md:block">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#0ff]/10 to-transparent"></div>
      </div>
      <div className="fixed top-0 right-0 w-2 h-full border-l border-white/[0.05] z-30 hidden md:block">
        <div className="absolute top-[30%] -translate-y-1/2 left-0 w-full h-16 bg-gradient-to-b from-transparent via-red-500/10 to-transparent"></div>
      </div>

      {/* Main Content */}
      <main className="pt-14 relative z-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/skill" element={<Skill />} />
        </Routes>
      </main>
    </div>
  )
}

export default App