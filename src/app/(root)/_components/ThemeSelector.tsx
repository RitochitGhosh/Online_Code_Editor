"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleOff,
  Cloud,
  Github,
  Laptop,
  Moon,
  Palette,
  Sun,
} from "lucide-react";
import useMounted from "@/hooks/useMounted";
import { Skeleton } from "@/components/ui/skeleton";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return <Skeleton className="h-10 w-44 bg-gradient-to-br from-white/5 via-white/2 to-transparent border-[#2c2c2e]"  />;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-56 group relative flex justify-between items-center gap-2 px-4 py-2.5 
        bg-gradient-to-br from-[#1a1a1d]/80 via-[#1e1e22]/90 to-[#121214]/90 
        backdrop-blur-md rounded-lg transition-all duration-200 
        border border-[#2c2c2e] hover:border-[#3a3a3e] shadow-[inset_0_0_0.5px_rgba(255,255,255,0.05)]"
      >
        {/* Hover glass gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />

          <span className="text-gray-300 min-w-[80px] text-left group-hover:text-white transition-colors">
            {currentTheme?.label}
          </span>
        </div>

        <div
          className="relative w-4 h-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
          style={{ background: currentTheme?.color }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[240px] 
            bg-gradient-to-br from-[#1a1a1d]/90 via-[#1e1e22]/95 to-[#121214]/90 
            backdrop-blur-xl rounded-xl border border-[#2f2f31] shadow-xl py-2 z-50"
          >
            <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 px-2">Select Theme</p>
            </div>

            {THEMES.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`
                relative group w-full flex items-center gap-3 px-3 py-2.5 
                hover:bg-[#2c2c2f]/60 transition-all duration-200
                ${
                  theme === t.id
                    ? "bg-white/5 text-gray-100"
                    : "text-gray-300"
                }
              `}
                onClick={() => setTheme(t.id)}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                <div
                  className={`
                  flex items-center justify-center size-8 rounded-lg
                  ${
                    theme === t.id
                      ? "bg-white/5 text-gray-100"
                      : "bg-gray-800/40 text-gray-400"
                  }
                  group-hover:scale-105 transition-all duration-200
                `}
                >
                  {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                </div>

                <span className="flex-1 text-left group-hover:text-white transition-colors">
                  {t.label}
                </span>

                <div
                  className="relative size-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
                  style={{ background: t.color }}
                />

                {theme === t.id && (
                  <motion.div
                    className="absolute inset-0 border-2 border-white/10 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ThemeSelector;
