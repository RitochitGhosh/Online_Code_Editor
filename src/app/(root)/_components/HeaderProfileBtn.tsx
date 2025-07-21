"use client";

import LoginButton from "@/components/LoginButton";
import { Skeleton } from "@/components/ui/skeleton";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

function HeaderProfileBtn() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Skeleton className="h-8 w-8 bg-white rounded-full" />;
  }

  return (
    <>
      <UserButton >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <LoginButton />
      </SignedOut>
    </>
  );
}

export default HeaderProfileBtn;
