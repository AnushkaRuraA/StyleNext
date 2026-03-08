import Link from "next/link";

export default function GetStarted() {
  return (
    <div className="relative min-h-screen bg-[#050511] text-white overflow-hidden font-sans selection:bg-fuchsia-500/30">
      {/* Background Gradients */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[150px] pointer-events-none" />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Navbar Container */}
      <nav className="relative z-20 w-full flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 flex items-center justify-center p-2 shadow-lg shadow-fuchsia-500/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </div>
          <span className="font-semibold tracking-wide text-slate-300 group-hover:text-white transition-colors">Back to Home</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-400">
          <span className="cursor-pointer hover:text-white transition-colors">Platform</span>
          <span className="cursor-pointer hover:text-white transition-colors">Salons</span>
          <span className="cursor-pointer hover:text-white transition-colors">Pricing</span>
        </div>
      </nav>

      {/* Main Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 text-center pb-20">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(217,70,239,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-indigo-400 flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-fuchsia-400">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            Now onboarding new partners
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 max-w-5xl leading-[1.1]">
          <span className="block text-white">Stylenext Platform</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 pb-2">
            for your local salons.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 font-medium leading-relaxed">
          Elevate your salon&apos;s digital presence. Manage bookings, engage clients, and grow your local business with our cutting-edge unified platform.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center sm:w-auto">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Join the Network
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 text-white font-semibold hover:bg-slate-800 hover:border-slate-700 transition-all">
            View Live Demo
          </button>
        </div>

        {/* Bottom Feature Cards/Metrics */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {[
            { 
              metric: "10k+", 
              label: "Salons Onboarded", 
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-fuchsia-400">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )
            },
            { 
              metric: "2.5M", 
              label: "Monthly Bookings", 
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-fuchsia-400">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
              )
            },
            { 
              metric: "99.9%", 
              label: "Platform Uptime", 
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-fuchsia-400">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              )
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/60 transition-colors group cursor-pointer z-10 relative">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner shadow-white/5">
                {item.icon}
              </div>
              <span className="text-2xl font-bold text-white mb-1 group-hover:text-fuchsia-300 transition-colors">{item.metric}</span>
              <span className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{item.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
