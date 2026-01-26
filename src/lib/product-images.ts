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
  'ghassoul-atlas-pur': '/product-images/ghassoul.jpeg',
  'shampoing-base-neutre': '/product-images/neutralphshampoo.jpeg',
  
  // Traitements
  'huile-ricin': '/product-images/Castoroil.jpeg',
  'huile-nigelle': '/product-images/blackseedoil.jpeg',
  'huile-avocat': '/product-images/avocado.jpeg',
  'proteines-soie': '/product-images/silkprotein.jpeg',
  'he-romarin': '/product-images/rosemary.jpeg',
  
  // Finitions
  'huile-argan': '/product-images/argan.jpeg',
  'huile-pepins-raisin': '/product-images/grapeseed.jpeg',
  'beurre-karite': '/product-images/sheabutter.jpeg',
  'gel-aloe-vera': '/product-images/aloeavera.jpeg',
};

// Mapping par mots-clés dans le nom (fallback)
const PRODUCT_NAME_KEYWORDS: Array<{ keywords: string[]; image: string }> = [
  { keywords: ['ghassoul'], image: '/product-images/ghassoul.jpeg' },
  { keywords: ['shampoing', 'neutre', 'base'], image: '/product-images/neutralphshampoo.jpeg' },
  { keywords: ['ricin', 'castor'], image: '/product-images/Castoroil.jpeg' },
  { keywords: ['nigelle', 'black seed', 'habba'], image: '/product-images/blackseedoil.jpeg' },
  { keywords: ['avocat'], image: '/product-images/avocado.jpeg' },
  { keywords: ['protéine', 'soie', 'silk'], image: '/product-images/silkprotein.jpeg' },
  { keywords: ['romarin'], image: '/product-images/rosemary.jpeg' },
  { keywords: ['argan'], image: '/product-images/argan.jpeg' },
  { keywords: ['pépins', 'raisin', 'grapeseed'], image: '/product-images/grapeseed.jpeg' },
  { keywords: ['karité', 'karite', 'shea'], image: '/product-images/sheabutter.jpeg' },
  { keywords: ['aloe', 'aloe vera'], image: '/product-images/aloeavera.jpeg' },
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
    return product.image_url;
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
