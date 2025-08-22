"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 flex items-center justify-center min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay"></div>
        <div className="absolute top-1/2 -right-8 w-96 h-96 bg-purple-300/10 rounded-full mix-blend-overlay"></div>
        <div className="absolute bottom-8 left-1/4 w-64 h-64 bg-blue-300/10 rounded-full mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center badge bg-[#e0dfdf5f] backdrop-blur-md rounded-full px-4 py-2 mb-6">
          <Sparkles className="mr-2" size={16} />
          <span className="text-sm font-medium">New Collections Just Dropped</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6">
          Discover Quality
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-blue-500 dark:from-sky-400 dark:to-blue-400 ml-3">
            Products
          </span>
          , Effortlessly.
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl font-light mb-10 max-w-3xl mx-auto">
          Your one-stop shop for everything you need. Shop now and experience the difference with our curated collections and exclusive deals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/products"
            className="group relative bg-blue-600 text-white dark:bg-sky-500 dark:text-gray-900 px-7 py-2 rounded-full text-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center"
          >
            <span className="flex items-center ">
              Shop All Products
              <ArrowRight className="ml-2" size={20} />
            </span>
          </Link>

          <Link
            href="/login"
            className="group relative bg-transparent border-2 px-7 py-2 rounded-full text-lg font-semibold hover:bg-gray-200/20 dark:hover:bg-white/20 transition-colors"
          >
            <span>Get Started</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className=" p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold mb-1">10K+</div>
            <div className="text-sm opacity-80">Happy Customers</div>
          </div>
          <div className=" p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-sm opacity-80">Premium Products</div>
          </div>
          <div className=" p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold mb-1">24/7</div>
            <div className="text-sm opacity-80">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
