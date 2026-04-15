"use client";

import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Play, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  onAnalyze: (code: string, language: string, explainLike5: boolean) => void;
  isAnalyzing: boolean;
}

export default function CodeEditor({ onAnalyze, isAnalyzing }: CodeEditorProps) {
  const [code, setCode] = useState<string>("// Paste or write your code here\n");
  const [language, setLanguage] = useState("javascript");
  const [explainLike5, setExplainLike5] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[color:var(--color-pure-white)] rounded-[12px] border border-[color:var(--color-border-cream)] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.05)] relative z-10 w-full">
      <div className="flex items-center justify-between p-3 px-4 border-b border-[color:var(--color-border-cream)] bg-[color:var(--color-ivory)]">
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[color:var(--color-pure-white)] border border-[color:var(--color-border-warm)] text-[color:var(--color-near-black)] text-[14px] rounded-[6px] px-3 py-1.5 focus:outline-none focus:border-[color:var(--color-focus-blue)] focus:ring-1 focus:ring-[color:var(--color-focus-blue)] cursor-pointer"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
          
          <label className="flex items-center gap-2 text-[14px] text-[color:var(--color-olive)] cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={explainLike5}
              onChange={(e) => setExplainLike5(e.target.checked)}
              className="rounded-[4px] border-[color:var(--color-border-warm)] text-[color:var(--color-terracotta)] focus:ring-[color:var(--color-focus-blue)] cursor-pointer w-4 h-4"
            />
            Explain like I'm 5
          </label>
        </div>

        <button
          onClick={() => onAnalyze(code, language, explainLike5)}
          disabled={isAnalyzing || !code.trim()}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-[15px] font-medium transition-all shadow-[0_0_0_1px_var(--color-terracotta)]",
            isAnalyzing 
              ? "bg-[color:var(--color-terracotta)] opacity-50 text-[color:var(--color-ivory)] cursor-not-allowed" 
              : "bg-[color:var(--color-terracotta)] hover:opacity-90 text-[color:var(--color-ivory)] shadow-[0_0_0_1px_var(--color-terracotta)]"
          )}
        >
          {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {isAnalyzing ? "Analyzing..." : "Analyze Code"}
        </button>
      </div>
      
      <div className="flex-1 p-0 relative">
        <MonacoEditor
          height="100%"
          language={language}
          theme="light"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 15,
            fontFamily: "monospace",
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            lineHeight: 24,
            renderLineHighlight: "none",
            hideCursorInOverviewRuler: true
          }}
          className="overflow-hidden"
        />
      </div>
    </div>
  );
}
