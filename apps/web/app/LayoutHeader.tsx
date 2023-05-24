"use client";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { createRequestUrl } from "../api";

interface HeaderProps {
    isAuthenticated: boolean;
}

export const Header: FC<HeaderProps> = ({ isAuthenticated }) => {
  const router = useRouter();
  const onSignOut = useCallback(async () => {
    try {
      await fetch(createRequestUrl("/auth/signout"));
      router.push("/signin");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-gray-800 flex justify-end gap-2 md:gap-4 py-2 px-4">
      <button className="text-white py-1 px-2 rounded underline-offset-2 hover:bg-gray-700 hover:underline" onClick={onSignOut}>
        Logout
      </button>
    </nav>
  );
};
