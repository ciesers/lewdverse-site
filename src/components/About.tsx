interface AboutProps {
  standalone?: boolean;
}

export default function About({ standalone = false }: AboutProps) {
  return (
    <section id="about" className={`${standalone ? 'pt-32' : 'pt-20'} pb-20 px-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-12 md:p-16 gradient-overlay">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-800 mb-8 slide-up text-glow-subtle">
            About The LewdVerse
          </h2>

          <div className="space-y-6 text-gray-700 font-normal leading-relaxed stagger-fade-in">
            <p className="text-lg">
              The LewdVerse represents a new paradigm in intimate technology. Our mission is to elevate human connection through thoughtfully designed, precision-engineered solutions that respect the sophistication of modern relationships.
            </p>

            <p className="text-lg">
              We believe that technology should enhance, not replace, genuine intimacy. Every product we create is developed with meticulous attention to quality, safety, and user experience. Our commitment extends beyond innovation to encompass responsibility, discretion, and respect for our customers.
            </p>

            <div className="pt-8 mt-8 border-t border-white/30">
              <div className="rounded-2xl overflow-hidden cinematic-vignette light-sweep">
                <img
                  src="https://betaverse-premium-ci-e7c7.bolt.host/9379ab7275d1f03461cf0fc67630b3d4.png"
                  alt="BetaVerse Products"
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                  style={{
                    filter: 'brightness(0.98) contrast(1.03)'
                  }}
                />
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/30">
              <p className="text-sm text-gray-600 italic fade-in" style={{ animationDelay: '0.4s' }}>
                The LewdVerse is committed to responsible innovation and the highest standards of product quality. All products undergo rigorous testing and comply with relevant safety regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}