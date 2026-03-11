import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Activity } from 'lucide-react'
import { Home } from './pages/Home'
import { Feed } from './pages/Feed'
import { Docs } from './pages/Docs'
import { Pricing } from './pages/Pricing'
import { Skill } from './pages/Skill'

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-sky-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-md bg-white/5 ring-1 ring-white/10 group-hover:ring-sky-500/50 transition-all">
                <Activity className="w-5 h-5 text-sky-400" />
              </div>
              <span className="font-semibold text-zinc-100 tracking-tight">Recon</span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              {[
                { path: '/', label: 'Home' },
                { path: '/feed', label: 'Feed' },
                { path: '/docs', label: 'Docs' },
                { path: '/skill', label: 'Skill' },
                { path: '/pricing', label: 'Pricing' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === path 
                      ? 'text-white' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center">
              <Link 
                to="/pricing"
                className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-zinc-200 transition-colors"
              >
                Get API Key
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
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
