"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Code, Copy } from "lucide-react";
import { useState } from "react";

const RunningCodeSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="space-y-2">
      <div className="h-4 bg-gray-800/50 rounded w-3/4" />
      <div className="h-4 bg-gray-800/50 rounded w-1/2" />
      <div className="h-4 bg-gray-800/50 rounded w-5/6" />
    </div>

    <div className="space-y-2 pt-4">
      <div className="h-4 bg-gray-800/50 rounded w-2/3" />
      <div className="h-4 bg-gray-800/50 rounded w-4/5" />
      <div className="h-4 bg-gray-800/50 rounded w-3/4" />
    </div>
  </div>
);

const OutputPanel = () => {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;
  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative bg-[#1a1a1f]/90 backdrop-blur-xl rounded-xl p-4 border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e]/80 ring-1 ring-white/10">
            <Code className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-200 bg-[#1e1e2e]/80 
              rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition-all backdrop-blur-sm"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Output Area */}
      <div className="relative">
        <div className="relative bg-[#1e1e2e]/60 backdrop-blur-xl border border-white/5 rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm">
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/30 ring-1 ring-white/10 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center">Run your code to see the output here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;
