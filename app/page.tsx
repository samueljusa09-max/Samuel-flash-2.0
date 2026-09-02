"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Zap, Play, Sparkles, ShieldCheck, Gauge, Users, ArrowRight, Check } from "lucide-react";

const VIDEO_CARDS = [
  { title: "Danse virale", tag: "TikTok", image: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=600&fit=crop&q=80" },
  { title: "Pub produit", tag: "Marketing", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop&q=80" },
  { title: "Storytime", tag: "Reels", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=600&fit=crop&q=80" },
  { title: "Tuto express", tag: "Shorts", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=600&fit=crop&q=80" },
  { title: "Teaser event", tag: "Promo", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop&q=80" },
];

const AMBIENT_BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1600&h=1000&fit=crop&q=70",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=1000&fit=crop&q=70",
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&h=1000&fit=crop&q=70",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&h=1000&fit=crop&q=70",
];

function AmbientBackgroundReel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % AMBIENT_BACKGROUND_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#070B18]">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: 5.2, ease: "linear" } }}
          className="absolute inset-0"
        >
          <img src={AMBIENT_BACKGROUND_IMAGES[index]} alt="" className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[#070B18]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B18]/70 via-[#070B18]/35 to-[#070B18]/85" />
    </div>
  );
}

function LightningMark({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="boltBlue" x1="20" y1="10" x2="70" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4FA8FF" />
          <stop offset="1" stopColor="#1B4F91" />
        </linearGradient>
        <linearGradient id="boltOrange" x1="30" y1="45" x2="65" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFAE5C" />
          <stop offset="1" stopColor="#EB5424" />
        </linearGradient>
      </defs>
      <path d="M52 8L26 52H46L40 92L76 42H54L52 8Z" fill="url(#boltBlue)" opacity="0.95" />
      <path d="M46 40L32 68H44L40 92L64 56H50L46 40Z" fill="url(#boltOrange)" />
    </svg>
  );
}

function Carousel3D() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % VIDEO_CARDS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ perspective: "1400px" }} className="relative h-[380px] w-full flex items-center justify-center">
      {VIDEO_CARDS.map((card, i) => {
        const offset = i - active;
        const norm = ((offset % VIDEO_CARDS.length) + VIDEO_CARDS.length) % VIDEO_CARDS.length;
        const pos = norm > VIDEO_CARDS.length / 2 ? norm - VIDEO_CARDS.length : norm;
        const isCenter = pos === 0;
        return (
          <motion.div
            key={card.title}
            animate={{
              x: pos * 150,
              rotateY: pos * -35,
              scale: isCenter ? 1 : 0.78,
              z: isCenter ? 80 : -Math.abs(pos) * 60,
              opacity: Math.abs(pos) > 2 ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ transformStyle: "preserve-3d", position: "absolute" }}
            className="w-[190px] h-[300px] rounded-2xl shadow-2xl flex flex-col justify-end p-4 border border-white/10 overflow-hidden bg-cover bg-center"
          >
            <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
            <div className="relative flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Play size={14} fill="white" className="text-white ml-0.5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-white/80 font-semibold">{card.tag}</span>
            </div>
            <p className="relative text-white font-bold text-sm leading-tight">{card.title}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  return {
    ref,
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: "easeOut" as const },
  };
}

export default function SamFlashLanding() {
  const router = useRouter();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const features = [
    { icon: Zap, title: "Génération éclair", desc: "Prompts texte → vidéo IA en quelques minutes. Résultats professionnels, sans montage." },
    { icon: Gauge, title: "File prioritaire", desc: "Les membres premium passent devant, sans attendre leur tour." },
    { icon: ShieldCheck, title: "Paiement local", desc: "Mobile Money, dans ta devise, en toute sécurité." },
    { icon: Users, title: "Communauté créateurs", desc: "Partage tes vidéos, inspire-toi de la galerie publique." },
  ];

  const plans = [
    {
      id: "flash",
      name: "Flash",
      price: "15",
      period: "/mois",
      quota: "3 min 10s / jour",
      highlight: false,
      features: ["Génération vidéo IA illimitée", "Formats 9:16, 1:1, 16:9, 4:5", "Résolution jusqu'à 1080p", "Historique de créations"],
    },
    {
      id: "flash-pro",
      name: "Flash Pro",
      price: "150",
      period: "/mois",
      quota: "6 min 20s / jour",
      highlight: true,
      features: ["Tout Flash, en plus grand", "File de génération prioritaire", "Support réactif", "Accès anticipé aux nouveautés"],
    },
  ];

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <AmbientBackgroundReel />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <LightningMark size={32} />
          <span className="font-display font-bold text-lg">
            SAM<span className="text-[#2F80ED]">_</span><span className="text-[#F2994A]">FLASH</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/pricing")}
            className="text-sm font-medium text-white/60 hover:text-white transition-colors hidden sm:block"
          >
            Tarifs
          </button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/login")}
            className="text-sm font-semibold px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur"
          >
            Se connecter
          </motion.button>
        </div>
      </nav>

      {/* HERO */}
      <div ref={heroRef} className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#2F80ED]/20 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -50, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.9, 1.1, 1] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-[#EB5424]/20 blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, 30, -50, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-10 w-[350px] h-[350px] rounded-full bg-[#8B7FE8]/15 blur-[110px]"
          />
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
              animate={{ y: [0, -120, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-5xl mx-auto px-6 pt-14 pb-6 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 items-center"
        >
          {/* COLONNE GAUCHE — texte */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex justify-center md:justify-start mb-6"
            >
              <motion.div
                animate={{ filter: ["drop-shadow(0 0 12px rgba(47,128,237,0.5))", "drop-shadow(0 0 24px rgba(235,84,36,0.6))", "drop-shadow(0 0 12px rgba(47,128,237,0.5))"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <LightningMark size={64} />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-display font-bold text-4xl sm:text-5xl leading-[1.05] mb-4"
            >
              Tes vidéos IA,
              <br />
              <span className="bg-gradient-to-r from-[#4FA8FF] via-[#8B7FE8] to-[#F2994A] bg-clip-text text-transparent">
                générées en un éclair.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white/60 text-base sm:text-lg max-w-md mx-auto md:mx-0"
            >
              Un prompt, une vidéo prête à publier. Créé pour les créateurs de contenu francophones qui n'ont pas de temps à perdre.
            </motion.p>
          </div>

          {/* COLONNE DROITE — actions */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="w-full"
          >
            <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-3 shadow-[0_0_60px_-20px_rgba(47,128,237,0.4)]">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Commencer</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/signup")}
                className="font-semibold px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2F80ED] to-[#EB5424] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                Générer ma première vidéo <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="font-semibold px-6 py-3.5 rounded-2xl border border-white/20 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
              >
                <Sparkles size={16} /> Voir des exemples
              </motion.button>
              <p className="text-[11px] text-white/35 text-center pt-1">Sans engagement · Annule à tout moment</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D CAROUSEL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10"
        >
          <Carousel3D />
        </motion.div>
      </div>

      {/* FEATURES */}
      <motion.section id="features" {...r1} className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-center mb-12">
          Fait pour publier vite, pas pour bricoler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/[0.08] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F80ED] to-[#EB5424] flex items-center justify-center mb-4">
                <f.icon size={18} />
              </div>
              <h3 className="font-semibold mb-1.5 text-sm">{f.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PRICING */}
      <motion.section {...r2} className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#4FA8FF] mb-3">Tarifs</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Choisis ton rythme</h2>
          <p className="text-white/50 text-sm">Change ou annule à tout moment. Sans engagement.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plans.map((p) => (
            <motion.div
              key={p.name}
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
              <h3 className="font-display font-bold text-xl mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-4xl font-bold">${p.price}</span>
                <span className="text-white/40 text-sm">{p.period}</span>
              </div>
              <p className="text-xs text-white/40 mb-6">{p.quota} de génération</p>
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
      </motion.section>

      {/* CTA FINAL */}
      <motion.section {...r3} className="relative z-10 text-center px-6 py-24">
        <LightningMark size={44} />
        <h2 className="font-display font-bold text-2xl sm:text-3xl mt-4 mb-3">Prêt à publier ta prochaine vidéo ?</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/signup")}
          className="font-semibold px-7 py-3.5 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#EB5424] inline-flex items-center gap-2 mt-2"
        >
          Commencer gratuitement <ArrowRight size={16} />
        </motion.button>
      </motion.section>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-white/30 text-xs">
        Sam_Flash 2.0 — AI Content Creator
      </footer>
    </div>
  );
}
