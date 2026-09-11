"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
  }

  return (
    <main className="w-full max-w-sm mx-auto px-6 py-24">
      <a href="/" className="font-display italic text-2xl tracking-tight text-ink">
        soft.launches<span className="text-red">★</span>
      </a>

      <h1 className="font-display text-3xl text-ink mt-10 mb-8">Admin login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1">
          <span className="font-body text-xs uppercase tracking-widest text-ink/60">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-ink bg-cream px-3 py-2 font-body text-ink"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-body text-xs uppercase tracking-widest text-ink/60">
            Password
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-ink bg-cream px-3 py-2 font-body text-ink"
          />
        </label>

        {error && <p className="font-body text-sm text-red">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="font-display text-sm uppercase tracking-widest border-2 border-ink px-4 py-3 hover:bg-ink hover:text-cream transition-colors disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
