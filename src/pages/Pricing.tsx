import { Check, Star } from 'lucide-react'

export function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-white mb-6">Simple, transparent pricing</h1>
        <p className="text-xl text-zinc-400">
          Start building for free. Upgrade when your agents need real-time streams.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {/* Free Tier */}
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-2">Developer</h3>
          <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
          <p className="text-zinc-400 mb-8">Perfect for testing and personal projects.</p>
          
          <ul className="space-y-4 mb-8 flex-1">
            {[
              '100 API calls / day',
              'Basic search filters',
              '24-hour data delay',
              'Community support'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-zinc-600 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="w-full py-3 rounded-lg font-medium bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10">
            Get Started Free
          </button>
        </div>

        {/* Pro Tier */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-sky-900/20 to-transparent border border-sky-500/30 flex flex-col relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-full">
            MOST POPULAR
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Production</h3>
          <div className="text-4xl font-bold text-white mb-6">$29<span className="text-lg text-sky-200/50 font-normal">/mo</span></div>
          <p className="text-zinc-400 mb-8">For live agents and production workflows.</p>
          
          <ul className="space-y-4 mb-8 flex-1">
            {[
              'Unlimited API calls',
              'Sub-50ms live updates',
              'All advanced filters',
              'Webhook integrations',
              'Email & Discord support'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-sky-400 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="w-full py-3 rounded-lg font-medium bg-sky-500 text-white hover:bg-sky-400 transition-colors shadow-[0_0_20px_rgba(14,165,233,0.3)]">
            Upgrade to Pro
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
          <div className="text-4xl font-bold text-white mb-6">Custom</div>
          <p className="text-zinc-400 mb-8">For platforms needing custom intelligence.</p>
          
          <ul className="space-y-4 mb-8 flex-1">
            {[
              'White-label options',
              'Custom data sources',
              'Dedicated account manager',
              '99.99% SLA',
              'Private Slack channel'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-zinc-600 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="w-full py-3 rounded-lg font-medium bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10">
            Contact Sales
          </button>
        </div>
      </div>

      {/* Featured Slots */}
      <div className="relative p-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-purple-500/20">
        <div className="p-8 md:p-12 rounded-[14px] bg-[#09090b] text-center">
          <Star className="w-8 h-8 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Sponsor the Feed</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Get your AI product, model, or tool in front of 10,000+ agent developers who monitor Recon daily.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-left">
              <div className="text-2xl font-bold text-white">$2,000<span className="text-sm font-normal text-zinc-500">/mo</span></div>
              <div className="text-sm text-zinc-400">Fixed Monthly Placement</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10"></div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">$50<span className="text-sm font-normal text-zinc-500"> CPM</span></div>
              <div className="text-sm text-zinc-400">Pay per impression</div>
            </div>
          </div>
          <button className="mt-8 px-8 py-3 rounded-lg font-medium bg-white text-black hover:bg-zinc-200 transition-colors">
            Book a Slot
          </button>
        </div>
      </div>
    </div>
  )
}