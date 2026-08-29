export default function Hero() {
  return (
    <section className="w-full px-6 py-20 sm:py-32 flex flex-col items-start gap-6 max-w-3xl">
      <h1 className="font-display text-5xl sm:text-7xl leading-none text-ink">
        Curated finds,
        <br />
        <span className="text-red italic">fresh drops.</span>
      </h1>
      <p className="font-body text-lg text-ink/80 max-w-md">
        One-of-one vintage pieces, hand-picked and restocked weekly. No two
        soft.launches finds are ever the same.
      </p>
      <a
        href="#shop"
        className="font-nav text-xs uppercase tracking-widest border-2 border-ink px-6 py-3 hover:bg-ink hover:text-cream transition-colors"
      >
        Shop the drop
      </a>
    </section>
  );
}