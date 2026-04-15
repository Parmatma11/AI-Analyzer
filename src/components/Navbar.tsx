import Link from "next/link";
import { Cpu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[color:var(--color-parchment)] border-b border-[color:var(--color-border-cream)] px-4">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-2 text-[color:var(--color-near-black)]">
          <Cpu className="text-[color:var(--color-terracotta)]" strokeWidth={1.5} />
          <span className="font-serif text-[20px] font-medium tracking-tight">CodeSage</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/history" className="text-[color:var(--color-olive)] hover:text-[color:var(--color-near-black)] transition-colors text-[17px]">
            History
          </Link>
          <Link href="/auth" className="text-[16px] font-medium bg-[color:var(--color-terracotta)] hover:opacity-90 transition-opacity text-[color:var(--color-ivory)] px-4 py-2 rounded-[12px] shadow-[0_0_0_1px_var(--color-terracotta)]">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
