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
    <div className="h-[calc(100vh-8rem)] w-full flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <CodeEditor onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <ResultPanel result={result} explainLike5={explainLike5} />
      </div>
    </div>
  );
}
