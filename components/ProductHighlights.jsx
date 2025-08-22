import { Package } from 'lucide-react';
import Link from 'next/link';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

async function getProducts() {
    try {
        const res = await fetch(`${BACKEND_URL}/products?limit=3`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default async function ProductHighlights() {
    const products = await getProducts();
    const featuredProducts = products.slice(0, 3);

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 featured">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Featured <span className="text-blue-600 dark:text-blue-400">Products</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Discover our handpicked selection of premium products that our customers love
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
                            <div key={product._id} className="group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                                <div className="relative h-60 overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Package className="w-15 h-15 text-gray-400" />
                                    )}
                                    <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                                        Featured
                                    </div>
                                </div>

                                {/* product info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-400 mb-4 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-2xl font-bold text-blue-600 ">
                                            ${product.price}
                                        </span>

                                        <Link
                                            href={`/products/${product._id}`}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="bg-white toggle rounded-xl p-8 shadow-lg max-w-md mx-auto">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    No Featured Products
                                </h3>
                                <p className="text-gray-400 dark:text-gray-300">
                                    Check back later for our featured products
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {featuredProducts.length > 0 && (
                    <div className="text-center mt-12">
                        <Link
                            href="/products"
                            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:from-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                        >
                            View All Products
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}