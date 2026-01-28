'use client';

// ============================================
// KORELAB - Recipe Detail Component
// Scientific/educational design with steps
// ============================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Beaker, 
  Star,
  Calendar,
  Package,
  AlertTriangle,
  CheckCircle,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Thermometer,
  Droplets,
  Sparkles,
  Info
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { RecipeWithDetails, RecipeDifficulty, RecipeType } from '@/types/database.types';

interface RecipeDetailProps {
  recipe: RecipeWithDetails & {
    estimatedCost?: number;
    essentialToolsCost?: number;
  };
}

// Map recipe types to French labels
const RECIPE_TYPE_LABELS: Record<RecipeType, string> = {
  spray: 'Spray',
  masque: 'Masque',
  bain_huile: 'Bain d\'huile',
  serum: 'Sérum',
  leave_in: 'Leave-in',
  beurre: 'Beurre',
  pre_poo: 'Pré-poo',
  rinse: 'Rinçage',
};

const DIFFICULTY_CONFIG: Record<RecipeDifficulty, { label: string; stars: number; color: string; bg: string }> = {
  debutant: { label: 'Débutant', stars: 1, color: 'text-green-600', bg: 'bg-green-50' },
  intermediaire: { label: 'Intermédiaire', stars: 2, color: 'text-amber-600', bg: 'bg-amber-50' },
  expert: { label: 'Expert', stars: 3, color: 'text-red-600', bg: 'bg-red-50' },
};

