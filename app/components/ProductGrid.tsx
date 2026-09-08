import { supabase } from "@/lib/supabase";

export default async function ProductGrid() {
  const { data: products, error } = await supabase
    .from("products")
    .select()
    .eq("status", "available")
    .order("created_at", { ascending: false });

  return (
    <section id="shop" className="w-full px-6 py-16">
      <h2 className="font-display text-3xl sm:text-4xl text-ink mb-8">
        New Arrivals
      </h2>

      {error && (
        <p className="font-body text-red">Couldn&apos;t load products: {error.message}</p>
      )}

      {!error && products?.length === 0 && (
        <p className="font-body text-ink/60">Nothing in stock right now — check back soon.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="flex flex-col gap-2">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="aspect-square w-full object-cover border-2 border-ink"
              />
            ) : (
              <div className="aspect-square bg-paper border-2 border-ink" />
            )}
            <p className="font-body text-sm text-ink">{product.name}</p>
            {product.size && (
              <p className="font-body text-xs text-ink/60">Size {product.size}</p>
            )}
            <p className="font-nav text-xs text-red">
              ${(product.price_cents / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
