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
    console.warn('Supabase not configured - returning empty products');
    return [];
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