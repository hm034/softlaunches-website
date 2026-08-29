export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-ink px-6 py-10 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-display italic text-lg text-ink">
        soft.launches<span className="text-red">★</span>
      </p>

      <nav className="font-body text-m uppercase tracking-widest flex gap-6">
        <a href="#" className="hover:text-red transition-colors">
          Instagram
        </a>
        <a href="#" className="hover:text-red transition-colors">
          TikTok
        </a>
        <a href="mailto:hello@softlaunches.co" className="hover:text-red transition-colors">
          Email
        </a>
      </nav>

      <p className="font-body text-xs text-ink/60">
        &copy; {new Date().getFullYear()} soft.launches
      </p>
    </footer>
  );
}