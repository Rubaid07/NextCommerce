import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 text-white py-24 md:py-32 flex items-center justify-center min-h-[60vh]">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
                    Discover Quality Products, Effortlessly.
                </h1>
                <p className="text-lg md:text-xl font-light mb-8 animate-fade-in-up">
                    Your one-stop shop for everything you need. Shop now and experience the difference.
                </p>
                <div className="space-x-4 animate-scale-in">
                    <Link href="/products" className="bg-white text-blue-600 dark:text-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105">
                        Shop All Products
                    </Link>
                    <Link href="/login" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-transform transform hover:scale-105">
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
}