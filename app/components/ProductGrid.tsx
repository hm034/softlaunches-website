const products = [
  { name: "Levi's Denim Jacket", price: "$48" },
  { name: "Vintage Band Tee", price: "$22" },
  { name: "Corduroy Trousers", price: "$35" },
  { name: "Windbreaker", price: "$40" },
];

export default function ProductGrid() {
  return (
    <section id="shop" className="w-full px-6 py-16">
      <h2 className="font-display text-3xl sm:text-4xl text-ink mb-8">
        New Arrivals
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.name} className="flex flex-col gap-2">
            <div className="aspect-square bg-paper border-2 border-ink" />
            <p className="font-body text-sm text-ink">{product.name}</p>
            <p className="font-nav text-xs text-red">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}