"use client";

import Link from "next/link";
import { Sun, Moon, Menu, X, User, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const themeToSet = savedTheme || (systemPrefersDark ? "dark" : "light");

    if (themeToSet === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setCurrentTheme(themeToSet);
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
    setCurrentTheme(newTheme);
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white nav shadow-md sticky top-0 z-50  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2"
          >
            <ShoppingCart size={24} />
            <span>NextCommerce</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className=" hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className=" hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Products
            </Link>

            {session && (
              <Link
                href="/dashboard/add-product"
                className=" hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 toggle transition-all duration-300"
                aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
              >
                {currentTheme === "light" ?
                  <Moon size={18} className="text-gray-700" /> :
                  <Sun size={18} className="text-yellow-400" />
                }
              </button>
            )}

            <div className="hidden md:flex items-center gap-2">
              {!session && status !== "loading" && (
                <button
                  onClick={() => signIn()}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  Login
                </button>
              )}

              {session && (
                <div className="flex items-center gap-3">
                  <span className=" text-sm flex items-center gap-1">
                    <User size={16} />
                    {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 rounded-md bg-gray-100 toggle font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg bg-gray-100 toggle transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className=" hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className=" hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              {session && (
                <Link
                  href="/dashboard/add-product"
                  className=" hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {!session && status !== "loading" ? (
                  <button
                    onClick={() => {
                      signIn();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-md bg-gray-100 toggle   font-medium transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}