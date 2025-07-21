"use client";
import { Blocks } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative border-t border-gray-800/50 mt-auto text-sm">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Product Info */}
          <div className="space-y-1 text-gray-300">
            <div className="flex items-center gap-2">
              <Blocks className="size-5 text-gray-400" />
              <span className="font-semibold text-lg">CodeCraft</span>
            </div>
            <p className="text-gray-400 max-w-md">
              CodeCraft is an online code compiler where users can save code
              snippets, explore others&apos; code, leave comments, and star
              their favorites.
            </p>
          </div>

          {/* Developer Info */}
          <div className="flex items-center gap-3 text-gray-400">
            <Image
              src="/user_avatar.avif"
              alt="Developer Avatar"
              width={32}
              height={32}
              className="rounded-full border border-gray-700"
            />
            <span>
              Developed by{" "}
              <Link
                href={"https://ritochit-ghosh-hna6.vercel.app/"}
                target="_blank"
                className="hover:underline transition ease-in"
              >
                Ritochit Ghosh
              </Link>
            </span>
          </div>

          {/* Links */}
          <div className="flex-col justify-start items-start">
            <div className="flex items-center gap-6">
              <Link
                href="/support"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                Support
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                Terms
              </Link>
            </div>
            <div className="text-gray-500 pt-4 border-t border-gray-800/30">
              <div className="font-bold text-xl">{currentTime ? currentTime : <Skeleton className="h-[30px] w-[90px] text-gray-300 rounded-none" />}</div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
