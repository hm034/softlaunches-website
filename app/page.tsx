import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";

// Ask Supabase for products on every visit, instead of freezing them at build time.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <Hero />
      <ProductGrid />
      <Footer />
    </div>
  );
}
