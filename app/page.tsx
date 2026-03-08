import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-50 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Logo/Icon Container */}
        <div className="mb-10 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center p-3 shadow-2xl shadow-blue-500/20">
            <Image
              className="invert"
              src="/next.svg"
              alt="StyleNext logo"
              width={40}
              height={40}
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Hello, Users
          </h1>

          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Welcome to the future of design. Our cutting-edge interface brings you a premium experience like never before.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/get-started" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
              Get Started
            </Link>
            <button className="px-8 py-4 rounded-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 text-slate-300 font-semibold hover:bg-slate-800 transition-all transform hover:scale-105 active:scale-95">
              Learn More
            </button>
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="mt-20 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/40 backdrop-blur-sm text-sm text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Designing the next generation of web applications.
        </div>
      </main>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
    </div>
  );
}
