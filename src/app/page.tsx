'use client';

// ============================================
// KORELAB - Page d'Accueil (Science Snap)
// Landing page avec style clinique et technique
// ============================================

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Microscope,
  ArrowRight,
  Activity,
  TrendingUp
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';

// ===================
// PAGE PRINCIPALE
// ===================

export default function HomePage() {
  return (
    <MobileShell showHeader={true} showBottomNav={true}>
      <div className="min-h-screen bg-white">
        {/* Header avec Logo et Badge BETA */}
        <Header />
        
        <div className="px-4 py-6">
          {/* Hero Section */}
          <HeroSection />

          {/* Preuves (Grid) */}
          <ProofsSection />
        </div>
      </div>
    </MobileShell>
  );
}

// ===================
// HEADER
// ===================

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo KORELAB.SC */}
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-lg text-science-900">
            KORELAB.SC
          </span>
          <span className="badge badge-accent text-[10px]">
            V.2.4 BETA
          </span>
        </div>
      </div>
    </header>
  );
}

// ===================
// HERO SECTION
// ===================

function HeroSection() {
  return (
    <section className="mb-8">
      {/* Badge Diagnostic */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-sm mb-6"
      >
        <Microscope className="w-4 h-4 text-science-900" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-science-900">
          DIAGNOSTIC CAPILLAIRE IA
        </span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-mono font-bold uppercase tracking-wider text-science-900 leading-tight mb-4"
      >
        Comprenez la biologie de vos cheveux
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-text-secondary font-sans text-base mb-8 leading-relaxed"
      >
        Analyse de marqueurs biologiques : porosité, sébum, structure capillaire. 
        Protocole personnalisé basé sur des données scientifiques.
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        {/* Bouton Primaire */}
        <Link
          href="/diagnostic"
          className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
        >
          LANCER L'ANALYSE
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Bouton Secondaire */}
        <Link
          href="/shop"
          className="btn-ghost w-full flex items-center justify-center gap-2 py-3"
        >
          JE CONNAIS MES PRODUITS
        </Link>
      </motion.div>
    </section>
  );
}

// ===================
// PROOFS SECTION (Grid)
// ===================

function ProofsSection() {
  const proofs = [
    {
      value: '94%',
      label: 'Précision',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      value: '30s',
      label: 'Analyse',
      icon: <Activity className="w-5 h-5" />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-2 gap-3 mb-8"
    >
      {proofs.map((proof, index) => (
        <div
          key={index}
          className="card p-4 text-center"
        >
          <div className="flex items-center justify-center mb-2 text-accent-500">
            {proof.icon}
          </div>
          <p className="font-mono font-bold text-2xl text-science-900 mb-1">
            {proof.value}
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            {proof.label}
          </p>
        </div>
      ))}
    </motion.section>
  );
}
