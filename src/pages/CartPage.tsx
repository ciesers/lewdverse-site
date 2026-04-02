import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully! Thank you for your purchase.');
    clearCart();
    setShowCheckout(false);
    setFormData({
      email: '',
      name: '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
    });
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-3xl font-medium text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 font-normal mb-6">Add some products to get started!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (showCheckout) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setShowCheckout(false)}
              className="inline-flex items-center text-sm font-normal text-gray-600 hover:text-gray-800 transition-colors mb-6"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Cart
            </button>

            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 md:p-12">
              <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-8">Checkout</h1>

              <form onSubmit={handleCheckout} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all"
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all"
                    placeholder="United States"
                  />
                </div>

                <div className="border-t border-white/30 pt-6 mt-8">
                  <div className="flex justify-between text-lg font-medium text-gray-800 mb-6">
                    <span>Total:</span>
                    <span className="text-2xl">${totalPrice.toFixed(2)}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-all duration-300 hover:shadow-xl"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-light tracking-tight text-gray-800 mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 flex items-center gap-6"
                >
                  <div className="w-24 h-24 bg-white/30 rounded-xl overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingCart size={32} />
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-xl font-medium text-gray-700">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 bg-white/30 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-medium text-gray-800 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 bg-white/30 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 sticky top-32">
                <h2 className="text-2xl font-medium text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-white/30 pt-3 mt-3">
                    <div className="flex justify-between text-xl font-medium text-gray-800">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-all duration-300 hover:shadow-xl mb-3"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/products"
                  className="block text-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}