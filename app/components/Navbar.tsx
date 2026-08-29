export default function Navbar() {
  return (
    <header className="w-full border-b-2 border-ink px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-display italic text-2xl tracking-tight text-ink">
        soft.launches<span className="text-red">★</span>
      </a>

         <nav className="hidden sm:flex items-center gap-8 font-display text-L tracking-wide">
        <a href="#shop" className="hover:text-red transition-colors">
          Shop
        </a>
        <a href="#about" className="hover:text-red transition-colors">
          About
        </a>
        <a href="#contact" className="hover:text-red transition-colors">
          Contact
        </a>
      </nav>

      <a
        href="#cart"
      className="font-display text-L uppercase tracking-widest border-2 border-ink px-4 py-2 hover:bg-ink hover:text-cream transition-colors"
       >
      Cart (0)
        
      </a>
    </header>
  );
}