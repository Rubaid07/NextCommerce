import { Package } from "lucide-react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

async function getProducts() {
    try {
        const res = await fetch(`${BACKEND_URL}/products`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Our <span className="text-blue-500">Products</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Discover our complete collection of high-quality products designed to meet your needs
                    </p>
                </div>

                {/* products */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                                {/* Product Image Placeholder */}
                                <div className="relative h-56 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Package className="w-15 h-15 text-gray-400" />
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-blue-100 dark:bg-blue-900  text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                                            New
                                        </span>
                                    </div>
                                </div>

                                {/* product info */}
                                <div className="p-6 featured">
                                    <h2 className="text-xl font-bold mb-2 ">
                                        {product.name}
                                    </h2>

                                    <p className="text-gray-400 mb-4 line-clamp-2 h-12">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-6">
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            ${product.price}
                                        </span>

                                        <Link
                                            href={`/products/${product._id}`}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center"
                                        >
                                            <span>View</span>
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <div className="rounded-xl p-12 shadow-lg max-w-2xl mx-auto toggle ">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">
                                    No Products Available
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    Check back later for our latest products
                                </p>
                                <Link
                                    href="/"
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors inline-flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Return Home
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}