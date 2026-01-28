# KORELAB - Spécifications Images & Prompts Gemini

## Vue d'ensemble

Ce document définit **toutes les images** nécessaires pour l'application KoreLab, leurs contextes d'utilisation, et les **prompts détaillés** pour les générer avec Google Gemini Imagen.

---

## QUICK REFERENCE - Accessoires DIY

| # | Nom Fichier | Produit | Prix |
|---|-------------|---------|------|
| 1 | `kit-starter-diy.webp` | Kit Starter DIY KoreLab | 119 DH |
| 2 | `flacon-spray-100ml.webp` | Flacon Spray 100ml | 25 DH |
| 3 | `pot-verre-100ml.webp` | Pot en Verre 100ml | 20 DH |
| 4 | `flacon-compte-gouttes-30ml.webp` | Flacon Compte-Gouttes 30ml | 18 DH |
| 5 | `pots-voyage-50ml.webp` | Pot Voyage 50ml (x3) | 15 DH |
| 6 | `pipettes-graduees-x5.webp` | Pipettes Graduées (x5) | 15 DH |
| 7 | `cuilleres-doseuses.webp` | Cuillères Doseuses (set) | 20 DH |
| 8 | `balance-precision.webp` | Balance Précision 0.1g | 85 DH |
| 9 | `bol-verre-200ml.webp` | Bol en Verre 200ml | 25 DH |
| 10 | `mini-fouet-silicone.webp` | Mini Fouet en Silicone | 12 DH |
| 11 | `spatule-silicone.webp` | Spatule en Silicone | 10 DH |
| 12 | `entonnoirs-mini.webp` | Entonnoir Mini (x2) | 12 DH |
| 13 | `bonnet-chauffant.webp` | Bonnet Chauffant Électrique | 120 DH |
| 14 | `charlottes-plastique.webp` | Charlotte Plastique (x10) | 15 DH |
| 15 | `pinceau-applicateur.webp` | Pinceau Applicateur | 18 DH |
| 16 | `etiquettes-waterproof.webp` | Étiquettes Waterproof (x50) | 12 DH |
| 17 | `cahier-recettes.webp` | Cahier de Recettes KoreLab | 35 DH |

---

## 1. STYLE GLOBAL

### Charte visuelle pour TOUTES les images

```
STYLE GÉNÉRAL:
- Flat design minimaliste
- Palette: Blanc (#FFFFFF), Bleu nuit (#1e3a5f), Doré (#d4a574), Vert (#22c55e)
- Pas de dégradés complexes
- Pas de personnages humains (sauf silhouettes)
- Traits fins et précis (style "scientifique")
- Fond neutre (blanc ou gris très clair #f8fafc)
- Ratio 1:1 (carré) ou 16:9 (bannière)
```

---

## 2. IMAGES ÉDUCATIVES (Pré-générées)

### 2.1 Diagrammes de Cuticules

Ces images expliquent visuellement la porosité capillaire.

#### Image: `cuticle-low-porosity.png`
**Contexte:** Section "Comprendre tes cheveux" pour porosité faible
**Dimensions:** 400x300px

```
PROMPT GEMINI:
Scientific educational illustration of a hair strand cross-section showing LOW POROSITY hair.

Visual elements:
- Single hair shaft viewed from the side, elongated oval shape
- Cuticle scales tightly closed, overlapping like fish scales laying FLAT
- Water droplets bouncing OFF the hair surface (rejection effect)
- Small arrows showing water cannot penetrate

Style:
- Flat design, no gradients
- Colors: Hair shaft in warm beige (#e8c49a), cuticle edges in brown (#8b5e34)
- Water drops in light blue (#87CEEB)
- Clean white background
- Labeled in French: "Cuticules fermées" and "L'eau ne pénètre pas"

NO realistic textures, NO 3D effects, NO human faces.
```

---

#### Image: `cuticle-medium-porosity.png`
**Contexte:** Section "Comprendre tes cheveux" pour porosité moyenne
**Dimensions:** 400x300px

```
PROMPT GEMINI:
Scientific educational illustration of a hair strand cross-section showing MEDIUM/NORMAL POROSITY hair.

Visual elements:
- Single hair shaft viewed from the side, elongated oval shape
- Cuticle scales slightly raised, balanced position
- Water droplets entering AND staying inside the hair
- Small arrows showing healthy absorption

Style:
- Flat design, no gradients
- Colors: Hair shaft in warm beige (#e8c49a), cuticle edges in brown (#8b5e34)
- Water drops in light blue (#87CEEB), some inside the shaft
- Clean white background
- Labeled in French: "Cuticules équilibrées" and "Absorption optimale"

NO realistic textures, NO 3D effects, NO human faces.
```

