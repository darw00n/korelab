// ============================================
// KORELAB - Product Images Mapping
// Mapping entre les produits et leurs images
// ============================================

import type { Product } from '@/types/database.types';

// ===================
// MAPPING IMAGES
// ===================

/**
 * Mapping entre les slugs de produits et les noms de fichiers d'images
 * Les images sont dans le dossier public/product-images/
 */
const PRODUCT_IMAGE_MAP: Record<string, string> = {
  // Nettoyants
  'ghassoul-atlas-pur': '/product-images/ghassoul.webp',
  'shampoing-base-neutre': '/product-images/neutralphshampoo.webp',
  
  // Traitements - Huiles Végétales
  'huile-ricin': '/product-images/Castoroil.webp',
  'huile-nigelle': '/product-images/blackseedoil.webp',
  'huile-avocat': '/product-images/avocado.webp',
  'huile-olive': '/product-images/placeholder-oil.webp',
  
  // Traitements - Actifs
  'proteines-soie': '/product-images/silkprotein.webp',
  'proteines-riz': '/product-images/placeholder-active.webp',
  'panthenol-b5': '/product-images/placeholder-active.webp',
  'glycerine-vegetale': '/product-images/placeholder-active.webp',
  
  // Traitements - Huiles Essentielles
  'he-romarin': '/product-images/rosemary.webp',
  'he-tea-tree': '/product-images/placeholder-he.webp',
  'he-lavande': '/product-images/placeholder-he.webp',
  'he-eucalyptus': '/product-images/placeholder-he.webp',
  'he-orange': '/product-images/placeholder-he.webp',
  
  // Traitements - Hydrolats
  'hydrolat-rose': '/product-images/placeholder-hydrolat.webp',
  'hydrolat-romarin': '/product-images/placeholder-hydrolat.webp',
  'hydrolat-lavande': '/product-images/placeholder-hydrolat.webp',
  'hydrolat-sauge': '/product-images/placeholder-hydrolat.webp',
  'hydrolat-menthe': '/product-images/placeholder-hydrolat.webp',
  
  // Traitements - Macérats
  'macerat-fenugrec': '/product-images/placeholder-macerat.webp',
  'macerat-oignon': '/product-images/placeholder-macerat.webp',
  'macerat-ail': '/product-images/placeholder-macerat.webp',
  
  // Finitions
  'huile-argan': '/product-images/argan.webp',
  'huile-pepins-raisin': '/product-images/grapeseed.webp',
  'beurre-karite': '/product-images/sheabutter.webp',
  'gel-aloe-vera': '/product-images/aloeavera.webp',
};

// Mapping par mots-clés dans le nom (fallback)
const PRODUCT_NAME_KEYWORDS: Array<{ keywords: string[]; image: string }> = [
  // Nettoyants
  { keywords: ['ghassoul'], image: '/product-images/ghassoul.webp' },
  { keywords: ['shampoing', 'neutre', 'base'], image: '/product-images/neutralphshampoo.webp' },
  
  // Huiles végétales
  { keywords: ['ricin', 'castor'], image: '/product-images/Castoroil.webp' },
  { keywords: ['nigelle', 'black seed', 'habba'], image: '/product-images/blackseedoil.webp' },
  { keywords: ['avocat'], image: '/product-images/avocado.webp' },
  { keywords: ['olive'], image: '/product-images/placeholder-oil.webp' },
  { keywords: ['argan'], image: '/product-images/argan.webp' },
  { keywords: ['pépins', 'raisin', 'grapeseed'], image: '/product-images/grapeseed.webp' },
  { keywords: ['karité', 'karite', 'shea'], image: '/product-images/sheabutter.webp' },
  
  // Actifs
  { keywords: ['protéine', 'soie', 'silk'], image: '/product-images/silkprotein.webp' },
  { keywords: ['protéine', 'riz', 'rice'], image: '/product-images/placeholder-active.webp' },
  { keywords: ['panthénol', 'panthenol', 'b5'], image: '/product-images/placeholder-active.webp' },
  { keywords: ['glycérine', 'glycerine'], image: '/product-images/placeholder-active.webp' },
  { keywords: ['aloe', 'aloe vera'], image: '/product-images/aloeavera.webp' },
  
  // Huiles essentielles
  { keywords: ['romarin', 'rosemary'], image: '/product-images/rosemary.webp' },
  { keywords: ['tea tree', 'arbre à thé'], image: '/product-images/placeholder-he.webp' },
  { keywords: ['lavande'], image: '/product-images/placeholder-he.webp' },
  { keywords: ['eucalyptus'], image: '/product-images/placeholder-he.webp' },
  { keywords: ['orange'], image: '/product-images/placeholder-he.webp' },
  
  // Hydrolats
  { keywords: ['hydrolat', 'eau florale'], image: '/product-images/placeholder-hydrolat.webp' },
  
  // Macérats
  { keywords: ['macérat', 'macerat'], image: '/product-images/placeholder-macerat.webp' },
  { keywords: ['fenugrec'], image: '/product-images/placeholder-macerat.webp' },
  { keywords: ['oignon'], image: '/product-images/placeholder-macerat.webp' },
  { keywords: ['ail'], image: '/product-images/placeholder-macerat.webp' },
];

// ===================
// FONCTION UTILITAIRE
// ===================

/**
 * Vérifie si une URL d'image est valide (existe dans notre mapping)
 * @param url - L'URL à vérifier
 * @returns true si l'URL est valide, false sinon
 */
function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  // Ignorer les URLs qui pointent vers /images/products/ (ancien chemin qui n'existe pas)
  if (url.startsWith('/images/products/')) return false;
  // Accepter les URLs qui pointent vers /product-images/ (notre nouveau chemin)
  if (url.startsWith('/product-images/')) return true;
  // Accepter les URLs externes (http/https)
  if (url.startsWith('http://') || url.startsWith('https://')) return true;
  return false;
}

/**
 * Récupère l'URL de l'image pour un produit donné
 * @param product - Le produit
 * @returns L'URL de l'image ou null si aucune image n'est disponible
 */
export function getProductImageUrl(product: Product | { slug: string; name?: string; image_url?: string | null }): string | null {
  // Si le produit a déjà une image_url valide, l'utiliser
  if ('image_url' in product && isValidImageUrl(product.image_url)) {
    return product.image_url || null;
  }

  // Sinon, utiliser notre mapping
  // Essayer d'abord avec le slug exact
  if (product.slug && PRODUCT_IMAGE_MAP[product.slug]) {
    return PRODUCT_IMAGE_MAP[product.slug];
  }

  // Essayer avec le slug en minuscules
  const slugLower = product.slug?.toLowerCase();
  if (slugLower && PRODUCT_IMAGE_MAP[slugLower]) {
    return PRODUCT_IMAGE_MAP[slugLower];
  }

  // Essayer de trouver par correspondance partielle dans le nom
  if ('name' in product && product.name) {
    const nameLower = product.name.toLowerCase();
    
    // Parcourir les mots-clés
    for (const { keywords, image } of PRODUCT_NAME_KEYWORDS) {
      if (keywords.every(keyword => nameLower.includes(keyword.toLowerCase()))) {
        return image;
      }
    }
    
    // Fallback : correspondance partielle (au moins un mot-clé)
    for (const { keywords, image } of PRODUCT_NAME_KEYWORDS) {
      if (keywords.some(keyword => nameLower.includes(keyword.toLowerCase()))) {
        return image;
      }
    }
  }

  return null;
}

// ===================
// EXPORT
// ===================

export default getProductImageUrl;
