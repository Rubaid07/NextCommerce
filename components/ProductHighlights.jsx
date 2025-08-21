// file: src/components/ProductHighlights.jsx
import React from 'react';
import Link from 'next/link';

const featuredProducts = [
    { _id: "60c72b2f9b1d8c001f8e4a7a", name: "Laptop", description: "Powerful and portable.", price: 1200 },
    { _id: "60c72b2f9b1d8c001f8e4a7b", name: "Smartphone", description: "Latest model with great features.", price: 800 },
    { _id: "60c72b2f9b1d8c001f8e4a7c", name: "Headphones", description: "Noise-cancelling, immersive sound.", price: 250 },
];

export default function ProductHighlights() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProducts.map((product) => (
                        <div key={product._id} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <span className="text-xl font-bold text-blue-600">${product.price}</span>
                            <Link href={`/products/${product._id}`} className="block mt-4 text-blue-600 hover:underline">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}