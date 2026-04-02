import { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    if (window.Jupiter) {
      window.Jupiter.init({
        displayMode: "integrated",
        integratedTargetId: "jupiter-widget",
        formProps: {
          initialInputMint: "So11111111111111111111111111111111111111112",
          initialOutputMint: "8cQFwdPqpaR9ekN19HMi8wre2C3FBqyoCTu2Y5P8pump",
        },
        branding: {
          logoUri: "https://betaverse-premium-ci-e7c7.bolt.host/betaerselogo1.png",
          name: "LewdVerse",
        }
      });
    }
  }, []);

  return (
    <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 fade-in">
          <h3 className="text-2xl font-light text-gray-800 mb-6 text-center tracking-wide">Trade $BETA</h3>
          <div className="flex justify-center">
            <div id="jupiter-widget" style={{ width: '400px', height: '360px', overflow: 'hidden' }}></div>
          </div>
        </div>

        <div id="contract" className="mb-12 pt-8 border-t border-white/20">
          <div className="text-center fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-sm font-light text-gray-800 mb-3 tracking-wide">Contract Address</h4>
            <div className="inline-block bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg px-6 py-3">
              <code className="text-sm font-mono text-gray-800 break-all">
                8cQFwdPqpaR9ekN19HMi8wre2C3FBqyoCTu2Y5P8pump
              </code>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8 stagger-fade-in">
          <div>
            <h3 className="text-lg font-light text-gray-800 mb-4 text-glow-subtle">The LewdVerse</h3>
            <p className="text-sm font-light text-gray-600 leading-relaxed">
              Advanced intimacy technology for the modern era.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-light text-gray-800 mb-3 tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-sm font-light text-gray-600 hover:text-gray-800 hover:text-glow-subtle transition-all duration-300 inline-block hover:translate-x-1">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-sm font-light text-gray-600 hover:text-gray-800 hover:text-glow-subtle transition-all duration-300 inline-block hover:translate-x-1">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-sm font-light text-gray-600 hover:text-gray-800 hover:text-glow-subtle transition-all duration-300 inline-block hover:translate-x-1">
                  Product Disclaimer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light text-gray-800 mb-3 tracking-wide">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="#support" className="text-sm font-light text-gray-600 hover:text-gray-800 hover:text-glow-subtle transition-all duration-300 inline-block hover:translate-x-1">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#business" className="text-sm font-light text-gray-600 hover:text-gray-800 hover:text-glow-subtle transition-all duration-300 inline-block hover:translate-x-1">
                  Business Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20">
          <p className="text-xs font-light text-gray-600 text-center leading-relaxed max-w-4xl mx-auto fade-in italic mb-6" style={{ animationDelay: '0.3s' }}>
            Beta does not guarantee satisfaction, intimacy, meaningful contact, or any form of actual human interaction.
            All emotional and physical repercussions of use are the sole responsibility of the user. Side effects may
            include confusion, heartbreak, or in rare cases, genital mutilation.
          </p>

          <p className="text-xs font-light text-gray-500 text-center fade-in" style={{ animationDelay: '0.5s' }}>
            &copy; {new Date().getFullYear()} The LewdVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}