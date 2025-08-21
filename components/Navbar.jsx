"use client";

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
      setCurrentTheme(savedTheme);
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          NextCommerce
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">Home</Link>
          <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">Products</Link>
          
          {session && (
            <Link href="/dashboard/add-product" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">Dashboard</Link>
          )}

          {!session && status !== "loading" && (
            <button onClick={() => signIn()} className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">Login</button>
          )}
          
          {session && (
            <button onClick={() => signOut()} className="hover:text-red-500 font-medium">Logout</button>
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