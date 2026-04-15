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
    <div className="flex flex-col h-full bg-[color:var(--color-pure-white)] rounded-[12px] border border-[color:var(--color-border-cream)] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.05)] w-full">
      <div className="flex bg-[color:var(--color-ivory)] overflow-x-auto border-b border-[color:var(--color-border-cream)] hide-scrollbar shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3.5 text-[15px] font-medium transition-colors whitespace-nowrap border-b-2",
                activeTab === tab.id
                  ? "text-[color:var(--color-near-black)] border-[color:var(--color-near-black)]"
                  : "text-[color:var(--color-olive)] border-transparent hover:text-[color:var(--color-near-black)]"
              )}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex-1 p-6 md:p-8 overflow-y-auto relative">
        <div className="absolute top-4 right-4">
            <button 
              onClick={handleCopy}
              className="p-2 border border-[color:var(--color-border-warm)] bg-[color:var(--color-pure-white)] hover:bg-[color:var(--color-ivory)] rounded-[8px] text-[color:var(--color-olive)] hover:text-[color:var(--color-near-black)] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              title="Copy to clipboard"
            >
              {copied ? <CheckCircle className="w-[18px] h-[18px] text-[color:var(--color-terracotta)]" /> : <Copy className="w-[18px] h-[18px]" strokeWidth={1.5} />}
            </button>
        </div>
        
        {explainLike5 && activeTab === "explanation" && (
          <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 bg-[color:var(--color-warm-sand)] text-[color:var(--color-terracotta)] text-[13px] font-medium rounded-[6px]">
            <BookOpen className="w-[14px] h-[14px]" />
            ELI5 Mode Active
          </div>
        )}

        <div className="prose max-w-none prose-p:leading-[1.60] prose-p:text-[16px] xl:prose-p:text-[17px] prose-headings:font-serif prose-headings:font-medium text-[color:var(--color-near-black)] prose-strong:text-[color:var(--color-near-black)] prose-strong:font-medium prose-pre:bg-[color:var(--color-ivory)] prose-pre:text-[color:var(--color-near-black)] prose-pre:border prose-pre:border-[color:var(--color-border-warm)] prose-code:text-[color:var(--color-terracotta)] prose-code:bg-[color:var(--color-warm-sand)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-[4px] prose-code:before:content-none prose-code:after:content-none">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {contentToRender}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
