"use client";

import React, { useEffect, useState } from "react";
import ResultPanel, { AnalysisResult } from "@/components/ResultPanel";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const [history, setHistory] = useState<(AnalysisResult & { id: string, created_at: string, language: string, code: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<(AnalysisResult & { id: string, created_at: string, language: string, code: string }) | null>(null);
  
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/history");
        if (!res.ok) {
          if (res.status === 401) {
             throw new Error("Please sign in to view history.");
          }
          throw new Error("Failed to fetch history");
        }
        const data = await res.json();
        setHistory(data);
        if (data.length > 0) {
          setSelected(data[0]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-64 items-center justify-center gap-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <h2 className="text-xl font-semibold text-red-400">Oops!</h2>
        <p className="text-muted">{error}</p>
        <Link href="/auth" className="mt-4 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col h-64 items-center justify-center text-center">
        <p className="text-muted text-lg">No analysis history found.</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-primary/20 hover:bg-primary/40 text-primary-hover border border-primary/50 rounded-lg transition-colors">
          Analyze some code
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full min-h-[600px]">
      <div className="w-full md:w-1/3 bg-[color:var(--color-pure-white)] border border-[color:var(--color-border-cream)] rounded-[12px] overflow-y-auto shrink-0 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h2 className="font-serif text-[24px] font-medium text-[color:var(--color-near-black)] px-6 py-5 sticky top-0 bg-[color:var(--color-ivory)] z-10 border-b border-[color:var(--color-border-cream)]">Your History</h2>
        <div className="p-4 flex flex-col gap-3">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`text-left p-4 rounded-[10px] border transition-all ${
                selected?.id === item.id 
                  ? "bg-[color:var(--color-ivory)] border-[color:var(--color-near-black)] ring-1 ring-[color:var(--color-near-black)]" 
                  : "bg-transparent border-[color:var(--color-border-warm)] hover:bg-[color:var(--color-ivory)]"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-[color:var(--color-terracotta)] bg-[color:var(--color-warm-sand)] px-2 py-0.5 rounded-[4px]">
                  {item.language}
                </span>
                <span className="text-[12px] text-[color:var(--color-stone)]">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-[14px] text-[color:var(--color-olive)] line-clamp-2 font-mono bg-[color:var(--color-ivory)] p-3 rounded-[6px] border border-[color:var(--color-border-warm)]/50">
                {item.code}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="w-full md:w-2/3 h-[600px] md:h-auto flex flex-col">
        {selected ? (
          <ResultPanel result={selected} explainLike5={false} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-[color:var(--color-stone)] border border-[color:var(--color-border-cream)] border-dashed rounded-[12px] bg-[color:var(--color-ivory)]/50 p-12 text-center">
            <h3 className="font-serif text-[20px] text-[color:var(--color-near-black)] mb-2">Nothing selected</h3>
            <p>Select an item from your history to view the analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
}
