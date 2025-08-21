"use client";

import { useState, useEffect } from "react";
import AddProductForm from "./AddProductForm";
import Link from "next/link";
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export default function DashboardContainer() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-center">Add & Manage Products</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
                <AddProductForm onProductAdded={handleProductAdded} />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
                {loading ? (
                    <div className="text-center text-lg">Loading products...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-500">No products found. Add a new one!</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}