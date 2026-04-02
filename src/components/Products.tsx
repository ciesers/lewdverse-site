import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, Product } from '../lib/supabase';

interface ProductsProps {
  standalone?: boolean;
}

export default function Products({ standalone = false }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className={`${standalone ? 'pt-32' : 'pt-20'} pb-20 px-6`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-normal">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className={`${standalone ? 'pt-32' : 'pt-20'} pb-20 px-6`}>
      <div className="max-w-7xl mx-auto">
        {standalone && (
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-gray-800 mb-6">
              Our Products
            </h2>
            <p className="text-lg font-normal text-gray-700 max-w-2xl mx-auto">
              Precision-engineered solutions for modern intimate experiences
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="group relative bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 hover:bg-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer ambient-glow gradient-overlay"
            >
              <div className="aspect-square bg-gradient-to-br from-white/40 to-white/20 rounded-2xl mb-6 flex items-center justify-center border border-white/30 cinematic-vignette light-sweep overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain p-4 transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 group-hover:drop-shadow-2xl"
                    style={{
                      filter: 'brightness(0.95) contrast(1.05)',
                      transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                ) : (
                  <div className="text-gray-400 font-normal text-sm">Product Image</div>
                )}
              </div>

              <div className="space-y-3 stagger-fade-in">
                <h3 className="text-3xl font-medium tracking-wide text-gray-800 transition-all duration-300 group-hover:text-glow-subtle">
                  {product.name}
                </h3>

                {product.subtitle && (
                  <p className="text-sm font-normal text-gray-600 tracking-wider">
                    {product.subtitle}
                  </p>
                )}

                <div className="pt-2 pb-4">
                  <p className="text-gray-700 font-normal transition-all duration-300 group-hover:scale-105">
                    <span className="text-sm align-top">From</span>
                    <span className="text-lg mx-1">$</span>
                    <span className="text-4xl">{product.base_price}</span>
                  </p>
                </div>

                <p className="text-sm font-normal text-gray-600 leading-relaxed">
                  {product.short_description}
                </p>

                <div className="pt-4">
                  <span className="inline-block text-sm font-medium text-gray-800 group-hover:underline transition-all duration-300">
                    Learn More →
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 to-cyan-400/0 group-hover:from-blue-400/15 group-hover:to-cyan-400/15 transition-all duration-700 pointer-events-none"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}