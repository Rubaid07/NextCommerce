"use client";

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar({ toggleTheme, currentTheme }) {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          NextCommerce
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">Home</Link>
          <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">Products</Link>

          {!session && status !== "loading" && (
            <Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">Login</Link>
          )}

          {session && (
            <>
              <Link href="/dashboard/products" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">Dashboard</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="hover:text-red-500 font-medium">Logout</button>
            </>
          )}

          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {currentTheme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
