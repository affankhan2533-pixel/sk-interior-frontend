/**
 * Journal Data — SK Interior Editorial Publication
 * 
 * Centralised dataset for studio essays, material stories, design thinking,
 * and spatial observations.
 */

export const JOURNAL_CATEGORIES = [
  'All',
  'Interiors',
  'Materials',
  'Design Thinking',
  'Spaces',
  'Living',
];

export const JOURNAL_ARTICLES = [
  {
    slug: 'the-material-conversation',
    title: 'The Material Conversation',
    subtitle: 'Why the tactile quality of a surface defines how a space is experienced',
    category: 'Materials',
    date: '16 August 2026',
    readTime: '6 min read',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    excerpt:
      'We often prioritize colour when imagining an interior — yet texture is the subtle quality that quietly dictates light, acoustics, and emotional comfort. A room defined by raw limestone and slubbed linen will always outperform flat paint.',
    quote: {
      text: 'A room with a single material expressed in several finishes will always feel more considered than a room with many colours applied to flat surfaces.',
      author: 'Simran Kapoor, Principal Designer',
    },
    body: [
      'The obsession with colour palettes in modern interior architecture has, in many ways, obscured what makes rooms genuinely pleasurable to inhabit: the tactile intelligence of their surfaces.',
      'When light strikes a wall finished in hand-troweled Venetian plaster or lime wash, it does not bounce uniform flat light back into the room. It catches micro-shadows, releases soft warm tones, and responds dynamically as the sun moves from east to west throughout the day. The room appears alive.',
      'In our studio practice in Mumbai, every project begins with a material audit before a single colour is selected. We ask essential questions: How does this stone feel under bare feet in humid weather? How does wenge wood absorb evening lighting? What happens as this brass hardware oxidizes over years of touch?',
      'By prioritizing honest timber, natural stone, woven hemp, and lime plasters, the colour of the space emerges naturally from the materials themselves — producing an atmosphere of quiet, enduring sanctuary.',
    ],
    isPlaceholder: true,
  },
  {
    slug: 'light-as-a-design-tool',
    title: 'Light as an Architectural Tool',
    subtitle: 'Mapping natural day light and layering warm artificial illumination in tropical homes',
    category: 'Design Thinking',
    date: '02 August 2026',
    readTime: '8 min read',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
    excerpt:
      'There is no single architectural decision more consequential than how light enters and travels through a home. Mapping morning glow and controlling afternoon glare is central to residential luxury.',
    quote: {
      text: 'Good lighting does not flood a room evenly; it sculpts shadow, creates intimate zones, and disappears when it is doing its work correctly.',
      author: 'SK Interior Studio Principle',
    },
    body: [
      'In coastal India, natural light is both our most exquisite asset and our most complex challenge. Residences facing west receive magnificent evening sunsets over the horizon, but endure harsh midday thermal gain.',
      'We approach every interior by creating a solar map of the floorplate across seasons. This map determines furniture orientation, deep window sill treatments, woven linen shade densities, and shadow reveals.',
      'Artificial lighting must never compete with natural daylight. Instead, we layer warm 2700K indirect LED coves, low-level brass reading sconces, and focused artwork spot lamps. The result is a space that shifts effortlessly from bright morning energy to evening calm.',
    ],
    isPlaceholder: true,
  },
  {
    slug: 'the-case-for-empty-space',
    title: 'The Case for Restraint & Empty Space',
    subtitle: 'On negative space, architectural calm, and the courage to leave surfaces unadorned',
    category: 'Spaces',
    date: '19 July 2026',
    readTime: '5 min read',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
    excerpt:
      'Every space we design begins with a conversation about what to remove, not what to add. The most common mistake in luxury interiors is visual overcrowding — where objects fight for attention.',
    quote: {
      text: 'Empty space is not absence. It is the frame through which you experience proportion, light, and architectural ritual.',
      author: 'Studio Philosophy Note',
    },
    body: [
      'The most frequent brief we receive from clients includes the request to make a residence feel warm, welcoming, and lived-in. Yet the most frequent error made in pursuit of warmth is accumulating excessive furniture and wall decor.',
      'True atmospheric warmth springs from material integrity — not item density. A clean limestone wall with a single sculptural brass fitting provides far greater emotional weight than twenty framed prints crowded together.',
      'Negative space gives the mind room to rest. It allows air to circulate, shadows to stretch, and key pieces of furniture to be appreciated as quiet sculptural moments.',
    ],
    isPlaceholder: true,
  },
  {
    slug: 'alibaug-coastal-villa-story',
    title: 'Designing for the Coast: The Alibaug Notes',
    subtitle: 'How marine-grade teak, Kota stone, and open loggias respond to the sea',
    category: 'Interiors',
    date: '28 June 2026',
    readTime: '10 min read',
    featured: false,
    coverImage: '/images/reviews/interior_bedroom_suite.jpg',
    excerpt:
      'Coastal architecture demands total honesty from materials. Humidity, salt air, and strong tropical light test every joint, finish, and fabric — requiring design that age gracefully with coastal elements.',
    quote: {
      text: 'A sea villa must not resist the elements; it must embrace weathering as part of its architectural story.',
      author: 'Alibaug Villa Case Study',
    },
    body: [
      'When we first visited the site for The Sea Villa in Alibaug, the Arabian Sea was visible across the entire tree canopy. The brief was simple: create an interior that dissolves seamlessly into the surrounding garden and horizon.',
      'Accomplishing this meant avoiding precious synthetic finishes that degrade in salt air. We selected solid marine-grade teak joinery, unpolished Kota stone floors that stay cool underfoot, and heavy unbleached linen drapery.',
      'Instead of rigid solid doors between living zones, we specified floor-to-ceiling pivoting timber screens and linen curtains. The house breathes with the coastal breeze, blurring the boundary between indoor sanctuary and outdoor terrace.',
    ],
    isPlaceholder: true,
  },
  {
    slug: 'rituals-of-daily-living',
    title: 'Designing for Daily Rituals',
    subtitle: 'How thoughtful space planning transforms morning coffee and evening unwinding',
    category: 'Living',
    date: '11 June 2026',
    readTime: '7 min read',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
    excerpt:
      'Great interior design is not merely visual; it is behavioral. We structure floor plans around daily rituals — how you wake up, where you pause to read, and how you gather with family.',
    quote: {
      text: 'When a home is aligned with your personal rituals, living inside it feels completely effortless.',
      author: 'SK Interior Living Guide',
    },
    body: [
      'Floor plans are too often drawn around abstract geometric symmetry rather than human habits. We begin spatial planning by interviewing clients about their daily movements from sunrise to nightfall.',
      'Where do you place your keys when entering? Where does the morning sun hit your kitchen island? Do you prefer quiet reading nooks or open social seating?',
      'By designing custom millwork, concealed storage niches, and intuitive circulation paths around these micro-moments, we create homes that reduce daily friction and bring quiet delight to ordinary routines.',
    ],
    isPlaceholder: true,
  },
  {
    slug: 'custom-joinery-craftsmanship',
    title: 'The Precision of Custom Joinery',
    subtitle: 'Why bespoke millwork elevates an apartment from ordinary to architectural',
    category: 'Interiors',
    date: '24 May 2026',
    readTime: '6 min read',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=80',
    excerpt:
      'Off-the-shelf furniture rarely fits the exact proportions of a room. Custom joinery allows us to integrate storage, lighting, and architectural paneling into seamless wall planes.',
    quote: {
      text: 'Millwork is the bridge between architecture and furniture — anchoring the room while hiding life’s clutter.',
      author: 'Joinery Specification Notes',
    },
    body: [
      'In high-density luxury apartments across Mumbai, floor space is a premium asset. Loose freestanding wardrobes and cabinets fragment wall planes and create awkward dust gaps.',
      'Our studio specializes in full-height bespoke millwork engineered down to the millimeter. Using hidden touch-latches, integrated LED shadow channels, and continuous veneer grain matching, storage becomes an invisible architectural wall.',
      'This custom approach allows us to incorporate hidden bar units, pull-out desk surfaces, and acoustic fabric lining within sleek timber facades — maximizing function while maintaining minimal visual noise.',
    ],
    isPlaceholder: true,
  },
];

export function getArticleBySlug(slug) {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug) || null;
}

export function getRelatedArticles(currentSlug, count = 2) {
  const current = getArticleBySlug(currentSlug);
  if (!current) return JOURNAL_ARTICLES.slice(0, count);

  // Try to get articles from the same category first
  const sameCategory = JOURNAL_ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.category === current.category
  );

  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }

  // Fallback to other articles if not enough in same category
  const others = JOURNAL_ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, count);
}
