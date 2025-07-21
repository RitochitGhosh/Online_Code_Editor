"use client";

import { useConvexUser } from "@/hooks/useConvexUser";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import { SignedIn } from "@clerk/nextjs";
import HeaderProfileBtn from "./HeaderProfileBtn";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

export default function HeaderClient({ userId }: { userId: string }) {
  const convexUser = useConvexUser({ userId });

  return (
    <div className="flex items-center gap-4">
      {!convexUser?.isPro && (
        <Link
          href="/pricing"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
          <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">Pro</span>
        </Link>
      )}

      <div className="flex items-center gap-3">
        <ThemeSelector />
        <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
      </div>

      <SignedIn>
        <RunButton />
      </SignedIn>

      <div className="pl-3 border-l border-gray-800">
        <HeaderProfileBtn />
      </div>
    </div>
  );
}
