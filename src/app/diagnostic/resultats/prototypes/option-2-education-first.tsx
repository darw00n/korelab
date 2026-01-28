'use client';

// ============================================
// PROTOTYPE OPTION 2: "EDUCATION-FIRST"
// Focus: Construire la confiance par l'expertise
// ============================================
// 
// PHILOSOPHIE:
// - L'utilisatrice veut COMPRENDRE ses cheveux
// - L'éducation crée la confiance
// - Une fois qu'elle comprend, elle achète
//
// STRUCTURE:
// 1. "Comprendre tes cheveux" (analyse IA détaillée)
// 2. Explication visuelle (schéma porosité/cuticules)
// 3. "La solution" → Produits + Recettes
// 4. Timeline de résultats attendus
//
// AVANTAGES:
// ✅ Crée de la confiance et fidélité
// ✅ L'utilisatrice se sent experte
// ✅ Différenciant vs concurrents "juste e-commerce"
//
// INCONVÉNIENTS:
// ❌ Plus long avant le CTA
// ❌ Peut perdre les utilisatrices pressées
// ============================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Lightbulb, 
  Target, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Droplets,
  ShoppingBag,
  Beaker,
  Clock
} from 'lucide-react';

export default function PrototypeEducationFirst() {
  const [expandedSection, setExpandedSection] = useState<string | null>('analysis');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ========== HEADER: Profile Card ========== */}
      <header className="bg-white px-4 pt-6 pb-4 border-b border-slate-200">
        <p className="font-mono text-xs text-accent-600 uppercase tracking-wider mb-2">
          Ton Analyse Capillaire
        </p>
        <h1 className="font-mono text-2xl font-bold text-science-900 uppercase tracking-wider">
          Profil: Cheveux Poreux
        </h1>
        <p className="font-sans text-sm text-text-secondary mt-2">
          Voici ce que nous avons découvert sur tes cheveux et comment les sublimer.
        </p>

        {/* Profile Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1.5 bg-science-900 text-white text-xs font-mono rounded">
            Type 4C
          </span>
          <span className="px-3 py-1.5 bg-amber-100 text-amber-800 text-xs font-mono rounded">
            Porosité Forte
          </span>
          <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs font-mono rounded">
            Cuir Chevelu Sec
          </span>
        </div>
      </header>

      {/* ========== SECTION 1: Comprendre (IA Analysis) ========== */}
      <section className="px-4 py-6">
        <CollapsibleCard
          icon={<Brain className="w-5 h-5" />}
          title="Comprendre Tes Cheveux"
          subtitle="Analyse par notre IA"
          isExpanded={expandedSection === 'analysis'}
          onToggle={() => setExpandedSection(expandedSection === 'analysis' ? null : 'analysis')}
          color="#1e3a5f"
        >
          <div className="space-y-4">
            {/* Nature des cheveux */}
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-mono text-xs uppercase text-blue-800 font-bold">
                    Nature de tes cheveux
                  </p>
                  <p className="font-sans text-sm text-blue-700 mt-1">
                    Tes cuticules sont <strong>naturellement ouvertes</strong>, ce qui signifie que l'eau et les soins pénètrent facilement... mais ressortent tout aussi vite ! C'est pourquoi tu ressens souvent de la sécheresse malgré tes soins.
                  </p>
                </div>
              </div>
            </div>

            {/* Cuticle Diagram */}
            <div className="p-4 bg-white rounded-lg border">
              <p className="font-mono text-xs uppercase text-text-muted mb-3">
                Schéma: Tes Cuticules
              </p>
              <div className="flex justify-between items-center">
                {/* Before */}
                <div className="text-center">
                  <div className="w-20 h-16 mx-auto mb-2">
                    {/* SVG Cuticle ouverte */}
                    <svg viewBox="0 0 80 50" className="w-full h-full">
                      <ellipse cx="40" cy="25" rx="35" ry="12" fill="#d4a574" stroke="#8b5e34" strokeWidth="2"/>
                      <path d="M10 20 Q20 8 30 22" stroke="#8b5e34" strokeWidth="2" fill="none"/>
                      <path d="M25 20 Q35 8 45 22" stroke="#8b5e34" strokeWidth="2" fill="none"/>
                      <path d="M40 20 Q50 8 60 22" stroke="#8b5e34" strokeWidth="2" fill="none"/>
                      <path d="M55 20 Q65 8 75 22" stroke="#8b5e34" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <p className="text-[10px] text-text-muted">Cuticules ouvertes</p>
                  <p className="text-[10px] text-red-600">= Perte d'hydratation</p>
                </div>

                {/* Arrow */}
                <div className="text-accent-500 font-bold">→</div>

                {/* After */}
                <div className="text-center">
                  <div className="w-20 h-16 mx-auto mb-2">
                    {/* SVG Cuticle fermée */}
                    <svg viewBox="0 0 80 50" className="w-full h-full">
                      <ellipse cx="40" cy="25" rx="35" ry="12" fill="#e8c49a" stroke="#8b5e34" strokeWidth="2"/>
                      <path d="M10 23 Q20 20 30 23" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
                      <path d="M25 23 Q35 20 45 23" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
                      <path d="M40 23 Q50 20 60 23" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
                      <path d="M55 23 Q65 20 75 23" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
                      <ellipse cx="30" cy="18" rx="8" ry="3" fill="white" opacity="0.5"/>
                    </svg>
                  </div>
                  <p className="text-[10px] text-text-muted">Cuticules scellées</p>
                  <p className="text-[10px] text-green-600">= Hydratation retenue</p>
                </div>
              </div>
            </div>

            {/* Diagnostic */}
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-mono text-xs uppercase text-amber-800 font-bold">
                    Ton problème principal
                  </p>
                  <p className="font-sans text-sm text-amber-700 mt-1">
                    La <strong>sécheresse chronique</strong> et la <strong>casse</strong> que tu observes sont directement liées à cette porosité élevée. Tes cheveux absorbent les soins mais ne les retiennent pas.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-mono text-xs uppercase text-green-800 font-bold">
                    La stratégie
                  </p>
                  <p className="font-sans text-sm text-green-700 mt-1">
                    Tu as besoin de <strong>protéines</strong> pour renforcer la fibre, puis de <strong>beurres lourds</strong> pour sceller l'hydratation. La méthode LOC (Liquid-Oil-Cream) sera ta meilleure alliée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleCard>
      </section>

      {/* ========== SECTION 2: La Solution ========== */}
      <section className="px-4 pb-6">
        <CollapsibleCard
          icon={<ShoppingBag className="w-5 h-5" />}
          title="Ta Routine Personnalisée"
          subtitle="5 produits sélectionnés"
          isExpanded={expandedSection === 'products'}
          onToggle={() => setExpandedSection(expandedSection === 'products' ? null : 'products')}
          color="#d4a574"
        >
          <div className="space-y-3">
            <p className="text-sm text-text-secondary mb-4">
              Ces produits ont été sélectionnés spécifiquement pour sceller tes cuticules et retenir l'hydratation.
            </p>
            
            {/* Products list would go here */}
            <div className="p-4 bg-slate-100 rounded-lg text-center">
              <p className="text-sm text-text-muted">[Liste des 5 produits avec explications]</p>
            </div>

            <button className="btn-primary w-full py-3 mt-4">
              Voir les produits (343 DH)
            </button>
          </div>
        </CollapsibleCard>
      </section>

      {/* ========== SECTION 3: Recettes DIY ========== */}
      <section className="px-4 pb-6">
        <CollapsibleCard
          icon={<Beaker className="w-5 h-5" />}
          title="Recettes DIY Pour Toi"
          subtitle="3 recettes adaptées"
          isExpanded={expandedSection === 'recipes'}
          onToggle={() => setExpandedSection(expandedSection === 'recipes' ? null : 'recipes')}
          color="#22c55e"
        >
          <div className="p-4 bg-slate-100 rounded-lg text-center">
            <p className="text-sm text-text-muted">[3 recettes DIY personnalisées]</p>
          </div>
        </CollapsibleCard>
      </section>

      {/* ========== SECTION 4: Timeline ========== */}
      <section className="px-4 pb-6">
        <CollapsibleCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="Résultats Attendus"
          subtitle="Ton parcours sur 8 semaines"
          isExpanded={expandedSection === 'timeline'}
          onToggle={() => setExpandedSection(expandedSection === 'timeline' ? null : 'timeline')}
          color="#8b5cf6"
        >
          <div className="space-y-4">
            <TimelineStep 
              week="Semaine 1-2"
              title="Phase d'adaptation"
              description="Tes cheveux s'habituent aux nouveaux soins. Possible période de transition."
              status="start"
            />
            <TimelineStep 
              week="Semaine 3-4"
              title="Premiers résultats"
              description="Moins de sécheresse, cheveux plus souples au toucher."
              status="progress"
            />
            <TimelineStep 
              week="Semaine 5-8"
              title="Transformation visible"
              description="Brillance naturelle, moins de casse, boucles définies."
              status="end"
            />
          </div>
        </CollapsibleCard>
      </section>

      {/* ========== STICKY CTA ========== */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
        <button className="btn-primary w-full py-4 flex items-center justify-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          COMMANDER MA ROUTINE • 343 DH
        </button>
      </div>
    </div>
  );
}

// Sub-components
function CollapsibleCard({ icon, title, subtitle, isExpanded, onToggle, color, children }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isExpanded: boolean;
  onToggle: () => void;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {icon}
          </div>
          <div className="text-left">
            <h2 className="font-mono font-bold text-sm uppercase">{title}</h2>
            <p className="text-xs text-text-muted">{subtitle}</p>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="px-4 pb-4 border-t border-slate-100"
        >
          <div className="pt-4">{children}</div>
        </motion.div>
      )}
    </div>
  );
}

function TimelineStep({ week, title, description, status }: {
  week: string;
  title: string;
  description: string;
  status: 'start' | 'progress' | 'end';
}) {
  const colors = {
    start: 'bg-blue-500',
    progress: 'bg-amber-500',
    end: 'bg-green-500',
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${colors[status]}`} />
        {status !== 'end' && <div className="w-0.5 flex-1 bg-slate-200 mt-1" />}
      </div>
      <div className="pb-4">
        <p className="font-mono text-xs text-text-muted">{week}</p>
        <p className="font-mono font-bold text-sm">{title}</p>
        <p className="text-xs text-text-secondary mt-1">{description}</p>
      </div>
    </div>
  );
}
