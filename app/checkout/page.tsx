"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Smartphone, CreditCard, ShieldCheck, Check } from "lucide-react";

function LightningMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="cBlue" x1="20" y1="10" x2="70" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4FA8FF" /><stop offset="1" stopColor="#1B4F91" />
        </linearGradient>
        <linearGradient id="cOrange" x1="30" y1="45" x2="65" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFAE5C" /><stop offset="1" stopColor="#EB5424" />
        </linearGradient>
      </defs>
      <path d="M52 8L26 52H46L40 92L76 42H54L52 8Z" fill="url(#cBlue)" opacity="0.95" />
      <path d="M46 40L32 68H44L40 92L64 56H50L46 40Z" fill="url(#cOrange)" />
    </svg>
  );
}

const PLAN_DETAILS: Record<string, { name: string; price: number; quota: string }> = {
  flash: { name: "Flash", price: 15, quota: "3 min 10s / jour" },
  "flash-pro": { name: "Flash Pro", price: 150, quota: "6 min 20s / jour" },
};

const COUNTRIES = [
  { code: "TG", name: "Togo", currency: "XOF", rate: 610 },
  { code: "CI", name: "Côte d'Ivoire", currency: "XOF", rate: 610 },
  { code: "SN", name: "Sénégal", currency: "XOF", rate: 610 },
  { code: "CM", name: "Cameroun", currency: "XAF", rate: 610 },
  { code: "OTHER", name: "Autre pays", currency: "USD", rate: 1 },
];

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "flash";
  const plan = PLAN_DETAILS[planId] || PLAN_DETAILS.flash;

  const [country, setCountry] = useState("TG");
  const [method, setMethod] = useState("mobile_money");
  const [step, setStep] = useState("form"); // 'form' | 'processing' | 'success'

  const countryInfo = COUNTRIES.find((c) => c.code === country)!;
  const localAmount = Math.round(plan.price * countryInfo.rate);

  function handlePay() {
    setStep("processing");
    // TODO: appel réel à l'API SwyChr ici — création de la session de paiement,
    // puis vérification du webhook avant d'activer l'abonnement.
    setTimeout(() => {
      setStep("success");
      setTimeout(() => router.push("/dashboard"), 1800);
    }, 2200);
  }

  return (
    <div className="flex-1 flex items-center justify-center px-6 pb-12">
      <div className="w-full max-w-md">
        {step !== "success" ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
              <div className="flex items-center justify-between mb-1">
                <p className="font-display font-bold text-lg">{plan.name}</p>
                <p className="font-bold text-lg">${plan.price}<span className="text-white/40 text-xs">/mois</span></p>
              </div>
              <p className="text-xs text-white/40">{plan.quota} de génération</p>
            </div>

            <p className="text-xs font-semibold text-white/50 mb-2">Ton pays</p>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2F80ED]/60 mb-5 [&>option]:bg-[#0B1128]"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name} ({c.currency})</option>
              ))}
            </select>

            <p className="text-xs font-semibold text-white/50 mb-2">Moyen de paiement</p>
            <div className="flex flex-col gap-2 mb-6">
              <button
                onClick={() => setMethod("mobile_money")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
                  method === "mobile_money" ? "border-[#2F80ED]/60 bg-[#2F80ED]/10" : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <Smartphone size={17} className="text-[#4FA8FF]" />
                <span className="text-sm font-medium flex-1">Mobile Money</span>
                {method === "mobile_money" && <Check size={15} className="text-[#4FA8FF]" />}
              </button>
              <button
                onClick={() => setMethod("card")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
                  method === "card" ? "border-[#2F80ED]/60 bg-[#2F80ED]/10" : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <CreditCard size={17} className="text-[#4FA8FF]" />
                <span className="text-sm font-medium flex-1">Carte bancaire</span>
                {method === "card" && <Check size={15} className="text-[#4FA8FF]" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm mb-5 px-1">
              <span className="text-white/50">Montant à payer</span>
              <span className="font-bold text-lg">
                {countryInfo.currency === "USD" ? `$${plan.price}` : `${localAmount.toLocaleString()} ${countryInfo.currency}`}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePay}
              disabled={step === "processing"}
              className="w-full py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#2F80ED] to-[#EB5424] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {step === "processing" ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
                  <ShieldCheck size={16} />
                </motion.div>
              ) : (
                <ShieldCheck size={16} />
              )}
              {step === "processing" ? "Vérification du paiement..." : "Payer maintenant"}
            </motion.button>

            <p className="text-center text-[11px] text-white/30 mt-4">
              Paiement sécurisé. Ton abonnement s'active automatiquement après confirmation.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-emerald-400" />
            </div>
            <h2 className="font-display font-bold text-xl mb-2">Paiement confirmé !</h2>
            <p className="text-sm text-white/50">Ton abonnement {plan.name} est actif. Direction ton tableau de bord...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#070B18] text-white flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav className="flex items-center justify-between px-6 py-5 max-w-lg mx-auto w-full">
        <button onClick={() => router.push("/pricing")} className="flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white/80">
          <ArrowLeft size={14} /> Retour aux tarifs
        </button>
        <div className="flex items-center gap-2">
          <LightningMark size={24} />
          <span className="font-display font-bold text-xs">SAM_FLASH</span>
        </div>
      </nav>

      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/40 text-sm">Chargement...</p>
        </div>
      }>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
