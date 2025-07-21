"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { Loader2, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

const HoverMsg = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: -8 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
      className="absolute -top-10 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="px-3 py-1.5 rounded-md bg-gray-800 text-white text-xs shadow-lg border border-gray-700 whitespace-nowrap">
        Please wait a moment before running again
      </div>
    </motion.div>
  );
};

function RunButton() {
  const user = useUser();
  const { runCode, isRunning, language } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const isDisabled = isRunning || isWaiting;

  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();
    setIsWaiting(true);

    if (user && result) {
      // Save result in database
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    }

    setTimeout(() => setIsWaiting(false), 3000);
  };

  return (
    <motion.button
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleRun}
      disabled={isDisabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
      group relative inline-flex items-center gap-2.5 px-5 py-2.5
      disabled:cursor-not-allowed
      focus:outline-none
    `}
    >
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="w-4 h-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-medium text-white/90">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-4 h-4">
              <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>

      {/* Rate Limit Message */}
      <AnimatePresence>{isHovering && isDisabled && <HoverMsg />}</AnimatePresence>
    </motion.button>
  );
}

export default RunButton;
