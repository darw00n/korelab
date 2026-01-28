'use client';

// ============================================
// PROTOTYPE OPTION 4: "JOURNEY/STORY"
// Focus: Connexion émotionnelle - Transformation
// ============================================
// 
// PHILOSOPHIE:
// - L'utilisatrice veut se PROJETER
// - Storytelling = connexion émotionnelle
// - Avant/Après = preuve sociale implicite
//
// STRUCTURE:
// 1. "Où tu en es" (validation du problème)
// 2. "Où tu peux aller" (vision du résultat)
// 3. "Le chemin" (routine + produits)
// 4. "Commencer maintenant"
//
// AVANTAGES:
// ✅ Forte connexion émotionnelle
// ✅ Motivant et inspirant
// ✅ Crée de l'anticipation
//
// INCONVÉNIENTS:
// ❌ Peut sembler "trop beau"
// ❌ Moins factuel/scientifique
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Flag, 
  ArrowRight,
  Sparkles,
  Heart,
  Clock,
  ShoppingBag,
  Star,
  CheckCircle
} from 'lucide-react';

export default function PrototypeJourneyStory() {
  return (
    <div className="min-h-screen bg-white">
      {/* ========== CHAPTER 1: Where You Are ========== */}
      <section className="bg-slate-100 px-4 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-slate-500" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
              Chapitre 1
            </span>
          </div>

          <h2 className="font-mono text-xl font-bold uppercase text-science-900 mb-4">
            Là Où Tu En Es
          </h2>

          {/* Problem Cards */}
          <div className="space-y-3">
            <ProblemCard 
              emoji="😔"
              text="Tes cheveux sont secs malgré tous tes soins"
            />
            <ProblemCard 
              emoji="💔"
              text="Tu trouves des cheveux cassés partout"
            />
            <ProblemCard 
              emoji="😤"
              text="Tu ne sais plus quoi essayer"
            />
          </div>

          <p className="text-sm text-text-secondary mt-4 italic">
            "On comprend. Et on a exactement ce qu'il te faut."
          </p>
        </motion.div>
      </section>

      {/* ========== TRANSITION ARROW ========== */}
      <div className="relative h-12 bg-gradient-to-b from-slate-100 to-white">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center shadow-lg">
          <ArrowRight className="w-6 h-6 text-white rotate-90" />
        </div>
      </div>

      {/* ========== CHAPTER 2: Where You Can Go ========== */}
      <section className="px-4 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Flag className="w-5 h-5 text-accent-500" />
            <span className="font-mono text-xs uppercase tracking-wider text-accent-600">
              Chapitre 2
            </span>
          </div>

          <h2 className="font-mono text-xl font-bold uppercase text-science-900 mb-4">
            Là Où Tu Peux Aller
          </h2>

          {/* Vision/Goals */}
          <div className="card p-6 bg-gradient-to-br from-accent-50 to-white border-accent-200 mb-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-accent-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-accent-500" />
              </div>
              <h3 className="font-mono font-bold text-lg text-science-900 mb-2">
                Dans 8 semaines...
              </h3>
              <ul className="space-y-2 text-left">
                <GoalItem text="Des cheveux qui brillent naturellement" />
                <GoalItem text="Moins de casse, plus de longueur retenue" />
                <GoalItem text="Une routine simple et efficace" />
                <GoalItem text="La fierté de créer tes propres soins" />
              </ul>
            </div>
          </div>

          {/* Timeline Preview */}
          <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-lg">
            <TimelineDot label="Aujourd'hui" active />
            <div className="flex-1 h-1 bg-slate-200 mx-2" />
            <TimelineDot label="Sem. 4" />
            <div className="flex-1 h-1 bg-slate-200 mx-2" />
            <TimelineDot label="Sem. 8" highlight />
          </div>
        </motion.div>
      </section>

      {/* ========== CHAPTER 3: The Path ========== */}
      <section className="bg-science-900 text-white px-4 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-accent-400" />
            <span className="font-mono text-xs uppercase tracking-wider text-accent-400">
              Chapitre 3
            </span>
          </div>

          <h2 className="font-mono text-xl font-bold uppercase mb-2">
            Ton Plan Personnalisé
          </h2>
          <p className="text-sm text-slate-300 mb-6">
            Basé sur ton profil unique: <strong>4C • Porosité Forte • Cuir Sec</strong>
          </p>

          {/* Two Paths */}
          <div className="space-y-4">
            {/* Path A: Products */}
            <PathCard
              title="Option A: Routine Prête"
              subtitle="Pour celles qui veulent du simple"
              items={['5 produits sélectionnés', 'Routine matin & soir', 'Guide d\'utilisation']}
              price={343}
              cta="Choisir cette option"
              variant="light"
            />

            {/* Path B: DIY */}
            <PathCard
              title="Option B: Pack Créatrice"
              subtitle="Pour celles qui veulent créer"
              items={['Ingrédients pour 3 recettes', 'Kit Starter DIY', 'Tutos vidéo inclus']}
              price={389}
              cta="Choisir cette option"
              variant="accent"
              badge="Populaire"
            />
          </div>
        </motion.div>
      </section>

      {/* ========== CHAPTER 4: Start Now ========== */}
      <section className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h2 className="font-mono text-lg font-bold uppercase text-science-900 mb-2">
            Prête à commencer ?
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Ton voyage vers des cheveux en pleine santé commence maintenant.
          </p>

          {/* Trust Badges */}
          <div className="flex justify-center gap-4 mb-6">
            <TrustBadge icon={<Clock className="w-4 h-4" />} text="Livraison 24-48h" />
            <TrustBadge icon={<Star className="w-4 h-4" />} text="4.8/5 avis" />
            <TrustBadge icon={<Heart className="w-4 h-4" />} text="Satisfait ou remboursé" />
          </div>

          {/* Final CTA */}
          <button className="btn-primary w-full py-4 text-lg">
            COMMENCER MON VOYAGE
          </button>

          <p className="text-xs text-text-muted mt-4">
            Paiement sécurisé • Livraison gratuite dès 200 DH
          </p>
        </motion.div>
      </section>
    </div>
  );
}

