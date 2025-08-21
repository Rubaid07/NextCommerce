// file: src/app/products/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

// আপনার ব্যাকএন্ডের URL
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
        <>
            <Navbar />
            <main className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <span className="text-xl font-bold text-blue-600">${product.price}</span>
                                <Link href={`/products/${product._id}`} className="block mt-4 text-blue-600 hover:underline">
                                    View Details
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No products found.</p>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}