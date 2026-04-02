import { Menu, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { totalItems } = useCart();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (path: string, sectionId?: string) => {
    if (currentPath === '/' && sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all"
          >
            <img
              src="https://betaverse-premium-ci-e7c7.bolt.host/betaerselogo1.png"
              alt="BetaVerse Logo"
              className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl font-normal tracking-wide text-gray-800 group-hover:text-gray-600 transition-colors">
              LewdVerse
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              onClick={() => handleNavigation('/', 'hero')}
              className={`text-sm font-normal tracking-wide transition-all duration-300 ${
                currentPath === '/' ? 'text-gray-800' : 'text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`text-sm font-normal tracking-wide transition-all duration-300 ${
                currentPath === '/products' || currentPath.startsWith('/product/')
                  ? 'text-gray-800'
                  : 'text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500'
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`text-sm font-normal tracking-wide transition-all duration-300 ${
                currentPath === '/about' ? 'text-gray-800' : 'text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500'
              }`}
            >
              About
            </Link>
            <a
              href="https://pump.fun/coin/8cQFwdPqpaR9ekN19HMi8wre2C3FBqyoCTu2Y5P8pump"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-normal tracking-wide transition-all duration-300 text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500"
            >
              Pump
            </a>
            <a
              href="https://dexscreener.com/solana/8cQFwdPqpaR9ekN19HMi8wre2C3FBqyoCTu2Y5P8pump"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-normal tracking-wide transition-all duration-300 text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500"
            >
              DEX
            </a>
            <a
              href="#contract"
              className="text-sm font-normal tracking-wide transition-all duration-300 text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500"
            >
              Trade
            </a>
            <a
              href="https://x.com/Thelewd_verse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-normal tracking-wide transition-all duration-300 text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500"
            >
              X
            </a>
            <Link
              to="/cart"
              className="relative p-2 hover:bg-white/30 rounded-full transition-colors"
            >
              <ShoppingCart size={24} className="text-gray-800" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          <button className="md:hidden text-gray-800">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}