// Sub-components
function ProblemCard({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
      <span className="text-2xl">{emoji}</span>
      <p className="text-sm text-text-secondary">{text}</p>
    </div>
  );
}

function GoalItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-text-secondary">
      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
      {text}
    </li>
  );
}

function TimelineDot({ label, active = false, highlight = false }: { 
  label: string; 
  active?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="text-center">
      <div className={`
        w-4 h-4 rounded-full mx-auto mb-1
        ${highlight ? 'bg-green-500' : active ? 'bg-accent-500' : 'bg-slate-300'}
      `} />
      <span className="text-[10px] text-text-muted">{label}</span>
    </div>
  );
}

function PathCard({ title, subtitle, items, price, cta, variant, badge }: {
  title: string;
  subtitle: string;
  items: string[];
  price: number;
  cta: string;
  variant: 'light' | 'accent';
  badge?: string;
}) {
  const isAccent = variant === 'accent';
  
  return (
    <div className={`
      rounded-xl p-4 relative
      ${isAccent ? 'bg-accent-500' : 'bg-white/10'}
    `}>
      {badge && (
        <span className="absolute -top-2 right-4 px-2 py-0.5 bg-white text-science-900 text-[10px] font-bold rounded">
          {badge}
        </span>
      )}
      <h4 className="font-mono font-bold text-sm uppercase">{title}</h4>
      <p className="text-xs opacity-80 mb-3">{subtitle}</p>
      
      <ul className="space-y-1 mb-4">
        {items.map((item, i) => (
          <li key={i} className="text-xs flex items-center gap-2">
            <CheckCircle className="w-3 h-3" />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span className="font-mono text-xl font-bold">{price} DH</span>
        <button className={`
          px-4 py-2 rounded-lg font-mono text-xs uppercase font-bold
          ${isAccent ? 'bg-white text-accent-600' : 'bg-white/20'}
        `}>
          {cta}
        </button>
      </div>
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1 text-text-muted">
      {icon}
      <span className="text-[10px]">{text}</span>
    </div>
  );
}
