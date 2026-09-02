"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, Sparkles, ArrowLeft } from "lucide-react";

function LightningMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="pBlue" x1="20" y1="10" x2="70" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4FA8FF" /><stop offset="1" stopColor="#1B4F91" />
        </linearGradient>
        <linearGradient id="pOrange" x1="30" y1="45" x2="65" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFAE5C" /><stop offset="1" stopColor="#EB5424" />
        </linearGradient>
      </defs>
      <path d="M52 8L26 52H46L40 92L76 42H54L52 8Z" fill="url(#pBlue)" opacity="0.95" />
      <path d="M46 40L32 68H44L40 92L64 56H50L46 40Z" fill="url(#pOrange)" />
    </svg>
  );
}

const PLANS = [
  {
    id: "flash",
    name: "Flash",
    price: "15",
    period: "/mois",
    quota: "3 min 10s de génération / jour",
    highlight: false,
    features: [
      "Génération vidéo IA illimitée",
      "Formats 9:16, 1:1, 16:9, 4:5",
      "Résolution jusqu'à 1080p",
      "Historique de créations",
      "Paiement Mobile Money",
    ],
  },
  {
    id: "flash-pro",
    name: "Flash Pro",
    price: "150",
    period: "/mois",
    quota: "6 min 20s de génération / jour",
    highlight: true,
    features: [
      "Tout Flash, en plus grand",
      "File de génération prioritaire",
      "Support réactif",
      "Accès anticipé aux nouveautés",
      "Paiement Mobile Money",
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#070B18] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <button onClick={() => router.push("/")} className="flex items-center gap-2.5">
          <LightningMark size={30} />
          <span className="font-display font-bold text-sm">
            SAM<span className="text-[#2F80ED]">_</span><span className="text-[#F2994A]">FLASH</span>
          </span>
        </button>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white/80"
        >
          <ArrowLeft size={14} /> Retour à l'accueil
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-24">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#4FA8FF] mb-3">Nos tarifs</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl mb-3">Un abonnement, zéro complication</h1>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Choisis ton palier, paie en Mobile Money, et génère tes premières vidéos en quelques minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PLANS.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative rounded-3xl p-7 border overflow-hidden ${
                p.highlight
                  ? "bg-gradient-to-b from-[#2F80ED]/20 via-[#0B1128] to-[#EB5424]/10 border-[#EB5424]/40 shadow-[0_0_60px_-15px_rgba(235,84,36,0.35)]"
                  : "bg-white/[0.04] border-white/10"
              }`}
            >
              {p.highlight && (
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#EB5424]/20 blur-[60px] rounded-full pointer-events-none" />
              )}
              {p.highlight && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#2F80ED] to-[#EB5424] text-white px-3 py-1.5 rounded-full mb-4">
                  <Sparkles size={11} /> Le plus populaire
                </span>
              )}
              <h2 className="font-display font-bold text-xl mb-1">{p.name}</h2>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-4xl font-bold">${p.price}</span>
                <span className="text-white/40 text-sm">{p.period}</span>
              </div>
              <p className="text-xs text-white/40 mb-6">{p.quota}</p>
              <div className="h-px bg-white/10 mb-6" />
              <ul className="flex flex-col gap-3 mb-7">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      p.highlight ? "bg-[#EB5424]/25 text-[#F2994A]" : "bg-[#2F80ED]/20 text-[#4FA8FF]"
                    }`}>
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push(`/checkout?plan=${p.id}`)}
                className={`w-full py-3 rounded-full font-semibold text-sm transition-transform hover:scale-[1.02] ${
                  p.highlight ? "bg-gradient-to-r from-[#2F80ED] to-[#EB5424]" : "bg-white/10 border border-white/15 hover:bg-white/15"
                }`}
              >
                Choisir {p.name}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-white/30 mt-10">
          Tu peux changer de palier ou annuler à tout moment depuis ton tableau de bord.
        </p>
      </div>
    </div>
  );
}
