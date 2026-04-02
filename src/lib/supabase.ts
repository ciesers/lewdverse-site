import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create client if credentials are provided
export const supabase: SupabaseClient = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as SupabaseClient;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  base_price: number;
  short_description: string;
  full_description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductSpecification {
  id: string;
  product_id: string;
  spec_key: string;
  spec_value: string;
  display_order: number;
  created_at: string;
}

export interface ProductPricingTier {
  id: string;
  product_id: string;
  tier_name: string;
  price: number;
  features: string[];
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export interface ProductFAQ {
  id: string;
  product_id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
}

export async function getAllProducts() {
  if (!isSupabaseConfigured) {
    // Fallback products when Supabase is not configured
    return [
      {
        id: '1',
        slug: 'beta-one',
        name: 'Beta One',
        subtitle: 'Advanced Intimacy Technology',
        base_price: 999,
        short_description: 'The foundation of modern intimate technology. Precision-engineered for connection.',
        full_description: 'Beta One represents our core offering in advanced intimacy technology.',
        image_url: '/images/product-1.png',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        slug: 'beta-two',
        name: 'Beta Two',
        subtitle: 'Enhanced Connection Protocol',
        base_price: 1499,
        short_description: 'Elevate your experience with next-generation connection capabilities.',
        full_description: 'Beta Two offers enhanced features for deeper connections.',
        image_url: '/images/product-2.png',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        slug: 'beta-three',
        name: 'Beta Three',
        subtitle: 'Premium Intimacy Suite',
        base_price: 2499,
        short_description: 'The ultimate intimate technology experience. Unlimited potential.',
        full_description: 'Beta Three is our premium offering with all features unlocked.',
        image_url: '/images/product-3.png',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ] as Product[];
  }
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as Product[];
}

export async function getProductBySlug(slug: string) {
  if (!isSupabaseConfigured) {
    const fallbackProducts: Record<string, Product> = {
      'beta-one': {
        id: '1',
        slug: 'beta-one',
        name: 'Beta One',
        subtitle: 'Advanced Intimacy Technology',
        base_price: 999,
        short_description: 'The foundation of modern intimate technology. Precision-engineered for connection.',
        full_description: `Beta One is where it all begins.

This isn't just a product. It's a gateway to a new paradigm of human connection. We've spent years developing what we believe is the most sophisticated intimate technology ever created.

The Beta One features our proprietary NeuralSync™ interface, designed to adapt to your unique patterns and preferences. It learns. It evolves. It becomes an extension of your desires.

Every curve, every surface, every interaction has been meticulously crafted. The result is an experience that feels less like using a product and more like discovering a new sense.

Warning: Beta One may cause increased expectations for all future intimate experiences. We are not responsible for the dissatisfaction you will feel with everything else.

Side effects may include: enhanced pleasure, deeper emotional connections, and in rare cases, an inability to return to conventional methods.`,
        image_url: '/images/product-1.png',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      'beta-two': {
        id: '2',
        slug: 'beta-two',
        name: 'Beta Two',
        subtitle: 'Enhanced Connection Protocol',
        base_price: 1499,
        short_description: 'Elevate your experience with next-generation connection capabilities.',
        full_description: `Beta Two takes everything you loved about Beta One and amplifies it beyond recognition.

We didn't just improve the Beta One. We fundamentally reimagined what intimate technology could be. The Beta Two features dual-core NeuralSync™ processing, enabling simultaneous multi-partner connectivity protocols.

The enhanced haptic feedback system delivers over 4,000 distinct sensation patterns. That's not a typo. Four. Thousand. Each one calibrated to deliver precise, repeatable, and deeply satisfying results.

Beta Two also introduces our proprietary BioFeedback™ system, which reads your body's responses in real-time and adjusts accordingly. Think of it as a partner who actually pays attention to what you're feeling.

Warning: Beta Two users report difficulty explaining their satisfaction to others. The experience has been described as "transcendent," "life-altering," and in one memorable case, "I forgot my own name for three hours."

We are not responsible for any existential crises that may result from use.`,
        image_url: '/images/product-2.png',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      'beta-three': {
        id: '3',
        slug: 'beta-three',
        name: 'Beta Three',
        subtitle: 'Premium Intimacy Suite',
        base_price: 2499,
        short_description: 'The ultimate intimate technology experience. Unlimited potential.',
        full_description: `Beta Three exists in a category of its own.

We don't call it "premium" because that word has lost all meaning. We call it "Beta Three" because the name alone sets expectations that we then exceed.

This is the product that our engineers designed for themselves before management found out and decided to sell it. It contains every feature we've ever imagined, implemented without compromise.

Beta Three includes unlimited multi-user connectivity, advanced scenario simulation, predictive pleasure mapping, and our exclusive Entropy™ engine that generates infinite unique experiences. No two sessions are ever identical.

The body is crafted from proprietary materials that adapt temperature and texture dynamically. The interface responds to thought patterns before you're consciously aware of your own desires.

Warning: Beta Three is not compatible with ordinary human experiences. After using Beta Three, you may find yourself unable to relate to people who haven't. We recommend the Beta Three Owners Circle, an exclusive community where you can discuss your experiences with others who understand.

Beta Three: For those who have already decided that "good enough" is not enough.`,
        image_url: '/images/product-3.png',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    };
    return fallbackProducts[slug] || null;
  }
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data as Product | null;
}

export async function getProductSpecifications(productId: string) {
  if (!isSupabaseConfigured) {
    const specs: Record<string, ProductSpecification[]> = {
      '1': [
        { id: '1-1', product_id: '1', spec_key: 'Dimensions', spec_value: '180mm x 80mm x 80mm', display_order: 1, created_at: new Date().toISOString() },
        { id: '1-2', product_id: '1', spec_key: 'Weight', spec_value: '420g', display_order: 2, created_at: new Date().toISOString() },
        { id: '1-3', product_id: '1', spec_key: 'Battery Life', spec_value: '8 hours continuous use', display_order: 3, created_at: new Date().toISOString() },
        { id: '1-4', product_id: '1', spec_key: 'Charging', spec_value: 'USB-C, 90 min full charge', display_order: 4, created_at: new Date().toISOString() },
        { id: '1-5', product_id: '1', spec_key: 'Materials', spec_value: 'Medical-grade silicone, aircraft aluminum', display_order: 5, created_at: new Date().toISOString() },
        { id: '1-6', product_id: '1', spec_key: 'Connectivity', spec_value: 'Bluetooth 5.2, proprietary 2.4GHz', display_order: 6, created_at: new Date().toISOString() },
        { id: '1-7', product_id: '1', spec_key: 'Water Resistance', spec_value: 'IPX7 (submersible to 1m)', display_order: 7, created_at: new Date().toISOString() }
      ],
      '2': [
        { id: '2-1', product_id: '2', spec_key: 'Dimensions', spec_value: '195mm x 90mm x 90mm', display_order: 1, created_at: new Date().toISOString() },
        { id: '2-2', product_id: '2', spec_key: 'Weight', spec_value: '520g', display_order: 2, created_at: new Date().toISOString() },
        { id: '2-3', product_id: '2', spec_key: 'Battery Life', spec_value: '12 hours continuous use', display_order: 3, created_at: new Date().toISOString() },
        { id: '2-4', product_id: '2', spec_key: 'Charging', spec_value: 'USB-C, wireless charging compatible', display_order: 4, created_at: new Date().toISOString() },
        { id: '2-5', product_id: '2', spec_key: 'Materials', spec_value: 'Medical-grade silicone, titanium alloy', display_order: 5, created_at: new Date().toISOString() },
        { id: '2-6', product_id: '2', spec_key: 'Connectivity', spec_value: 'Bluetooth 5.3, WiFi 6, proprietary 2.4GHz', display_order: 6, created_at: new Date().toISOString() },
        { id: '2-7', product_id: '2', spec_key: 'Water Resistance', spec_value: 'IPX8 (submersible to 3m)', display_order: 7, created_at: new Date().toISOString() },
        { id: '2-8', product_id: '2', spec_key: 'Haptic Patterns', spec_value: '4,000+ distinct patterns', display_order: 8, created_at: new Date().toISOString() }
      ],
      '3': [
        { id: '3-1', product_id: '3', spec_key: 'Dimensions', spec_value: '210mm x 100mm x 100mm', display_order: 1, created_at: new Date().toISOString() },
        { id: '3-2', product_id: '3', spec_key: 'Weight', spec_value: '680g', display_order: 2, created_at: new Date().toISOString() },
        { id: '3-3', product_id: '3', spec_key: 'Battery Life', spec_value: 'Unlimited (continuous charging)', display_order: 3, created_at: new Date().toISOString() },
        { id: '3-4', product_id: '3', spec_key: 'Charging', spec_value: 'USB-C, wireless, solar-compatible', display_order: 4, created_at: new Date().toISOString() },
        { id: '3-5', product_id: '3', spec_key: 'Materials', spec_value: 'Proprietary bio-adaptive polymers, platinum', display_order: 5, created_at: new Date().toISOString() },
        { id: '3-6', product_id: '3', spec_key: 'Connectivity', spec_value: 'All protocols + satellite uplink', display_order: 6, created_at: new Date().toISOString() },
        { id: '3-7', product_id: '3', spec_key: 'Water Resistance', spec_value: 'IPX9K (high-pressure, high-temp)', display_order: 7, created_at: new Date().toISOString() },
        { id: '3-8', product_id: '3', spec_key: 'Experience Engine', spec_value: 'Entropy™ infinite generation', display_order: 8, created_at: new Date().toISOString() },
        { id: '3-9', product_id: '3', spec_key: 'Neural Interface', spec_value: 'Thought-responsive, predictive', display_order: 9, created_at: new Date().toISOString() }
      ]
    };
    return specs[productId] || [];
  }
  const { data, error } = await supabase
    .from('product_specifications')
    .select('*')
    .eq('product_id', productId)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data as ProductSpecification[];
}

export async function getProductPricingTiers(productId: string) {
  if (!isSupabaseConfigured) {
    const tiers: Record<string, ProductPricingTier[]> = {
      '1': [
        { id: '1-1', product_id: '1', tier_name: 'Essential', price: 999, features: ['Core NeuralSync™ technology', 'Standard haptic feedback', '1-year warranty', 'Email support', 'Basic app access'], is_featured: false, display_order: 1, created_at: new Date().toISOString() },
        { id: '1-2', product_id: '1', tier_name: 'Enhanced', price: 1299, features: ['Advanced NeuralSync™ v2', 'Enhanced haptic patterns', '2-year warranty', 'Priority support', 'Premium app features', 'Travel case included'], is_featured: true, display_order: 2, created_at: new Date().toISOString() },
        { id: '1-3', product_id: '1', tier_name: 'Complete', price: 1599, features: ['Full NeuralSync™ suite', 'All haptic libraries', '3-year warranty', '24/7 dedicated support', 'All premium features', 'Deluxe travel case', 'Lifetime updates'], is_featured: false, display_order: 3, created_at: new Date().toISOString() }
      ],
      '2': [
        { id: '2-1', product_id: '2', tier_name: 'Standard', price: 1499, features: ['Dual-core NeuralSync™', '2,000 haptic patterns', '2-year warranty', 'Priority support', 'Multi-user capability'], is_featured: false, display_order: 1, created_at: new Date().toISOString() },
        { id: '2-2', product_id: '2', tier_name: 'Professional', price: 1899, features: ['Enhanced dual-core processing', 'Full 4,000 haptic patterns', '3-year warranty', '24/7 dedicated support', 'Advanced multi-user sync', 'BioFeedback™ system', 'Premium materials'], is_featured: true, display_order: 2, created_at: new Date().toISOString() },
        { id: '2-3', product_id: '2', tier_name: 'Enterprise', price: 2499, features: ['Maximum processing power', 'Unlimited patterns + custom creation', 'Lifetime warranty', 'White-glove concierge', 'Unlimited multi-user', 'Advanced BioFeedback™', 'Titanium construction', 'Exclusive feature updates'], is_featured: false, display_order: 3, created_at: new Date().toISOString() }
      ],
      '3': [
        { id: '3-1', product_id: '3', tier_name: 'Premium', price: 2499, features: ['Entropy™ experience engine', 'All connectivity protocols', '5-year warranty', 'Dedicated support team', 'Owners Circle access'], is_featured: false, display_order: 1, created_at: new Date().toISOString() },
        { id: '3-2', product_id: '3', tier_name: 'Signature', price: 3499, features: ['Enhanced Entropy™ algorithms', 'Satellite connectivity', '10-year warranty', 'Personal product specialist', 'VIP Owners Circle', 'Quarterly feature previews', 'Custom experience programming'], is_featured: true, display_order: 2, created_at: new Date().toISOString() },
        { id: '3-3', product_id: '3', tier_name: 'Apex', price: 4999, features: ['Full Entropy™ infinite suite', 'All protocols + experimental', 'Lifetime warranty', 'Direct engineer access', 'Founders Circle membership', 'Annual private showcase', 'Unlimited custom programming', 'Platinum construction', 'Global emergency support'], is_featured: false, display_order: 3, created_at: new Date().toISOString() }
      ]
    };
    return tiers[productId] || [];
  }
  const { data, error } = await supabase
    .from('product_pricing_tiers')
    .select('*')
    .eq('product_id', productId)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data as ProductPricingTier[];
}

export async function getProductFAQs(productId: string) {
  if (!isSupabaseConfigured) {
    const faqs: Record<string, ProductFAQ[]> = {
      '1': [
        { id: '1-1', product_id: '1', question: 'Is Beta One suitable for beginners?', answer: 'Absolutely. Beta One was designed as the entry point to the LewdVerse ecosystem. The NeuralSync™ interface adapts to your experience level, making it intuitive for first-time users while still offering depth for those who want to explore further.', display_order: 1, created_at: new Date().toISOString() },
        { id: '1-2', product_id: '1', question: 'How long does shipping take?', answer: 'We ship discreetly in plain packaging. Standard shipping takes 5-7 business days. Express options available at checkout. All packages are unmarked for your privacy.', display_order: 2, created_at: new Date().toISOString() },
        { id: '1-3', product_id: '1', question: 'What if it doesn\'t meet my expectations?', answer: 'We offer a 30-day satisfaction guarantee. If Beta One doesn\'t transform your experience as promised, return it for a full refund. Note: 97% of customers report exceeding their expectations.', display_order: 3, created_at: new Date().toISOString() },
        { id: '1-4', product_id: '1', question: 'Is it compatible with other devices?', answer: 'Beta One works standalone but integrates seamlessly with Beta Two and Beta Three for expanded capabilities. The app is available on iOS and Android.', display_order: 4, created_at: new Date().toISOString() }
      ],
      '2': [
        { id: '2-1', product_id: '2', question: 'What makes Beta Two different from Beta One?', answer: 'Beta Two features dual-core processing, enabling simultaneous multi-partner connectivity and 4,000+ haptic patterns vs. Beta One\'s standard library. It also includes our BioFeedback™ system for real-time response adaptation.', display_order: 1, created_at: new Date().toISOString() },
        { id: '2-2', product_id: '2', question: 'How many users can connect simultaneously?', answer: 'Beta Two supports up to 4 simultaneous user connections, each with independent response profiles. The advanced sync algorithms ensure seamless coordination between all participants.', display_order: 2, created_at: new Date().toISOString() },
        { id: '2-3', product_id: '2', question: 'Is the BioFeedback™ system accurate?', answer: 'Our testing shows 99.7% accuracy in detecting physiological responses. The system learns your unique patterns over time, improving with each session.', display_order: 3, created_at: new Date().toISOString() },
        { id: '2-4', product_id: '2', question: 'Can I upgrade from Beta One?', answer: 'Yes, we offer a loyalty program for existing customers. Contact our support team for upgrade pricing. Your profile and preferences transfer seamlessly.', display_order: 4, created_at: new Date().toISOString() }
      ],
      '3': [
        { id: '3-1', product_id: '3', question: 'What is the Entropy™ experience engine?', answer: 'Entropy™ is our proprietary infinite experience generation system. Unlike static patterns, Entropy™ creates unique, non-repeating experiences that adapt to your preferences and responses in real-time. No two sessions are ever identical.', display_order: 1, created_at: new Date().toISOString() },
        { id: '3-2', product_id: '3', question: 'Why does Beta Three cost more?', answer: 'Beta Three contains features that cost significantly more to manufacture, including platinum construction, proprietary bio-adaptive materials, satellite connectivity, and the Entropy™ engine. The R&D investment exceeds all previous products combined.', display_order: 2, created_at: new Date().toISOString() },
        { id: '3-3', product_id: '3', question: 'What is the Owners Circle?', answer: 'Beta Three owners receive exclusive access to the Owners Circle, a private community where members share experiences, receive early access to new features, and connect with our development team directly.', display_order: 3, created_at: new Date().toISOString() },
        { id: '3-4', product_id: '3', question: 'Is there a limit to what Beta Three can do?', answer: 'That\'s a philosophical question we\'re still exploring. Technically, no. The Entropy™ engine generates infinite variations, and the predictive neural interface learns your desires before you\'re aware of them. Beta Three grows with you.', display_order: 4, created_at: new Date().toISOString() },
        { id: '3-5', product_id: '3', question: 'What happens if something goes wrong?', answer: 'Beta Three includes lifetime warranty and direct engineer access. In the unlikely event of any issue, our team responds within hours. You\'ll also receive a replacement unit within 24 hours if needed.', display_order: 5, created_at: new Date().toISOString() }
      ]
    };
    return faqs[productId] || [];
  }
  const { data, error } = await supabase
    .from('product_faqs')
    .select('*')
    .eq('product_id', productId)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data as ProductFAQ[];
}