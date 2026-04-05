"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Info, Bug, Zap, Activity, BookOpen, Copy, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnalysisResult {
  explanation: string;
  bugs: string;
  improvements: string;
  complexity: string;
  simplified_explanation: string;
}

interface ResultPanelProps {
  result: AnalysisResult | null;
  explainLike5: boolean;
}

export default function ResultPanel({ result, explainLike5 }: ResultPanelProps) {
  const [activeTab, setActiveTab] = useState<"explanation" | "bugs" | "improvements" | "complexity">("explanation");
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted border border-border border-dashed rounded-2xl bg-black/10">
        <Activity className="w-12 h-12 mb-4 text-border" />
        <p>Run analysis to see insights here.</p>
      </div>
    );
  }

  const tabs = [
    { id: "explanation", label: "Explanation", icon: Info },
    { id: "bugs", label: "Issues & Bugs", icon: Bug },
    { id: "improvements", label: "Optimizations", icon: Zap },
    { id: "complexity", label: "Complexity", icon: Activity },
  ] as const;

  const contentToRender = String(explainLike5 && activeTab === "explanation" 
    ? result.simplified_explanation 
    : result[activeTab] || "");

  const handleCopy = () => {
    navigator.clipboard.writeText(contentToRender);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background-panel rounded-2xl border border-border shadow-[0_0_20px_rgba(79,70,229,0.05)] overflow-hidden">
      <div className="flex bg-black/20 overflow-x-auto border-b border-border hide-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "text-accent border-b-2 border-accent bg-accent/5 shadow-[inset_0_-1px_10px_rgba(34,211,238,0.1)]"
                  : "text-muted hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
        <div className="absolute top-4 right-4 relative-copy-btn">
            <button 
              onClick={handleCopy}
              className="p-2 bg-black/40 hover:bg-black/60 rounded-lg text-muted hover:text-white transition-colors flex items-center justify-center shadow-lg backdrop-blur-sm z-10"
              title="Copy to clipboard"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
        </div>
        
        {explainLike5 && activeTab === "explanation" && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-accent/20 to-primary/10 border border-accent/20 text-accent text-xs font-semibold rounded-full">
            <BookOpen className="w-3 h-3" />
            ELI5 Mode Active
          </div>
        )}

        <div className="prose prose-invert prose-blue max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-border">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {contentToRender}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
