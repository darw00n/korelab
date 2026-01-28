'use client';

// ============================================
// KORELAB - Results Page (Education-First)
// Main diagnostic results component
// ============================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
  Clock,
  Star,
  Check,
  Plus,
  Loader2,
  Sparkles,
  Sun,
  Moon,
  Calendar
} from 'lucide-react';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useCartStore } from '@/store/cartStore';
import { CuticleDiagram } from './education/CuticleDiagram';
import type { ScoredProduct, Recipe } from '@/types/database.types';

// ============================================
// MAIN COMPONENT
// ============================================

export function ResultsPageEducation() {
  const router = useRouter();
  const { results, answers } = useDiagnosticStore();
  const addToCart = useCartStore((state) => state.addItem);
  
  const [expandedSection, setExpandedSection] = useState<string>('analysis');
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  // Fetch AI analysis
  useEffect(() => {
    async function fetchAIAnalysis() {
      if (!results?.profile) return;
      
      setIsLoadingAI(true);
      try {
        const response = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profile: results.profile,
            userProblemDescription: answers.userProblemDescription,
            userDesiredSolution: answers.userDesiredSolution,
            products: results.products.map(p => ({ name: p.name, type: p.product_type })),
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setAiAnalysis(data.analysis);
        }
      } catch (error) {
        console.error('Error fetching AI analysis:', error);
      } finally {
        setIsLoadingAI(false);
      }
    }

    fetchAIAnalysis();
  }, [results, answers]);

  // Fetch personalized recipes
  useEffect(() => {
    async function fetchRecipes() {
      if (!results?.profile) return;
      
      try {
        const params = new URLSearchParams({
          porosity: results.profile.porosity?.toLowerCase() || '',
          texture: results.profile.texture?.toLowerCase() || '',
        });
        
        const response = await fetch(`/api/recipes?${params}`);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data.recipes?.slice(0, 3) || []);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }

    fetchRecipes();
  }, [results]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-500" />
      </div>
    );
  }

  const { products, matchScore, profile } = results;
  const totalPrice = products.reduce((sum, p) => sum + (p.price || 0), 0);

  const handleAddProduct = (product: ScoredProduct) => {
    addToCart(product, 1);
    setAddedProducts(prev => new Set([...Array.from(prev), product.id]));
  };

  const handleAddAllProducts = () => {
    products.forEach(product => {
      if (!addedProducts.has(product.id)) {
        addToCart(product, 1);
      }
    });
    setAddedProducts(new Set(products.map(p => p.id)));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* ========== HEADER ========== */}
      <header className="bg-white px-4 pt-6 pb-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <p className="font-mono text-xs text-accent-600 uppercase tracking-wider">
            Ton Analyse Capillaire
          </p>
          <div className="flex items-center gap-1 bg-accent-100 px-2 py-1 rounded">
            <Star className="w-3 h-3 text-accent-600 fill-accent-600" />
            <span className="font-mono text-xs font-bold text-accent-700">{matchScore}%</span>
          </div>
        </div>
        
        <h1 className="font-mono text-xl font-bold text-science-900 uppercase tracking-wider">
          Profil: {getPorosityLabel(profile.porosity)}
        </h1>
        
        <p className="font-sans text-sm text-text-secondary mt-2">
          Voici ce que nous avons découvert sur tes cheveux et comment les sublimer.
        </p>

        {/* Profile Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {profile.texture && (
            <span className="px-3 py-1.5 bg-science-900 text-white text-xs font-mono rounded">
              {profile.texture}
            </span>
          )}
          {profile.porosity && (
            <span className="px-3 py-1.5 bg-amber-100 text-amber-800 text-xs font-mono rounded">
              Porosité {profile.porosity}
            </span>
          )}
          {profile.scalpType && (
            <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs font-mono rounded">
              Cuir {profile.scalpType}
            </span>
          )}
        </div>
      </header>

      {/* ========== SECTION 1: AI ANALYSIS ========== */}
      <section className="px-4 py-6">
        <CollapsibleCard
          icon={<Brain className="w-5 h-5" />}
          title="Comprendre Tes Cheveux"
          subtitle="Analyse par notre IA"
          isExpanded={expandedSection === 'analysis'}
          onToggle={() => setExpandedSection(expandedSection === 'analysis' ? '' : 'analysis')}
          color="#1e3a5f"
        >
          {isLoadingAI ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-science-900" />
              <span className="ml-2 text-sm text-text-muted">Analyse en cours...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Nature */}
              <AnalysisCard
                icon={<Droplets className="w-4 h-4" />}
                title="Nature de tes cheveux"
                content={aiAnalysis?.hairNatureExplanation || getDefaultNatureText(profile.porosity)}
                color="blue"
              />

              {/* Cuticle Diagram */}
              <CuticleDiagram porosity={profile.porosity || 'moyenne'} />

              {/* Problem */}
              <AnalysisCard
                icon={<Target className="w-4 h-4" />}
                title="Ton problème principal"
                content={aiAnalysis?.problemDiagnosis || getDefaultProblemText(profile.porosity, profile.concerns)}
                color="amber"
              />

              {/* Solution */}
              <AnalysisCard
                icon={<Lightbulb className="w-4 h-4" />}
                title="La stratégie"
                content={aiAnalysis?.solutionStrategy || getDefaultSolutionText(profile.porosity)}
                color="green"
              />
            </div>
          )}
        </CollapsibleCard>
      </section>

      {/* ========== SECTION 2: ROUTINE ========== */}
      <section className="px-4 pb-6">
        <CollapsibleCard
          icon={<ShoppingBag className="w-5 h-5" />}
          title="Ta Routine Personnalisée"
          subtitle={`${products.length} produits • ${getRoutineFrequency(profile.porosity)}`}
          isExpanded={expandedSection === 'products'}
          onToggle={() => setExpandedSection(expandedSection === 'products' ? '' : 'products')}
          color="#d4a574"
        >
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              Routine adaptée pour {getProductExplanation(profile.porosity)}.
            </p>
            
            {/* Routine par moment de la journée */}
            <RoutineTimeline 
              products={products}
              profile={profile}
              addedProducts={addedProducts}
              onAddProduct={handleAddProduct}
            />

            {/* Total et CTA */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-text-muted">Total routine complète</span>
                <span className="font-mono font-bold text-lg">{totalPrice} DH</span>
              </div>
              <button 
                onClick={handleAddAllProducts}
                className="btn-primary w-full py-3"
              >
                AJOUTER TOUTE LA ROUTINE
              </button>
            </div>
          </div>
        </CollapsibleCard>
      </section>

      {/* ========== SECTION 3: RECIPES ========== */}
      <section className="px-4 pb-6">
        <CollapsibleCard
          icon={<Beaker className="w-5 h-5" />}
          title="Recettes DIY Pour Toi"
          subtitle={`${recipes.length} recettes adaptées`}
          isExpanded={expandedSection === 'recipes'}
          onToggle={() => setExpandedSection(expandedSection === 'recipes' ? '' : 'recipes')}
          color="#22c55e"
        >
          {recipes.length > 0 ? (
            <div className="space-y-3">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
              <button 
                onClick={() => router.push('/recettes')}
                className="w-full py-3 text-center text-accent-600 font-mono text-sm"
              >
                Voir toutes les recettes →
              </button>
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-4">
              Chargement des recettes...
            </p>
          )}
        </CollapsibleCard>
      </section>

      {/* ========== SECTION 4: TIMELINE ========== */}
      <section className="px-4 pb-6">
        <CollapsibleCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="Résultats Attendus"
          subtitle={`Ton parcours sur ${getTimelineWeeks(profile.porosity)} semaines`}
          isExpanded={expandedSection === 'timeline'}
          onToggle={() => setExpandedSection(expandedSection === 'timeline' ? '' : 'timeline')}
          color="#8b5cf6"
        >
          <div className="space-y-4">
            {getTimelineSteps(profile.porosity).map((step, index, arr) => (
              <TimelineStep 
                key={step.week}
                week={step.week}
                title={step.title}
                description={step.description}
                isLast={index === arr.length - 1}
                status={step.status}
              />
            ))}
          </div>
        </CollapsibleCard>
      </section>

      {/* ========== STICKY CTA ========== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 safe-area-inset-bottom z-30">
        <button 
          onClick={() => router.push('/panier')}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          VOIR MON PANIER • {totalPrice} DH
        </button>
      </div>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

interface AIAnalysis {
  hairNatureExplanation: string;
  problemDiagnosis: string;
  solutionStrategy: string;
  expectedResults: string;
}

function CollapsibleCard({ 
  icon, 
  title, 
  subtitle, 
  isExpanded, 
  onToggle, 
  color, 
  children 
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isExpanded: boolean;
  onToggle: () => void;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div 
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
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
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 border-t border-slate-100"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AnalysisCard({ 
  icon, 
  title, 
  content, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  content: string; 
  color: 'blue' | 'amber' | 'green';
}) {
  const colors = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800', icon: 'text-blue-600', content: 'text-blue-700' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-800', icon: 'text-amber-600', content: 'text-amber-700' },
    green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800', icon: 'text-green-600', content: 'text-green-700' },
  };
  const c = colors[color];

  return (
    <div className={`p-4 ${c.bg} rounded-lg border-l-4 ${c.border}`}>
      <div className="flex items-start gap-2">
        <span className={`${c.icon} mt-0.5`}>{icon}</span>
        <div>
          <p className={`font-mono text-xs uppercase ${c.text} font-bold`}>
            {title}
          </p>
          <p className={`font-sans text-sm ${c.content} mt-1`}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ 
  product, 
  index, 
  isAdded, 
  onAdd 
}: { 
  product: ScoredProduct; 
  index: number; 
  isAdded: boolean; 
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
      <div className="w-8 h-8 bg-science-900 text-white rounded-full flex items-center justify-center font-mono text-sm font-bold">
        {index}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm font-bold text-science-900 truncate">{product.name}</p>
        <p className="text-xs text-text-muted truncate">{product.short_description}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-bold">{product.price} DH</span>
        <button
          onClick={onAdd}
          disabled={isAdded}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-colors
            ${isAdded ? 'bg-green-100 text-green-600' : 'bg-accent-100 text-accent-600'}
          `}
        >
          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  
  return (
    <div 
      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
      onClick={() => router.push(`/recettes/${recipe.slug}`)}
    >
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${recipe.color_hex || '#22c55e'}20` }}
      >
        <Beaker className="w-5 h-5" style={{ color: recipe.color_hex || '#22c55e' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm font-bold text-science-900">{recipe.name}</p>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span><Clock className="w-3 h-3 inline" /> {recipe.prep_time_minutes} min</span>
          <span>•</span>
          <span className="flex">
            {[...Array(3)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${
                  i < (recipe.difficulty === 'debutant' ? 1 : recipe.difficulty === 'intermediaire' ? 2 : 3) 
                    ? 'text-amber-500 fill-amber-500' 
                    : 'text-slate-200'
                }`} 
              />
            ))}
          </span>
        </div>
      </div>
      <Sparkles className="w-4 h-4 text-accent-500" />
    </div>
  );
}

function TimelineStep({ 
  week, 
  title, 
  description, 
  isLast,
  status 
}: { 
  week: string; 
  title: string; 
  description: string; 
  isLast: boolean;
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
        {!isLast && <div className="w-0.5 flex-1 bg-slate-200 mt-1" />}
      </div>
      <div className="pb-4">
        <p className="font-mono text-xs text-text-muted">{week}</p>
        <p className="font-mono font-bold text-sm">{title}</p>
        <p className="text-xs text-text-secondary mt-1">{description}</p>
      </div>
    </div>
  );
}

// ============================================
// ROUTINE TIMELINE COMPONENT
// ============================================

function RoutineTimeline({ 
  products, 
  profile, 
  addedProducts, 
  onAddProduct 
}: { 
  products: ScoredProduct[];
  profile: any;
  addedProducts: Set<string>;
  onAddProduct: (product: ScoredProduct) => void;
}) {
  // Grouper les produits par type
  const cleanser = products.find(p => p.product_type === 'cleanser');
  const treatment = products.find(p => p.product_type === 'treatment');
  const finish = products.find(p => p.product_type === 'finish');
  const isHighPorosity = profile.porosity?.toLowerCase().includes('fort');

  return (
    <div className="space-y-4">
      {/* MATIN */}
      <div className="bg-amber-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono font-bold text-sm text-amber-900">MATIN</h4>
            <p className="text-[10px] text-amber-700">Quotidien • 5-10 min</p>
          </div>
        </div>
        <div className="space-y-2 ml-10">
          <RoutineStepItem 
            step={1}
            label="Hydratation"
            product={finish}
            instruction="Vaporiser ou appliquer sur cheveux humides"
            quantity="2-3 pressions"
            isAdded={finish ? addedProducts.has(finish.id) : false}
            onAdd={() => finish && onAddProduct(finish)}
          />
          {isHighPorosity && (
            <RoutineStepItem 
              step={2}
              label="Scellage"
              product={treatment}
              instruction="Appliquer sur les pointes pour sceller"
              quantity="Noisette"
              isAdded={treatment ? addedProducts.has(treatment.id) : false}
              onAdd={() => treatment && onAddProduct(treatment)}
            />
          )}
        </div>
      </div>

      {/* SOIR */}
      <div className="bg-indigo-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center">
            <Moon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono font-bold text-sm text-indigo-900">SOIR</h4>
            <p className="text-[10px] text-indigo-700">2-3x/semaine • 20-30 min</p>
          </div>
        </div>
        <div className="space-y-2 ml-10">
          <RoutineStepItem 
            step={1}
            label="Traitement"
            product={treatment}
            instruction="Bain d'huile ou masque, laisser poser"
            quantity="Selon longueur"
            isAdded={treatment ? addedProducts.has(treatment.id) : false}
            onAdd={() => treatment && onAddProduct(treatment)}
          />
          <div className="flex items-center gap-2 p-2 bg-white/50 rounded">
            <div className="w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center text-[10px] font-bold text-indigo-700">2</div>
            <div className="flex-1">
              <p className="text-xs font-mono text-indigo-900">PROTECTION NUIT</p>
              <p className="text-[10px] text-indigo-700">Bonnet satin ou foulard</p>
            </div>
          </div>
        </div>
      </div>

      {/* HEBDOMADAIRE */}
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono font-bold text-sm text-green-900">HEBDOMADAIRE</h4>
            <p className="text-[10px] text-green-700">1-2x/semaine • Jour de lavage</p>
          </div>
        </div>
        <div className="space-y-2 ml-10">
          <RoutineStepItem 
            step={1}
            label="Nettoyage"
            product={cleanser}
            instruction="Masser le cuir chevelu, rincer abondamment"
            quantity="1 noisette"
            isAdded={cleanser ? addedProducts.has(cleanser.id) : false}
            onAdd={() => cleanser && onAddProduct(cleanser)}
          />
          <RoutineStepItem 
            step={2}
            label="Soin profond"
            product={treatment}
            instruction="Masque réparateur, laisser poser 30 min"
            quantity="Généreusement"
            isAdded={treatment ? addedProducts.has(treatment.id) : false}
            onAdd={() => treatment && onAddProduct(treatment)}
          />
          <RoutineStepItem 
            step={3}
            label="Styling"
            product={finish}
            instruction="Définir les boucles sur cheveux mouillés"
            quantity="2-3 pressions"
            isAdded={finish ? addedProducts.has(finish.id) : false}
            onAdd={() => finish && onAddProduct(finish)}
          />
        </div>
      </div>

      {/* Liste des produits avec prix */}
      <div className="bg-slate-100 rounded-lg p-4">
        <p className="font-mono text-xs text-text-muted uppercase mb-3">Produits inclus</p>
        <div className="space-y-2">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between bg-white p-2 rounded">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                  product.product_type === 'cleanser' ? 'bg-blue-500' :
                  product.product_type === 'treatment' ? 'bg-purple-500' : 'bg-green-500'
                }`}>
                  {product.product_type === 'cleanser' ? 'N' : product.product_type === 'treatment' ? 'T' : 'F'}
                </div>
                <span className="text-xs font-mono truncate max-w-[150px]">{product.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold">{product.price} DH</span>
                <button
                  onClick={() => onAddProduct(product)}
                  disabled={addedProducts.has(product.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    addedProducts.has(product.id) ? 'bg-green-100 text-green-600' : 'bg-accent-100 text-accent-600'
                  }`}
                >
                  {addedProducts.has(product.id) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoutineStepItem({ 
  step, 
  label, 
  product, 
  instruction, 
  quantity,
  isAdded,
  onAdd
}: { 
  step: number;
  label: string;
  product?: ScoredProduct;
  instruction: string;
  quantity: string;
  isAdded: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-start gap-2 p-2 bg-white/50 rounded">
      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600 flex-shrink-0">
        {step}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold">{label}</span>
          {product && (
            <button
              onClick={onAdd}
              disabled={isAdded}
              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                isAdded ? 'bg-green-500 text-white' : 'bg-accent-500 text-white'
              }`}
            >
              {isAdded ? <Check className="w-2 h-2" /> : <Plus className="w-2 h-2" />}
            </button>
          )}
        </div>
        {product && (
          <p className="text-[10px] text-slate-600 truncate">{product.name}</p>
        )}
        <p className="text-[10px] text-slate-500">{quantity} • {instruction}</p>
      </div>
    </div>
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getRoutineFrequency(porosity?: string): string {
  const frequencies: Record<string, string> = {
    faible: 'Lavage 1x/semaine',
    moyenne: 'Lavage 1-2x/semaine',
    forte: 'Lavage 2-3x/semaine',
  };
  return frequencies[porosity?.toLowerCase() || ''] || frequencies.moyenne;
}

function getPorosityLabel(porosity?: string): string {
  const labels: Record<string, string> = {
    faible: 'Cheveux à Faible Porosité',
    moyenne: 'Cheveux à Porosité Équilibrée',
    forte: 'Cheveux Poreux',
  };
  return labels[porosity?.toLowerCase() || ''] || 'Ton Profil Capillaire';
}

function getDefaultNatureText(porosity?: string): string {
  const texts: Record<string, string> = {
    faible: "Tes cuticules sont naturellement fermées, ce qui signifie que l'eau et les soins ont du mal à pénétrer. C'est pourquoi tes cheveux peuvent parfois sembler lourds ou avec des résidus.",
    moyenne: "Tes cuticules s'ouvrent et se ferment normalement, ce qui te permet d'absorber et de retenir l'hydratation de manière équilibrée. C'est le profil idéal !",
    forte: "Tes cuticules sont naturellement ouvertes, ce qui signifie que l'eau et les soins pénètrent facilement... mais ressortent tout aussi vite ! C'est pourquoi tu ressens souvent de la sécheresse malgré tes soins.",
  };
  return texts[porosity?.toLowerCase() || ''] || texts.moyenne;
}

function getDefaultProblemText(porosity?: string, concerns?: string[]): string {
  const concernText = concerns?.length ? concerns.slice(0, 2).join(' et ').toLowerCase() : 'sécheresse';
  const texts: Record<string, string> = {
    faible: `La ${concernText} que tu observes est liée à la difficulté des soins à pénétrer tes cheveux. Ils restent en surface sans nourrir en profondeur.`,
    moyenne: `Ton profil équilibré signifie que la ${concernText} peut être corrigée facilement avec les bons produits.`,
    forte: `La ${concernText} que tu observes est directement liée à cette porosité élevée. Tes cheveux absorbent les soins mais ne les retiennent pas.`,
  };
  return texts[porosity?.toLowerCase() || ''] || texts.moyenne;
}

function getDefaultSolutionText(porosity?: string): string {
  const texts: Record<string, string> = {
    faible: "Tu as besoin de chaleur pour ouvrir tes cuticules et d'huiles légères qui pénètrent facilement. Évite les beurres lourds qui vont alourdir tes cheveux.",
    moyenne: "Tu peux utiliser une variété de produits. Concentre-toi sur l'équilibre hydratation/nutrition avec la méthode LOC classique.",
    forte: "Tu as besoin de protéines pour renforcer la fibre, puis de beurres lourds pour sceller l'hydratation. La méthode LOC (Liquid-Oil-Cream) sera ta meilleure alliée.",
  };
  return texts[porosity?.toLowerCase() || ''] || texts.moyenne;
}

function getProductExplanation(porosity?: string): string {
  const texts: Record<string, string> = {
    faible: "ouvrir tes cuticules et faire pénétrer les soins",
    moyenne: "maintenir l'équilibre hydratation-nutrition",
    forte: "sceller tes cuticules et retenir l'hydratation",
  };
  return texts[porosity?.toLowerCase() || ''] || texts.moyenne;
}

function getTimelineWeeks(porosity?: string): number {
  return porosity?.toLowerCase() === 'forte' ? 10 : porosity?.toLowerCase() === 'faible' ? 8 : 6;
}

function getTimelineSteps(porosity?: string): { week: string; title: string; description: string; status: 'start' | 'progress' | 'end' }[] {
  const timelines: Record<string, { week: string; title: string; description: string; status: 'start' | 'progress' | 'end' }[]> = {
    faible: [
      { week: 'Semaine 1-2', title: 'Ouverture des cuticules', description: 'Tes cheveux commencent à mieux absorber les soins grâce à la chaleur.', status: 'start' },
      { week: 'Semaine 3-5', title: 'Hydratation progressive', description: 'Les soins pénètrent mieux, tes cheveux deviennent plus souples.', status: 'progress' },
      { week: 'Semaine 6-8', title: 'Brillance naturelle', description: 'Cheveux nourris en profondeur, brillants et légers.', status: 'end' },
    ],
    moyenne: [
      { week: 'Semaine 1-2', title: 'Adaptation', description: 'Tes cheveux s\'habituent à la nouvelle routine.', status: 'start' },
      { week: 'Semaine 3-4', title: 'Équilibre atteint', description: 'Hydratation et nutrition parfaitement équilibrées.', status: 'progress' },
      { week: 'Semaine 5-6', title: 'Résultats optimaux', description: 'Cheveux sains, brillants et faciles à coiffer.', status: 'end' },
    ],
    forte: [
      { week: 'Semaine 1-2', title: 'Phase de reconstruction', description: 'Les protéines commencent à renforcer ta fibre capillaire.', status: 'start' },
      { week: 'Semaine 3-5', title: 'Scellement progressif', description: 'Tes cuticules se referment, l\'hydratation est mieux retenue.', status: 'progress' },
      { week: 'Semaine 6-8', title: 'Consolidation', description: 'Moins de casse, cheveux plus forts et plus souples.', status: 'progress' },
      { week: 'Semaine 9-10', title: 'Transformation visible', description: 'Brillance naturelle, hydratation longue durée, boucles définies.', status: 'end' },
    ],
  };
  return timelines[porosity?.toLowerCase() || ''] || timelines.moyenne;
}

export default ResultsPageEducation;
