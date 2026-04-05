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
    <div className="flex flex-col h-full bg-background-panel rounded-2xl border border-border shadow-[0_0_20px_rgba(34,211,238,0.05)] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-black/20">
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-black/40 border border-border text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
          
          <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
            <input 
              type="checkbox" 
              checked={explainLike5}
              onChange={(e) => setExplainLike5(e.target.checked)}
              className="rounded bg-black/40 border-border text-primary focus:ring-primary-hover"
            />
            Explain like I'm 5
          </label>
        </div>

        <button
          onClick={() => onAnalyze(code, language, explainLike5)}
          disabled={isAnalyzing || !code.trim()}
          className={cn(
            "flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-[0_0_10px_rgba(79,70,229,0.3)]",
            isAnalyzing 
              ? "bg-primary/50 text-white/70 cursor-not-allowed" 
              : "bg-primary hover:bg-primary-hover text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
          )}
        >
          {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {isAnalyzing ? "Analyzing..." : "Analyze Code"}
        </button>
      </div>
      
      <div className="flex-1 p-2">
        <MonacoEditor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
          }}
          className="rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
}
