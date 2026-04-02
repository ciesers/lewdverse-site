import Hero from '../components/Hero';
import Products from '../components/Products';
import About from '../components/About';

export default function HomePage() {
  return (
    <div className="fade-in">
      <Hero />
      <Products />
      <About />
    </div>
  );
}