const UNIT_LABELS: Record<string, string> = {
  ml: 'ml',
  g: 'g',
  gouttes: 'gouttes',
  cuillere_soupe: 'c. à soupe',
  cuillere_cafe: 'c. à café',
};

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('ingredients');
  const addToCart = useCartStore((state) => state.addItem);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  
  const difficultyConfig = DIFFICULTY_CONFIG[recipe.difficulty];
  const typeLabel = RECIPE_TYPE_LABELS[recipe.recipe_type];

  const handleAddIngredient = (product: any) => {
    if (product) {
      addToCart(product, 1);
      setAddedItems(prev => new Set([...Array.from(prev), product.id]));
    }
  };

  const handleAddTool = (tool: any) => {
    if (tool) {
      // Add tool as a product to cart
      addToCart({
        ...tool,
        product_type: 'accessory',
        product_subtype: 'tool',
      }, 1);
      setAddedItems(prev => new Set([...Array.from(prev), tool.id]));
    }
  };

  const handleAddAllIngredients = () => {
    recipe.ingredients.forEach(ing => {
      if (ing.product) {
        addToCart(ing.product, 1);
        setAddedItems(prev => new Set([...Array.from(prev), ing.product!.id]));
      }
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div 
        className="relative pt-6 pb-8 px-4"
        style={{ backgroundColor: `${recipe.color_hex || '#1e3a5f'}15` }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-secondary">{typeLabel}</span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded ${difficultyConfig.bg}`}>
            {[...Array(3)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < difficultyConfig.stars ? difficultyConfig.color : 'text-slate-300'}`}
                fill={i < difficultyConfig.stars ? 'currentColor' : 'none'}
              />
            ))}
            <span className={`font-mono text-xs ml-1 ${difficultyConfig.color}`}>
              {difficultyConfig.label}
            </span>
          </div>
        </div>

        <h1 className="font-mono text-2xl font-bold uppercase tracking-wider text-science-900 mb-2">
          {recipe.name}
        </h1>
        <p className="font-sans text-sm text-text-secondary">
          {recipe.description}
        </p>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          <StatCard 
            icon={<Clock className="w-4 h-4" />}
            label="Préparation"
            value={`${recipe.prep_time_minutes} min`}
          />
          <StatCard 
            icon={<Beaker className="w-4 h-4" />}
            label="Rendement"
            value={recipe.yield_ml ? `${recipe.yield_ml}ml` : '-'}
          />
          <StatCard 
            icon={<Calendar className="w-4 h-4" />}
            label="Conservation"
            value={`${recipe.shelf_life_days}j`}
          />
          <StatCard 
            icon={<Package className="w-4 h-4" />}
            label="Applications"
            value={recipe.yield_applications ? `~${recipe.yield_applications}` : '-'}
          />
        </div>
      </div>

      {/* Benefits */}
      {recipe.benefits && recipe.benefits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mt-4"
        >
          <div className="card p-4 bg-accent-50 border-accent-200">
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-accent-800 mb-3">
              Bénéfices
            </h3>
            <div className="flex flex-wrap gap-2">
              {recipe.benefits.map((benefit, i) => (
                <span 
                  key={i}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-white rounded border border-accent-200 text-accent-700"
                >
                  <Sparkles className="w-3 h-3" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Warnings */}
      {recipe.warnings && recipe.warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-4 mt-4"
        >
          <div className="card p-4 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-amber-800 mb-2">
                  Précautions
                </h3>
                <ul className="space-y-1">
                  {recipe.warnings.map((warning, i) => (
                    <li key={i} className="font-sans text-xs text-amber-700">
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Collapsible Sections */}
      <div className="mt-6 space-y-3 px-4">
        {/* Ingredients Section */}
        <CollapsibleSection
          title="Ingrédients"
          subtitle={`${recipe.ingredients.length} produits`}
          icon={<Droplets className="w-5 h-5" />}
          isExpanded={expandedSection === 'ingredients'}
          onToggle={() => toggleSection('ingredients')}
          color={recipe.color_hex}
        >
          <div className="space-y-3 pt-2">
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem 
                key={ingredient.id} 
                ingredient={ingredient}
                index={index + 1}
                isAdded={addedItems.has(ingredient.product?.id || '')}
                onAdd={() => handleAddIngredient(ingredient.product)}
              />
            ))}
            
            {/* Add all button */}
            <button
              onClick={handleAddAllIngredients}
              className="btn-primary w-full py-3 mt-4 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              AJOUTER TOUS LES INGRÉDIENTS
            </button>
          </div>
        </CollapsibleSection>

        {/* Tools Section */}
        <CollapsibleSection
          title="Matériel Nécessaire"
          subtitle={`${recipe.tools.filter(t => t.is_essential).length} essentiels`}
          icon={<Beaker className="w-5 h-5" />}
          isExpanded={expandedSection === 'tools'}
          onToggle={() => toggleSection('tools')}
          color={recipe.color_hex}
        >
          <div className="space-y-3 pt-2">
            {/* Essential tools */}
            <div className="space-y-2">
              {recipe.tools.filter(t => t.is_essential).map(tool => (
                <ToolItem 
                  key={tool.id}
                  tool={tool}
                  isAdded={addedItems.has(tool.tool?.id || '')}
                  onAdd={() => handleAddTool(tool.tool)}
                />
              ))}
            </div>
            
            {/* Optional tools */}
            {recipe.tools.filter(t => !t.is_essential).length > 0 && (
              <>
                <p className="font-mono text-xs text-text-muted uppercase mt-4 mb-2">Optionnel</p>
                <div className="space-y-2">
                  {recipe.tools.filter(t => !t.is_essential).map(tool => (
                    <ToolItem 
                      key={tool.id}
                      tool={tool}
                      isAdded={addedItems.has(tool.tool?.id || '')}
                      onAdd={() => handleAddTool(tool.tool)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Kit starter info */}
            <div className="p-3 bg-accent-50 border border-accent-200 rounded-md mt-4">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" />
                <p className="font-sans text-xs text-accent-700">
                  Le <strong>Kit Starter DIY</strong> contient la plupart des outils essentiels à prix réduit !
                </p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Steps Section */}
        <CollapsibleSection
          title="Étapes de Préparation"
          subtitle={`${recipe.steps.length} étapes`}
          icon={<CheckCircle className="w-5 h-5" />}
          isExpanded={expandedSection === 'steps'}
          onToggle={() => toggleSection('steps')}
          color={recipe.color_hex}
        >
          <div className="space-y-4 pt-2">
            {recipe.steps.map((step, index) => (
              <StepItem 
                key={step.id}
                step={step}
                isLast={index === recipe.steps.length - 1}
                color={recipe.color_hex}
              />
            ))}
          </div>
        </CollapsibleSection>

        {/* Storage Section */}
        {recipe.storage_instructions && (
          <CollapsibleSection
            title="Conservation"
            subtitle={`${recipe.shelf_life_days} jours`}
            icon={<Thermometer className="w-5 h-5" />}
            isExpanded={expandedSection === 'storage'}
            onToggle={() => toggleSection('storage')}
            color={recipe.color_hex}
          >
            <div className="pt-2">
              <p className="font-sans text-sm text-text-secondary">
                {recipe.storage_instructions}
              </p>
              <div className="mt-3 p-3 bg-slate-50 rounded-md">
                <p className="font-mono text-xs text-text-muted">
                  <strong>Fréquence d'utilisation:</strong> {recipe.frequency}
                </p>
              </div>
            </div>
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
}

// ===================
// SUB-COMPONENTS
// ===================

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-md p-2 text-center">
      <div className="flex justify-center text-text-muted mb-1">{icon}</div>
      <p className="font-mono font-bold text-sm text-science-900">{value}</p>
      <p className="font-sans text-[10px] text-text-muted">{label}</p>
    </div>
  );
}

interface CollapsibleSectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  color?: string | null;
  children: React.ReactNode;
}

function CollapsibleSection({ title, subtitle, icon, isExpanded, onToggle, color, children }: CollapsibleSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-sm flex items-center justify-center"
            style={{ 
              backgroundColor: `${color || '#1e3a5f'}20`,
              color: color || '#1e3a5f'
            }}
          >
            {icon}
          </div>
          <div className="text-left">
            <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
              {title}
            </h3>
            <p className="font-sans text-xs text-text-muted">{subtitle}</p>
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
          className="px-4 pb-4 border-t border-slate-100"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

interface IngredientItemProps {
  ingredient: any;
  index: number;
  isAdded: boolean;
  onAdd: () => void;
}

function IngredientItem({ ingredient, index, isAdded, onAdd }: IngredientItemProps) {
  const unitLabel = UNIT_LABELS[ingredient.quantity_unit] || ingredient.quantity_unit;
  
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
      {/* Index/Percentage */}
      <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-science-900 rounded-sm flex flex-col items-center justify-center">
        {ingredient.percentage ? (
          <>
            <span className="font-mono font-bold text-sm text-science-900">{ingredient.percentage}%</span>
          </>
        ) : (
          <span className="font-mono font-bold text-lg text-science-900">{index}</span>
        )}
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-mono font-bold text-sm text-science-900">
          {ingredient.product?.name || 'Produit'}
        </p>
        <p className="font-sans text-xs text-text-secondary">
          <span className="font-bold">{ingredient.quantity_value} {unitLabel}</span>
          {ingredient.role && <span className="text-text-muted"> • {ingredient.role}</span>}
        </p>
        {ingredient.is_optional && (
          <span className="text-[10px] text-amber-600">(Optionnel)</span>
        )}
      </div>
      
      {/* Add button */}
      {ingredient.product && (
        <button
          onClick={onAdd}
          disabled={isAdded}
          className={`
            flex-shrink-0 p-2 rounded-md transition-colors
            ${isAdded 
              ? 'bg-green-100 text-green-600' 
              : 'bg-accent-100 text-accent-600 hover:bg-accent-200'}
          `}
        >
          {isAdded ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
}

interface ToolItemProps {
  tool: any;
  isAdded: boolean;
  onAdd: () => void;
}

function ToolItem({ tool, isAdded, onAdd }: ToolItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
      <div className="flex-shrink-0 w-10 h-10 bg-science-900 text-white rounded-sm flex items-center justify-center">
        <Beaker className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-mono font-bold text-sm text-science-900">
            {tool.tool?.name || 'Outil'}
          </p>
          {tool.tool?.is_in_starter_kit && (
            <span className="text-[10px] px-1.5 py-0.5 bg-accent-100 text-accent-700 rounded">
              Dans le Kit
            </span>
          )}
        </div>
        {tool.usage_note && (
          <p className="font-sans text-xs text-text-secondary mt-0.5">
            {tool.usage_note}
          </p>
        )}
      </div>
      
      {tool.tool && (
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-text-muted">
            {tool.tool.price} DH
          </span>
          <button
            onClick={onAdd}
            disabled={isAdded}
            className={`
              flex-shrink-0 p-2 rounded-md transition-colors
              ${isAdded 
                ? 'bg-green-100 text-green-600' 
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}
            `}
          >
            {isAdded ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

interface StepItemProps {
  step: any;
  isLast: boolean;
  color?: string | null;
}

function StepItem({ step, isLast, color }: StepItemProps) {
  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-mono font-bold text-sm"
          style={{ backgroundColor: color || '#1e3a5f' }}
        >
          {step.step_number}
        </div>
        {!isLast && (
          <div 
            className="w-0.5 flex-1 mt-2"
            style={{ backgroundColor: `${color || '#1e3a5f'}30` }}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-4">
        <h4 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-1">
          {step.title}
        </h4>
        <p className="font-sans text-sm text-text-secondary mb-2">
          {step.instruction}
        </p>
        
        {/* Tip */}
        {step.tip && (
          <div className="p-2 bg-accent-50 border-l-2 border-accent-500 rounded-r">
            <p className="font-sans text-xs text-accent-700">
              <strong>💡 Conseil:</strong> {step.tip}
            </p>
          </div>
        )}
        
        {/* Duration */}
        {step.duration_seconds && (
          <div className="flex items-center gap-1 mt-2 text-text-muted">
            <Clock className="w-3 h-3" />
            <span className="font-mono text-xs">
              {step.duration_seconds >= 60 
                ? `${Math.floor(step.duration_seconds / 60)} min`
                : `${step.duration_seconds} sec`
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
