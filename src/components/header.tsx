"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "./theme-toogle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full border-b bg-white dark:bg-black">
      <div className="mx-auto w-full max-w-none md:max-w-[1620px] flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white"
        >
          Code
          <span className="text-slate-600 dark:text-slate-300">Crafter</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant="ghost" className="px-3 py-1 text-sm sm:text-base">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="px-3 py-1 text-sm sm:text-base">Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <SignOutButton>
              <Button
                variant="outline"
                className="px-3 py-1 text-sm sm:text-base"
              >
                Sign Out
              </Button>
            </SignOutButton>
            <UserButton />
          </SignedIn>

          <div className="scale-90 sm:scale-100">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