---

#### Image: `cuticle-high-porosity.png`
**Contexte:** Section "Comprendre tes cheveux" pour porosité forte
**Dimensions:** 400x300px

```
PROMPT GEMINI:
Scientific educational illustration of a hair strand cross-section showing HIGH POROSITY hair.

Visual elements:
- Single hair shaft viewed from the side, elongated oval shape
- Cuticle scales widely OPEN, lifted up like open shutters
- Water droplets entering AND exiting the hair (both directions)
- Gaps visible in the cuticle layer
- Small arrows showing moisture escaping

Style:
- Flat design, no gradients
- Colors: Hair shaft in warm beige (#e8c49a), cuticle edges in brown (#8b5e34)
- Water drops in light blue (#87CEEB), some escaping below
- Clean white background
- Labeled in French: "Cuticules ouvertes" and "L'hydratation s'échappe"

NO realistic textures, NO 3D effects, NO human faces.
```

---

#### Image: `cuticle-healthy-goal.png`
**Contexte:** Objectif à atteindre (après traitement)
**Dimensions:** 400x300px

```
PROMPT GEMINI:
Scientific educational illustration of a HEALTHY hair strand after treatment.

Visual elements:
- Single hair shaft viewed from the side, elongated oval shape
- Cuticle scales smooth and closed, reflecting light
- Shine effect (white highlight on top)
- Small sparkle icons around the hair
- Green checkmark nearby

Style:
- Flat design, no gradients
- Colors: Hair shaft in golden beige (#e8c49a), shine in white
- Sparkles in gold (#d4a574)
- Clean white background
- Labeled in French: "Cheveux sains" and "Brillance naturelle"

NO realistic textures, NO 3D effects, NO human faces.
```

---

### 2.2 Diagrammes de Transformation (Avant/Après)

#### Image: `transformation-timeline.png`
**Contexte:** Section "Résultats attendus" - Timeline visuelle
**Dimensions:** 800x400px (bannière)

```
PROMPT GEMINI:
Educational timeline illustration showing hair transformation over 8 weeks.

Visual elements:
- Horizontal timeline with 4 stages: Week 1, Week 3, Week 6, Week 8
- Each stage shows a simplified hair strand icon
- Stage 1: Dull, rough hair (gray tones)
- Stage 2: Slightly improved (warmer tone)
- Stage 3: Noticeably healthier (golden)
- Stage 4: Beautiful, shiny hair with sparkles (golden with shine)
- Progress arrow connecting all stages
- Small icons: droplet (hydration), protein symbol, shine

Style:
- Flat design, clean lines
- Colors: Gray (#94a3b8) → Beige (#d4a574) → Gold with green accents
- White background
- French labels: "Semaine 1", "Semaine 3", "Semaine 6", "Semaine 8"

NO photographs, NO realistic hair, NO human faces.
```

---

### 2.3 Méthode LOC/LCO

#### Image: `loc-method-diagram.png`
**Contexte:** Section éducative expliquant la méthode LOC
**Dimensions:** 600x400px

```
PROMPT GEMINI:
Educational diagram explaining the LOC hair care method (Liquid-Oil-Cream).

Visual elements:
- Three vertical columns or layers
- Column 1 (L): Water droplet icon, blue color
- Column 2 (O): Oil bottle icon, golden/amber color  
- Column 3 (C): Cream jar icon, white/cream color
- Arrows showing the layering order (L → O → C)
- Hair strand at the bottom showing all three layers absorbed

Style:
- Flat design, minimalist icons
- Colors: Blue (#3b82f6), Gold (#d4a574), Cream (#fef3c7)
- Clean white background
- French labels: "L = Liquide", "O = Huile", "C = Crème"

NO photographs, NO realistic products, NO human faces.
```

---

## 3. IMAGES RECETTES DIY

Ces images illustrent les recettes de soins maison.

### 3.1 Template Général pour Recettes

