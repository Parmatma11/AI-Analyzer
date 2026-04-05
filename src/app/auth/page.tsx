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
    <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl bg-background-panel border border-border shadow-[0_0_30px_rgba(79,70,229,0.1)] relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-[50px] pointer-events-none"></div>

        <h1 className="text-3xl font-bold text-center text-white mb-2 relative z-10">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-center text-muted mb-8 relative z-10">
          {isLogin ? "Sign in to view your past analyses" : "Join to save your code history"}
        </p>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-2 rounded-lg relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-4 relative z-10">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/40 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/40 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 flex items-center justify-center w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted relative z-10">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-accent hover:text-white transition-colors font-medium"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
