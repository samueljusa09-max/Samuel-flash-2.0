"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, ChevronRight, Image as ImageIcon, Video, Smile,
  Plus, Mic, ArrowUp, Sparkles, Play, Download, Clock, Crown,
  Wand2, History, Wallet, Users, User, ThumbsUp, ThumbsDown,
  RotateCw, Share2, MoreHorizontal,
} from "lucide-react";

function LightningMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="dashBlue" x1="20" y1="10" x2="70" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4FA8FF" /><stop offset="1" stopColor="#1B4F91" />
        </linearGradient>
        <linearGradient id="dashOrange" x1="30" y1="45" x2="65" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFAE5C" /><stop offset="1" stopColor="#EB5424" />
        </linearGradient>
      </defs>
      <path d="M52 8L26 52H46L40 92L76 42H54L52 8Z" fill="url(#dashBlue)" opacity="0.95" />
      <path d="M46 40L32 68H44L40 92L64 56H50L46 40Z" fill="url(#dashOrange)" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "create", label: "Créer", icon: Wand2 },
  { id: "history", label: "Historique", icon: History },
  { id: "wallet", label: "Portefeuille", icon: Wallet },
  { id: "subscription", label: "Abonnement", icon: Crown },
  { id: "gallery", label: "Galerie", icon: Users },
  { id: "profile", label: "Profil", icon: User },
];

const RESOLUTIONS = [
  { id: "480p", costMult: 1 },
  { id: "720p", costMult: 1.5 },
  { id: "1080p", costMult: 2 },
];
const RATIOS = ["9:16", "1:1", "16:9", "4:5"];
const DURATIONS = [5, 10, 15];

