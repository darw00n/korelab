'use client';

// ============================================
// KORELAB - Order Success Page
// Displays order confirmation and protocol manual
// ============================================

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Loader2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Download,
  Home,
  User,
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { supabase } from '@/lib/supabase';
import { useDiagnosticStore } from '@/store/diagnosticStore';

// Types
interface RoutineStep {
  step: number;
  action: string;
  product?: string;
  quantity: string;
  duration?: string;
  frequency: string;
  instructions: string;
}

interface ProgressWeek {
  week: string;
  milestone: string;
  expectation: string;
}

interface ProtocolManual {
  profile: {
    texture: string;
    porosity: string;
    scalpType: string;
    concerns: string[];
  };
  products: {
    cleanser?: { name: string; usage: string };
    treatment?: { name: string; usage: string };
    finish?: { name: string; usage: string };
  };
  dailyRoutine: {
    morning: RoutineStep[];
    evening: RoutineStep[];
  };
  weeklyRoutine: RoutineStep[];
  personalizedTips: string[];
  thingsToAvoid: string[];
  progressTracker: ProgressWeek[];
  generatedAt: string;
}

// ===================
// SUCCESS PAGE CONTENT
// ===================

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { results, answers } = useDiagnosticStore();
  
  const orderId = searchParams.get('orderId');
  
  const [protocol, setProtocol] = useState<ProtocolManual | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['tips']));

  // Fetch protocol manual
  useEffect(() => {
    async function fetchProtocol() {
      if (!results) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/ai/protocol', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profile: results.profile,
            userProblemDescription: answers.userProblemDescription,
            products: results.products.map(p => ({
              name: p.name,
              type: p.product_type,
            })),
            orderId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch protocol');
        }

        const data = await response.json();
        setProtocol(data.protocol);
      } catch (err) {
        console.error('Protocol fetch error:', err);
        setError('Impossible de charger le protocole');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProtocol();
  }, [results, answers, orderId]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <MobileShell showHeader={false} showBottomNav={false}>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
          <Loader2 className="w-8 h-8 text-accent-500 animate-spin mb-4" />
          <p className="font-mono text-sm uppercase tracking-wider text-text-secondary">
            Préparation de ton protocole...
          </p>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell showHeader={false} showBottomNav={false}>
      <div className="min-h-screen bg-slate-50">
        {/* Success Header */}
        <div className="bg-success-600 text-white px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono font-bold text-xl uppercase tracking-wider mb-2"
          >
            Commande Confirmée !
          </motion.h1>
          
          {orderId && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-xs opacity-80"
            >
              #{orderId.slice(0, 8).toUpperCase()}
            </motion.p>
          )}
        </div>

        {/* Protocol Manual Section */}
        <div className="px-4 py-6 space-y-4">
          {/* Protocol Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6 bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent-500 text-white rounded-sm flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-mono font-bold text-lg uppercase tracking-wider text-science-900">
                  Ton Manuel d'Application
                </h2>
                <p className="font-sans text-xs text-text-secondary">
                  Protocole personnalisé KoreLab
                </p>
              </div>
            </div>

            {protocol && (
              <div className="p-3 bg-slate-50 rounded-md">
                <p className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-2">
                  Ton profil
                </p>
                <p className="font-sans text-sm text-text-primary">
                  {protocol.profile.texture} • {protocol.profile.porosity} • {protocol.profile.scalpType}
                </p>
              </div>
            )}
          </motion.div>

          {protocol && (
            <>
              {/* Personalized Tips Section */}
              <CollapsibleSection
                title="Conseils Personnalisés"
                icon={<TrendingUp className="w-5 h-5" />}
                isExpanded={expandedSections.has('tips')}
                onToggle={() => toggleSection('tips')}
                delay={0.5}
                badge="IA"
              >
                <div className="space-y-3">
                  {protocol.personalizedTips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 bg-accent-50 border border-accent-200 rounded-md"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center">
                        <span className="font-mono text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="font-sans text-sm text-accent-800">{tip}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Daily Routine Section */}
              <CollapsibleSection
                title="Routine Quotidienne"
                icon={<Sun className="w-5 h-5" />}
                isExpanded={expandedSections.has('daily')}
                onToggle={() => toggleSection('daily')}
                delay={0.6}
              >
                {/* Morning */}
                {protocol.dailyRoutine.morning.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sun className="w-4 h-4 text-amber-500" />
                      <h4 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
                        Matin
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {protocol.dailyRoutine.morning.map((step, index) => (
                        <RoutineStepCard key={index} step={step} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Evening */}
                {protocol.dailyRoutine.evening.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Moon className="w-4 h-4 text-indigo-500" />
                      <h4 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
                        Soir
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {protocol.dailyRoutine.evening.map((step, index) => (
                        <RoutineStepCard key={index} step={step} />
                      ))}
                    </div>
                  </div>
                )}
              </CollapsibleSection>

              {/* Weekly Routine Section */}
              <CollapsibleSection
                title="Routine Hebdomadaire"
                icon={<Calendar className="w-5 h-5" />}
                isExpanded={expandedSections.has('weekly')}
                onToggle={() => toggleSection('weekly')}
                delay={0.7}
              >
                <div className="space-y-2">
                  {protocol.weeklyRoutine.map((step, index) => (
                    <RoutineStepCard key={index} step={step} />
                  ))}
                </div>
              </CollapsibleSection>

              {/* Things to Avoid Section */}
              <CollapsibleSection
                title="À Éviter"
                icon={<AlertTriangle className="w-5 h-5" />}
                isExpanded={expandedSections.has('avoid')}
                onToggle={() => toggleSection('avoid')}
                delay={0.8}
              >
                <div className="space-y-2">
                  {protocol.thingsToAvoid.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-md"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="font-sans text-sm text-red-800">{item}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Progress Tracker Section */}
              <CollapsibleSection
                title="Suivi des Progrès"
                icon={<TrendingUp className="w-5 h-5" />}
                isExpanded={expandedSections.has('progress')}
                onToggle={() => toggleSection('progress')}
                delay={0.9}
              >
                <div className="space-y-3">
                  {protocol.progressTracker.map((week, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-md"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-science-900 text-white rounded-full flex items-center justify-center">
                          <span className="font-mono text-xs font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-mono font-bold text-sm text-science-900">
                            {week.week}
                          </p>
                          <p className="font-sans text-xs text-accent-600">
                            {week.milestone}
                          </p>
                        </div>
                      </div>
                      <p className="font-sans text-sm text-text-secondary ml-10">
                        {week.expectation}
                      </p>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </>
          )}

          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
              <p className="font-sans text-sm text-amber-800">
                {error}. Consultez votre espace profil pour retrouver votre protocole.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-3 pt-4"
          >
            <button
              onClick={() => router.push('/profil')}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              VOIR MES COMMANDES
            </button>
            <button
              onClick={() => router.push('/')}
              className="btn-secondary w-full py-4 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              RETOUR À L'ACCUEIL
            </button>
          </motion.div>
        </div>
      </div>
    </MobileShell>
  );
}

// ===================
// COLLAPSIBLE SECTION
// ===================

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  delay?: number;
  badge?: string;
}

function CollapsibleSection({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
  delay = 0,
  badge,
}: CollapsibleSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card bg-white overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-science-900 text-white rounded-sm flex items-center justify-center">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
              {title}
            </h3>
            {badge && (
              <span className="badge badge-accent text-[10px] mt-1">{badge}</span>
            )}
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-text-secondary" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-secondary" />
        )}
      </button>
      
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

// ===================
// ROUTINE STEP CARD
// ===================

interface RoutineStepCardProps {
  step: RoutineStep;
}

function RoutineStepCard({ step }: RoutineStepCardProps) {
  return (
    <div className="p-3 border border-slate-200 rounded-md">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center">
          <span className="font-mono text-xs font-bold">{step.step}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-bold text-sm text-science-900">
              {step.action}
            </span>
            <span className="badge text-[10px]">{step.frequency}</span>
          </div>
          {step.product && (
            <p className="font-mono text-xs text-accent-600 mb-1">
              {step.product}
            </p>
          )}
          <p className="font-sans text-xs text-text-secondary mb-1">
            <strong>Quantité:</strong> {step.quantity}
          </p>
          {step.duration && (
            <p className="font-sans text-xs text-text-secondary mb-1">
              <strong>Durée:</strong> {step.duration}
            </p>
          )}
          <p className="font-sans text-xs text-text-secondary">
            → {step.instructions}
          </p>
        </div>
      </div>
    </div>
  );
}

// ===================
// PAGE EXPORT
// ===================

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <MobileShell showHeader={false} showBottomNav={false}>
          <div className="min-h-screen bg-white flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-science-900 animate-spin" />
          </div>
        </MobileShell>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
