"use client";

import React, { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import ResultPanel, { AnalysisResult } from "@/components/ResultPanel";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [explainLike5, setExplainLike5] = useState(false);

  const handleAnalyze = async (code: string, language: string, explainLike5Toggle: boolean) => {
    setIsAnalyzing(true);
    setExplainLike5(explainLike5Toggle);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze code");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex flex-col text-center space-y-4 mb-8 md:mb-12 mt-4 md:mt-8 items-center">
        <h1 className="font-serif text-[40px] md:text-[52px] font-medium leading-[1.10] text-[color:var(--color-near-black)] tracking-tight">
          Analyze any code
        </h1>
        <p className="text-[20px] text-[color:var(--color-olive)] max-w-[600px] leading-[1.60]">
          Get immediate insights, find hidden bugs, and simplify complex logic with a conversational AI code assistant.
        </p>
      </div>

      <div className="min-h-[500px] h-[calc(100vh-24rem)] w-full flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="w-full md:w-1/2 h-[400px] md:h-full">
          <CodeEditor onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>
        <div className="w-full md:w-1/2 h-[400px] md:h-full">
          <ResultPanel result={result} explainLike5={explainLike5} />
        </div>
      </div>

      <div className="mt-24 md:mt-32 w-full max-w-[1000px] mx-auto pb-20">
        <h2 className="font-serif text-[32px] md:text-[36px] font-medium text-[color:var(--color-near-black)] text-center mb-12">
          Choose the right perspective
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Opus", desc: "Most powerful model for highly complex tasks.", capability: "Mastering Complexity", badges: ["Vast knowledge", "Expert reasoning"] },
            { name: "Sonnet", desc: "Perfect balance of speed and intelligence.", capability: "Scale & Efficiency", badges: ["Fast", "Smart"] },
            { name: "Haiku", desc: "Fastest and most compact model.", capability: "Instant Responses", badges: ["Lightweight", "Near-instant"] }
          ].map((model) => (
            <div key={model.name} className="bg-[color:var(--color-ivory)] border border-[color:var(--color-border-cream)] p-6 rounded-[12px] shadow-[0_0_0_1px_var(--color-border-warm)] transition-all hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group">
              <span className="text-[12px] font-medium uppercase tracking-widest text-[color:var(--color-terracotta)] mb-4 block">{model.capability}</span>
              <h3 className="font-serif text-[24px] font-medium mb-3 text-[color:var(--color-near-black)]">{model.name}</h3>
              <p className="text-[15px] text-[color:var(--color-olive)] leading-relaxed mb-6">{model.desc}</p>
              <div className="flex flex-wrap gap-2">
                {model.badges.map(badge => (
                  <span key={badge} className="text-[11px] font-medium px-2 py-0.5 bg-[color:var(--color-warm-sand)] text-[color:var(--color-charcoal)] rounded-[4px] border border-[color:var(--color-border-cream)]">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
