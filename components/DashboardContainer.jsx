"use client";

import { useState, useEffect } from "react";
import AddProductForm from "./AddProductForm";
import Link from "next/link";
import toast from 'react-hot-toast';
import {
    Trash2,
    Plus,
    Package,
    DollarSign,
    BarChart3,
    ArrowLeft,
    RefreshCw
} from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export default function DashboardContainer() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalValue: 0,
        averagePrice: 0
    });
    console.log(products);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BACKEND_URL}/products`);
            if (!res.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await res.json();
            setProducts(data);

            const totalValue = data.reduce((sum, product) => sum + parseFloat(product.price), 0);
            setStats({
                totalProducts: data.length,
                totalValue: totalValue,
                averagePrice: data.length > 0 ? totalValue / data.length : 0
            });
        } catch (err) {
            setError("Error loading products.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setProducts(products.filter(p => p._id !== productId));
                toast.success("Product deleted successfully!");
                fetchProducts();
            } else {
                toast.error("Failed to delete product.");
                throw new Error("Failed to delete product");
            }
        } catch (err) {
            setError("Error deleting product.");
            console.error(err);
        }
    };

    const handleProductAdded = () => {
        fetchProducts();
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Home
                        </Link>
                        <h1 className="text-3xl font-bold">
                            Product Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Manage your products and inventory
                        </p>
                    </div>
                    <button
                        onClick={fetchProducts}
                        disabled={loading}
                        className="flex items-center px-4 py-2  rounded-lg toggle bg-gray-200"
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-xl p-6 shadow-lg border border-gray-100 darkborder">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium ">Total Products</p>
                                <p className="text-2xl font-bold ">{stats.totalProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl p-6 shadow-lg border border-gray-100 darkborder">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium ">Total Value</p>
                                <p className="text-2xl font-bold ">${stats.totalValue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl p-6 shadow-lg border border-gray-100 darkborder">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium ">Average Price</p>
                                <p className="text-2xl font-bold ">${stats.averagePrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* add product */}
                <div className="rounded-xl shadow-lg overflow-hidden inputborder">
                    <div className="border-b border-gray-100 darkborder px-6 py-4">
                        <h2 className="text-xl font-semibold  flex items-center">
                            <Plus className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                            Add New Product
                        </h2>
                    </div>
                    <div className="p-6">
                        <AddProductForm onProductAdded={handleProductAdded} />
                    </div>
                </div>

                {/* product list */}
                <div className="rounded-xl shadow-lg overflow-hidden featured inputborder">
                    <div className="border-b border-gray-100 darkborder px-6 py-4">
                        <h2 className="text-xl font-semibold  flex items-center">
                            <Package className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                            Product List
                            {products.length > 0 && (
                                <span className="ml-2 bg-gray-200 toggle text-sm font-medium px-2.5 py-0.5 rounded-full">
                                    {products.length} items
                                </span>
                            )}
                        </h2>
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-12">
                                <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
                                <p className="text-gray-500 ">Loading products...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                {error}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-16">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-500  mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-400 dark:text-gray-500">
                                    Add your first product to get started
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto inputborder">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 darkborder">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500  uppercase tracking-wider">
                                                Product
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500  uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500  uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500  uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product._id}>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-600 dark:to-gray-500 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                                                            {product.image ? (
                                                                <img
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <Package className="w-5 h-5 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500  line-clamp-1">
                                                                {product.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium">
                                                    ${product.price}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500">
                                                        {product.category || 'Uncategorized'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button
                                                            onClick={() => handleDelete(product._id)}
                                                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}