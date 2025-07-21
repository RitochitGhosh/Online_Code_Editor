import { currentUser } from "@clerk/nextjs/server";
import { Code2, Terminal } from "lucide-react";
import Link from "next/link";
import HeaderClient from "./HeaderClient";

async function Header() {
  const user = await currentUser();
  const userId = user?.id || "";

  return (
    <div className="relative z-10">
      <div className="flex items-center lg:justify-between justify-center bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] p-6 mb-4 rounded-2xl transition-all duration-500">
        <div className="hidden lg:flex items-center gap-8">
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
              <span className="block text-xs text-gray-400/70 font-medium">
                Interactive Code Editor
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
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
          </nav>
        </div>

        <HeaderClient userId={userId} />
      </div>
    </div>
  );
}
export default Header;
