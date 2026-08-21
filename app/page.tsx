'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Zap, Play, Sparkles, ShieldCheck, Gauge, Users, ArrowRight, Check } from "lucide-react";

const VIDEO_CARDS = [
  { title: "Danse virale", tag: "TikTok", image: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=600&fit=crop&q=80" },
  { title: "Pub produit", tag: "Marketing", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop&q=80" },
  { title: "Storytime", tag: "Reels", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=600&fit=crop&q=80" },
  { title: "Tuto express", tag: "Shorts", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=600&fit=crop&q=80" },
  { title: "Teaser event", tag: "Promo", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop&q=80" },
];

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
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
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
    { name: "Super Grok", price: "15", period: "/mois", quota: "3 min 10s / jour", highlight: false },
    { name: "Superhearly", price: "150", period: "/mois", quota: "6 min 20s / jour", highlight: true },
  ];

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

  return (
    <div className="min-h-screen bg-[#070B18] text-white overflow-x-hidden font-sans">
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <LightningMark size={32} />
          <span className="font-display font-bold text-lg">
            SAM<span className="text-[#2F80ED]">_</span><span className="text-[#F2994A]">FLASH</span>
          </span>
        </div>
        <a href="/login">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm font-semibold px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur"
          >
            Se connecter
          </motion.button>
        </a>
      </nav>

      <div ref={heroRef} className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#2F80ED]/20 blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -50, 40, 0],
              y: [0, 40, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-[#EB5424]/20 blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, 30, -50, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-10 w-[350px] h-[350px] rounded-full bg-[#8B7FE8]/15 blur-[110px]"
          />
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
              animate={{
                y: [0, -120, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 6 + (i % 5),
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-3xl mx-auto text-center px-6 pt-10 pb-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <motion.div
              animate={{ filter: ["drop-shadow(0 0 12px rgba(47,128,237,0.5))", "drop-shadow(0 0 24px rgba(235,84,36,0.6))", "drop-shadow(0 0 12px rgba(47,128,237,0.5))"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <LightningMark size={72} />
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
            className="text-white/60 text-base sm:text-lg mb-8 max-w-xl mx-auto"
          >
            Un prompt, une vidéo prête à publier. Créé pour les créateurs de contenu francophones qui n'ont pas de temps à perdre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#EB5424] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              Générer ma première vidéo <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="font-semibold px-6 py-3 rounded-full border border-white/20 flex items-center justify-center gap-2"
            >
              <Sparkles size={16} /> Voir des exemples
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10"
        >
          <Carousel3D />
        </motion.div>
      </div>

      <motion.section {...r1} className="relative z-10 max-w-5xl mx-auto px-6 py-20">
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

      <motion.section {...r2} className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-center mb-3">Choisis ton rythme</h2>
        <p className="text-center text-white/50 text-sm mb-10">Change ou annule à tout moment.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {plans.map((p) => (
            <motion.div
              key={p.name}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-6 border ${p.highlight ? "bg-gradient-to-b from-[#2F80ED]/15 to-[#EB5424]/10 border-[#EB5424]/40" : "bg-white/5 border-white/10"}`}
            >
              {p.highlight && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#EB5424] text-white px-2.5 py-1 rounded-full mb-3">
                  Le plus rapide
                </span>
              )}
              <h3 className="font-display font-bold text-lg mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">${p.price}</span>
                <span className="text-white/40 text-sm">{p.period}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70 mb-5">
                <Check size={15} className="text-[#4FA8FF]" /> {p.quota}
              </div>
              <button className={`w-full py-2.5 rounded-full font-semibold text-sm ${p.highlight ? "bg-gradient-to-r from-[#2F80ED] to-[#EB5424]" : "bg-white/10 border border-white/15"}`}>
                Choisir {p.name}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section {...r3} className="relative z-10 text-center px-6 py-24">
        <LightningMark size={44} />
        <h2 className="font-display font-bold text-2xl sm:text-3xl mt-4 mb-3">Prêt à publier ta prochaine vidéo ?</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
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