```
TEMPLATE PROMPT RECETTE:
Educational infographic for a DIY hair care recipe: [NOM_RECETTE]

Visual composition (top to bottom):
1. HEADER: Recipe name in elegant font, difficulty stars (1-3)
2. INGREDIENTS SECTION: 
   - [X] ingredient icons arranged in a row
   - Each with quantity label below
3. TOOLS SECTION:
   - Small icons of required tools (bowl, spoon, bottle, etc.)
4. RESULT: 
   - Final product container (jar/bottle)
   - Color indicating the mixture result

Style:
- Flat design, scientific/clean aesthetic
- Primary color: [COULEUR_RECETTE]
- Accent: Dark blue (#1e3a5f)
- White background with subtle grid pattern
- Prep time badge in corner

NO photographs, NO realistic textures, NO human faces.
```

---

### 3.2 Recettes Spécifiques

#### Image: `recipe-masque-proteine.png`
**Recette:** Masque Protéiné à l'Oeuf
**Couleur dominante:** Jaune doré (#F59E0B)

```
PROMPT GEMINI:
Educational infographic for DIY hair mask recipe: "Masque Protéiné à l'Oeuf"

Header:
- Title: "MASQUE PROTÉINÉ" in dark blue serif font
- Subtitle: "Renforce & Répare" in gold
- 2 stars difficulty, 20 min prep time badge

Ingredients section (left to right):
- Egg icon (whole egg, yellow/white)
- Honey jar icon (amber color)
- Coconut oil icon (white jar)
- Labels below: "1 oeuf", "2 c.s. miel", "1 c.s. huile coco"

Tools row:
- Mixing bowl icon
- Whisk icon
- Application brush icon

Result:
- Glass jar containing golden-yellow mixture
- "Conserver 24h max" label

Style:
- Flat design, clean lines
- Primary: Golden yellow (#F59E0B)
- Secondary: Dark blue (#1e3a5f), White
- Subtle dotted background pattern
- Modern, scientific aesthetic

Dimensions: 600x800px (portrait/mobile)
NO photographs, NO realistic food, NO human faces.
```

---

#### Image: `recipe-spray-hydratant.png`
**Recette:** Spray Hydratant Quotidien
**Couleur dominante:** Bleu ciel (#0EA5E9)

```
PROMPT GEMINI:
Educational infographic for DIY hair spray recipe: "Spray Hydratant Quotidien"

Header:
- Title: "SPRAY HYDRATANT" in dark blue serif font
- Subtitle: "Hydrate & Rafraîchit" in light blue
- 1 star difficulty, 5 min prep time badge

Ingredients section (left to right):
- Water droplet icon (blue)
- Aloe vera leaf icon (green)
- Essential oil bottle icon (lavender purple) - CROSSED OUT with note "Sans huiles essentielles"
- Labels below: "200ml eau", "50ml gel aloe", "Optionnel"

Tools row:
- Spray bottle icon (empty)
- Measuring cup icon
- Funnel icon

Result:
- Spray bottle containing light blue liquid
- "Agiter avant usage" label

Style:
- Flat design, clean lines
- Primary: Sky blue (#0EA5E9)
- Secondary: Dark blue (#1e3a5f), Fresh green (#22c55e)
- Water droplet motifs in background
- Modern, scientific aesthetic

Dimensions: 600x800px (portrait/mobile)
NO photographs, NO realistic liquids, NO human faces.
```

---

#### Image: `recipe-bain-huile.png`
**Recette:** Bain d'Huile Nourrissant
**Couleur dominante:** Or/Ambre (#D97706)

```
PROMPT GEMINI:
Educational infographic for DIY hair oil treatment recipe: "Bain d'Huile Nourrissant"

Header:
- Title: "BAIN D'HUILE" in dark blue serif font
- Subtitle: "Nourrit en Profondeur" in amber
- 1 star difficulty, 10 min prep + 2h pose badge

Ingredients section (left to right):
- Olive oil bottle icon (green-gold)
- Coconut icon (white/brown)
- Castor oil bottle icon (dark amber)
- Labels below: "30ml olive", "20ml coco", "10ml ricin"

Tools row:
- Small glass bottle icon
- Dropper icon
- Warming bowl icon (with steam)

Result:
- Dark amber bottle with dropper cap
- "Chauffer légèrement" tip label

Style:
- Flat design, clean lines
- Primary: Amber/Gold (#D97706)
- Secondary: Dark blue (#1e3a5f), Olive green
- Oil droplet motifs in background
- Luxurious but minimalist aesthetic

Dimensions: 600x800px (portrait/mobile)
NO photographs, NO realistic oils, NO human faces.
```

---

#### Image: `recipe-gel-lin.png`
**Recette:** Gel de Lin Maison
**Couleur dominante:** Vert naturel (#16A34A)

```
PROMPT GEMINI:
Educational infographic for DIY flaxseed gel recipe: "Gel de Lin Définissant"

Header:
- Title: "GEL DE LIN" in dark blue serif font
- Subtitle: "Définit les Boucles" in green
- 2 stars difficulty, 30 min prep time badge

Ingredients section (left to right):
- Flaxseeds in bowl icon (brown seeds)
- Water icon (blue droplet)
- Optional: glycerin bottle icon
- Labels below: "50g graines", "500ml eau", "1 c.c. glycérine"

Process icons (showing steps):
- Pot on stove icon (with bubbles)
- Strainer icon
- Storage jar icon

Result:
- Clear glass jar with gel-like translucent content
- "Se conserve 2 semaines au frigo" label

Style:
- Flat design, clean lines
- Primary: Natural green (#16A34A)
- Secondary: Dark blue (#1e3a5f), Brown earth tones
- Seed pattern motifs in background
- Organic, natural aesthetic

Dimensions: 600x800px (portrait/mobile)
NO photographs, NO realistic textures, NO human faces.
```

---

#### Image: `recipe-masque-banane.png`
**Recette:** Masque Banane & Avocat
**Couleur dominante:** Vert avocat (#84CC16)

```
PROMPT GEMINI:
Educational infographic for DIY banana avocado mask recipe: "Masque Banane-Avocat"

Header:
- Title: "MASQUE BANANE-AVOCAT" in dark blue serif font
- Subtitle: "Nutrition Intense" in lime green
- 1 star difficulty, 15 min prep time badge

Ingredients section (left to right):
- Banana icon (yellow, peeled)
- Avocado icon (green, halved showing pit)
- Honey jar icon (amber)
- Labels below: "1 banane mûre", "½ avocat", "1 c.s. miel"

Tools row:
- Fork icon (for mashing)
- Mixing bowl icon
- Storage container icon

Result:
- Bowl with creamy green-yellow mixture
- "Usage immédiat" label

Style:
- Flat design, clean lines
- Primary: Avocado green (#84CC16)
- Secondary: Dark blue (#1e3a5f), Banana yellow
- Fruit slice motifs in background
- Fresh, natural aesthetic

Dimensions: 600x800px (portrait/mobile)
NO photographs, NO realistic fruits, NO human faces.
```

---

#### Image: `recipe-rinse-vinaigre.png`
**Recette:** Rinçage au Vinaigre de Cidre
**Couleur dominante:** Rouge pomme (#DC2626)

```
PROMPT GEMINI:
Educational infographic for DIY apple cider vinegar rinse: "Rinçage Vinaigre de Cidre"

Header:
- Title: "RINÇAGE ACV" in dark blue serif font
- Subtitle: "Clarifie & Fait Briller" in apple red
- 1 star difficulty, 2 min prep time badge

Ingredients section (left to right):
- Apple cider vinegar bottle icon (amber liquid)
- Water droplet icon (large, blue)
- Labels below: "2 c.s. vinaigre", "500ml eau froide"

Application icons:
- Squeeze bottle icon
- Shower head icon with water drops
- Timer showing "2 min"

Result:
- Squeeze bottle with diluted amber liquid
- "Rincer à l'eau froide après" label

Style:
- Flat design, clean lines
- Primary: Apple red (#DC2626)
- Secondary: Dark blue (#1e3a5f), Amber
- Apple silhouette motifs in background
- Clean, refreshing aesthetic

Dimensions: 600x800px (portrait/mobile)
NO photographs, NO realistic liquids, NO human faces.
```

---

## 4. IMAGES PRODUITS DIY (Accessoires)

Ces images montrent les outils/accessoires vendus dans la catégorie "Accessoires DIY".

### Style Global pour Produits DIY

```
STYLE COMMUN À TOUS LES ACCESSOIRES:
- Image réaliste de produit (style photo produit e-commerce)
- Fond blanc uni ou gris très clair (#f8fafc)
- Ombre douce sous le produit
- Éclairage studio professionnel (lumière douce, pas de reflets durs)
- Produit centré, légèrement en angle 3/4 pour montrer le volume
- Ratio 1:1 (carré) - 800x800px
- PAS de texte sur l'image
- PAS de mains humaines
- PAS d'éléments décoratifs distrayants
```

---

### 4.1 Kit Starter DIY (Produit Phare)

#### Image: `kit-starter-diy.webp`
**Prix:** 119 DH | **Inclus:** 11 accessoires

```
PROMPT GEMINI:
Professional e-commerce product photo of a complete DIY hair care starter kit.

Composition:
- Elegant flat lay arrangement on pure white background
- Center: Minimalist kraft paper box with subtle embossed logo
- Items arranged artfully around the box:
  - 1 amber glass spray bottle (100ml) with fine mist pump
  - 1 clear glass jar with aluminum lid (100ml)
  - 1 amber dropper bottle (30ml)
  - Set of 5 graduated pipettes (transparent)
  - 4 stainless steel measuring spoons on a ring
  - 1 small glass mixing bowl with pouring lip
  - 1 mini white silicone whisk
  - 1 white silicone spatula
  - 2 small stainless steel funnels
  - Stack of white waterproof labels

Lighting:
- Soft, diffused studio lighting from top-left
- Gentle shadows to show depth
- No harsh reflections

Style:
- Clean, premium aesthetic
- Neutral color palette: amber glass, silver metal, white silicone
- Professional product photography look
- High-end cosmetic brand feeling

Dimensions: 800x800px square
```

---

### 4.2 Contenants

#### Image: `flacon-spray-100ml.webp`
**Prix:** 25 DH

```
PROMPT GEMINI:
Professional product photo of an amber glass spray bottle for cosmetics.

Product details:
- 100ml amber glass bottle
- Fine mist spray pump in black plastic
- Cylindrical shape, elegant proportions
- Protective cap included (shown beside)

Composition:
- Single product centered
- Pure white background
- Soft shadow beneath
- 3/4 angle to show bottle shape

Lighting:
- Soft studio lighting
- Subtle highlight on glass showing amber color
- Professional e-commerce style

Dimensions: 800x800px square
```

---

#### Image: `pot-verre-100ml.webp`
**Prix:** 20 DH

```
PROMPT GEMINI:
Professional product photo of a clear glass cosmetic jar with lid.

Product details:
- 100ml clear glass jar
- Wide mouth opening
- Silver aluminum screw-top lid
- Thick glass walls, slightly rounded shape

Composition:
- Jar with lid placed beside it (slightly angled)
- Pure white background
- Soft shadow beneath
- Show the wide opening

Lighting:
- Soft diffused light
- Glass appears clean and transparent
- Lid shows brushed aluminum texture

Dimensions: 800x800px square
```

---

#### Image: `flacon-compte-gouttes-30ml.webp`
**Prix:** 18 DH

```
PROMPT GEMINI:
Professional product photo of an amber glass dropper bottle.

Product details:
- 30ml amber glass bottle
- Black rubber bulb dropper with graduated glass pipette
- Slim, elegant cylindrical shape
- Visible measurement markings on pipette

Composition:
- Bottle standing upright
- Dropper removed and placed beside at angle
- Pure white background
- Show the graduated pipette clearly

Lighting:
- Soft studio lighting
- Amber glass warmly lit
- Clear view of graduations on pipette

Dimensions: 800x800px square
```

---

#### Image: `pots-voyage-50ml.webp`
**Prix:** 15 DH (lot de 3)

```
PROMPT GEMINI:
Professional product photo of three small travel cosmetic jars.

Product details:
- Set of 3 clear plastic jars, 50ml each
- Matching white screw-top lids
- Compact, travel-friendly size
- Slightly frosted plastic

Composition:
- 3 jars arranged in triangle formation
- One open showing empty interior
- Pure white background
- Lids visible

Lighting:
- Soft even lighting
- Clean, bright appearance
- Minimal shadows

Dimensions: 800x800px square
```

---

### 4.3 Outils de Mesure

#### Image: `pipettes-graduees-x5.webp`
**Prix:** 15 DH (lot de 5)

```
PROMPT GEMINI:
Professional product photo of graduated plastic pipettes set.

Product details:
- Set of 5 transparent plastic pipettes
- Different sizes: 1ml, 2ml, 3ml, 5ml, 10ml
- Clear graduation markings in blue/black
- Bulb end for suction

Composition:
- Pipettes fanned out diagonally
- Arranged from smallest to largest
- Pure white background
- Graduation marks clearly visible

Lighting:
- Bright, even lighting
- Transparent plastic clearly shown
- No harsh reflections

Dimensions: 800x800px square
```

---

#### Image: `cuilleres-doseuses.webp`
**Prix:** 20 DH (set de 4)

```
PROMPT GEMINI:
Professional product photo of stainless steel measuring spoons set.

Product details:
- Set of 4 measuring spoons on a metal ring
- Sizes: 1/4 tsp, 1/2 tsp, 1 tsp, 1 tbsp
- Polished stainless steel
- Engraved size markings on handles

Composition:
- Spoons fanned out on the ring
- Laying flat at slight angle
- Pure white background
- Show all 4 sizes clearly

Lighting:
- Soft studio lighting
- Subtle reflections showing metal quality
- Premium kitchenware appearance

Dimensions: 800x800px square
```

---

#### Image: `balance-precision.webp`
**Prix:** 85 DH

```
PROMPT GEMINI:
Professional product photo of a digital precision scale.

Product details:
- Compact digital kitchen scale
- Stainless steel weighing platform
- LCD display showing "0.0g"
- Sleek black or silver body
- Precision to 0.1g

Composition:
- Scale shown at 3/4 angle
- Display clearly visible
- Pure white background
- Professional, modern look

Lighting:
- Soft lighting
- LCD screen readable
- Metal platform with subtle reflection

Dimensions: 800x800px square
```

---

### 4.4 Outils de Préparation

#### Image: `bol-verre-200ml.webp`
**Prix:** 25 DH

```
PROMPT GEMINI:
Professional product photo of a glass mixing bowl with pouring lip.

Product details:
- 200ml clear borosilicate glass bowl
- Pouring spout on one side
- Thick, durable glass walls
- Flat bottom for stability

Composition:
- Bowl at 3/4 angle showing spout
- Pure white background
- Soft shadow beneath
- Clean, transparent appearance

Lighting:
- Soft diffused light
- Glass appears crystal clear
- Spout detail visible

Dimensions: 800x800px square
```

---

#### Image: `mini-fouet-silicone.webp`
**Prix:** 12 DH

```
PROMPT GEMINI:
Professional product photo of a mini silicone whisk.

Product details:
- Small whisk, approximately 15cm long
- White or mint green silicone wires
- Stainless steel handle
- Flexible, soft whisk head

Composition:
- Whisk laying diagonally
- Shows full length
- Pure white background
- Soft shadow

Lighting:
- Even studio lighting
- Shows silicone texture
- Handle reflects subtly

Dimensions: 800x800px square
```

---

#### Image: `spatule-silicone.webp`
**Prix:** 10 DH

```
PROMPT GEMINI:
Professional product photo of a silicone spatula.

Product details:
- Small flexible silicone spatula
- White or soft gray color
- Wooden or stainless steel handle
- Rounded head for scraping bowls

Composition:
- Spatula laying diagonally
- Head slightly angled up
- Pure white background
- Clean, simple presentation

Lighting:
- Soft even lighting
- Silicone appears smooth and clean
- Natural shadow beneath

Dimensions: 800x800px square
```

---

#### Image: `entonnoirs-mini.webp`
**Prix:** 12 DH (lot de 2)

```
PROMPT GEMINI:
Professional product photo of two mini stainless steel funnels.

Product details:
- Set of 2 small funnels, different sizes
- Polished stainless steel
- Narrow spouts for small bottle openings
- Professional quality

Composition:
- Both funnels standing upright
- One slightly in front of the other
- Pure white background
- Show size difference

Lighting:
- Soft studio lighting
- Metal appears polished and clean
- Subtle reflections

Dimensions: 800x800px square
```

---

### 4.5 Accessoires Application

#### Image: `bonnet-chauffant.webp`
**Prix:** 120 DH

```
PROMPT GEMINI:
Professional product photo of an electric heating cap for hair treatment.

Product details:
- Soft fabric heating cap
- Neutral color (gray, beige, or soft pink)
- Power cord visible
- Adjustable temperature control
- Quilted or padded texture

Composition:
- Cap shown as if on invisible head form
- Controller/cord visible
- Pure white background
- Professional spa product look

Lighting:
- Soft diffused lighting
- Shows fabric texture
- Premium wellness product appearance

Dimensions: 800x800px square
```

---

#### Image: `charlottes-plastique.webp`
**Prix:** 15 DH (lot de 10)

```
PROMPT GEMINI:
Professional product photo of disposable plastic shower caps.

Product details:
- Stack of 10 clear plastic caps
- Elastic edge visible
- Transparent/slightly frosted material
- Packaged neatly

Composition:
- Small stack of folded caps
- One cap shown unfolded beside stack
- Pure white background
- Clean, hygienic appearance

Lighting:
- Bright even lighting
- Plastic appears clean and new
- Simple presentation

Dimensions: 800x800px square
```

---

#### Image: `pinceau-applicateur.webp`
**Prix:** 18 DH

```
PROMPT GEMINI:
Professional product photo of a hair mask application brush.

Product details:
- Wide flat brush for hair mask application
- Soft synthetic bristles in black or white
- Comfortable handle (plastic or wood)
- Professional salon-style tool

Composition:
- Brush laying at diagonal angle
- Bristles clearly visible
- Pure white background
- Shows brush width

Lighting:
- Soft studio lighting
- Bristles appear soft and even
- Professional tool appearance

Dimensions: 800x800px square
```

---

### 4.6 Organisation

#### Image: `etiquettes-waterproof.webp`
**Prix:** 12 DH (lot de 50)

```
PROMPT GEMINI:
Professional product photo of waterproof adhesive labels.

Product details:
- Stack/roll of 50 white waterproof labels
- Rectangular shape, clean edges
- Blank white surface for writing
- Visible adhesive backing on one

Composition:
- Small neat stack of labels
- Few labels scattered artfully
- Pure white background
- One label slightly peeled showing adhesive

Lighting:
- Bright clean lighting
- Paper appears crisp white
- Simple office supply presentation

Dimensions: 800x800px square
```

---

#### Image: `cahier-recettes.webp`
**Prix:** 35 DH

```
PROMPT GEMINI:
Professional product photo of a recipe notebook for DIY cosmetics.

Product details:
- A5 size notebook, approximately 50 pages
- Elegant kraft paper or cream colored cover
- Subtle "KoreLab" branding embossed
- Spiral or sewn binding
- Rounded corners

Composition:
- Notebook closed, shown at angle
- One corner slightly open showing printed pages inside
- Pure white background
- Premium stationery appearance

Lighting:
- Soft warm lighting
- Paper texture visible
- Elegant, artisanal feel

Dimensions: 800x800px square
```

---

## 5. IMAGES UI/DÉCORATIVES

### 5.1 Illustrations de Bienvenue

#### Image: `welcome-diagnostic.png`
**Contexte:** Page d'accueil du diagnostic
**Dimensions:** 400x400px

```
PROMPT GEMINI:
Welcoming illustration for a hair diagnostic quiz app.

Visual:
- Abstract representation of curly/coily hair pattern
- Magnifying glass examining a hair strand
- Scientific molecule symbols floating around
- Soft, inviting composition

Style:
- Flat design, warm and friendly
- Colors: Dark blue (#1e3a5f), Gold (#d4a574), soft pink accents
- Circular composition
- "Science meets beauty" feeling

NO photographs, NO human faces.
```

---

### 5.2 États Vides/Erreur

#### Image: `empty-cart.png`
**Contexte:** Panier vide
**Dimensions:** 300x300px

```
PROMPT GEMINI:
Illustration for an empty shopping cart state.

Visual:
- Minimalist shopping bag outline
- Small hair strand or leaf peeking out
- Dotted line indicating "empty"
- Gentle, non-disappointing mood

Style:
- Flat design, line art
- Colors: Light gray (#cbd5e1), soft gold accent
- Simple and clean

NO photographs.
```

---

## 6. GÉNÉRATION & STOCKAGE

### Nomenclature des fichiers

```
/public/product-images/diy/
├── kit-starter-diy.webp          ← Kit complet (produit phare)
│
├── # CONTENANTS
├── flacon-spray-100ml.webp
├── pot-verre-100ml.webp
├── flacon-compte-gouttes-30ml.webp
├── pots-voyage-50ml.webp
│
├── # OUTILS DE MESURE
├── pipettes-graduees-x5.webp
├── cuilleres-doseuses.webp
├── balance-precision.webp
│
├── # OUTILS DE PRÉPARATION
├── bol-verre-200ml.webp
├── mini-fouet-silicone.webp
├── spatule-silicone.webp
├── entonnoirs-mini.webp
│
├── # ACCESSOIRES APPLICATION
├── bonnet-chauffant.webp
├── charlottes-plastique.webp
├── pinceau-applicateur.webp
│
├── # ORGANISATION
├── etiquettes-waterproof.webp
└── cahier-recettes.webp

/public/images/
├── education/
│   ├── cuticle-low-porosity.png
│   ├── cuticle-medium-porosity.png
│   ├── cuticle-high-porosity.png
│   ├── cuticle-healthy-goal.png
│   ├── transformation-timeline.png
│   └── loc-method-diagram.png
├── recipes/
│   ├── recipe-masque-proteine.png
│   ├── recipe-spray-hydratant.png
│   ├── recipe-bain-huile.png
│   ├── recipe-gel-lin.png
│   ├── recipe-masque-banane.png
│   └── recipe-rinse-vinaigre.png
└── ui/
    ├── welcome-diagnostic.png
    └── empty-cart.png
```

### Process de génération

1. **Générer via Gemini Imagen** avec les prompts ci-dessus
2. **Vérifier** la cohérence avec la charte visuelle
3. **Optimiser** les fichiers (compression WebP si possible)
4. **Nommer** selon la convention ci-dessus
5. **Uploader** dans le dossier `/public/images/`

---

## 7. PRIORITÉ DE GÉNÉRATION

### Phase 1 - Critique (P0)

| Image | Raison | Dimensions |
|-------|--------|------------|
| `cuticle-low-porosity.png` | Page résultats | 400x300 |
| `cuticle-medium-porosity.png` | Page résultats | 400x300 |
| `cuticle-high-porosity.png` | Page résultats | 400x300 |
| `cuticle-healthy-goal.png` | Page résultats | 400x300 |

### Phase 2 - Important (P1) 

| Image | Raison | Dimensions |
|-------|--------|------------|
| `kit-starter-diy.webp` | Produit phare DIY | 800x800 |
| `recipe-masque-proteine.png` | Section recettes | 600x800 |
| `recipe-spray-hydratant.png` | Section recettes | 600x800 |
| `recipe-bain-huile.png` | Section recettes | 600x800 |
| `recipe-gel-lin.png` | Section recettes | 600x800 |
| `recipe-masque-banane.png` | Section recettes | 600x800 |
| `recipe-rinse-vinaigre.png` | Section recettes | 600x800 |

### Phase 3 - Accessoires DIY (P2)

| Image | Raison | Dimensions |
|-------|--------|------------|
| `flacon-spray-100ml.webp` | Page shop DIY | 800x800 |
| `pot-verre-100ml.webp` | Page shop DIY | 800x800 |
| `flacon-compte-gouttes-30ml.webp` | Page shop DIY | 800x800 |
| `pots-voyage-50ml.webp` | Page shop DIY | 800x800 |
| `pipettes-graduees-x5.webp` | Page shop DIY | 800x800 |
| `cuilleres-doseuses.webp` | Page shop DIY | 800x800 |
| `balance-precision.webp` | Page shop DIY | 800x800 |
| `bol-verre-200ml.webp` | Page shop DIY | 800x800 |
| `mini-fouet-silicone.webp` | Page shop DIY | 800x800 |
| `spatule-silicone.webp` | Page shop DIY | 800x800 |
| `entonnoirs-mini.webp` | Page shop DIY | 800x800 |
| `bonnet-chauffant.webp` | Page shop DIY | 800x800 |
| `charlottes-plastique.webp` | Page shop DIY | 800x800 |
| `pinceau-applicateur.webp` | Page shop DIY | 800x800 |
| `etiquettes-waterproof.webp` | Page shop DIY | 800x800 |
| `cahier-recettes.webp` | Page shop DIY | 800x800 |

### Phase 4 - Polish (P3)

| Image | Raison | Dimensions |
|-------|--------|------------|
| `transformation-timeline.png` | Timeline résultats | 800x400 |
| `loc-method-diagram.png` | Section éducative | 600x400 |
| `welcome-diagnostic.png` | Page intro | 400x400 |
| `empty-cart.png` | États vides | 300x300 |

---

### Résumé par Phase

| Phase | Nombre | Description |
|-------|--------|-------------|
| P0 | 4 images | Cuticules éducatives |
| P1 | 7 images | Kit + Recettes |
| P2 | 16 images | Accessoires DIY |
| P3 | 4 images | Polish UI |
| **Total** | **31 images** |

---

## 8. FALLBACKS

En cas d'échec de génération ou en mode développement:

```typescript
// src/lib/image-fallbacks.ts
export const IMAGE_FALLBACKS = {
  cuticle: '/images/placeholders/cuticle-placeholder.svg',
  recipe: '/images/placeholders/recipe-placeholder.svg',
  product: '/images/placeholders/product-placeholder.svg',
};
```

Les placeholders SVG sont des illustrations minimalistes génériques.

---

## ANNEXE: Checklist Avant Génération

- [ ] Vérifier que Gemini Imagen API est configuré
- [ ] Tester un prompt simple d'abord
- [ ] Générer en haute résolution (2x pour Retina)
- [ ] Vérifier le contraste et lisibilité
- [ ] Compresser sans perte de qualité visible
- [ ] Tester sur mobile (taille lisible)
