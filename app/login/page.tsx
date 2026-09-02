"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

function LightningMark({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="boltBlueLogin" x1="20" y1="10" x2="70" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4FA8FF" />
          <stop offset="1" stopColor="#1B4F91" />
        </linearGradient>
        <linearGradient id="boltOrangeLogin" x1="30" y1="45" x2="65" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFAE5C" />
          <stop offset="1" stopColor="#EB5424" />
        </linearGradient>
      </defs>
      <path d="M52 8L26 52H46L40 92L76 42H54L52 8Z" fill="url(#boltBlueLogin)" opacity="0.95" />
      <path d="M46 40L32 68H44L40 92L64 56H50L46 40Z" fill="url(#boltOrangeLogin)" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: brancher sur la vraie authentification Supabase
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      await new Promise((r) => setTimeout(r, 900));
      router.push("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070B18] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#2F80ED]/20 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#EB5424]/20 blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <a href="/" className="mb-4">
            <LightningMark size={48} />
          </a>
          <h1 className="font-bold text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            SAM<span className="text-[#2F80ED]">_</span><span className="text-[#F2994A]">FLASH</span>
          </h1>
          <p className="text-white/50 text-sm mt-1">Connecte-toi pour continuer</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          {error && (
            <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <label className="block text-xs font-medium text-white/60 mb-1.5">Email</label>
          <div className="relative mb-4">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="toi@exemple.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-[#2F80ED]/60 transition-colors placeholder:text-white/25"
            />
          </div>

          <label className="block text-xs font-medium text-white/60 mb-1.5">Mot de passe</label>
          <div className="relative mb-2">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm outline-none focus:border-[#2F80ED]/60 transition-colors placeholder:text-white/25"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="text-right mb-5">
            <a href="/forgot-password" className="text-xs text-white/40 hover:text-white/70">
              Mot de passe oublié ?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full font-semibold text-sm px-5 py-3 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#EB5424] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"} {!loading && <ArrowRight size={15} />}
          </motion.button>
        </form>

        <p className="text-center text-sm text-white/40 mt-5">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-[#4FA8FF] hover:underline font-medium">
            Créer un compte
          </a>
        </p>
      </motion.div>
    </div>
  );
}
