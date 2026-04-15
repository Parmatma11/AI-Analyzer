"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            // we configure email verification as optional or auto-confirm in supabase
          }
         });
        if (error) throw error;
        // Depending on supabase config, user may need to verify email
      }
      router.push("/history");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 md:p-10 rounded-[12px] bg-[color:var(--color-pure-white)] border border-[color:var(--color-border-cream)] shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden">
        <h1 className="font-serif text-[32px] font-medium text-center text-[color:var(--color-near-black)] mb-2 leading-tight tracking-tight">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-center text-[color:var(--color-olive)] mb-8 text-[16px]">
          {isLogin ? "Sign in to view your past analyses" : "Join to save your code history"}
        </p>

        {error && (
          <div className="mb-6 bg-[color:var(--color-warm-sand)] border border-[color:var(--color-crimson)]/20 text-[color:var(--color-crimson)] text-[14px] px-4 py-3 rounded-[8px]">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[color:var(--color-near-black)]">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[color:var(--color-ivory)] border border-[color:var(--color-border-warm)] rounded-[8px] px-4 py-2.5 text-[color:var(--color-near-black)] focus:outline-none focus:border-[color:var(--color-focus-blue)] focus:ring-1 focus:ring-[color:var(--color-focus-blue)] transition-all placeholder:text-[color:var(--color-stone)]"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[color:var(--color-near-black)]">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[color:var(--color-ivory)] border border-[color:var(--color-border-warm)] rounded-[8px] px-4 py-2.5 text-[color:var(--color-near-black)] focus:outline-none focus:border-[color:var(--color-focus-blue)] focus:ring-1 focus:ring-[color:var(--color-focus-blue)] transition-all placeholder:text-[color:var(--color-stone)]"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 flex items-center justify-center w-full py-3 bg-[color:var(--color-terracotta)] hover:opacity-90 text-[color:var(--color-ivory)] rounded-[8px] font-medium transition-opacity shadow-[0_0_0_1px_var(--color-terracotta)] disabled:opacity-50 disabled:cursor-not-allowed text-[16px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <p className="mt-8 text-center text-[15px] text-[color:var(--color-olive)]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[color:var(--color-terracotta)] hover:underline underline-offset-4 transition-all font-medium"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
