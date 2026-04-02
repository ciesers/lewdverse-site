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
    return null;
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
    return [];
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
    return [];
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
    return [];
  }
  const { data, error } = await supabase
    .from('product_faqs')
    .select('*')
    .eq('product_id', productId)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data as ProductFAQ[];
}