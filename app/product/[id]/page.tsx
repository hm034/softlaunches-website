import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

    return (
    <main className="w-full max-w-4xl mx-auto px-6 py-16">
      <a
        href="/#shop"
        className="font-body text-xs uppercase tracking-widest text-ink/60 hover:text-red"
      >
        ← Back to shop
      </a>

      <div className="grid sm:grid-cols-2 gap-10 mt-8">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full aspect-square object-cover border-2 border-ink"
          />
        ) : (
          <div className="w-full aspect-square bg-paper border-2 border-ink" />
        )}

        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl text-ink">{product.name}</h1>

          <p className="font-display text-2xl text-red">
            ${(product.price_cents / 100).toFixed(2)}
          </p>

          <dl className="font-body text-sm text-ink/80 flex flex-col gap-1">
            {product.size && <div>Size · {product.size}</div>}
            {product.condition && <div>Condition · {product.condition}</div>}
          </dl>

          {product.description && (
            <p className="font-body text-ink/80 whitespace-pre-line">
              {product.description}
            </p>
          )}

          {product.status !== "available" && (
            <p className="font-display text-lg text-red uppercase">Sold</p>
          )}
        </div>
      </div>
    </main>
  );
}