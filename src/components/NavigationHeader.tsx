import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Code2, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-neutral-700/50 bg-neutral-900/70 backdrop-blur-xl backdrop-saturate-150 py-4">
      {/* Subtle steel gradient shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700/10 via-neutral-800/10 to-gray-600/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div
                className="absolute -inset-2 bg-gradient-to-r from-neutral-600/20 to-neutral-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
              />

              <div className="relative bg-gradient-to-br from-[#2a2a2e] to-[#111112] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <Terminal className="w-6 h-6 text-gray-300 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div className="relative">
                <span className="block text-lg font-semibold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-200 text-transparent bg-clip-text">
                  CodeCraft
                </span>
                <span className="hidden md:flex text-xs text-gray-400/70 font-medium">
                  Interactive Code Editor
                </span>
              </div>
            </Link>

            {/* Snippets Link */}
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-neutral-800/50 hover:bg-gray-700/30 
              border border-neutral-700 hover:border-gray-500 transition-all duration-300 shadow-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-gray-500/20
                 hover:border-gray-400/40 bg-gradient-to-r from-gray-600/10 
                to-gray-400/10 hover:from-gray-600/20 hover:to-gray-400/20 transition-all 
                duration-300"
              >
                <Sparkles className="w-4 h-4 text-gray-300 hover:text-gray-100" />
                <span className="text-sm font-medium text-gray-300 hover:text-gray-100">
                  Pro
                </span>
              </Link>
            </SignedOut>

            {/* Profile Button */}
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
