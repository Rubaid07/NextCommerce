"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { Plus, Upload, Loader2 } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export default function AddProductForm({ onProductAdded }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name, 
                    description, 
                    price: parseFloat(price),
                    image,
                    category,
                    stock: parseInt(stock) || 0
                }),
            });

            if (res.ok) {
                toast.success('Product added successfully!');
                onProductAdded();
                setName("");
                setDescription("");
                setPrice("");
                setImage("");
                setCategory("");
                setStock("");
            } else {
                toast.error('Failed to add product.'); 
            }
        } catch (err) {
            toast.error('An unexpected error occurred.');
            console.error("Error submitting form:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-8 px-4 ">
            <div className="max-w-2xl mx-auto ">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                        <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Add New Product
                    </h1>
                    <p className="text-gray-400">
                        Fill in the details below to add a new product to your store
                    </p>
                </div>

                {/* Form */}
                <div className="form rounded-xl shadow-lg p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 inputborder rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent toggle transition-colors"
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 inputborder rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent toggle transition-colors resize-none"
                                rows={4}
                                placeholder="Describe your product in detail..."
                                required
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-2">
                                    Price ($) *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 inputborder rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent toggle transition-colors"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-400 mb-2">
                                    Image URL
                                </label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        id="image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 inputborder rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent toggle transition-colors"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Adding Product...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        <span>Add Product</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        * Required fields
                    </p>
                </div>
            </div>
        </div>
    );
}