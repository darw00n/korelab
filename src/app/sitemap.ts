import { MetadataRoute } from 'next';

// URL de base du site
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://korelab.ma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/diagnostic`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recettes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Pages légales
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/conditions-generales-vente`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // TODO: Ajouter les pages produits dynamiques
  // const products = await fetchProducts();
  // const productPages = products.map((product) => ({
  //   url: `${BASE_URL}/shop/${product.slug}`,
  //   lastModified: product.updated_at,
  //   changeFrequency: 'weekly',
  //   priority: 0.6,
  // }));

  // TODO: Ajouter les pages recettes dynamiques
  // const recipes = await fetchRecipes();
  // const recipePages = recipes.map((recipe) => ({
  //   url: `${BASE_URL}/recettes/${recipe.slug}`,
  //   lastModified: recipe.updated_at,
  //   changeFrequency: 'monthly',
  //   priority: 0.5,
  // }));

  return [
    ...staticPages,
    // ...productPages,
    // ...recipePages,
  ];
}
