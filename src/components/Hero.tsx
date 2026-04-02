export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-gray-800 leading-tight slide-up text-glow">
            The LewdVerse
          </h1>

          <p className="text-xl md:text-2xl font-normal text-gray-700 max-w-3xl mx-auto leading-relaxed slide-up-delay-1">
            Experience intimacy and connection reimagined for the 21st century.
          </p>

          <div className="pt-8 max-w-4xl mx-auto slide-up-delay-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/30 bg-black cinematic-vignette light-sweep pulse-glow">
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  aria-label="LewdVerse introduction video"
                >
                  <source src="https://betaverse-premium-ci-e7c7.bolt.host/rapidsave.com_the_future_of_intimacy-csrm5mhpouxf1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="pt-8 slide-up-delay-2">
            <div className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full gradient-overlay hover:scale-105 transition-all duration-300">
              <p className="text-sm font-normal text-gray-700 tracking-wide">
                Advanced Intimacy Technology
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl floating" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-200/15 rounded-full blur-3xl floating" style={{ animationDelay: '0.75s' }}></div>
      </div>
    </section>
  );
}