const MOCK_CREATIONS = [
  { title: "Pub sneakers", ratio: "2:3", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=450&fit=crop&q=80", duration: "8s" },
  { title: "Recette rapide", ratio: "1:1", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop&q=80", duration: "12s" },
  { title: "Teaser boutique", ratio: "2:3", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=450&fit=crop&q=80", duration: "6s" },
];

const MOCK_HISTORY = [
  { id: 1, prompt: "Pub sneakers pastel, style studio, fond rose", date: "22 août", duration: "8s", status: "done", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&h=100&fit=crop&q=80" },
  { id: 2, prompt: "Recette healthy, plan macro, ambiance chaleureuse", date: "21 août", duration: "12s", status: "done", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=100&h=100&fit=crop&q=80" },
  { id: 3, prompt: "Teaser boutique mode, néons violets", date: "20 août", duration: "6s", status: "failed", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&q=80" },
  { id: 4, prompt: "Danse virale, transition rapide, fond flou", date: "19 août", duration: "10s", status: "processing", image: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=100&h=100&fit=crop&q=80" },
];

const CREDIT_PACKS = [
  { credits: 10, price: "1 000 XOF" },
  { credits: 50, price: "4 500 XOF" },
];

const MOCK_TRANSACTIONS = [
  { label: "Achat 50 crédits", date: "18 août", amount: 50 },
  { label: "Génération vidéo (8s)", date: "22 août", amount: -8 },
  { label: "Génération vidéo (12s)", date: "21 août", amount: -12 },
];

function Sidebar({ active, setActive }: { active: string; setActive: (val: string) => void }) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-30 w-16 md:w-56 bg-[#0A0F24]/80 backdrop-blur-xl border-r border-white/10 flex flex-col">
      <div className="flex items-center gap-2.5 px-3 md:px-5 py-5">
        <LightningMark size={28} />
        <span className="hidden md:block font-display font-bold text-sm">
          SAM<span className="text-[#2F80ED]">_</span><span className="text-[#F2994A]">FLASH</span>
        </span>
      </div>

      <nav className="flex-1 px-2 md:px-3 flex flex-col gap-1 mt-3">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                isActive ? "text-white" : "text-white/45 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#2F80ED]/20 to-[#EB5424]/15 border border-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon size={17} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10 hidden md:block font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-2 md:px-3 pb-4">
        <button
          onClick={() => setActive("profile")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
            active === "profile" ? "text-white bg-white/5" : "text-white/45 hover:text-white/80 hover:bg-white/5"
          }`}
        >
          <Settings size={17} className="flex-shrink-0" />
          <span className="hidden md:block font-medium">Paramètres</span>
        </button>
      </div>
    </aside>
  );
}

export default function DashboardPage() {
  const [active, setActive] = useState("create");
  const [resolution, setResolution] = useState("720p");
  const [ratio, setRatio] = useState("9:16");
  const [duration, setDuration] = useState(5);
  const [mode, setMode] = useState("video");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [creations, setCreations] = useState<any[]>(MOCK_CREATIONS);
  const [quotaUsed, setQuotaUsed] = useState(45);
  const [activeGen, setActiveGen] = useState<any>(null);
  const [liked, setLiked] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [lightbox, setLightbox] = useState<any>(null);

  const quotaTotal = 190;
  const quotaPct = Math.round((quotaUsed / quotaTotal) * 100);

  const resMultiplier = RESOLUTIONS.find((r) => r.id === resolution)?.costMult ?? 1;
  const estimatedCost = Math.round(duration * resMultiplier);
  const willUseCredits = estimatedCost > quotaTotal - quotaUsed;

  const PLACEHOLDER_IMAGES = [
    "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=450&fit=crop&q=80",
  ];

  function handleGenerate() {
    if (!prompt.trim() || generating) return;
    if (estimatedCost > quotaTotal - quotaUsed) return;
    setGenerating(true);
    const currentPrompt = prompt;
    const currentRatio = ratio;
    const currentDuration = duration;
    const currentMode = mode;
    setActiveGen({ status: "loading", prompt: currentPrompt, ratio: currentRatio, duration: currentDuration, mode: currentMode });
    setLiked(null);
    setPrompt("");

    setTimeout(() => {
      const resultImage = PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];
      setActiveGen({
        status: "done",
        prompt: currentPrompt,
        ratio: currentRatio,
        duration: currentDuration,
        mode: currentMode,
        image: resultImage,
      });
      setCreations((prev) => [
        {
          title: currentPrompt.slice(0, 40),
          ratio: currentRatio,
          image: resultImage,
          duration: `${currentDuration}s`,
          mode: currentMode,
        },
        ...prev,
      ]);
      setQuotaUsed((q) => Math.min(quotaTotal, q + estimatedCost));
      setGenerating(false);
    }, 2200);
  }

  async function handleDownload(imageUrl: string, filename?: string) {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "sam-flash-creation.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    }
  }

  async function handleShare(imageUrl: string, text: string) {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Sam_Flash 2.0", text, url: imageUrl });
      } catch (e) {
        /* annulé par l'utilisateur */
      }
    } else {
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    }
  }

  function handleAddEmoji() {
    setPrompt((p) => p + " ✨");
  }

  function handleToggleMic() {
    setRecording((r) => !r);
    if (!recording) {
      setTimeout(() => setRecording(false), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-[#070B18] text-white relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-[#2F80ED]/10 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#EB5424]/10 blur-[110px]"
        />
      </div>

      <Sidebar active={active} setActive={setActive} />

      <div className="pl-16 md:pl-56">
        <header className="relative z-10 flex items-center justify-end gap-2 px-6 py-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive("subscription")}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-gradient-to-r from-[#2F80ED]/20 to-[#EB5424]/20 border border-white/10"
          >
            <Crown size={13} className="text-[#F2994A]" /> Premium
          </motion.button>
        </header>

        <main className="relative z-10 max-w-4xl mx-auto px-6 pb-32">
          <AnimatePresence mode="wait">
            {active === "create" && (
              <motion.div key="create" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 backdrop-blur">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#4FA8FF]" />
                      <span className="text-sm font-semibold">Quota du jour</span>
                      <span className="text-[10px] uppercase tracking-wide bg-white/10 px-2 py-0.5 rounded-full text-white/50">Premium</span>
                    </div>
                    <span className="text-sm text-white/50">{quotaUsed}s / {quotaTotal}s</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${quotaPct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#2F80ED] to-[#EB5424]"
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {activeGen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="mb-8"
                    >
                      {activeGen.status === "loading" ? (
                        <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                          >
                            <Sparkles size={18} className="text-[#4FA8FF]" />
                          </motion.div>
                          <p className="text-sm text-white/70">
                            Je génère ta vidéo. Ça peut prendre quelques instants — reste sur la page ou reviens plus tard.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className={`relative rounded-2xl overflow-hidden border border-white/10 mx-auto ${
                            activeGen.ratio === "16:9" ? "aspect-video max-w-lg" :
                            activeGen.ratio === "1:1" ? "aspect-square max-w-sm" :
                            "aspect-[9/16] max-w-[220px]"
                          }`}>
                            <img src={activeGen.image} alt={activeGen.prompt} className="absolute inset-0 w-full h-full object-cover" />
                            {activeGen.mode === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                  <Play size={18} fill="white" className="text-white ml-0.5" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-center gap-1.5 mt-3">
                            <button
                              onClick={() => setLiked((l) => (l === "up" ? null : "up"))}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                liked === "up" ? "bg-[#2F80ED]/20 text-[#4FA8FF]" : "bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/90"
                              }`}
                            >
                              <ThumbsUp size={14} />
                            </button>
                            <button
                              onClick={() => setLiked((l) => (l === "down" ? null : "down"))}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                liked === "down" ? "bg-red-500/20 text-red-400" : "bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/90"
                              }`}
                            >
                              <ThumbsDown size={14} />
                            </button>
                            <button
                              onClick={() => { setPrompt(activeGen.prompt); setMode(activeGen.mode); setRatio(activeGen.ratio); setDuration(activeGen.duration); handleGenerate(); }}
                              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white/90 transition-colors"
                            >
                              <RotateCw size={14} />
                            </button>
                            <button
                              onClick={() => handleShare(activeGen.image, activeGen.prompt)}
                              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white/90 transition-colors"
                            >
                              <Share2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDownload(activeGen.image, `sam-flash-${Date.now()}.jpg`)}
                              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white/90 transition-colors"
                            >
                              <Download size={14} />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white/90 transition-colors">
                              <MoreHorizontal size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-lg">Mes créations</h2>
                  <button onClick={() => setActive("gallery")} className="flex items-center gap-1 text-xs text-white/50 hover:text-white/80">
                    Galerie <ChevronRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                  <AnimatePresence>
                    {creations.map((c, idx) => (
                      <motion.div
                        key={c.title + idx}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="relative rounded-xl overflow-hidden border border-white/10 aspect-[2/3] group cursor-pointer"
                        onClick={() => setLightbox({ image: c.image, title: c.title, mode: c.mode })}
                      >
                        <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <div className="absolute top-2 right-2">
                          <span className="text-[10px] bg-black/50 backdrop-blur px-1.5 py-0.5 rounded text-white/80">{c.duration}</span>
                        </div>
                        {c.mode !== "image" && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                              <Play size={14} fill="white" className="text-white ml-0.5" />
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                          <p className="text-xs font-medium truncate">{c.title}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDownload(c.image, `sam-flash-${c.title.slice(0, 20)}.jpg`); }}
                            className="flex-shrink-0"
                          >
                            <Download size={12} className="text-white/60 hover:text-white transition-colors" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {active === "history" && (
              <motion.div key="history" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-8">
                <h2 className="font-display font-bold text-xl mb-5">Historique</h2>
                <div className="flex flex-col gap-2">
                  {MOCK_HISTORY.map((h) => (
                    <div key={h.id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                      <img src={h.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{h.prompt}</p>
                        <p className="text-xs text-white/40">{h.date} · {h.duration}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                        h.status === "done" ? "bg-emerald-500/15 text-emerald-400" :
                        h.status === "failed" ? "bg-red-500/15 text-red-400" : "bg-amber-500/15 text-amber-400"
                      }`}>
                        {h.status === "done" ? "Terminé" : h.status === "failed" ? "Échoué" : "En cours"}
                      </span>
                      {h.status === "done" && <Download size={15} className="text-white/40 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {active === "wallet" && (
              <motion.div key="wallet" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-8">
                <h2 className="font-display font-bold text-xl mb-5">Portefeuille</h2>
                <div className="bg-gradient-to-br from-[#2F80ED]/15 to-[#EB5424]/10 border border-white/10 rounded-2xl p-6 mb-6">
                  <p className="text-xs text-white/50 mb-1">Solde actuel</p>
                  <p className="font-display font-bold text-3xl">24 crédits</p>
                </div>
                <p className="text-sm font-semibold mb-3">Acheter plus de crédits</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {CREDIT_PACKS.map((p) => (
                    <button key={p.credits} className="text-left bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#2F80ED]/40 transition-colors">
                      <p className="font-semibold text-sm">{p.credits} crédits</p>
                      <p className="text-xs text-white/40 mt-0.5">{p.price}</p>
                    </button>
                  ))}
                </div>
                <p className="text-sm font-semibold mb-3">Transactions récentes</p>
                <div className="flex flex-col gap-2">
                  {MOCK_TRANSACTIONS.map((t, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-sm">{t.label}</p>
                        <p className="text-xs text-white/40">{t.date}</p>
                      </div>
                      <span className={`text-sm font-semibold ${t.amount > 0 ? "text-emerald-400" : "text-white/60"}`}>
                        {t.amount > 0 ? "+" : ""}{t.amount} crédits
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {active === "subscription" && (
              <motion.div key="subscription" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-8">
                <h2 className="font-display font-bold text-xl mb-5">Abonnement</h2>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-[#2F80ED]/20 to-[#EB5424]/20 border border-white/10 px-3 py-1 rounded-full">
                      <Crown size={12} className="text-[#F2994A]" /> Formule Premium
                    </span>
                    <span className="text-xs text-white/40">Renouvellement le 23 sept.</span>
                  </div>
                  <p className="text-sm text-white/50">Quota quotidien : 3 min 10s de génération</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#EB5424] text-sm font-semibold">
                    Passer au palier supérieur
                  </button>
                  <button className="px-5 py-2.5 rounded-full border border-white/15 text-sm text-white/60">
                    Annuler
                  </button>
                </div>
              </motion.div>
            )}

            {active === "gallery" && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-8">
                <h2 className="font-display font-bold text-xl mb-2">Galerie communautaire</h2>
                <p className="text-white/40 text-sm mb-5">Prévue pour la V2 — aperçu du rendu visuel.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MOCK_CREATIONS.map((c) => (
                    <div key={c.title} className="relative rounded-xl overflow-hidden border border-white/10 aspect-[2/3]">
                      <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-white/70 bg-black/40 px-2 py-1 rounded-full">Bientôt</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {active === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-8 max-w-md">
                <h2 className="font-display font-bold text-xl mb-5">Profil</h2>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2F80ED] to-[#EB5424] flex items-center justify-center font-display font-bold text-lg">
                    E
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Espoir Adayi</p>
                    <p className="text-xs text-white/40">adayiespoir60@gmail.com</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-[11px] text-white/40 mb-0.5">Pays</p>
                    <p className="text-sm">Togo (XOF)</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-[11px] text-white/40 mb-0.5">Mot de passe</p>
                    <button className="text-sm text-[#4FA8FF]">Changer le mot de passe</button>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-sm">Notifications par email</p>
                    <div className="w-9 h-5 rounded-full bg-[#2F80ED] relative">
                      <div className="w-4 h-4 rounded-full bg-white absolute right-0.5 top-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {active === "create" && (
          <div className="fixed bottom-0 left-16 md:left-56 right-0 z-20 bg-gradient-to-t from-[#070B18] via-[#070B18] to-transparent pt-10 pb-5 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] text-white/40">
                  Reste {quotaTotal - quotaUsed}s / {quotaTotal}s aujourd'hui
                </span>
                <span className={`text-[11px] font-semibold ${willUseCredits ? "text-[#F2994A]" : "text-[#4FA8FF]"}`}>
                  Coût : {estimatedCost}s {willUseCredits ? "(dépasse le quota → crédits)" : "de quota"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mb-2 px-1 overflow-x-auto no-scrollbar">
                {RESOLUTIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setResolution(r.id)}
                    className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                      resolution === r.id ? "bg-white text-[#070B18] font-semibold" : "bg-white/5 text-white/50 border border-white/10"
                    }`}
                  >
                    {r.id}
                  </button>
                ))}
                <div className="w-px h-4 bg-white/10 mx-1 flex-shrink-0" />
                {RATIOS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatio(r)}
                    className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                      ratio === r ? "bg-white text-[#070B18] font-semibold" : "bg-white/5 text-white/50 border border-white/10"
                    }`}
                  >
                    {r}
                  </button>
                ))}
                <div className="w-px h-4 bg-white/10 mx-1 flex-shrink-0" />
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                      duration === d ? "bg-white text-[#070B18] font-semibold" : "bg-white/5 text-white/50 border border-white/10"
                    }`}
                  >
                    {d}s
                  </button>
                ))}
              </div>

              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-3 backdrop-blur-xl">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Décris la vidéo à créer..."
                  rows={1}
                  className="w-full bg-transparent outline-none text-sm placeholder:text-white/30 resize-none mb-2 px-1"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white/80">
                      <Plus size={15} />
                    </button>
                    <button
                      onClick={() => setMode("image")}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${mode === "image" ? "bg-white text-[#070B18] font-semibold" : "text-white/50"}`}
                    >
                      <ImageIcon size={13} /> Image
                    </button>
                    <button
                      onClick={() => setMode("video")}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${mode === "video" ? "bg-white text-[#070B18] font-semibold" : "text-white/50"}`}
                    >
                      <Video size={13} /> Vidéo
                    </button>
                    <button
                      onClick={handleAddEmoji}
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white/80"
                    >
                      <Smile size={15} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleToggleMic}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        recording ? "bg-red-500/20 text-red-400" : "bg-white/5 text-white/50 hover:text-white/80"
                      }`}
                    >
                      {recording ? (
                        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                          <Mic size={15} />
                        </motion.div>
                      ) : (
                        <Mic size={15} />
                      )}
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGenerate}
                      disabled={generating || !prompt.trim() || estimatedCost > quotaTotal - quotaUsed}
                      className="w-9 h-9 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#EB5424] flex items-center justify-center disabled:opacity-40"
                    >
                      <AnimatePresence mode="wait">
                        {generating ? (
                          <motion.div key="loading" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
                            <Sparkles size={15} />
                          </motion.div>
                        ) : (
                          <motion.div key="arrow">
                            <ArrowUp size={16} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX — aperçu plein écran */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full"
            >
              <img src={lightbox.image} alt={lightbox.title} className="w-full rounded-2xl border border-white/10" />
              {lightbox.mode !== "image" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20 rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                    <Play size={22} fill="white" className="text-white ml-1" />
                  </div>
                  <p className="text-xs text-white/60 bg-black/50 px-3 py-1.5 rounded-full">
                    Lecture vidéo à venir — API de génération pas encore connectée
                  </p>
                </div>
              )}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-[#070B18] flex items-center justify-center font-bold"
              >
                ×
              </button>
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => handleDownload(lightbox.image, `sam-flash-${lightbox.title.slice(0, 20)}.jpg`)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-white text-[#070B18]"
                >
                  <Download size={13} /> Télécharger
                </button>
                <button
                  onClick={() => handleShare(lightbox.image, lightbox.title)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-white/10 border border-white/15"
                >
                  <Share2 size={13} /> Partager
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
