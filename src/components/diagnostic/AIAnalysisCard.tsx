'use client';

// ============================================
// KORELAB - AI Analysis Card
// Displays AI-generated hair analysis
// ============================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Target, Lightbulb, TrendingUp, Loader2, AlertCircle } from 'lucide-react';

interface AIAnalysis {
  hairNatureExplanation: string;
  problemDiagnosis: string;
  solutionStrategy: string;
  expectedResults: string;
}

interface AIAnalysisCardProps {
  profile: {
    texture: string;
    porosity: string;
    scalpType: string;
    concerns: string[];
  };
  userProblemDescription?: string;
  userDesiredSolution?: string;
  products: { name: string; type: string }[];
  delay?: number;
}

export function AIAnalysisCard({
  profile,
  userProblemDescription,
  userDesiredSolution,
  products,
  delay = 0,
}: AIAnalysisCardProps) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalysis() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch text analysis
        const analyzeResponse = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profile,
            userProblemDescription,
            userDesiredSolution,
            products,
          }),
        });

        if (!analyzeResponse.ok) {
          throw new Error('Failed to fetch AI analysis');
        }

        const analyzeData = await analyzeResponse.json();
        setAnalysis(analyzeData.analysis);

        // Fetch educational image
        const imageResponse = await fetch('/api/ai/image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profile,
            mainConcern: profile.concerns[0],
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          setImageUrl(imageData.imageUrl);
        }
      } catch (err) {
        console.error('AI Analysis error:', err);
        setError('Impossible de charger l\'analyse AI');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalysis();
  }, [profile, userProblemDescription, userDesiredSolution, products]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="card p-6"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent-500 animate-spin mb-4" />
          <p className="font-mono text-sm uppercase tracking-wider text-text-secondary">
            Analyse en cours...
          </p>
          <p className="font-sans text-xs text-text-muted mt-2">
            Notre IA analyse ton profil capillaire
          </p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div>
            <p className="font-mono text-sm text-red-800">{error}</p>
            <p className="font-sans text-xs text-red-600 mt-1">
              L'analyse sera disponible dans les résultats standards ci-dessous.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-sm flex items-center justify-center">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <span className="badge badge-accent mb-1">ANALYSE IA</span>
          <h3 className="font-mono font-bold text-lg uppercase tracking-wider text-science-900">
            Ton Diagnostic Personnalisé
          </h3>
        </div>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-5">
        {/* Hair Nature */}
        <AnalysisSection
          icon={<Sparkles className="w-4 h-4" />}
          title="Nature de tes Cheveux"
          content={analysis.hairNatureExplanation}
          color="blue"
        />

        {/* Problem Diagnosis */}
        <AnalysisSection
          icon={<Target className="w-4 h-4" />}
          title="Diagnostic"
          content={analysis.problemDiagnosis}
          color="amber"
        />

        {/* Solution Strategy */}
        <AnalysisSection
          icon={<Lightbulb className="w-4 h-4" />}
          title="Stratégie Recommandée"
          content={analysis.solutionStrategy}
          color="green"
        />

        {/* Expected Results */}
        <AnalysisSection
          icon={<TrendingUp className="w-4 h-4" />}
          title="Résultats Attendus"
          content={analysis.expectedResults}
          color="purple"
        />
      </div>

      {/* Educational Image */}
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">
            Visualisation Éducative
          </p>
          <div className="rounded-md overflow-hidden border border-slate-200">
            <img
              src={imageUrl}
              alt="Illustration éducative de ton profil capillaire"
              className="w-full h-auto"
              onError={(e) => {
                // Hide image if it fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <p className="font-sans text-xs text-text-muted mt-2 text-center">
            Cette illustration montre l'évolution attendue de tes cheveux avec le protocole recommandé.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ===================
// ANALYSIS SECTION
// ===================

interface AnalysisSectionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  color: 'blue' | 'amber' | 'green' | 'purple';
}

function AnalysisSection({ icon, title, content, color }: AnalysisSectionProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      title: 'text-blue-800',
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      iconBg: 'bg-amber-100',
      iconText: 'text-amber-600',
      title: 'text-amber-800',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      title: 'text-green-800',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      title: 'text-purple-800',
    },
  };

  const classes = colorClasses[color];

  return (
    <div className={`p-4 rounded-md ${classes.bg} border ${classes.border}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-8 h-8 ${classes.iconBg} ${classes.iconText} rounded-sm flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-mono font-bold text-sm uppercase tracking-wider ${classes.title} mb-2`}>
            {title}
          </h4>
          <p className="font-sans text-sm text-text-primary leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIAnalysisCard;
