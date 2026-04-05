import Link from "next/link";
import { Cpu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background-panel/70 border-b border-border pl-4 pr-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl drop-shadow-[0_0_10px_rgba(79,70,229,0.8)]">
          <Cpu className="text-primary-hover" />
          <span>CodeInsight AI</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/history" className="text-muted hover:text-white transition-colors">
            History
          </Link>
          <Link href="/auth" className="text-sm bg-primary hover:bg-primary-hover transition-colors text-white px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
