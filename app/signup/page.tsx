"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from "lucide-react";

function LightningMark({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="boltBlueSignup" x1="20" y1="10" x2="70" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4FA8FF" />
          <stop offset="1" stopColor="#1B4F91" />
        </linearGradient>
        <linearGradient id="boltOrangeSignup" x1="30" y1="45" x2="65" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFAE5C" />
          <stop offset="1" stopColor="#EB5424" />
        </linearGradient>
      </defs>
      <path d="M52 8L26 52H46L40 92L76 42H54L52 8Z" fill="url(#boltBlueSignup)" opacity="0.95" />
      <path d="M46 40L32 68H44L40 92L64 56H50L46 40Z" fill="url(#boltOrangeSignup)" />
    </svg>
  );
}

const COUNTRIES = [
  { code: "TG", name: "Togo", currency: "XOF" },
  { code: "CI", name: "Côte d'Ivoire", currency: "XOF" },
  { code: "SN", name: "Sénégal", currency: "XOF" },
  { code: "BJ", name: "Bénin", currency: "XOF" },
  { code: "BF", name: "Burkina Faso", currency: "XOF" },
  { code: "ML", name: "Mali", currency: "XOF" },
  { code: "CM", name: "Cameroun", currency: "XAF" },
  { code: "CD", name: "RD Congo", currency: "CDF" },
  { code: "OTHER", name: "Autre pays", currency: "USD" },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("TG");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordChecks = {
    length: password.length >= 8,
    number: /\d/.test(password),
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!passwordChecks.length || !passwordChecks.number) {
      setError("Le mot de passe doit contenir au moins 8 caractères et un chiffre.");
      return;
    }

    setLoading(true);
    try {
      // TODO: brancher sur la vraie inscription Supabase
      // const { data, error } = await supabase.auth.signUp({
      //   email, password,
      //   options: { data: { full_name: fullName, country } }
      // })
      await new Promise((r) => setTimeout(r, 900));
      console.log("Inscription simulée :", { fullName, email, country });
    } catch (err) {
      setError("Une erreur est survenue. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070B18] text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">
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
          <p className="text-white/50 text-sm mt-1">Crée ton compte en 30 secondes</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          {error && (
            <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <label className="block text-xs font-medium text-white/60 mb-1.5">Nom complet</label>
          <div className="relative mb-4">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ton nom"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-[#2F80ED]/60 transition-colors placeholder:text-white/25"
            />
          </div>

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

          <label className="block text-xs font-medium text-white/60 mb-1.5">Pays</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2F80ED]/60 transition-colors mb-4 [&>option]:bg-[#0B1128]"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.currency})
              </option>
            ))}
          </select>

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

          {password.length > 0 && (
            <div className="flex gap-3 mb-4 text-[11px]">
              <span className={`flex items-center gap-1 ${passwordChecks.length ? "text-emerald-400" : "text-white/30"}`}>
                <Check size={11} /> 8+ caractères
              </span>
              <span className={`flex items-center gap-1 ${passwordChecks.number ? "text-emerald-400" : "text-white/30"}`}>
                <Check size={11} /> 1 chiffre
              </span>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full font-semibold text-sm px-5 py-3 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#EB5424] flex items-center justify-center gap-2 disabled:opacity-60 mt-1"
          >
            {loading ? "Création..." : "Créer mon compte"} {!loading && <ArrowRight size={15} />}
          </motion.button>

          <p className="text-center text-[11px] text-white/35 mt-4 leading-relaxed">
            En créant un compte, tu acceptes nos conditions d'utilisation et notre politique de confidentialité.
          </p>
        </form>

        <p className="text-center text-sm text-white/40 mt-5">
          Déjà un compte ?{" "}
          <a href="/login" className="text-[#4FA8FF] hover:underline font-medium">
            Se connecter
          </a>
        </p>
      </motion.div>
    </div>
  );
}
