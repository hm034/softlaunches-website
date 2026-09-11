"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  price_cents: number;
  size: string | null;
  condition: string | null;
  image_url: string | null;
  status: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const loadProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select()
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }
    setProducts(data ?? []);
  }, []);

  // On arrival: are you logged in? If not, go to the login page.
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }
      await loadProducts();
      setChecking(false);
    })();
  }, [router, loadProducts]);

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await supabase.from("products").insert({
      name,
      price_cents: Math.round(Number(price) * 100),
      size: size || null,
      condition: condition || null,
      image_url: imageUrl || null,
    });

    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setName("");
    setPrice("");
    setSize("");
    setCondition("");
    setImageUrl("");
    setMessage("Added.");
    await loadProducts();
  }

  async function toggleStatus(product: Product) {
    const next = product.status === "available" ? "sold" : "available";
    const { error } = await supabase
      .from("products")
      .update({ status: next })
      .eq("id", product.id);

    if (error) {
      setMessage(error.message);
      return;
    }
    await loadProducts();
  }

  async function deleteProduct(product: Product) {
    if (!window.confirm(`Delete "${product.name}" permanently?`)) return;

    const { error } = await supabase.from("products").delete().eq("id", product.id);

    if (error) {
      setMessage(error.message);
      return;
    }
    await loadProducts();
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (checking) {
    return (
      <main className="px-6 py-24">
        <p className="font-body text-ink/60">Checking…</p>
      </main>
    );
  }

  return (
    <main className="w-full max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between border-b-2 border-ink pb-4 mb-10">
        <h1 className="font-display text-3xl text-ink">Inventory</h1>
        <button
          onClick={signOut}
          className="font-body text-xs uppercase tracking-widest border-2 border-ink px-3 py-2 hover:bg-ink hover:text-cream transition-colors"
        >
          Sign out
        </button>
      </div>

      <h2 className="font-display text-xl text-ink mb-4">Add an item</h2>

      <form onSubmit={addProduct} className="grid sm:grid-cols-2 gap-4 mb-12">
        <input
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-ink bg-cream px-3 py-2 font-body text-ink"
        />
        <input
          required
          type="number"
          step="0.01"
          min="0"
          placeholder="Price in dollars, e.g. 48"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border-2 border-ink bg-cream px-3 py-2 font-body text-ink"
        />
        <input
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border-2 border-ink bg-cream px-3 py-2 font-body text-ink"
        />
        <input
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="border-2 border-ink bg-cream px-3 py-2 font-body text-ink"
        />
        <input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border-2 border-ink bg-cream px-3 py-2 font-body text-ink sm:col-span-2"
        />

        <button
          type="submit"
          disabled={saving}
          className="font-display text-sm uppercase tracking-widest border-2 border-ink px-4 py-3 hover:bg-ink hover:text-cream transition-colors disabled:opacity-50 sm:col-span-2"
        >
          {saving ? "Saving…" : "Add item"}
        </button>
      </form>

      {message && <p className="font-body text-sm text-red mb-8">{message}</p>}

      <h2 className="font-display text-xl text-ink mb-4">
        All items ({products.length})
      </h2>

      <ul className="flex flex-col divide-y-2 divide-ink/20 border-t-2 border-ink">
        {products.map((product) => (
          <li key={product.id} className="flex items-center gap-4 py-4">
            <div className="flex-1">
              <p className="font-body text-ink">{product.name}</p>
              <p className="font-body text-xs text-ink/60">
                ${(product.price_cents / 100).toFixed(2)}
                {product.size && ` · ${product.size}`}
                {product.condition && ` · ${product.condition}`}
              </p>
            </div>

            <span
              className={`font-body text-xs uppercase tracking-widest ${
                product.status === "available" ? "text-ink/60" : "text-red"
              }`}
            >
              {product.status}
            </span>

            <button
              onClick={() => toggleStatus(product)}
              className="font-body text-xs uppercase tracking-widest border-2 border-ink px-2 py-1 hover:bg-ink hover:text-cream transition-colors"
            >
              {product.status === "available" ? "Mark sold" : "Restock"}
            </button>

            <button
              onClick={() => deleteProduct(product)}
              className="font-body text-xs uppercase tracking-widest text-red hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
