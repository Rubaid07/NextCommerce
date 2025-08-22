import { Package } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

async function getProduct(id) {
    try {
        const res = await fetch(`${BACKEND_URL}/products/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
}

export default async function ProductDetailsPage({ params }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-400 mb-2">Product Not Found</h1>
                    <p className="text-gray-400 mb-6">The product you are looking for doesnt exist or has been removed.</p>
                    <button href="/products" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <button href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                Home
                            </button>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <button href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Products</button>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 truncate max-w-xs">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* product details */}
                <div className="featured rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        <div className="flex justify-center">
                            <div className="w-full max-w-md h-96 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                                  {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <Package className="w-15 h-15 text-gray-400" />
                                    )}
                            </div>
                        </div>

                        {/* product info */}
                        <div className="space-y-6">
                            <div>
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-2.5 py-0.5 rounded">
                                    In Stock
                                </span>
                                <h1 className="text-3xl font-bold mt-2 mb-2">{product.name}</h1>
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="ml-2 text-sm font-medium text-gray-400">4.8 (128 reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-lg text-gray-400 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="flex items-baseline space-x-2">
                                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">${product.price}</span>
                                <span className="text-lg text-gray-500 dark:text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                                <span className="text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">
                                    20% OFF
                                </span>
                            </div>

                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="w-4 h-4 bg-blue-600 rounded-full"></span>
                                    <span className="text-sm text-gray-400">Free Shipping</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-4 h-4 bg-green-600 rounded-full"></span>
                                    <span className="text-sm text-gray-400">30-Day Returns</span>
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Add to Cart
                                </button>
                                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* product details */}
                    <div className="border-t border-gray-200 darkbordert mt-8">
                        <div className="px-8 py-6">
                            <h2 className="text-2xl font-bold text-gray-400 mb-4">Product Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-gray-400 mb-2">Specifications</h3>
                                    <ul className="space-y-2">
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Category</span>
                                            <span className="text-gray-400">Electronics</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Brand</span>
                                            <span className="text-gray-400">Premium Brand</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Warranty</span>
                                            <span className="text-gray-400">2 Years</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-400 mb-2">Shipping Info</h3>
                                    <ul className="space-y-2">
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Delivery</span>
                                            <span className="text-gray-400">2-3 Business Days</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Returns</span>
                                            <span className="text-gray-400">30 Days Easy Return</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Support</span>
                                            <span className="text-gray-400">24/7 Available</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}