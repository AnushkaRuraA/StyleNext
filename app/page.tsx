"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import logger from "@/utils/logger";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    logger.info("Admin login page mounted");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const startTime = Date.now();

    try {
      logger.info(`Attempting login for user: ${username}`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const endTime = Date.now();
      
      logger.api("POST", "/api/admin/login", response.status, endTime - startTime);

      if (data.success) {
        logger.success("Login successful, redirecting...");
        // Set cookie manually
        document.cookie = `admin_token=${data.token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
        
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        logger.warn(`Login failed: ${data.message}`);
        setError(data.message || "Invalid credentials");
      }
    } catch (err: any) {
      logger.error("Login attempt error:", err);
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#040D15]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#B28D5A]/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#BA6A58]/10 blur-[120px] animate-pulse" />
      
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
            backgroundImage: 'radial-gradient(#B28D5A 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }} 
      />

      <div className="relative w-full max-w-md px-6">
        {/* Logo/Brand Area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B28D5A] to-[#5C4011] mb-6 shadow-2xl shadow-gold/20 transform hover:rotate-6 transition-transform">
             <span className="text-3xl font-bold text-white tracking-tighter italic">SN</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#FDFBF7] tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-[#FDFBF7]/60 font-medium">
            Enter your administrative credentials.
          </p>
        </div>

        {/* Login Card */}
        <div className="relative group">
          {/* Card Border Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B28D5A]/50 to-[#BA6A58]/50 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-[#0A1F32]/80 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl overflow-hidden">
            
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B28D5A] uppercase tracking-widest ml-1">
                  Username
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-[#FDFBF7]/30 group-focus-within/input:text-[#B28D5A] transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 text-white pl-11 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B28D5A]/50 focus:border-[#B28D5A] transition-all placeholder:text-white/10"
                    placeholder="admin_username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B28D5A] uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-[#FDFBF7]/30 group-focus-within/input:text-[#B28D5A] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 text-white pl-11 pr-12 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B28D5A]/50 focus:border-[#B28D5A] transition-all placeholder:text-white/10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#FDFBF7]/30 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group/btn relative flex items-center justify-center py-4 bg-gradient-to-r from-[#B28D5A] to-[#9E7D50] text-[#FDFBF7] font-bold rounded-2xl shadow-lg shadow-gold/10 hover:shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-[#FDFBF7]/30 text-sm font-medium tracking-wide">
          © 2026 StyleNext Admin • Secure Infrastructure
        </p>
      </div>
    </div>
  );
}
