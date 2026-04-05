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
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
      <div className="w-full md:w-1/3 bg-background-panel border border-border rounded-2xl overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3 shadow-[0_0_20px_rgba(34,211,238,0.05)]">
        <h2 className="text-lg font-semibold text-white mb-2 px-2 sticky top-0 bg-background-panel z-10 py-2 border-b border-border">Your History</h2>
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selected?.id === item.id 
                ? "bg-primary/20 border-primary/50 shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
                : "bg-black/20 border-border hover:bg-black/40"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono uppercase text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                {item.language}
              </span>
              <span className="text-xs text-muted">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-foreground line-clamp-2 font-mono bg-black/50 p-2 rounded-lg border border-border/50">
              {item.code}
            </p>
          </button>
        ))}
      </div>
      <div className="w-full md:w-2/3 h-[50vh] md:h-full">
        {selected ? (
          <ResultPanel result={selected} explainLike5={false} />
        ) : (
          <div className="h-full flex items-center justify-center text-muted border border-border border-dashed rounded-2xl bg-black/10">
            Select an item to view analysis
          </div>
        )}
      </div>
    </div>
  );
}
