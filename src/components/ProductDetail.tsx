import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ShoppingCart, Shield, Truck, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  getProductBySlug,
  getProductSpecifications,
  getProductPricingTiers,
  getProductFAQs,
  Product,
  ProductSpecification,
  ProductPricingTier,
  ProductFAQ,
} from '../lib/supabase';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [specifications, setSpecifications] = useState<ProductSpecification[]>([]);
  const [pricingTiers, setPricingTiers] = useState<ProductPricingTier[]>([]);
  const [faqs, setFAQs] = useState<ProductFAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<number>(1);

  useEffect(() => {
    async function loadProductData() {
      if (!slug) return;

      try {
        setLoading(true);
        const productData = await getProductBySlug(slug);

        if (!productData) {
          setLoading(false);
          return;
        }

        setProduct(productData);

        const [specs, tiers, faqsData] = await Promise.all([
          getProductSpecifications(productData.id),
          getProductPricingTiers(productData.id),
          getProductFAQs(productData.id),
        ]);

        setSpecifications(specs);
        setPricingTiers(tiers);
        setFAQs(faqsData);

        const featuredIndex = tiers.findIndex((tier) => tier.is_featured);
        if (featuredIndex !== -1) {
          setSelectedTier(featuredIndex);
        }
      } catch (error) {
        console.error('Error loading product data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProductData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-normal">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-medium text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 font-normal mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-full text-sm font-medium text-gray-800 hover:bg-white/50 hover:shadow-lg transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center text-sm font-normal text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="mr-2">←</span> Back to Products
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-gradient-to-br from-white/40 to-white/20 rounded-3xl p-8 flex items-center justify-center border border-white/30 aspect-square cinematic-vignette light-sweep gradient-overlay overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="max-w-full max-h-full object-contain pulse-glow transition-all duration-700 hover:scale-105"
                style={{
                  filter: 'brightness(0.95) contrast(1.05) drop-shadow(0 0 30px rgba(96, 165, 250, 0.3))'
                }}
              />
            ) : (
              <div className="text-center">
                <div className="text-gray-400 font-normal text-lg mb-2">{product.name}</div>
                <div className="text-gray-400 font-normal text-sm">Product Image</div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-800 mb-4 slide-up">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="text-xl font-normal text-gray-600 tracking-wide mb-6 slide-up-delay-1">
                {product.subtitle}
              </p>
            )}

            <div className="mb-6 slide-up-delay-1">
              <p className="text-gray-700 font-normal text-sm mb-1">Starting at</p>
              <p className="text-5xl font-medium text-gray-800 text-glow-subtle">
                ${product.base_price}
              </p>
            </div>

            <p className="text-lg font-normal text-gray-700 leading-relaxed mb-8 slide-up-delay-2">
              {product.short_description}
            </p>

            <div className="flex flex-wrap gap-4 mb-8 stagger-fade-in">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-full">
                <Shield size={18} className="text-gray-700" />
                <span className="text-sm font-normal text-gray-700">1-3 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-full">
                <Truck size={18} className="text-gray-700" />
                <span className="text-sm font-normal text-gray-700">Discreet Shipping</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-full">
                <Award size={18} className="text-gray-700" />
                <span className="text-sm font-normal text-gray-700">Premium Quality</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (product) {
                  const selectedPrice = pricingTiers[selectedTier]?.price || product.base_price;
                  const tierName = pricingTiers[selectedTier]?.tier_name || 'Standard';
                  addToCart({
                    id: `${product.id}-${selectedTier}`,
                    name: `${product.name} - ${tierName}`,
                    price: selectedPrice,
                    image: product.image_url || ''
                  });
                }
              }}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-all duration-300 hover:shadow-xl"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-light tracking-tight text-gray-800 mb-8 text-center text-glow-subtle">
            About This Product
          </h2>
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 md:p-12 gradient-overlay">
            <p className="text-lg font-normal text-gray-700 leading-relaxed whitespace-pre-line">
              {product.full_description}
            </p>
          </div>
        </div>

        {pricingTiers.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl font-light tracking-tight text-gray-800 mb-8 text-center text-glow-subtle">
              Choose Your Edition
            </h2>
            <div className="grid md:grid-cols-3 gap-6 stagger-fade-in">
              {pricingTiers.map((tier, index) => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(index)}
                  className={`relative bg-white/20 backdrop-blur-md border rounded-3xl p-8 transition-all duration-300 cursor-pointer gradient-overlay hover:scale-105 ${
                    selectedTier === index
                      ? 'border-gray-800 shadow-2xl scale-105'
                      : 'border-white/30 hover:bg-white/30'
                  } ${tier.is_featured ? 'ring-2 ring-cyan-400' : ''}`}
                >
                  {tier.is_featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-cyan-400 text-white text-xs font-medium rounded-full">
                      Recommended
                    </div>
                  )}

                  <h3 className="text-2xl font-medium text-gray-800 mb-4">{tier.tier_name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-medium text-gray-800">${tier.price}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <span className="text-cyan-600 mt-1">✓</span>
                        <span className="text-sm font-normal text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {specifications.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl font-light tracking-tight text-gray-800 mb-8 text-center text-glow-subtle">
              Technical Specifications
            </h2>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 md:p-12 gradient-overlay">
              <div className="grid md:grid-cols-2 gap-6">
                {specifications.map((spec) => (
                  <div
                    key={spec.id}
                    className="border-b border-white/30 pb-4 last:border-b-0"
                  >
                    <dt className="text-sm font-medium text-gray-600 mb-2">{spec.spec_key}</dt>
                    <dd className="text-base font-normal text-gray-800">{spec.spec_value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {faqs.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl font-light tracking-tight text-gray-800 mb-8 text-center text-glow-subtle">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden gradient-overlay"
                >
                  <button
                    onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/10 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-800 pr-4">{faq.question}</h3>
                    <ChevronDown
                      size={24}
                      className={`text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                        openFAQIndex === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFAQIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-base font-normal text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 md:p-12 text-center gradient-overlay light-sweep">
          <h2 className="text-3xl font-light tracking-tight text-gray-800 mb-4 text-glow-subtle">
            Ready to Experience {product.name}?
          </h2>
          <p className="text-lg font-normal text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have elevated their intimate experiences.
          </p>
          <button
            onClick={() => {
              if (product) {
                const selectedPrice = pricingTiers[selectedTier]?.price || product.base_price;
                const tierName = pricingTiers[selectedTier]?.tier_name || 'Standard';
                addToCart({
                  id: `${product.id}-${selectedTier}`,
                  name: `${product.name} - ${tierName}`,
                  price: selectedPrice,
                  image: product.image_url || ''
                });
              }
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-all duration-300 hover:shadow-xl"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart - ${pricingTiers[selectedTier]?.price || product.base_price}</span>
          </button>
        </div>
      </div>
    </div>
  );
}